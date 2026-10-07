import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import ts from "typescript";

async function loadTs(path) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
    return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
const { createWorker } = await loadTs("../workers/analytics/index.ts");
const { analyticsEndpoint, canonicalPage, sendPageView } = await loadTs("../src/lib/analytics.ts");
const config = JSON.parse(readFileSync(new URL("../workers/analytics/wrangler.json", import.meta.url), "utf8"));
const secret = "a".repeat(64);

function fixture() {
    const sqlite = new DatabaseSync(":memory:");
    sqlite.exec(readFileSync(new URL("../workers/analytics/migrations/0001_views.sql", import.meta.url), "utf8"));
    let operations = 0;
    const env = { ...config.vars, TELEGRAM_WEBHOOK_SECRET: secret, TELEGRAM_OWNER_ID: "123456",
        DB: { prepare(sql) {
            operations++;
            const statement = sqlite.prepare(sql);
            let parameters = [];
            return {
                bind(...values) { parameters = values; return this; },
                async run() { return statement.run(...parameters); },
                async first() { return statement.get(...parameters) ?? null; },
                async all() { return { results: statement.all(...parameters) }; },
            };
        } },
    };
    const worker = createWorker();
    return { sqlite, env, operations: () => operations, fetch: request => worker.fetch(request, env) };
}
function view(body = { path: "/" }, headers = {}) {
    return new Request("https://analytics.example/view", { method: "POST", headers: {
        Origin: config.vars.SITE_ORIGIN, "Content-Type": "text/plain;charset=UTF-8", "CF-Connecting-IP": "192.0.2.1", ...headers,
    }, body: JSON.stringify(body) });
}
function command(text = "/stats", overrides = {}, headers = {}) {
    return new Request("https://analytics.example/telegram", { method: "POST", headers: {
        "Content-Type": "application/json", "X-Telegram-Bot-Api-Secret-Token": secret, ...headers,
    }, body: JSON.stringify({ update_id: 1, message: { from: { id: 123456 }, chat: { id: 123456, type: "private" }, text, ...overrides } }) });
}

test("analytics endpoint and canonical paths reject accidental secret-bearing URLs", () => {
    for (const input of [undefined, "", "broken", "http://worker.test", "https://token@worker.test", "https://worker.test/?token=secret", "https://worker.test/telegram", "https://worker.test/#secret"]) assert.equal(analyticsEndpoint(input), null);
    assert.equal(analyticsEndpoint("https://worker.test"), "https://worker.test/view");
    assert.equal(canonicalPage("/"), "/");
    assert.equal(canonicalPage("/about"), "/about/");
    assert.equal(canonicalPage("/about/"), "/about/");
});

test("Worker route allowlist matches the actual website registries", async () => {
    const { staticSitemapRoutes } = await loadTs("../src/lib/routes.ts");
    const directory = new URL("../src/content/projects/data/", import.meta.url);
    const paths = readdirSync(directory).filter(f => f.endsWith(".json")).map(f => `/projects/${JSON.parse(readFileSync(new URL(f, directory), "utf8")).slug}/`);
    assert.deepEqual(config.vars.TRACKED_PATHS.split(",").sort(), [...staticSitemapRoutes.map(r => canonicalPage(r.href)), ...paths].sort());
});

test("concurrent accepted views use atomic SQL increments and store only aggregates", async () => {
    const f = fixture();
    const responses = await Promise.all(Array.from({ length: 100 }, (_, i) => f.fetch(view(undefined, { "CF-Connecting-IP": `192.0.2.${i}` }))));
    assert.ok(responses.every(r => r.status === 204));
    assert.equal(responses[0].headers.get("Access-Control-Allow-Origin"), config.vars.SITE_ORIGIN);
    assert.equal(f.sqlite.prepare("SELECT views FROM page_views").get().views, 100);
    assert.deepEqual(f.sqlite.prepare("PRAGMA table_info(page_views)").all().map(c => c.name), ["day", "path", "views"]);
    f.sqlite.close();
});

test("untrusted origins, malformed bodies, unknown paths and extra data never touch D1", async () => {
    const f = fixture();
    for (const request of [view(undefined, { Origin: "https://other.test" }), view(undefined, { Origin: "null" }), view({ path: "/secret/" }), view({ path: "/?email=private" }), view({ path: "/", visitor: "private" }), view(null), view({ path: "x".repeat(300) }), view(undefined, { "Content-Type": "application/json" })]) {
        assert.ok((await f.fetch(request)).status >= 400);
    }
    assert.equal((await f.fetch(new Request("https://analytics.example/view"))).status, 405);
    assert.equal((await f.fetch(view(undefined, { DNT: "1" }))).status, 204);
    assert.equal(f.operations(), 0);
    f.sqlite.close();
});

test("burst limits stop repeated writes; database failures return an isolated error", async () => {
    const f = fixture();
    for (let i = 0; i < 30; i++) assert.equal((await f.fetch(view())).status, 204);
    assert.equal((await f.fetch(view())).status, 429);
    assert.equal(f.sqlite.prepare("SELECT views FROM page_views").get().views, 30);
    f.env.DB.prepare = () => { throw new Error("D1 quota exceeded"); };
    assert.equal((await f.fetch(view(undefined, { "CF-Connecting-IP": "other" }))).status, 503);
    f.sqlite.close();
});

test("bot authentication fails closed and never discloses stats to other users/groups", async () => {
    const f = fixture();
    assert.equal((await f.fetch(command("/stats", {}, { "X-Telegram-Bot-Api-Secret-Token": "wrong" }))).status, 403);
    for (const overrides of [{ from: { id: 999 } }, { chat: { id: -1, type: "group" } }, { from: { id: 123456, is_bot: true } }, { chat: { id: 999, type: "private" } }]) assert.equal((await f.fetch(command("/stats", overrides))).status, 204);
    assert.equal((await f.fetch(command("/stats@another_bot"))).status, 204);
    assert.equal((await f.fetch(command("/unknown"))).status, 204);
    delete f.env.TELEGRAM_OWNER_ID;
    assert.equal((await f.fetch(command())).status, 503);
    assert.equal(f.operations(), 0);
    f.sqlite.close();
});

test("stats periods include today and preserve all-time history; pages rank the last 30 days", async () => {
    const f = fixture();
    for (const [offset, path, views] of [[0, "/", 2], [6, "/", 3], [7, "/about/", 5], [29, "/about/", 7], [30, "/", 11]]) f.sqlite.prepare("INSERT INTO page_views VALUES (date('now', ?), ?, ?)").run(`-${offset} days`, path, views);
    const report = await (await f.fetch(command("/stats@prof_analytics_003_bot"))).json();
    assert.equal(report.method, "sendMessage");assert.equal(report.chat_id, 123456);
    for (const value of ["Today: 2", "Last 7 days: 5", "Last 30 days: 17", "Total recorded: 28"]) assert.ok(report.text.includes(value), report.text);
    const pages = await (await f.fetch(command("/pages"))).json();
    assert.match(pages.text, /\/about\/ — 12\n\/ — 5/);
    f.sqlite.close();
});

test("empty database and unavailable database give useful private replies", async () => {
    const f = fixture();
    assert.match((await (await f.fetch(command())).json()).text, /Total recorded: 0/);
    assert.match((await (await f.fetch(command("/pages"))).json()).text, /No recorded/);
    f.env.DB.prepare = () => { throw new Error("unavailable"); };
    assert.match((await (await f.fetch(command())).json()).text, /temporarily unavailable/);
    f.sqlite.close();
});

test("client sends only the canonical page with no credentials/referrer and tolerates failure", async t => {
    let captured;
    t.mock.method(globalThis, "fetch", async (...args) => { captured = args; throw new Error("offline"); });
    assert.equal(sendPageView("https://worker.test/view", "/about/"), undefined);
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(captured[1].body, '{"path":"/about/"}');
    assert.equal(captured[1].credentials, "omit");assert.equal(captured[1].referrerPolicy, "no-referrer");
    assert.equal(captured[1].keepalive, true);
});
