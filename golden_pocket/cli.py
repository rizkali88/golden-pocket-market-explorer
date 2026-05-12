from __future__ import annotations

import argparse
import csv
from pathlib import Path

from golden_pocket.config import REQUIRED_FIELDS
from golden_pocket.reporting import render_json, render_markdown, render_text
from golden_pocket.scoring import SectorSnapshot, rank_sectors


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Rank US sectors for mid-term golden pocket opportunities."
    )
    parser.add_argument("--input", required=True, help="Path to the sector snapshot CSV.")
    parser.add_argument(
        "--top",
        type=int,
        default=5,
        help="How many sectors to display.",
    )
    parser.add_argument(
        "--format",
        choices=["text", "markdown", "json"],
        default="text",
        help="Output format.",
    )
    parser.add_argument(
        "--output",
        help="Optional file path to write the report to.",
    )
    return parser.parse_args()


def load_snapshots(path: Path) -> list[SectorSnapshot]:
    with path.open("r", newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        missing = [field for field in REQUIRED_FIELDS if field not in (reader.fieldnames or [])]
        if missing:
            raise ValueError(f"Input file is missing required columns: {', '.join(missing)}")

        rows: list[SectorSnapshot] = []
        for raw in reader:
            rows.append(
                SectorSnapshot(
                    ticker=raw["ticker"].strip(),
                    name=raw["name"].strip(),
                    forward_pe=float(raw["forward_pe"]),
                    pb=float(raw["pb"]),
                    fcf_yield=float(raw["fcf_yield"]),
                    rel_1m=float(raw["rel_1m"]),
                    rel_3m=float(raw["rel_3m"]),
                    rel_6m=float(raw["rel_6m"]),
                    pct_above_50dma=float(raw["pct_above_50dma"]),
                    pct_above_200dma=float(raw["pct_above_200dma"]),
                    distance_from_high=float(raw["distance_from_high"]),
                    earnings_revision_3m=float(raw["earnings_revision_3m"]),
                    catalyst_score=float(raw["catalyst_score"]),
                    macro_fit_score=float(raw["macro_fit_score"]),
                    volatility_90d=float(raw["volatility_90d"]),
                )
            )
    if not rows:
        raise ValueError("Input file does not contain any sector rows.")
    return rows


def build_report(format_name: str, top: int, scores: list) -> str:
    if format_name == "markdown":
        return render_markdown(scores, top=top)
    if format_name == "json":
        return render_json(scores, top=top)
    return render_text(scores, top=top)


def main() -> int:
    args = parse_args()
    input_path = Path(args.input)
    scores = rank_sectors(load_snapshots(input_path))
    report = build_report(args.format, args.top, scores)

    if args.output:
        output_path = Path(args.output)
        output_path.write_text(report, encoding="utf-8")
    else:
        print(report)
    return 0
