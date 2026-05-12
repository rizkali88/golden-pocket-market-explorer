from dataclasses import dataclass


@dataclass(frozen=True)
class ScoreWeights:
    valuation: float = 0.30
    trend: float = 0.25
    rebound: float = 0.15
    macro_catalyst: float = 0.20
    risk: float = 0.10


DEFAULT_WEIGHTS = ScoreWeights()

REQUIRED_FIELDS = [
    "ticker",
    "name",
    "forward_pe",
    "pb",
    "fcf_yield",
    "rel_1m",
    "rel_3m",
    "rel_6m",
    "pct_above_50dma",
    "pct_above_200dma",
    "distance_from_high",
    "earnings_revision_3m",
    "catalyst_score",
    "macro_fit_score",
    "volatility_90d",
]

GOLDEN_POCKET_LOW = 8.0
GOLDEN_POCKET_HIGH = 18.0
GOLDEN_POCKET_TOLERANCE = 20.0
