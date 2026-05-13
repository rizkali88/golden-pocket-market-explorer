from __future__ import annotations

import argparse
import csv
import concurrent.futures
import json
import math
import os
import time
import urllib.parse
from dataclasses import dataclass
from datetime import UTC, datetime
from io import StringIO
from pathlib import Path
from statistics import median
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from golden_pocket.market_pipeline import DEFAULT_USER_AGENT

YAHOO_SPARK_URL = "https://query1.finance.yahoo.com/v7/finance/spark"
FMP_STABLE_BASE_URL = "https://financialmodelingprep.com/stable"
VALID_INSTRUMENT_TYPES = {"EQUITY", "ETF"}
FUNDAMENTAL_VALUE_FIELDS = {
    "marketCap",
    "trailingPe",
    "priceToSales",
    "evToEbitda",
    "revenue",
    "netIncome",
    "netMarginPct",
    "reportedEps",
    "epsActual",
    "epsEstimate",
    "epsSurprisePct",
    "debtToEquity",
    "returnOnEquityPct",
    "analystTarget",
    "analystTargetHigh",
    "analystTargetLow",
}


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
    parser.add_argument(
        "--fmp-api-key",
        default=os.environ.get("FMP_API_KEY"),
        help="Optional Financial Modeling Prep API key. Defaults to FMP_API_KEY from the environment.",
    )
    parser.add_argument(
        "--fmp-cache-hours",
        type=float,
        default=24.0,
        help="How long cached FMP fundamentals stay fresh before refresh.",
    )
    parser.add_argument(
        "--skip-fmp",
        action="store_true",
        help="Skip Financial Modeling Prep fundamentals enrichment even when an API key is present.",
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
        payload = json.loads(cache_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    if payload.get("close") and not all(
        isinstance(payload.get(field), list) for field in ("open", "high", "low", "volume")
    ):
        return None
    return payload


def write_cache(cache_path: Path, payload: dict[str, Any]) -> None:
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    cache_path.write_text(json.dumps(payload), encoding="utf-8")


def write_cache_rows(cache_path: Path, rows: list[dict[str, Any]]) -> None:
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    cache_path.write_text(json.dumps(rows), encoding="utf-8")


def load_cached_rows(
    cache_path: Path, cache_hours: float, force_refresh: bool
) -> list[dict[str, Any]] | None:
    if force_refresh or not cache_is_fresh(cache_path, cache_hours):
        return None
    try:
        payload = json.loads(cache_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    return payload if isinstance(payload, list) else None


def fetch_spark_batch(
    batch: list[dict[str, Any]], user_agent: str, timeout: float
) -> dict[str, dict[str, Any]]:
    symbols = ",".join(item["ticker"] for item in batch)
    url = (
        f"{YAHOO_SPARK_URL}?symbols="
        f"{urllib.parse.quote(symbols, safe=',.-^=')}"
        "&range=1y&interval=1d&indicators=quote&includeTimestamps=true"
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
        quote = first.get("indicators", {}).get("quote", [{}])[0]
        results[symbol] = {
            "meta": first.get("meta", {}),
            "timestamp": first.get("timestamp") or [],
            "open": quote.get("open", []),
            "high": quote.get("high", []),
            "low": quote.get("low", []),
            "close": quote.get("close", []),
            "volume": quote.get("volume", []),
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


def parse_fmp_response(body: str) -> list[dict[str, Any]]:
    stripped = body.strip()
    if not stripped:
        return []
    try:
        payload = json.loads(stripped)
    except json.JSONDecodeError:
        reader = csv.DictReader(StringIO(stripped))
        return [dict(row) for row in reader]
    if isinstance(payload, list):
        return [row for row in payload if isinstance(row, dict)]
    if isinstance(payload, dict):
        if isinstance(payload.get("data"), list):
            return [row for row in payload["data"] if isinstance(row, dict)]
        if isinstance(payload.get("error"), str):
            print(f"FMP returned an error: {payload['error']}")
        return [payload]
    return []


def fmp_cache_name(endpoint: str, params: dict[str, Any]) -> str:
    safe_endpoint = endpoint.replace("/", "_").replace("-", "_")
    param_suffix = "_".join(
        f"{key}_{str(value).replace('/', '_')}" for key, value in sorted(params.items())
    )
    return f"{safe_endpoint}{'_' + param_suffix if param_suffix else ''}.json"


def fetch_fmp_rows(
    *,
    endpoint: str,
    api_key: str,
    params: dict[str, Any] | None,
    cache_dir: Path,
    cache_hours: float,
    timeout: float,
    force_refresh: bool,
) -> list[dict[str, Any]]:
    params = dict(params or {})
    cache_path = cache_dir / "fmp" / fmp_cache_name(endpoint, params)
    cached = load_cached_rows(cache_path, cache_hours, force_refresh)
    if cached is not None:
        return cached

    query = urllib.parse.urlencode({**params, "apikey": api_key})
    url = f"{FMP_STABLE_BASE_URL}/{endpoint}?{query}"
    request = Request(
        url,
        headers={
            "User-Agent": DEFAULT_USER_AGENT,
            "Accept": "application/json,text/csv;q=0.9,*/*;q=0.8",
        },
    )
    with urlopen(request, timeout=timeout) as response:
        body = response.read().decode("utf-8")

    rows = parse_fmp_response(body)
    write_cache_rows(cache_path, rows)
    return rows


def build_symbol_map(rows: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    mapped: dict[str, dict[str, Any]] = {}
    for row in rows:
        symbol = row.get("symbol") or row.get("ticker")
        if not symbol:
            continue
        mapped[str(symbol).upper()] = row
    return mapped


def build_latest_symbol_map(rows: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    mapped: dict[str, dict[str, Any]] = {}
    for row in rows:
        symbol = row.get("symbol") or row.get("ticker")
        if not symbol:
            continue
        key = str(symbol).upper()
        existing = mapped.get(key)
        if existing is None or str(row.get("date") or "") > str(existing.get("date") or ""):
            mapped[key] = row
    return mapped


def symbol_variants(ticker: str) -> list[str]:
    symbol = ticker.upper()
    variants = [symbol]
    if "-" in symbol:
        variants.append(symbol.replace("-", "."))
    if "." in symbol:
        variants.append(symbol.replace(".", "-"))
    return list(dict.fromkeys(variants))


def find_symbol_row(mapping: dict[str, dict[str, Any]], ticker: str) -> dict[str, Any]:
    for variant in symbol_variants(ticker):
        if variant in mapping:
            return mapping[variant]
    return {}


def parse_number(value: Any) -> float | None:
    if value in (None, "", "None", "null", "NaN"):
        return None
    if isinstance(value, (int, float)):
        numeric = float(value)
    else:
        try:
            numeric = float(str(value).replace(",", ""))
        except ValueError:
            return None
    if math.isnan(numeric) or math.isinf(numeric):
        return None
    return numeric


def first_number(row: dict[str, Any], keys: list[str]) -> float | None:
    for key in keys:
        if key in row:
            numeric = parse_number(row.get(key))
            if numeric is not None:
                return numeric
    return None


def first_text(row: dict[str, Any], keys: list[str]) -> str | None:
    for key in keys:
        value = row.get(key)
        if value not in (None, ""):
            return str(value)
    return None


def rounded(value: float | None, digits: int = 2) -> float | None:
    if value is None:
        return None
    return round(value, digits)


def compact_fundamentals(payload: dict[str, Any]) -> dict[str, Any] | None:
    has_metric = any(payload.get(field) not in (None, "", []) for field in FUNDAMENTAL_VALUE_FIELDS)
    if not has_metric:
        return None
    cleaned = {key: value for key, value in payload.items() if value not in (None, "", [])}
    return cleaned or None


def build_fmp_fundamentals(
    records: list[dict[str, Any]],
    metrics_by_ticker: dict[str, TickerMetrics],
    *,
    cache_dir: Path,
    api_key: str | None,
    cache_hours: float,
    timeout: float,
    force_refresh: bool,
    generated_at: str,
) -> dict[str, dict[str, Any]]:
    if not api_key:
        return {}

    target_year = datetime.now(UTC).year - 1
    datasets: dict[str, list[dict[str, Any]]] = {}
    dataset_specs = [
        ("key_metrics_ttm", "key-metrics-ttm-bulk", {}),
        ("ratios_ttm", "ratios-ttm-bulk", {}),
        ("income_statement", "income-statement-bulk", {"year": target_year, "period": "annual"}),
        ("income_statement_prev", "income-statement-bulk", {"year": target_year - 1, "period": "annual"}),
        ("earnings_surprises", "earnings-surprises-bulk", {"year": target_year}),
        ("earnings_surprises_prev", "earnings-surprises-bulk", {"year": target_year - 1}),
        ("price_target_summary", "price-target-summary-bulk", {}),
    ]

    for label, endpoint, params in dataset_specs:
        try:
            datasets[label] = fetch_fmp_rows(
                endpoint=endpoint,
                api_key=api_key,
                params=params,
                cache_dir=cache_dir,
                cache_hours=cache_hours,
                timeout=timeout,
                force_refresh=force_refresh,
            )
            print(f"Loaded FMP {label}: {len(datasets[label])} rows.")
        except (HTTPError, URLError, OSError, json.JSONDecodeError, TimeoutError) as error:
            print(f"Skipped FMP {label}: {error}")
            datasets[label] = []

    key_metrics = build_symbol_map(datasets["key_metrics_ttm"])
    ratios = build_symbol_map(datasets["ratios_ttm"])
    income_rows = datasets["income_statement"] or datasets["income_statement_prev"]
    income = build_latest_symbol_map(income_rows)
    earnings = build_latest_symbol_map(
        datasets["earnings_surprises"] + datasets["earnings_surprises_prev"]
    )
    price_targets = build_symbol_map(datasets["price_target_summary"])

    fundamentals_by_ticker: dict[str, dict[str, Any]] = {}
    for record in records:
        ticker = record["ticker"]
        metric = metrics_by_ticker.get(ticker)
        if not metric:
            continue

        metrics_row = find_symbol_row(key_metrics, ticker)
        ratios_row = find_symbol_row(ratios, ticker)
        income_row = find_symbol_row(income, ticker)
        earnings_row = find_symbol_row(earnings, ticker)
        target_row = find_symbol_row(price_targets, ticker)

        market_cap = first_number(
            metrics_row,
            ["marketCapTTM", "marketCap", "mktCap", "enterpriseValueTTM"],
        )
        pe_ttm = first_number(
            metrics_row,
            ["peRatioTTM", "peRatio", "priceEarningsRatioTTM", "priceEarningsRatio"],
        )
        price_to_sales = first_number(
            metrics_row,
            ["priceToSalesRatioTTM", "priceToSalesRatio", "priceSalesRatioTTM"],
        )
        ev_to_ebitda = first_number(
            metrics_row,
            ["enterpriseValueOverEBITDATTM", "evToEBITDATTM", "evToEbitdaTTM"],
        )
        revenue = first_number(
            income_row,
            ["revenue", "reportedRevenue", "totalRevenue"],
        )
        net_income = first_number(income_row, ["netIncome", "netIncomeLoss"])
        eps_reported = first_number(
            income_row,
            ["epsdiluted", "epsDiluted", "eps", "reportedEPS"],
        )
        eps_actual = first_number(
            earnings_row,
            ["actualEarningResult", "actualEps", "actualEPS", "epsActual"],
        )
        eps_estimate = first_number(
            earnings_row,
            ["estimatedEarning", "estimatedEps", "estimatedEPS", "epsEstimated"],
        )
        analyst_target = first_number(
            target_row,
            [
                "lastMonthAvgPriceTarget",
                "lastQuarterAvgPriceTarget",
                "lastYearAvgPriceTarget",
                "allTimeAvgPriceTarget",
                "priceTarget",
                "targetConsensus",
            ],
        )
        analyst_target_high = first_number(
            target_row,
            [
                "lastMonthHighPriceTarget",
                "lastQuarterHighPriceTarget",
                "lastYearHighPriceTarget",
                "priceTargetHigh",
                "targetHigh",
            ],
        )
        analyst_target_low = first_number(
            target_row,
            [
                "lastMonthLowPriceTarget",
                "lastQuarterLowPriceTarget",
                "lastYearLowPriceTarget",
                "priceTargetLow",
                "targetLow",
            ],
        )
        analyst_target_count = first_number(
            target_row,
            ["lastMonthCount", "lastQuarterCount", "lastYearCount", "numberOfAnalysts"],
        )

        eps_surprise_pct = None
        if eps_actual is not None and eps_estimate not in (None, 0):
            eps_surprise_pct = ((eps_actual - eps_estimate) / abs(eps_estimate)) * 100.0

        net_margin = None
        if revenue not in (None, 0) and net_income is not None:
            net_margin = net_income / revenue * 100.0

        debt_to_equity = first_number(
            ratios_row,
            ["debtEquityRatioTTM", "debtToEquityRatioTTM", "debtEquityRatio"],
        )
        return_on_equity = first_number(
            ratios_row,
            ["returnOnEquityTTM", "roeTTM", "returnOnEquity"],
        )

        fundamentals = compact_fundamentals(
            {
                "source": "Financial Modeling Prep",
                "updatedAt": generated_at,
                "fiscalYear": first_text(income_row, ["calendarYear", "year"]),
                "fiscalPeriod": first_text(income_row, ["period"]),
                "financialDate": first_text(income_row, ["date", "acceptedDate", "fillingDate"]),
                "earningsDate": first_text(earnings_row, ["date"]),
                "marketCap": rounded(market_cap, 0),
                "trailingPe": rounded(pe_ttm, 2),
                "priceToSales": rounded(price_to_sales, 2),
                "evToEbitda": rounded(ev_to_ebitda, 2),
                "revenue": rounded(revenue, 0),
                "netIncome": rounded(net_income, 0),
                "netMarginPct": rounded(net_margin, 2),
                "reportedEps": rounded(eps_reported, 3),
                "epsActual": rounded(eps_actual, 3),
                "epsEstimate": rounded(eps_estimate, 3),
                "epsSurprisePct": rounded(eps_surprise_pct, 2),
                "debtToEquity": rounded(debt_to_equity, 2),
                "returnOnEquityPct": rounded(return_on_equity, 2),
                "analystTarget": rounded(analyst_target, 2),
                "analystTargetHigh": rounded(analyst_target_high, 2),
                "analystTargetLow": rounded(analyst_target_low, 2),
                "analystTargetCount": rounded(analyst_target_count, 0),
            }
        )
        if fundamentals:
            fundamentals_by_ticker[ticker] = fundamentals

    return fundamentals_by_ticker


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
    fundamentals: dict[str, Any] | None = None,
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

    profile = {
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
    if fundamentals:
        profile["fundamentals"] = fundamentals
    return profile


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


def history_chunk_key(ticker: str) -> str:
    first = (ticker or "_")[0].lower()
    if first.isalpha():
        return first
    if first.isdigit():
        return f"n{first}"
    return "other"


def rounded_history_value(value: Any, digits: int = 4) -> float | None:
    if not isinstance(value, (int, float)) or not math.isfinite(float(value)):
        return None
    return round(float(value), digits)


def build_compact_price_history(market_payload: dict[str, Any]) -> dict[str, Any] | None:
    timestamps = market_payload.get("timestamp") or []
    closes = market_payload.get("close") or []
    opens = market_payload.get("open") or []
    highs = market_payload.get("high") or []
    lows = market_payload.get("low") or []
    volumes = market_payload.get("volume") or []
    meta = market_payload.get("meta") or {}

    times: list[int] = []
    close_values: list[float] = []
    open_values: list[float] = []
    high_values: list[float] = []
    low_values: list[float] = []
    volume_values: list[int] = []
    has_ohlc = bool(opens and highs and lows)
    has_volume = bool(volumes)

    for index, timestamp in enumerate(timestamps):
        if not isinstance(timestamp, (int, float)):
            continue
        if index >= len(closes):
            continue
        close = rounded_history_value(closes[index])
        if close is None:
            continue

        times.append(int(timestamp))
        close_values.append(close)

        if has_ohlc:
            open_value = rounded_history_value(opens[index] if index < len(opens) else None)
            high_value = rounded_history_value(highs[index] if index < len(highs) else None)
            low_value = rounded_history_value(lows[index] if index < len(lows) else None)
            if open_value is None or high_value is None or low_value is None:
                has_ohlc = False
            else:
                open_values.append(open_value)
                high_values.append(high_value)
                low_values.append(low_value)

        if has_volume:
            volume = volumes[index] if index < len(volumes) else None
            if not isinstance(volume, (int, float)) or not math.isfinite(float(volume)):
                has_volume = False
            else:
                volume_values.append(int(volume))

    if len(times) < 2:
        return None

    compact = {
        "t": times,
        "c": close_values,
        "r": meta.get("range") or "1y",
        "g": meta.get("dataGranularity") or "1d",
    }
    if has_ohlc and len(open_values) == len(times):
        compact.update({"o": open_values, "h": high_values, "l": low_values})
    if has_volume and len(volume_values) == len(times):
        compact["v"] = volume_values
    return compact


def write_price_history_outputs(
    market_payloads: dict[str, dict[str, Any]],
    research_tickers: Iterable[str],
    output_dir: Path,
    *,
    generated_at: str,
) -> tuple[Path, list[Path]]:
    history_dir = output_dir / "history"
    history_dir.mkdir(parents=True, exist_ok=True)
    for old_file in history_dir.glob("*.js"):
        old_file.unlink()

    chunks: dict[str, dict[str, Any]] = {}
    ticker_to_chunk: dict[str, str] = {}
    for ticker in sorted(set(research_tickers)):
        history = build_compact_price_history(market_payloads.get(ticker) or {})
        if not history:
            continue
        chunk_key = history_chunk_key(ticker)
        chunks.setdefault(chunk_key, {})[ticker] = history
        ticker_to_chunk[ticker] = chunk_key

    chunk_files: dict[str, str] = {}
    written_chunks: list[Path] = []
    for chunk_key, chunk_payload in sorted(chunks.items()):
        file_name = f"{chunk_key}.js"
        chunk_files[chunk_key] = file_name
        chunk_path = history_dir / file_name
        serialized_chunk = json.dumps(chunk_payload, separators=(",", ":"))
        chunk_path.write_text(
            "window.GOLDEN_POCKET_HISTORY_CHUNKS = window.GOLDEN_POCKET_HISTORY_CHUNKS || {};\n"
            f"window.GOLDEN_POCKET_HISTORY_CHUNKS[{json.dumps(chunk_key)}] = {serialized_chunk};\n",
            encoding="utf-8",
        )
        written_chunks.append(chunk_path)

    index_payload = {
        "generatedAt": generated_at,
        "source": {
            "marketHistory": YAHOO_SPARK_URL,
            "range": "1y",
            "interval": "1d",
            "note": "Static daily price-history chunks are generated server-side so the webapp can load selected ticker charts without exposing API keys.",
        },
        "chunks": ticker_to_chunk,
        "chunkFiles": chunk_files,
    }
    index_path = history_dir / "index.js"
    index_path.write_text(
        f"window.GOLDEN_POCKET_HISTORY_INDEX = {json.dumps(index_payload, separators=(',', ':'))};\n",
        encoding="utf-8",
    )
    return index_path, written_chunks


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
    fmp_api_key: str | None = None,
    fmp_cache_hours: float = 24.0,
    skip_fmp: bool = False,
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
        write_price_history_outputs({}, [], output_dir, generated_at=generated_at)
        return payload

    sector_context, global_context = compute_sector_context(metrics)
    metrics_by_ticker = {metric.ticker: metric for metric in metrics}
    fundamentals_by_ticker = (
        {}
        if skip_fmp
        else build_fmp_fundamentals(
            universe,
            metrics_by_ticker,
            cache_dir=cache_dir,
            api_key=fmp_api_key,
            cache_hours=fmp_cache_hours,
            timeout=timeout,
            force_refresh=force_refresh,
            generated_at=generated_at,
        )
    )
    profiles = [
        generate_profile(
            record,
            metrics_by_ticker[record["ticker"]],
            sector_context,
            global_context,
            generated_at,
            fundamentals_by_ticker.get(record["ticker"]),
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
                "When FMP_API_KEY is configured, fundamentals are enriched from Financial Modeling Prep bulk datasets without exposing the API key in the static webpage.",
                "These are model-generated targets, not human-authored investment theses and not sell-side analyst price targets.",
                "Deep research pilot profiles can still override these automated outputs where richer manual work exists.",
            ],
            "fundamentals": "Financial Modeling Prep" if fundamentals_by_ticker else "Not configured",
        },
        "stats": stats,
        "profiles": sorted(profiles, key=lambda item: item["ticker"]),
    }
    json_path, js_path = write_outputs(payload, output_dir)
    history_index_path, history_chunk_paths = write_price_history_outputs(
        market_payloads,
        (profile["ticker"] for profile in profiles),
        output_dir,
        generated_at=generated_at,
    )
    print(
        f"Generated {stats['researchReadyTickers']} research-ready profiles "
        f"out of {stats['requestedTickers']} requested tickers."
    )
    print(f"JSON output: {json_path}")
    print(f"JS output:   {js_path}")
    print(
        f"History output: {history_index_path} "
        f"({len(history_chunk_paths)} lazy-loaded chunk files)"
    )
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
        fmp_api_key=args.fmp_api_key,
        fmp_cache_hours=args.fmp_cache_hours,
        skip_fmp=args.skip_fmp,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
