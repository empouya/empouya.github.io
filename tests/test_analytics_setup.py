"""Regression coverage for the health check that runs before the token prompt."""
import importlib.util
from pathlib import Path
import unittest
from unittest.mock import MagicMock, patch
import urllib.error

spec = importlib.util.spec_from_file_location(
    "analytics_setup", Path(__file__).resolve().parents[1] / "scripts/connect-analytics-bot.py"
)
setup = importlib.util.module_from_spec(spec)
spec.loader.exec_module(setup)


class HealthCheckTests(unittest.TestCase):
    def test_identifies_client_and_accepts_no_content(self):
        response = MagicMock()
        response.__enter__.return_value.status = 204
        with patch.object(setup.urllib.request, "urlopen", return_value=response) as send:
            setup.check_worker_health("https://portfolio-analytics.example.workers.dev")
        request = send.call_args.args[0]
        self.assertEqual(request.full_url, "https://portfolio-analytics.example.workers.dev/health")
        self.assertEqual(request.get_header("User-agent"), "portfolio-analytics-setup/1.0")
        self.assertEqual(send.call_args.kwargs["timeout"], 15)

    def test_http_failure_reports_status_without_raw_exception(self):
        error = urllib.error.HTTPError("https://sensitive.invalid/", 403, "sensitive error text", {}, None)
        with patch.object(setup.urllib.request, "urlopen", side_effect=error):
            with self.assertRaisesRegex(RuntimeError, "HTTP 403") as raised:
                setup.check_worker_health("https://worker.invalid")
        self.assertNotIn("sensitive", str(raised.exception))

    def test_network_failure_does_not_print_raw_exception(self):
        with patch.object(setup.urllib.request, "urlopen", side_effect=urllib.error.URLError("sensitive error text")):
            with self.assertRaisesRegex(RuntimeError, "network, DNS, proxy, and TLS") as raised:
                setup.check_worker_health("https://worker.invalid")
        self.assertNotIn("sensitive", str(raised.exception))

    def test_timeout_is_actionable(self):
        with patch.object(setup.urllib.request, "urlopen", side_effect=TimeoutError()):
            with self.assertRaisesRegex(RuntimeError, "timed out"):
                setup.check_worker_health("https://worker.invalid")

    def test_html_page_is_not_a_successful_health_check(self):
        response = MagicMock()
        response.__enter__.return_value.status = 200
        with patch.object(setup.urllib.request, "urlopen", return_value=response):
            with self.assertRaisesRegex(RuntimeError, "HTTP 200; expected HTTP 204"):
                setup.check_worker_health("https://worker.invalid")


if __name__ == "__main__":
    unittest.main()
