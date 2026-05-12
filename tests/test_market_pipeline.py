import json
import unittest
from pathlib import Path

from golden_pocket.market_pipeline import build_payload, classify_company, write_outputs


class MarketPipelineTests(unittest.TestCase):
    def test_classify_company_maps_pharma_to_health_care(self) -> None:
        result = classify_company("ELI LILLY & Co", "2834", "Pharmaceutical Preparations")
        self.assertEqual(result.sector, "Health Care")
        self.assertEqual(result.industry, "Pharmaceuticals & Therapeutics")

    def test_classify_company_maps_computers_to_technology(self) -> None:
        result = classify_company("Apple Inc.", "3571", "Electronic Computers")
        self.assertEqual(result.sector, "Technology")
        self.assertEqual(result.industry, "Computers & Hardware")

    def test_write_outputs_emits_json_and_js_bundles(self) -> None:
        payload = build_payload(
            [
                {
                    "id": "aapl",
                    "ticker": "AAPL",
                    "name": "Apple Inc.",
                    "exchange": "Nasdaq",
                    "cik": "0000320193",
                    "sector": "Technology",
                    "industry": "Computers & Hardware",
                    "sic": "3571",
                    "sicDescription": "Electronic Computers",
                    "classificationSource": "sic_keywords",
                    "classificationConfidence": 92,
                    "submissionTickers": ["AAPL"],
                    "profileMode": "directory_only",
                }
            ]
        )

        output_dir = Path("tests_artifacts/market_pipeline_output")
        output_dir.mkdir(parents=True, exist_ok=True)
        json_path, js_path = write_outputs(payload, output_dir)
        self.assertTrue(json_path.exists())
        self.assertTrue(js_path.exists())
        self.assertIn("window.GOLDEN_POCKET_UNIVERSE", js_path.read_text(encoding="utf-8"))
        decoded = json.loads(json_path.read_text(encoding="utf-8"))
        self.assertEqual(decoded["stats"]["totalTickers"], 1)


if __name__ == "__main__":
    unittest.main()
