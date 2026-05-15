# Options Bot Cloud Build Plan

Date saved: 2026-05-15

## Product Goal

Create a new page called `Options Bot` where Fred runs a paper-money options trading desk in the cloud. Fred should be able to autonomously open, manage, and close paper options trades, similar to Max's spot paper bot, but using options-specific data, risk rules, and trade structures.

This is a paper trading and research system only. No real brokerage order should be placed without a separate broker integration, explicit approval layer, and compliance/risk review.

## Agent Relationship Rules

Fred should talk to John and Max, but John and Max must not be hard blockers for Fred.

John provides the fundamental context:

- Growth vs value classification.
- Earnings quality and estimate trend.
- Valuation risk.
- Fundamental thesis and risks.
- Whether the company deserves bullish, bearish, or event-driven attention.

Max provides the technical context:

- Trend direction.
- Entry zone.
- Stop zone.
- Targets.
- Volatility and price structure.
- Timing quality.

Fred owns the options decision:

- Strategy type.
- Call/put direction.
- Debit/credit spread choice.
- Strike selection.
- Expiration selection.
- Max loss.
- Greeks exposure.
- IV and earnings-event risk.
- Entry, close, roll, or expire decision.

Fred may override John or Max when the playbook justifies it. Growth stocks can look fundamentally expensive to John and volatile to Max, but that may be exactly what makes them attractive for short-duration options.

## Fred Override Modes

Use these status labels in the Options Bot:

- `Aligned Trade`: John, Max, and Fred agree.
- `Fred Override: Growth`: John is cautious on valuation, but Fred sees growth convexity, momentum, strong options liquidity, and defined risk.
- `Fred Override: Volatility`: Max dislikes chart cleanliness, but Fred sees tradable realized/implied volatility or event convexity.
- `Fred Override: Earnings`: John and Max may be neutral, but earnings setup, implied move, and volatility structure justify a defined-risk trade.
- `Blocked`: Only options-specific risk controls block the trade.

## Hard Blockers

Only these should block Fred automatically:

- No options chain data.
- Bid/ask spread too wide.
- Open interest or option volume too low.
- Missing or stale quote.
- Max loss cannot be calculated.
- Undefined-risk structure.
- No exit rule.
- No time stop.
- Earnings risk not scored when earnings are near.
- Contract is expired, adjusted, halted, or otherwise not standard enough for paper execution.
- Market is closed and the action requires a live fill.
- Cloud sync/auth is missing.

John's valuation caution and Max's volatile chart warning are not blockers by themselves.

## Required Data Points

Underlying data:

- Symbol, name, sector, industry.
- Last price, bid, ask, volume.
- Intraday and daily OHLCV.
- Market status and holiday/early-close calendar.
- Support, resistance, entry zone, stop, and targets from Max.
- Fundamental and earnings context from John.

Options chain data:

- Expiration dates.
- Strike list.
- Contract symbol/identifier.
- Contract type: call or put.
- Bid, ask, mid, last.
- Volume and open interest.
- Implied volatility.
- Delta, gamma, theta, vega, rho if available.
- Contract multiplier.
- Exercise style and deliverable/adjustment status when available.
- Timestamp/recency.

Strategy/risk data:

- Strategy type: long call/put, debit spread, credit spread, calendar, straddle, strangle, iron condor, butterfly.
- Legs: action, quantity, option type, strike, expiry, premium.
- Net debit/credit.
- Max loss.
- Max profit where defined.
- Breakeven.
- Risk/reward.
- Probability proxy.
- Expected move.
- IV rank/percentile if available.
- Earnings IV crush risk.
- Exit target, stop, time stop, and invalidation reason.

Paper ledger data:

- Starting cash.
- Cash.
- Buying power.
- Open option positions.
- Realized P/L.
- Unrealized P/L.
- Trade history.
- Fill model and slippage assumptions.
- Close/roll/expire events.
- Cloud request IDs and acknowledgement status.

Visibility/audit data:

- John thesis snapshot at entry.
- Max timing snapshot at entry.
- Fred strategy rationale.
- Fred override mode if used.
- Greeks at entry.
- IV at entry.
- Fill price source and timestamp.
- Exit reason.
- Post-trade review.

## Data Provider Decision

FMP should remain in the stack for:

- Underlying quote and historical stock bars.
- Fundamentals.
- Analyst estimates.
- Earnings/calendar context.
- Market status/context.
- Existing John and Max research inputs.

FMP should not be treated as the sole provider for the Options Bot because the bot needs live options chains, contract quotes, open interest, and Greeks.

Recommended options-data providers:

- Tradier: good practical first choice for options chains and Greeks. Useful for a paper options bot because its options-chain endpoint supports symbol, expiration, and optional Greeks.
- Polygon/Massive: strong market-data option for option-chain snapshots with quotes, trades, Greeks, implied volatility, open interest, break-even price, and underlying price. Good if we need broader snapshot-style scanning.
- ORATS: best fit if Fred needs institutional volatility analytics, historical options surfaces, backtesting, skew, and IV forecast work.

Recommended build path:

1. Keep FMP for John, Max, underlying, earnings, and fundamentals.
2. Add an options provider abstraction called `optionsDataProvider`.
3. Start with Tradier or Polygon/Massive for live option chains.
4. Keep ORATS as a later upgrade for volatility research and backtesting.

## Cloud Architecture

This is feasible and should be built cloud-first, not local-only.

Recommended components:

- `options-bot-worker`: Cloudflare Worker for cloud state, request queue, public read endpoints, and authenticated write endpoints.
- `OPTIONS_BOT_SYNC` KV namespace or D1 database for paper ledger and request queue.
- `OPTIONS_BOT_SYNC_TOKEN` secret for authenticated close/open/ack requests.
- `OPTIONS_DATA_API_KEY` secret for Tradier, Polygon/Massive, or ORATS.
- `FMP_API_KEY` secret reused for underlying and earnings data where appropriate.
- GitHub Actions scheduled workflow for Fred's autonomous evaluation loop, similar to Max paper bot.
- Static GitHub Pages UI for `options-bot.html`.

Cloud endpoints should mirror Max paper sync, but with options-specific objects:

- `GET /options-bot/health`
- `GET /options-bot/state`
- `POST /options-bot/open`
- `POST /options-bot/close`
- `GET /options-bot/requests`
- `POST /options-bot/ack`
- `GET /options-bot/chain?symbol=...&expiration=...`
- `GET /options-bot/expirations?symbol=...`

## Autonomous Trading Loop

Fred's cloud loop should:

1. Load John and Max research snapshots.
2. Screen symbols by Fred playbook: growth, value, earnings, volatility.
3. Fetch option expirations and chains for shortlisted symbols.
4. Score liquidity, spread, IV, Greeks, expected move, and catalyst fit.
5. Decide whether to open, hold, close, roll, or skip.
6. Write decisions and paper trades to cloud state.
7. Process queued user close requests.
8. Acknowledge every request so desktop and mobile stay in sync.

Fred should not open new paper option positions outside regular market hours unless we explicitly model a queued-at-open behavior.

## User Close Trades

The UI must include a close button for open option trades.

Close behavior:

- The browser sends an authenticated cloud close request.
- The request is stored in cloud state.
- Fred's cloud loop processes the request with the latest option quote.
- If market is open and quote is valid, the paper position is closed.
- If market is closed, stale, or unpriced, the request remains pending or is rejected with a visible reason.
- Desktop and mobile read the same cloud state, so closes stay synced.

## Options Bot Page Layout

Recommended page sections:

- Header: `Options Bot`, Fred status, market clock, cloud sync status.
- Left panel: Fred scanner with Growth, Value, Earnings, Volatility tabs.
- Center panel: selected ticker, underlying chart, expected move bands.
- Options chain: calls left, strikes center, puts right, highlighted recommended contracts.
- Right panel: paper trade ticket with strategy, legs, expiry, strikes, max loss, target, stop, time stop, and Paper Execute button.
- Bottom panel: open paper option positions with Close buttons.
- Audit panel: John thesis, Max timing, Fred structure, override mode, risk checks, decision journal.

## Sources Checked

- FMP Quickstart/API docs: https://site.financialmodelingprep.com/developer/docs/quickstart
- FMP Dashboard/Datasets overview: https://site.financialmodelingprep.com/developer/docs/dashboard
- Tradier options chains: https://docs.tradier.com/reference/brokerage-api-markets-get-options-chains
- Polygon/Massive option-chain snapshot: https://polygon.io/docs/rest/options/snapshots/option-chain-snapshot

