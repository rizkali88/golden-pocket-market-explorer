const FMP_BASE_URL = "https://financialmodelingprep.com/stable";
const ALLOWED_INTERVALS = new Set(["1min", "15min", "4hour", "1day"]);
const PAPER_BOT_CLOSE_PREFIX = "paper-bot-close:";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-paper-bot-token",
  "Cache-Control": "no-store",
};

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function cleanSymbol(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9.-]/g, "");
}

function cleanDate(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function cleanTradeId(value) {
  return String(value || "")
    .trim()
    .replace(/[^A-Za-z0-9._:-]/g, "")
    .slice(0, 120);
}

function numberOrNull(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function roundMoney(value, decimals = 4) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return 0;
  }
  const factor = 10 ** decimals;
  return Math.round(numericValue * factor) / factor;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isAuthorized(request, env) {
  const requiredToken = String(env.PAPER_BOT_SYNC_TOKEN || "").trim();
  if (!requiredToken) {
    return true;
  }
  return request.headers.get("x-paper-bot-token") === requiredToken;
}

function getManualCloseStore(env) {
  return env.PAPER_BOT_SYNC || null;
}

function defaultPaperBotState() {
  return {
    mode: "max_autonomous_cloud",
    manager: "Max",
    startingCash: 10000,
    cash: 10000,
    realizedPnl: 0,
    positions: {},
    trades: [],
    equityCurve: [],
    lastEvaluations: {},
    autoEnabled: true,
  };
}

function normalizePaperBotState(rawState) {
  if (!rawState || typeof rawState !== "object" || Array.isArray(rawState)) {
    return defaultPaperBotState();
  }
  const defaults = defaultPaperBotState();
  return {
    ...defaults,
    ...rawState,
    cash: numberOrNull(rawState.cash) ?? defaults.cash,
    realizedPnl: numberOrNull(rawState.realizedPnl) ?? 0,
    positions:
      rawState.positions && typeof rawState.positions === "object" && !Array.isArray(rawState.positions)
        ? rawState.positions
        : {},
    trades: Array.isArray(rawState.trades) ? rawState.trades.slice(0, 250) : [],
    equityCurve: Array.isArray(rawState.equityCurve) ? rawState.equityCurve.slice(0, 1000) : [],
    lastEvaluations:
      rawState.lastEvaluations && typeof rawState.lastEvaluations === "object" && !Array.isArray(rawState.lastEvaluations)
        ? rawState.lastEvaluations
        : {},
    autoEnabled: rawState.autoEnabled !== false,
  };
}

function parsePublishedPaperBotState(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) {
    return defaultPaperBotState();
  }
  try {
    return normalizePaperBotState(JSON.parse(trimmed));
  } catch (_error) {
    // Fall through and try the JS wrapper format.
  }
  const match = trimmed.match(/window\.GOLDEN_POCKET_MAX_BOT\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
  if (!match) {
    throw new Error("Could not parse published Max bot state.");
  }
  return normalizePaperBotState(JSON.parse(match[1]));
}

async function loadPublishedPaperBotState(env) {
  const stateUrl = String(env.PAPER_BOT_STATE_URL || "").trim();
  if (!stateUrl) {
    return defaultPaperBotState();
  }
  const response = await fetch(stateUrl, {
    headers: { Accept: "application/json, text/javascript, application/javascript, text/plain" },
  });
  if (!response.ok) {
    throw new Error(`State fetch failed with HTTP ${response.status}.`);
  }
  return parsePublishedPaperBotState(await response.text());
}

function normalizeManualCloseTrade(payload) {
  const rawTrade =
    payload && typeof payload === "object" && payload.trade && typeof payload.trade === "object"
      ? payload.trade
      : payload;
  const ticker = cleanSymbol(rawTrade?.ticker);
  if (!ticker) {
    return null;
  }
  const exitPrice = numberOrNull(rawTrade?.exitPrice) ?? numberOrNull(rawTrade?.price) ?? 0;
  const entryPrice = numberOrNull(rawTrade?.entryPrice) ?? exitPrice;
  const shares = numberOrNull(rawTrade?.shares) ?? 0;
  const value = numberOrNull(rawTrade?.value) ?? shares * exitPrice;
  const realizedPnl =
    numberOrNull(rawTrade?.realizedPnl) ??
    numberOrNull(rawTrade?.pnl) ??
    (exitPrice - entryPrice) * shares;
  const id = cleanTradeId(rawTrade?.id) || `${Date.now()}-${ticker}`;
  const timeValue = rawTrade?.time || payload?.submittedAt || new Date().toISOString();
  const normalizedTime = new Date(timeValue);
  return {
    id,
    time: Number.isNaN(normalizedTime.getTime()) ? new Date().toISOString() : normalizedTime.toISOString(),
    type: "SELL",
    ticker,
    shares: roundMoney(shares),
    entryPrice: roundMoney(entryPrice),
    exitPrice: roundMoney(exitPrice),
    price: roundMoney(exitPrice),
    value: roundMoney(value),
    realizedPnl: roundMoney(realizedPnl),
    pnl: roundMoney(realizedPnl),
    manualOverride: true,
    openedAt: rawTrade?.openedAt ? String(rawTrade.openedAt) : "",
    reason: String(rawTrade?.reason || "Manual override: user closed this paper trade at the current mark."),
  };
}

function applyManualClosesToState(state, manualCloses) {
  if (!Array.isArray(manualCloses) || !manualCloses.length) {
    return state;
  }
  const nextState = clone(state);
  nextState.positions =
    nextState.positions && typeof nextState.positions === "object" && !Array.isArray(nextState.positions)
      ? nextState.positions
      : {};
  const trades = Array.isArray(nextState.trades) ? [...nextState.trades] : [];
  const tradeIds = new Set(trades.map((trade) => String(trade?.id || "")));

  manualCloses.forEach((closeTrade) => {
    const ticker = cleanSymbol(closeTrade?.ticker);
    if (!ticker) {
      return;
    }
    const position = nextState.positions[ticker];
    const openedAtMatches =
      !closeTrade?.openedAt || !position?.openedAt || String(closeTrade.openedAt) === String(position.openedAt);
    if (position && openedAtMatches) {
      delete nextState.positions[ticker];
      nextState.cash = roundMoney((numberOrNull(nextState.cash) ?? 0) + (numberOrNull(closeTrade.value) ?? 0));
      nextState.realizedPnl = roundMoney(
        (numberOrNull(nextState.realizedPnl) ?? 0) +
          (numberOrNull(closeTrade.realizedPnl) ?? numberOrNull(closeTrade.pnl) ?? 0),
      );
    }
    if (closeTrade?.id && !tradeIds.has(String(closeTrade.id))) {
      trades.unshift(closeTrade);
      tradeIds.add(String(closeTrade.id));
    }
  });

  nextState.trades = trades
    .sort((left, right) => new Date(right?.time || 0).getTime() - new Date(left?.time || 0).getTime())
    .slice(0, 250);
  return nextState;
}

async function fetchFmp(path, params, env) {
  if (!env.FMP_API_KEY) {
    return jsonResponse({ error: "Missing FMP_API_KEY secret on the worker." }, 500);
  }
  const url = new URL(`${FMP_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  url.searchParams.set("apikey", env.FMP_API_KEY);

  const upstream = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": upstream.headers.get("Content-Type") || "application/json; charset=utf-8",
    },
  });
}

async function listManualCloseTrades(env) {
  const store = getManualCloseStore(env);
  if (!store) {
    return [];
  }
  const listing = await store.list({ prefix: PAPER_BOT_CLOSE_PREFIX });
  const trades = await Promise.all(
    listing.keys.map(async ({ name }) => {
      const payload = await store.get(name, "json");
      return normalizeManualCloseTrade(payload);
    }),
  );
  return trades
    .filter(Boolean)
    .sort((left, right) => new Date(left.time).getTime() - new Date(right.time).getTime());
}

async function handlePaperBotState(_request, env) {
  const baseState = await loadPublishedPaperBotState(env);
  const manualCloses = await listManualCloseTrades(env);
  return jsonResponse(applyManualClosesToState(baseState, manualCloses));
}

async function handlePaperBotClose(request, env) {
  const store = getManualCloseStore(env);
  if (!store) {
    return jsonResponse({ error: "PAPER_BOT_SYNC KV binding is not configured." }, 503);
  }
  const payload = await request.json().catch(() => null);
  const trade = normalizeManualCloseTrade(payload);
  if (!trade) {
    return jsonResponse({ error: "Invalid paper-bot close payload." }, 400);
  }
  await store.put(`${PAPER_BOT_CLOSE_PREFIX}${trade.id}`, JSON.stringify(trade));
  return jsonResponse({ ok: true, trade });
}

async function handlePaperBotRequests(_request, env) {
  return jsonResponse({ manualCloses: await listManualCloseTrades(env) });
}

async function handlePaperBotAck(request, env) {
  const store = getManualCloseStore(env);
  if (!store) {
    return jsonResponse({ error: "PAPER_BOT_SYNC KV binding is not configured." }, 503);
  }
  const payload = await request.json().catch(() => null);
  const ids = Array.isArray(payload?.ids)
    ? payload.ids.map((item) => cleanTradeId(item)).filter(Boolean)
    : [];
  if (!ids.length) {
    return jsonResponse({ error: "Provide at least one manual close id to acknowledge." }, 400);
  }
  await Promise.all(ids.map((id) => store.delete(`${PAPER_BOT_CLOSE_PREFIX}${id}`)));
  return jsonResponse({ ok: true, cleared: ids });
}

async function handlePaperBotHealth(_request, env) {
  let stateReachable = false;
  let stateError = "";
  try {
    const state = await loadPublishedPaperBotState(env);
    stateReachable = Boolean(state);
  } catch (error) {
    stateError = String(error?.message || "State fetch failed.");
  }
  return jsonResponse({
    ok: Boolean(getManualCloseStore(env)) && stateReachable,
    kvConfigured: Boolean(getManualCloseStore(env)),
    stateUrlConfigured: Boolean(String(env.PAPER_BOT_STATE_URL || "").trim()),
    stateReachable,
    stateError,
    writeTokenRequired: Boolean(String(env.PAPER_BOT_SYNC_TOKEN || "").trim()),
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "");

    if (pathname.endsWith("/paper-bot/health")) {
      if (request.method !== "GET") {
        return jsonResponse({ error: "Method not allowed." }, 405);
      }
      return handlePaperBotHealth(request, env);
    }

    if (pathname.endsWith("/paper-bot/state")) {
      if (request.method !== "GET") {
        return jsonResponse({ error: "Method not allowed." }, 405);
      }
      return handlePaperBotState(request, env);
    }

    if (pathname.endsWith("/paper-bot/close")) {
      if (request.method !== "POST") {
        return jsonResponse({ error: "Method not allowed." }, 405);
      }
      if (!isAuthorized(request, env)) {
        return jsonResponse({ error: "Unauthorized." }, 401);
      }
      return handlePaperBotClose(request, env);
    }

    if (pathname.endsWith("/paper-bot/requests")) {
      if (request.method !== "GET") {
        return jsonResponse({ error: "Method not allowed." }, 405);
      }
      if (!isAuthorized(request, env)) {
        return jsonResponse({ error: "Unauthorized." }, 401);
      }
      return handlePaperBotRequests(request, env);
    }

    if (pathname.endsWith("/paper-bot/ack")) {
      if (request.method !== "POST") {
        return jsonResponse({ error: "Method not allowed." }, 405);
      }
      if (!isAuthorized(request, env)) {
        return jsonResponse({ error: "Unauthorized." }, 401);
      }
      return handlePaperBotAck(request, env);
    }

    if (request.method !== "GET") {
      return jsonResponse({ error: "Method not allowed." }, 405);
    }

    const symbol = cleanSymbol(url.searchParams.get("symbol"));
    if (!symbol) {
      return jsonResponse({ error: "Missing symbol." }, 400);
    }

    if (pathname.endsWith("/quote")) {
      return fetchFmp("/quote-short", { symbol }, env);
    }

    if (pathname.endsWith("/history")) {
      const interval = String(url.searchParams.get("interval") || "");
      if (!ALLOWED_INTERVALS.has(interval)) {
        return jsonResponse({ error: "Unsupported interval." }, 400);
      }
      if (interval === "1day") {
        return fetchFmp(
          "/historical-price-eod/full",
          {
            symbol,
            from: cleanDate(url.searchParams.get("from")),
            to: cleanDate(url.searchParams.get("to")),
          },
          env,
        );
      }
      return fetchFmp(
        `/historical-chart/${interval}`,
        {
          symbol,
          from: cleanDate(url.searchParams.get("from")),
          to: cleanDate(url.searchParams.get("to")),
        },
        env,
      );
    }

    return jsonResponse({ error: "Use /quote, /history, or /paper-bot/*." }, 404);
  },
};
