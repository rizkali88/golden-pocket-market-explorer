import unittest

from golden_pocket.research_pipeline import (
    TickerMetrics,
    build_method_meta,
    build_scores,
    build_targets,
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


if __name__ == "__main__":
    unittest.main()
