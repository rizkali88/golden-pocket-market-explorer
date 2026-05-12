# Golden Pocket Analyst Brain

## Current Institutional Gaps

The workbench should evolve from a market screener into an investment committee memo. Before a company can earn a high-conviction buy call, the system needs evidence in these modules:

- Investment thesis quality: bull thesis, base thesis, invalidation thesis, and why the next 3-6 months matter.
- Valuation discipline: DCF or FCF yield where applicable, peer multiples, historical multiple range, and sector-specific valuation methods.
- Earnings revision engine: EPS and revenue revisions, guidance changes, surprise history, and next earnings catalyst.
- Peer comparison: industry percentile ranks for growth, margins, valuation, leverage, quality, and momentum.
- Quality score: ROIC, ROE, margins, FCF conversion, revenue durability, balance-sheet strength, and moat indicators.
- Balance sheet risk: net debt/EBITDA, interest coverage, liquidity, maturity wall, and dilution risk.
- Catalyst calendar: earnings, product approvals, macro events, investor days, regulatory events, buybacks, and dividend changes.
- Downside case: support, valuation floor, estimate-cut risk, and what would make the thesis wrong.
- Data confidence: live, missing, stale, estimated, and model-generated labels.
- Decision output: Buy / Watch / Avoid, conviction, target, stop or invalidation, holding period, and position sizing.

## Technical Entry/Exit Framework

Elliott Wave, Fibonacci, and ICT concepts should be treated as execution tools, not standalone buy signals. They can help refine entry, exit, stop, and risk/reward after the fundamental thesis has already passed.

### Elliott Wave Layer

Purpose: identify whether the selected ticker is in impulse, correction, distribution, or exhaustion.

Useful concepts:

- Impulse vs corrective structure.
- Five-wave advance and three-wave correction as a working map, not a guaranteed forecast.
- Wave invalidation levels.
- Alternation between sharp and sideways corrections.
- Channeling to estimate support, resistance, and extension zones.

System use:

- Classify the active swing as `Impulse`, `Correction`, `Possible reversal`, or `Unclear`.
- Mark the latest swing high, swing low, corrective low, and invalidation level.
- Penalize trades where the count is ambiguous or the entry is late in a potential fifth-wave extension.

### Fibonacci Layer

Purpose: define objective retracement and extension zones.

Useful concepts:

- Retracements: 38.2%, 50%, 61.8%, 78.6%.
- Extensions: 127.2%, 161.8%, 200%.
- Confluence: Fibonacci level plus prior support/resistance, moving average, volume shelf, order block, or fair value gap.

System use:

- Preferred entry zone: 38.2%-61.8% retracement of the latest valid bullish impulse.
- Deep value reset: 61.8%-78.6% retracement if fundamentals remain intact.
- First profit zone: retest of prior swing high.
- Stretch target: 127.2%-161.8% extension.
- Stop or invalidation: below the swing low or below the 78.6% retracement, adjusted for ATR.

### ICT / Smart Money Layer

Purpose: refine trade execution around liquidity and imbalance.

Useful concepts:

- Liquidity pools above swing highs and below swing lows.
- Market structure shift or change of character after a liquidity sweep.
- Fair value gaps as imbalance zones.
- Order blocks as institutional reaction zones.
- Optimal trade entry zone, commonly around 61.8%-78.6% retracement, only after structure confirms.
- Time-of-day concepts are more relevant to intraday trading; for equities swing trading, use daily and weekly structure first.

System use:

- Identify if price swept sell-side liquidity and reclaimed structure.
- Identify bullish fair value gaps or order blocks below current price.
- Avoid buying directly into obvious buy-side liquidity unless momentum confirmation is strong.
- Entry should require confluence between thesis, trend, retracement, and structure shift.

## Proposed Entry/Exit Section

Section name: `Trade Plan`.

Goal: convert the selected ticker into a practical spot-trading plan for a 3-6 month horizon.

Core outputs:

- Bias: Bullish, Neutral, Bearish, or Wait.
- Entry zone: price range where risk/reward is acceptable.
- Add zone: second buy zone if price confirms or pulls back.
- Stop / invalidation: price level where the setup is wrong.
- Target 1: conservative exit or trim level.
- Target 2: base-case target.
- Target 3: stretch target.
- Reward/risk: expected upside divided by downside to invalidation.
- Setup quality: A, B, C, or No Trade.
- Why this level: concise explanation of confluence.

Recommended confluence rules:

- Buy setup requires fundamental thesis score above threshold.
- Price must be above the long-term trend filter, or the setup must be explicitly classified as a turnaround.
- Entry zone should align with at least two of: Fibonacci retracement, prior support/resistance, 20/50/200-day moving average, fair value gap, order block, or liquidity sweep reclaim.
- Reward/risk should be at least 2:1 for new buys.
- Stop cannot be arbitrary; it must sit beyond a structure invalidation level.
- If the entry is more than one ATR above the preferred zone, call should switch to `Wait for pullback`.

Data needed:

- Daily OHLCV history, not close-only history.
- Swing high and swing low detection.
- ATR and volatility regime.
- 20/50/200-day moving averages.
- Support and resistance clusters.
- Fibonacci retracement and extension levels.
- Fair value gap detection from daily candles.
- Order block approximation from displacement candles.
- Volume confirmation and relative volume.
- Earnings date and major catalyst calendar.

Analyst principle: technical levels improve execution, not conviction. Conviction should come from thesis, valuation, revisions, quality, catalyst, and risk. Entry/exit levels should improve timing and risk control.

## Trading Decision Output

The final user-facing output should be called `Trading Decision`.

`Trading Decision` is a two-agent investment committee result:

- John: Institutional Analyst.
- Max: Technical Analyst.

### John Role

John is the senior financial analyst working for a top private bank. He owns the fundamental decision and decides whether the company deserves capital.

John evaluates:

- Business quality.
- Valuation.
- Earnings revisions.
- Peer comparison.
- Balance sheet risk.
- Catalysts.
- Downside case.
- Margin of safety.

John output:

- `Buy`
- `Watch`
- `Avoid`

### Max Role

Max is the technical analyst and top-tier trader. He owns timing and execution. He decides whether the chart supports entry now, a delayed entry, or no trade.

Max evaluates:

- Trend regime.
- Elliott Wave structure.
- Fibonacci retracement and extension zones.
- ICT liquidity sweeps.
- Fair value gaps.
- Order blocks.
- Support and resistance.
- ATR-based stop placement.
- Reward/risk.

Max output:

- `Enter`
- `Wait`
- `Avoid`

### Combined Decision Logic

The system should only issue a strong actionable buy plan when John and Max agree.

- John `Buy` + Max `Enter` = actionable buy plan.
- John `Buy` + Max `Wait` = fundamentally attractive, wait for entry zone.
- John `Watch` + Max `Enter` = tactical watch only; position size should be reduced or blocked until fundamentals improve.
- John `Avoid` + any Max output = no trade.
- Any Max `Avoid` = no immediate trade, regardless of John view.

### Trading Decision Fields

The `Trading Decision` card should eventually contain:

- Final call: `Buy`, `Wait`, `Watch`, or `Avoid`.
- John verdict.
- Max verdict.
- Conviction level.
- Entry zone.
- Add zone.
- Stop / invalidation.
- Target 1.
- Target 2.
- Target 3.
- Reward/risk.
- Holding period.
- Position sizing guidance.
- Why we like it.
- Why we might be wrong.
- Data confidence.

## John And Max Decision Stack

The system should separate source data from interpretation. John and Max should consume overlapping ticker context, but each agent should own a different decision stack.

### John Stack: Institutional Analyst

John decides whether the company deserves capital.

Core data:

- Financial statements: income statement, balance sheet, cash flow statement, trailing and annual history.
- Fundamentals: market cap, enterprise value, revenue, EBITDA, net income, EPS, FCF, margins, ROE, ROIC, leverage, liquidity, dividend and buyback data.
- Estimates and revisions: revenue and EPS estimates, forward growth, revisions, surprise history, analyst ratings, price target range.
- SEC validation: 10-K, 10-Q, 8-K, company facts, risk factors, segment disclosures, management discussion.
- News and catalysts: earnings releases, guidance updates, product/regulatory events, M&A, management changes, litigation, macro-sensitive headlines.
- Peer set: direct industry competitors, sector ETF, valuation percentile, growth percentile, margin percentile, quality percentile.
- Macro overlay: rates, inflation, credit spreads, dollar, oil, sector-specific macro variables.
- Ownership and sentiment: institutional ownership, insider buying/selling, short interest, options skew when available.

John analysis:

- Business quality score.
- Valuation score.
- Revision score.
- Catalyst score.
- Balance sheet risk score.
- Peer relative score.
- Downside risk score.
- Margin of safety.

John output:

- Verdict: `Buy`, `Watch`, or `Avoid`.
- Fair value range.
- Bear/base/bull valuation targets.
- Fundamental thesis.
- Key catalysts.
- Key risks and invalidation.
- Confidence level.

### Max Stack: Technical Analyst

Max decides whether the chart supports entry, waiting, or avoiding.

Core data:

- Daily and weekly OHLCV history.
- Adjusted prices for splits and dividends.
- Relative strength vs SPY, sector ETF, and peer basket.
- Volume, relative volume, and liquidity trend.
- ATR and realized volatility.
- Moving averages: 20D, 50D, 100D, 200D.
- Momentum indicators: RSI, MACD, rate of change, breadth confirmation where available.
- Swing highs, swing lows, support, resistance, gap zones.
- Fibonacci retracement and extension levels.
- Elliott Wave impulse/correction state.
- ICT concepts: liquidity sweeps, fair value gaps, order blocks, market structure shift.

Max analysis:

- Trend regime.
- Structure quality.
- Pullback quality.
- Momentum confirmation.
- Liquidity map.
- Volatility-adjusted stop.
- Entry confluence.
- Reward/risk.

Max output:

- Verdict: `Enter`, `Wait`, or `Avoid`.
- Entry zone.
- Add zone.
- Stop / invalidation.
- Target 1, target 2, target 3.
- Reward/risk.
- Chart thesis.
- What would invalidate the setup.

## Prod And Non-Prod Data Architecture

The project needs two spaces once the data schema starts changing:

- `prod`: stable data powering the original page.
- `non-prod`: experimental data powering the workbench page.

Recommended layout:

- `webapp/index.html`: stable production report.
- `webapp/workbench.html`: experimental report.
- `webapp/data/prod/`: stable production bundles once migration is complete.
- `webapp/data/nonprod/`: experimental bundles for John, Max, and Trading Decision.

Initial migration can keep `index.html` on the current root bundles:

- `webapp/data/market_universe.js`
- `webapp/data/research_profiles.js`

The workbench should gradually move to:

- `webapp/data/nonprod/market_universe.js`
- `webapp/data/nonprod/research_profiles.js`
- `webapp/data/nonprod/john_fundamental_profiles.js`
- `webapp/data/nonprod/max_technical_profiles.js`
- `webapp/data/nonprod/trading_decisions.js`

Recommended schema groups:

- `tickerIdentity`: ticker, name, exchange, sector, industry, CIK.
- `marketData`: price, OHLCV, volume, 52-week range, liquidity.
- `fundamentals`: statements, ratios, margins, returns, leverage, estimates.
- `valuation`: DCF, multiples, peer percentile, analyst target range.
- `newsCatalysts`: earnings date, news, SEC events, catalyst tags.
- `technicalStructure`: trend, indicators, swing levels, Fibonacci, Elliott, ICT.
- `johnView`: verdict, scores, fair value, thesis, risks.
- `maxView`: verdict, entry, stop, targets, reward/risk, chart thesis.
- `tradingDecision`: final call, conviction, action, data confidence.

This split lets the workbench break, evolve, and test richer methodology without destabilizing the production page.
