const FMP_BASE_URL = "https://financialmodelingprep.com/stable";
const ALLOWED_INTERVALS = new Set(["1min", "15min", "4hour"]);
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
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

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (request.method !== "GET") {
      return jsonResponse({ error: "Method not allowed." }, 405);
    }

    const url = new URL(request.url);
    const symbol = cleanSymbol(url.searchParams.get("symbol"));
    if (!symbol) {
      return jsonResponse({ error: "Missing symbol." }, 400);
    }

    if (url.pathname.endsWith("/quote")) {
      return fetchFmp("/quote-short", { symbol }, env);
    }

    if (url.pathname.endsWith("/history")) {
      const interval = String(url.searchParams.get("interval") || "");
      if (!ALLOWED_INTERVALS.has(interval)) {
        return jsonResponse({ error: "Unsupported interval." }, 400);
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

    return jsonResponse({ error: "Use /quote or /history." }, 404);
  },
};
