from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

from golden_pocket.config import (
    DEFAULT_WEIGHTS,
    GOLDEN_POCKET_HIGH,
    GOLDEN_POCKET_LOW,
    GOLDEN_POCKET_TOLERANCE,
    ScoreWeights,
)


@dataclass(frozen=True)
class SectorSnapshot:
    ticker: str
    name: str
    forward_pe: float
    pb: float
    fcf_yield: float
    rel_1m: float
    rel_3m: float
    rel_6m: float
    pct_above_50dma: float
    pct_above_200dma: float
    distance_from_high: float
    earnings_revision_3m: float
    catalyst_score: float
    macro_fit_score: float
    volatility_90d: float


@dataclass(frozen=True)
class SectorScore:
    ticker: str
    name: str
    total_score: float
    valuation_score: float
    trend_score: float
    rebound_score: float
    macro_catalyst_score: float
    risk_score: float
    commentary: str


def percentile_rank(value: float, values: Iterable[float], higher_is_better: bool) -> float:
    ordered = sorted(set(values))
    if len(ordered) == 1:
        return 50.0
    index = ordered.index(value)
    rank = index / (len(ordered) - 1)
    if not higher_is_better:
        rank = 1.0 - rank
    return rank * 100.0


def band_score(value: float, low: float, high: float, tolerance: float) -> float:
    if low <= value <= high:
        return 100.0
    if value < low:
        gap = low - value
    else:
        gap = value - high
    scaled = max(0.0, 1.0 - gap / tolerance)
    return scaled * 100.0


def weighted_average(parts: list[tuple[float, float]]) -> float:
    total_weight = sum(weight for _, weight in parts)
    if total_weight == 0:
        return 0.0
    return sum(value * weight for value, weight in parts) / total_weight


def build_commentary(
    valuation_score: float,
    trend_score: float,
    rebound_score: float,
    macro_catalyst_score: float,
    risk_score: float,
) -> str:
    strengths: list[str] = []
    warnings: list[str] = []

    if valuation_score >= 70:
        strengths.append("cheap versus peers")
    elif valuation_score <= 35:
        warnings.append("valuation looks crowded")

    if trend_score >= 70:
        strengths.append("trend and breadth are supportive")
    elif trend_score <= 35:
        warnings.append("trend confirmation is weak")

    if rebound_score >= 70:
        strengths.append("still in the rebound pocket")
    elif rebound_score <= 35:
        warnings.append("either too extended or still broken")

    if macro_catalyst_score >= 70:
        strengths.append("macro and catalysts line up")
    elif macro_catalyst_score <= 35:
        warnings.append("macro tailwind is limited")

    if risk_score <= 35:
        warnings.append("volatility needs tighter risk control")

    strength_text = ", ".join(strengths[:3]) or "mixed setup"
    warning_text = ", ".join(warnings[:2])
    if warning_text:
        return f"Strengths: {strength_text}. Watch: {warning_text}."
    return f"Strengths: {strength_text}."


def rank_sectors(
    snapshots: list[SectorSnapshot], weights: ScoreWeights = DEFAULT_WEIGHTS
) -> list[SectorScore]:
    pe_values = [row.forward_pe for row in snapshots]
    pb_values = [row.pb for row in snapshots]
    fcf_values = [row.fcf_yield for row in snapshots]
    rel_1m_values = [row.rel_1m for row in snapshots]
    rel_3m_values = [row.rel_3m for row in snapshots]
    rel_6m_values = [row.rel_6m for row in snapshots]
    breadth_50_values = [row.pct_above_50dma for row in snapshots]
    breadth_200_values = [row.pct_above_200dma for row in snapshots]
    revision_values = [row.earnings_revision_3m for row in snapshots]
    volatility_values = [row.volatility_90d for row in snapshots]
    acceleration_values = [row.rel_1m - row.rel_6m for row in snapshots]

    ranked: list[SectorScore] = []
    for row in snapshots:
        valuation_score = weighted_average(
            [
                (percentile_rank(row.forward_pe, pe_values, higher_is_better=False), 0.40),
                (percentile_rank(row.pb, pb_values, higher_is_better=False), 0.20),
                (percentile_rank(row.fcf_yield, fcf_values, higher_is_better=True), 0.40),
            ]
        )
        trend_score = weighted_average(
            [
                (percentile_rank(row.rel_1m, rel_1m_values, higher_is_better=True), 0.20),
                (percentile_rank(row.rel_3m, rel_3m_values, higher_is_better=True), 0.35),
                (percentile_rank(row.rel_6m, rel_6m_values, higher_is_better=True), 0.20),
                (percentile_rank(row.pct_above_50dma, breadth_50_values, higher_is_better=True), 0.15),
                (percentile_rank(row.pct_above_200dma, breadth_200_values, higher_is_better=True), 0.10),
            ]
        )
        acceleration = row.rel_1m - row.rel_6m
        rebound_score = weighted_average(
            [
                (
                    band_score(
                        row.distance_from_high,
                        low=GOLDEN_POCKET_LOW,
                        high=GOLDEN_POCKET_HIGH,
                        tolerance=GOLDEN_POCKET_TOLERANCE,
                    ),
                    0.55,
                ),
                (percentile_rank(acceleration, acceleration_values, higher_is_better=True), 0.25),
                (percentile_rank(row.pct_above_50dma, breadth_50_values, higher_is_better=True), 0.20),
            ]
        )
        macro_catalyst_score = weighted_average(
            [
                (row.macro_fit_score, 0.45),
                (percentile_rank(row.earnings_revision_3m, revision_values, higher_is_better=True), 0.30),
                (row.catalyst_score, 0.25),
            ]
        )
        risk_score = weighted_average(
            [
                (percentile_rank(row.volatility_90d, volatility_values, higher_is_better=False), 0.65),
                (
                    band_score(
                        row.distance_from_high,
                        low=5.0,
                        high=25.0,
                        tolerance=25.0,
                    ),
                    0.35,
                ),
            ]
        )
        total_score = weighted_average(
            [
                (valuation_score, weights.valuation),
                (trend_score, weights.trend),
                (rebound_score, weights.rebound),
                (macro_catalyst_score, weights.macro_catalyst),
                (risk_score, weights.risk),
            ]
        )
        commentary = build_commentary(
            valuation_score=valuation_score,
            trend_score=trend_score,
            rebound_score=rebound_score,
            macro_catalyst_score=macro_catalyst_score,
            risk_score=risk_score,
        )
        ranked.append(
            SectorScore(
                ticker=row.ticker,
                name=row.name,
                total_score=round(total_score, 2),
                valuation_score=round(valuation_score, 2),
                trend_score=round(trend_score, 2),
                rebound_score=round(rebound_score, 2),
                macro_catalyst_score=round(macro_catalyst_score, 2),
                risk_score=round(risk_score, 2),
                commentary=commentary,
            )
        )

    return sorted(ranked, key=lambda item: item.total_score, reverse=True)
