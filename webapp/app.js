const scenarios = [
  {
    id: "base",
    label: "Base Case",
    title: "Strong operators keep leading, but entries matter",
    body:
      "Occupancy and NOI momentum continue, Treasury yields stay range-bound, and the industry digests gains through time rather than a deep drawdown.",
    action: "Starter exposure on pullbacks",
    entry:
      "Favor staged entries after 3-7 day consolidations. Add concentration only after support holds and breadth stays healthy.",
    catalysts: ["Raised FFO guidance", "Occupancy recovery", "Demographic tailwind"],
    bars: [
      { label: "Thesis strength", value: 78 },
      { label: "Valuation comfort", value: 58 },
      { label: "Extension risk", value: 64 },
    ],
    headlineScore: 78,
    headlineRating: "Constructive, Buy On Pullbacks",
    headlineSummary:
      "The setup is real, but most of the edge comes from disciplined entries rather than catching a forgotten value pocket.",
  },
  {
    id: "bull",
    label: "Bull Case",
    title: "Rates soften and the rally broadens through the REIT complex",
    body:
      "The 10-year yield eases, senior housing demand stays hot, and relative strength expands beyond just the strongest operators.",
    action: "Add on breakout follow-through",
    entry:
      "If the next earnings cycle keeps lifting guidance and broad REIT breadth improves, add to winners instead of over-diversifying into weak names.",
    catalysts: ["Lower long yields", "Broadening breadth", "More estimate revisions"],
    bars: [
      { label: "Thesis strength", value: 88 },
      { label: "Valuation comfort", value: 65 },
      { label: "Extension risk", value: 52 },
    ],
    headlineScore: 84,
    headlineRating: "High-Conviction Momentum Pocket",
    headlineSummary:
      "This becomes a cleaner 3-6 month trade if falling yields and continued guidance raises arrive together.",
  },
  {
    id: "bear",
    label: "Bear Case",
    title: "Yields rise again and price stops rewarding the fundamentals",
    body:
      "Operations stay decent, but higher long rates compress multiples and recent leaders fail to hold breakout zones.",
    action: "Stand aside or reduce size",
    entry:
      "If rates are breaking higher and price cannot absorb it, avoid stock-specific aggression and wait for a better reset.",
    catalysts: ["Higher 10Y yield", "Multiple compression", "Failed support retests"],
    bars: [
      { label: "Thesis strength", value: 49 },
      { label: "Valuation comfort", value: 46 },
      { label: "Extension risk", value: 82 },
    ],
    headlineScore: 57,
    headlineRating: "Thesis Slips To Watchlist",
    headlineSummary:
      "The industry still has fundamental support, but the trading edge drops fast if rates and price action move against each other.",
  },
];

const companies = [
  {
    id: "well",
    ticker: "WELL",
    label: "WELL",
    kind: "Quality Leader",
    name: "Welltower Inc.",
    price: 217.14,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 46.47,
    focus: "Senior housing and health care campuses",
    role: "Institutional leadership name",
    thesis:
      "Operating leader with strong senior housing demand already flowing into NOI, FFO, occupancy, and guidance.",
    positioning:
      "Best for quality exposure, but the entry has to be disciplined because the market already recognizes the strength.",
    risks: [
      "Premium valuation leaves less room for disappointment.",
      "The stock is one of the more extended names in the group.",
      "A Treasury spike can compress the multiple even if operations stay healthy.",
    ],
    scores: [
      { label: "Fundamental momentum", value: 93 },
      { label: "Valuation comfort", value: 48 },
      { label: "Extension risk", value: 72 },
      { label: "Institutional leadership", value: 91 },
    ],
    targets: { bear: -11, base: 6, bull: 13 },
  },
  {
    id: "vtr",
    ticker: "VTR",
    label: "VTR",
    kind: "Balanced Stock Pick",
    name: "Ventas",
    price: 87.79,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 35.5,
    focus: "Senior housing, medical office, life science and hospitals",
    role: "Balanced core candidate",
    thesis:
      "Balanced way to express the theme, supported by stronger SHOP trends and a raised guidance path.",
    positioning:
      "More attractive than chasing the strongest winner at any price. Better when you want upside with less perfection already priced in.",
    risks: [
      "Interest-rate sensitivity still matters for the multiple.",
      "The thesis depends on SHOP momentum staying firm through the next report.",
      "If the industry weakens broadly, VTR may still trade with the group.",
    ],
    scores: [
      { label: "Fundamental momentum", value: 82 },
      { label: "Valuation comfort", value: 64 },
      { label: "Extension risk", value: 61 },
      { label: "Tradeability", value: 78 },
    ],
    targets: { bear: -10, base: 8, bull: 17 },
  },
  {
    id: "ahr",
    ticker: "AHR",
    label: "AHR",
    kind: "Momentum Name",
    name: "American Healthcare REIT, Inc.",
    price: 49.68,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 56.9,
    focus: "Managed senior housing, outpatient medical and integrated health care real estate",
    role: "High-beta upside candidate",
    thesis:
      "AHR sits right in the demographic sweet spot and behaves like a momentum-heavy way to play the senior housing story.",
    positioning:
      "More aggressive than VTR or WELL. Best used after consolidation rather than on vertical momentum.",
    risks: [
      "Big one-year move leaves it vulnerable to sharp shakeouts.",
      "Less forgiving if sector breadth weakens.",
      "Momentum can cut both ways in a rate spike.",
    ],
    scores: [
      { label: "Momentum", value: 88 },
      { label: "Valuation comfort", value: 56 },
      { label: "Extension risk", value: 74 },
      { label: "Thematic purity", value: 84 },
    ],
    targets: { bear: -14, base: 8, bull: 18 },
  },
  {
    id: "doc",
    ticker: "DOC",
    label: "DOC",
    kind: "Mixed Setup",
    name: "Healthpeak Properties, Inc.",
    price: 16.51,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 0.68,
    focus: "Life science, medical office and senior housing",
    role: "Broader portfolio watchlist name",
    thesis:
      "Healthpeak has real senior housing upside, but the broader portfolio is more mixed than the clean leaders.",
    positioning:
      "Useful as a confirmation name. If DOC strengthens alongside WELL and VTR, it helps show the theme is broadening.",
    risks: [
      "Portfolio quality is less clean than the senior housing leaders.",
      "Total same-store NOI guidance remains much less exciting than the best names.",
      "Theme participation is less direct than WELL or VTR.",
    ],
    scores: [
      { label: "Fundamental momentum", value: 66 },
      { label: "Valuation comfort", value: 62 },
      { label: "Theme purity", value: 54 },
      { label: "Setup clarity", value: 51 },
    ],
    targets: { bear: -10, base: 7, bull: 15 },
  },
  {
    id: "ctre",
    ticker: "CTRE",
    label: "CTRE",
    kind: "Skilled Nursing Leader",
    name: "CareTrust REIT, Inc.",
    price: 39.34,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 41.63,
    focus: "Skilled nursing and senior housing",
    role: "High-quality operator-led REIT",
    thesis:
      "CareTrust brings steady execution and strong demographic exposure, making it one of the cleaner non-mega-cap names in the group.",
    positioning:
      "A strong secondary core name if you want health care REIT exposure beyond WELL and VTR.",
    risks: [
      "Strong prior performance means less valuation slack.",
      "Skilled nursing sentiment can shift quickly with reimbursement headlines.",
      "Sector weakness can still pressure the stock despite solid operators.",
    ],
    scores: [
      { label: "Operating quality", value: 85 },
      { label: "Valuation comfort", value: 60 },
      { label: "Trend persistence", value: 82 },
      { label: "Defensive demand", value: 79 },
    ],
    targets: { bear: -10, base: 7, bull: 15 },
  },
  {
    id: "ohi",
    ticker: "OHI",
    label: "OHI",
    kind: "Income Leader",
    name: "Omega Healthcare Investors, Inc.",
    price: 46.12,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 35.6,
    focus: "Skilled nursing and assisted living",
    role: "Yield-oriented core name",
    thesis:
      "Omega combines sector leadership with a stronger income profile, making it attractive when you want a steadier expression of the industry theme.",
    positioning:
      "Useful if you want exposure that can still work even when the market rotates toward yield support.",
    risks: [
      "Operator health remains important in this segment.",
      "Less explosive upside than the fastest senior housing names.",
      "Interest-rate moves still affect sentiment.",
    ],
    scores: [
      { label: "Income support", value: 86 },
      { label: "Momentum", value: 80 },
      { label: "Valuation comfort", value: 63 },
      { label: "Balance sheet comfort", value: 78 },
    ],
    targets: { bear: -9, base: 6, bull: 13 },
  },
  {
    id: "sbra",
    ticker: "SBRA",
    label: "SBRA",
    kind: "Balanced Income",
    name: "Sabra Health Care REIT, Inc.",
    price: 20.38,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 25.68,
    focus: "Senior housing, skilled nursing and behavioral health",
    role: "Middle-of-the-pack core watchlist name",
    thesis:
      "Sabra offers a practical mix of sector exposure, income, and less headline sensitivity than the highest-beta names.",
    positioning:
      "Good for a watchlist slot when you want a balanced profile and are willing to wait for cleaner technical confirmation.",
    risks: [
      "Upside may lag the strongest leaders if the rally stays concentrated.",
      "Operator and reimbursement issues can matter.",
      "Needs broad sector participation to outperform meaningfully.",
    ],
    scores: [
      { label: "Balance", value: 78 },
      { label: "Income support", value: 76 },
      { label: "Valuation comfort", value: 66 },
      { label: "Momentum", value: 68 },
    ],
    targets: { bear: -10, base: 8, bull: 16 },
  },
  {
    id: "nhi",
    ticker: "NHI",
    label: "NHI",
    kind: "Defensive Compounder",
    name: "National Health Investors, Inc.",
    price: 73.09,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 0.8,
    focus: "Senior housing and skilled nursing",
    role: "Steadier lower-beta candidate",
    thesis:
      "NHI is more of a deliberate compounder than a momentum chase, which makes it interesting when you want the industry without the hottest price chart.",
    positioning:
      "More appealing on support retests or when the group broadens beyond the obvious winners.",
    risks: [
      "Less momentum than the current leaders.",
      "Could underperform if the market rewards only high-beta growth stories.",
      "Still rate-sensitive in a higher-yield tape.",
    ],
    scores: [
      { label: "Stability", value: 80 },
      { label: "Income support", value: 77 },
      { label: "Momentum", value: 55 },
      { label: "Valuation comfort", value: 69 },
    ],
    targets: { bear: -9, base: 7, bull: 14 },
  },
  {
    id: "ltc",
    ticker: "LTC",
    label: "LTC",
    kind: "Income Watchlist",
    name: "LTC Properties, Inc.",
    price: 38.2,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 17.69,
    focus: "Senior housing and skilled nursing",
    role: "Income-focused secondary name",
    thesis:
      "LTC is a calmer way to access the theme, leaning more toward income and steady exposure than aggressive upside.",
    positioning:
      "Best used when the goal is participation with lower emotional volatility than the high-momentum names.",
    risks: [
      "Lower upside if the sector sprints higher.",
      "Operator quality still matters.",
      "Could lag in an aggressive momentum regime.",
    ],
    scores: [
      { label: "Income support", value: 82 },
      { label: "Stability", value: 74 },
      { label: "Momentum", value: 58 },
      { label: "Valuation comfort", value: 67 },
    ],
    targets: { bear: -8, base: 6, bull: 13 },
  },
  {
    id: "sila",
    ticker: "SILA",
    label: "SILA",
    kind: "Medical Property Play",
    name: "Sila Realty Trust, Inc.",
    price: 30.43,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 24.78,
    focus: "Health care real estate with outpatient and medical property exposure",
    role: "Steady secondary candidate",
    thesis:
      "Sila gives the page a less crowded, more measured health care property exposure that can work if the industry broadens.",
    positioning:
      "Not the first pilot position, but useful if you want broader industry participation beyond senior housing leaders.",
    risks: [
      "Less obvious catalyst profile than WELL or VTR.",
      "May need broader sector rotation to stand out.",
      "Lower liquidity profile than the biggest names.",
    ],
    scores: [
      { label: "Breadth confirmation", value: 70 },
      { label: "Valuation comfort", value: 68 },
      { label: "Momentum", value: 65 },
      { label: "Theme diversification", value: 74 },
    ],
    targets: { bear: -9, base: 7, bull: 15 },
  },
  {
    id: "hr",
    ticker: "HR",
    label: "HR",
    kind: "Medical Office Recovery",
    name: "Healthcare Realty Trust",
    price: 19.92,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 40.63,
    focus: "Medical office buildings",
    role: "Recovery candidate",
    thesis:
      "Healthcare Realty is a useful medical-office angle if the rally broadens beyond pure senior housing momentum.",
    positioning:
      "More attractive after pauses than after strong breakouts, because the recovery story still needs to keep proving itself.",
    risks: [
      "Medical office has a different demand profile than senior housing.",
      "Recovery trades can fade if fundamentals stop improving.",
      "Rate sensitivity still matters.",
    ],
    scores: [
      { label: "Recovery momentum", value: 77 },
      { label: "Valuation comfort", value: 70 },
      { label: "Theme purity", value: 60 },
      { label: "Follow-through risk", value: 63 },
    ],
    targets: { bear: -11, base: 9, bull: 18 },
  },
  {
    id: "are",
    ticker: "ARE",
    label: "ARE",
    kind: "Life Science Reset",
    name: "Alexandria Real Estate Equities, Inc.",
    price: 43.8,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: -36.52,
    focus: "Life science campuses and lab space",
    role: "Turnaround candidate",
    thesis:
      "Alexandria is less tied to the senior housing wave and more of a life-science reset with clear rerating potential if sentiment improves.",
    positioning:
      "Interesting as a contrarian branch of the theme, but it is not the cleanest pilot expression.",
    risks: [
      "Weak one-year relative performance shows the market still needs convincing.",
      "Life science leasing conditions matter more here than aging demographics alone.",
      "The stock can stay cheap longer than expected.",
    ],
    scores: [
      { label: "Rebound potential", value: 81 },
      { label: "Current momentum", value: 42 },
      { label: "Valuation comfort", value: 79 },
      { label: "Thesis clarity", value: 55 },
    ],
    targets: { bear: -15, base: 10, bull: 24 },
  },
  {
    id: "xrn",
    ticker: "XRN",
    label: "XRN",
    kind: "Outpatient Reset",
    name: "Chiron Real Estate Inc.",
    price: 35.36,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: -0.88,
    focus: "Outpatient and essential health care properties",
    role: "Under-the-radar watchlist name",
    thesis:
      "Chiron is not the obvious institutional leader, but that can matter if the sector starts rewarding less crowded names.",
    positioning:
      "More of a monitored watchlist candidate than a first-position pilot.",
    risks: [
      "Less institutional sponsorship than the leaders.",
      "Setup needs broader confirmation.",
      "Execution risk is higher than in the mega-cap names.",
    ],
    scores: [
      { label: "Rebound potential", value: 70 },
      { label: "Current momentum", value: 50 },
      { label: "Valuation comfort", value: 73 },
      { label: "Liquidity comfort", value: 52 },
    ],
    targets: { bear: -11, base: 8, bull: 18 },
  },
  {
    id: "chct",
    ticker: "CHCT",
    label: "CHCT",
    kind: "Small-Cap Medical Office",
    name: "Community Healthcare Trust",
    price: 17.64,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 16.77,
    focus: "Medical office and outpatient facilities",
    role: "Smaller-cap breadth check",
    thesis:
      "Community Healthcare Trust is useful as a breadth signal. If smaller-cap medical-office names start working, the industry rally is getting healthier.",
    positioning:
      "Not the first capital destination, but helpful as a breadth tracker or tactical add after confirmation.",
    risks: [
      "Smaller-cap liquidity can exaggerate moves.",
      "Needs broader participation to outperform.",
      "Catalysts are less obvious than in senior housing leaders.",
    ],
    scores: [
      { label: "Breadth signal", value: 76 },
      { label: "Valuation comfort", value: 70 },
      { label: "Momentum", value: 60 },
      { label: "Liquidity comfort", value: 49 },
    ],
    targets: { bear: -10, base: 7, bull: 15 },
  },
  {
    id: "dhc",
    ticker: "DHC",
    label: "DHC",
    kind: "Speculative Turnaround",
    name: "Diversified Healthcare Trust",
    price: 8.17,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 277.97,
    focus: "Senior housing and medical office",
    role: "High-risk swing candidate",
    thesis:
      "DHC can move hard when the market embraces the turnaround, but this is a tactical and higher-risk expression of the theme.",
    positioning:
      "Only for small size if you intentionally want speculative exposure. It should not be the anchor for this pilot.",
    risks: [
      "Very sharp reversals are possible after a huge one-year run.",
      "Higher execution and balance-sheet risk than the leaders.",
      "Not suitable as a core risk anchor.",
    ],
    scores: [
      { label: "Upside torque", value: 93 },
      { label: "Risk control", value: 28 },
      { label: "Momentum", value: 87 },
      { label: "Core suitability", value: 24 },
    ],
    targets: { bear: -24, base: 12, bull: 28 },
  },
  {
    id: "mpw",
    ticker: "MPW",
    label: "MPW",
    kind: "Distressed Recovery",
    name: "Medical Properties Trust Inc.",
    price: 5.03,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 4.79,
    focus: "Hospital real estate",
    role: "Event-driven recovery trade",
    thesis:
      "MPW is a different branch of the theme, driven more by balance-sheet and tenant stabilization than by demographic tailwinds.",
    positioning:
      "A speculative side-bet only. It is not a clean read on the health care REIT strength discussed in the pilot thesis.",
    risks: [
      "Tenant and financing headlines can dominate price action.",
      "Hospital exposure behaves differently from senior housing.",
      "High downside if the recovery narrative slips.",
    ],
    scores: [
      { label: "Rebound potential", value: 88 },
      { label: "Thesis purity", value: 35 },
      { label: "Risk control", value: 22 },
      { label: "Valuation optionality", value: 79 },
    ],
    targets: { bear: -25, base: 10, bull: 30 },
  },
  {
    id: "strw",
    ticker: "STRW",
    label: "STRW",
    kind: "Small-Cap Income",
    name: "Strawberry Fields REIT",
    price: 12.95,
    date: "Nareit close on May 6, 2026",
    oneYearReturn: 26.37,
    focus: "Skilled nursing and health care facilities",
    role: "Higher-volatility small-cap add",
    thesis:
      "Strawberry Fields can participate when the group is healthy, but it behaves more like a tactical smaller-cap name than an institutional core position.",
    positioning:
      "Useful for watchlist depth or a smaller tactical sleeve, not as the center of the pilot.",
    risks: [
      "Smaller-cap liquidity risk can exaggerate swings.",
      "The name is more reactive to sentiment than the large-cap leaders.",
      "There is less margin for error than in the bigger operators.",
    ],
    scores: [
      { label: "Momentum", value: 71 },
      { label: "Income support", value: 69 },
      { label: "Liquidity comfort", value: 45 },
      { label: "Upside optionality", value: 76 },
    ],
    targets: { bear: -13, base: 9, bull: 20 },
  },
];

const companyTaxonomy = {
  well: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Senior Housing REITs" },
  vtr: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Diversified Health Care REITs" },
  ahr: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Senior Housing REITs" },
  doc: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Diversified Health Care REITs" },
  ctre: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Skilled Nursing REITs" },
  ohi: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Skilled Nursing REITs" },
  sbra: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Skilled Nursing REITs" },
  nhi: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Senior Housing REITs" },
  ltc: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Senior Housing REITs" },
  sila: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Diversified Health Care REITs" },
  hr: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Medical Office REITs" },
  are: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Life Science REITs" },
  xrn: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Medical Office REITs" },
  chct: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Medical Office REITs" },
  dhc: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Diversified Health Care REITs" },
  mpw: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Hospital REITs" },
  strw: { sector: "Health Care", exchangeSector: "Real Estate", industry: "Skilled Nursing REITs" },
};

const seedResearchUniverse = companies.map((company) => ({
  ...company,
  profileMode: "deep_research",
  exchange: "Pending SEC universe load",
  cik: null,
  sic: null,
  sicDescription: null,
  classificationSource: "seed_research",
  classificationConfidence: 100,
  sector: companyTaxonomy[company.id].sector,
  exchangeSector: companyTaxonomy[company.id].exchangeSector,
  industry: companyTaxonomy[company.id].industry,
}));

const MAX_SELECTOR_RESULTS = 500;
const MAX_TABLE_RESULTS = 180;
const fallbackUniverseBundle = {
  generatedAt: null,
  stats: {
    totalTickers: seedResearchUniverse.length,
    totalSectors: new Set(seedResearchUniverse.map((company) => company.sector)).size,
    totalIndustries: new Set(seedResearchUniverse.map((company) => company.industry)).size,
    enrichedTickers: 0,
    missingSicTickers: seedResearchUniverse.length,
  },
  records: [],
};

const externalUniverseBundle =
  window.GOLDEN_POCKET_UNIVERSE && Array.isArray(window.GOLDEN_POCKET_UNIVERSE.records)
    ? window.GOLDEN_POCKET_UNIVERSE
    : fallbackUniverseBundle;

const fallbackResearchBundle = {
  generatedAt: null,
  profiles: [],
  stats: {
    researchReadyTickers: seedResearchUniverse.length,
    directoryOnlyTickers: 0,
  },
};

const externalResearchBundle =
  window.GOLDEN_POCKET_RESEARCH && Array.isArray(window.GOLDEN_POCKET_RESEARCH.profiles)
    ? window.GOLDEN_POCKET_RESEARCH
    : fallbackResearchBundle;

function isResearchReadyProfile(company) {
  return company.profileMode !== "directory_only" && company.price != null && company.targets != null;
}

function createDirectoryProfile(record) {
  const classificationConfidence = Number(record.classificationConfidence ?? 0);
  const sector = record.sector ?? "Other";
  const industry = record.industry ?? record.sicDescription ?? "Unclassified";

  return {
    id: record.id ?? record.ticker.toLowerCase(),
    ticker: record.ticker,
    label: record.ticker,
    kind: "Market Directory Entry",
    name: record.name,
    price: null,
    date: record.generatedAt ?? "No market quote loaded yet",
    oneYearReturn: null,
    focus: record.sicDescription ?? industry,
    role: "Directory-only entry until quote and fundamentals layers are attached",
    thesis:
      `${record.ticker} is now available inside the full-market explorer. The current page can place it into the right sector and industry bucket even before we attach price, target, and thesis models.`,
    positioning:
      "Use this entry as a discovery node first. Once the sector or industry earns attention, we can deepen it with live quotes, valuation inputs, and scenario targets.",
    risks: [
      "Scenario price targets are only enabled for tickers with a deeper research profile.",
      "SEC SIC metadata is a strong free taxonomy source, but some complex companies will still need manual overrides.",
      "This directory layer is not a substitute for a live quote, revisions, or valuation feed.",
    ],
    scores: [
      { label: "Universe availability", value: 100 },
      { label: "Classification confidence", value: Math.max(24, Math.min(classificationConfidence, 100)) },
      { label: "Price-model readiness", value: 18 },
      { label: "Deep research status", value: 12 },
    ],
    targets: null,
    fiftyTwoWeekHigh: null,
    fiftyTwoWeekLow: null,
    rangePositionPct: null,
    offHighPct: null,
    aboveLowPct: null,
    oneMonthReturn: null,
    threeMonthReturn: null,
    sixMonthReturn: null,
    avgDailyDollarVolume: null,
    sector,
    exchangeSector: record.exchangeSector ?? sector,
    industry,
    exchange: record.exchange ?? "Unknown",
    cik: record.cik ?? null,
    sic: record.sic ?? null,
    sicDescription: record.sicDescription ?? null,
    classificationSource: record.classificationSource ?? "sec_directory",
    classificationConfidence,
    profileMode: "directory_only",
  };
}

function createResearchProfile(record) {
  return {
    ...record,
    profileMode: record.profileMode ?? "model_ready",
    targetMeta: record.targetMeta ?? null,
  };
}

function sortUniverse(records) {
  return [...records].sort((left, right) => {
    const sectorSort = left.sector.localeCompare(right.sector);
    if (sectorSort !== 0) {
      return sectorSort;
    }
    const industrySort = left.industry.localeCompare(right.industry);
    if (industrySort !== 0) {
      return industrySort;
    }
    return left.ticker.localeCompare(right.ticker);
  });
}

function buildCompanyUniverse() {
  const mergedByTicker = new Map();

  (externalUniverseBundle.records ?? []).forEach((record) => {
    if (!record?.ticker) {
      return;
    }
    mergedByTicker.set(record.ticker, createDirectoryProfile(record));
  });

  (externalResearchBundle.profiles ?? []).forEach((profile) => {
    if (!profile?.ticker) {
      return;
    }
    const existing = mergedByTicker.get(profile.ticker);
    if (!existing) {
      mergedByTicker.set(profile.ticker, createResearchProfile(profile));
      return;
    }
    mergedByTicker.set(profile.ticker, {
      ...existing,
      ...createResearchProfile(profile),
      exchange: profile.exchange ?? existing.exchange,
      cik: existing.cik,
      sic: existing.sic,
      sicDescription: existing.sicDescription,
      classificationSource: existing.classificationSource,
      classificationConfidence: existing.classificationConfidence,
    });
  });

  seedResearchUniverse.forEach((seedProfile) => {
    const existing = mergedByTicker.get(seedProfile.ticker);
    if (!existing) {
      mergedByTicker.set(seedProfile.ticker, seedProfile);
      return;
    }

    mergedByTicker.set(seedProfile.ticker, {
      ...existing,
      ...seedProfile,
      exchange: existing.exchange,
      cik: existing.cik,
      sic: existing.sic,
      sicDescription: existing.sicDescription,
      classificationSource: existing.classificationSource,
      classificationConfidence: existing.classificationConfidence,
      profileMode: "deep_research",
    });
  });

  return sortUniverse([...mergedByTicker.values()]);
}

const companyUniverse = buildCompanyUniverse();
const companyUniverseById = new Map(companyUniverse.map((company) => [company.id, company]));

const targetMethods = [
  {
    id: "auto",
    label: "Auto Recommend",
    description:
      "Lets the page pick the best-fit lens for the selected ticker based on coverage, profile, and how much valuation discipline matters.",
  },
  {
    id: "consensus",
    label: "Analyst Consensus",
    description:
      "Best when estimate revisions and heavy analyst coverage tend to drive the price more than static asset value math.",
  },
  {
    id: "valuation",
    label: "Valuation Model",
    description:
      "Best when rerating math, balance-sheet quality, asset value, or recovery optionality matter more than analyst targets.",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    description:
      "Blends consensus behavior with valuation discipline. This stays useful when sentiment and rerating logic both matter.",
  },
];

const targetMethodMeta = {
  well: {
    coverage: "High",
    valuationAnchor: "Premium FFO / NAV quality leader",
    recommendedMethod: "hybrid",
    reason:
      "WELL is heavily covered, but the stock also lives and dies by whether investors are willing to keep paying a premium multiple. Hybrid keeps both forces in view.",
    shifts: {
      consensus: { bear: 0, base: 2, bull: 4 },
      valuation: { bear: -2, base: -3, bull: -5 },
    },
  },
  vtr: {
    coverage: "High",
    valuationAnchor: "Core FFO rerating with strong SHOP momentum",
    recommendedMethod: "hybrid",
    reason:
      "VTR has enough coverage for consensus to matter, but the setup still depends on a fair rerating of the real estate and SHOP recovery. Hybrid is the cleanest fit.",
    shifts: {
      consensus: { bear: 0, base: 2, bull: 4 },
      valuation: { bear: -1, base: -1, bull: -2 },
    },
  },
  ahr: {
    coverage: "Medium",
    valuationAnchor: "Fast-moving senior housing growth platform",
    recommendedMethod: "consensus",
    reason:
      "AHR is trading like a sentiment and revisions story. Consensus-style targets suit a momentum name better than a slower valuation anchor.",
    shifts: {
      consensus: { bear: 1, base: 2, bull: 5 },
      valuation: { bear: -2, base: -2, bull: -4 },
    },
  },
  doc: {
    coverage: "High",
    valuationAnchor: "Mixed portfolio with selective rerating",
    recommendedMethod: "valuation",
    reason:
      "DOC is less about hot revisions and more about what the market is willing to pay for a mixed but improving portfolio. Valuation gives the more honest anchor.",
    shifts: {
      consensus: { bear: 0, base: -1, bull: -2 },
      valuation: { bear: -1, base: 2, bull: 4 },
    },
  },
  ctre: {
    coverage: "Medium",
    valuationAnchor: "Operator-led SNF and senior housing quality",
    recommendedMethod: "hybrid",
    reason:
      "CTRE has solid fundamentals and a cleaner operator story, so both coverage sentiment and valuation discipline deserve weight.",
    shifts: {
      consensus: { bear: 0, base: 1, bull: 3 },
      valuation: { bear: -1, base: 0, bull: 1 },
    },
  },
  ohi: {
    coverage: "High",
    valuationAnchor: "Yield and FFO multiple support",
    recommendedMethod: "valuation",
    reason:
      "OHI often behaves like an income and multiple story. Valuation does a better job than consensus alone of capturing how yield support changes the setup.",
    shifts: {
      consensus: { bear: 0, base: 0, bull: 2 },
      valuation: { bear: 0, base: 2, bull: 3 },
    },
  },
  sbra: {
    coverage: "Medium",
    valuationAnchor: "Balanced yield plus portfolio rerating",
    recommendedMethod: "valuation",
    reason:
      "SBRA is more likely to rerate through improving portfolio confidence than through aggressive analyst chasing. Valuation is the better primary lens.",
    shifts: {
      consensus: { bear: 0, base: 0, bull: 2 },
      valuation: { bear: -1, base: 1, bull: 3 },
    },
  },
  nhi: {
    coverage: "Medium",
    valuationAnchor: "Defensive FFO multiple and balance-sheet steadiness",
    recommendedMethod: "valuation",
    reason:
      "NHI is a steadier compounder. Valuation is more useful than street enthusiasm for a name that is unlikely to trade on hot momentum alone.",
    shifts: {
      consensus: { bear: 0, base: -1, bull: 1 },
      valuation: { bear: 0, base: 2, bull: 3 },
    },
  },
  ltc: {
    coverage: "Medium",
    valuationAnchor: "Income-heavy multiple support",
    recommendedMethod: "valuation",
    reason:
      "LTC is more of an income and stability story than a revisions chase, so valuation is the cleaner anchor.",
    shifts: {
      consensus: { bear: 0, base: -1, bull: 1 },
      valuation: { bear: 0, base: 2, bull: 3 },
    },
  },
  sila: {
    coverage: "Low",
    valuationAnchor: "Broader health care property rerating",
    recommendedMethod: "valuation",
    reason:
      "SILA is not the kind of name where consensus should dominate the call. REIT valuation gives a more sensible frame for a less crowded secondary ticker.",
    shifts: {
      consensus: { bear: 0, base: 0, bull: 2 },
      valuation: { bear: -1, base: 2, bull: 4 },
    },
  },
  hr: {
    coverage: "High",
    valuationAnchor: "Medical office recovery multiple",
    recommendedMethod: "valuation",
    reason:
      "HR is still proving its recovery. Valuation keeps the focus on rerating progress rather than assuming analysts will quickly pull targets higher.",
    shifts: {
      consensus: { bear: 1, base: -1, bull: 1 },
      valuation: { bear: -1, base: 2, bull: 4 },
    },
  },
  are: {
    coverage: "High",
    valuationAnchor: "Life science NAV and FFO rerating",
    recommendedMethod: "valuation",
    reason:
      "ARE is a classic valuation candidate. If the thesis works, it is more likely because investors rerate the assets than because consensus suddenly gets euphoric.",
    shifts: {
      consensus: { bear: 2, base: -2, bull: -5 },
      valuation: { bear: 0, base: 4, bull: 8 },
    },
  },
  xrn: {
    coverage: "Low",
    valuationAnchor: "Underfollowed outpatient recovery",
    recommendedMethod: "valuation",
    reason:
      "XRN is underfollowed and less institutionally crowded, so valuation is the stronger compass than consensus.",
    shifts: {
      consensus: { bear: 1, base: -1, bull: 0 },
      valuation: { bear: -1, base: 2, bull: 4 },
    },
  },
  chct: {
    coverage: "Low",
    valuationAnchor: "Small-cap medical office rerating",
    recommendedMethod: "valuation",
    reason:
      "CHCT is a breadth and smaller-cap signal. Valuation better captures how these names move when the market broadens.",
    shifts: {
      consensus: { bear: 0, base: -1, bull: 1 },
      valuation: { bear: 0, base: 2, bull: 4 },
    },
  },
  dhc: {
    coverage: "Low",
    valuationAnchor: "Speculative turnaround with asset optionality",
    recommendedMethod: "hybrid",
    reason:
      "DHC is too volatile for a pure consensus read and too messy for a pure valuation read. Hybrid gives a more balanced frame for a high-risk ticker.",
    shifts: {
      consensus: { bear: 3, base: 1, bull: 4 },
      valuation: { bear: -3, base: 2, bull: 6 },
    },
  },
  mpw: {
    coverage: "High",
    valuationAnchor: "Event-driven hospital asset recovery",
    recommendedMethod: "hybrid",
    reason:
      "MPW needs both event risk and rerating logic in the frame. Hybrid is safer than trusting either consensus or valuation by itself.",
    shifts: {
      consensus: { bear: 3, base: 0, bull: 3 },
      valuation: { bear: -3, base: 2, bull: 7 },
    },
  },
  strw: {
    coverage: "Low",
    valuationAnchor: "Small-cap SNF and facility rerating",
    recommendedMethod: "valuation",
    reason:
      "STRW is more of a niche small-cap REIT where valuation gives a better anchor than sparse coverage would.",
    shifts: {
      consensus: { bear: 0, base: -1, bull: 1 },
      valuation: { bear: -1, base: 2, bull: 4 },
    },
  },
};

const readinessStates = [
  {
    min: 80,
    label: "Pilot Ready",
    body:
      "Most conditions are lining up. A staged entry is reasonable, with diversified exposure first and single-name adds only after price confirms support.",
    badges: ["Use staggered entries", "Respect rate risk", "Prefer support holds"],
  },
  {
    min: 55,
    label: "Constructive, But Wait For Better Timing",
    body:
      "The industry still deserves a place on the board, but the reward improves if you wait for a calmer entry window or another round of confirmation.",
    badges: ["No breakout chasing", "Watch consolidation", "Need cleaner support"],
  },
  {
    min: 0,
    label: "Watchlist Only",
    body:
      "Too many trigger conditions are missing. Keep the theme alive, but do not force a position just because the fundamentals look good on paper.",
    badges: ["Capital preservation first", "Re-check after rates or earnings", "Stay selective"],
  },
];

const scenarioSwitcher = document.querySelector("#scenario-switcher");
const methodSwitcher = document.querySelector("#method-switcher");
const opportunityTableBody = document.querySelector("#opportunity-table-body");
const companyCount = document.querySelector("#company-count");
const triggerForm = document.querySelector("#trigger-form");
const layoutToggle = document.querySelector("#layout-toggle");
const layoutLegend = document.querySelector("#layout-legend");
const themeToggle = document.querySelector("#theme-toggle");

const sectorFilter = document.querySelector("#sector-filter");
const industryFilter = document.querySelector("#industry-filter");
const tickerFilter = document.querySelector("#ticker-filter");
const tickerCombobox = document.querySelector("#ticker-combobox");
const tickerFilterButton = document.querySelector("#ticker-filter-button");
const tickerFilterLabel = document.querySelector("#ticker-filter-label");
const tickerFilterMenu = document.querySelector("#ticker-filter-menu");
const tickerFilterOptions = document.querySelector("#ticker-filter-options");
const tickerFilterSearch = document.querySelector("#ticker-filter-search");
const tickerSearch = document.querySelector("#ticker-search");
const researchReadyOnlyToggle = document.querySelector("#research-ready-only");
const clearFiltersButton = document.querySelector("#clear-filters");
const universeStatus = document.querySelector("#universe-status");
const heroTitle = document.querySelector("#hero-title");
const heroLede = document.querySelector("#hero-lede");
const heroMetaDataset = document.querySelector("#hero-meta-dataset");
const heroMetaSelection = document.querySelector("#hero-meta-selection");
const rosterTitle = document.querySelector("#roster-title");
const rosterNote = document.querySelector("#roster-note");
const layoutSections = [...document.querySelectorAll("[data-layout-id]")].sort(
  (left, right) => Number(left.dataset.layoutId) - Number(right.dataset.layoutId),
);

let currentScenarioId = "base";
let currentCompanyId = "well";
let currentTargetMethodId = "auto";
const currentFilters = {
  sector: "All Sectors",
  industry: "All Industries",
  selectedTickerId: "all",
  tickerOptionSearch: "",
  search: "",
  researchReadyOnly: false,
};
let layoutModeResetTimer = null;

function makeButton(item, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = item.label;
  button.dataset.id = item.id;
  button.addEventListener("click", () => onClick(item.id));
  return button;
}

function getMethodById(methodId) {
  return targetMethods.find((method) => method.id === methodId) ?? targetMethods[0];
}

function getBaseMethodMeta(companyId) {
  const company = companyUniverseById.get(companyId);
  return (
    company?.targetMeta ??
    targetMethodMeta[companyId] ?? {
      coverage: "Directory only",
      valuationAnchor: "Awaiting market-data enrichment",
      recommendedMethod: "hybrid",
      reason:
        "This ticker is available in the SEC market directory, but target methods stay disabled until we attach a live quote and deeper valuation inputs.",
      shifts: {
        consensus: { bear: 0, base: 0, bull: 0 },
        valuation: { bear: 0, base: 0, bull: 0 },
      },
    }
  );
}

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort((left, right) =>
    left.localeCompare(right),
  );
}

function formatMoney(value) {
  if (value == null || Number.isNaN(Number(value))) {
    return "--";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value));
}

function formatPercent(value) {
  if (value == null || Number.isNaN(Number(value))) {
    return "--";
  }
  const numericValue = Number(value);
  return `${numericValue > 0 ? "+" : ""}${numericValue.toFixed(2)}%`;
}

function formatCompactNumber(value, options = {}) {
  if (value == null || Number.isNaN(Number(value))) {
    return "--";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: options.maximumFractionDigits ?? 1,
  });
  if (options.currency) {
    return `${options.currencySymbol ?? "$"}${formatter.format(Number(value))}`;
  }
  return formatter.format(Number(value));
}

function formatMultiple(value) {
  if (value == null || Number.isNaN(Number(value))) {
    return "--";
  }
  return `${Number(value).toFixed(1)}x`;
}

function formatNumber(value, digits = 2) {
  if (value == null || Number.isNaN(Number(value))) {
    return "--";
  }
  return Number(value).toFixed(digits);
}

function formatShortDate(value) {
  if (!value) {
    return "date pending";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function titleCase(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function setTextIfExists(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function replaceChildrenIfExists(selector, ...children) {
  const element = document.querySelector(selector);
  if (element) {
    element.replaceChildren(...children);
  }
}

function addTargetShift(baseTargets, shift) {
  return {
    bear: baseTargets.bear + shift.bear,
    base: baseTargets.base + shift.base,
    bull: baseTargets.bull + shift.bull,
  };
}

function getResolvedTargets(company, requestedMethodId = currentTargetMethodId) {
  const meta = getCompanyMeta(company);
  const effectiveMethodId =
    requestedMethodId === "auto" ? meta.recommendedMethod : requestedMethodId;

  if (!company.targets || company.price == null) {
    return {
      requestedMethodId,
      effectiveMethodId,
      methodTargets: null,
      activeTargets: null,
      meta,
      isResearchReady: false,
    };
  }

  const methodTargets = {
    consensus: addTargetShift(company.targets, meta.shifts.consensus),
    valuation: addTargetShift(company.targets, meta.shifts.valuation),
    hybrid: company.targets,
  };

  return {
    requestedMethodId,
    effectiveMethodId,
    methodTargets,
    activeTargets: methodTargets[effectiveMethodId],
    meta,
    isResearchReady: true,
  };
}

function average(values) {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clampNumber(value, low, high) {
  return Math.max(low, Math.min(high, value));
}

function getScoreByKeywords(company, keywords) {
  const match = (company.scores ?? []).find((score) =>
    keywords.some((keyword) => score.label.toLowerCase().includes(keyword)),
  );
  return match ? Number(match.value) : null;
}

function getTrendSignal(company) {
  return (
    getScoreByKeywords(company, [
      "trend strength",
      "trend persistence",
      "fundamental momentum",
      "momentum",
      "operating quality",
      "institutional leadership",
      "tradeability",
      "income support",
      "balance",
      "setup clarity",
      "thematic purity",
    ]) ??
    Number(company.researchConfidence ?? 58)
  );
}

function getRiskSignal(company) {
  const riskBalance = getScoreByKeywords(company, ["risk balance"]);
  if (riskBalance != null) {
    return riskBalance;
  }
  const extensionRisk = getScoreByKeywords(company, ["extension risk"]);
  if (extensionRisk != null) {
    return 100 - extensionRisk;
  }
  return Number(company.researchConfidence ?? 54);
}

function getConfidenceSignal(company) {
  return (
    Number(company.researchConfidence ?? NaN) ||
    getScoreByKeywords(company, ["confidence"]) ||
    60
  );
}

function coverageToScore(coverage) {
  if (coverage === "High") {
    return 88;
  }
  if (coverage === "Medium") {
    return 64;
  }
  if (coverage === "Low") {
    return 38;
  }
  return 12;
}

function getLiquiditySignal(company) {
  if (company.avgDailyDollarVolume != null) {
    return clampNumber(25 + Math.log10(Math.max(Number(company.avgDailyDollarVolume), 1)) * 8, 0, 100);
  }
  return coverageToScore(getBaseMethodMeta(company.id).coverage);
}

function getSectorSupportSignal(company) {
  return getScoreByKeywords(company, ["sector support", "institutional leadership"]) ?? 52;
}

function getRangePositionPct(company) {
  const directValue = Number(company.rangePositionPct ?? NaN);
  if (!Number.isNaN(directValue)) {
    return directValue;
  }
  const high = Number(company.fiftyTwoWeekHigh ?? NaN);
  const low = Number(company.fiftyTwoWeekLow ?? NaN);
  const price = Number(company.price ?? NaN);
  if (!Number.isNaN(high) && !Number.isNaN(low) && !Number.isNaN(price) && high > low) {
    return clampNumber(((price - low) / (high - low)) * 100, 0, 100);
  }
  return null;
}

function getBelowHighPct(company) {
  const directValue = Number(company.offHighPct ?? NaN);
  if (!Number.isNaN(directValue)) {
    return directValue;
  }
  const rangePosition = getRangePositionPct(company);
  if (rangePosition == null) {
    return null;
  }
  return 100 - rangePosition;
}

function getReboundSignal(company) {
  const directScore =
    getScoreByKeywords(company, ["rebound setup", "valuation comfort", "balance", "setup clarity"]) ??
    null;
  if (directScore != null) {
    return directScore;
  }
  const rangePosition = getRangePositionPct(company);
  if (rangePosition == null) {
    return 52;
  }
  return clampNumber(100 - Math.abs(rangePosition - 42) * 2.1, 0, 100);
}

function getValuationContextSignal(company) {
  const belowHigh = getBelowHighPct(company);
  const rangePosition = getRangePositionPct(company);
  const assetHeavyScore = isAssetHeavyCategory(company) ? 74 : 48;
  const reratingRoom = belowHigh == null ? 52 : clampNumber(40 + belowHigh * 1.5, 0, 100);
  const sweetSpot = rangePosition == null ? 52 : clampNumber(100 - Math.abs(rangePosition - 55) * 1.5, 0, 100);
  return clampNumber(assetHeavyScore * 0.35 + reratingRoom * 0.4 + sweetSpot * 0.25, 0, 100);
}

function isAssetHeavyCategory(company) {
  const haystack = `${company.sector} ${company.industry} ${company.focus ?? ""}`.toLowerCase();
  return [
    "reit",
    "real estate",
    "bank",
    "insurance",
    "utility",
    "energy",
    "pipelines",
    "materials",
    "mining",
    "industrial",
    "shipping",
    "asset",
  ].some((keyword) => haystack.includes(keyword));
}

function buildDynamicMethodReason(company, recommendedMethod, methodScores, coverageLabel) {
  const strongestDriver = Object.entries(methodScores).sort((left, right) => right[1] - left[1])[0]?.[0];
  const rangePosition = getRangePositionPct(company);
  const belowHigh = getBelowHighPct(company);

  if (recommendedMethod === "consensus") {
    return `${company.ticker} is behaving like a liquid estimate-driven name. Coverage scores ${coverageLabel.toLowerCase()}, trend quality is firm, and a Street-style consensus lens currently carries the strongest score.`;
  }

  if (recommendedMethod === "valuation") {
    const rangeComment =
      rangePosition == null
        ? "The setup still looks more rerating-driven than headline-driven."
        : `${company.ticker} is sitting around ${Math.round(rangePosition)}% of its 52-week range${belowHigh == null ? "" : ` and about ${Math.round(belowHigh)}% below the high`}, which makes rerating math more useful than a pure sentiment read.`;
    return `${rangeComment} Valuation wins because the score engine sees more room in recovery or asset repricing than in analyst-led momentum.`;
  }

  return `${company.ticker} scores closely on both consensus and valuation, so the blended hybrid lens is the most stable fit. That usually means trend, rerating room, and confidence are all contributing without one factor dominating the call.`;
}

function getCompanyMeta(companyOrId) {
  const company =
    typeof companyOrId === "string"
      ? companyUniverseById.get(companyOrId)
      : companyOrId;
  const baseMeta = getBaseMethodMeta(company?.id ?? "");
  if (!company) {
    return baseMeta;
  }

  const coverageLabel = company.liquidityBucket ?? baseMeta.coverage ?? "Directory only";
  if (!isResearchReadyProfile(company)) {
    return {
      ...baseMeta,
      coverage: coverageLabel,
      recommendedMethod: baseMeta.recommendedMethod ?? "hybrid",
    };
  }

  const trendScore = getTrendSignal(company);
  const reboundScore = getReboundSignal(company);
  const riskScore = getRiskSignal(company);
  const confidenceScore = getConfidenceSignal(company);
  const sectorScore = getSectorSupportSignal(company);
  const coverageScore = coverageToScore(coverageLabel);
  const valuationContextScore = getValuationContextSignal(company);

  const consensusScore = clampNumber(
    coverageScore * 0.34 +
      trendScore * 0.28 +
      confidenceScore * 0.18 +
      sectorScore * 0.1 +
      Math.max(riskScore, 45) * 0.1,
    0,
    100,
  );
  const valuationScore = clampNumber(
    valuationContextScore * 0.34 +
      reboundScore * 0.22 +
      riskScore * 0.14 +
      confidenceScore * 0.12 +
      (100 - coverageScore) * 0.08 +
      sectorScore * 0.1,
    0,
    100,
  );
  const hybridScore = clampNumber(
    100 - Math.abs(consensusScore - valuationScore) * 0.55 +
      confidenceScore * 0.18 +
      riskScore * 0.12 +
      Math.min(consensusScore, valuationScore) * 0.15,
    0,
    100,
  );

  const methodScores = {
    consensus: Math.round(consensusScore),
    valuation: Math.round(valuationScore),
    hybrid: Math.round(hybridScore),
  };

  const recommendedMethod = Object.entries(methodScores).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "hybrid";

  return {
    ...baseMeta,
    coverage: coverageLabel,
    recommendedMethod,
    reason: buildDynamicMethodReason(company, recommendedMethod, methodScores, coverageLabel),
    valuationAnchor: baseMeta.valuationAnchor ?? "Dynamic model fit",
    methodScores,
    hybridReference: baseMeta.hybridReference ?? company.targets,
  };
}

function getOpportunityProfile(company, requestedMethodId = currentTargetMethodId) {
  const resolved = getResolvedTargets(company, requestedMethodId);
  const confidenceScore = getConfidenceSignal(company);
  const trendScore = getTrendSignal(company);
  const reboundScore = getReboundSignal(company);
  const riskScore = getRiskSignal(company);
  const sectorScore = getSectorSupportSignal(company);
  const liquidityScore = getLiquiditySignal(company);
  const scenarioMove = resolved.activeTargets?.[currentScenarioId] ?? null;
  const scenarioFit =
    scenarioMove == null
      ? 12
      : currentScenarioId === "bear"
        ? clampNumber(100 + scenarioMove * 3.8, 0, 100)
        : clampNumber(50 + scenarioMove * 3.6, 0, 100);

  const opportunityScore = isResearchReadyProfile(company)
    ? Math.round(
        clampNumber(
          trendScore * 0.2 +
            reboundScore * 0.18 +
            riskScore * 0.14 +
            sectorScore * 0.14 +
            liquidityScore * 0.1 +
            confidenceScore * 0.1 +
            scenarioFit * 0.14,
          0,
          100,
        ),
      )
    : Math.round(clampNumber((company.classificationConfidence ?? 30) * 0.22, 0, 35));

  return {
    resolved,
    opportunityScore,
    confidenceScore: Math.round(confidenceScore),
    trendScore: Math.round(trendScore),
    reboundScore: Math.round(reboundScore),
    riskScore: Math.round(riskScore),
    sectorScore: Math.round(sectorScore),
    liquidityScore: Math.round(liquidityScore),
    scenarioMove,
    rangePositionPct: getRangePositionPct(company),
    belowHighPct: getBelowHighPct(company),
  };
}

function summarizeScenarioSignal({
  scenarioId,
  researchReadyCount,
  avgMove,
  breadthScore,
  avgConfidence,
  avgRisk,
  methodLabel,
}) {
  if (scenarioId === "bull") {
    return `Based on ${pluralize(researchReadyCount, "research-ready ticker")}, ${Math.round(breadthScore)}% of names still point higher in the bull path and the average bull move is ${formatPercent(avgMove)} under the ${methodLabel} lens.`;
  }
  if (scenarioId === "bear") {
    return `Based on ${pluralize(researchReadyCount, "research-ready ticker")}, ${Math.round(breadthScore)}% of names keep the bear-case drawdown relatively contained and average risk balance is ${Math.round(avgRisk)}/100 under the ${methodLabel} lens.`;
  }
  return `Based on ${pluralize(researchReadyCount, "research-ready ticker")}, ${Math.round(breadthScore)}% of names still carry a positive base path and average confidence is ${Math.round(avgConfidence)}/100 under the ${methodLabel} lens.`;
}

function rateScenarioSignal(scenarioId, score) {
  if (scenarioId === "bull") {
    if (score >= 80) {
      return "High-Conviction Momentum Pocket";
    }
    if (score >= 68) {
      return "Constructive Risk-On Setup";
    }
    if (score >= 55) {
      return "Selective Bullish Watchlist";
    }
    return "Bull Case Needs More Proof";
  }
  if (scenarioId === "bear") {
    if (score >= 72) {
      return "Defensive But Holding Up";
    }
    if (score >= 60) {
      return "Stress Test, Not Broken";
    }
    if (score >= 45) {
      return "Thesis Slips To Watchlist";
    }
    return "Risk-Off, Stand Aside";
  }
  if (score >= 80) {
    return "Strong Base Case, Buy On Pullbacks";
  }
  if (score >= 68) {
    return "Constructive, Buy On Pullbacks";
  }
  if (score >= 55) {
    return "Watchlist With Selective Entries";
  }
  return "Base Case Losing Edge";
}

function buildDynamicScenarioSignal(scenario, filteredUniverse = getFilteredUniverse()) {
  const researchReadyUniverse = filteredUniverse.filter((company) => isResearchReadyProfile(company));
  if (researchReadyUniverse.length === 0) {
    return {
      headlineScore: scenario.headlineScore,
      headlineRating: scenario.headlineRating,
      headlineSummary: `${scenario.headlineSummary} Dynamic scoring will populate once this view contains research-ready tickers.`,
      bars: scenario.bars,
    };
  }

  const resolvedRows = researchReadyUniverse.map((company) => ({
    company,
    resolved: getResolvedTargets(company),
  }));

  const scenarioMoves = resolvedRows.map(({ resolved }) => resolved.activeTargets?.[scenario.id] ?? 0);
  const avgMove = average(scenarioMoves);
  const avgTrend = average(researchReadyUniverse.map((company) => getTrendSignal(company)));
  const avgRisk = average(researchReadyUniverse.map((company) => getRiskSignal(company)));
  const avgConfidence = average(researchReadyUniverse.map((company) => getConfidenceSignal(company)));

  const breadthScore =
    scenario.id === "bear"
      ? (scenarioMoves.filter((move) => move >= -8).length / researchReadyUniverse.length) * 100
      : (scenarioMoves.filter((move) => move > 0).length / researchReadyUniverse.length) * 100;

  const moveScore =
    scenario.id === "bull"
      ? clampNumber(50 + avgMove * 2.4, 0, 100)
      : scenario.id === "bear"
        ? clampNumber(100 + avgMove * 5.0, 0, 100)
        : clampNumber(50 + avgMove * 3.0, 0, 100);

  const headlineScore = Math.round(
    scenario.id === "bull"
      ? clampNumber(
          moveScore * 0.4 +
            breadthScore * 0.25 +
            avgTrend * 0.15 +
            avgConfidence * 0.1 +
            avgRisk * 0.1,
          0,
          100,
        )
      : scenario.id === "bear"
        ? clampNumber(
            moveScore * 0.35 +
              breadthScore * 0.25 +
              avgRisk * 0.15 +
              avgConfidence * 0.15 +
              avgTrend * 0.1,
            0,
            100,
          )
        : clampNumber(
            moveScore * 0.35 +
              breadthScore * 0.2 +
              avgTrend * 0.2 +
              avgConfidence * 0.15 +
              avgRisk * 0.1,
            0,
            100,
          ),
  );

  const bars =
    scenario.id === "bull"
      ? [
          { label: "Upside breadth", value: Math.round(breadthScore) },
          { label: "Confidence", value: Math.round(avgConfidence) },
          { label: "Risk balance", value: Math.round(avgRisk) },
        ]
      : scenario.id === "bear"
        ? [
            { label: "Defense breadth", value: Math.round(breadthScore) },
            { label: "Confidence", value: Math.round(avgConfidence) },
            { label: "Risk balance", value: Math.round(avgRisk) },
          ]
        : [
            { label: "Positive breadth", value: Math.round(breadthScore) },
            { label: "Trend quality", value: Math.round(avgTrend) },
            { label: "Risk balance", value: Math.round(avgRisk) },
          ];

  return {
    headlineScore,
    headlineRating: rateScenarioSignal(scenario.id, headlineScore),
    headlineSummary: summarizeScenarioSignal({
      scenarioId: scenario.id,
      researchReadyCount: researchReadyUniverse.length,
      avgMove,
      breadthScore,
      avgConfidence,
      avgRisk,
      methodLabel: getMethodById(currentTargetMethodId).label,
    }),
    bars,
  };
}

function matchesBaseFilters(company) {
  const matchesSector =
    currentFilters.sector === "All Sectors" || company.sector === currentFilters.sector;
  const matchesIndustry =
    currentFilters.industry === "All Industries" || company.industry === currentFilters.industry;
  const matchesResearchReady = !currentFilters.researchReadyOnly || isResearchReadyProfile(company);
  return matchesSector && matchesIndustry && matchesResearchReady;
}

function normalizeSelectedTickerFilter() {
  if (currentFilters.selectedTickerId === "all") {
    return;
  }

  const selectedCompany = companyUniverseById.get(currentFilters.selectedTickerId);
  if (!selectedCompany || !matchesBaseFilters(selectedCompany)) {
    currentFilters.selectedTickerId = "all";
  }
}

function getFilteredUniverse() {
  normalizeSelectedTickerFilter();
  const searchTerm = currentFilters.search.trim().toLowerCase();
  const filteredUniverse = companyUniverse.filter((company) => {
    const matchesSelectedTicker =
      currentFilters.selectedTickerId === "all" || company.id === currentFilters.selectedTickerId;
    const matchesSearch = matchesUnifiedSearch(company, searchTerm);
    return matchesBaseFilters(company) && matchesSelectedTicker && matchesSearch;
  });

  if (!searchTerm) {
    return filteredUniverse;
  }

  return filteredUniverse.sort((left, right) => {
    const leftTicker = left.ticker.toLowerCase();
    const rightTicker = right.ticker.toLowerCase();
    const leftName = left.name.toLowerCase();
    const rightName = right.name.toLowerCase();
    const leftScore =
      (leftTicker === searchTerm ? 50 : 0) +
      (leftTicker.startsWith(searchTerm) ? 20 : 0) +
      (leftName.startsWith(searchTerm) ? 10 : 0);
    const rightScore =
      (rightTicker === searchTerm ? 50 : 0) +
      (rightTicker.startsWith(searchTerm) ? 20 : 0) +
      (rightName.startsWith(searchTerm) ? 10 : 0);
    if (leftScore !== rightScore) {
      return rightScore - leftScore;
    }
    return leftTicker.localeCompare(rightTicker);
  });
}

function includesWordStart(value, searchTerm) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/u)
    .some((word) => word.startsWith(searchTerm));
}

function matchesUnifiedSearch(company, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const ticker = company.ticker.toLowerCase();
  const name = company.name.toLowerCase();
  const classificationText = `${company.sector} ${company.industry} ${company.focus ?? ""} ${company.exchange ?? ""}`;

  if (ticker === searchTerm || ticker.startsWith(searchTerm)) {
    return true;
  }
  if (name.includes(searchTerm)) {
    return true;
  }
  if (includesWordStart(classificationText, searchTerm)) {
    return true;
  }
  return searchTerm.length >= 4 && classificationText.toLowerCase().includes(searchTerm);
}

function matchesTickerOptionSearch(company, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const ticker = company.ticker.toLowerCase();
  const name = company.name.toLowerCase();
  return ticker.includes(searchTerm) || name.includes(searchTerm);
}

function getTickerOptionRelevance(company, searchTerm) {
  if (!searchTerm) {
    return 0;
  }

  const ticker = company.ticker.toLowerCase();
  const name = company.name.toLowerCase();
  return (
    (ticker === searchTerm ? 1000 : 0) +
    (ticker.startsWith(searchTerm) ? 700 : 0) +
    (ticker.includes(searchTerm) ? 420 : 0) +
    (name.startsWith(searchTerm) ? 300 : 0) +
    (name.includes(searchTerm) ? 150 : 0)
  );
}

function getSearchRelevance(company, searchTerm) {
  if (!searchTerm) {
    return 0;
  }

  const ticker = company.ticker.toLowerCase();
  const name = company.name.toLowerCase();
  const classificationText = `${company.sector} ${company.industry} ${company.focus ?? ""} ${company.exchange ?? ""}`;

  return (
    (ticker === searchTerm ? 1000 : 0) +
    (ticker.startsWith(searchTerm) ? 650 : 0) +
    (name.startsWith(searchTerm) ? 520 : 0) +
    (name.includes(searchTerm) ? 340 : 0) +
    (includesWordStart(classificationText, searchTerm) ? 180 : 0) +
    (searchTerm.length >= 4 && classificationText.toLowerCase().includes(searchTerm) ? 90 : 0)
  );
}

function setSelectOptions(selectElement, options, selectedValue) {
  selectElement.replaceChildren(
    ...options.map((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      if (value === selectedValue) {
        option.selected = true;
      }
      return option;
    }),
  );
}

function getTickerFilterLabel(companyId = currentFilters.selectedTickerId) {
  if (companyId === "all") {
    return "All companies";
  }
  const company = companyUniverseById.get(companyId);
  return company ? `${company.ticker} - ${company.name}` : "All companies";
}

function setTickerMenuOpen(isOpen) {
  if (!tickerCombobox || !tickerFilterMenu || !tickerFilterButton) {
    return;
  }
  tickerCombobox.classList.toggle("is-open", isOpen);
  tickerFilterMenu.hidden = !isOpen;
  tickerFilterButton.setAttribute("aria-expanded", String(isOpen));
  if (isOpen && tickerFilterSearch) {
    window.requestAnimationFrame(() => tickerFilterSearch.focus());
  }
}

function selectTickerFilter(companyId) {
  currentFilters.selectedTickerId = companyId;
  if (companyId !== "all") {
    currentCompanyId = companyId;
  }
  currentFilters.tickerOptionSearch = "";
  setTickerMenuOpen(false);
  refreshExplorer();
}

function makeTickerOptionButton({ value, label, caption, isActive }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ticker-combobox__option";
  button.role = "option";
  button.dataset.value = value;
  button.setAttribute("aria-selected", String(isActive));
  button.classList.toggle("is-active", isActive);
  const title = document.createElement("strong");
  title.textContent = label;
  button.append(title);
  if (caption) {
    const detail = document.createElement("small");
    detail.textContent = caption;
    button.append(detail);
  }
  button.addEventListener("click", () => selectTickerFilter(value));
  return button;
}

function syncFiltersUI(filteredUniverse = getFilteredUniverse()) {
  const sectorOptions = ["All Sectors", ...uniqueValues(companyUniverse, "sector")];
  if (!sectorOptions.includes(currentFilters.sector)) {
    currentFilters.sector = "All Sectors";
  }
  setSelectOptions(sectorFilter, sectorOptions, currentFilters.sector);

  const scopedBySector =
    currentFilters.sector === "All Sectors"
      ? companyUniverse
      : companyUniverse.filter((company) => company.sector === currentFilters.sector);
  const industryOptions = ["All Industries", ...uniqueValues(scopedBySector, "industry")];
  if (!industryOptions.includes(currentFilters.industry)) {
    currentFilters.industry = "All Industries";
  }
  setSelectOptions(industryFilter, industryOptions, currentFilters.industry);

  normalizeSelectedTickerFilter();
  const tickerOptionSearchTerm = currentFilters.tickerOptionSearch.trim().toLowerCase();
  const rankedTickers = companyUniverse
    .filter((company) => matchesBaseFilters(company))
    .filter((company) => matchesTickerOptionSearch(company, tickerOptionSearchTerm))
    .sort((left, right) => {
      if (tickerOptionSearchTerm) {
        const relevanceDelta =
          getTickerOptionRelevance(right, tickerOptionSearchTerm) -
          getTickerOptionRelevance(left, tickerOptionSearchTerm);
        if (relevanceDelta !== 0) {
          return relevanceDelta;
        }
      }
      return left.ticker.localeCompare(right.ticker);
    })
    .slice(0, MAX_SELECTOR_RESULTS);

  const currentCompany =
    currentFilters.selectedTickerId === "all"
      ? null
      : companyUniverseById.get(currentFilters.selectedTickerId);
  if (
    currentCompany &&
    matchesBaseFilters(currentCompany) &&
    !rankedTickers.some((company) => company.id === currentCompany.id)
  ) {
    rankedTickers.unshift(currentCompany);
    rankedTickers.splice(MAX_SELECTOR_RESULTS);
  }

  const allCompaniesOption = document.createElement("option");
  allCompaniesOption.value = "all";
  allCompaniesOption.textContent = "All companies";
  allCompaniesOption.selected = currentFilters.selectedTickerId === "all";
  tickerFilter.replaceChildren(
    allCompaniesOption,
    ...rankedTickers.map((company) => {
      const option = document.createElement("option");
      option.value = company.id;
      option.textContent = `${company.ticker} - ${company.name}`;
      if (company.id === currentFilters.selectedTickerId) {
        option.selected = true;
      }
      return option;
    }),
  );

  if (tickerFilterLabel) {
    tickerFilterLabel.textContent = getTickerFilterLabel();
  }
  if (tickerFilterOptions) {
    const allOption = makeTickerOptionButton({
      value: "all",
      label: "All companies",
      caption: "Scan every company matching the active filters",
      isActive: currentFilters.selectedTickerId === "all",
    });
    const companyOptions = rankedTickers.map((company) =>
      makeTickerOptionButton({
        value: company.id,
        label: company.ticker,
        caption: company.name,
        isActive: company.id === currentFilters.selectedTickerId,
      }),
    );
    tickerFilterOptions.replaceChildren(allOption, ...companyOptions);
    if (companyOptions.length === 0 && tickerOptionSearchTerm) {
      const empty = document.createElement("div");
      empty.className = "ticker-combobox__empty";
      empty.textContent = "No tickers match this search.";
      tickerFilterOptions.append(empty);
    }
  }

  tickerSearch.value = currentFilters.search;
  if (tickerFilterSearch) {
    tickerFilterSearch.value = currentFilters.tickerOptionSearch;
  }
  researchReadyOnlyToggle.checked = currentFilters.researchReadyOnly;
}

function renderUniverseMeta(filteredUniverse) {
  const totalTickers = companyUniverse.length;
  const researchReadyCount = companyUniverse.filter(
    (company) => isResearchReadyProfile(company),
  ).length;
  const filteredTickers = filteredUniverse.length;
  const filteredDeepResearch = filteredUniverse.filter(
    (company) => isResearchReadyProfile(company),
  ).length;
  const generatedLabel = externalUniverseBundle.generatedAt
    ? new Date(externalUniverseBundle.generatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "seed fallback";

  universeStatus.textContent =
    `${pluralize(filteredTickers, "ticker")} | ${pluralize(filteredDeepResearch, "research-ready profile")} | SEC ${generatedLabel}`;
  if (heroMetaDataset) {
    heroMetaDataset.textContent =
      externalUniverseBundle.generatedAt == null
        ? "Seed fallback active"
        : `SEC directory refreshed ${generatedLabel}`;
  }

}

function renderHero(filteredUniverse) {
  const filteredIndustries = uniqueValues(filteredUniverse, "industry");
  const filteredDirectoryOnly = filteredUniverse.filter(
    (company) => company.profileMode === "directory_only",
  ).length;
  if (currentFilters.industry !== "All Industries") {
    if (heroTitle) {
      heroTitle.textContent = currentFilters.industry;
    }
    rosterTitle.textContent = `${currentFilters.industry} opportunity table`;
  } else if (currentFilters.sector !== "All Sectors") {
    if (heroTitle) {
      heroTitle.textContent = `${currentFilters.sector} Opportunity Report`;
    }
    rosterTitle.textContent = `${currentFilters.sector} opportunity table`;
  } else {
    if (heroTitle) {
      heroTitle.textContent = "SEC Market Universe";
    }
    rosterTitle.textContent = "Scan the filtered ticker universe";
  }

  const filteredCount = filteredUniverse.length;
  const industryCount = filteredIndustries.length;
  if (heroLede) {
    heroLede.textContent =
      `The current report is built from ${pluralize(filteredCount, "ticker")} across ${pluralize(industryCount, "industry")} inside ${currentFilters.sector === "All Sectors" ? "the SEC market directory" : currentFilters.sector}. ${pluralize(filteredDirectoryOnly, "ticker")} still sit in directory mode while the research-ready layer drives the active table and decision card.`;
  }

  if (heroMetaSelection) {
    heroMetaSelection.textContent =
      `Current view: ${currentFilters.sector} -> ${currentFilters.industry}`;
  }

  const visibleCount = Math.min(filteredCount, MAX_TABLE_RESULTS);
  rosterNote.textContent =
    filteredCount > MAX_TABLE_RESULTS
      ? `Showing the top ${visibleCount} of ${filteredCount} matching tickers by setup score. Narrow with sector, industry, or search for a tighter working list.`
      : currentFilters.researchReadyOnly
        ? `Only research-ready tickers with live scenario predictions are showing in this working list.`
      : currentFilters.industry === "All Industries"
        ? `The market directory is loaded. Research-ready names carry active target-method modeling while the broader market stays available for discovery from the same report.`
        : `Current filtered industry: ${currentFilters.industry}.`;
}

function renderScenario(id, options = {}) {
  const scenario = scenarios.find((item) => item.id === id) ?? scenarios[0];
  const dynamicSignal = buildDynamicScenarioSignal(scenario);
  currentScenarioId = scenario.id;
  setTextIfExists("#scenario-title", scenario.title);
  setTextIfExists("#scenario-body", scenario.body);
  setTextIfExists("#scenario-action", scenario.action);
  setTextIfExists("#scenario-entry", scenario.entry);
  setTextIfExists("#headline-score", dynamicSignal.headlineScore);
  setTextIfExists("#headline-rating", dynamicSignal.headlineRating);
  setTextIfExists("#headline-summary", dynamicSignal.headlineSummary);

  const catalystWrap = document.querySelector("#scenario-catalysts");
  if (catalystWrap) {
    catalystWrap.replaceChildren(
      ...scenario.catalysts.map((text) => {
        const chip = document.createElement("span");
        chip.textContent = text;
        return chip;
      }),
    );
  }

  const barsWrap = document.querySelector("#scenario-bars");
  if (barsWrap) {
    barsWrap.replaceChildren(
      ...dynamicSignal.bars.map((bar) => {
        const wrapper = document.createElement("div");
        wrapper.className = "bar";
        wrapper.innerHTML = `
          <div class="bar__row">
            <span>${bar.label}</span>
            <strong>${bar.value}</strong>
          </div>
          <div class="bar__track">
            <div class="bar__fill" style="width:${bar.value}%"></div>
          </div>
        `;
        return wrapper;
      }),
    );
  }

  document.querySelectorAll(".switcher-pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.id === id);
  });

  renderOpportunityTable();
}

function buildTargetCards(company, resolved) {
  const targetWrap = document.querySelector("#company-targets");
  if (!targetWrap) {
    return;
  }
  const order = [
    { key: "bear", label: "Bear" },
    { key: "base", label: "Base" },
    { key: "bull", label: "Bull" },
  ];

  if (!resolved.isResearchReady) {
    targetWrap.replaceChildren(
      ...order.map((item) => {
        const card = document.createElement("article");
        card.className = "target-card";
        if (item.key === currentScenarioId) {
          card.classList.add("is-active");
        }
        card.innerHTML = `
          <span class="target-card__label">${item.label} target</span>
          <strong>Pending</strong>
          <small>Attach live quote and fundamentals inputs to unlock this scenario.</small>
        `;
        return card;
      }),
    );
    return;
  }

  targetWrap.replaceChildren(
    ...order.map((item) => {
      const move = resolved.activeTargets[item.key];
      const target = company.price * (1 + move / 100);
      const card = document.createElement("article");
      card.className = "target-card";
      if (item.key === currentScenarioId) {
        card.classList.add("is-active");
      }
      card.innerHTML = `
        <span class="target-card__label">${item.label} target</span>
        <strong>${formatMoney(target)}</strong>
        <small>${formatPercent(move)} from current price</small>
      `;
      return card;
    }),
  );
}

function buildMethodCompare(company, resolved) {
  const compareWrap = document.querySelector("#method-compare");
  if (!compareWrap) {
    return;
  }

  if (!resolved.isResearchReady) {
    compareWrap.replaceChildren(
      ...["consensus", "valuation", "hybrid"].map((methodId) => {
        const method = getMethodById(methodId);
        const card = document.createElement("article");
        card.className = "compare-card";
        card.innerHTML = `
          <p class="compare-card__eyebrow">${method.label}</p>
          <strong>Pending</strong>
          <small>Research layer required for scenario targets</small>
        `;
        return card;
      }),
    );
    return;
  }

  const scenarioLabel = titleCase(currentScenarioId);

  compareWrap.replaceChildren(
    ...["consensus", "valuation", "hybrid"].map((methodId) => {
      const method = getMethodById(methodId);
      const move = resolved.methodTargets[methodId][currentScenarioId];
      const target = company.price * (1 + move / 100);
      const card = document.createElement("article");
      card.className = "compare-card";
      if (methodId === resolved.effectiveMethodId) {
        card.classList.add("is-active");
      }
      card.innerHTML = `
        <p class="compare-card__eyebrow">${method.label}</p>
        <strong>${formatMoney(target)}</strong>
        <small>${scenarioLabel} scenario - ${formatPercent(move)}</small>
      `;
      return card;
    }),
  );
}

function renderMethodFit(company, resolved) {
  const requestedMethod = getMethodById(resolved.requestedMethodId);
  const effectiveMethod = getMethodById(resolved.effectiveMethodId);

  if (!resolved.isResearchReady) {
    setTextIfExists("#active-method-badge", "Directory only");
    setTextIfExists(
      "#active-method-copy",
      "Target methods are disabled until this ticker has price and valuation inputs.",
    );
    setTextIfExists("#method-fit-title", `Research profile not loaded for ${company.ticker}`);
    setTextIfExists("#method-fit-body", resolved.meta.reason);

    const metaWrap = document.querySelector("#method-fit-meta");
    if (metaWrap) {
      metaWrap.replaceChildren(
        ...[
          `Mode ${isResearchReadyProfile(company) ? (company.profileMode === "deep_research" ? "Deep research" : "Model-ready") : "Directory only"}`,
          `Sector ${company.sector}`,
          `Exchange ${company.exchange}`,
          `Industry ${company.industry}`,
          `SEC source ${company.classificationSource}`,
        ].map((text) => {
          const chip = document.createElement("span");
          chip.textContent = text;
          return chip;
        }),
      );
    }

    document.querySelectorAll(".method-pill").forEach((pill) => {
      pill.classList.toggle("is-active", pill.dataset.id === currentTargetMethodId);
    });
    return;
  }

  setTextIfExists(
    "#active-method-badge",
    resolved.requestedMethodId === "auto"
      ? `Auto -> ${effectiveMethod.label}`
      : `Manual -> ${effectiveMethod.label}`,
  );
  setTextIfExists("#active-method-copy", effectiveMethod.description);

  setTextIfExists(
    "#method-fit-title",
    resolved.requestedMethodId === "auto"
      ? `Auto picks ${effectiveMethod.label} for ${company.ticker}`
      : `${requestedMethod.label} view for ${company.ticker}`,
  );

  setTextIfExists(
    "#method-fit-body",
    resolved.requestedMethodId === "auto"
      ? resolved.meta.reason
      : resolved.effectiveMethodId === resolved.meta.recommendedMethod
        ? `This matches the recommended fit for ${company.ticker}. ${resolved.meta.reason}`
        : `Manual override active. ${resolved.meta.reason}`,
  );

  const metaWrap = document.querySelector("#method-fit-meta");
  if (metaWrap) {
    metaWrap.replaceChildren(
      ...[
        `Coverage ${resolved.meta.coverage}`,
        `Theme ${company.sector}`,
        `Exchange ${company.exchangeSector}`,
        `Industry ${company.industry}`,
        `Recommended ${getMethodById(resolved.meta.recommendedMethod).label}`,
        resolved.meta.methodScores
          ? `Scores C${resolved.meta.methodScores.consensus} / V${resolved.meta.methodScores.valuation} / H${resolved.meta.methodScores.hybrid}`
          : null,
      ].map((text) => {
        if (!text) {
          return null;
        }
        const chip = document.createElement("span");
        chip.textContent = text;
        return chip;
      }).filter(Boolean),
    );
  }

  document.querySelectorAll(".method-pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.id === currentTargetMethodId);
  });
}

function renderTargetMethod(id) {
  currentTargetMethodId = id;
  renderScenario(currentScenarioId, { rerenderCompany: false });
}

function renderEmptyState() {
  setTextIfExists("#company-kind", "No ticker selected");
  setTextIfExists("#company-name", "No matches for the current filters");
  setTextIfExists("#company-price", "--");
  setTextIfExists("#company-date", "Adjust the top filters or clear them");
  setTextIfExists("#company-active-target", "--");
  setTextIfExists(
    "#company-active-target-copy",
    "Targets will repopulate as soon as a matching ticker is available.",
  );
  setTextIfExists(
    "#company-thesis",
    "The explorer is working, but the current sector, industry, and search combination did not return any tickers.",
  );
  setTextIfExists("#company-positioning", "Try broadening the selection back to All Sectors or All Industries.");
  replaceChildrenIfExists("#company-chips");
  replaceChildrenIfExists("#company-fundamentals");
  replaceChildrenIfExists("#company-scoreboard");
  replaceChildrenIfExists("#company-facts");
  replaceChildrenIfExists("#company-risks");
  replaceChildrenIfExists("#company-targets");
  replaceChildrenIfExists("#method-compare");
  setTextIfExists("#active-method-badge", "No active method");
  setTextIfExists(
    "#active-method-copy",
    "Target methods become available again when at least one ticker matches the filters.",
  );
  setTextIfExists("#method-fit-title", "No method fit to evaluate");
  setTextIfExists("#method-fit-body", "Method recommendations depend on an active ticker selection.");
  replaceChildrenIfExists("#method-fit-meta");
  renderAgentDashboards(null);
}

function getPrimaryValuationCopy(company) {
  const haystack = `${company.sector} ${company.industry} ${company.focus ?? ""}`.toLowerCase();
  if (haystack.includes("reit")) {
    return { label: "Primary valuation", value: "P/FFO / NAV", note: "Asset-heavy REIT names are better framed with real-estate valuation math than plain EPS multiples." };
  }
  if (haystack.includes("bank") || haystack.includes("insurance") || haystack.includes("financial")) {
    return { label: "Primary valuation", value: "P/B / ROE", note: "Financials usually price more cleanly off balance-sheet quality and returns on equity." };
  }
  if (haystack.includes("biotech") && String(company.role ?? "").toLowerCase().includes("selective")) {
    return { label: "Primary valuation", value: "Event-driven / sales-led", note: "Profit-based multiples can be less reliable in speculative biotech and early-product stories." };
  }
  return { label: "Primary valuation", value: "Forward P/E", note: "A classic earnings multiple is the best default once a live fundamentals feed is attached." };
}

function buildFundamentalItems(company, resolved, opportunity) {
  const fundamentals = company.fundamentals ?? {};
  const primaryValuation = getPrimaryValuationCopy(company);
  const sourceCopy = fundamentals.source
    ? `${fundamentals.source}${fundamentals.updatedAt ? ` refresh ${formatShortDate(fundamentals.updatedAt)}` : ""}.`
    : "Add FMP_API_KEY and rerun the market refresh to populate this field.";
  const fiscalCopy = fundamentals.financialDate
    ? `Latest financial statement date: ${formatShortDate(fundamentals.financialDate)}.`
    : sourceCopy;
  const epsActual = fundamentals.epsActual ?? fundamentals.reportedEps;
  const epsNote =
    fundamentals.epsActual != null && fundamentals.epsEstimate != null
      ? `Estimate ${formatMoney(fundamentals.epsEstimate)}; surprise ${formatPercent(fundamentals.epsSurprisePct ?? 0)}.`
      : fundamentals.reportedEps != null
        ? `${fiscalCopy} Analyst EPS estimate needs FMP earnings-surprise coverage.`
        : sourceCopy;
  const targetRange =
    fundamentals.analystTargetLow != null && fundamentals.analystTargetHigh != null
      ? `Range ${formatMoney(fundamentals.analystTargetLow)} - ${formatMoney(fundamentals.analystTargetHigh)}.`
      : fundamentals.analystTargetCount != null
        ? `${formatNumber(fundamentals.analystTargetCount, 0)} target observations.`
        : "Requires FMP price-target summary coverage.";

  return [
    {
      label: "Market cap",
      value:
        fundamentals.marketCap == null
          ? "Pending FMP"
          : formatCompactNumber(fundamentals.marketCap, { currency: true }),
      note: fundamentals.marketCap == null ? sourceCopy : "Company size from the FMP fundamentals layer.",
    },
    {
      label: "P/E ratio",
      value:
        fundamentals.trailingPe == null
          ? "Pending FMP"
          : formatMultiple(fundamentals.trailingPe),
      note:
        fundamentals.trailingPe == null
          ? primaryValuation.note
          : `${primaryValuation.value} context. FMP TTM earnings multiple.`,
    },
    {
      label: "EPS actual vs est.",
      value:
        epsActual == null
          ? "Pending FMP"
          : `${formatMoney(epsActual)}${fundamentals.epsEstimate == null ? "" : ` / ${formatMoney(fundamentals.epsEstimate)}`}`,
      note: epsNote,
    },
    {
      label: "Revenue",
      value:
        fundamentals.revenue == null
          ? "Pending FMP"
          : formatCompactNumber(fundamentals.revenue, { currency: true }),
      note: fundamentals.revenue == null ? sourceCopy : fiscalCopy,
    },
    {
      label: "Net income",
      value:
        fundamentals.netIncome == null
          ? "Pending FMP"
          : formatCompactNumber(fundamentals.netIncome, { currency: true }),
      note:
        fundamentals.netIncome == null
          ? sourceCopy
          : fundamentals.netMarginPct == null
            ? fiscalCopy
            : `Net margin ${formatPercent(fundamentals.netMarginPct)}. ${fiscalCopy}`,
    },
    {
      label: "Analyst target",
      value:
        fundamentals.analystTarget == null
          ? "Pending FMP"
          : formatMoney(fundamentals.analystTarget),
      note:
        fundamentals.analystTarget == null
          ? "The model target still works; this adds sell-side target context when FMP provides it."
          : targetRange,
    },
  ];
}

function hasValue(value) {
  return value != null && value !== "" && !Number.isNaN(Number(value));
}

function formatPriceRange(low, high) {
  if (!hasValue(low) || !hasValue(high)) {
    return "Pending";
  }
  return `${formatMoney(low)} - ${formatMoney(high)}`;
}

function getFundamentalCompleteness(fundamentals) {
  const fields = [
    "marketCap",
    "trailingPe",
    "priceToSales",
    "evToEbitda",
    "revenue",
    "netIncome",
    "reportedEps",
    "epsActual",
    "epsEstimate",
    "analystTarget",
    "debtToEquity",
    "returnOnEquityPct",
  ];
  const available = fields.filter((field) => hasValue(fundamentals[field])).length;
  return Math.round((available / fields.length) * 100);
}

function makeAgentBar({ label, value, note }) {
  const row = document.createElement("div");
  row.className = "agent-bar";
  row.innerHTML = `
    <div class="agent-bar__header">
      <span>${label}</span>
      <small>${Math.round(value)}/100${note ? ` - ${note}` : ""}</small>
    </div>
    <div class="agent-bar__track">
      <div class="agent-bar__fill" style="width:${clampNumber(value, 0, 100)}%"></div>
    </div>
  `;
  return row;
}

function makeAgentTableRows(rows) {
  return rows.map((row) => {
    const item = document.createElement("tr");
    item.innerHTML = `
      <td>${row.label}</td>
      <td>${row.value}</td>
      <td><small>${row.note}</small></td>
    `;
    return item;
  });
}

function getAnalystUpsidePct(company) {
  const fundamentals = company.fundamentals ?? {};
  if (!hasValue(fundamentals.analystTarget) || !hasValue(company.price)) {
    return null;
  }
  return ((Number(fundamentals.analystTarget) / Number(company.price)) - 1) * 100;
}

function makeAgentInputTile({ label, value, note, score, range }) {
  const tile = document.createElement("article");
  tile.className = "agent-input-tile";
  const metric = document.createElement("span");
  metric.textContent = label;
  const reading = document.createElement("strong");
  reading.textContent = value;
  tile.append(metric, reading);

  if (range) {
    const track = document.createElement("div");
    track.className = "range-map";
    track.innerHTML = `
      <div class="range-map__track">
        <i class="range-map__dot" style="left:${clampNumber(range.positionPct, 0, 100)}%"></i>
      </div>
      <div class="range-map__labels">
        <b>${range.low}</b>
        <b>${range.high}</b>
      </div>
    `;
    tile.append(track);
  } else if (score != null) {
    const track = document.createElement("div");
    track.className = "agent-mini-track";
    track.innerHTML = `<i class="agent-mini-fill" style="width:${clampNumber(score, 0, 100)}%"></i>`;
    tile.append(track);
  }

  const detail = document.createElement("small");
  detail.textContent = note;
  tile.append(detail);
  return tile;
}

function makeAgentTargetItem({ label, value, note, score }) {
  const item = document.createElement("article");
  item.className = "agent-target-item";
  item.innerHTML = `
    <span>${label}</span>
    <strong>${value}</strong>
    <div class="agent-mini-track">
      <i class="agent-mini-fill" style="width:${clampNumber(score, 0, 100)}%"></i>
    </div>
    <small>${note}</small>
  `;
  return item;
}

function makeReturnBar({ label, value }) {
  const row = document.createElement("div");
  row.className = "return-bar";
  const numericValue = hasValue(value) ? Number(value) : null;
  const width = numericValue == null ? 0 : clampNumber(Math.abs(numericValue) / 100 * 50, 0, 50);
  const left = numericValue == null ? 50 : numericValue >= 0 ? 50 : 50 - width;
  row.innerHTML = `
    <span>${label}</span>
    <div class="return-bar__track">
      <i class="return-bar__axis"></i>
      <i class="return-bar__fill${numericValue != null && numericValue < 0 ? " is-negative" : ""}" style="left:${left}%; width:${width}%"></i>
    </div>
    <strong>${numericValue == null ? "Pending" : formatPercent(numericValue)}</strong>
  `;
  return row;
}

function buildJohnInputTiles(company, opportunity, resolved) {
  const fundamentals = company.fundamentals ?? {};
  const analystUpside = getAnalystUpsidePct(company);
  const dataCompleteness = getFundamentalCompleteness(fundamentals);
  const scenarioMove = resolved.activeTargets?.[currentScenarioId] ?? null;
  const scenarioTarget =
    hasValue(company.price) && scenarioMove != null
      ? Number(company.price) * (1 + Number(scenarioMove) / 100)
      : null;

  return [
    {
      label: "Market cap",
      value: hasValue(fundamentals.marketCap)
        ? formatCompactNumber(fundamentals.marketCap, { currency: true })
        : "Pending",
      note: `Liquidity bucket: ${company.liquidityBucket ?? "pending"}. Avg dollar volume ${hasValue(company.avgDailyDollarVolume) ? formatCompactNumber(company.avgDailyDollarVolume, { currency: true }) : "pending"}.`,
      score: opportunity.liquidityScore,
    },
    {
      label: "Revenue / profit",
      value: `${hasValue(fundamentals.revenue) ? formatCompactNumber(fundamentals.revenue, { currency: true }) : "Pending"} / ${hasValue(fundamentals.netIncome) ? formatCompactNumber(fundamentals.netIncome, { currency: true }) : "Pending"}`,
      note: hasValue(fundamentals.netMarginPct)
        ? `Net margin ${formatPercent(fundamentals.netMarginPct)}.`
        : "John needs profitability and cash-flow depth next.",
      score: hasValue(fundamentals.netMarginPct) ? clampNumber(50 + Number(fundamentals.netMarginPct) * 1.5, 0, 100) : null,
    },
    {
      label: "Valuation multiple",
      value: hasValue(fundamentals.trailingPe)
        ? `${formatMultiple(fundamentals.trailingPe)} P/E`
        : hasValue(fundamentals.evToEbitda)
          ? `${formatMultiple(fundamentals.evToEbitda)} EV/EBITDA`
          : "Pending",
      note: hasValue(fundamentals.evToEbitda)
        ? `EV/EBITDA ${formatMultiple(fundamentals.evToEbitda)}.`
        : "Needs richer peer-relative valuation.",
      score: hasValue(fundamentals.trailingPe)
        ? clampNumber(95 - Number(fundamentals.trailingPe) * 1.6, 0, 100)
        : hasValue(fundamentals.evToEbitda)
          ? clampNumber(88 - Number(fundamentals.evToEbitda) * 2.4, 0, 100)
          : null,
    },
    {
      label: "EPS surprise",
      value:
        hasValue(fundamentals.epsActual) || hasValue(fundamentals.reportedEps)
          ? `${formatMoney(fundamentals.epsActual ?? fundamentals.reportedEps)}${hasValue(fundamentals.epsEstimate) ? ` vs ${formatMoney(fundamentals.epsEstimate)}` : ""}`
          : "Pending",
      note: hasValue(fundamentals.epsSurprisePct)
        ? `Surprise ${formatPercent(fundamentals.epsSurprisePct)}.`
        : "Needs estimate revision history.",
      score: hasValue(fundamentals.epsSurprisePct)
        ? clampNumber(50 + Number(fundamentals.epsSurprisePct) * 3.5, 0, 100)
        : null,
    },
    {
      label: "Analyst target",
      value: hasValue(fundamentals.analystTarget) ? formatMoney(fundamentals.analystTarget) : "Pending",
      note: analystUpside == null
        ? "Sell-side target not available for this ticker."
        : `${formatPercent(analystUpside)} vs current price, based on ${formatNumber(fundamentals.analystTargetCount ?? 0, 0)} observation(s).`,
      score: analystUpside == null ? null : clampNumber(50 + analystUpside * 2, 0, 100),
    },
    {
      label: "Model target",
      value: scenarioTarget == null ? "Pending" : formatMoney(scenarioTarget),
      note: `${titleCase(currentScenarioId)} case using ${getMethodById(resolved.effectiveMethodId).label}; ${scenarioMove == null ? "move pending" : formatPercent(scenarioMove)} from current price.`,
      score: scenarioMove == null ? null : clampNumber(50 + Number(scenarioMove) * 2.8, 0, 100),
    },
    {
      label: "Balance sheet",
      value: hasValue(fundamentals.debtToEquity)
        ? `${formatMultiple(fundamentals.debtToEquity)} debt/equity`
        : "Pending",
      note: hasValue(fundamentals.debtToEquity)
        ? "John uses this as a first-pass leverage risk signal."
        : "Needs debt maturity, interest cover, and liquidity details.",
      score: hasValue(fundamentals.debtToEquity)
        ? clampNumber(88 - Number(fundamentals.debtToEquity) * 12, 15, 95)
        : null,
    },
    {
      label: "Data confidence",
      value: `${dataCompleteness}/100`,
      note: fundamentals.source
        ? `${fundamentals.source} refresh ${fundamentals.updatedAt ? formatShortDate(fundamentals.updatedAt) : "date pending"}.`
        : "This ticker is still missing live fundamentals.",
      score: dataCompleteness,
    },
  ];
}

function buildJohnTargetTiles(company, resolved) {
  if (!resolved.isResearchReady || !hasValue(company.price) || !resolved.activeTargets) {
    return [
      { label: "Bear case", value: "Pending", note: "Needs price and target model.", score: 0 },
      { label: "Base case", value: "Pending", note: "Needs price and target model.", score: 0 },
      { label: "Bull case", value: "Pending", note: "Needs price and target model.", score: 0 },
    ];
  }

  return ["bear", "base", "bull"].map((scenarioId) => {
    const move = resolved.activeTargets[scenarioId];
    const target = Number(company.price) * (1 + move / 100);
    return {
      label: `${titleCase(scenarioId)} case`,
      value: formatMoney(target),
      note: `${formatPercent(move)} from current price.`,
      score: scenarioId === "bear"
        ? clampNumber(100 + move * 3.6, 0, 100)
        : clampNumber(50 + move * 2.6, 0, 100),
    };
  });
}

function buildMaxInputTiles(company, opportunity, levels) {
  const rangePosition = opportunity.rangePositionPct ?? 50;
  const preferredEntry =
    levels == null ? "Pending" : formatPriceRange(levels.entryLow, levels.entryHigh);
  return [
    {
      label: "52W range map",
      value: hasValue(company.price) ? formatMoney(company.price) : "Pending",
      note: `${Math.round(rangePosition)}% through the 52-week range.`,
      range: {
        low: hasValue(company.fiftyTwoWeekLow) ? formatMoney(company.fiftyTwoWeekLow) : "Low pending",
        high: hasValue(company.fiftyTwoWeekHigh) ? formatMoney(company.fiftyTwoWeekHigh) : "High pending",
        positionPct: rangePosition,
      },
    },
    {
      label: "Preferred entry",
      value: preferredEntry,
      note: levels?.position ?? "Needs 52-week range and OHLCV swing data.",
      score: levels ? clampNumber(100 - Math.abs(rangePosition - 55) * 1.7, 0, 100) : null,
    },
    {
      label: "Trend regime",
      value: `${opportunity.trendScore}/100`,
      note: `${hasValue(company.threeMonthReturn) ? formatPercent(company.threeMonthReturn) : "Pending"} 3M return.`,
      score: opportunity.trendScore,
    },
    {
      label: "Rebound setup",
      value: `${opportunity.reboundScore}/100`,
      note: hasValue(company.offHighPct)
        ? `${formatPercent(company.offHighPct * -1)} from 52W high; ${formatPercent(company.aboveLowPct ?? 0)} above low.`
        : "Needs high/low context.",
      score: opportunity.reboundScore,
    },
    {
      label: "Risk balance",
      value: `${opportunity.riskScore}/100`,
      note: "Proxy for drawdown/volatility risk until ATR is attached.",
      score: opportunity.riskScore,
    },
    {
      label: "Liquidity",
      value: company.liquidityBucket ?? "Pending",
      note: hasValue(company.avgDailyDollarVolume)
        ? `${formatCompactNumber(company.avgDailyDollarVolume, { currency: true })} avg daily dollar volume.`
        : "Needs average dollar volume.",
      score: opportunity.liquidityScore,
    },
  ];
}

function buildReturnBars(company) {
  return [
    { label: "1M", value: company.oneMonthReturn },
    { label: "3M", value: company.threeMonthReturn },
    { label: "6M", value: company.sixMonthReturn },
    { label: "1Y", value: company.oneYearReturn },
  ];
}

function setDecisionBadge(selector, verdict) {
  const badge = document.querySelector(selector);
  if (!badge) {
    return;
  }
  badge.textContent = verdict;
  badge.className = "decision-badge";
  badge.classList.add(`decision-badge--${String(verdict).toLowerCase()}`);
}

function buildJohnView(company, opportunity, resolved) {
  const fundamentals = company.fundamentals ?? {};
  const dataCompleteness = getFundamentalCompleteness(fundamentals);
  const analystUpside = getAnalystUpsidePct(company);
  const valuationScore =
    analystUpside == null
      ? clampNumber(48 + (resolved.activeTargets?.base ?? 0) * 1.4, 0, 100)
      : clampNumber(50 + analystUpside * 2.1, 0, 100);
  const qualityScore = hasValue(fundamentals.netMarginPct)
    ? clampNumber(48 + Number(fundamentals.netMarginPct) * 1.6, 0, 100)
    : clampNumber(opportunity.confidenceScore * 0.82, 0, 100);
  const revisionScore = hasValue(fundamentals.epsSurprisePct)
    ? clampNumber(50 + Number(fundamentals.epsSurprisePct) * 3.5, 0, 100)
    : hasValue(fundamentals.epsEstimate)
      ? 58
      : 42;
  const balanceScore = hasValue(fundamentals.debtToEquity)
    ? clampNumber(88 - Number(fundamentals.debtToEquity) * 12, 15, 95)
    : opportunity.riskScore;
  const catalystScore = clampNumber(
    42 +
      (hasValue(fundamentals.analystTargetCount) ? 12 : 0) +
      (fundamentals.earningsDate ? 8 : 0) +
      Math.max(0, resolved.activeTargets?.base ?? 0) * 1.2,
    0,
    100,
  );
  const downsideScore = clampNumber(opportunity.riskScore * 0.65 + valuationScore * 0.35, 0, 100);
  let totalScore = clampNumber(
    valuationScore * 0.22 +
      qualityScore * 0.2 +
      revisionScore * 0.14 +
      balanceScore * 0.14 +
      catalystScore * 0.12 +
      downsideScore * 0.1 +
      dataCompleteness * 0.08,
    0,
    100,
  );

  if (dataCompleteness < 35) {
    totalScore = Math.min(totalScore, 58);
  }
  if (dataCompleteness < 12) {
    totalScore = Math.min(totalScore, 45);
  }

  const verdict = totalScore >= 70 ? "Buy" : totalScore >= 52 ? "Watch" : "Avoid";
  return {
    verdict,
    score: Math.round(totalScore),
    inputTiles: buildJohnInputTiles(company, opportunity, resolved),
    targetTiles: buildJohnTargetTiles(company, resolved),
    bars: [
      { label: "Valuation", value: valuationScore, note: analystUpside == null ? "model proxy" : `${formatPercent(analystUpside)} target gap` },
      { label: "Business quality", value: qualityScore, note: hasValue(fundamentals.netMarginPct) ? "margin-led" : "needs ROIC" },
      { label: "Revisions", value: revisionScore, note: hasValue(fundamentals.epsSurprisePct) ? "EPS surprise" : "pending revisions" },
      { label: "Balance sheet", value: balanceScore, note: hasValue(fundamentals.debtToEquity) ? "debt/equity" : "risk proxy" },
      { label: "Catalyst path", value: catalystScore, note: fundamentals.earningsDate ? formatShortDate(fundamentals.earningsDate) : "needs calendar" },
      { label: "Data confidence", value: dataCompleteness, note: "fundamental coverage" },
    ],
    metrics: [
      {
        label: "Market cap",
        value: hasValue(fundamentals.marketCap) ? formatCompactNumber(fundamentals.marketCap, { currency: true }) : "Pending",
        note: "Company size and institutional investability.",
      },
      {
        label: "Valuation multiple",
        value: hasValue(fundamentals.trailingPe)
          ? `${formatMultiple(fundamentals.trailingPe)} P/E`
          : hasValue(fundamentals.priceToSales)
            ? `${formatMultiple(fundamentals.priceToSales)} P/S`
            : "Pending",
        note: "Primary relative valuation input. Sector-specific methods still need refinement.",
      },
      {
        label: "Revenue / net income",
        value: `${hasValue(fundamentals.revenue) ? formatCompactNumber(fundamentals.revenue, { currency: true }) : "Pending"} / ${hasValue(fundamentals.netIncome) ? formatCompactNumber(fundamentals.netIncome, { currency: true }) : "Pending"}`,
        note: "Scale and profitability base for the thesis.",
      },
      {
        label: "EPS actual vs estimate",
        value:
          hasValue(fundamentals.epsActual) || hasValue(fundamentals.reportedEps)
            ? `${formatMoney(fundamentals.epsActual ?? fundamentals.reportedEps)}${hasValue(fundamentals.epsEstimate) ? ` vs ${formatMoney(fundamentals.epsEstimate)}` : ""}`
            : "Pending",
        note: hasValue(fundamentals.epsSurprisePct) ? `Surprise ${formatPercent(fundamentals.epsSurprisePct)}.` : "Needs richer estimate-revision history.",
      },
      {
        label: "Analyst target range",
        value: hasValue(fundamentals.analystTarget)
          ? formatMoney(fundamentals.analystTarget)
          : "Pending",
        note: hasValue(fundamentals.analystTargetLow) && hasValue(fundamentals.analystTargetHigh)
          ? `${formatMoney(fundamentals.analystTargetLow)} to ${formatMoney(fundamentals.analystTargetHigh)}.`
          : "Sell-side context only, not the final valuation answer.",
      },
    ],
  };
}

function buildTradeLevels(company, resolved) {
  if (!hasValue(company.price) || !hasValue(company.fiftyTwoWeekHigh) || !hasValue(company.fiftyTwoWeekLow)) {
    return null;
  }
  const price = Number(company.price);
  const high = Number(company.fiftyTwoWeekHigh);
  const low = Number(company.fiftyTwoWeekLow);
  const range = Math.max(high - low, price * 0.08);
  const entryLow = low + range * 0.382;
  const entryHigh = low + range * 0.618;
  const addLow = low + range * 0.236;
  const addHigh = low + range * 0.382;
  const stop = Math.max(0, low + range * 0.18);
  const target1 = high;
  const target2 = high + range * 0.272;
  const target3 = high + range * 0.618;
  const entryMid = (entryLow + entryHigh) / 2;
  const rewardRisk = (target2 - entryMid) / Math.max(entryMid - stop, price * 0.01);
  const position =
    price >= entryLow && price <= entryHigh
      ? "Inside entry zone"
      : price > entryHigh
        ? "Above preferred entry"
        : "Below preferred entry";

  return {
    price,
    low,
    high,
    entryLow,
    entryHigh,
    addLow,
    addHigh,
    stop,
    target1,
    target2,
    target3,
    rewardRisk,
    position,
    scenarioTarget:
      resolved.isResearchReady && resolved.activeTargets?.[currentScenarioId] != null
        ? price * (1 + resolved.activeTargets[currentScenarioId] / 100)
        : null,
  };
}

function buildMaxView(company, opportunity, resolved) {
  const levels = buildTradeLevels(company, resolved);
  const rangePosition = opportunity.rangePositionPct ?? 50;
  const entryTimingScore = clampNumber(100 - Math.abs(rangePosition - 55) * 1.7, 0, 100);
  const rewardRiskScore = levels ? clampNumber(levels.rewardRisk * 28, 0, 100) : 35;
  const structureScore = clampNumber(
    opportunity.trendScore * 0.36 + opportunity.reboundScore * 0.28 + opportunity.riskScore * 0.2 + entryTimingScore * 0.16,
    0,
    100,
  );
  const totalScore = clampNumber(
    opportunity.trendScore * 0.24 +
      structureScore * 0.22 +
      opportunity.riskScore * 0.16 +
      opportunity.liquidityScore * 0.12 +
      entryTimingScore * 0.16 +
      rewardRiskScore * 0.1,
    0,
    100,
  );
  const isExtended = rangePosition >= 86;
  const verdict =
    totalScore >= 70 && !isExtended && levels?.position !== "Above preferred entry"
      ? "Enter"
      : totalScore >= 54
        ? "Wait"
        : "Avoid";

  return {
    verdict,
    score: Math.round(totalScore),
    levels,
    inputTiles: buildMaxInputTiles(company, opportunity, levels),
    returnBars: buildReturnBars(company),
    bars: [
      { label: "Trend regime", value: opportunity.trendScore, note: `${formatPercent(company.threeMonthReturn ?? 0)} 3M` },
      { label: "Structure quality", value: structureScore, note: levels?.position ?? "pending OHLCV" },
      { label: "Risk balance", value: opportunity.riskScore, note: "volatility proxy" },
      { label: "Liquidity", value: opportunity.liquidityScore, note: company.liquidityBucket ?? "estimated" },
      { label: "Entry timing", value: entryTimingScore, note: `${Math.round(rangePosition)}% of 52W range` },
      { label: "Reward / risk", value: rewardRiskScore, note: levels ? `${levels.rewardRisk.toFixed(1)}x` : "pending levels" },
    ],
  };
}

function combineTradingDecision(johnView, maxView) {
  let finalCall = "Wait";
  if (johnView.verdict === "Avoid" || maxView.verdict === "Avoid") {
    finalCall = "Avoid";
  } else if (johnView.verdict === "Buy" && maxView.verdict === "Enter") {
    finalCall = "Buy";
  } else if (johnView.verdict === "Watch" && maxView.verdict === "Enter") {
    finalCall = "Watch";
  }
  const conviction = Math.round((johnView.score * 0.55 + maxView.score * 0.45));
  return { finalCall, conviction };
}

function renderPriceLadder(levels) {
  const ladder = document.querySelector("#max-price-ladder");
  if (!ladder) {
    return;
  }
  if (!levels) {
    ladder.textContent = "Attach OHLCV and swing-level data to render Max's execution ladder.";
    return;
  }
  const min = Math.min(levels.stop, levels.addLow, levels.entryLow, levels.price);
  const max = Math.max(levels.target3, levels.target2, levels.target1, levels.price);
  const toPosition = (value) => clampNumber(((value - min) / Math.max(max - min, 1)) * 100, 0, 100);
  const rows = [
    ["Stop", levels.stop],
    ["Add", (levels.addLow + levels.addHigh) / 2],
    ["Entry", (levels.entryLow + levels.entryHigh) / 2],
    ["Current", levels.price],
    ["Target 1", levels.target1],
    ["Target 2", levels.target2],
    ["Target 3", levels.target3],
  ];
  ladder.replaceChildren(
    ...rows.map(([label, value]) => {
      const row = document.createElement("div");
      row.className = "price-ladder__row";
      row.innerHTML = `
        <span>${label}</span>
        <div class="price-ladder__track">
          <i class="price-ladder__dot" style="left:${toPosition(value)}%"></i>
        </div>
        <strong>${formatMoney(value)}</strong>
      `;
      return row;
    }),
  );
}

function renderAgentDashboards(company, opportunity, resolved) {
  const root = document.querySelector("#agent-dashboard-panel");
  if (!root) {
    return;
  }
  if (!company || !opportunity || !resolved) {
    setDecisionBadge("#john-verdict", "Awaiting");
    setDecisionBadge("#max-verdict", "Awaiting");
    document.querySelector("#john-data-source").textContent =
      "Ticker-level fundamentals and valuation context";
    document.querySelector("#max-data-source").textContent =
      "Price structure, trend, liquidity, and execution levels";
    document.querySelector("#john-input-grid")?.replaceChildren();
    document.querySelector("#john-target-strip")?.replaceChildren();
    document.querySelector("#max-input-grid")?.replaceChildren();
    document.querySelector("#max-return-bars")?.replaceChildren();
    document.querySelector("#john-score-bars")?.replaceChildren();
    document.querySelector("#max-score-bars")?.replaceChildren();
    document.querySelector("#john-metrics-table")?.replaceChildren();
    document.querySelector("#max-levels-table")?.replaceChildren();
    document.querySelector("#max-price-ladder")?.replaceChildren();
    document.querySelector("#trading-decision-summary").textContent =
      "Select a ticker to combine John and Max into one actionable view.";
    document.querySelector("#trading-decision-grid")?.replaceChildren();
    return;
  }

  const johnView = buildJohnView(company, opportunity, resolved);
  const maxView = buildMaxView(company, opportunity, resolved);
  const decision = combineTradingDecision(johnView, maxView);
  const levels = maxView.levels;

  setDecisionBadge("#john-verdict", johnView.verdict);
  setDecisionBadge("#max-verdict", maxView.verdict);
  document.querySelector("#john-data-source").textContent =
    `${company.ticker} fundamentals, targets, and model evidence`;
  document.querySelector("#max-data-source").textContent =
    `${company.ticker} price structure, momentum, and risk map`;
  document.querySelector("#john-input-grid")?.replaceChildren(...johnView.inputTiles.map(makeAgentInputTile));
  document.querySelector("#john-target-strip")?.replaceChildren(...johnView.targetTiles.map(makeAgentTargetItem));
  document.querySelector("#max-input-grid")?.replaceChildren(...maxView.inputTiles.map(makeAgentInputTile));
  document.querySelector("#max-return-bars")?.replaceChildren(...maxView.returnBars.map(makeReturnBar));
  document.querySelector("#john-score-bars")?.replaceChildren(...johnView.bars.map(makeAgentBar));
  document.querySelector("#max-score-bars")?.replaceChildren(...maxView.bars.map(makeAgentBar));
  document.querySelector("#john-metrics-table")?.replaceChildren(...makeAgentTableRows(johnView.metrics));
  renderPriceLadder(levels);

  const maxRows = levels
    ? [
        { label: "Preferred entry", value: formatPriceRange(levels.entryLow, levels.entryHigh), note: "Fibonacci 38.2%-61.8% proxy from the current 52-week range until swing OHLCV is attached." },
        { label: "Add zone", value: formatPriceRange(levels.addLow, levels.addHigh), note: "Deeper retracement zone; only valid if John thesis remains intact." },
        { label: "Stop / invalidation", value: formatMoney(levels.stop), note: "Structural risk line. Later this should use ATR and detected swing invalidation." },
        { label: "Target 1", value: formatMoney(levels.target1), note: "Prior 52-week high / first trim zone." },
        { label: "Target 2", value: formatMoney(levels.target2), note: "127.2% extension proxy." },
        { label: "Target 3", value: formatMoney(levels.target3), note: "161.8% extension proxy; use only if trend confirms." },
      ]
    : [
        { label: "Execution levels", value: "Pending", note: "Requires price, 52-week range, and eventually full OHLCV swing data." },
      ];
  document.querySelector("#max-levels-table")?.replaceChildren(...makeAgentTableRows(maxRows));

  const decisionGrid = document.querySelector("#trading-decision-grid");
  const decisionSummary = document.querySelector("#trading-decision-summary");
  if (decisionSummary) {
    decisionSummary.textContent =
      `${company.ticker}: John says ${johnView.verdict}, Max says ${maxView.verdict}. Final Trading Decision is ${decision.finalCall} with ${decision.conviction}/100 conviction.`;
  }
  if (decisionGrid) {
    const tiles = [
      ["Final call", decision.finalCall],
      ["Conviction", `${decision.conviction}/100`],
      ["Entry zone", levels ? formatPriceRange(levels.entryLow, levels.entryHigh) : "Pending"],
      ["Stop", levels ? formatMoney(levels.stop) : "Pending"],
      ["Target 1", levels ? formatMoney(levels.target1) : "Pending"],
      ["Target 2", levels ? formatMoney(levels.target2) : "Pending"],
      ["Target 3", levels ? formatMoney(levels.target3) : "Pending"],
      ["Reward/risk", levels ? `${levels.rewardRisk.toFixed(1)}x` : "Pending"],
    ];
    decisionGrid.replaceChildren(
      ...tiles.map(([label, value]) => {
        const tile = document.createElement("div");
        tile.className = "decision-tile";
        tile.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
        return tile;
      }),
    );
  }
}

function renderCompany(id) {
  const company = companyUniverseById.get(id);
  if (!company) {
    renderEmptyState();
    return;
  }

  const opportunity = getOpportunityProfile(company);
  const resolved = opportunity.resolved;
  currentCompanyId = company.id;
  if (tickerFilter) {
    tickerFilter.value = currentFilters.selectedTickerId;
  }

  setTextIfExists("#company-kind", `${company.sector} | ${company.industry} | ${company.ticker}`);
  setTextIfExists("#company-name", company.name);
  setTextIfExists("#company-price", company.price == null ? "Directory mode" : formatMoney(company.price));
  setTextIfExists(
    "#company-date",
    company.price == null
      ? `${company.exchange} listing${company.cik ? ` | CIK ${company.cik}` : ""}`
      : company.date,
  );
  setTextIfExists("#company-thesis", company.thesis);
  setTextIfExists("#company-positioning", company.positioning);

  const activeScenarioTarget =
    resolved.isResearchReady && company.price != null
      ? company.price * (1 + resolved.activeTargets[currentScenarioId] / 100)
      : null;
  setTextIfExists("#company-active-target", activeScenarioTarget == null ? "Pending" : formatMoney(activeScenarioTarget));
  setTextIfExists(
    "#company-active-target-copy",
    activeScenarioTarget == null
      ? "Unlock this view by attaching price and research inputs to the selected ticker."
      : `${titleCase(currentScenarioId)} case using ${getMethodById(resolved.effectiveMethodId).label}: ${formatPercent(resolved.activeTargets[currentScenarioId])} from current price.`,
  );

  const chipWrap = document.querySelector("#company-chips");
  if (chipWrap) {
    chipWrap.replaceChildren(
      ...[
        { text: company.sector },
        { text: company.industry },
        { text: company.focus },
        isResearchReadyProfile(company)
          ? { text: "Research-ready", className: "profile-badge profile-badge--research" }
          : { text: "Directory-only", className: "profile-badge profile-badge--directory" },
        company.oneYearReturn == null ? null : { text: `1Y return ${formatPercent(company.oneYearReturn)}` },
        company.threeMonthReturn == null ? null : { text: `3M ${formatPercent(company.threeMonthReturn)}` },
        resolved.isResearchReady
          ? { text: `Recommended ${getMethodById(resolved.meta.recommendedMethod).label}` }
          : { text: "Targets pending enrichment" },
      ]
        .filter(Boolean)
        .map((item) => {
          const chip = document.createElement("span");
          chip.textContent = item.text;
          if (item.className) {
            chip.className = item.className;
          }
          return chip;
        }),
    );
  }

  const fundamentalsWrap = document.querySelector("#company-fundamentals");
  if (fundamentalsWrap) {
    fundamentalsWrap.replaceChildren(
      ...buildFundamentalItems(company, resolved, opportunity).map((item) => {
        const card = document.createElement("article");
        card.className = "fundamentals-item";
        card.innerHTML = `
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <small>${item.note}</small>
        `;
        return card;
      }),
    );
  }

  const factList = document.querySelector("#company-facts");
  const fundamentals = company.fundamentals ?? {};
  if (factList) {
    factList.replaceChildren(
      ...[
        `Ticker: ${company.ticker}`,
        `Exchange: ${company.exchange}`,
        `CIK: ${company.cik ?? "Not loaded"}`,
        `Explorer sector: ${company.sector}`,
        `Exchange classification: ${company.exchangeSector}`,
        `Industry: ${company.industry}`,
        company.sicDescription ? `SEC SIC: ${company.sicDescription}` : "SEC SIC: Pending enrichment",
        `Coverage profile: ${resolved.meta.coverage}`,
        company.fiftyTwoWeekLow != null && company.fiftyTwoWeekHigh != null
          ? `52W range: ${formatMoney(company.fiftyTwoWeekLow)} to ${formatMoney(company.fiftyTwoWeekHigh)}`
          : "52W range: Pending enrichment",
        company.avgDailyDollarVolume != null
          ? `Avg daily dollar volume: ${formatCompactNumber(company.avgDailyDollarVolume, { currency: true })}`
          : "Avg daily dollar volume: Pending enrichment",
        fundamentals.source
          ? `Fundamentals source: ${fundamentals.source}`
          : "Fundamentals source: Add FMP_API_KEY and rerun refresh",
        fundamentals.trailingPe != null
          ? `Trailing P/E: ${formatMultiple(fundamentals.trailingPe)}`
          : "Trailing P/E: Pending FMP enrichment",
        fundamentals.reportedEps != null || fundamentals.epsActual != null
          ? `EPS: ${formatMoney(fundamentals.epsActual ?? fundamentals.reportedEps)}${fundamentals.epsEstimate == null ? "" : ` vs estimate ${formatMoney(fundamentals.epsEstimate)}`}`
          : "EPS actual vs estimate: Pending FMP enrichment",
        resolved.isResearchReady
          ? `${titleCase(currentScenarioId)} target (${getMethodById(resolved.effectiveMethodId).label}): ${formatMoney(activeScenarioTarget)}`
          : "Scenario targets: Pending price and valuation enrichment",
      ].map((fact) => {
        const item = document.createElement("li");
        item.textContent = fact;
        return item;
      }),
    );
  }

  const riskList = document.querySelector("#company-risks");
  if (riskList) {
    riskList.replaceChildren(
      ...company.risks.map((risk) => {
        const item = document.createElement("li");
        item.textContent = risk;
        return item;
      }),
    );
  }

  const scoreboard = document.querySelector("#company-scoreboard");
  if (scoreboard) {
    scoreboard.replaceChildren(
      ...[
        { label: "Opportunity score", value: opportunity.opportunityScore },
        ...company.scores.filter((score) => score.label.toLowerCase() !== "confidence"),
        { label: "Confidence", value: opportunity.confidenceScore },
      ].map((score) => {
        const row = document.createElement("div");
        row.className = "score-row";
        row.innerHTML = `
          <div class="score-row__header">
            <span>${score.label}</span>
            <strong>${score.value}</strong>
          </div>
          <div class="bar__track">
            <div class="bar__fill" style="width:${score.value}%"></div>
          </div>
        `;
        return row;
      }),
    );
  }

  buildTargetCards(company, resolved);
  buildMethodCompare(company, resolved);
  renderMethodFit(company, resolved);
  renderAgentDashboards(company, opportunity, resolved);

  document.querySelectorAll(".opportunity-table tbody tr").forEach((row) => {
    row.classList.toggle("is-active", row.dataset.id === id);
  });
}

function renderOpportunityTable() {
  const filteredUniverse = getFilteredUniverse();
  const searchTerm = currentFilters.search.trim().toLowerCase();
  const opportunityCache = new Map(
    filteredUniverse.map((company) => [company.id, getOpportunityProfile(company)]),
  );
  const rankedUniverse = [...filteredUniverse].sort((left, right) => {
    if (searchTerm) {
      const relevanceDelta =
        getSearchRelevance(right, searchTerm) - getSearchRelevance(left, searchTerm);
      if (relevanceDelta !== 0) {
        return relevanceDelta;
      }
    }
    const leftProfile = opportunityCache.get(left.id);
    const rightProfile = opportunityCache.get(right.id);
    if (leftProfile.opportunityScore !== rightProfile.opportunityScore) {
      return rightProfile.opportunityScore - leftProfile.opportunityScore;
    }
    if (isResearchReadyProfile(left) !== isResearchReadyProfile(right)) {
      return Number(isResearchReadyProfile(right)) - Number(isResearchReadyProfile(left));
    }
    return left.ticker.localeCompare(right.ticker);
  });

  const visibleUniverse = rankedUniverse.slice(0, MAX_TABLE_RESULTS);
  const currentFilteredCompany = rankedUniverse.find((item) => item.id === currentCompanyId);
  if (currentFilteredCompany && !visibleUniverse.some((item) => item.id === currentCompanyId)) {
    visibleUniverse.unshift(currentFilteredCompany);
    visibleUniverse.splice(MAX_TABLE_RESULTS);
  }

  companyCount.textContent =
    filteredUniverse.length > MAX_TABLE_RESULTS
      ? `${pluralize(filteredUniverse.length, "company", "companies")} match | showing top ${visibleUniverse.length} by setup score`
      : `${pluralize(filteredUniverse.length, "company", "companies")} shown`;

  opportunityTableBody.replaceChildren(
    ...visibleUniverse.map((company) => {
      const opportunity = opportunityCache.get(company.id);
      const resolved = opportunity.resolved;
      const johnView = buildJohnView(company, opportunity, resolved);
      const maxView = buildMaxView(company, opportunity, resolved);
      const decision = combineTradingDecision(johnView, maxView);
      const row = document.createElement("tr");
      row.dataset.id = company.id;
      row.innerHTML = `
        <td>
          <div class="opportunity-table__cell">
            <div class="opportunity-table__badges">
              <span class="opportunity-table__tag ${isResearchReadyProfile(company) ? "opportunity-table__tag--research" : "opportunity-table__tag--directory"}">${isResearchReadyProfile(company) ? "Research-ready" : "Directory-only"}</span>
            </div>
            <strong>${company.ticker}</strong>
            <small>${company.name}</small>
          </div>
        </td>
        <td>
          <div class="opportunity-table__cell">
            <strong>${company.industry}</strong>
            <small>${company.sector}</small>
          </div>
        </td>
        <td>
          <div class="opportunity-table__cell">
            <span class="opportunity-table__decision opportunity-table__decision--${johnView.verdict.toLowerCase()}">${johnView.verdict}</span>
            <small>John score ${johnView.score}/100</small>
          </div>
        </td>
        <td>
          <div class="opportunity-table__cell">
            <span class="opportunity-table__decision opportunity-table__decision--${maxView.verdict.toLowerCase()}">${maxView.verdict}</span>
            <small>Max score ${maxView.score}/100</small>
          </div>
        </td>
        <td>
          <div class="opportunity-table__cell opportunity-table__conviction">
            <strong>${decision.conviction}%</strong>
            <div class="opportunity-table__conviction-track">
              <i class="opportunity-table__conviction-fill" style="width:${decision.conviction}%"></i>
            </div>
            <small>Final call: ${decision.finalCall}</small>
          </div>
        </td>
      `;
      row.addEventListener("click", () => renderCompany(company.id));
      return row;
    }),
  );

  if (visibleUniverse.length === 0) {
    renderEmptyState();
    return;
  }

  if (!rankedUniverse.some((item) => item.id === currentCompanyId)) {
    const preferredCompany =
      rankedUniverse.find((item) => isResearchReadyProfile(item)) ?? rankedUniverse[0];
    currentCompanyId = preferredCompany.id;
  }
  renderCompany(currentCompanyId);
}

function refreshExplorer() {
  const filteredUniverse = getFilteredUniverse();
  syncFiltersUI(filteredUniverse);
  renderUniverseMeta(filteredUniverse);
  renderHero(filteredUniverse);
  renderScenario(currentScenarioId, { rerenderCompany: false });
}

function updateReadiness() {
  const inputs = [...triggerForm.querySelectorAll("input[type='checkbox']")];
  const total = inputs.reduce(
    (sum, input) => sum + (input.checked ? Number(input.dataset.points) : 0),
    0,
  );
  const state = readinessStates.find((item) => total >= item.min) ?? readinessStates.at(-1);

  document.querySelector("#readiness-fill").style.width = `${total}%`;
  document.querySelector("#readiness-label").textContent = `${state.label} - ${total}/100`;
  document.querySelector("#readiness-body").textContent = state.body;

  const badgeWrap = document.querySelector("#readiness-badges");
  badgeWrap.replaceChildren(
    ...state.badges.map((badge) => {
      const chip = document.createElement("span");
      chip.textContent = badge;
      return chip;
    }),
  );
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  window.localStorage.setItem("golden-pocket-theme", theme);
}

function flashLayoutTarget(section) {
  section.classList.remove("layout-targeted");
  window.clearTimeout(layoutModeResetTimer);
  // Force a reflow so repeated clicks still retrigger the highlight.
  void section.offsetWidth;
  section.classList.add("layout-targeted");
  layoutModeResetTimer = window.setTimeout(() => {
    section.classList.remove("layout-targeted");
  }, 1200);
}

function buildLayoutLegend() {
  if (!layoutLegend) {
    return;
  }

  const title = document.createElement("div");
  title.className = "layout-legend__title";
  title.innerHTML = `
    <strong>Layout Mode</strong>
    <p>Use the badges in your feedback, or click a number below to jump.</p>
  `;

  const list = document.createElement("div");
  list.className = "layout-legend__list";
  layoutSections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "layout-legend__item";
    button.innerHTML = `<strong>${section.dataset.layoutId}. ${section.dataset.layoutLabel}</strong>`;
    button.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      flashLayoutTarget(section);
    });
    list.append(button);
  });

  layoutLegend.replaceChildren(title, list);
}

function applyLayoutMode(enabled) {
  document.body.classList.toggle("layout-mode", enabled);
  if (layoutLegend) {
    layoutLegend.hidden = !enabled;
  }
  if (layoutToggle) {
    layoutToggle.textContent = enabled ? "Hide layout" : "Layout mode";
    layoutToggle.setAttribute("aria-pressed", String(enabled));
  }
  window.localStorage.setItem("golden-pocket-layout-mode", enabled ? "on" : "off");
}

function initializeTheme() {
  const storedTheme = window.localStorage.getItem("golden-pocket-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme ?? (prefersDark ? "dark" : "light"));
}

function initializeLayoutMode() {
  buildLayoutLegend();
  const storedLayoutMode = window.localStorage.getItem("golden-pocket-layout-mode");
  applyLayoutMode(storedLayoutMode === "on");
}

function resetFilters() {
  currentFilters.sector = "All Sectors";
  currentFilters.industry = "All Industries";
  currentFilters.selectedTickerId = "all";
  currentFilters.tickerOptionSearch = "";
  currentFilters.search = "";
  currentFilters.researchReadyOnly = false;
  setTickerMenuOpen(false);
  refreshExplorer();
}

scenarioSwitcher.replaceChildren(
  ...scenarios.map((scenario) => makeButton(scenario, "switcher-pill", renderScenario)),
);

methodSwitcher.replaceChildren(
  ...targetMethods.map((method) => makeButton(method, "method-pill", renderTargetMethod)),
);

sectorFilter.addEventListener("change", (event) => {
  currentFilters.sector = event.target.value;
  currentFilters.industry = "All Industries";
  refreshExplorer();
});

industryFilter.addEventListener("change", (event) => {
  currentFilters.industry = event.target.value;
  refreshExplorer();
});

tickerFilter.addEventListener("change", (event) => {
  selectTickerFilter(event.target.value);
});

tickerFilterSearch.addEventListener("input", (event) => {
  currentFilters.tickerOptionSearch = event.target.value;
  syncFiltersUI();
});

tickerFilterSearch.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setTickerMenuOpen(false);
    tickerFilterButton.focus();
  }
});

tickerFilterButton.addEventListener("click", () => {
  setTickerMenuOpen(tickerFilterMenu.hidden);
});

document.addEventListener("click", (event) => {
  if (tickerCombobox && !tickerCombobox.contains(event.target)) {
    setTickerMenuOpen(false);
  }
});

tickerSearch.addEventListener("input", (event) => {
  currentFilters.search = event.target.value;
  refreshExplorer();
});

researchReadyOnlyToggle.addEventListener("change", (event) => {
  currentFilters.researchReadyOnly = event.target.checked;
  refreshExplorer();
});

clearFiltersButton.addEventListener("click", resetFilters);

triggerForm.addEventListener("input", updateReadiness);
layoutToggle.addEventListener("click", () => {
  const isEnabled = document.body.classList.contains("layout-mode");
  applyLayoutMode(!isEnabled);
});
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

initializeTheme();
initializeLayoutMode();
refreshExplorer();
renderScenario("base");
updateReadiness();
