# Macro Regime Playbook

This file gives you a repeatable way to assign `macro_fit_score` values before you run the ranking model.

## Core Idea

Do not ask, "Which sector is cheap?"

Ask, "Which sector is cheap enough, improving enough, and in the kind of macro backdrop that usually supports a 3-6 month move?"

## Suggested Macro Regimes

### 1. Soft Landing / Disinflation

Traits:

- inflation cooling
- growth slowing but still positive
- yields stable to slightly lower
- credit spreads contained

Often favored:

- Industrials
- Financials
- Health Care
- Communication Services

Usually less favored:

- Energy
- deep defensives unless growth risk rises

### 2. Early Cycle / Re-Acceleration

Traits:

- PMIs bottoming and improving
- earnings revisions stabilizing or turning up
- cyclical breadth expanding

Often favored:

- Industrials
- Materials
- Financials
- Consumer Discretionary

Usually less favored:

- Staples
- Utilities

### 3. Rate-Cut Slowdown

Traits:

- growth weakening
- policy easing expectations rising
- long-duration assets improving

Often favored:

- Real Estate
- Utilities
- Health Care
- Consumer Staples

Usually less favored:

- Financials if net interest margin pressure is strong
- Materials and deep cyclicals

### 4. Inflationary / Commodity-Led

Traits:

- inflation re-accelerating
- commodity complex firm
- real assets outperforming

Often favored:

- Energy
- Materials
- Utilities

Usually less favored:

- Real Estate
- long-duration growth

## Simple Scoring Method

Assign each sector a `macro_fit_score` from `0` to `100`:

- `80-100`: strong regime alignment
- `60-79`: decent alignment
- `40-59`: neutral or mixed
- `20-39`: weak alignment
- `0-19`: regime headwind

## Weekly Workflow

1. Pick the current regime based on your macro dashboard.
2. Assign `macro_fit_score` values to all 11 sectors.
3. Update revisions and catalyst inputs.
4. Run the scanner.
5. Only drill into sectors that rank well on both `trend` and `rebound`.

## What To Avoid

- Buying the cheapest sector when revisions are still falling.
- Buying a strong trend after it is already too close to the 52-week high.
- Ignoring breadth. A sector rally led by only 1 or 2 mega-caps is less reliable.
- Forcing trades in sectors that rank well overall but fail the macro regime check.
