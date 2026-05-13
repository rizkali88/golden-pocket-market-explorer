# Golden Pocket Market Scanner

This project is a starter system for finding US stock market sectors that may be attractive for a mid-term holding window of up to 6 months.

The idea is to avoid buying "cheap" sectors that stay cheap. Instead, the model looks for sectors that are:

- undervalued relative to peers
- improving in trend and breadth
- not too extended after the move
- supported by macro conditions
- backed by earnings or thematic catalysts

## What The Model Scores

The engine ranks each sector on five dimensions:

1. `valuation`
   Prefers lower forward P/E and price-to-book, and higher free cash flow yield.
2. `trend`
   Prefers improving relative strength versus the market and stronger breadth.
3. `rebound`
   Looks for a "golden pocket" setup where the sector is still below its 52-week high but already showing improving internals.
4. `macro_catalyst`
   Rewards sectors with favorable macro fit, earnings revisions, and visible catalysts.
5. `risk`
   Rewards cleaner volatility profiles for spot positions held over a 3-6 month horizon.

## Input Data Schema

The CLI expects a CSV with these columns:

- `ticker`
- `name`
- `forward_pe`
- `pb`
- `fcf_yield`
- `rel_1m`
- `rel_3m`
- `rel_6m`
- `pct_above_50dma`
- `pct_above_200dma`
- `distance_from_high`
- `earnings_revision_3m`
- `catalyst_score`
- `macro_fit_score`
- `volatility_90d`

Notes:

- `distance_from_high` is how far the sector is below its 52-week high, in percent.
- `catalyst_score` and `macro_fit_score` are intended to be analyst inputs from `0` to `100`.
- The sample CSV is illustrative only and not live market data.

## How To Run

If Python is on your PATH:

```bash
python analyze.py --input data/sample_sector_snapshot.csv --top 5
```

If you are using the bundled Codex runtime:

```powershell
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' analyze.py --input data/sample_sector_snapshot.csv --top 5
```

To save a markdown report:

```bash
python analyze.py --input data/sample_sector_snapshot.csv --format markdown --output output.md
```

To open the interactive pilot webpage, load [webapp/index.html](/C:/Users/aliri/OneDrive/Documents/New%20project%202/webapp/index.html) in a browser.

## Cloud Webapp Access

The repository includes a GitHub Actions workflow at `.github/workflows/refresh-and-deploy.yml` that can publish `webapp/` to GitHub Pages.

Once GitHub Pages is enabled with `GitHub Actions` as the publishing source, the live dashboard URL will be:

```text
https://rizkali88.github.io/golden-pocket-market-explorer/
```

The workflow:

- deploys the static webapp after pushes to `main`
- can be run manually from the GitHub `Actions` tab
- refreshes generated market data automatically Tuesday-Saturday at `02:30 UTC`, which is `06:30 Asia/Dubai`
- deploys the last committed webapp data even if a third-party data source temporarily blocks a cloud refresh

To enable the site in GitHub:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Set `Build and deployment` -> `Source` to `GitHub Actions`.
4. Open the `Actions` tab and run `Refresh Market Data And Deploy Webapp`.

## Full-Market Ingestion Pipeline

The webapp can now ingest a broad SEC-backed ticker universe instead of relying on a hardcoded list.

Run the generator with Python:

```powershell
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_market_universe.py
```

Useful options:

```powershell
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_market_universe.py --limit 250
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_market_universe.py --cache-hours 24 --requests-per-second 8 --max-workers 8
```

Outputs:

- `webapp/data/market_universe.js`
- `webapp/data/market_universe.json`

How it works:

1. Pull the official SEC ticker universe from `company_tickers_exchange.json`
2. Enrich companies from the SEC `submissions` API using local cache files
3. Derive explorer-friendly `sector -> industry -> ticker` labels from SEC SIC metadata
4. Feed the generated bundle directly into the static webpage, including `file://` usage

Notes:

- This keeps recurring directory refreshes on a `zero-dollar` data stack, but it is not a full real-time price feed.
- The SEC requires a declared user agent and fair-access behavior, with a published max rate of `10 requests/second`.
- The page uses automatic 10-year daily price-history modeling for research-ready tickers and can add FMP fundamentals when `FMP_API_KEY` is available.

## Automatic Research Profiles

The app can now generate automatic `research-ready` profiles for the broader market universe.

Run the research-profile generator:

```powershell
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_research_profiles.py
```

Outputs:

- `webapp/data/research_profiles.js`
- `webapp/data/research_profiles.json`

How it works:

1. Loads the SEC-backed ticker universe
2. Pulls 10-year daily market history in batches
3. Computes automatic trend, rebound, risk, sector-support, and confidence scores
4. Generates `bear`, `base`, and `bull` targets plus a recommended method lens
5. Optionally enriches fundamentals from Financial Modeling Prep when `FMP_API_KEY` is configured
6. Merges the generated profiles into the webpage, while manual pilot profiles still override the automated output where deeper research exists
7. Keeps intraday `1m`, `15m`, and `4h` pulls on-demand for the selected ticker through the live FMP chart feed instead of storing intraday history for the whole universe

Useful options:

```powershell
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_research_profiles.py --limit 250
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_research_profiles.py --batch-size 20 --max-workers 4 --pause-seconds 0.2
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_research_profiles.py --daily-history-range 10y
```

### Financial Modeling Prep Fundamentals

The app can source PE ratio, market cap, annual revenue, net income, EPS actual vs estimate, EPS surprise, and analyst target summary from Financial Modeling Prep bulk APIs.

Local setup:

```powershell
$env:FMP_API_KEY="your_fmp_key_here"
python build_market_system.py
```

GitHub Actions setup:

1. Open the GitHub repo.
2. Go to `Settings` -> `Secrets and variables` -> `Actions`.
3. Create a repository secret named `FMP_API_KEY`.
4. Run `Actions` -> `Refresh Market Data And Deploy Webapp`.

The key is used only during the build workflow. It is not written into `webapp/` and is not exposed to visitors of the static GitHub Pages site.

## Full Automatic Build

To refresh both the SEC universe and the automatic research profiles in one pass:

```powershell
& 'C:\Users\aliri\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_market_system.py
```

Current build notes:

- The generated research layer is `model-based`, not human-authored research and not analyst-consensus data.
- The full-universe build currently makes the majority of common stock and ETF tickers research-ready automatically, while some thin, special-purpose, or unsupported instruments can remain directory-only.

## Suggested Live Data Pipeline

This starter version assumes you will bring your own live data. A sensible production flow is:

1. Use sector ETFs as the first-pass universe.
   A practical benchmark is the 11 Select Sector SPDR ETFs.
2. Pull price and breadth data daily.
   You can source this from your market data provider of choice.
3. Pull fundamentals and revisions weekly.
   Forward valuation, revisions, and free cash flow yield matter more than intraday noise for a 3-6 month horizon.
4. Pull macro regime data weekly.
   Use rates, inflation, credit, labor, and liquidity proxies.
5. Re-rank sectors, then drill down to industries and stocks inside the top sectors.

## Recommended Build Phases

### Phase 1

Rank sectors and identify 2-4 sectors in a valid setup.

### Phase 2

Within the top sectors, rank industries and then select stocks with:

- liquid spot entries
- positive earnings revisions
- improving price structure
- acceptable downside to thesis invalidation

### Phase 3

Add alerts when a sector moves from:

- cheap but weak
- to cheap and improving

That transition is usually more valuable than cheapness alone.

## Repeatable Macro Overlay

Use [docs/regime_playbook.md](/C:/Users/aliri/OneDrive/Documents/New%20project%202/docs/regime_playbook.md) to turn macro conditions into a consistent `macro_fit_score` instead of assigning that field ad hoc.

## Official Data Sources Worth Using

- SEC EDGAR XBRL APIs for company fundamentals:
  [https://www.sec.gov/edgar/sec-api-documentation](https://www.sec.gov/edgar/sec-api-documentation)
- FRED API for macro regime inputs:
  [https://fred.stlouisfed.org/docs/api/fred/](https://fred.stlouisfed.org/docs/api/fred/)
- State Street's Select Sector SPDR suite for the 11-sector benchmark universe:
  [https://www.ssga.com/sectorspdr/](https://www.ssga.com/sectorspdr/)

## Important Caveat

This is a research tool, not investment advice. It helps surface candidates, but every final trade should still pass a thesis check, a catalyst check, and a risk/reward check.
