import unittest

from golden_pocket.research_pipeline import (
    TickerMetrics,
    build_method_meta,
    build_scores,
    build_targets,
    build_symbol_map,
    build_compact_price_history,
    compact_fundamentals,
    first_number,
    history_chunk_key,
    parse_fmp_response,
)


class ResearchPipelineTests(unittest.TestCase):
    def test_scores_and_targets_are_bounded(self) -> None:
        metric = TickerMetrics(
            ticker="TEST",
            name="Test Corp",
            sector="Technology",
            industry="Software & IT Services",
            exchange="Nasdaq",
            instrument_type="EQUITY",
            price=100.0,
            high_52w=120.0,
            low_52w=65.0,
            ret_21d=6.0,
            ret_63d=18.0,
            ret_126d=24.0,
            ret_252d=31.0,
            sma_50_gap=7.0,
            sma_200_gap=11.0,
            volatility_63d=28.0,
            below_high_pct=16.0,
            liquidity_estimate=850_000_000.0,
            data_points=252,
        )
        sector_context = {
            "Technology": {
                "ret_63d_median": 9.0,
                "ret_126d_median": 15.0,
                "vol_63d_median": 24.0,
                "below_high_median": 12.0,
            }
        }
        global_context = {
            "ret_63d_median": 3.0,
            "ret_126d_median": 7.0,
            "vol_63d_median": 26.0,
            "below_high_median": 15.0,
            "liquidity_median": 110_000_000.0,
        }

        scores = build_scores(metric, sector_context, global_context)
        self.assertGreaterEqual(scores["trend"], 0.0)
        self.assertLessEqual(scores["trend"], 100.0)

        targets = build_targets(metric, scores, sector_context, global_context)
        self.assertLess(targets["bear"], targets["base"])
        self.assertLess(targets["base"], targets["bull"])

        meta = build_method_meta(metric, scores, targets)
        self.assertIn(meta["recommendedMethod"], {"consensus", "valuation", "hybrid"})

    def test_fmp_rows_parse_json_and_csv(self) -> None:
        json_rows = parse_fmp_response('[{"symbol":"AAPL","peRatioTTM":28.4}]')
        self.assertEqual(json_rows[0]["symbol"], "AAPL")

        csv_rows = parse_fmp_response("symbol,peRatioTTM\nMSFT,31.2\n")
        self.assertEqual(csv_rows[0]["symbol"], "MSFT")

    def test_fmp_symbol_map_and_numeric_values(self) -> None:
        rows = [{"symbol": "BRK.B", "marketCapTTM": "900000000000"}]
        mapped = build_symbol_map(rows)
        self.assertEqual(first_number(mapped["BRK.B"], ["marketCapTTM"]), 900000000000.0)

    def test_compact_fundamentals_ignores_source_only_payloads(self) -> None:
        self.assertIsNone(
            compact_fundamentals(
                {"source": "Financial Modeling Prep", "updatedAt": "2026-05-12T00:00:00Z"}
            )
        )
        self.assertEqual(
            compact_fundamentals(
                {"source": "Financial Modeling Prep", "updatedAt": "2026-05-12T00:00:00Z", "marketCap": 10}
            )["marketCap"],
            10,
        )

    def test_history_chunks_are_small_prefixes(self) -> None:
        self.assertEqual(history_chunk_key("AAPL"), "aa")
        self.assertEqual(history_chunk_key("BRK.B"), "br")
        self.assertEqual(history_chunk_key("7ABC"), "n7")

    def test_compact_price_history_preserves_ohlcv(self) -> None:
        compact = build_compact_price_history(
            {
                "meta": {"range": "10y", "dataGranularity": "1d"},
                "timestamp": [1, 2],
                "open": [10.0, 11.0],
                "high": [12.0, 13.0],
                "low": [9.0, 10.0],
                "close": [11.0, 12.0],
                "volume": [100, 200],
            }
        )
        self.assertEqual(compact["r"], "10y")
        self.assertEqual(compact["g"], "1d")
        self.assertEqual(compact["o"], [10.0, 11.0])


if __name__ == "__main__":
    unittest.main()
