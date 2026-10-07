# Private portfolio analytics

The GitHub Pages site sends small page-view events to a Cloudflare Worker. D1 stores daily totals by page. The owner asks **@prof_analytics_003_bot** for `/stats` or `/pages`. This adds no visible interface and does not move the website off GitHub Pages.

## Free-plan boundary

Keep the Cloudflare account on **Workers Free**. Do not enable Workers Paid, paid observability, or another paid analytics service. No custom domain is needed: the Worker uses its free `workers.dev` address.

Cloudflare currently lists 100,000 Worker requests/day and D1 Free allowances of 100,000 rows written/day, 5 million rows read/day, and 5 GB total storage. These are account allowances shared with your other Workers/databases. Database index work can affect row billing; do not assume one visit equals exactly one billable row write. When Free limits are exhausted, counting/reports can fail until limits reset; the portfolio still works. These limits are not a promise of unlimited traffic or permanent provider pricing.

Sources, checked 2026-10-07: [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [D1 pricing and Free-limit behavior](https://developers.cloudflare.com/d1/platform/pricing/), [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/).

## One-time setup outside the repository

Prerequisites: your Cloudflare Free account, Node 22.13+ (tests use Node's SQLite API), Python 3, and the BotFather token for `@prof_analytics_003_bot`. Keep the token private; do not paste it into chat, GitHub variables, browser code, or a committed file.

Run commands from the repository root in your own terminal.

### 1. Authenticate and create the database

```bash
npm ci
npx wrangler login
npx wrangler d1 create portfolio-analytics
cp workers/analytics/wrangler.json workers/analytics/wrangler.local.json
```

Open **`workers/analytics/wrangler.local.json`** and replace the all-zero `database_id` with the ID printed by `d1 create`. This local file is ignored by Git. If the database already exists, find its ID with `npx wrangler d1 list` and reuse it. If you have multiple Cloudflare accounts, add the correct `account_id` to the local JSON configuration so all commands use the same account.

### 2. Apply the schema and deploy

```bash
npx wrangler d1 migrations apply portfolio-analytics --remote --config workers/analytics/wrangler.local.json
npx wrangler deploy --config workers/analytics/wrangler.local.json
```

The deploy command creates the Worker in your account; refresh Workers & Pages after it succeeds. Use the account's **Workers Free** plan. If prompted to choose a Workers subdomain, create a free one. Copy the HTTPS `portfolio-analytics.<subdomain>.workers.dev` URL from the deployment output. Opening its `/health` URL should return HTTP 204 with an empty page. This health check verifies the Worker, not database connectivity; `/stats` verifies the database later.

### 3. Connect your Telegram account privately

```bash
npm run analytics:connect
```

The script:

1. Asks for the public Worker URL and your BotFather token through a hidden terminal prompt.
2. Confirms that the token belongs to `@prof_analytics_003_bot`.
3. Prints a unique `/start ...` command. Send it to the bot in **your private chat**, then press Enter in the terminal. The bot will not reply to this pairing command yet.
4. Reads your account ID from that exact message, stores the owner ID and a random webhook secret using Cloudflare encrypted secrets, and registers the Telegram webhook.

No token is saved, printed, or passed in process arguments. The running Worker does not need the bot token: [Telegram can execute a bot-method reply directly from the webhook response](https://core.telegram.org/bots/api#making-requests-when-getting-updates). The webhook is authenticated with Telegram's [secret-token header](https://core.telegram.org/bots/api#setwebhook), then commands are restricted to the configured account's private chat. Group commands and other users receive no reply.

Send `/stats` and `/pages` to the bot. A new database should report zero/no recorded views. To pair again with this same Worker, run `npm run analytics:connect -- --reconnect`. This briefly removes the current webhook while pairing and rotates the webhook secret. If interrupted, rerun the script. The script refuses to overwrite a webhook pointing somewhere else.

If setup stops immediately after the Worker URL, it has not requested or used your bot token yet. The setup client explicitly identifies itself as `portfolio-analytics-setup/1.0`: Cloudflare rejected Python's generic default identifier with HTTP 403/error 1010 during verification. Health-check failures now report HTTP status, connectivity failure, or timeout. A trailing slash in the entered Worker URL is accepted. Updating this local script does not require redeploying the Worker.

### 4. Enable collection in GitHub Pages

In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables → New repository variable**:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_ANALYTICS_URL` | Your Worker root URL, e.g. `https://portfolio-analytics.example.workers.dev` |

This URL is intentionally public. **Do not put the bot token here.** Publish the analytics code through the existing Pages workflow; changes to this variable require a fresh website build. No GitHub secret or DNS change is needed for analytics. Cloudflare deployment remains a separate, manual operation; the Pages workflow deploys only the static site.

Visit `https://empouya.github.io/` and then `/about/`. In Telegram, `/stats` should show two additional page views and `/pages` should show both paths (other real visits can increase totals too).

## What the numbers mean

- One page view is one supported route becoming visible after loading or client navigation. Reloads and returning to a route count again. Theme changes, query/hash changes, prefetches, and hiding/revealing an already counted route do not count again.
- This is **not unique visitors**, sessions, or verified human traffic. Ad blockers, disabled JavaScript, Do Not Track, network failures, quotas, and burst protection cause undercounting. Automated/spoofed requests can inflate counts. Browser back-forward cache restoration is not guaranteed to count as another view.
- Only the four main pages and six project routes are allowed. 404s, CV downloads, query strings, referrers, and visitor IDs are not collected. Adding a page requires updating `TRACKED_PATHS` in the tracked and deployed local Worker configuration; the route-registry test catches divergence in the tracked configuration.
- The database contains only `day`, `path`, and `views`, one aggregate per UTC day/page. Historical aggregates are retained for all-time totals. `/stats` shows today, seven days including today, thirty days including today, and all recorded history. `/pages` ranks the last thirty days.
- No analytics cookies or browser storage are used. A source IP is read transiently inside the Worker for approximate burst limiting, and the in-memory map is cleared on the first request in a new minute (or when the isolate is discarded). It is not stored in D1 or logged by application code. Cloudflare and Telegram still process requests under their own service policies; this is not a claim that infrastructure never sees an IP.
- The public endpoint checks the website origin, a fixed route allowlist, and bounded payloads. CORS is not authentication and an attacker can forge headers. Burst limits (30/IP/minute and 600 views/minute per Worker isolate) are approximate, not global quota protection; requests rejected by the Worker still consume requests. People behind a shared IP can be undercounted.

## Maintenance and rollback

- **Disable counting:** remove the GitHub Actions variable and rebuild/redeploy Pages. Existing totals and bot reports remain available. For an immediate collection stop, change the deployed Worker's `SITE_ORIGIN` to an unused origin; this will reject every real-site event. Restore the original value to resume.
- **Update Worker code/config:** keep the local database ID, rerun remote migrations if changed, then `npx wrangler deploy --config workers/analytics/wrangler.local.json`. Existing secrets and data are retained by normal deployments. Do not delete/recreate the D1 database to update code.
- **Bot token exposed:** revoke it through BotFather and reconnect locally with the replacement token. Never commit tokens, `.dev.vars`, Wrangler local state, or credential files.
- **Monitor capacity:** inspect the Workers/D1 usage dashboard. Staying on Free means outages at limits instead of paid overage billing. Do not solve a quota issue by enabling Paid unless the project requirement changes.
- **Reports fail:** check D1 binding/migrations and quota first. `/health` alone does not test D1. A stopped webhook affects reports but not the website or view collection. The script verifies registration; sending `/stats` is the end-to-end delivery check.

## Verification and acceptance

```bash
npm run lint
npx tsc --noEmit
node --test tests/*.test.mjs
python3 -m py_compile scripts/connect-analytics-bot.py
python3 -m unittest discover -s tests -p 'test_*.py'
npx wrangler deploy --dry-run --config workers/analytics/wrangler.json
npm run build
```

If the execution environment blocks Turbopack's local CSS-worker port, use `npx next build --webpack` as the supported static-export fallback. Local collection is disabled unless an HTTPS Worker URL is supplied at build time. The production Worker rejects localhost origins by design; use a separate local Worker configuration for local testing.

Inspect `/`, `/about/`, `/projects/`, `/projects/taskhive-backend/`, `/contact/`, and `/404.html` at **1440×900** and **390×844**, in both themes. Visual parity with the pre-analytics/deployed baseline is expected; any visual difference is a regression. Navigation, CV, Contact, keyboard access, themes, metadata, and sitemap must remain unchanged.

Acceptance questions:

- Does one initial visit and each route navigation add one view, while switching appearance and changing hashes do not?
- Do `/stats` and `/pages` work for the owner, while a second Telegram account and a group get no report?
- With the Worker blocked in browser DevTools, does navigation still work with no visible analytics error?
- With Do Not Track enabled, is there no `/view` request? Does the unknown 404 route also generate none?
- Are only canonical paths sent, with no cookies or referrer? Are both Cloudflare services still on Free?

For every release, verify the GitHub Pages workflow succeeds and the published browser sends `/view` requests to the intended Worker. Verification visits are included in totals; do not treat initial test counts as organic traffic.
