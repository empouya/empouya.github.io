"""Pair the owner's Telegram account with an already deployed analytics Worker.

Run locally after following docs/analytics.md. No token is saved or printed.
"""
import argparse
import getpass
import json
from pathlib import Path
import re
import secrets
import subprocess
import sys
import urllib.error
import urllib.request
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "workers/analytics/wrangler.local.json"
USER_AGENT = "portfolio-analytics-setup/1.0"


def check_worker_health(worker):
    # Cloudflare can reject Python's generic default User-Agent (error 1010).
    request = urllib.request.Request(worker + "/health", headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            if response.status != 204:
                raise RuntimeError(f"Worker /health returned HTTP {response.status}; expected HTTP 204. Check the deployed Worker URL and code.")
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"Worker /health returned HTTP {error.code}; expected HTTP 204. Check the Worker URL and Cloudflare access/security settings.") from None
    except urllib.error.URLError:
        raise RuntimeError("Could not connect to Worker /health. Check your network, DNS, proxy, and TLS certificates.") from None
    except TimeoutError:
        raise RuntimeError("Worker /health timed out after 15 seconds. Check connectivity and try again.") from None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reconnect", action="store_true", help="Replace this Worker's existing Telegram webhook and pair again")
    args = parser.parse_args()
    if not sys.stdin.isatty():
        raise RuntimeError("Run in your own interactive terminal; the token needs a hidden prompt.")
    if not CONFIG.exists():
        raise RuntimeError("Create wrangler.local.json and deploy the Worker first; see docs/analytics.md.")
    config = json.loads(CONFIG.read_text())
    if config["d1_databases"][0]["database_id"] == "00000000-0000-0000-0000-000000000000":
        raise RuntimeError("Replace the placeholder database ID before connecting the bot.")
    worker = input("Deployed Worker URL (https://portfolio-analytics.<subdomain>.workers.dev): ").strip().rstrip("/")
    parsed = urlparse(worker)
    if (parsed.scheme != "https" or parsed.username or parsed.password or parsed.port
            or parsed.path or parsed.query or parsed.fragment
            or not re.fullmatch(r"portfolio-analytics\.[a-z0-9-]+\.workers\.dev", parsed.hostname or "")):
        raise RuntimeError("Enter the root HTTPS workers.dev address printed by Wrangler deploy.")
    check_worker_health(worker)
    token = getpass.getpass("BotFather token (hidden, never saved): ").strip()
    if not re.fullmatch(r"\d+:[A-Za-z0-9_-]+", token):
        raise RuntimeError("The bot token format is invalid.")

    def telegram(method, payload=None):
        request = urllib.request.Request(
            f"https://api.telegram.org/bot{token}/{method}",
            data=json.dumps(payload or {}).encode(), headers={"Content-Type": "application/json", "User-Agent": USER_AGENT},
        )
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                result = json.load(response)
        except (urllib.error.URLError, TimeoutError):
            # Exceptions can include the request URL, which contains the token.
            raise RuntimeError(f"Telegram {method} failed. Check the token and network; no token was logged.") from None
        if not result.get("ok"):
            raise RuntimeError(f"Telegram rejected {method}; check your bot configuration.")
        return result["result"]

    bot = telegram("getMe")
    if bot.get("username", "").lower() != config["vars"]["BOT_USERNAME"].lower():
        raise RuntimeError("This token belongs to a different bot. Use @prof_analytics_003_bot.")
    webhook = worker + "/telegram"
    existing = telegram("getWebhookInfo").get("url")
    if existing:
        if existing != webhook or not args.reconnect:
            raise RuntimeError("A webhook already exists. For this same Worker, rerun with --reconnect; another endpoint will not be overwritten.")
        telegram("deleteWebhook")
    nonce = secrets.token_hex(12)
    print(f"In your PRIVATE chat with @{bot['username']}, send exactly:\n/start {nonce}")
    input("After sending it, press Enter here (the bot will not reply yet): ")
    offset = 0
    owner = None
    # Drain older pending updates without treating any old /start as ownership proof.
    for _ in range(100):
        updates = telegram("getUpdates", {"offset": offset, "limit": 100, "timeout": 0, "allowed_updates": ["message"]})
        if not updates:
            break
        for update in updates:
            offset = max(offset, update["update_id"] + 1)
            message = update.get("message", {})
            sender, chat = message.get("from", {}), message.get("chat", {})
            if (message.get("text") == f"/start {nonce}" and chat.get("type") == "private"
                    and sender.get("id") == chat.get("id") and not sender.get("is_bot")):
                owner = sender["id"]
        if owner is not None:
            break
    if owner is None:
        raise RuntimeError("Pairing message not found. Run again and send the new command from your private account.")
    secret = secrets.token_hex(32)
    # Secrets go through stdin, never command-line arguments or files.
    result = subprocess.run(
        [str(ROOT / "node_modules/.bin/wrangler"), "secret", "bulk", "--config", str(CONFIG)],
        input=json.dumps({"TELEGRAM_OWNER_ID": str(owner), "TELEGRAM_WEBHOOK_SECRET": secret}),
        text=True, cwd=ROOT,
    )
    if result.returncode:
        raise RuntimeError("Cloudflare secret upload failed. Log in to Wrangler and rerun this command.")
    telegram("setWebhook", {"url": webhook, "secret_token": secret, "allowed_updates": ["message"]})
    if telegram("getWebhookInfo").get("url") != webhook:
        raise RuntimeError("Webhook verification failed. Rerun with --reconnect.")
    print(f"Connected private reports for Telegram account {owner}. Send /stats or /pages to your bot.")
    print(f"Set GitHub Actions repository variable NEXT_PUBLIC_ANALYTICS_URL to {worker}, then rebuild Pages.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nCancelled. No bot token was saved.", file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        # Only our explicit RuntimeErrors are safe to display; never print raw HTTP tracebacks.
        print(str(error) if isinstance(error, RuntimeError) else "Setup failed. Check your local configuration and network; no token was logged.", file=sys.stderr)
        sys.exit(1)
