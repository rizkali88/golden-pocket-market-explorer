from __future__ import annotations

import argparse
import json
import math
import os
import re
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Any
from urllib.parse import quote
from urllib.request import Request, urlopen


STARTING_CASH = 10_000.0
MAX_POSITION_FRACTION = 0.20
RISK_FRACTION = 0.01
DEFAULT_MAX_OPEN_POSITIONS = 8
MIN_ENTRY_PRICE = 5.0
MIN_AVG_DAILY_DOLLAR_VOLUME = 5_000_000.0
DEFAULT_QUOTE_CANDIDATE_LIMIT = 500
DEFAULT_QUOTE_BATCH_SIZE = 100
DEFAULT_HISTORY_RANGE_SECONDS = 370 * 24 * 60 * 60
DEFAULT_BOT_FRAME_LABEL = "1Y / 1D"
FMP_STABLE_BASE_URL = "https://financialmodelingprep.com/stable"
PRIMARY_EXCHANGES = {"NYSE", "NASDAQ", "NASDAQ CAPITAL MARKET", "NYSE AMERICAN", "NYSE ARCA"}


def clamp(value: float, low: float = 0.0, high: float = 100.0) -> float:
    return max(low, min(high, value))


def number(value: Any, default: float | None = 0.0) -> float | None:
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return default
    return parsed if math.isfinite(parsed) else default


def now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def is_research_ready(profile: dict[str, Any]) -> bool:
    return (
        profile.get("profileMode") != "directory_only"
        and number(profile.get("price"), None) is not None
        and isinstance(profile.get("targets"), dict)
    )


def is_tradable_for_new_entry(profile: dict[str, Any]) -> bool:
    exchange = str(profile.get("exchange") or "").upper()
    price = number(profile.get("price"), 0.0) or 0.0
    dollar_volume = number(profile.get("avgDailyDollarVolume"), 0.0) or 0.0
    return (
        is_research_ready(profile)
        and exchange in PRIMARY_EXCHANGES
        and price >= MIN_ENTRY_PRICE
        and dollar_volume >= MIN_AVG_DAILY_DOLLAR_VOLUME
    )


def score_by_label(profile: dict[str, Any], keywords: tuple[str, ...], default: float) -> float:
    for item in profile.get("scores") or []:
        label = str(item.get("label", "")).lower()
        if any(keyword in label for keyword in keywords):
            parsed = number(item.get("value"), None)
            if parsed is not None:
                return parsed
    return default


def parse_fmp_quote_rows(payload: Any) -> list[dict[str, Any]]:
    if isinstance(payload, list):
        return [row for row in payload if isinstance(row, dict)]
    if isinstance(payload, dict):
        if isinstance(payload.get("data"), list):
            return [row for row in payload["data"] if isinstance(row, dict)]
        if any(key in payload for key in ("symbol", "ticker", "price")):
            return [payload]
    return []


def fetch_fmp_quote_batch(
    symbols: list[str],
    api_key: str,
    *,
    batch_size: int = DEFAULT_QUOTE_BATCH_SIZE,
    pause_seconds: float = 0.15,
    timeout: float = 20.0,
) -> dict[str, dict[str, Any]]:
    normalized_symbols = []
    seen = set()
    for symbol in symbols:
        normalized = str(symbol or "").upper().strip()
        if normalized and normalized not in seen:
            normalized_symbols.append(normalized)
            seen.add(normalized)

    quotes: dict[str, dict[str, Any]] = {}
    if not normalized_symbols or not api_key:
        return quotes

    for index in range(0, len(normalized_symbols), max(1, batch_size)):
        batch = normalized_symbols[index : index + max(1, batch_size)]
        symbols_param = quote(",".join(batch), safe=",.-^=")
        url = f"{FMP_STABLE_BASE_URL}/batch-quote-short?symbols={symbols_param}&apikey={quote(api_key)}"
        request = Request(url, headers={"User-Agent": "GoldenPocketMaxPaperBot/1.0"})
        with urlopen(request, timeout=timeout) as response:
            payload = json.loads(response.read().decode("utf-8"))
        for row in parse_fmp_quote_rows(payload):
            symbol = str(row.get("symbol") or row.get("ticker") or "").upper()
            price = number(row.get("price"), None)
            if symbol and price is not None and price > 0:
                quotes[symbol] = {**row, "price": price}
        if index + batch_size < len(normalized_symbols) and pause_seconds > 0:
            time.sleep(pause_seconds)
    return quotes


def apply_live_quotes(
    profiles: list[dict[str, Any]],
    quotes_by_ticker: dict[str, dict[str, Any]],
    *,
    fetched_at: str,
) -> list[dict[str, Any]]:
    if not quotes_by_ticker:
        return profiles
    refreshed: list[dict[str, Any]] = []
    for profile in profiles:
        ticker = str(profile.get("ticker") or "").upper()
        quote_row = quotes_by_ticker.get(ticker)
        price = number((quote_row or {}).get("price"), None)
        if quote_row is None or price is None or price <= 0:
            refreshed.append(profile)
            continue
        copy = dict(profile)
        copy["price"] = price
        copy["livePrice"] = price
        copy["livePriceUpdatedAt"] = fetched_at
        high = number(copy.get("fiftyTwoWeekHigh"), None)
        low = number(copy.get("fiftyTwoWeekLow"), None)
        if high is not None and low is not None and high > low:
            copy["rangePositionPct"] = round(clamp(((price - low) / (high - low)) * 100), 1)
            copy["offHighPct"] = round(((high - price) / high) * 100, 1) if high else copy.get("offHighPct")
            copy["aboveLowPct"] = round(((price - low) / low) * 100, 1) if low else copy.get("aboveLowPct")
        refreshed.append(copy)
    return refreshed


def liquidity_score(profile: dict[str, Any]) -> float:
    dollar_volume = number(profile.get("avgDailyDollarVolume"), 0.0) or 0.0
    if dollar_volume > 0:
        return clamp(25 + math.log10(max(dollar_volume, 1.0)) * 8)

    bucket = str(profile.get("liquidityBucket") or "").lower()
    if "high" in bucket:
        return 90.0
    if "medium" in bucket or "mid" in bucket:
        return 68.0
    if "low" in bucket:
        return 42.0
    return 38.0


def build_trade_levels(profile: dict[str, Any]) -> dict[str, float] | None:
    price = number(profile.get("price"), None)
    high = number(profile.get("fiftyTwoWeekHigh"), None)
    low = number(profile.get("fiftyTwoWeekLow"), None)
    if price is None or high is None or low is None or price <= 0 or high <= low:
        return None

    price_range = max(high - low, price * 0.08)
    entry_low = low + price_range * 0.382
    entry_high = low + price_range * 0.618
    add_low = low + price_range * 0.236
    add_high = low + price_range * 0.382
    stop = max(0.01, low + price_range * 0.18)
    target1 = high
    target2 = high + price_range * 0.272
    target3 = high + price_range * 0.618
    entry_mid = (entry_low + entry_high) / 2
    reward_risk = (target2 - entry_mid) / max(entry_mid - stop, price * 0.01)

    if entry_low <= price <= entry_high:
        position = "Inside entry zone"
    elif price > entry_high:
        position = "Above preferred entry"
    else:
        position = "Below preferred entry"

    return {
        "price": round(price, 4),
        "low": round(low, 4),
        "high": round(high, 4),
        "entryLow": round(entry_low, 4),
        "entryHigh": round(entry_high, 4),
        "addLow": round(add_low, 4),
        "addHigh": round(add_high, 4),
        "stop": round(stop, 4),
        "target1": round(target1, 4),
        "target2": round(target2, 4),
        "target3": round(target3, 4),
        "rewardRisk": round(reward_risk, 4),
        "position": position,
    }


def parse_json_assignment(path: Path) -> dict[str, Any]:
    try:
        text = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return {}
    match = re.search(r"=\s*(\{.*\});?\s*$", text, flags=re.DOTALL)
    if not match:
        return {}
    try:
        parsed = json.loads(match.group(1))
    except json.JSONDecodeError:
        return {}
    return parsed if isinstance(parsed, dict) else {}


def load_history_by_ticker(history_dir: Path, tickers: list[str]) -> dict[str, dict[str, Any]]:
    index_payload = parse_json_assignment(history_dir / "index.js")
    chunks = index_payload.get("chunks") if isinstance(index_payload.get("chunks"), dict) else {}
    chunk_files = index_payload.get("chunkFiles") if isinstance(index_payload.get("chunkFiles"), dict) else {}
    if not chunks:
        return {}

    symbols_by_chunk: dict[str, list[str]] = {}
    for ticker in tickers:
        symbol = str(ticker or "").upper().strip()
        chunk_key = str(chunks.get(symbol) or "")
        if symbol and chunk_key:
            symbols_by_chunk.setdefault(chunk_key, []).append(symbol)

    history_by_ticker: dict[str, dict[str, Any]] = {}
    for chunk_key, symbols in symbols_by_chunk.items():
        chunk_file = str(chunk_files.get(chunk_key) or f"{chunk_key}.js")
        chunk_payload = parse_json_assignment(history_dir / chunk_file)
        if not chunk_payload:
            continue
        for symbol in symbols:
            history = chunk_payload.get(symbol)
            if isinstance(history, dict) and isinstance(history.get("t"), list) and isinstance(history.get("c"), list):
                history_by_ticker[symbol] = history
    return history_by_ticker


def parse_timestamp(value: Any) -> int | None:
    if value is None:
        return None
    parsed_number = number(value, None)
    if parsed_number is not None:
        return int(parsed_number)
    try:
        normalized = str(value).replace("Z", "+00:00")
        return int(datetime.fromisoformat(normalized).timestamp())
    except ValueError:
        return None


def history_points_for_default_frame(
    history: dict[str, Any] | None,
    profile: dict[str, Any],
    *,
    range_seconds: int = DEFAULT_HISTORY_RANGE_SECONDS,
) -> list[dict[str, float]]:
    if not history:
        return []

    times = history.get("t") if isinstance(history.get("t"), list) else []
    closes = history.get("c") if isinstance(history.get("c"), list) else []
    opens = history.get("o") if isinstance(history.get("o"), list) else []
    highs = history.get("h") if isinstance(history.get("h"), list) else []
    lows = history.get("l") if isinstance(history.get("l"), list) else []
    has_ohlc = len(opens) == len(times) and len(highs) == len(times) and len(lows) == len(times)

    points: list[dict[str, float]] = []
    for index, raw_time in enumerate(times[: len(closes)]):
        timestamp = number(raw_time, None)
        close = number(closes[index], None)
        if timestamp is None or close is None:
            continue
        point: dict[str, float] = {"time": float(timestamp), "value": close, "close": close}
        if has_ohlc:
            open_price = number(opens[index], close)
            high = number(highs[index], close)
            low = number(lows[index], close)
            if open_price is not None and high is not None and low is not None:
                point.update({"open": open_price, "high": high, "low": low})
        points.append(point)

    if len(points) < 3:
        return points

    last_time = points[-1]["time"]
    start_time = last_time - range_seconds
    frame_points = [point for point in points if point["time"] >= start_time]

    live_price = number(profile.get("livePrice"), None)
    if live_price is None or live_price <= 0 or not frame_points:
        return frame_points

    fetched_at = parse_timestamp(profile.get("livePriceUpdatedAt")) or int(datetime.now(UTC).timestamp())
    last_point = frame_points[-1]
    same_daily_bar = datetime.fromtimestamp(last_point["time"], UTC).date() == datetime.fromtimestamp(
        fetched_at, UTC
    ).date()
    if same_daily_bar or fetched_at - int(last_point["time"]) < 6 * 60 * 60:
        last_point["value"] = live_price
        last_point["close"] = live_price
        if "high" in last_point:
            last_point["high"] = max(number(last_point.get("high"), live_price) or live_price, live_price)
        if "low" in last_point:
            last_point["low"] = min(number(last_point.get("low"), live_price) or live_price, live_price)
        return frame_points

    live_point: dict[str, float] = {"time": float(fetched_at), "value": live_price, "close": live_price}
    if all(key in last_point for key in ("open", "high", "low")):
        live_point.update({"open": live_price, "high": live_price, "low": live_price})
    frame_points.append(live_point)
    return frame_points


def point_close(point: dict[str, Any] | None) -> float | None:
    if not point:
        return None
    return number(point.get("close", point.get("value")), None)


def point_high(point: dict[str, Any] | None) -> float | None:
    if not point:
        return None
    return number(point.get("high", point_close(point)), None)


def point_low(point: dict[str, Any] | None) -> float | None:
    if not point:
        return None
    return number(point.get("low", point_close(point)), None)


def find_extreme_point(
    data: list[dict[str, float]],
    getter,
    comparator,
) -> dict[str, float] | None:
    best: dict[str, float] | None = None
    best_value: float | None = None
    for point in data:
        value = getter(point)
        if value is None:
            continue
        if best is None or best_value is None or comparator(value, best_value):
            best = point
            best_value = value
    return best


def find_max_execution_pivots(data: list[dict[str, float]]) -> list[dict[str, Any]]:
    if len(data) < 5:
        return []
    lookaround = int(clamp(math.floor(len(data) / 36), 2, 8))
    pivots: list[dict[str, Any]] = []
    for index in range(lookaround, len(data) - lookaround):
        point = data[index]
        high = point_high(point)
        low = point_low(point)
        if high is None or low is None:
            continue
        window = data[index - lookaround : index + lookaround + 1]
        is_high = all(high >= (point_high(candidate) if point_high(candidate) is not None else -math.inf) for candidate in window)
        is_low = all(low <= (point_low(candidate) if point_low(candidate) is not None else math.inf) for candidate in window)
        if is_high:
            pivots.append({"type": "high", "point": point, "time": point["time"], "price": high})
        if is_low:
            pivots.append({"type": "low", "point": point, "time": point["time"], "price": low})
    pivots.sort(key=lambda item: number(item.get("time"), 0.0) or 0.0)
    deduped: list[dict[str, Any]] = []
    for pivot in pivots:
        previous = deduped[-1] if deduped else None
        if not previous or previous.get("time") != pivot.get("time") or previous.get("type") != pivot.get("type"):
            deduped.append(pivot)
    return deduped


def compress_alternating_pivots(pivots: list[dict[str, Any]]) -> list[dict[str, Any]]:
    compressed: list[dict[str, Any]] = []
    for pivot in pivots:
        previous = compressed[-1] if compressed else None
        if not previous or previous.get("type") != pivot.get("type"):
            compressed.append(pivot)
            continue
        more_extreme = pivot["price"] >= previous["price"] if pivot.get("type") == "high" else pivot["price"] <= previous["price"]
        if more_extreme:
            compressed[-1] = pivot
    return compressed


def build_execution_structure(
    data: list[dict[str, float]],
    fallback_levels: dict[str, Any] | None,
) -> dict[str, Any] | None:
    clean_data = [point for point in data if point.get("time") and point_close(point) is not None]
    if len(clean_data) < 3:
        return None

    first_close = point_close(clean_data[0]) or number((fallback_levels or {}).get("price"), 0.0) or 0.0
    last_close = point_close(clean_data[-1]) or first_close
    return_pct = ((last_close - first_close) / first_close) * 100 if first_close > 0 else 0.0
    if return_pct >= 2:
        trend = "up"
    elif return_pct <= -2:
        trend = "down"
    else:
        trend = "neutral-up" if last_close >= first_close else "neutral-down"
    direction = "down" if "down" in trend else "up"

    pivots = compress_alternating_pivots(find_max_execution_pivots(clean_data))
    recent_data = clean_data[-min(120, len(clean_data)) :]
    high_point = find_extreme_point(recent_data, point_high, lambda left, right: left > right)
    low_point = find_extreme_point(recent_data, point_low, lambda left, right: left < right)
    anchor_low = low_point
    anchor_high = high_point

    if direction == "up":
        highest_pivot = next((pivot for pivot in reversed(pivots) if pivot.get("type") == "high"), None)
        if not highest_pivot and anchor_high:
            highest_pivot = {
                "type": "high",
                "point": anchor_high,
                "time": anchor_high["time"],
                "price": point_high(anchor_high),
            }
        low_before_high = (
            next(
                (
                    pivot
                    for pivot in reversed(pivots)
                    if pivot.get("type") == "low"
                    and highest_pivot
                    and number(pivot.get("time"), 0.0) < number(highest_pivot.get("time"), 0.0)
                ),
                None,
            )
            if highest_pivot
            else None
        )
        anchor_high = (highest_pivot or {}).get("point") or anchor_high
        anchor_low = (low_before_high or {}).get("point") or anchor_low
    else:
        lowest_pivot = next((pivot for pivot in reversed(pivots) if pivot.get("type") == "low"), None)
        if not lowest_pivot and anchor_low:
            lowest_pivot = {
                "type": "low",
                "point": anchor_low,
                "time": anchor_low["time"],
                "price": point_low(anchor_low),
            }
        high_before_low = (
            next(
                (
                    pivot
                    for pivot in reversed(pivots)
                    if pivot.get("type") == "high"
                    and lowest_pivot
                    and number(pivot.get("time"), 0.0) < number(lowest_pivot.get("time"), 0.0)
                ),
                None,
            )
            if lowest_pivot
            else None
        )
        anchor_low = (lowest_pivot or {}).get("point") or anchor_low
        anchor_high = (high_before_low or {}).get("point") or anchor_high

    anchor_low_price = point_low(anchor_low) or number((fallback_levels or {}).get("low"), None)
    anchor_high_price = point_high(anchor_high) or number((fallback_levels or {}).get("high"), None)
    if anchor_low_price is None or anchor_high_price is None:
        return None
    low = min(anchor_low_price, anchor_high_price)
    high = max(anchor_low_price, anchor_high_price)
    price_range = max(high - low, abs(last_close) * 0.01, 0.01)

    return {
        "trend": trend,
        "direction": direction,
        "firstClose": first_close,
        "lastClose": last_close,
        "returnPct": return_pct,
        "low": low,
        "high": high,
        "range": price_range,
    }


def build_dynamic_trade_levels(
    base_levels: dict[str, Any] | None,
    structure: dict[str, Any] | None,
) -> dict[str, Any] | None:
    if not base_levels or not structure or not structure.get("range"):
        return base_levels

    price = number(base_levels.get("price"), None)
    low = number(structure.get("low"), None)
    high = number(structure.get("high"), None)
    price_range = number(structure.get("range"), None)
    if price is None or low is None or high is None or price_range is None or price_range <= 0:
        return base_levels

    bullish = structure.get("direction") == "up"
    entry_low = high - price_range * 0.618 if bullish else low + price_range * 0.382
    entry_high = high - price_range * 0.382 if bullish else low + price_range * 0.618
    add_low = high - price_range * 0.786 if bullish else low + price_range * 0.236
    add_high = entry_low
    stop = max(0.01, low - price_range * 0.08)
    target1 = high if bullish else low + price_range * 0.786
    target2 = high + price_range * 0.272 if bullish else high
    target3 = high + price_range * 0.618 if bullish else high + price_range * 0.272
    normalized_entry_low = min(entry_low, entry_high)
    normalized_entry_high = max(entry_low, entry_high)
    entry_mid = (normalized_entry_low + normalized_entry_high) / 2
    reward_risk = (target2 - entry_mid) / max(entry_mid - stop, price * 0.01)
    if normalized_entry_low <= price <= normalized_entry_high:
        position = "Inside selected-frame entry zone"
    elif price > normalized_entry_high:
        position = "Above selected-frame entry"
    else:
        position = "Below selected-frame entry"

    return {
        **base_levels,
        "low": round(low, 4),
        "high": round(high, 4),
        "entryLow": round(normalized_entry_low, 4),
        "entryHigh": round(normalized_entry_high, 4),
        "addLow": round(min(add_low, add_high), 4),
        "addHigh": round(max(add_low, add_high), 4),
        "stop": round(stop, 4),
        "target1": round(target1, 4),
        "target2": round(target2, 4),
        "target3": round(target3, 4),
        "rewardRisk": round(reward_risk, 4),
        "position": position,
        "sourceFrame": DEFAULT_BOT_FRAME_LABEL,
    }


def build_frame_trade_levels(
    profile: dict[str, Any],
    base_levels: dict[str, Any] | None,
    history: dict[str, Any] | None,
) -> dict[str, Any] | None:
    if not base_levels or not history:
        return base_levels
    points = history_points_for_default_frame(history, profile)
    structure = build_execution_structure(points, base_levels)
    return build_dynamic_trade_levels(base_levels, structure)


def position_is_above_entry(levels: dict[str, Any] | None) -> bool:
    return "above" in str((levels or {}).get("position") or "").lower()


def max_signal(profile: dict[str, Any], history: dict[str, Any] | None = None) -> dict[str, Any]:
    base_levels = build_trade_levels(profile)
    levels = build_frame_trade_levels(profile, base_levels, history)
    trend_score = score_by_label(profile, ("trend",), number(profile.get("researchConfidence"), 58.0) or 58.0)
    rebound_score = score_by_label(profile, ("rebound",), number(profile.get("researchConfidence"), 54.0) or 54.0)
    risk_score = score_by_label(profile, ("risk",), number(profile.get("researchConfidence"), 54.0) or 54.0)
    range_position = number(profile.get("rangePositionPct"), 50.0) or 50.0
    entry_timing_score = clamp(100 - abs(range_position - 55) * 1.7)
    reward_risk_score = clamp((levels or {}).get("rewardRisk", 1.25) * 28) if levels else 35.0
    structure_score = clamp(
        trend_score * 0.36
        + rebound_score * 0.28
        + risk_score * 0.20
        + entry_timing_score * 0.16
    )
    total_score = clamp(
        trend_score * 0.24
        + structure_score * 0.22
        + risk_score * 0.16
        + liquidity_score(profile) * 0.12
        + entry_timing_score * 0.16
        + reward_risk_score * 0.10
    )
    is_extended = range_position >= 86
    verdict = (
        "Enter"
        if total_score >= 70 and not is_extended and levels and not position_is_above_entry(levels)
        else "Wait"
        if total_score >= 54
        else "Avoid"
    )
    return {
        "ticker": profile.get("ticker"),
        "name": profile.get("name"),
        "verdict": verdict,
        "score": round(total_score),
        "levels": levels,
        "trendScore": round(trend_score),
        "structureScore": round(structure_score),
        "riskScore": round(risk_score),
        "liquidityScore": round(liquidity_score(profile)),
        "entryTimingScore": round(entry_timing_score),
        "rewardRiskScore": round(reward_risk_score),
        "frame": (levels or {}).get("sourceFrame") or "52-week profile",
    }


def default_state() -> dict[str, Any]:
    return {
        "mode": "max_autonomous_cloud",
        "manager": "Max",
        "startingCash": STARTING_CASH,
        "cash": STARTING_CASH,
        "realizedPnl": 0.0,
        "positions": {},
        "trades": [],
        "equityCurve": [],
        "lastEvaluations": {},
        "autoEnabled": True,
    }


def load_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        return default_state()
    try:
        parsed = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return default_state()
    state = default_state()
    state.update(parsed if isinstance(parsed, dict) else {})
    state["mode"] = "max_autonomous_cloud"
    state["manager"] = "Max"
    state["cash"] = number(state.get("cash"), STARTING_CASH) or STARTING_CASH
    state["realizedPnl"] = number(state.get("realizedPnl"), 0.0) or 0.0
    state["positions"] = state.get("positions") if isinstance(state.get("positions"), dict) else {}
    state["trades"] = state.get("trades") if isinstance(state.get("trades"), list) else []
    state["equityCurve"] = state.get("equityCurve") if isinstance(state.get("equityCurve"), list) else []
    state["lastEvaluations"] = (
        state.get("lastEvaluations") if isinstance(state.get("lastEvaluations"), dict) else {}
    )
    return state


def choose_quote_symbols(
    profiles: list[dict[str, Any]],
    state: dict[str, Any],
    *,
    candidate_limit: int = DEFAULT_QUOTE_CANDIDATE_LIMIT,
    history_by_ticker: dict[str, dict[str, Any]] | None = None,
) -> list[str]:
    ready_profiles = [profile for profile in profiles if is_research_ready(profile)]
    open_tickers = {str(ticker).upper() for ticker in state.get("positions", {})}
    candidate_signals = []
    for profile in ready_profiles:
        ticker = str(profile.get("ticker") or "").upper()
        if not ticker or ticker in open_tickers or not is_tradable_for_new_entry(profile):
            continue
        signal = max_signal(profile, (history_by_ticker or {}).get(ticker))
        candidate_signals.append(signal)
    ranked_candidates = sorted(
        candidate_signals,
        key=lambda item: (
            number(item.get("score"), 0.0) or 0.0,
            number((item.get("levels") or {}).get("rewardRisk"), 0.0) or 0.0,
            number(item.get("liquidityScore"), 0.0) or 0.0,
        ),
        reverse=True,
    )[: max(0, candidate_limit)]
    symbols = list(open_tickers)
    symbols.extend(str(signal.get("ticker") or "").upper() for signal in ranked_candidates)
    return [symbol for symbol in symbols if symbol]


def add_trade(state: dict[str, Any], trade: dict[str, Any]) -> None:
    trade_id = f"{datetime.now(UTC).timestamp():.0f}-{trade.get('ticker', 'MAX')}"
    state["trades"] = [
        {"id": trade_id, "time": now_iso(), **trade},
        *state.get("trades", []),
    ][:250]


def account_equity(state: dict[str, Any]) -> float:
    open_value = 0.0
    for position in state.get("positions", {}).values():
        shares = number(position.get("shares"), 0.0) or 0.0
        price = number(position.get("lastPrice"), position.get("entryPrice")) or 0.0
        open_value += shares * price
    return (number(state.get("cash"), 0.0) or 0.0) + open_value


def append_equity_curve_point(state: dict[str, Any], generated_at: str, equity: float) -> None:
    curve = state.get("equityCurve") if isinstance(state.get("equityCurve"), list) else []
    point = {
        "time": generated_at,
        "equity": round(equity, 4),
        "cash": round(number(state.get("cash"), 0.0) or 0.0, 4),
        "openValue": round(equity - (number(state.get("cash"), 0.0) or 0.0), 4),
        "realizedPnl": round(number(state.get("realizedPnl"), 0.0) or 0.0, 4),
        "openPositions": len(state.get("positions", {})),
    }
    if curve and str(curve[0].get("time")) == generated_at:
        curve[0] = point
    else:
        curve = [point, *curve]
    state["equityCurve"] = curve[:1000]


def should_open(signal: dict[str, Any], open_tickers: set[str]) -> bool:
    ticker = str(signal.get("ticker") or "")
    levels = signal.get("levels") or {}
    price = number(levels.get("price"), None)
    entry_high = number(levels.get("entryHigh"), None)
    return (
        ticker not in open_tickers
        and signal.get("verdict") == "Enter"
        and number(signal.get("score"), 0.0) >= 70
        and price is not None
        and entry_high is not None
        and price <= entry_high * 1.015
    )


def new_entry_block_reason(profile: dict[str, Any]) -> str:
    exchange = str(profile.get("exchange") or "unknown").upper()
    price = number(profile.get("price"), 0.0) or 0.0
    dollar_volume = number(profile.get("avgDailyDollarVolume"), 0.0) or 0.0
    if not is_research_ready(profile):
        return "Directory-only profile; Max needs price, targets, and research data before paper trading."
    if exchange not in PRIMARY_EXCHANGES:
        return f"Exchange {exchange or 'unknown'} is outside Max's current US primary-exchange rule."
    if price < MIN_ENTRY_PRICE:
        return f"Price ${price:.2f} is below Max's ${MIN_ENTRY_PRICE:.2f} minimum trade price."
    if dollar_volume < MIN_AVG_DAILY_DOLLAR_VOLUME:
        return (
            f"Average dollar volume ${dollar_volume:,.0f} is below Max's "
            f"${MIN_AVG_DAILY_DOLLAR_VOLUME:,.0f} liquidity floor."
        )
    return "Ticker is not eligible for a fresh Max paper entry under current guardrails."


def build_bot_evaluation(
    profile: dict[str, Any],
    signal: dict[str, Any],
    *,
    generated_at: str,
    new_entry_tickers: set[str],
    open_tickers: set[str],
    max_open_positions: int,
    candidate_rank: int | None = None,
    sizing_rejected: bool = False,
) -> dict[str, Any]:
    ticker = str(signal.get("ticker") or profile.get("ticker") or "").upper()
    levels = signal.get("levels") or {}
    score = number(signal.get("score"), 0.0) or 0.0
    verdict = str(signal.get("verdict") or "Wait")
    price = number(levels.get("price"), None)
    entry_high = number(levels.get("entryHigh"), None)
    frame = str(signal.get("frame") or (levels or {}).get("sourceFrame") or "52-week profile")

    action = "WAIT"
    label = f"Technical {verdict}"
    reason = f"Max {verdict} with {round(score)}/100 technical conviction."
    eligible = False
    rejection_code = "WAITING"

    if ticker in open_tickers:
        action = "HOLD"
        label = "Held"
        reason = f"Open paper position; managing stop and targets from {frame}."
        eligible = True
        rejection_code = None
    elif ticker not in new_entry_tickers:
        action = "REJECTED"
        label = "Not tradable"
        reason = new_entry_block_reason(profile)
        rejection_code = "NOT_TRADABLE"
    elif not levels:
        action = "REJECTED"
        label = "Missing levels"
        reason = "Missing price/range inputs, so Max cannot size entry, stop, or targets."
        rejection_code = "MISSING_LEVELS"
    elif verdict != "Enter":
        action = "WAIT" if verdict == "Wait" else "REJECTED"
        label = f"Technical {verdict}"
        reason = f"Needs Enter; current verdict is {verdict} at {round(score)}/100."
        rejection_code = "VERDICT"
    elif score < 70:
        action = "WAIT"
        label = "Score below 70"
        reason = f"Technical score {round(score)}/100 is below Max's 70/100 entry threshold."
        rejection_code = "SCORE"
    elif price is not None and entry_high is not None and price > entry_high * 1.015:
        action = "WAIT"
        label = "Above entry"
        reason = f"Price ${price:.2f} is more than 1.5% above Max's entry-high guard at ${entry_high:.2f}."
        rejection_code = "ABOVE_ENTRY"
    elif sizing_rejected:
        action = "WAIT"
        label = "Sizing blocked"
        reason = "Setup passed, but cash/risk sizing is below the $50 order floor."
        rejection_code = "SIZING"
    elif len(open_tickers) >= max_open_positions:
        action = "WAIT"
        label = "Capacity full"
        reason = (
            f"Max already holds {len(open_tickers)}/{max_open_positions} paper positions; "
            "needs an exit before adding more."
        )
        rejection_code = "CAPACITY"
    else:
        action = "BUY"
        label = "Eligible"
        reason = (
            f"Eligible for Max's next paper entry"
            f"{f' as candidate #{candidate_rank}' if candidate_rank else ''}: "
            f"{round(score)}/100 on the {frame} frame."
        )
        eligible = True
        rejection_code = None

    return {
        "time": generated_at,
        "action": action,
        "label": label,
        "reason": reason,
        "price": round(price, 4) if price is not None else None,
        "score": round(score),
        "verdict": verdict,
        "frame": frame,
        "candidateRank": candidate_rank,
        "eligible": eligible,
        "rejectionCode": rejection_code,
    }


def size_position(state: dict[str, Any], signal: dict[str, Any]) -> tuple[float, float]:
    levels = signal["levels"]
    price = number(levels.get("price"), 0.0) or 0.0
    stop = number(levels.get("stop"), 0.0) or 0.0
    equity = account_equity(state)
    max_notional = equity * MAX_POSITION_FRACTION
    risk_budget = equity * RISK_FRACTION
    risk_per_share = max(price - stop, price * 0.025)
    cash_available = max(number(state.get("cash"), 0.0) or 0.0, 0.0)
    raw_shares = min(max_notional / price, risk_budget / risk_per_share, cash_available / price)
    shares = math.floor(raw_shares * 10_000) / 10_000
    value = shares * price
    return shares, value


def update_position_from_signal(position: dict[str, Any], signal: dict[str, Any]) -> None:
    levels = signal.get("levels") or {}
    position["lastPrice"] = levels.get("price", position.get("lastPrice"))
    position["stop"] = levels.get("stop", position.get("stop"))
    position["target1"] = levels.get("target1", position.get("target1"))
    position["target2"] = levels.get("target2", position.get("target2"))
    position["target3"] = levels.get("target3", position.get("target3"))
    position["maxVerdict"] = signal.get("verdict")
    position["maxScore"] = signal.get("score")


def run_max_bot(
    profiles: list[dict[str, Any]],
    state: dict[str, Any],
    *,
    max_open_positions: int = DEFAULT_MAX_OPEN_POSITIONS,
    live_quote_count: int = 0,
    history_by_ticker: dict[str, dict[str, Any]] | None = None,
) -> dict[str, Any]:
    generated_at = now_iso()
    state.setdefault("positions", {})
    state.setdefault("trades", [])
    state.setdefault("lastEvaluations", {})
    state.setdefault("cash", STARTING_CASH)
    state.setdefault("realizedPnl", 0.0)
    ready_profiles = [profile for profile in profiles if is_research_ready(profile)]
    profile_by_ticker = {str(profile.get("ticker")).upper(): profile for profile in ready_profiles}
    new_entry_tickers = {
        str(profile.get("ticker")).upper()
        for profile in ready_profiles
        if is_tradable_for_new_entry(profile)
    }
    signals = {
        ticker: max_signal(profile, (history_by_ticker or {}).get(ticker))
        for ticker, profile in profile_by_ticker.items()
    }

    # First let Max manage open risk before opening fresh trades.
    for ticker, position in list(state.get("positions", {}).items()):
        normalized = str(ticker).upper()
        signal = signals.get(normalized)
        if not signal or not signal.get("levels"):
            continue
        levels = signal["levels"]
        price = number(levels.get("price"), 0.0) or 0.0
        shares = number(position.get("shares"), 0.0) or 0.0
        entry_price = number(position.get("entryPrice"), price) or price
        stored_stop = number(position.get("stop"), levels.get("stop")) or 0.0
        stored_target2 = number(position.get("target2"), levels.get("target2")) or math.inf
        exit_reason = None
        if price <= stored_stop:
            exit_reason = "Max exit: price touched the technical stop."
        elif stored_target2 > entry_price and price >= stored_target2:
            exit_reason = "Max exit: price reached the TP2 objective."
        elif signal.get("verdict") == "Avoid" or (number(signal.get("score"), 0.0) or 0.0) < 48:
            exit_reason = "Max exit: technical thesis degraded to Avoid."

        if exit_reason:
            value = shares * price
            pnl = (price - entry_price) * shares
            state["cash"] = round((number(state.get("cash"), 0.0) or 0.0) + value, 4)
            state["realizedPnl"] = round((number(state.get("realizedPnl"), 0.0) or 0.0) + pnl, 4)
            del state["positions"][ticker]
            add_trade(
                state,
                {
                    "type": "SELL",
                    "ticker": normalized,
                    "shares": shares,
                    "entryPrice": round(entry_price, 4),
                    "exitPrice": round(price, 4),
                    "price": round(price, 4),
                    "value": round(value, 2),
                    "realizedPnl": round(pnl, 2),
                    "pnl": round(pnl, 2),
                    "reason": exit_reason,
                },
            )
        else:
            update_position_from_signal(position, signal)

    open_tickers = {str(ticker).upper() for ticker in state.get("positions", {})}
    candidates = sorted(
        (
            signal
            for ticker, signal in signals.items()
            if ticker in new_entry_tickers and should_open(signal, open_tickers)
        ),
        key=lambda item: (
            number(item.get("score"), 0.0) or 0.0,
            number((item.get("levels") or {}).get("rewardRisk"), 0.0) or 0.0,
            number(item.get("liquidityScore"), 0.0) or 0.0,
        ),
        reverse=True,
    )
    candidate_rank_by_ticker = {
        str(signal.get("ticker") or "").upper(): index + 1 for index, signal in enumerate(candidates)
    }
    sizing_rejected_tickers: set[str] = set()

    for signal in candidates:
        if len(state.get("positions", {})) >= max_open_positions:
            break
        shares, value = size_position(state, signal)
        if not math.isfinite(shares) or shares <= 0 or value < 50:
            sizing_rejected_tickers.add(str(signal.get("ticker") or "").upper())
            continue
        ticker = str(signal["ticker"]).upper()
        levels = signal["levels"]
        state["cash"] = round((number(state.get("cash"), 0.0) or 0.0) - value, 4)
        state["positions"][ticker] = {
            "ticker": ticker,
            "name": signal.get("name"),
            "shares": shares,
            "entryPrice": levels["price"],
            "lastPrice": levels["price"],
            "stop": levels["stop"],
            "target1": levels["target1"],
            "target2": levels["target2"],
            "target3": levels["target3"],
            "openedAt": generated_at,
            "finalCall": "Max Enter",
            "conviction": signal["score"],
            "maxVerdict": signal["verdict"],
            "maxScore": signal["score"],
        }
        open_tickers.add(ticker)
        add_trade(
            state,
            {
                "type": "BUY",
                "ticker": ticker,
                "shares": shares,
                "price": round(levels["price"], 4),
                "value": round(value, 2),
                "reason": (
                    f"Max autonomous entry: {signal['score']}/100 technical score, "
                    f"{levels['position'].lower()}, reward/risk {levels['rewardRisk']:.1f}x."
                ),
            },
        )

    open_tickers = {str(ticker).upper() for ticker in state.get("positions", {})}
    state["lastEvaluations"] = {
        ticker: build_bot_evaluation(
            profile_by_ticker[ticker],
            signal,
            generated_at=generated_at,
            new_entry_tickers=new_entry_tickers,
            open_tickers=open_tickers,
            max_open_positions=max_open_positions,
            candidate_rank=candidate_rank_by_ticker.get(ticker),
            sizing_rejected=ticker in sizing_rejected_tickers,
        )
        for ticker, signal in sorted(signals.items(), key=lambda item: item[1].get("score", 0), reverse=True)
    }

    equity = account_equity(state)
    append_equity_curve_point(state, generated_at, equity)
    state.update(
        {
            "mode": "max_autonomous_cloud",
            "manager": "Max",
            "generatedAt": generated_at,
            "source": {
                "engine": "golden_pocket.max_paper_bot",
                "decisionOwner": "Max",
                "notes": [
                    "Paper trading only. No brokerage orders are placed.",
                    "Max scans research-ready tickers and manages entries/exits from technical structure.",
                    "When FMP_API_KEY is configured, Max updates open positions and top candidates with FMP batch short quotes before trading.",
                    "The static webapp displays this saved cloud-run state.",
                ],
                "liveQuotesApplied": live_quote_count,
                "historyProfilesApplied": len(history_by_ticker or {}),
                "defaultFrame": DEFAULT_BOT_FRAME_LABEL,
                "riskSettings": {
                    "maxOpenPositions": max_open_positions,
                    "maxPositionFraction": MAX_POSITION_FRACTION,
                    "riskFraction": RISK_FRACTION,
                    "minEntryPrice": MIN_ENTRY_PRICE,
                    "minAvgDailyDollarVolume": MIN_AVG_DAILY_DOLLAR_VOLUME,
                },
            },
            "equity": round(equity, 4),
            "openValue": round(equity - (number(state.get("cash"), 0.0) or 0.0), 4),
            "returnPct": round(((equity - STARTING_CASH) / STARTING_CASH) * 100, 4),
            "openPositions": len(state.get("positions", {})),
            "lastRunSummary": (
                f"Max scanned {len(ready_profiles)} research-ready tickers and is managing "
                f"{len(state.get('positions', {}))} open paper position(s)."
            ),
        }
    )
    return state


def write_outputs(state: dict[str, Any], json_path: Path, js_path: Path) -> None:
    json_path.parent.mkdir(parents=True, exist_ok=True)
    js_path.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(state, separators=(",", ":"))
    json_path.write_text(serialized, encoding="utf-8")
    js_path.write_text(f"window.GOLDEN_POCKET_MAX_BOT = {serialized};\n", encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run Max's autonomous paper trading bot.")
    parser.add_argument("--profiles-path", default="webapp/data/research_profiles.json")
    parser.add_argument("--state-path", default="webapp/data/max_bot_state.json")
    parser.add_argument("--js-path", default="webapp/data/max_bot_state.js")
    parser.add_argument("--history-dir", default="webapp/data/history")
    parser.add_argument("--max-open-positions", type=int, default=DEFAULT_MAX_OPEN_POSITIONS)
    parser.add_argument("--fmp-api-key", default=os.environ.get("FMP_API_KEY", ""))
    parser.add_argument("--quote-candidate-limit", type=int, default=DEFAULT_QUOTE_CANDIDATE_LIMIT)
    parser.add_argument("--quote-batch-size", type=int, default=DEFAULT_QUOTE_BATCH_SIZE)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    profiles_payload = json.loads(Path(args.profiles_path).read_text(encoding="utf-8"))
    profiles = profiles_payload.get("profiles") or []
    state_path = Path(args.state_path)
    state = load_state(state_path)
    history_by_ticker: dict[str, dict[str, Any]] = {}
    history_dir = Path(args.history_dir)
    if history_dir.exists():
        history_symbols = [
            str(profile.get("ticker") or "").upper()
            for profile in profiles
            if is_research_ready(profile) and profile.get("ticker")
        ]
        history_by_ticker = load_history_by_ticker(history_dir, history_symbols)
        if history_by_ticker:
            print(f"Loaded cached {DEFAULT_BOT_FRAME_LABEL} history for {len(history_by_ticker)} ticker(s).")
    live_quote_count = 0
    if args.fmp_api_key:
        symbols = choose_quote_symbols(
            profiles,
            state,
            candidate_limit=args.quote_candidate_limit,
            history_by_ticker=history_by_ticker,
        )
        try:
            quotes = fetch_fmp_quote_batch(
                symbols,
                args.fmp_api_key,
                batch_size=args.quote_batch_size,
            )
            live_quote_count = len(quotes)
            profiles = apply_live_quotes(profiles, quotes, fetched_at=now_iso())
            if quotes:
                print(f"Applied {live_quote_count} FMP live quote(s) for Max.")
        except Exception as error:  # noqa: BLE001 - quote refresh should not block the paper ledger.
            print(f"Skipped FMP live quotes for Max: {error}")
    state = run_max_bot(
        profiles,
        state,
        max_open_positions=args.max_open_positions,
        live_quote_count=live_quote_count,
        history_by_ticker=history_by_ticker,
    )
    write_outputs(state, state_path, Path(args.js_path))
    print(state["lastRunSummary"])


if __name__ == "__main__":
    main()
