/** Only a public Worker address belongs in NEXT_PUBLIC_ANALYTICS_URL. */
export function analyticsEndpoint(base: string | undefined): string | null {
    if (!base) return null;
    try {
        const url = new URL(base);
        if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
        return new URL("/view", url).href;
    } catch { return null; }
}

export function canonicalPage(path: string): string {
    return path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
}

export function sendPageView(endpoint: string, path: string): void {
    // No cookies, visitor IDs, full URLs, referrers, or retries. Failure is invisible.
    try {
        void fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=UTF-8" },
            body: JSON.stringify({ path }),
            credentials: "omit",
            referrerPolicy: "no-referrer",
            cache: "no-store",
            keepalive: true,
            signal: AbortSignal.timeout(3000),
        }).catch(() => {});
    } catch {
        // Unsupported browser APIs must not affect navigation.
    }
}
