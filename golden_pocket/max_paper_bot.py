from __future__ import annotations

import argparse
import json
import math
import os
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
DEFAULT_QUOTE_CANDIDATE_LIMIT = 250
DEFAULT_QUOTE_BATCH_SIZE = 100
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
    bucket = str(profile.get("liquidityBucket") or "").lower()
    if "high" in bucket:
        return 90.0
    if "medium" in bucket or "mid" in bucket:
        return 68.0
    if "low" in bucket:
        return 42.0
    dollar_volume = number(profile.get("avgDailyDollarVolume"), 0.0) or 0.0
    if dollar_volume >= 50_000_000:
        return 90.0
    if dollar_volume >= 10_000_000:
        return 72.0
    if dollar_volume >= 2_000_000:
        return 55.0
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


def max_signal(profile: dict[str, Any]) -> dict[str, Any]:
    levels = build_trade_levels(profile)
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
        if total_score >= 70 and not is_extended and levels and levels.get("position") != "Above preferred entry"
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
    state["lastEvaluations"] = (
        state.get("lastEvaluations") if isinstance(state.get("lastEvaluations"), dict) else {}
    )
    return state


def choose_quote_symbols(
    profiles: list[dict[str, Any]],
    state: dict[str, Any],
    *,
    candidate_limit: int = DEFAULT_QUOTE_CANDIDATE_LIMIT,
) -> list[str]:
    ready_profiles = [profile for profile in profiles if is_research_ready(profile)]
    open_tickers = {str(ticker).upper() for ticker in state.get("positions", {})}
    candidate_signals = []
    for profile in ready_profiles:
        ticker = str(profile.get("ticker") or "").upper()
        if not ticker or ticker in open_tickers or not is_tradable_for_new_entry(profile):
            continue
        signal = max_signal(profile)
        if should_open(signal, open_tickers):
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
    signals = {ticker: max_signal(profile) for ticker, profile in profile_by_ticker.items()}

    # First let Max manage open risk before opening fresh trades.
    for ticker, position in list(state.get("positions", {}).items()):
        normalized = str(ticker).upper()
        signal = signals.get(normalized)
        if not signal or not signal.get("levels"):
            continue
        update_position_from_signal(position, signal)
        levels = signal["levels"]
        price = number(levels.get("price"), 0.0) or 0.0
        shares = number(position.get("shares"), 0.0) or 0.0
        entry_price = number(position.get("entryPrice"), price) or price
        exit_reason = None
        if price <= (number(position.get("stop"), levels.get("stop")) or 0.0):
            exit_reason = "Max exit: price touched the technical stop."
        elif price >= (number(position.get("target2"), levels.get("target2")) or math.inf):
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
                    "price": round(price, 4),
                    "value": round(value, 2),
                    "pnl": round(pnl, 2),
                    "reason": exit_reason,
                },
            )

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

    for signal in candidates:
        if len(state.get("positions", {})) >= max_open_positions:
            break
        shares, value = size_position(state, signal)
        if not math.isfinite(shares) or shares <= 0 or value < 50:
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

    for ticker, signal in sorted(signals.items(), key=lambda item: item[1].get("score", 0), reverse=True)[:250]:
        levels = signal.get("levels") or {}
        can_open = ticker in new_entry_tickers and should_open(signal, open_tickers)
        state["lastEvaluations"][ticker] = {
            "time": generated_at,
            "action": "BUY" if can_open else "HOLD" if ticker in open_tickers else "WAIT",
            "label": signal.get("verdict"),
            "reason": f"Max {signal.get('verdict')} with {signal.get('score')}/100 technical conviction.",
            "price": levels.get("price"),
            "score": signal.get("score"),
        }

    equity = account_equity(state)
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
    live_quote_count = 0
    if args.fmp_api_key:
        symbols = choose_quote_symbols(
            profiles,
            state,
            candidate_limit=args.quote_candidate_limit,
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
    )
    write_outputs(state, state_path, Path(args.js_path))
    print(state["lastRunSummary"])


if __name__ == "__main__":
    main()
