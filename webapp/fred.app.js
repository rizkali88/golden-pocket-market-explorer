const fredStack = [
  {
    title: "Regime Classifier",
    signal: "Growth vs value vs event tape",
    detail: "Splits every ticker by trend quality, factor exposure, sector breadth, rates sensitivity, and catalyst timing.",
  },
  {
    title: "Options Chain Lab",
    signal: "Liquidity, skew, term structure",
    detail: "Scores spreads, open interest, volume, implied volatility, delta, gamma, vega, theta, and contract availability.",
  },
  {
    title: "Earnings Radar",
    signal: "Event date, implied move, surprise trend",
    detail: "Frames pre-earnings volatility, post-earnings drift, revision quality, and whether IV crush is friend or enemy.",
  },
  {
    title: "Strike Engine",
    signal: "Delta, breakeven, expected move",
    detail: "Chooses strikes by probability, payout asymmetry, moneyness, skew, target path, and stop distance.",
  },
  {
    title: "Maturity Engine",
    signal: "0DTE, weekly, 7-21D, event cycle",
    detail: "Matches expiry to catalyst half-life while avoiding unnecessary theta bleed and stale optionality.",
  },
  {
    title: "Exit Governor",
    signal: "Profit target, invalidation, time stop",
    detail: "Forces every trade to define max loss, partial take-profit, IV-crush response, and closing trigger before entry.",
  },
];

const fredPlaybooks = [
  {
    name: "Growth acceleration",
    setup: "Momentum, revenue acceleration, strong relative strength, expanding multiples.",
    structures: "Call debit spreads, tactical calls, diagonals after pullbacks.",
    expiry: "Prefer weekly to 21D when catalyst is near; avoid paying for duration Fred will not use.",
  },
  {
    name: "Value re-rating",
    setup: "Undervalued cash-flow story, improving earnings quality, sector rotation, lower IV.",
    structures: "Put credit spreads, call spreads, risk reversals only when downside is defined.",
    expiry: "Give re-rating more time than pure momentum, but keep a hard catalyst clock.",
  },
  {
    name: "Earnings volatility",
    setup: "Implied move mispriced versus historical surprise, guide behavior, and peer reaction.",
    structures: "Straddles/strangles when move is underpriced; iron flies/condors when IV is rich and range is defensible.",
    expiry: "Use the first expiry after earnings unless post-event drift is the actual thesis.",
  },
  {
    name: "Post-earnings drift",
    setup: "Clean beat/raise, estimate revisions, volume confirmation, and no immediate IV overhang.",
    structures: "Directional debit spreads or short-dated calls/puts after the first reaction validates.",
    expiry: "Short weekly window, usually after spread normalizes and direction confirms.",
  },
  {
    name: "Volatility dislocation",
    setup: "Skew or term structure out of line with realized volatility and macro/event calendar.",
    structures: "Calendars, diagonals, butterflies, or defined-risk premium sales.",
    expiry: "Match short leg to dislocation decay and long leg to thesis survival window.",
  },
];

const fredWork = [
  {
    label: "Data adapter",
    status: "Next",
    detail: "Connect options-chain provider for expirations, strikes, bid/ask, Greeks, IV, open interest, and volume.",
  },
  {
    label: "Earnings model",
    status: "Ready to wire",
    detail: "Map earnings calendar, reported time, implied move, prior surprise, and post-earnings drift history.",
  },
  {
    label: "Ticket template",
    status: "Drafted",
    detail: "Every idea will expose thesis, structure, max loss, target, stop, time stop, and Greek exposure.",
  },
  {
    label: "Risk review",
    status: "Mandatory",
    detail: "Fred can propose aggressive trades, but no hidden naked exposure or missing exit logic.",
  },
];

const fredJournal = [
  {
    time: "T-0",
    title: "Fred joins the team",
    body: "Options desk initialized with growth/value split, earnings-event playbooks, strike/maturity engine, and source library.",
  },
  {
    time: "Next build",
    title: "Live chain scoring",
    body: "Add provider-backed option chain data and calculate contract-level liquidity, Greeks, IV rank, and expected move.",
  },
  {
    time: "After data",
    title: "Trade ticket ledger",
    body: "Persist Fred's candidates, approvals, exits, and post-trade reviews so every decision is inspectable.",
  },
];

const fredResources = [
  {
    title: "OCC Options Disclosure Document",
    source: "OCC",
    type: "Risk foundation",
    url: "https://www.theocc.com/getmedia/a151a9ae-d784-4a15-bdeb-23a029f50b70/riskstoc.pdf",
    use: "Canonical characteristics and risks of standardized options, including exercise, assignment, margin, and principal risks.",
    tags: ["Risk", "Required"],
  },
  {
    title: "Volatility and the Greeks",
    source: "Options Industry Council",
    type: "Greeks",
    url: "https://www.optionseducation.org/advancedconcepts/volatility-the-greeks",
    use: "Reference for volatility, theoretical value, delta, gamma, theta, vega, and how Greeks map to option price behavior.",
    tags: ["Greeks", "Volatility"],
  },
  {
    title: "Cboe Options Institute",
    source: "Cboe",
    type: "Education",
    url: "https://www.cboe.com/optionsinstitute",
    use: "Exchange-backed learning portal, webinars, strategy education, and tools for testing option theses.",
    tags: ["Education", "Strategy"],
  },
  {
    title: "Cboe 0DTE Resources",
    source: "Cboe",
    type: "Short duration",
    url: "https://www.cboe.com/tradable-products/0dte/",
    use: "Framework for same-day option behavior, flexibility, cost, and risk in very short-duration trades.",
    tags: ["0DTE", "Short Duration"],
  },
  {
    title: "Cboe Options Margin Manual",
    source: "Cboe",
    type: "Margin",
    url: "https://www.cboe.com/markets/us/options/margin",
    use: "Margin requirement reference for option positions and spread examples before Fred sizes risk.",
    tags: ["Risk", "Margin"],
  },
  {
    title: "FINRA Options Overview",
    source: "FINRA",
    type: "Investor protection",
    url: "https://www.finra.org/investors/investing/investment-products/options",
    use: "Regulatory overview of option approval levels, risks, and basic option position types.",
    tags: ["Risk", "Regulatory"],
  },
  {
    title: "SEC EDGAR Search",
    source: "SEC",
    type: "Earnings research",
    url: "https://www.sec.gov/search-filings",
    use: "Primary source for filings, 10-Q, 10-K, 8-K, and company disclosures feeding earnings and trend analysis.",
    tags: ["Earnings", "Filings"],
  },
  {
    title: "Options and Earnings",
    source: "Fidelity",
    type: "Earnings playbook",
    url: "https://www.fidelity.com/viewpoints/active-investor/options-and-earnings",
    use: "Practical earnings-event reference emphasizing implied volatility, Greeks, and volatility crush around reports.",
    tags: ["Earnings", "Volatility"],
  },
  {
    title: "Option Volatility and Pricing",
    source: "Sheldon Natenberg",
    type: "Core text",
    url: "https://www.wiley-vch.de/en/areas-interest/finance-economics-law/finance-investments-13fi/trading-13fi4/option-volatility-trading-strategies-978-1-59280-292-0",
    use: "Professional volatility and pricing reference for model assumptions, risk management, and volatility trading thinking.",
    tags: ["Book", "Volatility"],
  },
  {
    title: "Options as a Strategic Investment",
    source: "Lawrence McMillan",
    type: "Core text",
    url: "https://www.optionstrategist.com/products/options-strategic-investment-5th-edition",
    use: "Deep strategy reference for listed option structures, spreads, volatility positions, and position management.",
    tags: ["Book", "Strategy"],
  },
];

function createElement(tag, className, html) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (html != null) {
    element.innerHTML = html;
  }
  return element;
}

function renderStack() {
  const host = document.querySelector("#fred-stack-grid");
  if (!host) return;
  host.replaceChildren(
    ...fredStack.map((item) =>
      createElement(
        "article",
        "fred-stack-card panel",
        `<span>${item.signal}</span><strong>${item.title}</strong><p>${item.detail}</p>`,
      ),
    ),
  );
}

function renderPlaybooks() {
  const host = document.querySelector("#fred-playbook-grid");
  if (!host) return;
  host.replaceChildren(
    ...fredPlaybooks.map((item) =>
      createElement(
        "article",
        "fred-playbook-card",
        `
          <h3>${item.name}</h3>
          <p>${item.setup}</p>
          <dl>
            <div><dt>Structures</dt><dd>${item.structures}</dd></div>
            <div><dt>Expiry</dt><dd>${item.expiry}</dd></div>
          </dl>
        `,
      ),
    ),
  );
}

function renderWork() {
  const count = document.querySelector("#fred-work-count");
  const host = document.querySelector("#fred-work-list");
  if (count) {
    count.textContent = `${fredWork.length} active checks`;
  }
  if (!host) return;
  host.replaceChildren(
    ...fredWork.map((item) =>
      createElement(
        "article",
        "fred-work-item",
        `<span>${item.status}</span><strong>${item.label}</strong><p>${item.detail}</p>`,
      ),
    ),
  );
}

function renderJournal() {
  const host = document.querySelector("#fred-journal");
  if (!host) return;
  host.replaceChildren(
    ...fredJournal.map((item) =>
      createElement(
        "article",
        "fred-journal-item",
        `<span>${item.time}</span><strong>${item.title}</strong><p>${item.body}</p>`,
      ),
    ),
  );
}

function renderResourceFilters() {
  const host = document.querySelector("#fred-resource-filters");
  if (!host) return;
  const tags = ["All", ...new Set(fredResources.flatMap((resource) => resource.tags))];
  host.replaceChildren(
    ...tags.map((tag) => {
      const button = createElement("button", tag === "All" ? "is-active" : "", tag);
      button.type = "button";
      button.dataset.filter = tag;
      button.addEventListener("click", () => {
        host.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
        renderResources(tag);
      });
      return button;
    }),
  );
}

function renderResources(filter = "All") {
  const host = document.querySelector("#fred-resource-grid");
  if (!host) return;
  const visible = filter === "All" ? fredResources : fredResources.filter((resource) => resource.tags.includes(filter));
  host.replaceChildren(
    ...visible.map((resource) =>
      createElement(
        "article",
        "fred-resource-card",
        `
          <div>
            <span>${resource.source}</span>
            <small>${resource.type}</small>
          </div>
          <h3>${resource.title}</h3>
          <p>${resource.use}</p>
          <a href="${resource.url}" target="_blank" rel="noreferrer">Open resource</a>
        `,
      ),
    ),
  );
}

renderStack();
renderPlaybooks();
renderWork();
renderJournal();
renderResourceFilters();
renderResources();
