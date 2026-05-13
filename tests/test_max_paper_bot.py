import unittest

from golden_pocket.max_paper_bot import apply_live_quotes, is_tradable_for_new_entry, run_max_bot


def make_profile(ticker: str, **overrides):
    profile = {
        "ticker": ticker,
        "name": f"{ticker} Corp",
        "exchange": "NYSE",
        "profileMode": "model_ready",
        "price": 50.0,
        "avgDailyDollarVolume": 20_000_000,
        "fiftyTwoWeekLow": 20.0,
        "fiftyTwoWeekHigh": 80.0,
        "rangePositionPct": 50.0,
        "targets": {"bear": -8, "base": 8, "bull": 16},
        "scores": [
            {"label": "Trend strength", "value": 90},
            {"label": "Rebound setup", "value": 80},
            {"label": "Risk balance", "value": 75},
        ],
    }
    profile.update(overrides)
    return profile


class MaxPaperBotTests(unittest.TestCase):
    def test_excludes_otc_from_new_entries(self) -> None:
        self.assertFalse(is_tradable_for_new_entry(make_profile("OTCX", exchange="OTC")))

    def test_opens_paper_position_from_max_signal(self) -> None:
        state = run_max_bot([make_profile("TEST")], {"positions": {}, "trades": [], "cash": 10000})
        self.assertIn("TEST", state["positions"])
        self.assertEqual(state["trades"][0]["type"], "BUY")

    def test_last_evaluation_does_not_buy_non_tradable_ticker(self) -> None:
        state = run_max_bot(
            [make_profile("PENNY", price=4.0, avgDailyDollarVolume=100_000)],
            {"positions": {}, "trades": [], "cash": 10000},
        )
        self.assertEqual(state["lastEvaluations"]["PENNY"]["action"], "WAIT")
        self.assertNotIn("PENNY", state["positions"])

    def test_live_quote_updates_price_context(self) -> None:
        profiles = apply_live_quotes(
            [make_profile("LIVE", price=50.0, fiftyTwoWeekLow=20.0, fiftyTwoWeekHigh=80.0)],
            {"LIVE": {"symbol": "LIVE", "price": 62.0}},
            fetched_at="2026-05-14T00:00:00Z",
        )
        self.assertEqual(profiles[0]["price"], 62.0)
        self.assertEqual(profiles[0]["livePrice"], 62.0)
        self.assertEqual(profiles[0]["rangePositionPct"], 70.0)


if __name__ == "__main__":
    unittest.main()
