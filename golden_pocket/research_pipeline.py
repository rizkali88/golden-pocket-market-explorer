from __future__ import annotations

import argparse
import concurrent.futures
import json
import math
import time
import urllib.parse
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from statistics import median
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from golden_pocket.market_pipeline import DEFAULT_USER_AGENT

YAHOO_SPARK_URL = "https://query1.finance.yahoo.com/v7/finance/spark"
VALID_INSTRUMENT_TYPES = {"EQUITY", "ETF"}


@dataclass(frozen=True)
class TickerMetrics:
    ticker: str
    name: str
    sector: str
    industry: str
    exchange: str
    instrument_type: str
    price: float
    high_52w: float
    low_52w: float
    ret_21d: float
    ret_63d: float
    ret_126d: float
    ret_252d: float
    sma_50_gap: float
    sma_200_gap: float
    volatility_63d: float
    below_high_pct: float
    liquidity_estimate: float
    data_points: int


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Generate automatic research-ready ticker profiles for the Golden Pocket webapp."
    )
    parser.add_argument(
        "--universe-path",
        default="webapp/data/market_universe.json",
        help="Path to the generated market universe JSON file.",
    )
    parser.add_argument(
        "--output-dir",
        default="webapp/data",
        help="Directory that will receive research_profiles.js and research_profiles.json.",
    )
    parser.add_argument(
        "--cache-dir",
        default="data/research_cache",
        help="Directory used for per-ticker market data cache files.",
    )
    parser.add_argument(
        "--user-agent",
        default=DEFAULT_USER_AGENT,
        help="Declared user agent for market-data requests.",
    )
    parser.add_argument(
        "--cache-hours",
        type=float,
        default=24.0,
        help="How long cached market data stays fresh before refresh.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=25.0,
        help="HTTP timeout in seconds.",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=20,
        help="How many tickers to request in each batched price-history call.",
    )
    parser.add_argument(
        "--max-workers",
        type=int,
        default=4,
        help="Concurrent batch workers.",
    )
    parser.add_argument(
        "--pause-seconds",
        type=float,
        default=0.25,
        help="Delay between outbound batch requests per worker group.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Optional cap for the number of tickers to process while testing.",
    )
    parser.add_argument(
        "--force-refresh",
        action="store_true",
        help="Ignore cache freshness and pull fresh market data.",
    )
    return parser


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def percentileish(value: float, center: float, scale: float) -> float:
    if scale == 0:
        return 50.0
    return clamp(50.0 + ((value - center) / scale) * 25.0, 0.0, 100.0)


def chunked(items: list[dict[str, Any]], size: int) -> Iterable[list[dict[str, Any]]]:
    for index in range(0, len(items), size):
        yield items[index : index + size]


def safe_for_spark(symbol: str) -> bool:
    return bool(symbol) and all(char.isalnum() or char in ".-^=" for char in symbol)


def cache_is_fresh(path: Path, cache_hours: float) -> bool:
    if not path.exists():
        return False
    age_seconds = time.time() - path.stat().st_mtime
    return age_seconds <= cache_hours * 3600


def load_cached_price_payload(
    cache_path: Path, cache_hours: float, force_refresh: bool
) -> dict[str, Any] | None:
    if force_refresh or not cache_is_fresh(cache_path, cache_hours):
        return None
    try:
        return json.loads(cache_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def write_cache(cache_path: Path, payload: dict[str, Any]) -> None:
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    cache_path.write_text(json.dumps(payload), encoding="utf-8")


def fetch_spark_batch(
    batch: list[dict[str, Any]], user_agent: str, timeout: float
) -> dict[str, dict[str, Any]]:
    symbols = ",".join(item["ticker"] for item in batch)
    url = (
        f"{YAHOO_SPARK_URL}?symbols="
        f"{urllib.parse.quote(symbols, safe=',.-^=')}"
        "&range=1y&interval=1d&indicators=close&includeTimestamps=true"
    )
    request = Request(url, headers={"User-Agent": user_agent})
    with urlopen(request, timeout=timeout) as response:
        payload = json.loads(response.read().decode("utf-8"))

    results = {}
    for item in payload.get("spark", {}).get("result", []):
        symbol = item.get("symbol")
        response_rows = item.get("response") or []
        if not symbol or not response_rows:
            continue
        first = response_rows[0]
        close_series = (
            first.get("indicators", {})
            .get("quote", [{}])[0]
            .get("close", [])
        )
        results[symbol] = {
            "meta": first.get("meta", {}),
            "timestamp": first.get("timestamp") or [],
            "close": close_series,
        }
    return results


def ensure_price_history(
    records: list[dict[str, Any]],
    *,
    cache_dir: Path,
    user_agent: str,
    cache_hours: float,
    timeout: float,
    batch_size: int,
    max_workers: int,
    pause_seconds: float,
    force_refresh: bool,
) -> dict[str, dict[str, Any]]:
    price_cache_dir = cache_dir / "spark"
    price_cache_dir.mkdir(parents=True, exist_ok=True)

    resolved: dict[str, dict[str, Any]] = {}
    to_fetch: list[dict[str, Any]] = []
    for record in records:
        ticker = record["ticker"]
        cache_path = price_cache_dir / f"{ticker}.json"
        cached = load_cached_price_payload(cache_path, cache_hours, force_refresh)
        if cached is not None:
            resolved[ticker] = cached
        elif safe_for_spark(ticker):
            to_fetch.append(record)

    batches = list(chunked(to_fetch, batch_size))
    if not batches:
        return resolved

    def worker(batch: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
        result = fetch_spark_batch(batch, user_agent=user_agent, timeout=timeout)
        time.sleep(pause_seconds)
        return result

    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(worker, batch) for batch in batches]
        for index, future in enumerate(concurrent.futures.as_completed(futures), start=1):
            try:
                batch_payload = future.result()
            except (HTTPError, URLError, OSError, json.JSONDecodeError, TimeoutError):
                batch_payload = {}
            for ticker, payload in batch_payload.items():
                resolved[ticker] = payload
                write_cache(price_cache_dir / f"{ticker}.json", payload)
            if index == len(futures) or index % 50 == 0:
                print(f"Fetched batched market data for {index}/{len(futures)} request groups...")
    return resolved


def latest_valid(values: list[Any]) -> float | None:
    for value in reversed(values):
        if isinstance(value, (int, float)):
            return float(value)
    return None


def clean_closes(raw_values: list[Any]) -> list[float]:
    return [float(value) for value in raw_values if isinstance(value, (int, float))]


def compute_return(closes: list[float], periods: int) -> float:
    if len(closes) < 2:
        return 0.0
    anchor = closes[0] if len(closes) <= periods else closes[-periods - 1]
    if anchor <= 0:
        return 0.0
    return (closes[-1] / anchor - 1.0) * 100.0


def compute_sma_gap(closes: list[float], periods: int) -> float:
    if len(closes) < periods:
        return 0.0
    sma = sum(closes[-periods:]) / periods
    if sma == 0:
        return 0.0
    return (closes[-1] / sma - 1.0) * 100.0


def compute_annualized_volatility(closes: list[float], periods: int = 63) -> float:
    if len(closes) < periods + 1:
        return 0.0
    window = closes[-(periods + 1) :]
    returns = []
    for left, right in zip(window, window[1:]):
        if left > 0 and right > 0:
            returns.append(math.log(right / left))
    if len(returns) < 5:
        return 0.0
    mean_return = sum(returns) / len(returns)
    variance = sum((value - mean_return) ** 2 for value in returns) / max(1, len(returns) - 1)
    return math.sqrt(variance) * math.sqrt(252) * 100.0


def build_metrics(record: dict[str, Any], market_payload: dict[str, Any]) -> TickerMetrics | None:
    meta = market_payload.get("meta") or {}
    closes = clean_closes(market_payload.get("close") or [])
    price = latest_valid(market_payload.get("close") or [])
    instrument_type = str(meta.get("instrumentType") or "")
    if price is None or len(closes) < 140 or instrument_type not in VALID_INSTRUMENT_TYPES:
        return None

    high_52w = float(meta.get("fiftyTwoWeekHigh") or max(closes))
    low_52w = float(meta.get("fiftyTwoWeekLow") or min(closes))
    regular_volume = float(meta.get("regularMarketVolume") or 0.0)
    below_high_pct = max(0.0, (1.0 - price / high_52w) * 100.0) if high_52w else 0.0
    liquidity_estimate = regular_volume * price

    return TickerMetrics(
        ticker=record["ticker"],
        name=record["name"],
        sector=record["sector"],
        industry=record["industry"],
        exchange=record["exchange"],
        instrument_type=instrument_type,
        price=price,
        high_52w=high_52w,
        low_52w=low_52w,
        ret_21d=compute_return(closes, 21),
        ret_63d=compute_return(closes, 63),
        ret_126d=compute_return(closes, 126),
        ret_252d=compute_return(closes, 252),
        sma_50_gap=compute_sma_gap(closes, 50),
        sma_200_gap=compute_sma_gap(closes, 200),
        volatility_63d=compute_annualized_volatility(closes, 63),
        below_high_pct=below_high_pct,
        liquidity_estimate=liquidity_estimate,
        data_points=len(closes),
    )


def compute_sector_context(metrics: list[TickerMetrics]) -> tuple[dict[str, dict[str, float]], dict[str, float]]:
    by_sector: dict[str, list[TickerMetrics]] = {}
    for item in metrics:
        by_sector.setdefault(item.sector, []).append(item)

    sector_context: dict[str, dict[str, float]] = {}
    for sector, items in by_sector.items():
        sector_context[sector] = {
            "ret_63d_median": median(metric.ret_63d for metric in items),
            "ret_126d_median": median(metric.ret_126d for metric in items),
            "vol_63d_median": median(metric.volatility_63d for metric in items),
            "below_high_median": median(metric.below_high_pct for metric in items),
        }

    global_context = {
        "ret_63d_median": median(metric.ret_63d for metric in metrics),
        "ret_126d_median": median(metric.ret_126d for metric in metrics),
        "vol_63d_median": median(metric.volatility_63d for metric in metrics),
        "below_high_median": median(metric.below_high_pct for metric in metrics),
        "liquidity_median": median(metric.liquidity_estimate for metric in metrics),
    }
    return sector_context, global_context


def liquidity_bucket(liquidity_estimate: float) -> str:
    if liquidity_estimate >= 500_000_000:
        return "High"
    if liquidity_estimate >= 50_000_000:
        return "Medium"
    return "Low"


def build_scores(
    metric: TickerMetrics,
    sector_context: dict[str, dict[str, float]],
    global_context: dict[str, float],
) -> dict[str, float]:
    sector_stats = sector_context[metric.sector]

    trend_raw = (
        50.0
        + metric.ret_63d * 0.9
        + metric.ret_126d * 0.55
        + metric.sma_50_gap * 1.1
        + metric.sma_200_gap * 0.7
    )
    trend_score = clamp(trend_raw, 0.0, 100.0)

    room_score = 100.0 - min(abs(metric.below_high_pct - 18.0) * 3.0, 100.0)
    recent_turn_score = percentileish(metric.ret_21d + metric.ret_63d * 0.4, 0.0, 10.0)
    rebound_score = clamp(room_score * 0.6 + recent_turn_score * 0.4, 0.0, 100.0)

    risk_score = clamp(
        100.0
        - metric.volatility_63d * 1.4
        + max(0.0, metric.sma_200_gap) * 0.45
        - max(0.0, metric.below_high_pct - 35.0) * 0.35,
        0.0,
        100.0,
    )

    sector_support_score = clamp(
        50.0
        + (sector_stats["ret_63d_median"] - global_context["ret_63d_median"]) * 1.2
        + (sector_stats["ret_126d_median"] - global_context["ret_126d_median"]) * 0.7
        - (sector_stats["vol_63d_median"] - global_context["vol_63d_median"]) * 0.5,
        0.0,
        100.0,
    )

    liquidity_score = clamp(
        50.0
        + (math.log10(max(metric.liquidity_estimate, 1.0)) - math.log10(max(global_context["liquidity_median"], 1.0))) * 18.0,
        0.0,
        100.0,
    )

    confidence_score = clamp(
        liquidity_score * 0.35
        + risk_score * 0.2
        + sector_support_score * 0.15
        + clamp(metric.data_points / 252.0 * 100.0, 0.0, 100.0) * 0.15
        + 15.0,
        0.0,
        100.0,
    )

    return {
        "trend": trend_score,
        "rebound": rebound_score,
        "risk": risk_score,
        "sector_support": sector_support_score,
        "liquidity": liquidity_score,
        "confidence": confidence_score,
    }


def build_targets(
    metric: TickerMetrics, scores: dict[str, float], sector_context: dict[str, dict[str, float]], global_context: dict[str, float]
) -> dict[str, int]:
    sector_stats = sector_context[metric.sector]
    sector_alpha = (sector_stats["ret_126d_median"] - global_context["ret_126d_median"]) * 0.18

    base_move = clamp(
        2.0
        + (scores["trend"] - 50.0) * 0.16
        + (scores["rebound"] - 50.0) * 0.08
        + (scores["risk"] - 50.0) * 0.06
        + (scores["sector_support"] - 50.0) * 0.06
        + sector_alpha,
        -12.0,
        26.0,
    )

    bull_spread = clamp(
        7.0
        + max(0.0, scores["trend"] - 50.0) * 0.09
        + max(0.0, scores["sector_support"] - 50.0) * 0.05
        + max(0.0, 55.0 - scores["risk"]) * 0.04,
        6.0,
        18.0,
    )
    bear_spread = clamp(
        8.0
        + max(0.0, 50.0 - scores["risk"]) * 0.12
        + max(0.0, metric.volatility_63d - global_context["vol_63d_median"]) * 0.12,
        6.0,
        20.0,
    )

    bull_move = clamp(base_move + bull_spread, 4.0, 42.0)
    bear_move = clamp(base_move - bear_spread, -35.0, -4.0)

    return {
        "bear": int(round(bear_move)),
        "base": int(round(base_move)),
        "bull": int(round(bull_move)),
    }


def build_method_meta(
    metric: TickerMetrics, scores: dict[str, float], targets: dict[str, int]
) -> dict[str, Any]:
    coverage = liquidity_bucket(metric.liquidity_estimate)
    if coverage == "High" and scores["trend"] >= 62 and scores["sector_support"] >= 55:
        recommended = "consensus"
        reason = (
            f"{metric.ticker} has strong liquidity and a healthy trend profile, so a sentiment-driven lens is the cleanest default for the next 3-6 months."
        )
    elif metric.below_high_pct >= 18 and scores["rebound"] >= 56:
        recommended = "valuation"
        reason = (
            f"{metric.ticker} still sits below its 52-week high while stabilizing, so a rerating-oriented valuation lens fits better than pure momentum chasing."
        )
    else:
        recommended = "hybrid"
        reason = (
            f"{metric.ticker} shows a mixed but workable setup, so blending trend and rerating logic is more balanced than leaning on one lens alone."
        )

    consensus_bonus = 2 if coverage == "High" else 1 if coverage == "Medium" else 0
    consensus_shift = {
        "bear": int(round(clamp((scores["trend"] - 55.0) / 22.0, -2.0, 3.0))),
        "base": int(round(clamp((scores["trend"] - 50.0) / 12.0 + consensus_bonus, -2.0, 5.0))),
        "bull": int(round(clamp((scores["trend"] - 48.0) / 9.0 + consensus_bonus, -2.0, 7.0))),
    }

    valuation_bonus = max(0.0, metric.below_high_pct - 10.0) / 8.0
    valuation_shift = {
        "bear": int(round(clamp((scores["rebound"] - 52.0) / 24.0 - 1.0, -3.0, 2.0))),
        "base": int(round(clamp((scores["rebound"] - 50.0) / 14.0 + valuation_bonus, -3.0, 6.0))),
        "bull": int(round(clamp((scores["rebound"] - 48.0) / 10.0 + valuation_bonus, -2.0, 9.0))),
    }

    valuation_anchor = (
        "Trend continuation and sector-relative rerating model"
        if recommended == "hybrid"
        else "Sentiment-weighted trend model"
        if recommended == "consensus"
        else "Rebound and rerating model"
    )

    return {
        "coverage": coverage,
        "valuationAnchor": valuation_anchor,
        "recommendedMethod": recommended,
        "reason": reason,
        "shifts": {
            "consensus": consensus_shift,
            "valuation": valuation_shift,
        },
        "hybridReference": targets,
    }


def generate_commentary(metric: TickerMetrics, scores: dict[str, float], method_meta: dict[str, Any]) -> tuple[str, str, list[str], list[dict[str, Any]]]:
    if scores["trend"] >= 65:
        setup_style = "momentum continuation"
    elif scores["rebound"] >= 62:
        setup_style = "rebound rerating"
    else:
        setup_style = "balanced swing"

    thesis = (
        f"{metric.ticker} is screening as a {setup_style} setup inside {metric.industry}. The automatic model sees a {('constructive' if scores['confidence'] >= 60 else 'mixed')} 3-6 month profile based on price trend, risk balance, and sector support."
    )
    positioning = (
        f"Best used as a {('core liquid' if method_meta['coverage'] == 'High' else 'selective')} spot-trading watchlist name. The current recommended lens is {method_meta['recommendedMethod']}. {method_meta['reason']}"
    )

    risks = []
    if scores["risk"] < 45:
        risks.append("Volatility is elevated, so the bear path can widen quickly if the tape weakens.")
    if metric.below_high_pct < 6:
        risks.append("The stock is trading close to its 52-week high, which leaves less room for error on entry timing.")
    if method_meta["coverage"] == "Low":
        risks.append("Liquidity and institutional sponsorship are lighter here, so price can gap around news or thin sessions.")
    if scores["sector_support"] < 48:
        risks.append("Sector participation is lagging the market backdrop, which reduces follow-through odds.")
    if not risks:
        risks.append("Even constructive setups still need disciplined entries because a 3-6 month swing can break if the broader market regime changes.")

    score_rows = [
        {"label": "Trend strength", "value": int(round(scores["trend"]))},
        {"label": "Rebound setup", "value": int(round(scores["rebound"]))},
        {"label": "Risk balance", "value": int(round(scores["risk"]))},
        {"label": "Sector support", "value": int(round(scores["sector_support"]))},
        {"label": "Confidence", "value": int(round(scores["confidence"]))},
    ]

    return thesis, positioning, risks, score_rows


def generate_profile(
    record: dict[str, Any],
    metric: TickerMetrics,
    sector_context: dict[str, dict[str, float]],
    global_context: dict[str, float],
    generated_at: str,
) -> dict[str, Any]:
    scores = build_scores(metric, sector_context, global_context)
    targets = build_targets(metric, scores, sector_context, global_context)
    method_meta = build_method_meta(metric, scores, targets)
    thesis, positioning, risks, score_rows = generate_commentary(metric, scores, method_meta)
    range_position_pct = (
        clamp((metric.price - metric.low_52w) / (metric.high_52w - metric.low_52w), 0.0, 1.0) * 100.0
        if metric.high_52w > metric.low_52w
        else 50.0
    )
    above_low_pct = ((metric.price / metric.low_52w) - 1.0) * 100.0 if metric.low_52w > 0 else 0.0

    return {
        "id": record["id"],
        "ticker": record["ticker"],
        "name": record["name"],
        "exchange": record["exchange"],
        "sector": record["sector"],
        "industry": record["industry"],
        "profileMode": "model_ready",
        "price": round(metric.price, 2),
        "date": f"Automatic price model snapshot on {generated_at[:10]}",
        "oneYearReturn": round(metric.ret_252d, 2),
        "focus": record.get("sicDescription") or record.get("industry") or "Market profile",
        "role": (
            "Liquid large-cap expression" if method_meta["coverage"] == "High"
            else "Mid-liquidity swing candidate" if method_meta["coverage"] == "Medium"
            else "Selective low-liquidity setup"
        ),
        "thesis": thesis,
        "positioning": positioning,
        "risks": risks,
        "scores": score_rows,
        "targets": targets,
        "targetMeta": method_meta,
        "researchConfidence": int(round(scores["confidence"])),
        "dataPoints": metric.data_points,
        "liquidityBucket": method_meta["coverage"],
        "fiftyTwoWeekHigh": round(metric.high_52w, 2),
        "fiftyTwoWeekLow": round(metric.low_52w, 2),
        "rangePositionPct": round(range_position_pct, 1),
        "offHighPct": round(metric.below_high_pct, 1),
        "aboveLowPct": round(above_low_pct, 1),
        "oneMonthReturn": round(metric.ret_21d, 2),
        "threeMonthReturn": round(metric.ret_63d, 2),
        "sixMonthReturn": round(metric.ret_126d, 2),
        "avgDailyDollarVolume": round(metric.liquidity_estimate, 2),
        "generatedAt": generated_at,
    }


def load_universe(path: Path) -> list[dict[str, Any]]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    return payload["records"]


def write_outputs(payload: dict[str, Any], output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    json_path = output_dir / "research_profiles.json"
    js_path = output_dir / "research_profiles.js"
    serialized = json.dumps(payload, indent=2)
    json_path.write_text(serialized, encoding="utf-8")
    js_path.write_text(f"window.GOLDEN_POCKET_RESEARCH = {serialized};\n", encoding="utf-8")
    return json_path, js_path


def build_research_profiles(
    *,
    universe_path: Path,
    output_dir: Path,
    cache_dir: Path,
    user_agent: str,
    cache_hours: float,
    timeout: float,
    batch_size: int,
    max_workers: int,
    pause_seconds: float,
    limit: int | None,
    force_refresh: bool,
) -> dict[str, Any]:
    universe = load_universe(universe_path)
    if limit is not None:
        universe = universe[:limit]

    market_payloads = ensure_price_history(
        universe,
        cache_dir=cache_dir,
        user_agent=user_agent,
        cache_hours=cache_hours,
        timeout=timeout,
        batch_size=batch_size,
        max_workers=max_workers,
        pause_seconds=pause_seconds,
        force_refresh=force_refresh,
    )

    metrics: list[TickerMetrics] = []
    for record in universe:
        payload = market_payloads.get(record["ticker"])
        if not payload:
            continue
        metric = build_metrics(record, payload)
        if metric is not None:
            metrics.append(metric)

    generated_at = datetime.now(UTC).replace(microsecond=0).isoformat()
    if not metrics:
        payload = {
            "generatedAt": generated_at,
            "source": {
                "marketHistory": YAHOO_SPARK_URL,
                "notes": [
                    "No valid market-history profiles were generated in this run.",
                ],
            },
            "stats": {
                "requestedTickers": len(universe),
                "researchReadyTickers": 0,
                "directoryOnlyTickers": len(universe),
                "sectorsCovered": 0,
            },
            "profiles": [],
        }
        write_outputs(payload, output_dir)
        return payload

    sector_context, global_context = compute_sector_context(metrics)
    metrics_by_ticker = {metric.ticker: metric for metric in metrics}
    profiles = [
        generate_profile(
            record,
            metrics_by_ticker[record["ticker"]],
            sector_context,
            global_context,
            generated_at,
        )
        for record in universe
        if record["ticker"] in metrics_by_ticker
    ]

    stats = {
        "requestedTickers": len(universe),
        "researchReadyTickers": len(profiles),
        "directoryOnlyTickers": len(universe) - len(profiles),
        "sectorsCovered": len({profile["sector"] for profile in profiles}),
    }
    payload = {
        "generatedAt": generated_at,
        "source": {
            "marketHistory": YAHOO_SPARK_URL,
            "notes": [
                "Generated market profiles are built automatically from 1-year daily price history plus the SEC-based universe directory.",
                "These are model-generated targets, not human-authored investment theses and not sell-side analyst price targets.",
                "Deep research pilot profiles can still override these automated outputs where richer manual work exists.",
            ],
        },
        "stats": stats,
        "profiles": sorted(profiles, key=lambda item: item["ticker"]),
    }
    json_path, js_path = write_outputs(payload, output_dir)
    print(
        f"Generated {stats['researchReadyTickers']} research-ready profiles "
        f"out of {stats['requestedTickers']} requested tickers."
    )
    print(f"JSON output: {json_path}")
    print(f"JS output:   {js_path}")
    return payload


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    build_research_profiles(
        universe_path=Path(args.universe_path),
        output_dir=Path(args.output_dir),
        cache_dir=Path(args.cache_dir),
        user_agent=args.user_agent,
        cache_hours=args.cache_hours,
        timeout=args.timeout,
        batch_size=args.batch_size,
        max_workers=args.max_workers,
        pause_seconds=args.pause_seconds,
        limit=args.limit,
        force_refresh=args.force_refresh,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
