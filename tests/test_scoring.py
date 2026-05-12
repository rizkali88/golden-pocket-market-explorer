import unittest

from golden_pocket.scoring import (
    SectorSnapshot,
    band_score,
    percentile_rank,
    rank_sectors,
)


class ScoringTests(unittest.TestCase):
    def test_percentile_rank_prefers_higher_values(self) -> None:
        values = [1.0, 2.0, 3.0]
        self.assertEqual(percentile_rank(3.0, values, higher_is_better=True), 100.0)
        self.assertEqual(percentile_rank(1.0, values, higher_is_better=False), 100.0)

    def test_band_score_prefers_values_inside_target_range(self) -> None:
        self.assertEqual(band_score(12.0, 8.0, 18.0, 20.0), 100.0)
        self.assertLess(band_score(2.0, 8.0, 18.0, 20.0), 100.0)
        self.assertLess(band_score(30.0, 8.0, 18.0, 20.0), 100.0)

    def test_rank_sectors_surfaces_balanced_candidate(self) -> None:
        rows = [
            SectorSnapshot("AAA", "Value Trap", 9, 1.1, 8.0, -3.0, -2.0, -1.0, 22, 35, 28, -2.0, 20, 25, 32),
            SectorSnapshot("BBB", "Balanced", 15, 2.1, 6.2, 2.1, 4.8, 5.5, 68, 75, 12, 2.5, 78, 80, 18),
            SectorSnapshot("CCC", "Crowded", 29, 8.0, 2.0, 3.1, 5.5, 12.0, 74, 82, 2, 1.7, 66, 62, 26),
        ]
        ranked = rank_sectors(rows)
        self.assertEqual(ranked[0].ticker, "BBB")


if __name__ == "__main__":
    unittest.main()
