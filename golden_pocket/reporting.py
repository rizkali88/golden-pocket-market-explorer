from __future__ import annotations

import json
from dataclasses import asdict

from golden_pocket.scoring import SectorScore


def render_text(scores: list[SectorScore], top: int) -> str:
    lines = []
    header = f"{'Rank':<4} {'Ticker':<6} {'Sector':<24} {'Score':>7} {'Val':>7} {'Trend':>7} {'Rebound':>9}"
    lines.append(header)
    lines.append("-" * len(header))
    for index, score in enumerate(scores[:top], start=1):
        lines.append(
            f"{index:<4} {score.ticker:<6} {score.name:<24} "
            f"{score.total_score:>7.2f} {score.valuation_score:>7.2f} "
            f"{score.trend_score:>7.2f} {score.rebound_score:>9.2f}"
        )
        lines.append(f"     {score.commentary}")
    return "\n".join(lines)


def render_markdown(scores: list[SectorScore], top: int) -> str:
    lines = [
        "# Golden Pocket Sector Report",
        "",
        "| Rank | Ticker | Sector | Total | Valuation | Trend | Rebound | Macro/Catalyst | Risk |",
        "| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ]
    for index, score in enumerate(scores[:top], start=1):
        lines.append(
            "| "
            f"{index} | {score.ticker} | {score.name} | {score.total_score:.2f} | "
            f"{score.valuation_score:.2f} | {score.trend_score:.2f} | "
            f"{score.rebound_score:.2f} | {score.macro_catalyst_score:.2f} | {score.risk_score:.2f} |"
        )
        lines.append("")
        lines.append(f"- `{score.ticker}`: {score.commentary}")
        lines.append("")
    return "\n".join(lines).strip()


def render_json(scores: list[SectorScore], top: int) -> str:
    payload = [asdict(score) for score in scores[:top]]
    return json.dumps(payload, indent=2)
