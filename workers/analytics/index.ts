// Minimal binding contract keeps the static website independent of Worker globals.
type Statement = {
    bind(...values: (string | number)[]): Statement;
    run(): Promise<unknown>;
    first<T>(): Promise<T | null>;
    all<T>(): Promise<{ results: T[] }>;
};
export type Env = {
    DB: { prepare(sql: string): Statement };
    SITE_ORIGIN: string;
    TRACKED_PATHS: string;
    BOT_USERNAME: string;
    TELEGRAM_OWNER_ID?: string;
    TELEGRAM_WEBHOOK_SECRET?: string;
};

type Update = { message?: { from?: { id?: number; is_bot?: boolean }; chat?: { id?: number; type?: string }; text?: string } };
type Totals = { today: number; week: number; month: number; total: number; since: string | null };

function response(status: number, origin?: string): Response {
    return new Response(null, { status, headers: {
        "Cache-Control": "no-store",
        ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
    } });
}

async function readJson(request: Request, maximum: number): Promise<unknown> {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > maximum) { await reader.cancel(); throw new Error("Body too large"); }
            chunks.push(value);
        }
    } finally { reader.releaseLock(); }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return JSON.parse(new TextDecoder().decode(bytes));
}

function validView(value: unknown, paths: string[]): value is { path: string } {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const item = value as Record<string, unknown>;
    return Object.keys(item).length === 1 && typeof item.path === "string" && paths.includes(item.path);
}

function sameSecret(actual: string | null, expected: string): boolean {
    if (!actual || actual.length !== expected.length) return false;
    let difference = 0;
    for (let i = 0; i < expected.length; i++) difference |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
    return difference === 0;
}

function reply(chatId: number, text: string): Response {
    // Telegram sends the reply itself. The bot token is never needed at runtime.
    return Response.json({ method: "sendMessage", chat_id: chatId, text,
        link_preview_options: { is_disabled: true } }, { headers: { "Cache-Control": "no-store" } });
}

export function createWorker() {
    // Best-effort burst protection, scoped to each isolate and cleared every minute.
    // IPs are used transiently here; they are never written to D1 or logs.
    const bursts = new Map<string, number>();
    let minute = -1;
    function limited(key: string, ceiling: number) {
        const current = Math.floor(Date.now() / 60_000);
        if (current !== minute) { bursts.clear(); minute = current; }
        if (!bursts.has(key) && bursts.size >= 4096) return true;
        const count = (bursts.get(key) ?? 0) + 1;
        bursts.set(key, count);
        return count > ceiling;
    }

    return {
        async fetch(request: Request, env: Env): Promise<Response> {
            const url = new URL(request.url);
            if (url.pathname === "/health" && request.method === "GET") return response(204);
            if (request.method !== "POST") return response(405);

            if (url.pathname === "/view") {
                if (request.headers.get("Origin") !== env.SITE_ORIGIN) return response(403);
                const origin = env.SITE_ORIGIN;
                if (request.headers.get("DNT") === "1") return response(204, origin);
                if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("text/plain")) return response(415, origin);
                if (limited("all-views", 600) || limited(`ip:${request.headers.get("CF-Connecting-IP") ?? "unknown"}`, 30)) return response(429, origin);
                let body: unknown;
                try { body = await readJson(request, 256); } catch { return response(400, origin); }
                if (!validView(body, env.TRACKED_PATHS.split(","))) return response(400, origin);
                try {
                    await env.DB.prepare(`INSERT INTO page_views (day, path, views) VALUES (?, ?, 1)
                        ON CONFLICT(day, path) DO UPDATE SET views = views + 1`)
                        .bind(new Date().toISOString().slice(0, 10), body.path).run();
                    return response(204, origin);
                } catch { return response(503, origin); }
            }

            if (url.pathname !== "/telegram") return response(404);
            if (!env.TELEGRAM_WEBHOOK_SECRET || !/^[a-f0-9]{64}$/.test(env.TELEGRAM_WEBHOOK_SECRET)
                || !env.TELEGRAM_OWNER_ID || !/^[1-9]\d*$/.test(env.TELEGRAM_OWNER_ID)) return response(503);
            if (!sameSecret(request.headers.get("X-Telegram-Bot-Api-Secret-Token"), env.TELEGRAM_WEBHOOK_SECRET)) return response(403);
            let update: Update;
            try { update = await readJson(request, 16384) as Update; } catch { return response(400); }
            const message = update?.message;
            const id = message?.from?.id;
            if (!Number.isSafeInteger(id) || String(id) !== env.TELEGRAM_OWNER_ID || message?.from?.is_bot
                || message?.chat?.type !== "private" || message.chat.id !== id || typeof message.text !== "string") return response(204);
            if (limited("owner-commands", 20)) return response(204);
            const command = /^\/(start|help|stats|pages)(?:@([a-z0-9_]+))?(?:\s|$)/i.exec(message.text.trim());
            if (!command || (command[2] && command[2].toLowerCase() !== env.BOT_USERNAME.toLowerCase())) return response(204);
            const owner = id as number;
            const name = command[1].toLowerCase();
            if (name === "start" || name === "help") return reply(owner,
                "Portfolio analytics\n/stats — today, 7 days, 30 days and total\n/pages — top pages in the last 30 days\n\nCounts are page views, not unique visitors. Dates use UTC; periods include today.");
            try {
                if (name === "pages") {
                    const { results } = await env.DB.prepare(`SELECT path, SUM(views) AS views FROM page_views
                        WHERE day >= date('now', '-29 days') GROUP BY path ORDER BY views DESC, path LIMIT 10`)
                        .all<{ path: string; views: number }>();
                    return reply(owner, "Top pages · last 30 days (UTC)\n\n" + (results.length
                        ? results.map(row => `${row.path} — ${row.views.toLocaleString("en-US")}`).join("\n") : "No recorded page views yet."));
                }
                const totals = await env.DB.prepare(`SELECT
                    COALESCE(SUM(CASE WHEN day = date('now') THEN views ELSE 0 END), 0) AS today,
                    COALESCE(SUM(CASE WHEN day >= date('now', '-6 days') THEN views ELSE 0 END), 0) AS week,
                    COALESCE(SUM(CASE WHEN day >= date('now', '-29 days') THEN views ELSE 0 END), 0) AS month,
                    COALESCE(SUM(views), 0) AS total, MIN(day) AS since FROM page_views`).first<Totals>();
                if (!totals) throw new Error("Missing totals");
                return reply(owner, `Portfolio page views (UTC)\n\nToday: ${totals.today.toLocaleString("en-US")}\nLast 7 days: ${totals.week.toLocaleString("en-US")}\nLast 30 days: ${totals.month.toLocaleString("en-US")}\nTotal recorded: ${totals.total.toLocaleString("en-US")}\n\n${totals.since ? `First recorded day: ${totals.since}` : "No recorded page views yet."}\nThese are page views, not unique visitors.`);
            } catch { return reply(owner, "Statistics are temporarily unavailable. Please try again later; the portfolio remains available."); }
        },
    };
}

export default createWorker();
