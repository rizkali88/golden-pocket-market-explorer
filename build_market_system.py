from __future__ import annotations

import argparse
from pathlib import Path

from golden_pocket.market_pipeline import build_market_universe
from golden_pocket.research_pipeline import build_research_profiles


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run the full Golden Pocket market system build: universe + automatic research profiles."
    )
    parser.add_argument("--output-dir", default="webapp/data")
    parser.add_argument("--universe-cache-dir", default="data/sec_cache")
    parser.add_argument("--research-cache-dir", default="data/research_cache")
    parser.add_argument(
        "--user-agent",
        default="GoldenPocketMarketExplorer/1.0 contact rizkali@gmail.com",
    )
    parser.add_argument("--universe-cache-hours", type=float, default=168.0)
    parser.add_argument("--research-cache-hours", type=float, default=24.0)
    parser.add_argument("--timeout", type=float, default=25.0)
    parser.add_argument("--requests-per-second", type=float, default=4.0)
    parser.add_argument("--universe-workers", type=int, default=4)
    parser.add_argument("--research-workers", type=int, default=4)
    parser.add_argument("--research-batch-size", type=int, default=20)
    parser.add_argument("--research-pause-seconds", type=float, default=0.25)
    parser.add_argument("--limit", type=int)
    parser.add_argument("--force-refresh", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    output_dir = Path(args.output_dir)

    build_market_universe(
        output_dir=output_dir,
        cache_dir=Path(args.universe_cache_dir),
        user_agent=args.user_agent,
        cache_hours=args.universe_cache_hours,
        timeout=args.timeout,
        requests_per_second=args.requests_per_second,
        max_workers=args.universe_workers,
        limit=args.limit,
        skip_submissions=False,
        force_refresh=args.force_refresh,
    )

    build_research_profiles(
        universe_path=output_dir / "market_universe.json",
        output_dir=output_dir,
        cache_dir=Path(args.research_cache_dir),
        user_agent=args.user_agent,
        cache_hours=args.research_cache_hours,
        timeout=args.timeout,
        batch_size=args.research_batch_size,
        max_workers=args.research_workers,
        pause_seconds=args.research_pause_seconds,
        limit=args.limit,
        force_refresh=args.force_refresh,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
