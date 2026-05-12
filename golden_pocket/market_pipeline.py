from __future__ import annotations

import argparse
import concurrent.futures
import gzip
import json
import re
import threading
import time
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

SEC_TICKERS_URL = "https://www.sec.gov/files/company_tickers_exchange.json"
SEC_SUBMISSIONS_URL = "https://data.sec.gov/submissions/CIK{cik}.json"
DEFAULT_USER_AGENT = "GoldenPocketLab research@local.dev"


@dataclass(frozen=True)
class Classification:
    sector: str
    industry: str
    confidence: int
    source: str


class RateLimiter:
    def __init__(self, requests_per_second: float) -> None:
        if requests_per_second <= 0:
            raise ValueError("requests_per_second must be greater than zero.")
        self.interval = 1.0 / requests_per_second
        self.lock = threading.Lock()
        self.next_allowed = 0.0

    def wait(self) -> None:
        delay = 0.0
        with self.lock:
            now = time.monotonic()
            if now < self.next_allowed:
                delay = self.next_allowed - now
                self.next_allowed += self.interval
            else:
                self.next_allowed = now + self.interval
        if delay > 0:
            time.sleep(delay)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Build a full-market SEC-backed universe file for the Golden Pocket webapp."
    )
    parser.add_argument(
        "--output-dir",
        default="webapp/data",
        help="Directory that will receive market_universe.js and market_universe.json.",
    )
    parser.add_argument(
        "--cache-dir",
        default="data/sec_cache",
        help="Directory used for SEC response caching.",
    )
    parser.add_argument(
        "--user-agent",
        default=DEFAULT_USER_AGENT,
        help="Declared SEC user agent header. Prefer a real contact when running regularly.",
    )
    parser.add_argument(
        "--cache-hours",
        type=float,
        default=168.0,
        help="How long cached SEC files stay fresh before they are refreshed.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=20.0,
        help="HTTP timeout in seconds for SEC requests.",
    )
    parser.add_argument(
        "--requests-per-second",
        type=float,
        default=8.0,
        help="Target SEC request rate. Keep this below the SEC max of 10 req/sec.",
    )
    parser.add_argument(
        "--max-workers",
        type=int,
        default=8,
        help="Concurrent submission fetch workers.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Optional cap for the number of tickers to process while testing the pipeline.",
    )
    parser.add_argument(
        "--skip-submissions",
        action="store_true",
        help="Only pull the ticker universe file and skip per-company SIC enrichment.",
    )
    parser.add_argument(
        "--force-refresh",
        action="store_true",
        help="Ignore cache freshness and pull fresh SEC responses.",
    )
    return parser


def sanitize_filename(value: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9._-]+", "-", value)
    return cleaned.strip("-") or "value"


def slugify_ticker(ticker: str) -> str:
    return sanitize_filename(ticker.lower())


def normalize_whitespace(value: str | None) -> str:
    return re.sub(r"\s+", " ", (value or "")).strip()


def maybe_title_case(value: str) -> str:
    small_words = {"and", "of", "for", "the", "to", "in", "a", "an"}
    words = re.split(r"(\s+)", value.lower())
    result: list[str] = []
    for index, word in enumerate(words):
        if not word or word.isspace():
            result.append(word)
            continue
        if index != 0 and word in small_words:
            result.append(word)
        else:
            result.append(word.capitalize())
    return "".join(result)


def keyword_match(text: str, keywords: tuple[str, ...]) -> bool:
    return any(keyword in text for keyword in keywords)


def classify_company(name: str, sic: str | None, sic_description: str | None) -> Classification:
    name_text = normalize_whitespace(name).lower()
    desc_text = normalize_whitespace(sic_description).lower()
    text = f"{name_text} {desc_text}".strip()
    code = int(sic) if sic and sic.isdigit() else None

    if not text:
        return Classification("Other", "Unclassified", 10, "missing_sec_sic")

    if keyword_match(
        text,
        (
            "pharmaceutical",
            "biotech",
            "biological",
            "medical",
            "hospital",
            "health care",
            "healthcare",
            "diagnostic",
            "laborator",
            "surgical",
            "therapeutic",
            "dental",
            "clinic",
            "managed care",
            "drug",
        ),
    ):
        if keyword_match(text, ("insurance", "managed care", "health maintenance organization")):
            return Classification("Health Care", "Health Insurance & Managed Care", 92, "sic_keywords")
        if keyword_match(text, ("hospital", "clinic", "provider", "care services")):
            return Classification("Health Care", "Health Care Providers & Services", 90, "sic_keywords")
        if keyword_match(text, ("diagnostic", "device", "surgical", "dental", "medical instruments")):
            return Classification("Health Care", "Medical Devices & Diagnostics", 90, "sic_keywords")
        if keyword_match(text, ("biotech", "biological")):
            return Classification("Health Care", "Biotechnology", 93, "sic_keywords")
        return Classification("Health Care", "Pharmaceuticals & Therapeutics", 91, "sic_keywords")

    if keyword_match(
        text,
        (
            "prepackaged software",
            "software",
            "computer programming",
            "computer integrated systems design",
            "semiconductor",
            "electronic computer",
            "computer peripheral",
            "data processing",
            "computer communications",
            "storage",
            "search, detection, navigation",
            "electronic components",
        ),
    ):
        if keyword_match(text, ("semiconductor", "electronic components", "integrated circuit")):
            return Classification("Technology", "Semiconductors & Chips", 95, "sic_keywords")
        if keyword_match(text, ("software", "programming", "systems design", "data processing")):
            return Classification("Technology", "Software & IT Services", 94, "sic_keywords")
        if keyword_match(text, ("communications equipment", "network", "telecommunications equipment")):
            return Classification("Technology", "Networking & Communications Equipment", 92, "sic_keywords")
        return Classification("Technology", "Computers & Hardware", 92, "sic_keywords")

    if keyword_match(
        text,
        (
            "bank",
            "credit",
            "finance",
            "financial",
            "insurance",
            "security brokers",
            "investment advice",
            "asset management",
            "capital",
            "mortgage",
            "trust",
            "lending",
        ),
    ):
        if keyword_match(text, ("insurance", "reinsurance")):
            return Classification("Financials", "Insurance", 93, "sic_keywords")
        if keyword_match(text, ("security brokers", "investment advice", "asset management", "capital")):
            return Classification("Financials", "Capital Markets & Asset Managers", 92, "sic_keywords")
        if keyword_match(text, ("mortgage", "reit", "real estate investment trust")):
            return Classification("Real Estate", "Mortgage & Specialty REITs", 88, "sic_keywords")
        return Classification("Financials", "Banks & Lenders", 91, "sic_keywords")

    if keyword_match(
        text,
        (
            "real estate investment trust",
            "operators of apartment buildings",
            "lessors of real property",
            "real estate",
            "property",
        ),
    ):
        if keyword_match(text, ("warehouse", "logistics", "industrial property")):
            return Classification("Real Estate", "Industrial & Logistics REITs", 88, "sic_keywords")
        if keyword_match(text, ("office", "workspace")):
            return Classification("Real Estate", "Office REITs", 88, "sic_keywords")
        if keyword_match(text, ("hotel", "lodging", "resort")):
            return Classification("Real Estate", "Hospitality REITs", 88, "sic_keywords")
        if keyword_match(text, ("retail", "shopping center", "mall")):
            return Classification("Real Estate", "Retail REITs", 88, "sic_keywords")
        return Classification("Real Estate", "Real Estate & REITs", 86, "sic_keywords")

    if keyword_match(
        text,
        (
            "crude petroleum",
            "oil",
            "gas",
            "drilling",
            "pipeline",
            "exploration",
            "refining",
            "oilfield",
            "petroleum",
        ),
    ):
        if keyword_match(text, ("drilling", "oilfield", "services")):
            return Classification("Energy", "Oilfield Services & Equipment", 94, "sic_keywords")
        if keyword_match(text, ("pipeline", "transportation")):
            return Classification("Energy", "Midstream & Pipelines", 93, "sic_keywords")
        return Classification("Energy", "Integrated Energy & Producers", 92, "sic_keywords")

    if keyword_match(
        text,
        (
            "electric services",
            "gas production",
            "water supply",
            "combination utilities",
            "steam and air-conditioning supply",
            "utility",
        ),
    ):
        return Classification("Utilities", "Utilities", 95, "sic_keywords")

    if keyword_match(
        text,
        (
            "telephone communications",
            "radio broadcasting",
            "television broadcasting",
            "cable",
            "media",
            "entertainment",
            "publishing",
            "internet",
            "streaming",
            "social",
        ),
    ):
        if keyword_match(text, ("telephone", "telecommunications", "cable")):
            return Classification("Communication Services", "Telecom & Connectivity", 92, "sic_keywords")
        if keyword_match(text, ("broadcasting", "media", "publishing")):
            return Classification("Communication Services", "Media & Publishing", 90, "sic_keywords")
        return Classification("Communication Services", "Entertainment & Platforms", 90, "sic_keywords")

    if keyword_match(
        text,
        (
            "food",
            "beverage",
            "tobacco",
            "grocery",
            "personal care",
            "household",
            "soap",
            "cosmetic",
            "drug stores",
            "supermarkets",
        ),
    ):
        return Classification("Consumer Staples", "Consumer Staples", 92, "sic_keywords")

    if keyword_match(
        text,
        (
            "retail",
            "restaurant",
            "hotel",
            "motor vehicle",
            "apparel",
            "footwear",
            "department store",
            "homebuilding",
            "home furnishings",
            "amusement",
            "gaming",
            "travel",
            "leisure",
        ),
    ):
        if keyword_match(text, ("restaurant", "hotel", "travel", "leisure", "gaming", "amusement")):
            return Classification("Consumer Discretionary", "Travel, Leisure & Restaurants", 90, "sic_keywords")
        if keyword_match(text, ("motor vehicle", "auto", "automobile")):
            return Classification("Consumer Discretionary", "Automotive", 90, "sic_keywords")
        return Classification("Consumer Discretionary", "Retail & Consumer Discretionary", 88, "sic_keywords")

    if keyword_match(
        text,
        (
            "transportation",
            "air freight",
            "air transportation",
            "railroad",
            "trucking",
            "aerospace",
            "defense",
            "machinery",
            "construction",
            "engineering",
            "waste",
        ),
    ):
        if keyword_match(text, ("air", "rail", "trucking", "transportation")):
            return Classification("Industrials", "Transportation & Logistics", 90, "sic_keywords")
        if keyword_match(text, ("aerospace", "defense")):
            return Classification("Industrials", "Aerospace & Defense", 92, "sic_keywords")
        return Classification("Industrials", "Industrial Equipment & Services", 88, "sic_keywords")

    if keyword_match(
        text,
        (
            "mining",
            "steel",
            "chemical",
            "paper",
            "forest products",
            "glass",
            "aluminum",
            "copper",
            "gold",
            "silver",
            "plastics",
            "packaging",
        ),
    ):
        return Classification("Materials", "Materials & Mining", 91, "sic_keywords")

    if code is not None:
        if 6000 <= code <= 6799:
            return Classification("Financials", maybe_title_case(normalize_whitespace(sic_description) or "Financials"), 68, "sic_range")
        if code == 6798:
            return Classification("Real Estate", "Real Estate & REITs", 72, "sic_range")
        if 4900 <= code <= 4999:
            return Classification("Utilities", maybe_title_case(normalize_whitespace(sic_description) or "Utilities"), 70, "sic_range")
        if 2800 <= code <= 2836:
            return Classification("Health Care", maybe_title_case(normalize_whitespace(sic_description) or "Health Care"), 72, "sic_range")
        if 3500 <= code <= 3579:
            return Classification("Technology", maybe_title_case(normalize_whitespace(sic_description) or "Technology"), 70, "sic_range")
        if 3600 <= code <= 3679:
            return Classification("Technology", maybe_title_case(normalize_whitespace(sic_description) or "Technology"), 70, "sic_range")
        if 1000 <= code <= 1499:
            return Classification("Materials", maybe_title_case(normalize_whitespace(sic_description) or "Materials"), 66, "sic_range")
        if 1300 <= code <= 1399:
            return Classification("Energy", maybe_title_case(normalize_whitespace(sic_description) or "Energy"), 70, "sic_range")
        if 1500 <= code <= 1799:
            return Classification("Industrials", maybe_title_case(normalize_whitespace(sic_description) or "Industrials"), 64, "sic_range")
        if 4000 <= code <= 4899:
            return Classification("Industrials", maybe_title_case(normalize_whitespace(sic_description) or "Industrials"), 64, "sic_range")
        if 5000 <= code <= 5999:
            return Classification(
                "Consumer Discretionary",
                maybe_title_case(normalize_whitespace(sic_description) or "Consumer"),
                62,
                "sic_range",
            )

    label = maybe_title_case(normalize_whitespace(sic_description) or "Unclassified")
    return Classification("Other", label, 40, "sic_fallback")


def is_cache_fresh(path: Path, cache_hours: float) -> bool:
    if not path.exists():
        return False
    age_seconds = time.time() - path.stat().st_mtime
    return age_seconds <= cache_hours * 3600


def decode_body(body: bytes, encoding: str | None) -> bytes:
    if encoding == "gzip":
        return gzip.decompress(body)
    return body


def fetch_json(url: str, user_agent: str, timeout: float) -> Any:
    request = Request(
        url,
        headers={
            "User-Agent": user_agent,
            "Accept-Encoding": "gzip, deflate",
        },
    )
    with urlopen(request, timeout=timeout) as response:
        body = response.read()
        encoding = response.headers.get("Content-Encoding")
    decoded = decode_body(body, encoding)
    return json.loads(decoded.decode("utf-8"))


def read_or_fetch_json(
    *,
    url: str,
    cache_path: Path,
    user_agent: str,
    timeout: float,
    cache_hours: float,
    force_refresh: bool,
    limiter: RateLimiter | None,
) -> Any:
    if not force_refresh and is_cache_fresh(cache_path, cache_hours):
        return json.loads(cache_path.read_text(encoding="utf-8"))

    cache_path.parent.mkdir(parents=True, exist_ok=True)
    if limiter is not None:
        limiter.wait()
    payload = fetch_json(url, user_agent=user_agent, timeout=timeout)
    cache_path.write_text(json.dumps(payload), encoding="utf-8")
    return payload


def parse_ticker_rows(payload: dict[str, Any], limit: int | None = None) -> list[dict[str, str]]:
    fields = payload.get("fields", [])
    rows = payload.get("data", [])
    parsed: list[dict[str, str]] = []
    for row in rows:
        item = {field: str(value) for field, value in zip(fields, row)}
        if not item.get("ticker"):
            continue
        parsed.append(item)
        if limit is not None and len(parsed) >= limit:
            break
    return parsed


def enrich_row(
    row: dict[str, str],
    *,
    submissions_cache_dir: Path,
    user_agent: str,
    timeout: float,
    cache_hours: float,
    force_refresh: bool,
    limiter: RateLimiter | None,
    skip_submissions: bool,
) -> dict[str, Any]:
    ticker = normalize_whitespace(row.get("ticker"))
    name = normalize_whitespace(row.get("name"))
    exchange = normalize_whitespace(row.get("exchange"))
    cik_raw = normalize_whitespace(row.get("cik"))
    cik = cik_raw.zfill(10)

    submission = None
    if not skip_submissions:
        submission_cache = submissions_cache_dir / f"CIK{cik}.json"
        submission_url = SEC_SUBMISSIONS_URL.format(cik=cik)
        try:
            submission = read_or_fetch_json(
                url=submission_url,
                cache_path=submission_cache,
                user_agent=user_agent,
                timeout=timeout,
                cache_hours=cache_hours,
                force_refresh=force_refresh,
                limiter=limiter,
            )
        except (HTTPError, URLError, TimeoutError, OSError, json.JSONDecodeError) as exc:
            submission = {"_error": str(exc)}

    sec_name = normalize_whitespace(submission.get("name")) if isinstance(submission, dict) else ""
    sec_sic = normalize_whitespace(submission.get("sic")) if isinstance(submission, dict) else ""
    sec_sic_description = (
        normalize_whitespace(submission.get("sicDescription")) if isinstance(submission, dict) else ""
    )
    submission_exchanges = (
        submission.get("exchanges") if isinstance(submission, dict) and isinstance(submission.get("exchanges"), list) else []
    )
    submission_tickers = (
        submission.get("tickers") if isinstance(submission, dict) and isinstance(submission.get("tickers"), list) else []
    )
    classification = classify_company(sec_name or name, sec_sic or None, sec_sic_description or None)

    return {
        "id": slugify_ticker(ticker),
        "ticker": ticker,
        "name": sec_name or name,
        "exchange": normalize_whitespace(submission_exchanges[0]) if submission_exchanges else exchange,
        "cik": cik,
        "sector": classification.sector,
        "industry": classification.industry,
        "sic": sec_sic or None,
        "sicDescription": sec_sic_description or None,
        "classificationSource": classification.source,
        "classificationConfidence": classification.confidence,
        "submissionTickers": submission_tickers or [ticker],
        "profileMode": "directory_only",
    }


def build_payload(records: list[dict[str, Any]]) -> dict[str, Any]:
    sorted_records = sorted(records, key=lambda item: (item["sector"], item["industry"], item["ticker"]))
    sectors = sorted({record["sector"] for record in sorted_records})
    industries = sorted({record["industry"] for record in sorted_records})
    enriched = sum(1 for record in sorted_records if record.get("sic"))
    missing_sic = len(sorted_records) - enriched
    generated_at = datetime.now(UTC).replace(microsecond=0).isoformat()
    return {
        "generatedAt": generated_at,
        "stats": {
            "totalTickers": len(sorted_records),
            "totalSectors": len(sectors),
            "totalIndustries": len(industries),
            "enrichedTickers": enriched,
            "missingSicTickers": missing_sic,
        },
        "source": {
            "tickerUniverse": SEC_TICKERS_URL,
            "submissionsApi": SEC_SUBMISSIONS_URL,
            "notes": [
                "Ticker and exchange data come from the SEC company_tickers_exchange.json file.",
                "Sector and industry are heuristic explorer classifications derived from SEC SIC metadata when available.",
                "This file is safe to load from file:// because the generator also emits a JavaScript bundle.",
            ],
        },
        "records": sorted_records,
    }


def write_outputs(payload: dict[str, Any], output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    json_path = output_dir / "market_universe.json"
    js_path = output_dir / "market_universe.js"
    serialized = json.dumps(payload, indent=2)
    json_path.write_text(serialized, encoding="utf-8")
    js_path.write_text(f"window.GOLDEN_POCKET_UNIVERSE = {serialized};\n", encoding="utf-8")
    return json_path, js_path


def build_market_universe(
    *,
    output_dir: Path,
    cache_dir: Path,
    user_agent: str,
    cache_hours: float,
    timeout: float,
    requests_per_second: float,
    max_workers: int,
    limit: int | None,
    skip_submissions: bool,
    force_refresh: bool,
) -> dict[str, Any]:
    cache_dir.mkdir(parents=True, exist_ok=True)
    submissions_cache_dir = cache_dir / "submissions"
    submissions_cache_dir.mkdir(parents=True, exist_ok=True)

    ticker_cache_path = cache_dir / "company_tickers_exchange.json"
    ticker_payload = read_or_fetch_json(
        url=SEC_TICKERS_URL,
        cache_path=ticker_cache_path,
        user_agent=user_agent,
        timeout=timeout,
        cache_hours=cache_hours,
        force_refresh=force_refresh,
        limiter=None,
    )
    rows = parse_ticker_rows(ticker_payload, limit=limit)
    limiter = None if skip_submissions else RateLimiter(requests_per_second=requests_per_second)

    print(f"Loaded {len(rows)} tickers from SEC ticker universe.")
    if skip_submissions:
        print("Skipping per-company submissions enrichment.")

    records: list[dict[str, Any]] = []
    if skip_submissions or len(rows) <= 1:
        for row in rows:
            records.append(
                enrich_row(
                    row,
                    submissions_cache_dir=submissions_cache_dir,
                    user_agent=user_agent,
                    timeout=timeout,
                    cache_hours=cache_hours,
                    force_refresh=force_refresh,
                    limiter=limiter,
                    skip_submissions=skip_submissions,
                )
            )
    else:
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = [
                executor.submit(
                    enrich_row,
                    row,
                    submissions_cache_dir=submissions_cache_dir,
                    user_agent=user_agent,
                    timeout=timeout,
                    cache_hours=cache_hours,
                    force_refresh=force_refresh,
                    limiter=limiter,
                    skip_submissions=skip_submissions,
                )
                for row in rows
            ]
            for index, future in enumerate(concurrent.futures.as_completed(futures), start=1):
                records.append(future.result())
                if index == len(futures) or index % 250 == 0:
                    print(f"Enriched {index}/{len(futures)} tickers...")

    payload = build_payload(records)
    json_path, js_path = write_outputs(payload, output_dir)
    print(
        "Wrote "
        f"{payload['stats']['totalTickers']} tickers across "
        f"{payload['stats']['totalSectors']} sectors and "
        f"{payload['stats']['totalIndustries']} industries."
    )
    print(f"JSON output: {json_path}")
    print(f"JS output:   {js_path}")
    return payload


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    build_market_universe(
        output_dir=Path(args.output_dir),
        cache_dir=Path(args.cache_dir),
        user_agent=args.user_agent,
        cache_hours=args.cache_hours,
        timeout=args.timeout,
        requests_per_second=args.requests_per_second,
        max_workers=args.max_workers,
        limit=args.limit,
        skip_submissions=args.skip_submissions,
        force_refresh=args.force_refresh,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
