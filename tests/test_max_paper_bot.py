import time
import unittest

from golden_pocket.max_paper_bot import (
    DEFAULT_BOT_FRAME_LABEL,
    apply_live_quotes,
    is_tradable_for_new_entry,
    max_signal,
    run_max_bot,
)


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
        self.assertEqual(state["lastEvaluations"]["PENNY"]["action"], "REJECTED")
        self.assertEqual(state["lastEvaluations"]["PENNY"]["rejectionCode"], "NOT_TRADABLE")
        self.assertNotIn("PENNY", state["positions"])

    def test_liquidity_score_prefers_dollar_volume_over_bucket(self) -> None:
        signal = max_signal(make_profile("LIQ", avgDailyDollarVolume=42_000_000, liquidityBucket="Low"))
        self.assertGreaterEqual(signal["liquidityScore"], 80)

    def test_uses_cached_history_frame_for_execution_levels(self) -> None:
        now = int(time.time())
        history = {
            "t": [now - (8 - index) * 86_400 for index in range(9)],
            "c": [38, 39, 40, 41, 42, 43.5, 42.2, 41.8, 41.0],
        }
        signal = max_signal(make_profile("FRAME", price=41.0), history)
        self.assertEqual(signal["frame"], DEFAULT_BOT_FRAME_LABEL)
        self.assertLess(signal["levels"]["entryHigh"], 45)

    def test_capacity_reason_is_visible_for_eligible_ticker(self) -> None:
        positions = {
            f"OPEN{index}": {"ticker": f"OPEN{index}", "shares": 1, "entryPrice": 10, "lastPrice": 10}
            for index in range(8)
        }
        state = run_max_bot(
            [make_profile("CAP")],
            {"positions": positions, "trades": [], "cash": 10000},
            max_open_positions=8,
        )
        self.assertEqual(state["lastEvaluations"]["CAP"]["action"], "WAIT")
        self.assertEqual(state["lastEvaluations"]["CAP"]["rejectionCode"], "CAPACITY")

    def test_live_quote_updates_price_context(self) -> None:
        profiles = apply_live_quotes(
            [make_profile("LIVE", price=50.0, fiftyTwoWeekLow=20.0, fiftyTwoWeekHigh=80.0)],
            {"LIVE": {"symbol": "LIVE", "price": 62.0}},
            fetched_at="2026-05-14T00:00:00Z",
        )
        self.assertEqual(profiles[0]["price"], 62.0)
        self.assertEqual(profiles[0]["livePrice"], 62.0)
        self.assertEqual(profiles[0]["rangePositionPct"], 70.0)

    def test_does_not_exit_tp2_from_recalculated_lower_target(self) -> None:
        state = {
            "positions": {
                "HOLD": {
                    "ticker": "HOLD",
                    "shares": 1,
                    "entryPrice": 100.0,
                    "lastPrice": 100.0,
                    "stop": 70.0,
                    "target2": 120.0,
                }
            },
            "trades": [],
            "cash": 9900,
        }
        next_state = run_max_bot(
            [
                make_profile(
                    "HOLD",
                    price=100.0,
                    fiftyTwoWeekLow=80.0,
                    fiftyTwoWeekHigh=90.0,
                    rangePositionPct=50.0,
                )
            ],
            state,
        )
        self.assertIn("HOLD", next_state["positions"])
        self.assertEqual(next_state["trades"], [])

    def test_sell_trade_records_entry_price_and_realized_pnl(self) -> None:
        state = {
            "positions": {
                "EXIT": {
                    "ticker": "EXIT",
                    "shares": 2,
                    "entryPrice": 100.0,
                    "lastPrice": 100.0,
                    "stop": 70.0,
                    "target2": 120.0,
                }
            },
            "trades": [],
            "cash": 9800,
            "realizedPnl": 0,
        }
        next_state = run_max_bot(
            [make_profile("EXIT", price=125.0, fiftyTwoWeekLow=80.0, fiftyTwoWeekHigh=130.0)],
            state,
        )
        self.assertNotIn("EXIT", next_state["positions"])
        trade = next_state["trades"][0]
        self.assertEqual(trade["type"], "SELL")
        self.assertEqual(trade["entryPrice"], 100.0)
        self.assertEqual(trade["exitPrice"], 125.0)
        self.assertEqual(trade["realizedPnl"], 50.0)
        self.assertEqual(trade["pnl"], 50.0)


if __name__ == "__main__":
    unittest.main()
