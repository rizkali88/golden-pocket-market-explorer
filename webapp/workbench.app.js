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
const companyUniverseByTicker = new Map(
  companyUniverse.map((company) => [String(company.ticker).toUpperCase(), company]),
);

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
const finalCallFilter = document.querySelector("#final-call-filter");
const finalCallSortButton = document.querySelector("#final-call-sort");
const finalCallSortState = document.querySelector("#final-call-sort-state");
const clearFiltersButton = document.querySelector("#clear-filters");
const universeStatus = document.querySelector("#universe-status");
const heroTitle = document.querySelector("#hero-title");
const heroLede = document.querySelector("#hero-lede");
const heroMetaDataset = document.querySelector("#hero-meta-dataset");
const heroMetaSelection = document.querySelector("#hero-meta-selection");
const rosterTitle = document.querySelector("#roster-title");
const rosterNote = document.querySelector("#roster-note");
const tradingViewChartHost = document.querySelector("#tradingview-chart-host");
const tradingViewChartTitle = document.querySelector("#tradingview-chart-title");
const tradingViewChartSubtitle = document.querySelector("#tradingview-chart-subtitle");
const tradingViewSymbolLink = document.querySelector("#tradingview-symbol-link");
const maxExecutionChartHost = document.querySelector("#max-execution-chart-host");
const maxExecutionTitle = document.querySelector("#max-execution-title");
const maxExecutionSummary = document.querySelector("#max-execution-summary");
const maxExecutionScore = document.querySelector("#max-execution-score");
const maxExecutionPosition = document.querySelector("#max-execution-position");
const maxExecutionLevels = document.querySelector("#max-execution-levels");
const maxLiveStatus = document.querySelector("#max-live-status");
const maxLiveToggle = document.querySelector("#max-live-toggle");
const maxLiveConnect = document.querySelector("#max-live-connect");
const maxExecutionChartTypeSwitcher = document.querySelector("#max-execution-chart-type-switcher");
const maxExecutionRangeSwitcher = document.querySelector("#max-execution-range-switcher");
const maxExecutionIntervalSwitcher = document.querySelector("#max-execution-interval-switcher");
const maxExecutionDrawingSwitcher = document.querySelector("#max-execution-drawing-switcher");
const paperBotAutoToggle = document.querySelector("#paper-bot-auto-toggle");
const paperBotEvaluate = document.querySelector("#paper-bot-evaluate");
const paperBotReset = document.querySelector("#paper-bot-reset");
const paperBotEquity = document.querySelector("#paper-bot-equity");
const paperBotReturn = document.querySelector("#paper-bot-return");
const paperBotEquityChange = document.querySelector("#paper-bot-equity-change");
const paperBotMarketClock = document.querySelector("#paper-bot-market-clock");
const paperBotMarketStatus = document.querySelector("#paper-bot-market-status");
const paperBotMarketCountdown = document.querySelector("#paper-bot-market-countdown");
const paperBotMetrics = document.querySelector("#paper-bot-metrics");
const paperBotInstruction = document.querySelector("#paper-bot-instruction");
const paperBotReason = document.querySelector("#paper-bot-reason");
const paperBotSyncConnect = document.querySelector("#paper-bot-sync-connect");
const paperBotHoldingsValue = document.querySelector("#paper-bot-holdings-value");
const paperBotHoldingsReturn = document.querySelector("#paper-bot-holdings-return");
const paperBotHoldingsRanges = document.querySelector("#paper-bot-holdings-ranges");
const paperBotHoldingsChartWrap = document.querySelector("#paper-bot-holdings-chart-wrap");
const paperBotHoldingsPath = document.querySelector("#paper-bot-holdings-path");
const paperBotHoldingsFill = document.querySelector("#paper-bot-holdings-fill");
const paperBotHoldingsDot = document.querySelector("#paper-bot-holdings-dot");
const paperBotHoldingsHoverLine = document.querySelector("#paper-bot-holdings-hover-line");
const paperBotHoldingsHoverDot = document.querySelector("#paper-bot-holdings-hover-dot");
const paperBotHoldingsTooltip = document.querySelector("#paper-bot-holdings-tooltip");
const paperBotHoldingsYMax = document.querySelector("#paper-bot-holdings-y-max");
const paperBotHoldingsYMid = document.querySelector("#paper-bot-holdings-y-mid");
const paperBotHoldingsYMin = document.querySelector("#paper-bot-holdings-y-min");
const paperBotHoldingsXStart = document.querySelector("#paper-bot-holdings-x-start");
const paperBotHoldingsXEnd = document.querySelector("#paper-bot-holdings-x-end");
const paperBotHoldingsEmpty = document.querySelector("#paper-bot-holdings-empty");
const paperBotLiveStatus = document.querySelector("#paper-bot-live-status");
const paperBotPositions = document.querySelector("#paper-bot-positions");
const paperBotPositionCount = document.querySelector("#paper-bot-position-count");
const paperBotTransactionsOpen = document.querySelector("#paper-bot-transactions-open");
const paperBotTransactionsCount = document.querySelector("#paper-bot-transactions-count");
const paperBotTransactionsModal = document.querySelector("#paper-bot-transactions-modal");
const paperBotTransactionsClose = document.querySelector("#paper-bot-transactions-close");
const paperBotTransactionsBody = document.querySelector("#paper-bot-transactions-body");
const paperBotTransactionsSummary = document.querySelector("#paper-bot-transactions-summary");
const paperBotCloseConfirmModal = document.querySelector("#paper-bot-close-confirm-modal");
const paperBotCloseConfirmMessage = document.querySelector("#paper-bot-close-confirm-message");
const paperBotCloseConfirmOk = document.querySelector("#paper-bot-close-confirm-ok");
const paperBotCloseConfirmCancel = document.querySelector("#paper-bot-close-confirm-cancel");
const layoutSections = [...document.querySelectorAll("[data-layout-id]")].sort(
  (left, right) => Number(left.dataset.layoutId) - Number(right.dataset.layoutId),
);

const TRADINGVIEW_EXCHANGE_PREFIXES = new Map([
  ["nasdaq", "NASDAQ"],
  ["nyse", "NYSE"],
  ["nyse arca", "AMEX"],
  ["nyse american", "AMEX"],
  ["amex", "AMEX"],
  ["otc", "OTC"],
  ["cboe", "CBOE"],
  ["cboe bzx", "CBOE"],
  ["iex", "IEX"],
]);

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
  finalCall: "Buy",
  finalCallSort: "none",
};
let layoutModeResetTimer = null;
let currentTradingViewKey = "";
let currentMaxExecutionChart = null;
let currentMaxExecutionChartState = null;
let currentMaxExecutionResizeObserver = null;
let currentMaxExecutionRangeId = "1y";
let currentMaxExecutionIntervalId = "1d";
let currentMaxExecutionChartTypeId =
  window.localStorage.getItem("golden-pocket-max-chart-type") || "line";
let currentMaxExecutionDrawingIds = new Set(["fib"]);
let currentMaxExecutionRenderId = 0;
const loadedHistoryChunks = new Set();
const loadingHistoryChunks = new Map();
const fmpHistoryCache = new Map();
const fmpQuoteCache = new Map();
const paperBotMarkPriceCache = new Map();
const decisionModelCache = new Map();
let maxExecutionLiveTimer = null;
let paperBotLiveTimer = null;
let paperBotCloudStateTimer = null;
let paperBotMarketClockTimer = null;
let paperBotLiveRefreshInFlight = false;
let paperBotCloudStateRefreshInFlight = false;
let paperBotMarketStatusSnapshot = null;

const maxExecutionLiveConfig = {
  provider: "fmp",
  proxyBaseUrl: "",
  pollSeconds: 20,
  allowBrowserApiKey: true,
  paperBotSyncBaseUrl: "",
  paperBotSyncToken: "",
  ...(window.GOLDEN_POCKET_LIVE_CONFIG ?? {}),
};
const FMP_DIRECT_BASE_URL = "https://financialmodelingprep.com/stable";
const FMP_LOCAL_KEY_STORAGE_KEY = "golden-pocket-fmp-api-key";
const FMP_LIVE_ENABLED_STORAGE_KEY = "golden-pocket-fmp-live-enabled";
const PAPER_BOT_SYNC_TOKEN_STORAGE_KEY = "golden-pocket-paper-bot-sync-token";
let maxExecutionLiveEnabled =
  window.localStorage.getItem(FMP_LIVE_ENABLED_STORAGE_KEY) === "on";
const PAPER_BOT_STORAGE_KEY = "golden-pocket-paper-bot-v1";
const PAPER_BOT_OVERRIDE_STORAGE_KEY = "golden-pocket-paper-bot-overrides-v1";
const PAPER_BOT_STARTING_CASH = 10000;
const PAPER_BOT_MAX_POSITION_FRACTION = 0.2;
const PAPER_BOT_RISK_FRACTION = 0.01;
const PAPER_BOT_CLOUD_REFRESH_SECONDS = 60;
const PAPER_BOT_MARKET_TIME_ZONE = "America/New_York";
const PAPER_BOT_MARKET_OPEN_MINUTES = 9 * 60 + 30;
const PAPER_BOT_MARKET_CLOSE_MINUTES = 16 * 60;
const PAPER_BOT_MARKET_EARLY_CLOSE_MINUTES = 13 * 60;
const PAPER_BOT_MARKET_HOLIDAYS = {
  "2026-01-01": "New Year's Day",
  "2026-01-19": "Martin Luther King Jr. Day",
  "2026-02-16": "Washington's Birthday",
  "2026-04-03": "Good Friday",
  "2026-05-25": "Memorial Day",
  "2026-06-19": "Juneteenth National Independence Day",
  "2026-07-03": "Independence Day observed",
  "2026-09-07": "Labor Day",
  "2026-11-26": "Thanksgiving Day",
  "2026-12-25": "Christmas Day",
  "2027-01-01": "New Year's Day",
  "2027-01-18": "Martin Luther King Jr. Day",
  "2027-02-15": "Washington's Birthday",
  "2027-03-26": "Good Friday",
  "2027-05-31": "Memorial Day",
  "2027-06-18": "Juneteenth National Independence Day observed",
  "2027-07-05": "Independence Day observed",
  "2027-09-06": "Labor Day",
  "2027-11-25": "Thanksgiving Day",
  "2027-12-24": "Christmas Day observed",
  "2028-01-17": "Martin Luther King Jr. Day",
  "2028-02-21": "Washington's Birthday",
  "2028-04-14": "Good Friday",
  "2028-05-29": "Memorial Day",
  "2028-06-19": "Juneteenth National Independence Day",
  "2028-07-04": "Independence Day",
  "2028-09-04": "Labor Day",
  "2028-11-23": "Thanksgiving Day",
  "2028-12-25": "Christmas Day",
};
const PAPER_BOT_MARKET_EARLY_CLOSES = {
  "2026-11-27": "Day after Thanksgiving",
  "2026-12-24": "Christmas Eve",
  "2027-11-26": "Day after Thanksgiving",
  "2028-07-03": "Independence Day early close",
  "2028-11-24": "Day after Thanksgiving",
};
let paperBotState = loadPaperBotState();
let pendingPaperBotCloseTicker = null;
let currentPaperBotHoldingsRangeId =
  window.localStorage.getItem("golden-pocket-paper-bot-holdings-range") || "1m";
let paperBotHoldingsRenderId = 0;
let currentPaperBotHoldingsPlot = null;

const MAX_EXECUTION_RANGES = [
  { id: "1d", label: "1D", days: 1 },
  { id: "5d", label: "5D", days: 5 },
  { id: "1m", label: "1M", days: 31 },
  { id: "3m", label: "3M", days: 93 },
  { id: "6m", label: "6M", days: 186 },
  { id: "ytd", label: "YTD", ytd: true },
  { id: "1y", label: "1Y", days: 370 },
  { id: "5y", label: "5Y", days: 365 * 5 + 2 },
  { id: "10y", label: "10Y", days: 365 * 10 + 3 },
  { id: "all", label: "All" },
];

const MAX_EXECUTION_CHART_TYPES = [
  { id: "line", label: "Line" },
  { id: "candles", label: "Candles" },
];

const PAPER_BOT_HOLDINGS_RANGES = [
  { id: "1w", label: "1W", days: 7 },
  { id: "1m", label: "1M", days: 31 },
  { id: "3m", label: "3M", days: 93 },
  { id: "1y", label: "1Y", days: 370 },
  { id: "all", label: "All" },
];

const PAPER_BOT_EQUITY_CHART = {
  width: 1600,
  height: 360,
  left: 92,
  right: 1515,
  top: 48,
  bottom: 300,
};

const MAX_EXECUTION_INTERVALS = [
  { id: "1min", label: "1m", fmpInterval: "1min", maxDays: 5 },
  { id: "15min", label: "15m", fmpInterval: "15min", maxDays: 45 },
  { id: "4hour", label: "4H", fmpInterval: "4hour", maxDays: 370 },
  { id: "1d", label: "1D", fmpInterval: "1day", maxDays: 365 * 10 + 3 },
  { id: "1w", label: "1W", fmpInterval: "1day", aggregateInterval: "1w", maxDays: 365 * 10 + 3 },
  { id: "1mo", label: "1M", fmpInterval: "1day", aggregateInterval: "1mo", maxDays: 365 * 10 + 3 },
];

const MAX_EXECUTION_DRAWINGS_STORAGE_KEY = "golden-pocket-max-drawings";
const MAX_EXECUTION_DRAWINGS = [
  {
    id: "fib",
    label: "Fib",
    title: "Fibonacci retracement and extension levels",
    legend: "Fib pocket + extensions",
  },
  {
    id: "elliott",
    label: "Elliott",
    title: "Five-step impulse and pullback map",
    legend: "Elliott wave map",
  },
  {
    id: "ict",
    label: "ICT",
    title: "Liquidity, equilibrium, and fair-value-gap proxies",
    legend: "ICT liquidity + FVG",
  },
];

currentMaxExecutionDrawingIds = new Set(loadMaxExecutionDrawingIds());

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

function normalizeTradingViewTicker(ticker) {
  return String(ticker ?? "")
    .trim()
    .replace(/-/g, ".")
    .replace(/\s+/g, "");
}

function getTradingViewSymbol(company) {
  const ticker = normalizeTradingViewTicker(company?.ticker);
  if (!ticker) {
    return "NASDAQ:AAPL";
  }
  const exchange = String(company?.exchange ?? "").trim().toLowerCase();
  const prefix = TRADINGVIEW_EXCHANGE_PREFIXES.get(exchange);
  return prefix ? `${prefix}:${ticker}` : ticker;
}

function getTradingViewSymbolPath(symbol) {
  const [prefix, ticker = prefix] = symbol.split(":");
  if (!symbol.includes(":")) {
    return ticker.replace(/\./g, "-");
  }
  return `${prefix}-${ticker.replace(/\./g, "-")}`;
}

function makeTradingViewPlaceholder(message) {
  const placeholder = document.createElement("div");
  placeholder.className = "tradingview-chart-placeholder";
  placeholder.innerHTML = `
    <div>
      <strong>Chart unavailable</strong>
      <span>${message}</span>
    </div>
  `;
  return placeholder;
}

function renderTradingViewChart(company, options = {}) {
  if (!tradingViewChartHost || !company) {
    return;
  }

  const symbol = getTradingViewSymbol(company);
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const widgetKey = `${symbol}:${theme}`;
  if (!options.force && currentTradingViewKey === widgetKey) {
    return;
  }
  currentTradingViewKey = widgetKey;

  const symbolPath = getTradingViewSymbolPath(symbol);
  const symbolUrl = `https://www.tradingview.com/symbols/${symbolPath}/`;
  const title = `${company.ticker} interactive chart`;
  if (tradingViewChartTitle) {
    tradingViewChartTitle.textContent = title;
  }
  if (tradingViewChartSubtitle) {
    tradingViewChartSubtitle.textContent =
      `${company.name} | ${company.exchange || "Exchange pending"} | ${company.sector} / ${company.industry}`;
  }
  if (tradingViewSymbolLink) {
    tradingViewSymbolLink.href = symbolUrl;
    tradingViewSymbolLink.textContent = `Open ${company.ticker} in TradingView`;
  }

  const container = document.createElement("div");
  container.className = "tradingview-widget-container";

  const widget = document.createElement("div");
  widget.className = "tradingview-widget-container__widget";
  widget.style.height = "calc(100% - 32px)";
  widget.style.width = "100%";

  const copyright = document.createElement("div");
  copyright.className = "tradingview-widget-copyright";
  const link = document.createElement("a");
  link.href = `${symbolUrl}?utm_source=golden-pocket-market-explorer&utm_medium=widget_new&utm_campaign=advanced-chart`;
  link.target = "_blank";
  link.rel = "noopener nofollow";
  link.textContent = `${company.ticker} chart`;
  copyright.append(link, document.createTextNode(" by TradingView"));

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
  script.textContent = JSON.stringify(
    {
      autosize: true,
      symbol,
      interval: "D",
      timezone: "exchange",
      theme,
      style: "1",
      locale: "en",
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: false,
      calendar: false,
      save_image: false,
      support_host: "https://www.tradingview.com",
    },
    null,
    2,
  );
  script.onerror = () => {
    currentTradingViewKey = "";
    tradingViewChartHost.replaceChildren(
      makeTradingViewPlaceholder("TradingView could not load. Check the internet connection or browser content blockers."),
    );
  };

  container.append(widget, copyright, script);
  tradingViewChartHost.replaceChildren(container);
}

function makeMaxExecutionPlaceholder(message) {
  const placeholder = document.createElement("div");
  placeholder.className = "max-execution-placeholder";
  placeholder.innerHTML = `
    <div>
      <strong>Execution map unavailable</strong>
      <span>${message}</span>
    </div>
  `;
  return placeholder;
}

function getMaxExecutionChartPalette() {
  const isDark = document.documentElement.dataset.theme === "dark";
  return {
    background: isDark ? "#0f1a27" : "#f7f1e8",
    grid: isDark ? "rgba(173, 191, 211, 0.13)" : "rgba(26, 43, 58, 0.12)",
    text: isDark ? "#b9c6d8" : "#3b4655",
    up: "#63d2c8",
    down: "#e86f61",
    wickUp: "#63d2c8",
    wickDown: "#e86f61",
    entry: "#63d2c8",
    add: "#8fbfb7",
    stop: "#e86f61",
    target: "#ffb16c",
    current: "#f2f4fb",
    fib: "#c9d394",
    elliott: "#c9a7ff",
    ict: "#6bb7ff",
    liquidity: "#ff8f70",
  };
}

function renderMaxExecutionRangeSwitcher() {
  if (!maxExecutionRangeSwitcher) {
    return;
  }
  maxExecutionRangeSwitcher.replaceChildren(
    ...MAX_EXECUTION_RANGES.map((range) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "max-execution-range-button";
      button.classList.toggle("is-active", range.id === currentMaxExecutionRangeId);
      button.textContent = range.label;
      button.setAttribute("aria-pressed", String(range.id === currentMaxExecutionRangeId));
      button.addEventListener("click", () => {
        currentMaxExecutionRangeId = range.id;
        renderMaxExecutionRangeSwitcher();
        renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
      });
      return button;
    }),
  );
}

function renderMaxExecutionChartTypeSwitcher() {
  if (!maxExecutionChartTypeSwitcher) {
    return;
  }
  if (!MAX_EXECUTION_CHART_TYPES.some((type) => type.id === currentMaxExecutionChartTypeId)) {
    currentMaxExecutionChartTypeId = "line";
  }
  maxExecutionChartTypeSwitcher.replaceChildren(
    ...MAX_EXECUTION_CHART_TYPES.map((type) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "max-execution-range-button";
      button.classList.toggle("is-active", type.id === currentMaxExecutionChartTypeId);
      button.textContent = type.label;
      button.setAttribute("aria-pressed", String(type.id === currentMaxExecutionChartTypeId));
      button.addEventListener("click", () => {
        currentMaxExecutionChartTypeId = type.id;
        window.localStorage.setItem("golden-pocket-max-chart-type", type.id);
        renderMaxExecutionChartTypeSwitcher();
        renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
      });
      return button;
    }),
  );
}

function renderMaxExecutionIntervalSwitcher() {
  if (!maxExecutionIntervalSwitcher) {
    return;
  }
  maxExecutionIntervalSwitcher.replaceChildren(
    ...MAX_EXECUTION_INTERVALS.map((interval) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "max-execution-range-button";
      button.classList.toggle("is-active", interval.id === currentMaxExecutionIntervalId);
      button.textContent = interval.label;
      button.setAttribute("aria-pressed", String(interval.id === currentMaxExecutionIntervalId));
      button.addEventListener("click", () => {
        currentMaxExecutionIntervalId = interval.id;
        renderMaxExecutionIntervalSwitcher();
        renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
      });
      return button;
    }),
  );
}

function loadMaxExecutionDrawingIds() {
  const allowedIds = new Set(MAX_EXECUTION_DRAWINGS.map((drawing) => drawing.id));
  try {
    const parsed = JSON.parse(window.localStorage.getItem(MAX_EXECUTION_DRAWINGS_STORAGE_KEY) ?? "null");
    const savedIds = Array.isArray(parsed) ? parsed.filter((id) => allowedIds.has(id)) : [];
    return Array.isArray(parsed) ? savedIds : ["fib"];
  } catch (error) {
    return ["fib"];
  }
}

function persistMaxExecutionDrawingIds() {
  window.localStorage.setItem(
    MAX_EXECUTION_DRAWINGS_STORAGE_KEY,
    JSON.stringify([...currentMaxExecutionDrawingIds]),
  );
}

function renderMaxExecutionDrawingSwitcher() {
  if (!maxExecutionDrawingSwitcher) {
    return;
  }
  maxExecutionDrawingSwitcher.replaceChildren(
    ...MAX_EXECUTION_DRAWINGS.map((drawing) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "max-execution-range-button max-execution-drawing-button";
      button.classList.toggle("is-active", currentMaxExecutionDrawingIds.has(drawing.id));
      button.textContent = drawing.label;
      button.title = drawing.title;
      button.setAttribute("aria-pressed", String(currentMaxExecutionDrawingIds.has(drawing.id)));
      button.addEventListener("click", () => {
        if (currentMaxExecutionDrawingIds.has(drawing.id)) {
          currentMaxExecutionDrawingIds.delete(drawing.id);
        } else {
          currentMaxExecutionDrawingIds.add(drawing.id);
        }
        persistMaxExecutionDrawingIds();
        renderMaxExecutionDrawingSwitcher();
        renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
      });
      return button;
    }),
  );
}

function getHistoryIndexForTicker(ticker) {
  const index = window.GOLDEN_POCKET_HISTORY_INDEX;
  if (!index?.chunks || !ticker) {
    return null;
  }
  const normalizedTicker = String(ticker).toUpperCase();
  const chunkKey = index.chunks[normalizedTicker] ?? index.chunks[String(ticker)];
  if (!chunkKey) {
    return null;
  }
  return {
    chunkKey,
    fileName: index.chunkFiles?.[chunkKey] ?? `${chunkKey}.js`,
  };
}

function loadHistoryChunk(chunkKey, fileName) {
  if (window.GOLDEN_POCKET_HISTORY_CHUNKS?.[chunkKey] || loadedHistoryChunks.has(chunkKey)) {
    return Promise.resolve();
  }
  if (loadingHistoryChunks.has(chunkKey)) {
    return loadingHistoryChunks.get(chunkKey);
  }

  const loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const cacheVersion = encodeURIComponent(
      window.GOLDEN_POCKET_HISTORY_INDEX?.generatedAt ?? "local",
    );
    script.src = `./data/history/${fileName}?v=${cacheVersion}`;
    script.async = true;
    script.onload = () => {
      loadedHistoryChunks.add(chunkKey);
      loadingHistoryChunks.delete(chunkKey);
      resolve();
    };
    script.onerror = () => {
      loadingHistoryChunks.delete(chunkKey);
      reject(new Error(`Could not load ${fileName}`));
    };
    document.head.append(script);
  });
  loadingHistoryChunks.set(chunkKey, loadPromise);
  return loadPromise;
}

async function getCompanyPriceHistory(company) {
  const historyLocation = getHistoryIndexForTicker(company?.ticker);
  if (!historyLocation) {
    return null;
  }
  await loadHistoryChunk(historyLocation.chunkKey, historyLocation.fileName);
  return window.GOLDEN_POCKET_HISTORY_CHUNKS?.[historyLocation.chunkKey]?.[company.ticker] ?? null;
}

function getSelectedPaperBotHoldingsRange() {
  return (
    PAPER_BOT_HOLDINGS_RANGES.find((range) => range.id === currentPaperBotHoldingsRangeId) ??
    PAPER_BOT_HOLDINGS_RANGES.find((range) => range.id === "1m")
  );
}

function renderPaperBotHoldingsRangeSwitcher() {
  if (!paperBotHoldingsRanges) {
    return;
  }
  const selectedRange = getSelectedPaperBotHoldingsRange();
  paperBotHoldingsRanges.replaceChildren(
    ...PAPER_BOT_HOLDINGS_RANGES.map((range) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "holdings-chart__range";
      button.classList.toggle("is-active", range.id === selectedRange.id);
      button.textContent = range.label;
      button.setAttribute("aria-pressed", String(range.id === selectedRange.id));
      button.addEventListener("click", () => {
        currentPaperBotHoldingsRangeId = range.id;
        window.localStorage.setItem("golden-pocket-paper-bot-holdings-range", range.id);
        renderPaperBotPanelForCurrentSelection();
      });
      return button;
    }),
  );
}

function getPaperBotHistoryPoints(history) {
  const times = Array.isArray(history?.t) ? history.t : [];
  const closes = Array.isArray(history?.c) ? history.c : [];
  return times
    .map((time, index) => ({
      time: Number(time),
      close: Number(closes[index]),
    }))
    .filter((point) => Number.isFinite(point.time) && Number.isFinite(point.close) && point.close > 0)
    .sort((left, right) => left.time - right.time);
}

function parsePaperBotTimeSeconds(value) {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? Math.floor(parsed / 1000) : null;
}

function getPaperBotLedgerStartTime(snapshot) {
  const times = [
    ...(Array.isArray(paperBotState.trades) ? paperBotState.trades : []).map((trade) => parsePaperBotTimeSeconds(trade?.time)),
    ...snapshot.positions.map((position) => parsePaperBotTimeSeconds(position?.openedAt)),
  ].filter((time) => Number.isFinite(time) && time > 0);
  return times.length ? Math.min(...times) : Math.floor(Date.now() / 1000);
}

function getPaperBotChartStartTime(snapshot) {
  const now = Math.floor(Date.now() / 1000);
  const ledgerStart = getPaperBotLedgerStartTime(snapshot);
  const range = getSelectedPaperBotHoldingsRange();
  return range.days ? Math.max(ledgerStart, now - range.days * 86_400) : ledgerStart;
}

function formatPaperBotAxisDate(seconds) {
  const date = new Date(Number(seconds) * 1000);
  if (Number.isNaN(date.getTime())) {
    return "--";
  }
  const now = new Date();
  const sameYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "2-digit" }),
  });
}

function formatPaperBotTooltipDate(seconds) {
  const date = new Date(Number(seconds) * 1000);
  if (Number.isNaN(date.getTime())) {
    return "--";
  }
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPaperBotTradePrice(trade) {
  const price = Number(trade?.exitPrice ?? trade?.price ?? trade?.entryPrice);
  return Number.isFinite(price) && price > 0 ? price : 0;
}

function getPaperBotTradeValue(trade) {
  const directValue = Number(trade?.value);
  if (Number.isFinite(directValue) && directValue > 0) {
    return directValue;
  }
  return Number(trade?.shares ?? 0) * getPaperBotTradePrice(trade);
}

function makeFallbackPaperBotHoldingsSeries(snapshot) {
  const startTime = getPaperBotChartStartTime(snapshot);
  const now = Math.floor(Date.now() / 1000);
  const startValue = Number(paperBotState.startingCash ?? PAPER_BOT_STARTING_CASH);
  const currentValue = snapshot.equity;
  const pointCount = 12;
  return Array.from({ length: pointCount }, (_, index) => {
    const ratio = index / Math.max(pointCount - 1, 1);
    return {
      time: Math.round(startTime + (now - startTime) * ratio),
      value: startValue + (currentValue - startValue) * ratio,
    };
  });
}

function thinPaperBotSeries(series, maxPoints = 260) {
  if (series.length <= maxPoints) {
    return series;
  }
  return series.filter((point, index) => {
    if (index === 0 || index === series.length - 1) {
      return true;
    }
    return index % Math.ceil(series.length / maxPoints) === 0;
  });
}

function getPaperBotSavedEquityCurve(snapshot, startTime, now) {
  const savedCurve = Array.isArray(paperBotState.equityCurve) ? paperBotState.equityCurve : [];
  const curvePoints = savedCurve
    .map((point) => ({
      time: parsePaperBotTimeSeconds(point?.time ?? point?.generatedAt),
      value: Number(point?.equity ?? point?.value),
    }))
    .filter((point) => Number.isFinite(point.time) && point.time >= startTime && point.time <= now && Number.isFinite(point.value));
  const points = [
    { time: startTime, value: Number(paperBotState.startingCash ?? PAPER_BOT_STARTING_CASH) },
    ...curvePoints,
    { time: now, value: Number(snapshot.equity) },
  ];
  const deduped = new Map();
  points.forEach((point) => {
    if (Number.isFinite(point.time) && Number.isFinite(point.value)) {
      deduped.set(point.time, point);
    }
  });
  return [...deduped.values()].sort((left, right) => left.time - right.time);
}

async function buildPaperBotHoldingsSeries(snapshot) {
  const trades = (Array.isArray(paperBotState.trades) ? paperBotState.trades : [])
    .map((trade) => ({ ...trade, timestamp: parsePaperBotTimeSeconds(trade?.time) }))
    .filter((trade) => Number.isFinite(trade.timestamp) && trade.timestamp > 0)
    .sort((left, right) => left.timestamp - right.timestamp);
  if (!trades.length && !snapshot.positions.length) {
    return [];
  }
  const now = Math.floor(Date.now() / 1000);
  const startTime = getPaperBotChartStartTime(snapshot);
  const savedEquityCurve = getPaperBotSavedEquityCurve(snapshot, startTime, now);
  if (savedEquityCurve.length > 2) {
    return thinPaperBotSeries(savedEquityCurve);
  }
  const allTickers = [
    ...new Set([
      ...trades.map((trade) => getPaperBotTicker(trade)).filter(Boolean),
      ...snapshot.positions.map((position) => getPaperBotTicker(position)).filter(Boolean),
    ]),
  ];
  const shouldUseCachedHistory = now - startTime > 2 * 86_400;
  const historySets = await Promise.all(
    allTickers.map(async (ticker) => {
      const currentPosition = snapshot.positions.find((position) => getPaperBotTicker(position) === ticker);
      if (!shouldUseCachedHistory) {
        return {
          ticker,
          points: currentPosition?.markPrice > 0 ? [{ time: now, close: Number(currentPosition.markPrice) }] : [],
        };
      }
      const company = companyUniverseByTicker.get(ticker) ?? { ticker };
      try {
        const history = await getCompanyPriceHistory(company);
        const points = getPaperBotHistoryPoints(history);
        if (currentPosition?.markPrice > 0) {
          points.push({ time: now, close: Number(currentPosition.markPrice) });
        }
        return {
          ticker,
          points: points.filter((point) => point.time >= startTime - 86_400).sort((left, right) => left.time - right.time),
        };
      } catch (error) {
        return { ticker, points: [] };
      }
    }),
  );

  const usefulHistorySets = historySets.filter((set) => set.points.length > 0);
  if (!trades.length && !usefulHistorySets.length) {
    return makeFallbackPaperBotHoldingsSeries(snapshot);
  }

  const tradePriceHistory = new Map();
  trades.forEach((trade) => {
    const ticker = getPaperBotTicker(trade);
    if (!ticker) {
      return;
    }
    if (!tradePriceHistory.has(ticker)) {
      tradePriceHistory.set(ticker, []);
    }
    tradePriceHistory.get(ticker).push({ time: trade.timestamp, close: getPaperBotTradePrice(trade) });
  });

  const times = [
    startTime,
    now,
    ...trades.map((trade) => trade.timestamp).filter((time) => time >= startTime),
    ...usefulHistorySets.flatMap((set) => set.points.map((point) => point.time).filter((time) => time >= startTime && time <= now)),
  ];
  const uniqueTimes = [...new Set(times)]
    .filter((time) => Number.isFinite(time) && time >= startTime && time <= now)
    .sort((left, right) => left - right);
  if (uniqueTimes.length < 2) {
    return makeFallbackPaperBotHoldingsSeries(snapshot);
  }

  const historyByTicker = new Map(usefulHistorySets.map((set) => [set.ticker, set.points]));
  const priceCursors = new Map();
  const tradePriceCursors = new Map();
  const openShares = new Map();
  let tradeCursor = 0;
  let cash = Number(paperBotState.startingCash ?? PAPER_BOT_STARTING_CASH);

  const getPriceAtTime = (ticker, time, fallback = 0) => {
    const points = historyByTicker.get(ticker) ?? [];
    let cursor = priceCursors.get(ticker) ?? 0;
    while (cursor + 1 < points.length && points[cursor + 1].time <= time) {
      cursor += 1;
    }
    priceCursors.set(ticker, cursor);
    const historicalPoint = points[cursor]?.time <= time ? points[cursor] : null;
    const tradePrices = tradePriceHistory.get(ticker) ?? [];
    let tradePriceCursor = tradePriceCursors.get(ticker) ?? 0;
    while (tradePriceCursor + 1 < tradePrices.length && tradePrices[tradePriceCursor + 1].time <= time) {
      tradePriceCursor += 1;
    }
    tradePriceCursors.set(ticker, tradePriceCursor);
    const tradePoint = tradePrices[tradePriceCursor]?.time <= time ? tradePrices[tradePriceCursor] : null;
    const newestPoint =
      historicalPoint && tradePoint
        ? historicalPoint.time >= tradePoint.time
          ? historicalPoint
          : tradePoint
        : historicalPoint ?? tradePoint;
    const price = Number(newestPoint?.close);
    return Number.isFinite(price) && price > 0 ? price : fallback;
  };

  const applyTrade = (trade) => {
    const ticker = getPaperBotTicker(trade);
    const type = String(trade?.type ?? "").toUpperCase();
    const shares = Number(trade?.shares ?? 0);
    const value = getPaperBotTradeValue(trade);
    if (!ticker || !Number.isFinite(shares) || shares <= 0) {
      return;
    }
    if (type === "BUY") {
      cash -= value;
      openShares.set(ticker, roundPaperBotMoney((openShares.get(ticker) ?? 0) + shares, 6));
    } else if (type === "SELL") {
      cash += value;
      const nextShares = roundPaperBotMoney((openShares.get(ticker) ?? 0) - shares, 6);
      if (nextShares > 0.000001) {
        openShares.set(ticker, nextShares);
      } else {
        openShares.delete(ticker);
      }
    }
  };

  const series = uniqueTimes.map((time) => {
    while (tradeCursor < trades.length && trades[tradeCursor].timestamp <= time) {
      applyTrade(trades[tradeCursor]);
      tradeCursor += 1;
    }
    const openValue = [...openShares.entries()].reduce((sum, [ticker, shares]) => {
      const livePosition = snapshot.positions.find((position) => getPaperBotTicker(position) === ticker);
      const fallback = Number(livePosition?.markPrice ?? livePosition?.entryPrice ?? 0);
      return sum + shares * getPriceAtTime(ticker, time, fallback);
    }, 0);
    return { time, value: cash + openValue };
  });

  const lastPoint = series.at(-1);
  if (lastPoint) {
    lastPoint.value = snapshot.equity;
    lastPoint.time = now;
  }
  return thinPaperBotSeries(series.filter((point) => Number.isFinite(point.value) && point.value > 0));
}

function getNearestPaperBotHoldingsPoint(clientX) {
  if (!currentPaperBotHoldingsPlot?.points?.length || !paperBotHoldingsChartWrap) {
    return null;
  }
  const rect = paperBotHoldingsChartWrap.getBoundingClientRect();
  const ratio = clampNumber((clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
  const targetX =
    currentPaperBotHoldingsPlot.left +
    ratio * (currentPaperBotHoldingsPlot.right - currentPaperBotHoldingsPlot.left);
  return currentPaperBotHoldingsPlot.points.reduce((nearest, point) =>
    Math.abs(point.x - targetX) < Math.abs(nearest.x - targetX) ? point : nearest,
  );
}

function updatePaperBotHoldingsHover(event) {
  const point = getNearestPaperBotHoldingsPoint(event.clientX);
  if (!point || !paperBotHoldingsHoverLine || !paperBotHoldingsHoverDot || !paperBotHoldingsTooltip || !paperBotHoldingsChartWrap) {
    return;
  }
  const leftPercent = (point.x / PAPER_BOT_EQUITY_CHART.width) * 100;
  paperBotHoldingsHoverLine.hidden = false;
  paperBotHoldingsHoverDot.hidden = false;
  paperBotHoldingsTooltip.hidden = false;
  paperBotHoldingsHoverLine.setAttribute("x1", point.x.toFixed(2));
  paperBotHoldingsHoverLine.setAttribute("x2", point.x.toFixed(2));
  paperBotHoldingsHoverLine.setAttribute("y1", String(PAPER_BOT_EQUITY_CHART.top));
  paperBotHoldingsHoverLine.setAttribute("y2", String(PAPER_BOT_EQUITY_CHART.bottom));
  paperBotHoldingsHoverDot.setAttribute("cx", point.x.toFixed(2));
  paperBotHoldingsHoverDot.setAttribute("cy", point.y.toFixed(2));
  paperBotHoldingsTooltip.innerHTML = `
    <strong>${formatMoney(point.value)}</strong>
    <span>${formatPaperBotTooltipDate(point.time)}</span>
  `;
  paperBotHoldingsTooltip.style.left = `${clampNumber(leftPercent, 14, 86)}%`;
  paperBotHoldingsTooltip.style.top = `${clampNumber((point.y / PAPER_BOT_EQUITY_CHART.height) * 100, 14, 74)}%`;
}

function hidePaperBotHoldingsHover() {
  if (paperBotHoldingsHoverLine) {
    paperBotHoldingsHoverLine.hidden = true;
  }
  if (paperBotHoldingsHoverDot) {
    paperBotHoldingsHoverDot.hidden = true;
  }
  if (paperBotHoldingsTooltip) {
    paperBotHoldingsTooltip.hidden = true;
  }
}

function renderPaperBotHoldingsAxes(min, max, series) {
  const midpoint = min + (max - min) / 2;
  if (paperBotHoldingsYMax) {
    paperBotHoldingsYMax.textContent = formatCompactNumber(max, { currency: true });
  }
  if (paperBotHoldingsYMid) {
    paperBotHoldingsYMid.textContent = formatCompactNumber(midpoint, { currency: true });
  }
  if (paperBotHoldingsYMin) {
    paperBotHoldingsYMin.textContent = formatCompactNumber(min, { currency: true });
  }
  if (paperBotHoldingsXStart) {
    paperBotHoldingsXStart.textContent = series.length ? formatPaperBotAxisDate(series[0].time) : "--";
  }
  if (paperBotHoldingsXEnd) {
    paperBotHoldingsXEnd.textContent = series.length ? formatPaperBotAxisDate(series.at(-1).time) : "--";
  }
}

function clearPaperBotHoldingsAxes() {
  [paperBotHoldingsYMax, paperBotHoldingsYMid, paperBotHoldingsYMin, paperBotHoldingsXStart, paperBotHoldingsXEnd].forEach((element) => {
    if (element) {
      element.textContent = "--";
    }
  });
}

function makeSmoothSvgPath(points) {
  if (!points.length) {
    return "";
  }
  if (points.length === 2) {
    return `M${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)} L${points[1].x.toFixed(2)} ${points[1].y.toFixed(2)}`;
  }
  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    }
    const previous = points[index - 1];
    const next = points[index + 1] ?? point;
    const previousPrevious = points[index - 2] ?? previous;
    const cp1x = previous.x + (point.x - previousPrevious.x) / 6;
    const cp1y = previous.y + (point.y - previousPrevious.y) / 6;
    const cp2x = point.x - (next.x - previous.x) / 6;
    const cp2y = point.y - (next.y - previous.y) / 6;
    return `${path} C${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, "");
}

function renderPaperBotHoldingsSvg(series, snapshot) {
  if (!paperBotHoldingsPath || !paperBotHoldingsFill || !paperBotHoldingsDot || !paperBotHoldingsEmpty) {
    return;
  }
  if (series.length < 2) {
    paperBotHoldingsPath.removeAttribute("d");
    paperBotHoldingsFill.removeAttribute("d");
    paperBotHoldingsDot.removeAttribute("cx");
    paperBotHoldingsDot.removeAttribute("cy");
    hidePaperBotHoldingsHover();
    clearPaperBotHoldingsAxes();
    currentPaperBotHoldingsPlot = null;
    paperBotHoldingsEmpty.hidden = false;
    return;
  }

  const values = series.map((point) => Number(point.value)).filter(Number.isFinite);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = Math.max((maxValue - minValue) * 0.18, Math.max(maxValue, 1) * 0.004);
  const min = minValue - padding;
  const max = maxValue + padding;
  const { left, right, top, bottom } = PAPER_BOT_EQUITY_CHART;
  const valueRange = Math.max(max - min, 1);
  const times = series.map((point) => Number(point.time)).filter(Number.isFinite);
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const timeRange = Math.max(maxTime - minTime, 1);
  const points = series.map((point) => {
    const time = Number(point.time);
    return {
      ...point,
      x: left + ((time - minTime) / timeRange) * (right - left),
      y: bottom - ((Number(point.value) - min) / valueRange) * (bottom - top),
    };
  });
  const linePath = makeSmoothSvgPath(points);
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  paperBotHoldingsPath.setAttribute("d", linePath);
  paperBotHoldingsFill.setAttribute(
    "d",
    `${linePath} L${lastPoint.x.toFixed(2)} ${bottom} L${firstPoint.x.toFixed(2)} ${bottom} Z`,
  );
  paperBotHoldingsDot.setAttribute("cx", lastPoint.x.toFixed(2));
  paperBotHoldingsDot.setAttribute("cy", lastPoint.y.toFixed(2));
  paperBotHoldingsEmpty.hidden = true;
  renderPaperBotHoldingsAxes(minValue, maxValue, series);
  currentPaperBotHoldingsPlot = { points, left, right, top, bottom };
}

function renderPaperBotHoldingsChart(snapshot) {
  renderPaperBotHoldingsRangeSwitcher();
  const totalPnl = snapshot.equity - PAPER_BOT_STARTING_CASH;
  const pnlTone = totalPnl > 0 ? "positive" : totalPnl < 0 ? "negative" : "neutral";
  if (paperBotEquityChange) {
    paperBotEquityChange.textContent = `${formatSignedMoney(totalPnl)} | ${formatPercent(snapshot.returnPct)}`;
    paperBotEquityChange.dataset.tone = pnlTone;
  }
  if (paperBotHoldingsValue) {
    paperBotHoldingsValue.textContent = formatMoney(snapshot.equity);
  }
  if (paperBotHoldingsReturn) {
    paperBotHoldingsReturn.textContent = `${formatSignedMoney(totalPnl)} | ${formatPercent(snapshot.returnPct)}`;
    paperBotHoldingsReturn.dataset.tone = pnlTone;
  }
  if (paperBotHoldingsChartWrap) {
    paperBotHoldingsChartWrap.dataset.tone = pnlTone;
    paperBotHoldingsChartWrap.classList.toggle("is-loading", snapshot.positions.length > 0);
  }

  const renderId = ++paperBotHoldingsRenderId;
  buildPaperBotHoldingsSeries(snapshot)
    .then((series) => {
      if (renderId !== paperBotHoldingsRenderId) {
        return;
      }
      renderPaperBotHoldingsSvg(series, snapshot);
    })
    .catch(() => {
      if (renderId !== paperBotHoldingsRenderId) {
        return;
      }
      renderPaperBotHoldingsSvg(makeFallbackPaperBotHoldingsSeries(snapshot), snapshot);
    })
    .finally(() => {
      if (renderId === paperBotHoldingsRenderId && paperBotHoldingsChartWrap) {
        paperBotHoldingsChartWrap.classList.remove("is-loading");
      }
    });
}

function getSelectedMaxExecutionInterval() {
  return (
    MAX_EXECUTION_INTERVALS.find((interval) => interval.id === currentMaxExecutionIntervalId) ??
    MAX_EXECUTION_INTERVALS.find((interval) => interval.id === "1d")
  );
}

function getSelectedMaxExecutionRange() {
  return (
    MAX_EXECUTION_RANGES.find((range) => range.id === currentMaxExecutionRangeId) ??
    MAX_EXECUTION_RANGES.find((range) => range.id === "1y")
  );
}

function getFmpProxyBaseUrl() {
  return String(maxExecutionLiveConfig.proxyBaseUrl || "").replace(/\/+$/, "");
}

function getLocalFmpApiKey() {
  if (!maxExecutionLiveConfig.allowBrowserApiKey) {
    return "";
  }
  return window.localStorage.getItem(FMP_LOCAL_KEY_STORAGE_KEY) || "";
}

function hasFmpLiveSource() {
  return Boolean(getFmpProxyBaseUrl() || getLocalFmpApiKey());
}

function hasPaperBotLiveSource() {
  return Boolean(getFmpProxyBaseUrl() || getLocalFmpApiKey());
}

function getLivePollSeconds() {
  return clampNumber(Number(maxExecutionLiveConfig.pollSeconds) || 20, 5, 300);
}

function setMaxLiveEnabled(enabled) {
  maxExecutionLiveEnabled = enabled;
  window.localStorage.setItem(FMP_LIVE_ENABLED_STORAGE_KEY, enabled ? "on" : "off");
  renderMaxLiveStatus();
  schedulePaperBotLiveRefresh({ immediate: true });
}

function renderMaxLiveStatus(status = {}) {
  if (!maxLiveStatus) {
    return;
  }
  const hasSource = hasFmpLiveSource();
  let state = "off";
  let text = "Live off";
  if (status.error) {
    state = "error";
    text = "Live error";
  } else if (maxExecutionLiveEnabled && !hasSource) {
    state = "missing";
    text = "FMP key needed";
  } else if (maxExecutionLiveEnabled && hasSource) {
    state = "on";
    text = status.text || "FMP live";
  } else if (hasSource) {
    state = "on";
    text = "FMP ready";
  }
  maxLiveStatus.dataset.state = state;
  maxLiveStatus.textContent = text;
  if (maxLiveToggle) {
    maxLiveToggle.classList.toggle("is-active", maxExecutionLiveEnabled);
    maxLiveToggle.textContent = maxExecutionLiveEnabled ? "Live on" : "Live feed";
  }
}

function connectLocalFmpKey() {
  if (!maxExecutionLiveConfig.allowBrowserApiKey) {
    window.alert("Browser API-key storage is disabled. Add a secure FMP proxy URL in live_config.js instead.");
    return;
  }
  const currentKey = getLocalFmpApiKey();
  const enteredKey = window.prompt(
    "Paste your FMP API key for this browser only. Leave blank and press OK to remove the saved local key.",
    currentKey ? "saved" : "",
  );
  if (enteredKey === null) {
    return;
  }
  const normalizedKey = enteredKey.trim();
  if (!normalizedKey) {
    window.localStorage.removeItem(FMP_LOCAL_KEY_STORAGE_KEY);
    fmpHistoryCache.clear();
    fmpQuoteCache.clear();
    paperBotMarkPriceCache.clear();
    renderMaxLiveStatus();
    renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
    schedulePaperBotLiveRefresh();
    return;
  }
  if (normalizedKey !== "saved") {
    window.localStorage.setItem(FMP_LOCAL_KEY_STORAGE_KEY, normalizedKey);
  }
  setMaxLiveEnabled(true);
  fmpHistoryCache.clear();
  fmpQuoteCache.clear();
  paperBotMarkPriceCache.clear();
  renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
  schedulePaperBotLiveRefresh({ immediate: true });
}

function buildFmpRequestUrl(kind, params = {}) {
  const proxyBaseUrl = getFmpProxyBaseUrl();
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      searchParams.set(key, value);
    }
  });

  if (proxyBaseUrl) {
    return `${proxyBaseUrl}/${kind}?${searchParams.toString()}`;
  }

  const localKey = getLocalFmpApiKey();
  if (!localKey) {
    return null;
  }
  searchParams.set("apikey", localKey);
  if (kind === "batch-quote") {
    return `${FMP_DIRECT_BASE_URL}/batch-quote-short?${searchParams.toString()}`;
  }
  if (kind === "quote") {
    return `${FMP_DIRECT_BASE_URL}/quote-short?${searchParams.toString()}`;
  }
  const interval = searchParams.get("interval");
  searchParams.delete("interval");
  if (interval === "1day") {
    return `${FMP_DIRECT_BASE_URL}/historical-price-eod/full?${searchParams.toString()}`;
  }
  return `${FMP_DIRECT_BASE_URL}/historical-chart/${interval}?${searchParams.toString()}`;
}

async function fetchJson(url, timeoutMs = 15000) {
  return fetchJsonRequest(url, { headers: { Accept: "application/json" } }, timeoutMs);
}

async function fetchJsonRequest(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: options.headers ?? { Accept: "application/json" },
      body: options.body,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

function normalizeFmpRows(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.historical)) {
    return payload.historical;
  }
  return [];
}

function getFmpTimestamp(value) {
  if (!value) {
    return null;
  }
  const text = String(value).trim();
  const parsed = Date.parse(text.includes("T") ? text : `${text.replace(" ", "T")}Z`);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return Math.floor(parsed / 1000);
}

function parseFmpHistory(payload) {
  const rows = normalizeFmpRows(payload);
  const parsedRows = rows
    .map((row) => {
      const time = getFmpTimestamp(row.date);
      const open = Number(row.open);
      const high = Number(row.high);
      const low = Number(row.low);
      const close = Number(row.close);
      if (![time, open, high, low, close].every(Number.isFinite)) {
        return null;
      }
      return {
        time,
        open,
        high,
        low,
        close,
        volume: Number(row.volume),
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.time - right.time);

  if (parsedRows.length < 2) {
    return null;
  }

  return {
    t: parsedRows.map((row) => row.time),
    o: parsedRows.map((row) => row.open),
    h: parsedRows.map((row) => row.high),
    l: parsedRows.map((row) => row.low),
    c: parsedRows.map((row) => row.close),
    v: parsedRows.map((row) => (Number.isFinite(row.volume) ? row.volume : 0)),
    source: "fmp",
  };
}

function getIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function getRangeDaysForFmp(intervalMeta, rangeMeta) {
  if (rangeMeta?.ytd) {
    const now = new Date();
    const yearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    const days = Math.ceil((Date.now() - yearStart.getTime()) / 86400000);
    return Math.min(days, intervalMeta.maxDays ?? days);
  }
  if (!rangeMeta || rangeMeta.id === "all") {
    return intervalMeta.maxDays ?? 370;
  }
  return Math.min(rangeMeta.days ?? 370, intervalMeta.maxDays ?? rangeMeta.days ?? 370);
}

function getFmpHistoryWindow(intervalMeta, rangeMeta) {
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(to.getUTCDate() - getRangeDaysForFmp(intervalMeta, rangeMeta));
  return {
    from: getIsoDate(from),
    to: getIsoDate(to),
  };
}

async function fetchFmpIntradayHistory(company, intervalMeta, rangeMeta) {
  if (!company?.ticker || !intervalMeta?.fmpInterval || !hasFmpLiveSource()) {
    return null;
  }
  const { from, to } = getFmpHistoryWindow(intervalMeta, rangeMeta);
  const cacheKey = `${company.ticker}:${intervalMeta.fmpInterval}:${from}:${to}`;
  const cached = fmpHistoryCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < getLivePollSeconds() * 1000) {
    return cached.history;
  }

  const url = buildFmpRequestUrl("history", {
    symbol: company.ticker,
    interval: intervalMeta.fmpInterval,
    from,
    to,
  });
  if (!url) {
    return null;
  }
  const payload = await fetchJson(url);
  const history = parseFmpHistory(payload);
  if (history) {
    fmpHistoryCache.set(cacheKey, { history, fetchedAt: Date.now() });
  }
  return history;
}

function parseFmpQuote(payload) {
  const row = normalizeFmpRows(payload)[0] ?? payload;
  const price = Number(row?.price ?? row?.bidPrice ?? row?.askPrice);
  if (!Number.isFinite(price)) {
    return null;
  }
  return {
    price,
    volume: Number(row.volume),
    fetchedAt: Date.now(),
  };
}

async function fetchFmpQuote(company) {
  if (!company?.ticker || !hasFmpLiveSource()) {
    return null;
  }
  const cacheKey = String(company.ticker).toUpperCase();
  const cached = fmpQuoteCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < getLivePollSeconds() * 1000) {
    return cached;
  }
  const url = buildFmpRequestUrl("quote", { symbol: company.ticker });
  if (!url) {
    return null;
  }
  const quote = parseFmpQuote(await fetchJson(url, 10000));
  if (quote) {
    fmpQuoteCache.set(cacheKey, quote);
  }
  return quote;
}

function parseFmpQuoteRows(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  if (payload && typeof payload === "object") {
    return [payload];
  }
  return [];
}

async function fetchFmpBatchQuotes(tickers) {
  const symbols = [...new Set(tickers.map((ticker) => String(ticker || "").toUpperCase()).filter(Boolean))];
  if (!symbols.length || !hasPaperBotLiveSource()) {
    return new Map();
  }
  const cacheWindowMs = Math.max(4000, getLivePollSeconds() * 1000 * 0.75);
  const missingSymbols = symbols.filter((symbol) => {
    const cached = fmpQuoteCache.get(symbol);
    return !cached || Date.now() - cached.fetchedAt >= cacheWindowMs;
  });
  if (!missingSymbols.length) {
    return new Map(symbols.map((symbol) => [symbol, fmpQuoteCache.get(symbol)]).filter(([, quote]) => quote?.price));
  }

  const url = buildFmpRequestUrl("batch-quote", { symbols: missingSymbols.join(",") });
  if (!url) {
    return new Map();
  }

  const payload = await fetchJson(url, 12000);
  const fetchedAt = Date.now();
  parseFmpQuoteRows(payload).forEach((row) => {
    const symbol = String(row?.symbol ?? row?.ticker ?? "").toUpperCase();
    const price = Number(row?.price ?? row?.bidPrice ?? row?.askPrice);
    if (!symbol || !Number.isFinite(price) || price <= 0) {
      return;
    }
    fmpQuoteCache.set(symbol, {
      price,
      volume: Number(row.volume),
      fetchedAt,
    });
  });
  const unresolvedSymbols = missingSymbols.filter((symbol) => !fmpQuoteCache.get(symbol)?.price);
  if (unresolvedSymbols.length) {
    await Promise.all(
      unresolvedSymbols.map(async (symbol) => {
        const quote = await fetchFmpQuote({ ticker: symbol });
        if (quote?.price) {
          fmpQuoteCache.set(symbol, quote);
        }
      }),
    );
  }
  return new Map(symbols.map((symbol) => [symbol, fmpQuoteCache.get(symbol)]).filter(([, quote]) => quote?.price));
}

function mergeLiveQuoteIntoHistory(history, liveQuote) {
  if (!history || !liveQuote?.price) {
    return history;
  }

  const result = {
    ...history,
    t: [...(history.t ?? [])],
    c: [...(history.c ?? [])],
    o: Array.isArray(history.o) ? [...history.o] : undefined,
    h: Array.isArray(history.h) ? [...history.h] : undefined,
    l: Array.isArray(history.l) ? [...history.l] : undefined,
    v: Array.isArray(history.v) ? [...history.v] : undefined,
  };
  const latestTime = Math.floor(liveQuote.fetchedAt / 1000);
  const lastIndex = result.t.length - 1;
  if (lastIndex < 0) {
    return history;
  }
  const lastTime = Number(result.t[lastIndex]);
  const sameDailyBar =
    currentMaxExecutionIntervalId === "1d" &&
    new Date(lastTime * 1000).toISOString().slice(0, 10) === new Date(liveQuote.fetchedAt).toISOString().slice(0, 10);

  if (sameDailyBar || latestTime - lastTime < 60 * 60 * 6) {
    result.c[lastIndex] = liveQuote.price;
    if (result.h?.length === result.t.length) {
      result.h[lastIndex] = Math.max(Number(result.h[lastIndex]), liveQuote.price);
    }
    if (result.l?.length === result.t.length) {
      result.l[lastIndex] = Math.min(Number(result.l[lastIndex]), liveQuote.price);
    }
  } else {
    result.t.push(latestTime);
    result.c.push(liveQuote.price);
    if (result.o?.length === lastIndex + 1 && result.h?.length === lastIndex + 1 && result.l?.length === lastIndex + 1) {
      result.o.push(liveQuote.price);
      result.h.push(liveQuote.price);
      result.l.push(liveQuote.price);
    }
    if (result.v?.length === lastIndex + 1) {
      result.v.push(Number.isFinite(liveQuote.volume) ? liveQuote.volume : 0);
    }
  }
  return result;
}

function getPointClose(point) {
  if (!point) {
    return null;
  }
  const value = "close" in point ? point.close : point.value;
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function getPointHigh(point) {
  if (!point) {
    return null;
  }
  const value = "high" in point ? point.high : getPointClose(point);
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function getPointLow(point) {
  if (!point) {
    return null;
  }
  const value = "low" in point ? point.low : getPointClose(point);
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function getPointAtRatio(data, ratio) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  const index = clampNumber(Math.round((data.length - 1) * ratio), 0, data.length - 1);
  return data[index];
}

function findExtremePoint(data, getter, comparator) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  return data.reduce((best, point) => {
    const value = getter(point);
    const bestValue = getter(best);
    if (!Number.isFinite(value)) {
      return best;
    }
    if (!best || !Number.isFinite(bestValue) || comparator(value, bestValue)) {
      return point;
    }
    return best;
  }, null);
}

function getPointOpen(point) {
  if (!point) {
    return null;
  }
  const value = "open" in point ? point.open : getPointClose(point);
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function getPointRange(point) {
  const high = getPointHigh(point);
  const low = getPointLow(point);
  if (!Number.isFinite(high) || !Number.isFinite(low)) {
    return 0;
  }
  return Math.max(high - low, 0);
}

function getPointPriceForPivot(point, type) {
  return type === "high" ? getPointHigh(point) : getPointLow(point);
}

function findMaxExecutionPivots(data) {
  if (!Array.isArray(data) || data.length < 5) {
    return [];
  }
  const lookaround = clampNumber(Math.floor(data.length / 36), 2, 8);
  const pivots = [];
  for (let index = lookaround; index < data.length - lookaround; index += 1) {
    const point = data[index];
    const high = getPointHigh(point);
    const low = getPointLow(point);
    if (!Number.isFinite(high) || !Number.isFinite(low)) {
      continue;
    }
    const windowSlice = data.slice(index - lookaround, index + lookaround + 1);
    const isHigh = windowSlice.every((candidate) => high >= (getPointHigh(candidate) ?? -Infinity));
    const isLow = windowSlice.every((candidate) => low <= (getPointLow(candidate) ?? Infinity));
    if (isHigh) {
      pivots.push({ type: "high", point, time: point.time, price: high });
    }
    if (isLow) {
      pivots.push({ type: "low", point, time: point.time, price: low });
    }
  }
  return pivots
    .sort((left, right) => Number(left.time) - Number(right.time))
    .filter((pivot, index, items) => {
      const previous = items[index - 1];
      return !previous || previous.time !== pivot.time || previous.type !== pivot.type;
    });
}

function compressAlternatingPivots(pivots) {
  return pivots.reduce((items, pivot) => {
    const previous = items.at(-1);
    if (!previous || previous.type !== pivot.type) {
      items.push(pivot);
      return items;
    }
    const pivotIsMoreExtreme =
      pivot.type === "high" ? pivot.price >= previous.price : pivot.price <= previous.price;
    if (pivotIsMoreExtreme) {
      items[items.length - 1] = pivot;
    }
    return items;
  }, []);
}

function getFallbackWavePoints(data) {
  const ratios = [0.12, 0.3, 0.48, 0.66, 0.84];
  return ratios
    .map((ratio, index) => {
      const point = getPointAtRatio(data, ratio);
      if (!point?.time) {
        return null;
      }
      return {
        point,
        time: point.time,
        price: getPointClose(point) ?? 0,
        type: index % 2 === 0 ? "high" : "low",
      };
    })
    .filter(Boolean);
}

function findMaxExecutionFvg(data) {
  if (!Array.isArray(data) || data.length < 3) {
    return null;
  }
  const startIndex = Math.max(2, data.length - 120);
  for (let index = data.length - 1; index >= startIndex; index -= 1) {
    const leftHigh = getPointHigh(data[index - 2]);
    const leftLow = getPointLow(data[index - 2]);
    const currentHigh = getPointHigh(data[index]);
    const currentLow = getPointLow(data[index]);
    if (
      Number.isFinite(leftHigh) &&
      Number.isFinite(currentLow) &&
      currentLow > leftHigh
    ) {
      return {
        type: "bullish",
        low: leftHigh,
        high: currentLow,
        time: data[index].time,
      };
    }
    if (
      Number.isFinite(leftLow) &&
      Number.isFinite(currentHigh) &&
      currentHigh < leftLow
    ) {
      return {
        type: "bearish",
        low: currentHigh,
        high: leftLow,
        time: data[index].time,
      };
    }
  }
  return null;
}

function buildMaxExecutionStructure(data, fallbackLevels) {
  const cleanData = Array.isArray(data)
    ? data.filter((point) => point?.time && Number.isFinite(getPointClose(point)))
    : [];
  if (cleanData.length < 3) {
    return null;
  }
  const firstClose = getPointClose(cleanData.at(0)) ?? fallbackLevels?.price ?? 0;
  const lastClose = getPointClose(cleanData.at(-1)) ?? firstClose;
  const returnPct = firstClose > 0 ? ((lastClose - firstClose) / firstClose) * 100 : 0;
  const trend =
    returnPct >= 2
      ? "up"
      : returnPct <= -2
        ? "down"
        : lastClose >= firstClose
          ? "neutral-up"
          : "neutral-down";
  const direction = trend.includes("down") ? "down" : "up";
  const pivots = compressAlternatingPivots(findMaxExecutionPivots(cleanData));
  const recentData = cleanData.slice(Math.max(0, cleanData.length - Math.min(120, cleanData.length)));
  const highPoint = findExtremePoint(recentData, getPointHigh, (left, right) => left > right);
  const lowPoint = findExtremePoint(recentData, getPointLow, (left, right) => left < right);
  let anchorLow = lowPoint;
  let anchorHigh = highPoint;

  if (direction === "up") {
    const highestPivot =
      [...pivots].reverse().find((pivot) => pivot.type === "high") ??
      (anchorHigh ? { point: anchorHigh, time: anchorHigh.time, price: getPointHigh(anchorHigh), type: "high" } : null);
    const lowBeforeHigh =
      highestPivot &&
      [...pivots]
        .reverse()
        .find((pivot) => pivot.type === "low" && Number(pivot.time) < Number(highestPivot.time));
    anchorHigh = highestPivot?.point ?? anchorHigh;
    anchorLow = lowBeforeHigh?.point ?? anchorLow;
  } else {
    const lowestPivot =
      [...pivots].reverse().find((pivot) => pivot.type === "low") ??
      (anchorLow ? { point: anchorLow, time: anchorLow.time, price: getPointLow(anchorLow), type: "low" } : null);
    const highBeforeLow =
      lowestPivot &&
      [...pivots]
        .reverse()
        .find((pivot) => pivot.type === "high" && Number(pivot.time) < Number(lowestPivot.time));
    anchorLow = lowestPivot?.point ?? anchorLow;
    anchorHigh = highBeforeLow?.point ?? anchorHigh;
  }

  const anchorLowPrice = getPointLow(anchorLow) ?? fallbackLevels?.low ?? Math.min(firstClose, lastClose);
  const anchorHighPrice = getPointHigh(anchorHigh) ?? fallbackLevels?.high ?? Math.max(firstClose, lastClose);
  const low = Math.min(anchorLowPrice, anchorHighPrice);
  const high = Math.max(anchorLowPrice, anchorHighPrice);
  const range = Math.max(high - low, Math.abs(lastClose) * 0.01, 0.01);
  const fibSource = direction === "up" ? high : low;
  const fibSign = direction === "up" ? -1 : 1;
  const fibLevel = (ratio) => fibSource + fibSign * range * ratio;
  const extensionSource = direction === "up" ? high : low;
  const extensionSign = direction === "up" ? 1 : -1;
  const fvg = findMaxExecutionFvg(cleanData);
  const wavePoints = compressAlternatingPivots(pivots).slice(-5);

  return {
    trend,
    direction,
    firstClose,
    lastClose,
    returnPct,
    highPoint,
    lowPoint,
    anchorLow,
    anchorHigh,
    low,
    high,
    range,
    equilibrium: low + range * 0.5,
    fvg,
    wavePoints: wavePoints.length >= 3 ? wavePoints : getFallbackWavePoints(cleanData),
    fibLevels: [
      ["Fib 23.6", fibLevel(0.236)],
      ["Fib 38.2", fibLevel(0.382)],
      ["Fib 50.0", fibLevel(0.5)],
      ["Fib 61.8", fibLevel(0.618)],
      ["Fib 78.6", fibLevel(0.786)],
      ["Fib 127.2", extensionSource + extensionSign * range * 0.272],
      ["Fib 161.8", extensionSource + extensionSign * range * 0.618],
    ],
  };
}

function buildDynamicTradeLevels(baseLevels, structure) {
  if (!baseLevels || !structure?.range) {
    return baseLevels;
  }
  const price = baseLevels.price;
  const { low, high, range, direction } = structure;
  const bullish = direction === "up";
  const entryLow = bullish ? high - range * 0.618 : low + range * 0.382;
  const entryHigh = bullish ? high - range * 0.382 : low + range * 0.618;
  const addLow = bullish ? high - range * 0.786 : low + range * 0.236;
  const addHigh = bullish ? entryLow : entryLow;
  const stop = Math.max(0.01, low - range * 0.08);
  const target1 = bullish ? high : low + range * 0.786;
  const target2 = bullish ? high + range * 0.272 : high;
  const target3 = bullish ? high + range * 0.618 : high + range * 0.272;
  const normalizedEntryLow = Math.min(entryLow, entryHigh);
  const normalizedEntryHigh = Math.max(entryLow, entryHigh);
  const entryMid = (normalizedEntryLow + normalizedEntryHigh) / 2;
  const rewardRisk = (target2 - entryMid) / Math.max(entryMid - stop, price * 0.01);
  const position =
    price >= normalizedEntryLow && price <= normalizedEntryHigh
      ? "Inside selected-frame entry zone"
      : price > normalizedEntryHigh
        ? "Above selected-frame entry"
        : "Below selected-frame entry";

  return {
    ...baseLevels,
    low,
    high,
    entryLow: normalizedEntryLow,
    entryHigh: normalizedEntryHigh,
    addLow: Math.min(addLow, addHigh),
    addHigh: Math.max(addLow, addHigh),
    stop,
    target1,
    target2,
    target3,
    rewardRisk,
    position,
  };
}

function buildBaseMaxExecutionMarkers(lastTime, levels, palette) {
  return [
    {
      time: lastTime,
      position: "inBar",
      color: palette.current,
      shape: "circle",
      text: "Current",
    },
  ];
}

function buildElliottWaveMarkers(data, palette, structure = null) {
  if (!currentMaxExecutionDrawingIds.has("elliott") || !Array.isArray(data) || data.length < 5) {
    return [];
  }
  const bullish = structure?.direction !== "down";
  const usedTimes = new Set();
  const wavePoints =
    structure?.wavePoints?.length >= 3 ? structure.wavePoints.slice(-5) : getFallbackWavePoints(data);

  return wavePoints
    .map((pivot, index) => {
      const point = pivot.point ?? pivot;
      if (!point?.time || usedTimes.has(point.time)) {
        return null;
      }
      usedTimes.add(point.time);
      const impulseWave = bullish ? pivot.type !== "low" : pivot.type !== "high";
      return {
        time: point.time,
        position: bullish === impulseWave ? "aboveBar" : "belowBar",
        color: impulseWave ? palette.elliott : palette.fib,
        shape: impulseWave ? "arrowUp" : "circle",
        text: `Wave ${index + 1}`,
      };
    })
    .filter(Boolean);
}

function buildIctMarkers(data, levels, palette, structure = null) {
  if (!currentMaxExecutionDrawingIds.has("ict") || !Array.isArray(data) || data.length < 3) {
    return [];
  }
  const lookbackData = data.slice(Math.max(0, data.length - 80));
  const highPoint =
    structure?.highPoint ?? findExtremePoint(lookbackData, getPointHigh, (left, right) => left > right);
  const lowPoint =
    structure?.lowPoint ?? findExtremePoint(lookbackData, getPointLow, (left, right) => left < right);
  const fvg = structure?.fvg;
  const lastTime = data.at(-1)?.time;
  return [
    highPoint?.time
      ? {
          time: highPoint.time,
          position: "aboveBar",
          color: palette.liquidity,
          shape: "circle",
          text: "BSL",
        }
      : null,
    lowPoint?.time
      ? {
          time: lowPoint.time,
          position: "belowBar",
          color: palette.liquidity,
          shape: "circle",
          text: "SSL",
        }
      : null,
    fvg?.time
      ? {
          time: fvg.time,
          position: fvg.type === "bullish" ? "belowBar" : "aboveBar",
          color: palette.ict,
          shape: "circle",
          text: `${fvg.type === "bullish" ? "Bull" : "Bear"} FVG`,
        }
      : null,
    lastTime
      ? {
          time: lastTime,
          position: levels.price <= levels.entryHigh ? "belowBar" : "aboveBar",
          color: palette.ict,
          shape: "arrowUp",
          text: "ICT entry",
        }
      : null,
  ].filter(Boolean);
}

function buildMaxExecutionMarkers(lastTime, levels, palette, data = [], structure = null) {
  return [
    ...buildBaseMaxExecutionMarkers(lastTime, levels, palette),
    ...buildElliottWaveMarkers(data, palette, structure),
    ...buildIctMarkers(data, levels, palette, structure),
  ].sort((left, right) => Number(left.time) - Number(right.time));
}

function getLiveBucketTime(fetchedAt, intervalMeta) {
  const seconds = Math.floor(Number(fetchedAt) / 1000);
  if (!Number.isFinite(seconds)) {
    return null;
  }
  if (intervalMeta?.id === "1min") {
    return Math.floor(seconds / 60) * 60;
  }
  if (intervalMeta?.id === "15min") {
    return Math.floor(seconds / 900) * 900;
  }
  if (intervalMeta?.id === "4hour") {
    return Math.floor(seconds / 14400) * 14400;
  }
  if (intervalMeta?.id === "1w") {
    return getMaxExecutionBucketTime(seconds, "1w");
  }
  if (intervalMeta?.id === "1mo") {
    return getMaxExecutionBucketTime(seconds, "1mo");
  }
  const date = new Date(seconds * 1000);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;
}

function setMaxExecutionMarkers(priceSeries, lastTime, levels, palette, data = [], structure = null) {
  if (!priceSeries || !lastTime) {
    return;
  }
  priceSeries.setMarkers(buildMaxExecutionMarkers(lastTime, levels, palette, data, structure));
}

function createCurrentPriceLine(priceSeries, levels, palette) {
  return priceSeries.createPriceLine({
    price: levels.price,
    color: palette.current,
    lineWidth: 2,
    lineStyle: window.LightweightCharts.LineStyle.Solid,
    axisLabelVisible: true,
    title: "Current",
  });
}

function createMaxExecutionPriceLine(priceSeries, { title, price, color, lineStyle, lineWidth = 1 }) {
  const numericPrice = Number(price);
  if (!priceSeries || !Number.isFinite(numericPrice)) {
    return null;
  }
  return priceSeries.createPriceLine({
    price: numericPrice,
    color,
    lineWidth,
    lineStyle,
    axisLabelVisible: true,
    title,
  });
}

function createMaxExecutionDrawingPriceLines(priceSeries, levels, palette, structure = null) {
  const lineStyle = window.LightweightCharts.LineStyle;
  const range = Math.max((structure?.range ?? levels.high - levels.low), levels.price * 0.02);
  if (currentMaxExecutionDrawingIds.has("fib")) {
    const fibLevels =
      structure?.fibLevels ??
      [
        ["Fib 23.6", levels.low + range * 0.236],
        ["Fib 38.2", levels.low + range * 0.382],
        ["Fib 50.0", levels.low + range * 0.5],
        ["Fib 61.8", levels.low + range * 0.618],
        ["Fib 78.6", levels.low + range * 0.786],
        ["Fib 127.2", levels.high + range * 0.272],
        ["Fib 161.8", levels.high + range * 0.618],
      ];
    fibLevels.forEach(([title, price]) => {
      const color =
        title.includes("127") || title.includes("161")
          ? palette.target
          : title.includes("38") || title.includes("61")
            ? palette.entry
            : palette.fib;
      const style = title.includes("50") || title.includes("127") ? lineStyle.Dashed : lineStyle.Dotted;
      createMaxExecutionPriceLine(priceSeries, { title, price, color, lineStyle: style });
    });
  }
  if (currentMaxExecutionDrawingIds.has("ict")) {
    const fvgLow = structure?.fvg?.low ?? levels.entryLow;
    const fvgHigh = structure?.fvg?.high ?? levels.entryHigh;
    [
      ["ICT SSL", structure?.low ?? levels.low, palette.liquidity, lineStyle.Dotted],
      ["ICT EQ", structure?.equilibrium ?? levels.low + range * 0.5, palette.ict, lineStyle.Dashed],
      ["ICT BSL", structure?.high ?? levels.high, palette.liquidity, lineStyle.Dotted],
      ["ICT FVG Low", fvgLow, palette.ict, lineStyle.Dotted],
      ["ICT FVG High", fvgHigh, palette.ict, lineStyle.Dotted],
    ].forEach(([title, price, color, style]) => {
      createMaxExecutionPriceLine(priceSeries, { title, price, color, lineStyle: style });
    });
  }
}

function renderMaxExecutionDrawingLegend(host) {
  if (!host) {
    return;
  }
  const activeDrawings = MAX_EXECUTION_DRAWINGS.filter((drawing) =>
    currentMaxExecutionDrawingIds.has(drawing.id),
  );
  if (activeDrawings.length === 0) {
    return;
  }
  const legend = document.createElement("div");
  legend.className = "max-execution-drawing-legend";
  const title = document.createElement("strong");
  title.textContent = "Max drawings";
  legend.append(title);
  activeDrawings.forEach((drawing) => {
    const item = document.createElement("span");
    item.textContent = drawing.legend;
    item.dataset.drawing = drawing.id;
    legend.append(item);
  });
  host.append(legend);
}

function updateMaxExecutionLiveText(company, maxView, levels, intervalMeta, liveQuote) {
  if (maxExecutionSummary) {
    const feedLabel = intervalMeta?.fmpInterval
      ? `FMP ${intervalMeta.label} OHLC bars plus live quote`
      : "FMP live quote over cached history";
    maxExecutionSummary.textContent = levels
      ? `Technical call is ${maxView.verdict} with ${maxView.score}/100 conviction. Max is using ${feedLabel}; current price is ${formatMoney(levels.price)}, entry is near ${formatPriceRange(levels.entryLow, levels.entryHigh)}, stop is ${formatMoney(levels.stop)}, and targets are ${formatMoney(levels.target1)}, ${formatMoney(levels.target2)}, then ${formatMoney(levels.target3)}. Last tick ${new Date(liveQuote.fetchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}.`
      : `${company.ticker} is not research-ready enough for Max to draw entry, stop, and take-profit levels yet.`;
  }
  if (maxExecutionScore) {
    maxExecutionScore.textContent = `${maxView.score}/100`;
  }
  if (maxExecutionPosition) {
    maxExecutionPosition.textContent = levels?.position ?? "Waiting for price and range data";
  }
  setDecisionBadge("#max-execution-verdict", maxView.verdict);
  renderMaxExecutionLevelCards(levels);
}

function applyLiveQuoteToCurrentMaxChart(company, liveQuote) {
  const state = currentMaxExecutionChartState;
  if (!state || !state.priceSeries || state.ticker !== company?.ticker || !liveQuote?.price) {
    return false;
  }
  const bucketTime = getLiveBucketTime(liveQuote.fetchedAt, state.intervalMeta);
  if (!bucketTime) {
    return false;
  }

  const chartCompany = {
    ...company,
    price: liveQuote.price,
    date: `FMP live quote ${new Date(liveQuote.fetchedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`,
  };
  const profile = getOpportunityProfile(chartCompany);
  const targetContext = profile.resolved;
  const maxView = buildMaxView(chartCompany, profile, targetContext, { includeDetails: false });
  const levels = maxView.levels;
  if (!levels) {
    return false;
  }

  const data = [...state.data];
  const last = data.at(-1);
  const lastClose = getPointClose(last) ?? liveQuote.price;
  let updatedPoint;
  if (state.seriesType === "candles") {
    if (last && last.time === bucketTime) {
      updatedPoint = {
        ...last,
        high: Math.max(Number(last.high), liveQuote.price),
        low: Math.min(Number(last.low), liveQuote.price),
        close: liveQuote.price,
      };
      data[data.length - 1] = updatedPoint;
    } else {
      updatedPoint = {
        time: bucketTime,
        open: lastClose,
        high: Math.max(lastClose, liveQuote.price),
        low: Math.min(lastClose, liveQuote.price),
        close: liveQuote.price,
      };
      data.push(updatedPoint);
    }
  } else if (last && last.time === bucketTime) {
    updatedPoint = { ...last, value: liveQuote.price };
    data[data.length - 1] = updatedPoint;
  } else {
    updatedPoint = { time: bucketTime, value: liveQuote.price };
    data.push(updatedPoint);
  }

  const structure = buildMaxExecutionStructure(data, levels);
  const chartLevels = buildDynamicTradeLevels(levels, structure);

  state.priceSeries.update(updatedPoint);
  if (state.currentPriceLine && state.priceSeries.removePriceLine) {
    state.priceSeries.removePriceLine(state.currentPriceLine);
  }
  state.currentPriceLine = createCurrentPriceLine(state.priceSeries, chartLevels, state.palette);
  state.data = data;
  state.levels = chartLevels;
  state.structure = structure;
  setMaxExecutionMarkers(state.priceSeries, updatedPoint.time, chartLevels, state.palette, data, structure);
  updateMaxExecutionLiveText(chartCompany, maxView, chartLevels, state.intervalMeta, liveQuote);
  renderMaxLiveStatus({ text: "FMP live" });
  return true;
}

async function updateMaxExecutionLiveTick(company) {
  if (!maxExecutionLiveEnabled || !hasFmpLiveSource() || !company) {
    return;
  }
  try {
    fmpQuoteCache.delete(getPaperBotTicker(company));
    const liveQuote = await fetchFmpQuote(company);
    if (!liveQuote) {
      renderMaxLiveStatus({ error: true });
      return;
    }
    paperBotMarkPriceCache.set(getPaperBotTicker(company), liveQuote);
    if (!applyLiveQuoteToCurrentMaxChart(company, liveQuote)) {
      renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
    }
    renderPaperBotPanelForCurrentSelection();
  } catch (error) {
    renderMaxLiveStatus({ error: true });
  }
}

function scheduleMaxLiveRefresh(company) {
  if (maxExecutionLiveTimer) {
    window.clearInterval(maxExecutionLiveTimer);
    maxExecutionLiveTimer = null;
  }
  if (!maxExecutionLiveEnabled || !hasFmpLiveSource() || !company) {
    return;
  }
  maxExecutionLiveTimer = window.setInterval(() => {
    updateMaxExecutionLiveTick(companyUniverseById.get(currentCompanyId));
  }, getLivePollSeconds() * 1000);
}

function getFilteredHistoryIndexRange(history) {
  const times = history?.t ?? [];
  if (times.length === 0) {
    return { startIndex: 0, endIndex: -1 };
  }
  const lastTime = Number(times.at(-1));
  const selectedRange = getSelectedMaxExecutionRange();
  if (!selectedRange || selectedRange.id === "all") {
    return { startIndex: 0, endIndex: times.length - 1 };
  }

  let threshold = -Infinity;
  if (selectedRange.ytd) {
    const lastDate = new Date(lastTime * 1000);
    threshold = Date.UTC(lastDate.getUTCFullYear(), 0, 1) / 1000;
  } else {
    threshold = lastTime - selectedRange.days * 24 * 60 * 60;
  }
  const startIndex = times.findIndex((time) => Number(time) >= threshold);
  return {
    startIndex: Math.max(startIndex, 0),
    endIndex: times.length - 1,
  };
}

function getMaxExecutionBucketTime(time, intervalId) {
  if (intervalId === "1d") {
    return time;
  }
  const date = new Date(Number(time) * 1000);
  if (intervalId === "1mo") {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1) / 1000;
  }
  if (intervalId === "1w") {
    const day = date.getUTCDay();
    const daysFromMonday = day === 0 ? 6 : day - 1;
    const weekStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    weekStart.setUTCDate(weekStart.getUTCDate() - daysFromMonday);
    return Math.floor(weekStart.getTime() / 1000);
  }
  return time;
}

function aggregateMaxExecutionHistoryData(historyData) {
  const intervalMeta = getSelectedMaxExecutionInterval();
  if (!intervalMeta?.aggregateInterval || historyData.data.length < 2) {
    return historyData;
  }

  const buckets = new Map();
  historyData.data.forEach((point) => {
    const bucketTime = getMaxExecutionBucketTime(point.time, intervalMeta.aggregateInterval);
    const existing = buckets.get(bucketTime);
    if (historyData.type === "candles") {
      if (!existing) {
        buckets.set(bucketTime, {
          time: bucketTime,
          open: point.open,
          high: point.high,
          low: point.low,
          close: point.close,
        });
        return;
      }
      existing.high = Math.max(existing.high, point.high);
      existing.low = Math.min(existing.low, point.low);
      existing.close = point.close;
      return;
    }

    if (!existing) {
      buckets.set(bucketTime, { time: bucketTime, value: point.value });
      return;
    }
    existing.value = point.value;
  });

  return {
    type: historyData.type,
    hasCandles: historyData.hasCandles,
    data: [...buckets.values()].sort((left, right) => left.time - right.time),
  };
}

function getMaxExecutionHistoryData(history) {
  const { startIndex, endIndex } = getFilteredHistoryIndexRange(history);
  if (endIndex < startIndex) {
    return { type: "line", data: [] };
  }
  const hasCandles =
    Array.isArray(history.o) &&
    Array.isArray(history.h) &&
    Array.isArray(history.l) &&
    history.o.length === history.t.length &&
    history.h.length === history.t.length &&
    history.l.length === history.t.length;
  const shouldRenderCandles = currentMaxExecutionChartTypeId === "candles" && hasCandles;

  const data = [];
  for (let index = startIndex; index <= endIndex; index += 1) {
    const time = Number(history.t[index]);
    const close = Number(history.c[index]);
    if (!Number.isFinite(time) || !Number.isFinite(close)) {
      continue;
    }
    if (shouldRenderCandles) {
      const open = Number(history.o[index]);
      const high = Number(history.h[index]);
      const low = Number(history.l[index]);
      if ([open, high, low].every(Number.isFinite)) {
        data.push({ time, open, high, low, close });
      }
    } else {
      data.push({ time, value: close });
    }
  }
  return aggregateMaxExecutionHistoryData({
    type: shouldRenderCandles ? "candles" : "line",
    hasCandles,
    data,
  });
}

function buildExecutionCandles(company, levels) {
  const count = 78;
  const range = Math.max(levels.high - levels.low, levels.price * 0.08);
  const historicalReturn = Number(
    company.oneYearReturn ?? company.sixMonthReturn ?? company.threeMonthReturn ?? 0,
  );
  const returnBase = Math.max(0.22, 1 + historicalReturn / 100);
  const startGuess = levels.price / returnBase;
  const start = clampNumber(
    startGuess,
    Math.max(levels.low * 0.84, 0.01),
    Math.max(levels.high, levels.price) * 1.04,
  );
  const maxClamp = Math.max(levels.target2, levels.high, levels.price) * 1.04;
  const minClamp = Math.max(Math.min(levels.stop, levels.low) * 0.92, 0.01);
  const endDate = company.date ? new Date(company.date) : new Date();
  const candles = [];
  let previousClose = start;

  for (let index = 0; index < count; index += 1) {
    const progress = index / (count - 1);
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - (count - 1 - index));
    const trendValue = start + (levels.price - start) * progress;
    const wave = Math.sin(progress * Math.PI * 5.2) * range * 0.035;
    const pullback =
      progress > 0.62 && progress < 0.78
        ? -Math.sin((progress - 0.62) / 0.16 * Math.PI) * range * 0.05
        : 0;
    const close =
      index === count - 1
        ? levels.price
        : clampNumber(trendValue + wave + pullback, minClamp, maxClamp);
    const open = index === 0 ? close - range * 0.01 : previousClose;
    const wickSize = range * (0.009 + (index % 6) * 0.0016);
    const high = clampNumber(Math.max(open, close) + wickSize, minClamp, maxClamp);
    const low = clampNumber(Math.min(open, close) - wickSize * 1.08, minClamp, maxClamp);
    candles.push({
      time: Math.floor(date.getTime() / 1000),
      open,
      high,
      low,
      close,
    });
    previousClose = close;
  }

  return candles;
}

function renderMaxExecutionLevelCards(levels) {
  if (!maxExecutionLevels) {
    return;
  }

  if (!levels) {
    maxExecutionLevels.replaceChildren(
      ...[
        ["Entry Zone", "Pending", "Needs price and 52-week structure.", "entry"],
        ["Stop Loss", "Pending", "Risk line unlocks after data enrichment.", "risk"],
        ["Targets", "Pending", "TP ladder waits for Max levels.", "target"],
      ].map(([label, value, note, tone]) => makeMaxExecutionLevelCard(label, value, note, tone)),
    );
    return;
  }

  const upsideToTarget2 = ((levels.target2 - levels.price) / Math.max(levels.price, 0.01)) * 100;
  const downsideToStop = ((levels.stop - levels.price) / Math.max(levels.price, 0.01)) * 100;
  const cards = [
    [
      "Entry Zone",
      formatPriceRange(levels.entryLow, levels.entryHigh),
      `${levels.position}; add zone ${formatPriceRange(levels.addLow, levels.addHigh)}.`,
      "entry",
    ],
    [
      "Stop Loss",
      formatMoney(levels.stop),
      `${formatPercent(downsideToStop)} from current price. Thesis invalidation line.`,
      "risk",
    ],
    [
      "Take Profit",
      `${formatMoney(levels.target1)} / ${formatMoney(levels.target2)} / ${formatMoney(levels.target3)}`,
      `TP2 implies ${formatPercent(upsideToTarget2)} with ${levels.rewardRisk.toFixed(1)}x reward/risk.`,
      "target",
    ],
  ];
  maxExecutionLevels.replaceChildren(
    ...cards.map(([label, value, note, tone]) => makeMaxExecutionLevelCard(label, value, note, tone)),
  );
}

function makeMaxExecutionLevelCard(label, value, note, tone) {
  const card = document.createElement("article");
  card.dataset.tone = tone;
  const labelElement = document.createElement("span");
  labelElement.textContent = label;
  const valueElement = document.createElement("strong");
  valueElement.textContent = value;
  const noteElement = document.createElement("small");
  noteElement.textContent = note;
  card.append(labelElement, valueElement, noteElement);
  return card;
}

async function renderMaxExecutionChart(company, opportunity = null, resolved = null) {
  if (!maxExecutionChartHost || !company) {
    return;
  }

  const renderId = (currentMaxExecutionRenderId += 1);
  const intervalMeta = getSelectedMaxExecutionInterval();
  const rangeMeta = getSelectedMaxExecutionRange();
  const isIntradayInterval = ["1min", "15min", "4hour"].includes(intervalMeta?.id);
  const isDailyCandleRequest =
    currentMaxExecutionChartTypeId === "candles" &&
    ["1d", "1w", "1mo"].includes(intervalMeta?.id) &&
    hasFmpLiveSource();
  const usesFmpHistory = isIntradayInterval || isDailyCandleRequest;
  renderMaxExecutionRangeSwitcher();
  renderMaxExecutionChartTypeSwitcher();
  renderMaxExecutionIntervalSwitcher();
  renderMaxExecutionDrawingSwitcher();
  renderMaxLiveStatus();

  if (currentMaxExecutionResizeObserver) {
    currentMaxExecutionResizeObserver.disconnect();
    currentMaxExecutionResizeObserver = null;
  }
  if (currentMaxExecutionChart?.remove) {
    currentMaxExecutionChart.remove();
    currentMaxExecutionChart = null;
    currentMaxExecutionChartState = null;
  }

  if (!window.LightweightCharts) {
    maxExecutionChartHost.replaceChildren(
      makeMaxExecutionPlaceholder("The chart library did not load. Level cards are still available on the right."),
    );
    return;
  }

  const loadingText =
    usesFmpHistory && hasFmpLiveSource()
      ? `Loading FMP ${intervalMeta.label} bars for ${company.ticker}.`
      : usesFmpHistory
        ? "Connect FMP live feed to load selected-ticker intraday history."
        : "Loading cached 10-year daily history for the selected ticker.";
  maxExecutionChartHost.replaceChildren(makeMaxExecutionPlaceholder(loadingText));

  let liveQuote = null;
  if (maxExecutionLiveEnabled && hasFmpLiveSource()) {
    try {
      liveQuote = await fetchFmpQuote(company);
      renderMaxLiveStatus(liveQuote ? { text: "FMP live" } : { error: true });
    } catch (error) {
      liveQuote = null;
      renderMaxLiveStatus({ error: true });
    }
  }
  if (renderId !== currentMaxExecutionRenderId) {
    return;
  }

  const chartCompany = liveQuote?.price
    ? {
        ...company,
        price: liveQuote.price,
        date: `FMP live quote ${new Date(liveQuote.fetchedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      }
    : company;
  const profile = opportunity ?? getOpportunityProfile(chartCompany);
  const targetContext = resolved ?? profile.resolved;
  const maxView = buildMaxView(chartCompany, profile, targetContext, { includeDetails: false });
  const levels = maxView.levels;

  if (maxExecutionTitle) {
    maxExecutionTitle.textContent = `${chartCompany.ticker} Max execution map`;
  }
  if (maxExecutionSummary) {
    const feedLabel =
      liveQuote?.price && usesFmpHistory
        ? `FMP ${intervalMeta.label} OHLC bars plus live quote`
        : liveQuote?.price
          ? "FMP live quote with cached 10-year daily history"
          : usesFmpHistory
            ? `FMP ${intervalMeta.label} OHLC bars`
            : "cached 10-year daily history";
    maxExecutionSummary.textContent = levels
      ? `Technical call is ${maxView.verdict} with ${maxView.score}/100 conviction. Max is using ${feedLabel}; current price is ${formatMoney(levels.price)}, entry is near ${formatPriceRange(levels.entryLow, levels.entryHigh)}, stop is ${formatMoney(levels.stop)}, and targets are ${formatMoney(levels.target1)}, ${formatMoney(levels.target2)}, then ${formatMoney(levels.target3)}.`
      : `${chartCompany.ticker} is not research-ready enough for Max to draw entry, stop, and take-profit levels yet.`;
  }
  if (maxExecutionScore) {
    maxExecutionScore.textContent = `${maxView.score}/100`;
  }
  if (maxExecutionPosition) {
    maxExecutionPosition.textContent = levels?.position ?? "Waiting for price and range data";
  }
  setDecisionBadge("#max-execution-verdict", maxView.verdict);
  renderMaxExecutionLevelCards(levels);

  if (!levels) {
    maxExecutionChartHost.replaceChildren(
      makeMaxExecutionPlaceholder("Attach price, 52-week high/low, and market history to unlock Max's chart."),
    );
    scheduleMaxLiveRefresh(company);
    return;
  }

  let history = null;
  try {
    if (usesFmpHistory) {
      if (!hasFmpLiveSource()) {
        history = null;
      } else {
        history = await fetchFmpIntradayHistory(chartCompany, intervalMeta, rangeMeta);
      }
    } else {
      history = await getCompanyPriceHistory(chartCompany);
      history = mergeLiveQuoteIntoHistory(history, liveQuote);
    }
  } catch (error) {
    history = null;
    if (usesFmpHistory || liveQuote) {
      renderMaxLiveStatus({ error: true });
    }
  }
  if (renderId !== currentMaxExecutionRenderId) {
    return;
  }
  if (!history) {
    const missingMessage =
      usesFmpHistory && !hasFmpLiveSource()
        ? "Connect an FMP key to use intraday candles or daily OHLC candles. Line mode can still use cached 10-year history."
        : usesFmpHistory
          ? "FMP did not return enough OHLC bars for this ticker/range yet. Try a wider range or check the FMP key/proxy."
          : "No cached 10-year daily history chunk is available for this ticker yet. Re-run the market refresh to publish it.";
    maxExecutionChartHost.replaceChildren(
      makeMaxExecutionPlaceholder(missingMessage),
    );
    scheduleMaxLiveRefresh(company);
    return;
  }

  const historyData = getMaxExecutionHistoryData(history);
  if (currentMaxExecutionChartTypeId === "candles" && !historyData.hasCandles) {
    currentMaxExecutionChartTypeId = "line";
    window.localStorage.setItem("golden-pocket-max-chart-type", "line");
    renderMaxExecutionChartTypeSwitcher();
  }
  if (historyData.data.length < 2) {
    maxExecutionChartHost.replaceChildren(
      makeMaxExecutionPlaceholder("This selected range does not have enough historical points. Try a wider range or another interval."),
    );
    scheduleMaxLiveRefresh(company);
    return;
  }

  const structure = buildMaxExecutionStructure(historyData.data, levels);
  const chartLevels = buildDynamicTradeLevels(levels, structure);
  if (maxExecutionSummary) {
    const frameLabel = `${rangeMeta.label} / ${intervalMeta.label}`;
    const feedLabel =
      liveQuote?.price && usesFmpHistory
        ? `FMP ${intervalMeta.label} OHLC bars plus live quote`
        : liveQuote?.price
          ? "FMP live quote with cached 10-year daily history"
          : usesFmpHistory
            ? `FMP ${intervalMeta.label} OHLC bars`
            : "cached 10-year daily history";
    maxExecutionSummary.textContent =
      `Technical call is ${maxView.verdict} with ${maxView.score}/100 conviction. Max is using ${feedLabel}; drawings and levels are recalculated from the selected ${frameLabel} frame. Current price is ${formatMoney(chartLevels.price)}, entry is near ${formatPriceRange(chartLevels.entryLow, chartLevels.entryHigh)}, stop is ${formatMoney(chartLevels.stop)}, and targets are ${formatMoney(chartLevels.target1)}, ${formatMoney(chartLevels.target2)}, then ${formatMoney(chartLevels.target3)}.`;
  }
  if (maxExecutionPosition) {
    maxExecutionPosition.textContent = chartLevels.position;
  }
  renderMaxExecutionLevelCards(chartLevels);

  maxExecutionChartHost.replaceChildren();
  const palette = getMaxExecutionChartPalette();
  const chartHeight = Math.max(maxExecutionChartHost.clientHeight || 360, 300);
  const chart = window.LightweightCharts.createChart(maxExecutionChartHost, {
    height: chartHeight,
    layout: {
      background: { type: window.LightweightCharts.ColorType.Solid, color: palette.background },
      textColor: palette.text,
      fontFamily: "Aptos, Segoe UI, sans-serif",
    },
    grid: {
      vertLines: { color: palette.grid },
      horzLines: { color: palette.grid },
    },
    rightPriceScale: {
      borderColor: palette.grid,
      scaleMargins: { top: 0.12, bottom: 0.16 },
    },
    timeScale: {
      borderColor: palette.grid,
      rightOffset: 8,
      barSpacing: 7,
    },
    crosshair: {
      mode: window.LightweightCharts.CrosshairMode.Normal,
    },
  });
  const priceSeries =
    historyData.type === "candles"
      ? chart.addCandlestickSeries({
          upColor: palette.up,
          downColor: palette.down,
          borderUpColor: palette.up,
          borderDownColor: palette.down,
          wickUpColor: palette.wickUp,
          wickDownColor: palette.wickDown,
        })
      : chart.addAreaSeries({
          lineColor: palette.up,
          topColor: "rgba(99, 210, 200, 0.28)",
          bottomColor: "rgba(99, 210, 200, 0.02)",
          lineWidth: 2,
        });
  priceSeries.setData(historyData.data);

  const dashed = window.LightweightCharts.LineStyle.Dashed;
  const dotted = window.LightweightCharts.LineStyle.Dotted;
  let currentPriceLine = null;
  [
    ["SL", chartLevels.stop, palette.stop, dashed],
    ["Add Low", chartLevels.addLow, palette.add, dotted],
    ["Entry Low", chartLevels.entryLow, palette.entry, dashed],
    ["Entry High", chartLevels.entryHigh, palette.entry, dashed],
    ["TP1", chartLevels.target1, palette.target, dashed],
    ["TP2", chartLevels.target2, palette.target, dashed],
    ["TP3", chartLevels.target3, palette.target, dotted],
  ].forEach(([title, price, color, lineStyle]) => {
    createMaxExecutionPriceLine(priceSeries, { title, price, color, lineStyle });
  });
  createMaxExecutionDrawingPriceLines(priceSeries, chartLevels, palette, structure);
  currentPriceLine = createCurrentPriceLine(priceSeries, chartLevels, palette);

  const lastTime = historyData.data.at(-1)?.time;
  if (lastTime) {
    setMaxExecutionMarkers(priceSeries, lastTime, chartLevels, palette, historyData.data, structure);
  }
  renderMaxExecutionDrawingLegend(maxExecutionChartHost);

  chart.timeScale().fitContent();
  currentMaxExecutionChart = chart;
  currentMaxExecutionChartState = {
    ticker: chartCompany.ticker,
    chart,
    priceSeries,
    currentPriceLine,
    palette,
    intervalMeta,
    seriesType: historyData.type,
    data: historyData.data,
    levels: chartLevels,
    structure,
  };
  currentMaxExecutionResizeObserver = new ResizeObserver(([entry]) => {
    const width = Math.floor(entry.contentRect.width);
    const height = Math.max(Math.floor(entry.contentRect.height), 300);
    chart.applyOptions({ width, height });
    chart.timeScale().fitContent();
  });
  currentMaxExecutionResizeObserver.observe(maxExecutionChartHost);
  scheduleMaxLiveRefresh(company);
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

function getDecisionModel(company) {
  const cacheKey = `${company.id}:${currentScenarioId}:${currentTargetMethodId}`;
  const cached = decisionModelCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const opportunity = getOpportunityProfile(company);
  const resolved = opportunity.resolved;
  const johnView = buildJohnView(company, opportunity, resolved, { includeDetails: false });
  const maxView = buildMaxView(company, opportunity, resolved, { includeDetails: false });
  const decision = combineTradingDecision(johnView, maxView);
  const model = { company, opportunity, resolved, johnView, maxView, decision };
  decisionModelCache.set(cacheKey, model);
  return model;
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

  if (tickerSearch) {
    tickerSearch.value = currentFilters.search;
  }
  if (tickerFilterSearch) {
    tickerFilterSearch.value = currentFilters.tickerOptionSearch;
  }
  if (researchReadyOnlyToggle) {
    researchReadyOnlyToggle.checked = currentFilters.researchReadyOnly;
  }
  if (finalCallFilter) {
    finalCallFilter.value = currentFilters.finalCall;
  }
  if (finalCallSortState) {
    finalCallSortState.textContent =
      currentFilters.finalCallSort === "best"
        ? "Best first"
        : currentFilters.finalCallSort === "worst"
          ? "Caution first"
          : "Default";
  }
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
  const finalCallLabel = currentFilters.finalCall === "all" ? "" : `${currentFilters.finalCall} `;
  if (currentFilters.industry !== "All Industries") {
    if (heroTitle) {
      heroTitle.textContent = currentFilters.industry;
    }
    if (rosterTitle) {
      rosterTitle.textContent = `${currentFilters.industry} ${finalCallLabel}opportunity table`;
    }
  } else if (currentFilters.sector !== "All Sectors") {
    if (heroTitle) {
      heroTitle.textContent = `${currentFilters.sector} Opportunity Report`;
    }
    if (rosterTitle) {
      rosterTitle.textContent = `${currentFilters.sector} ${finalCallLabel}opportunity table`;
    }
  } else {
    if (heroTitle) {
      heroTitle.textContent = "SEC Market Universe";
    }
    if (rosterTitle) {
      rosterTitle.textContent =
        currentFilters.finalCall === "all"
          ? "Scan the filtered ticker universe"
          : `${currentFilters.finalCall} candidates across the market`;
    }
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
  if (rosterNote) {
    rosterNote.textContent =
      currentFilters.finalCall !== "all"
        ? `Showing companies whose combined Trading Decision is ${currentFilters.finalCall}. Change the Final Call filter to inspect Watch, Wait, Avoid, or all calls.`
        : filteredCount > MAX_TABLE_RESULTS
        ? `Showing the top ${visibleCount} of ${filteredCount} matching tickers by setup score. Narrow with sector, industry, or search for a tighter working list.`
        : currentFilters.researchReadyOnly
          ? `Only research-ready tickers with live scenario predictions are showing in this working list.`
        : currentFilters.industry === "All Industries"
          ? `The market directory is loaded. Research-ready names carry active target-method modeling while the broader market stays available for discovery from the same report.`
          : `Current filtered industry: ${currentFilters.industry}.`;
  }
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

function buildConvictionBar(label, value, detail) {
  const compactLabel = {
    Overall: "All",
    Fundamental: "Fund",
    Technical: "Tech",
  }[label] ?? label;
  const detailText = detail ? `${Math.round(value)}% - ${detail}` : `${Math.round(value)}%`;
  return `
    <div class="conviction-bar">
      <span class="conviction-bar__label" title="${escapeHtml(label)}">${escapeHtml(compactLabel)}</span>
      <div class="opportunity-table__conviction-track">
        <i class="opportunity-table__conviction-fill" style="width:${clampNumber(value, 0, 100)}%"></i>
      </div>
      <span class="conviction-bar__value" title="${escapeHtml(detailText)}">${Math.round(value)}%</span>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => (
    {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[character]
  ));
}

function getMaxBotEvaluation(company) {
  const ticker = String(company?.ticker ?? "").toUpperCase();
  return paperBotState?.lastEvaluations?.[ticker] ?? paperBotState?.lastEvaluations?.[company?.ticker] ?? null;
}

function getCompactMaxBotLabel(rawLabel, action) {
  const text = String(rawLabel ?? "").trim();
  const normalized = text.toUpperCase();
  if (normalized.includes("TECHNICAL WAIT") || normalized === "WAIT") {
    return "WAIT";
  }
  if (normalized.includes("SIZING BLOCKED") || normalized.includes("BLOCKED")) {
    return "BLOCKED";
  }
  if (normalized.includes("ENTER")) {
    return "ENTER";
  }
  if (normalized.includes("HELD") || normalized.includes("HOLD")) {
    return "HOLD";
  }
  if (normalized.includes("BUY")) {
    return "BUY";
  }
  if (normalized.includes("NOT SCANNED")) {
    return "SCAN";
  }
  return String(action ?? "wait").toUpperCase();
}

function buildMaxBotStatus(company) {
  const ticker = String(company?.ticker ?? "").toUpperCase();
  const heldPosition = paperBotState?.positions?.[ticker] ?? paperBotState?.positions?.[company?.ticker];
  const evaluation = getMaxBotEvaluation(company);
  const action = String(heldPosition ? "HOLD" : evaluation?.action ?? "WAIT").toLowerCase();
  const rawLabel = heldPosition ? "Held" : evaluation?.label ?? "Not scanned";
  const scoreValue = Number(evaluation?.score);
  const scoreText = Number.isFinite(scoreValue) ? ` ${Math.round(scoreValue)}/100` : "";
  const compactScoreText = Number.isFinite(scoreValue) ? ` ${Math.round(scoreValue)}` : "";
  const compactLabel = getCompactMaxBotLabel(rawLabel, action);
  const reason =
    heldPosition && !evaluation?.reason
      ? "Open paper position; Max is managing the stop and targets."
      : evaluation?.reason ?? "Waiting for the next autonomous Max cloud run.";
  const frame = evaluation?.frame ? `Frame: ${evaluation.frame}.` : "";

  return `
    <div class="opportunity-table__bot-status">
      <span class="opportunity-table__bot-badge opportunity-table__bot-badge--${action}" title="${escapeHtml(`${rawLabel}${scoreText}`)}">
        ${escapeHtml(compactLabel)}${escapeHtml(compactScoreText)}
      </span>
      <small class="opportunity-table__bot-note" title="${escapeHtml(reason)}">
        ${escapeHtml(reason)} ${escapeHtml(frame)}
      </small>
    </div>
  `;
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
        : "Fundamental view needs profitability and cash-flow depth next.",
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
        ? "Fundamental view uses this as a first-pass leverage risk signal."
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

function buildJohnView(company, opportunity, resolved, options = {}) {
  const includeDetails = options.includeDetails !== false;
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
  const view = {
    verdict,
    score: Math.round(totalScore),
  };

  if (!includeDetails) {
    return view;
  }

  return {
    ...view,
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

function buildMaxView(company, opportunity, resolved, options = {}) {
  const includeDetails = options.includeDetails !== false;
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

  const view = {
    verdict,
    score: Math.round(totalScore),
    levels,
  };

  if (!includeDetails) {
    return view;
  }

  return {
    ...view,
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

function createDefaultPaperBotState() {
  return {
    mode: "local_browser_paper",
    manager: "Max",
    startingCash: PAPER_BOT_STARTING_CASH,
    cash: PAPER_BOT_STARTING_CASH,
    realizedPnl: 0,
    positions: {},
    trades: [],
    equityCurve: [],
    autoEnabled: true,
    lastEvaluations: {},
  };
}

function loadPaperBotOverrides() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PAPER_BOT_OVERRIDE_STORAGE_KEY) ?? "{}");
    return {
      manualCloses: Array.isArray(parsed?.manualCloses) ? parsed.manualCloses : [],
    };
  } catch (error) {
    return { manualCloses: [] };
  }
}

function savePaperBotOverrides(overrides) {
  window.localStorage.setItem(PAPER_BOT_OVERRIDE_STORAGE_KEY, JSON.stringify(overrides));
}

function clearPaperBotManualOverrides() {
  try {
    if (window.localStorage.getItem(PAPER_BOT_OVERRIDE_STORAGE_KEY) !== null) {
      window.localStorage.removeItem(PAPER_BOT_OVERRIDE_STORAGE_KEY);
    }
  } catch (error) {
    // Ignore storage failures; the next cloud state refresh remains authoritative.
  }
}

function rememberPaperBotManualClose(trade) {
  const overrides = loadPaperBotOverrides();
  const tradeId = String(trade?.id ?? "");
  overrides.manualCloses = [
    trade,
    ...overrides.manualCloses.filter((item) => String(item?.id ?? "") !== tradeId),
  ].slice(0, 200);
  savePaperBotOverrides(overrides);
}

function dropPaperBotManualClosesById(tradeIds) {
  if (!tradeIds?.size) {
    return;
  }
  const overrides = loadPaperBotOverrides();
  const nextManualCloses = overrides.manualCloses.filter((item) => !tradeIds.has(String(item?.id ?? "")));
  if (nextManualCloses.length === overrides.manualCloses.length) {
    return;
  }
  savePaperBotOverrides({ ...overrides, manualCloses: nextManualCloses });
}

function clonePaperBotState(state) {
  return JSON.parse(JSON.stringify(state));
}

function roundPaperBotMoney(value, decimals = 4) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return 0;
  }
  const factor = 10 ** decimals;
  return Math.round(numericValue * factor) / factor;
}

function applyPaperBotManualOverrides(state) {
  const overrides = loadPaperBotOverrides();
  if (!overrides.manualCloses.length) {
    return state;
  }
  const nextState = clonePaperBotState(state);
  nextState.positions =
    nextState.positions && typeof nextState.positions === "object" && !Array.isArray(nextState.positions)
      ? nextState.positions
      : {};
  const trades = Array.isArray(nextState.trades) ? [...nextState.trades] : [];
  const tradeIds = new Set(trades.map((trade) => String(trade?.id ?? "")));

  overrides.manualCloses.forEach((closeTrade) => {
    const ticker = getPaperBotTicker(closeTrade);
    const position = nextState.positions[ticker];
    const openedAtMatches =
      !closeTrade?.openedAt || !position?.openedAt || String(closeTrade.openedAt) === String(position.openedAt);
    if (position && openedAtMatches) {
      delete nextState.positions[ticker];
      nextState.cash = roundPaperBotMoney(Number(nextState.cash ?? 0) + Number(closeTrade.value ?? 0));
      nextState.realizedPnl = roundPaperBotMoney(
        Number(nextState.realizedPnl ?? 0) + Number(closeTrade.realizedPnl ?? closeTrade.pnl ?? 0),
      );
    }
    if (closeTrade?.id && !tradeIds.has(String(closeTrade.id))) {
      trades.unshift(closeTrade);
      tradeIds.add(String(closeTrade.id));
    }
  });

  nextState.trades = trades
    .sort((left, right) => new Date(right?.time ?? 0).getTime() - new Date(left?.time ?? 0).getTime())
    .slice(0, 250);
  return nextState;
}

function applyPaperBotCloudState(state) {
  if (!hasPaperBotCloudSync()) {
    clearPaperBotManualOverrides();
    return state;
  }
  pruneSyncedPaperBotManualCloses(state);
  return applyPaperBotManualOverrides(state);
}

function normalizePaperBotState(rawState) {
  if (!rawState || typeof rawState !== "object") {
    return null;
  }
  const defaults = createDefaultPaperBotState();
  return {
    ...defaults,
    ...rawState,
    cash: Number.isFinite(Number(rawState.cash)) ? Number(rawState.cash) : defaults.cash,
    realizedPnl: Number.isFinite(Number(rawState.realizedPnl)) ? Number(rawState.realizedPnl) : 0,
    positions:
      rawState.positions && typeof rawState.positions === "object" && !Array.isArray(rawState.positions)
        ? rawState.positions
        : {},
    trades: Array.isArray(rawState.trades) ? rawState.trades.slice(0, 250) : [],
    equityCurve: Array.isArray(rawState.equityCurve) ? rawState.equityCurve.slice(0, 1000) : [],
    lastEvaluations:
      rawState.lastEvaluations && typeof rawState.lastEvaluations === "object"
        ? rawState.lastEvaluations
        : {},
    autoEnabled: rawState.autoEnabled !== false,
  };
}

function getPaperBotSyncBaseUrl() {
  return String(maxExecutionLiveConfig.paperBotSyncBaseUrl || "").replace(/\/+$/, "");
}

function hasPaperBotCloudSync() {
  return Boolean(getPaperBotSyncBaseUrl());
}

function getPaperBotSyncToken() {
  return (
    window.localStorage.getItem(PAPER_BOT_SYNC_TOKEN_STORAGE_KEY) ||
    String(maxExecutionLiveConfig.paperBotSyncToken || "")
  ).trim();
}

function setPaperBotSyncToken(token) {
  const normalizedToken = String(token || "").trim();
  if (normalizedToken) {
    window.localStorage.setItem(PAPER_BOT_SYNC_TOKEN_STORAGE_KEY, normalizedToken);
  } else {
    window.localStorage.removeItem(PAPER_BOT_SYNC_TOKEN_STORAGE_KEY);
  }
}

function getPaperBotSyncHeaders(extraHeaders = {}) {
  const headers = {
    Accept: "application/json",
    ...extraHeaders,
  };
  const token = getPaperBotSyncToken();
  if (token) {
    headers["x-paper-bot-token"] = token;
  }
  return headers;
}

function buildPaperBotSyncUrl(pathname) {
  const baseUrl = getPaperBotSyncBaseUrl();
  if (!baseUrl) {
    return "";
  }
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${baseUrl}${normalizedPath}`;
}

function pruneSyncedPaperBotManualCloses(state) {
  const tradeIds = new Set((state?.trades ?? []).map((trade) => String(trade?.id ?? "")));
  dropPaperBotManualClosesById(tradeIds);
}

function loadPaperBotState() {
  const cloudState = normalizePaperBotState(window.GOLDEN_POCKET_MAX_BOT);
  if (cloudState?.mode === "max_autonomous_cloud") {
    return applyPaperBotCloudState(cloudState);
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PAPER_BOT_STORAGE_KEY) ?? "null");
    return normalizePaperBotState(parsed) ?? createDefaultPaperBotState();
  } catch (error) {
    return createDefaultPaperBotState();
  }
}

function savePaperBotState() {
  window.localStorage.setItem(PAPER_BOT_STORAGE_KEY, JSON.stringify(paperBotState));
}

function loadPaperBotCloudStateScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `./data/max_bot_state.js?v=${Date.now()}`;
    script.async = true;
    script.onload = () => {
      script.remove();
      resolve(normalizePaperBotState(window.GOLDEN_POCKET_MAX_BOT));
    };
    script.onerror = () => {
      script.remove();
      reject(new Error("Could not load Max paper state"));
    };
    document.head.append(script);
  });
}

async function loadPaperBotCloudState() {
  if (hasPaperBotCloudSync()) {
    return normalizePaperBotState(
      await fetchJsonRequest(buildPaperBotSyncUrl("/paper-bot/state"), {
        headers: getPaperBotSyncHeaders(),
      }),
    );
  }
  return loadPaperBotCloudStateScript();
}

async function refreshPaperBotCloudState(options = {}) {
  if (paperBotState.mode !== "max_autonomous_cloud" || (paperBotCloudStateRefreshInFlight && options.force !== true)) {
    return;
  }
  paperBotCloudStateRefreshInFlight = true;
  try {
    const previousGeneratedAt = paperBotState.generatedAt;
    const nextState = await loadPaperBotCloudState();
    if (!nextState || nextState.mode !== "max_autonomous_cloud") {
      return;
    }
    paperBotState = applyPaperBotCloudState(nextState);
    paperBotMarkPriceCache.clear();
    if (
      options.immediate ||
      options.force === true ||
      (nextState.generatedAt && nextState.generatedAt !== previousGeneratedAt)
    ) {
      renderPaperBotPanelForCurrentSelection();
    }
    schedulePaperBotLiveRefresh({ immediate: true });
  } catch (error) {
    if (options.immediate) {
      setPaperBotLiveStatus("Max cloud ledger is cached locally; live marks still run if FMP is connected.", "warning");
    }
  } finally {
    paperBotCloudStateRefreshInFlight = false;
  }
}

function schedulePaperBotCloudStateRefresh() {
  if (paperBotCloudStateTimer) {
    window.clearInterval(paperBotCloudStateTimer);
    paperBotCloudStateTimer = null;
  }
  if (paperBotState.mode !== "max_autonomous_cloud") {
    return;
  }
  refreshPaperBotCloudState({ immediate: true });
  paperBotCloudStateTimer = window.setInterval(() => {
    refreshPaperBotCloudState();
  }, PAPER_BOT_CLOUD_REFRESH_SECONDS * 1000);
}

function formatSignedMoney(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return "--";
  }
  const prefix = numericValue > 0 ? "+" : numericValue < 0 ? "-" : "";
  return `${prefix}${formatMoney(Math.abs(numericValue))}`;
}

function formatPaperBotTime(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "--";
  }
  return parsed.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPaperBotTicker(positionOrTicker) {
  return String(positionOrTicker?.ticker ?? positionOrTicker ?? "").toUpperCase();
}

function getPaperBotCachedMark(ticker) {
  const normalizedTicker = getPaperBotTicker(ticker);
  const paperMark = paperBotMarkPriceCache.get(normalizedTicker);
  if (paperMark?.price) {
    return paperMark;
  }
  const fmpMark = fmpQuoteCache.get(normalizedTicker);
  return fmpMark?.price ? fmpMark : null;
}

function getPaperBotMarkPrice(position, selectedCompany = null) {
  const ticker = getPaperBotTicker(position);
  const liveMark = getPaperBotCachedMark(ticker);
  if (liveMark?.price) {
    return Number(liveMark.price);
  }
  if (
    getPaperBotTicker(selectedCompany) === ticker &&
    hasValue(selectedCompany.price)
  ) {
    return Number(selectedCompany.price);
  }
  const company = companyUniverseByTicker.get(ticker);
  if (hasValue(company?.price)) {
    return Number(company.price);
  }
  return Number(position.lastPrice ?? position.entryPrice ?? 0);
}

function getPaperBotMarkMeta(position, selectedCompany = null) {
  const ticker = getPaperBotTicker(position);
  const liveMark = getPaperBotCachedMark(ticker);
  if (liveMark?.fetchedAt) {
    return `FMP ${new Date(liveMark.fetchedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  if (getPaperBotTicker(selectedCompany) === ticker && hasValue(selectedCompany.price)) {
    return "selected price";
  }
  return "cached mark";
}

function getPaperBotSnapshot(selectedCompany = null) {
  const positions = Object.values(paperBotState.positions ?? {});
  const markedPositions = positions.map((position) => {
    const markPrice = getPaperBotMarkPrice(position, selectedCompany);
    const shares = Number(position.shares ?? 0);
    const entryPrice = Number(position.entryPrice ?? markPrice);
    const marketValue = shares * markPrice;
    const costBasis = shares * entryPrice;
    const unrealizedPnl = marketValue - costBasis;
    return {
      ...position,
      markPrice,
      marketValue,
      costBasis,
      unrealizedPnl,
      unrealizedPct: costBasis > 0 ? (unrealizedPnl / costBasis) * 100 : 0,
      markMeta: getPaperBotMarkMeta(position, selectedCompany),
    };
  });
  const openValue = markedPositions.reduce((sum, position) => sum + position.marketValue, 0);
  const unrealizedPnl = markedPositions.reduce((sum, position) => sum + position.unrealizedPnl, 0);
  const equity = Number(paperBotState.cash ?? 0) + openValue;
  return {
    cash: Number(paperBotState.cash ?? 0),
    equity,
    openValue,
    unrealizedPnl,
    realizedPnl: Number(paperBotState.realizedPnl ?? 0),
    returnPct: ((equity - PAPER_BOT_STARTING_CASH) / PAPER_BOT_STARTING_CASH) * 100,
    positions: markedPositions,
  };
}

function getPaperBotActionTone(action) {
  if (["BUY", "HOLD"].includes(action)) {
    return "buy";
  }
  if (action === "SELL") {
    return "sell";
  }
  return "wait";
}

function calculatePaperBotPlan(company, johnView, maxView, decision) {
  if (!company || !johnView || !maxView || !decision) {
    return {
      action: "WAIT",
      label: "Awaiting ticker",
      reason: "Select a ticker to let the paper bot read Fundamental, Technical, and final conviction.",
    };
  }

  const levels = maxView.levels;
  const price = Number(levels?.price ?? company.price);
  const ticker = company.ticker;
  const position = paperBotState.positions?.[ticker] ?? null;
  if (!levels || !Number.isFinite(price) || price <= 0) {
    return {
      action: "WAIT",
      label: "No trade",
      reason: `${ticker} is missing price or execution levels, so the paper bot will not size a trade.`,
    };
  }

  if (position) {
    if (price <= Number(position.stop ?? levels.stop)) {
      return {
        action: "SELL",
        label: "Exit stop",
        price,
        shares: Number(position.shares),
        value: Number(position.shares) * price,
        reason: `Price touched the stop line near ${formatMoney(position.stop ?? levels.stop)}.`,
        levels,
      };
    }
    if (price >= Number(position.target2 ?? levels.target2)) {
      return {
        action: "SELL",
        label: "Take profit",
        price,
        shares: Number(position.shares),
        value: Number(position.shares) * price,
        reason: `Price reached the TP2 objective near ${formatMoney(position.target2 ?? levels.target2)}.`,
        levels,
      };
    }
    if (decision.finalCall === "Avoid" || johnView.verdict === "Avoid" || maxView.verdict === "Avoid") {
      return {
        action: "SELL",
        label: "Exit thesis",
        price,
        shares: Number(position.shares),
        value: Number(position.shares) * price,
        reason: "Either Fundamental or Technical moved to Avoid, so the paper bot exits the thesis.",
        levels,
      };
    }
    return {
      action: "HOLD",
      label: "Hold position",
      price,
      shares: Number(position.shares),
      value: Number(position.shares) * price,
      reason: `Position remains active. Stop ${formatMoney(levels.stop)}, TP2 ${formatMoney(levels.target2)}, final call ${decision.finalCall}.`,
      levels,
    };
  }

  if (decision.finalCall !== "Buy") {
    return {
      action: "WAIT",
      label: "Stand aside",
      price,
      reason: `Final call is ${decision.finalCall}. The paper bot only opens fresh spot trades on Buy.`,
      levels,
    };
  }
  if (decision.conviction < 70) {
    return {
      action: "WAIT",
      label: "Wait for conviction",
      price,
      reason: `Conviction is ${decision.conviction}/100. The bot requires at least 70/100 to open risk.`,
      levels,
    };
  }
  if (maxView.verdict !== "Enter") {
    return {
      action: "WAIT",
      label: "Wait for setup",
      price,
      reason: `Technical says ${maxView.verdict}. The bot waits for Technical to confirm Enter.`,
      levels,
    };
  }
  if (price > levels.entryHigh * 1.015) {
    return {
      action: "WAIT",
      label: "Chasing avoided",
      price,
      reason: `Price is above the preferred entry zone ${formatPriceRange(levels.entryLow, levels.entryHigh)}.`,
      levels,
    };
  }

  const snapshot = getPaperBotSnapshot(company);
  const maxNotional = snapshot.equity * PAPER_BOT_MAX_POSITION_FRACTION;
  const riskBudget = snapshot.equity * PAPER_BOT_RISK_FRACTION;
  const riskPerShare = Math.max(price - levels.stop, price * 0.025);
  const cashAvailable = Math.max(snapshot.cash, 0);
  const rawShares = Math.min(maxNotional / price, riskBudget / riskPerShare, cashAvailable / price);
  const shares = Math.floor(rawShares * 10000) / 10000;
  const value = shares * price;
  if (!Number.isFinite(shares) || shares <= 0 || value < 50) {
    return {
      action: "WAIT",
      label: "Cash protected",
      price,
      reason: "The risk budget or cash balance is too small for a clean paper position.",
      levels,
    };
  }

  return {
    action: "BUY",
    label: "Open paper trade",
    price,
    shares,
    value,
    reason: `Fundamental says ${johnView.verdict} (${johnView.score}/100), Technical says ${maxView.verdict} (${maxView.score}/100), and final conviction is ${decision.conviction}/100.`,
    levels,
  };
}

function addPaperBotTrade(trade) {
  const nextTrade = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    time: new Date().toISOString(),
    ...trade,
  };
  paperBotState.trades = [
    nextTrade,
    ...(paperBotState.trades ?? []),
  ].slice(0, 200);
  return nextTrade;
}

function storePaperBotEvaluation(company, plan) {
  if (!company?.ticker) {
    return;
  }
  paperBotState.lastEvaluations[company.ticker] = {
    time: new Date().toISOString(),
    action: plan.action,
    label: plan.label,
    reason: plan.reason,
    price: plan.price ?? null,
  };
}

function executePaperBotPlan(company, johnView, maxView, decision, plan) {
  if (!company?.ticker || !plan) {
    return plan;
  }
  const ticker = company.ticker;
  storePaperBotEvaluation(company, plan);

  if (plan.action === "BUY") {
    paperBotState.cash -= plan.value;
    paperBotState.positions[ticker] = {
      ticker,
      name: company.name,
      shares: plan.shares,
      entryPrice: plan.price,
      lastPrice: plan.price,
      stop: plan.levels.stop,
      target1: plan.levels.target1,
      target2: plan.levels.target2,
      target3: plan.levels.target3,
      openedAt: new Date().toISOString(),
      finalCall: decision.finalCall,
      conviction: decision.conviction,
      johnVerdict: johnView.verdict,
      johnScore: johnView.score,
      maxVerdict: maxView.verdict,
      maxScore: maxView.score,
    };
    addPaperBotTrade({
      type: "BUY",
      ticker,
      shares: plan.shares,
      price: plan.price,
      value: plan.value,
      reason: plan.reason,
    });
  } else if (plan.action === "SELL" && paperBotState.positions[ticker]) {
    const position = paperBotState.positions[ticker];
    const shares = Number(position.shares ?? 0);
    const entryPrice = Number(position.entryPrice ?? plan.price);
    const value = shares * plan.price;
    const pnl = (plan.price - entryPrice) * shares;
    paperBotState.cash += value;
    paperBotState.realizedPnl += pnl;
    delete paperBotState.positions[ticker];
    addPaperBotTrade({
      type: "SELL",
      ticker,
      shares,
      entryPrice,
      exitPrice: plan.price,
      price: plan.price,
      value,
      realizedPnl: pnl,
      pnl,
      reason: plan.reason,
    });
  } else if (paperBotState.positions[ticker] && plan.levels) {
    paperBotState.positions[ticker] = {
      ...paperBotState.positions[ticker],
      lastPrice: plan.price,
      stop: plan.levels.stop,
      target1: plan.levels.target1,
      target2: plan.levels.target2,
      target3: plan.levels.target3,
      finalCall: decision.finalCall,
      conviction: decision.conviction,
      johnVerdict: johnView.verdict,
      johnScore: johnView.score,
      maxVerdict: maxView.verdict,
      maxScore: maxView.score,
    };
  }

  savePaperBotState();
  return plan;
}

function evaluatePaperBotForSelection(company, johnView, maxView, decision, options = {}) {
  const plan = calculatePaperBotPlan(company, johnView, maxView, decision);
  const shouldExecute = options.execute === true;
  if (shouldExecute) {
    const executedPlan = executePaperBotPlan(company, johnView, maxView, decision, plan);
    schedulePaperBotLiveRefresh();
    return executedPlan;
  }
  storePaperBotEvaluation(company, plan);
  savePaperBotState();
  schedulePaperBotLiveRefresh();
  return plan;
}

function getPaperBotDecisionContext(company = companyUniverseById.get(currentCompanyId), options = {}) {
  if (!company) {
    return null;
  }
  const liveMark = getPaperBotCachedMark(company.ticker);
  const contextCompany = liveMark?.price
    ? {
        ...company,
        price: liveMark.price,
        date: `FMP live quote ${new Date(liveMark.fetchedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      }
    : company;
  const opportunity = getOpportunityProfile(contextCompany);
  const resolved = opportunity.resolved;
  const johnView = buildJohnView(contextCompany, opportunity, resolved, {
    includeDetails: options.includeDetails === true,
  });
  const maxView = buildMaxView(contextCompany, opportunity, resolved, {
    includeDetails: options.includeDetails === true,
  });
  const decision = combineTradingDecision(johnView, maxView);
  return { company: contextCompany, opportunity, resolved, johnView, maxView, decision };
}

function setPaperBotLiveStatus(message, state = "idle") {
  if (!paperBotLiveStatus) {
    return;
  }
  paperBotLiveStatus.textContent = message;
  paperBotLiveStatus.dataset.state = state;
}

function updatePaperBotSyncConnectUi() {
  if (!paperBotSyncConnect) {
    return;
  }
  paperBotSyncConnect.hidden = !hasPaperBotCloudSync();
  const hasToken = Boolean(getPaperBotSyncToken());
  paperBotSyncConnect.textContent = hasToken ? "Sync key set" : "Sync key";
  paperBotSyncConnect.classList.toggle("is-active", hasToken);
  paperBotSyncConnect.title = hasToken
    ? "Update or clear the paper-bot cloud sync key stored on this device"
    : "Add the paper-bot cloud sync key for this device";
}

function connectPaperBotSyncToken() {
  const currentToken = getPaperBotSyncToken();
  const nextToken = window.prompt(
    "Enter the paper-bot sync key for this device. Leave blank to clear it.",
    currentToken,
  );
  if (nextToken === null) {
    return;
  }
  setPaperBotSyncToken(nextToken);
  updatePaperBotSyncConnectUi();
  if (hasPaperBotCloudSync()) {
    refreshPaperBotCloudState({ immediate: true, force: true });
  }
}

const paperBotEtFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: PAPER_BOT_MARKET_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function getPaperBotEtParts(date = new Date()) {
  const parts = Object.fromEntries(
    paperBotEtFormatter.formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function getPaperBotDateKey(parts) {
  return [
    parts.year,
    String(parts.month).padStart(2, "0"),
    String(parts.day).padStart(2, "0"),
  ].join("-");
}

function parsePaperBotDateKey(key) {
  const [year, month, day] = String(key).split("-").map(Number);
  return { year, month, day };
}

function addPaperBotDateKey(key, days) {
  const { year, month, day } = parsePaperBotDateKey(key);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return getPaperBotDateKey({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  });
}

function getPaperBotWeekday(key) {
  const { year, month, day } = parsePaperBotDateKey(key);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function getPaperBotMarketSession(key) {
  const weekday = getPaperBotWeekday(key);
  if (weekday === 0 || weekday === 6) {
    return null;
  }
  if (PAPER_BOT_MARKET_HOLIDAYS[key]) {
    return null;
  }
  const earlyCloseReason = PAPER_BOT_MARKET_EARLY_CLOSES[key] ?? "";
  return {
    key,
    openMinutes: PAPER_BOT_MARKET_OPEN_MINUTES,
    closeMinutes: earlyCloseReason ? PAPER_BOT_MARKET_EARLY_CLOSE_MINUTES : PAPER_BOT_MARKET_CLOSE_MINUTES,
    earlyCloseReason,
  };
}

function getPaperBotClosedReason(key) {
  if (PAPER_BOT_MARKET_HOLIDAYS[key]) {
    return `Closed for ${PAPER_BOT_MARKET_HOLIDAYS[key]}`;
  }
  const weekday = getPaperBotWeekday(key);
  return weekday === 0 || weekday === 6 ? "Weekend" : "Market closed";
}

function getPaperBotTimeZoneOffsetMs(date) {
  const parts = getPaperBotEtParts(date);
  const zonedTimeAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return zonedTimeAsUtc - date.getTime();
}

function makePaperBotDateInEt(key, minutes) {
  const { year, month, day } = parsePaperBotDateKey(key);
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const localTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let resolvedDate = new Date(localTimeAsUtc);
  for (let index = 0; index < 3; index += 1) {
    resolvedDate = new Date(localTimeAsUtc - getPaperBotTimeZoneOffsetMs(resolvedDate));
  }
  return resolvedDate;
}

function findNextPaperBotMarketSession(fromKey, includeToday = false) {
  let key = includeToday ? fromKey : addPaperBotDateKey(fromKey, 1);
  for (let offset = 0; offset < 370; offset += 1) {
    const session = getPaperBotMarketSession(key);
    if (session) {
      return session;
    }
    key = addPaperBotDateKey(key, 1);
  }
  return null;
}

function formatPaperBotMarketTime(minutes) {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix} ET`;
}

function formatPaperBotCountdown(targetDate, now = new Date()) {
  const totalSeconds = Math.max(0, Math.ceil((targetDate.getTime() - now.getTime()) / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

function getPaperBotMarketStatus(now = new Date()) {
  const etParts = getPaperBotEtParts(now);
  const key = getPaperBotDateKey(etParts);
  const currentMinutes = etParts.hour * 60 + etParts.minute + etParts.second / 60;
  const todaySession = getPaperBotMarketSession(key);
  if (todaySession && currentMinutes < todaySession.openMinutes) {
    const opensAt = makePaperBotDateInEt(key, todaySession.openMinutes);
    return {
      isOpen: false,
      state: "preopen",
      label: "Market closed",
      detail: `Opens in ${formatPaperBotCountdown(opensAt, now)} (${formatPaperBotMarketTime(todaySession.openMinutes)})`,
      nextEventAt: opensAt,
    };
  }
  if (todaySession && currentMinutes >= todaySession.openMinutes && currentMinutes < todaySession.closeMinutes) {
    const closesAt = makePaperBotDateInEt(key, todaySession.closeMinutes);
    return {
      isOpen: true,
      state: todaySession.earlyCloseReason ? "early-close" : "open",
      label: todaySession.earlyCloseReason ? "Market open - early close" : "Market open",
      detail: `Closes in ${formatPaperBotCountdown(closesAt, now)} (${formatPaperBotMarketTime(todaySession.closeMinutes)})`,
      nextEventAt: closesAt,
    };
  }
  const nextSession = findNextPaperBotMarketSession(key, false);
  const opensAt = nextSession ? makePaperBotDateInEt(nextSession.key, nextSession.openMinutes) : null;
  return {
    isOpen: false,
    state: PAPER_BOT_MARKET_HOLIDAYS[key] ? "holiday" : "closed",
    label: getPaperBotClosedReason(key),
    detail: opensAt
      ? `Opens in ${formatPaperBotCountdown(opensAt, now)} (${formatPaperBotMarketTime(nextSession.openMinutes)})`
      : "Next regular session unavailable",
    nextEventAt: opensAt,
  };
}

function getPaperBotCloseBlockMessage(ticker = "") {
  const normalizedTicker = ticker ? getPaperBotTicker(ticker) : "this trade";
  const marketStatus = paperBotMarketStatusSnapshot ?? getPaperBotMarketStatus();
  const reasons = [];
  if (!marketStatus.isOpen) {
    reasons.push(`${marketStatus.label}. ${marketStatus.detail}.`);
  }
  if (paperBotState.mode === "max_autonomous_cloud" && !hasPaperBotCloudSync()) {
    reasons.push("Paper-bot cloud sync is not configured yet.");
  }
  if (paperBotState.mode === "max_autonomous_cloud" && hasPaperBotCloudSync() && !getPaperBotSyncToken()) {
    reasons.push("Enter the paper-bot Sync key on this device.");
  }
  return reasons.length ? `Cannot close ${normalizedTicker} yet. ${reasons.join(" ")}` : "";
}

function syncPaperBotCloseButtons() {
  document.querySelectorAll("[data-paper-bot-close-trade]").forEach((button) => {
    const blockMessage = getPaperBotCloseBlockMessage(button.dataset.paperBotCloseTrade);
    button.classList.toggle("is-blocked", Boolean(blockMessage));
    button.dataset.blocked = String(Boolean(blockMessage));
    button.title = blockMessage || "Close this paper trade at the current mark";
  });
}

function updatePaperBotMarketClock() {
  paperBotMarketStatusSnapshot = getPaperBotMarketStatus();
  if (paperBotMarketClock) {
    paperBotMarketClock.dataset.state = paperBotMarketStatusSnapshot.state;
  }
  if (paperBotMarketStatus) {
    paperBotMarketStatus.textContent = paperBotMarketStatusSnapshot.label;
  }
  if (paperBotMarketCountdown) {
    paperBotMarketCountdown.textContent = paperBotMarketStatusSnapshot.detail;
  }
  syncPaperBotCloseButtons();
}

function startPaperBotMarketClock() {
  updatePaperBotMarketClock();
  if (paperBotMarketClockTimer) {
    window.clearInterval(paperBotMarketClockTimer);
  }
  paperBotMarketClockTimer = window.setInterval(updatePaperBotMarketClock, 1000);
}

function renderPaperBotPanelForCurrentSelection(plan = null) {
  if (paperBotState.mode === "max_autonomous_cloud") {
    renderPaperBotPanel(null, null, null, null, plan);
    return;
  }
  const context = getPaperBotDecisionContext();
  if (!context) {
    renderPaperBotPanel();
    return;
  }
  renderPaperBotPanel(
    context.company,
    context.johnView,
    context.maxView,
    context.decision,
    plan,
  );
}

async function refreshPaperBotLiveMarks(options = {}) {
  if (paperBotLiveRefreshInFlight) {
    return;
  }
  const positions = Object.values(paperBotState.positions ?? {});
  if (!positions.length) {
    setPaperBotLiveStatus("Max has no open paper positions to mark.", "idle");
    renderPaperBotPanelForCurrentSelection();
    return;
  }
  if (!hasPaperBotLiveSource()) {
    setPaperBotLiveStatus("Add an FMP key to stream live marks for open paper positions.", "missing");
    renderPaperBotPanelForCurrentSelection();
    return;
  }

  paperBotLiveRefreshInFlight = true;
  setPaperBotLiveStatus("Refreshing Max paper marks...", "loading");
  try {
    const tickers = positions.map(getPaperBotTicker);
    let quoteMap = new Map();
    try {
      quoteMap = await fetchFmpBatchQuotes(tickers);
    } catch (error) {
      quoteMap = new Map();
      await Promise.all(
        positions.map(async (position) => {
          const ticker = getPaperBotTicker(position);
          const company = companyUniverseByTicker.get(ticker);
          if (!company) {
            return;
          }
          fmpQuoteCache.delete(ticker);
          const quote = await fetchFmpQuote(company);
          if (quote?.price) {
            quoteMap.set(ticker, quote);
          }
        }),
      );
    }

    let updatedCount = 0;
    for (const position of positions) {
      const ticker = getPaperBotTicker(position);
      const company = companyUniverseByTicker.get(ticker);
      if (!company) {
        continue;
      }
      const quote = quoteMap.get(ticker);
      if (!quote?.price) {
        continue;
      }
      paperBotMarkPriceCache.set(ticker, quote);
      if (!paperBotState.positions[ticker]) {
        continue;
      }
      updatedCount += 1;
      paperBotState.positions[ticker].lastPrice = quote.price;

      if (paperBotState.mode !== "max_autonomous_cloud" && options.execute === true && paperBotState.autoEnabled) {
        const markedCompany = {
          ...company,
          price: quote.price,
          date: `FMP live quote ${new Date(quote.fetchedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
        };
        const context = getPaperBotDecisionContext(markedCompany);
        if (context) {
          const plan = calculatePaperBotPlan(
            markedCompany,
            context.johnView,
            context.maxView,
            context.decision,
          );
          if (plan.action === "SELL") {
            executePaperBotPlan(
              markedCompany,
              context.johnView,
              context.maxView,
              context.decision,
              plan,
            );
          }
        }
      }
    }
    if (paperBotState.mode !== "max_autonomous_cloud") {
      savePaperBotState();
    }
    setPaperBotLiveStatus(
      updatedCount
        ? `Live paper marks updated for ${updatedCount}/${positions.length} open positions.`
        : "FMP returned no fresh paper marks; showing cached marks.",
      updatedCount ? "on" : "warning",
    );
    renderPaperBotPanelForCurrentSelection();
    if (Object.keys(paperBotState.positions ?? {}).length === 0 && paperBotLiveTimer) {
      window.clearInterval(paperBotLiveTimer);
      paperBotLiveTimer = null;
    }
  } catch (error) {
    setPaperBotLiveStatus("Paper bot live feed could not refresh; cached marks remain visible.", "error");
    renderPaperBotPanelForCurrentSelection();
  } finally {
    paperBotLiveRefreshInFlight = false;
  }
}

function schedulePaperBotLiveRefresh(options = {}) {
  if (paperBotLiveTimer) {
    window.clearInterval(paperBotLiveTimer);
    paperBotLiveTimer = null;
  }
  const hasOpenPositions = Object.keys(paperBotState.positions ?? {}).length > 0;
  if (!hasOpenPositions) {
    setPaperBotLiveStatus("Max has no open paper positions to mark.", "idle");
    return;
  }
  if (!hasPaperBotLiveSource()) {
    setPaperBotLiveStatus("Add an FMP key to stream live marks for open paper positions.", "missing");
    return;
  }
  if (options.immediate) {
    refreshPaperBotLiveMarks({ execute: paperBotState.mode !== "max_autonomous_cloud" && paperBotState.autoEnabled });
  }
  paperBotLiveTimer = window.setInterval(() => {
    refreshPaperBotLiveMarks({ execute: paperBotState.mode !== "max_autonomous_cloud" && paperBotState.autoEnabled });
  }, getLivePollSeconds() * 1000);
}

function makePaperBotMetric(label, value, tone = "") {
  const item = document.createElement("div");
  item.className = "paper-bot-metric";
  if (tone) {
    item.dataset.tone = tone;
  }
  const labelElement = document.createElement("span");
  labelElement.textContent = label;
  const valueElement = document.createElement("strong");
  valueElement.textContent = value;
  item.append(labelElement, valueElement);
  return item;
}

function makePaperBotEmptyRow(message, columns) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = columns;
  cell.className = "paper-bot-empty";
  cell.textContent = message;
  row.append(cell);
  return row;
}

function getTradeRealizedPnl(trade) {
  const directValue = Number(trade?.realizedPnl ?? trade?.realizedPnL ?? trade?.pnl);
  if (Number.isFinite(directValue)) {
    return directValue;
  }
  return null;
}

function getTradeEntryPrice(trade, olderTrades = []) {
  const directValue = Number(trade?.entryPrice ?? trade?.buyPrice ?? trade?.openPrice);
  if (Number.isFinite(directValue) && directValue > 0) {
    return directValue;
  }
  const type = String(trade?.type ?? "NOTE").toUpperCase();
  const tradePrice = Number(trade?.price);
  if (type === "BUY" && Number.isFinite(tradePrice) && tradePrice > 0) {
    return tradePrice;
  }
  const ticker = String(trade?.ticker ?? "").toUpperCase();
  if (type !== "SELL" || !ticker) {
    return null;
  }
  const shares = Number(trade?.shares);
  const matchingBuy = olderTrades.find((candidate) => {
    if (String(candidate?.type ?? "").toUpperCase() !== "BUY") {
      return false;
    }
    if (String(candidate?.ticker ?? "").toUpperCase() !== ticker) {
      return false;
    }
    const candidateShares = Number(candidate?.shares);
    return !Number.isFinite(shares) || !Number.isFinite(candidateShares) || Math.abs(candidateShares - shares) < 0.0001;
  });
  const inferredPrice = Number(matchingBuy?.entryPrice ?? matchingBuy?.price);
  return Number.isFinite(inferredPrice) && inferredPrice > 0 ? inferredPrice : null;
}

function makePaperBotTransactionRow(trade, index = 0, trades = []) {
  const type = String(trade?.type ?? "NOTE").toUpperCase();
  const shares = Number(trade?.shares);
  const price = Number(trade?.price);
  const entryPrice = getTradeEntryPrice(trade, trades.slice(index + 1));
  const value = Number(trade?.value);
  const realizedPnl = getTradeRealizedPnl(trade);
  const fallbackValue =
    Number.isFinite(shares) && Number.isFinite(price) ? shares * price : null;
  const pnlTone =
    realizedPnl == null ? "" : realizedPnl < 0 ? "negative" : realizedPnl > 0 ? "positive" : "neutral";
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${escapeHtml(formatPaperBotTime(trade?.time))}</td>
    <td><span class="paper-bot-trade paper-bot-trade--${escapeHtml(type.toLowerCase())}">${escapeHtml(type)}</span></td>
    <td>${escapeHtml(trade?.ticker ?? "")}</td>
    <td>${Number.isFinite(shares) ? escapeHtml(formatNumber(shares, 4)) : "--"}</td>
    <td>${Number.isFinite(entryPrice) ? escapeHtml(formatMoney(entryPrice)) : "--"}</td>
    <td>${Number.isFinite(price) ? escapeHtml(formatMoney(price)) : "--"}</td>
    <td>${Number.isFinite(value) ? escapeHtml(formatMoney(value)) : fallbackValue == null ? "--" : escapeHtml(formatMoney(fallbackValue))}</td>
    <td${pnlTone ? ` data-tone="${pnlTone}"` : ""}>${realizedPnl == null ? "--" : escapeHtml(formatSignedMoney(realizedPnl))}</td>
    <td class="paper-bot-table__reason">${escapeHtml(trade?.reason ?? "")}</td>
  `;
  return row;
}

function renderPaperBotTransactionsModal() {
  const trades = Array.isArray(paperBotState?.trades) ? paperBotState.trades : [];
  if (paperBotTransactionsSummary) {
    paperBotTransactionsSummary.textContent = trades.length
      ? `${trades.length} recorded paper transaction${trades.length === 1 ? "" : "s"}, newest first.`
      : "No recorded paper transactions yet.";
  }
  if (!paperBotTransactionsBody) {
    return;
  }
  paperBotTransactionsBody.replaceChildren(
    ...(trades.length
      ? trades.map(makePaperBotTransactionRow)
      : [makePaperBotEmptyRow("No paper trades have been recorded yet.", 9)]),
  );
}

function openPaperBotTransactionsModal() {
  if (!paperBotTransactionsModal) {
    return;
  }
  renderPaperBotTransactionsModal();
  paperBotTransactionsModal.hidden = false;
  paperBotTransactionsModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("paper-bot-modal-open");
  paperBotTransactionsClose?.focus();
}

function closePaperBotTransactionsModal() {
  if (!paperBotTransactionsModal) {
    return;
  }
  paperBotTransactionsModal.hidden = true;
  paperBotTransactionsModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("paper-bot-modal-open");
  paperBotTransactionsOpen?.focus();
}

function getMaxCloudBotPlanSummary(snapshot) {
  const latestTrade = paperBotState.trades?.[0];
  const generatedLabel = paperBotState.generatedAt
    ? new Date(paperBotState.generatedAt).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "not run yet";
  if (latestTrade) {
    return {
      action: latestTrade.type === "SELL" ? "SELL" : latestTrade.type === "BUY" ? "BUY" : "HOLD",
      label: `Max ${latestTrade.type}`,
      reason: `${latestTrade.reason} Last autonomous run: ${generatedLabel}.`,
    };
  }
  if (snapshot.positions.length > 0) {
    return {
      action: "HOLD",
      label: "Max managing risk",
      reason: `${paperBotState.lastRunSummary ?? "Max is managing open paper positions."} Last autonomous run: ${generatedLabel}.`,
    };
  }
  return {
    action: "WAIT",
    label: "Max scanning",
    reason: `${paperBotState.lastRunSummary ?? "Max is waiting for a clean technical entry."} Last autonomous run: ${generatedLabel}.`,
  };
}

function renderPaperBotPanel(company = null, johnView = null, maxView = null, decision = null, plan = null) {
  if (!paperBotEquity) {
    return;
  }
  const snapshot = getPaperBotSnapshot(company);
  const activePlan =
    paperBotState.mode === "max_autonomous_cloud" && !plan
      ? getMaxCloudBotPlanSummary(snapshot)
      : plan ?? calculatePaperBotPlan(company, johnView, maxView, decision);
  const openTone = snapshot.unrealizedPnl > 0 ? "positive" : snapshot.unrealizedPnl < 0 ? "negative" : "";
  const realizedTone = snapshot.realizedPnl > 0 ? "positive" : snapshot.realizedPnl < 0 ? "negative" : "";

  paperBotEquity.textContent = formatMoney(snapshot.equity);
  paperBotReturn.textContent = `${formatPercent(snapshot.returnPct)} total return`;
  paperBotMetrics?.replaceChildren(
    makePaperBotMetric("Cash", formatMoney(snapshot.cash)),
    makePaperBotMetric("Open value", formatMoney(snapshot.openValue)),
    makePaperBotMetric("Open P/L", formatSignedMoney(snapshot.unrealizedPnl), openTone),
    makePaperBotMetric("Realized P/L", formatSignedMoney(snapshot.realizedPnl), realizedTone),
  );
  renderPaperBotHoldingsChart(snapshot);

  if (paperBotInstruction) {
    paperBotInstruction.textContent = activePlan.label;
    paperBotInstruction.className = `paper-bot-instruction paper-bot-instruction--${getPaperBotActionTone(activePlan.action)}`;
  }
  if (paperBotReason) {
    paperBotReason.textContent = activePlan.reason;
  }
  if (paperBotAutoToggle) {
    paperBotAutoToggle.textContent = paperBotState.autoEnabled ? "Auto paper: On" : "Auto paper: Off";
    paperBotAutoToggle.setAttribute("aria-pressed", String(paperBotState.autoEnabled));
    paperBotAutoToggle.classList.toggle("is-active", paperBotState.autoEnabled);
  }
  updatePaperBotSyncConnectUi();
  if (paperBotEvaluate) {
    paperBotEvaluate.disabled = !company;
  }
  if (paperBotPositionCount) {
    paperBotPositionCount.textContent = `${snapshot.positions.length} open`;
  }
  if (paperBotPositions) {
    paperBotPositions.replaceChildren(
      ...(snapshot.positions.length
        ? snapshot.positions.map((position) => {
            const row = document.createElement("tr");
            const pnlTone = position.unrealizedPnl >= 0 ? "positive" : "negative";
            const closeBlockMessage = getPaperBotCloseBlockMessage(position.ticker);
            row.innerHTML = `
              <td>
                <div class="paper-bot-position-main">
                  <button class="paper-bot-ticker-button" type="button" data-paper-bot-select-ticker="${escapeHtml(position.ticker)}">
                    <strong>${position.ticker}</strong>
                    <small>${position.name ?? ""}</small>
                  </button>
                  <button
                    class="paper-bot-close-trade${closeBlockMessage ? " is-blocked" : ""}"
                    type="button"
                    data-paper-bot-close-trade="${escapeHtml(position.ticker)}"
                    data-blocked="${closeBlockMessage ? "true" : "false"}"
                    title="${escapeHtml(closeBlockMessage || "Close this paper trade at the current mark")}"
                  >Close trade</button>
                </div>
              </td>
              <td>${formatNumber(position.shares, 4)}</td>
              <td>${formatMoney(position.entryPrice)}</td>
              <td>${formatMoney(position.markPrice)}<small>${position.markMeta}</small></td>
              <td class="paper-bot-table__open-pnl" data-tone="${pnlTone}">
                <strong>${formatMoney(position.marketValue)}</strong>
                <small>${formatSignedMoney(position.unrealizedPnl)} | ${formatPercent(position.unrealizedPct)}</small>
              </td>
            `;
            return row;
          })
        : [makePaperBotEmptyRow("No open paper positions yet.", 5)]),
    );
    syncPaperBotCloseButtons();
  }
  if (paperBotTransactionsCount) {
    paperBotTransactionsCount.textContent = String(paperBotState.trades?.length ?? 0);
  }
  if (paperBotTransactionsModal && !paperBotTransactionsModal.hidden) {
    renderPaperBotTransactionsModal();
  }
}

function selectPaperBotPositionTicker(ticker) {
  const normalizedTicker = getPaperBotTicker(ticker);
  const company = companyUniverseByTicker.get(normalizedTicker);
  if (!company) {
    return;
  }
  currentCompanyId = company.id;
  renderCompany(company.id);
}

function openPaperBotCloseConfirm(ticker) {
  const normalizedTicker = getPaperBotTicker(ticker);
  const position = paperBotState.positions?.[normalizedTicker];
  if (!paperBotCloseConfirmModal || !position) {
    return;
  }
  const blockMessage = getPaperBotCloseBlockMessage(normalizedTicker);
  if (blockMessage) {
    if (paperBotState.mode === "max_autonomous_cloud" && !hasPaperBotCloudSync()) {
      clearPaperBotManualOverrides();
    }
    syncPaperBotCloseButtons();
    setPaperBotLiveStatus(blockMessage, "warning");
    return;
  }
  pendingPaperBotCloseTicker = normalizedTicker;
  const markPrice = getPaperBotMarkPrice(position, companyUniverseByTicker.get(normalizedTicker));
  const shares = Number(position.shares ?? 0);
  const value = shares * markPrice;
  if (paperBotCloseConfirmMessage) {
    paperBotCloseConfirmMessage.textContent = paperBotState.mode === "max_autonomous_cloud"
      ? `Are you sure you want to close ${normalizedTicker} at the current mark of ${formatMoney(markPrice)} for an estimated ${formatMoney(value)} trade value? This will send the close to the shared cloud ledger before this browser removes the position.`
      : `Are you sure you want to manually close ${normalizedTicker} at the current mark of ${formatMoney(markPrice)} for an estimated ${formatMoney(value)} trade value?`;
  }
  paperBotCloseConfirmModal.hidden = false;
  paperBotCloseConfirmModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("paper-bot-modal-open");
  paperBotCloseConfirmCancel?.focus();
}

function closePaperBotCloseConfirm() {
  if (!paperBotCloseConfirmModal) {
    return;
  }
  pendingPaperBotCloseTicker = null;
  paperBotCloseConfirmModal.hidden = true;
  paperBotCloseConfirmModal.setAttribute("aria-hidden", "true");
  if (!paperBotTransactionsModal || paperBotTransactionsModal.hidden) {
    document.body.classList.remove("paper-bot-modal-open");
  }
}

async function submitPaperBotManualClose(trade) {
  const syncUrl = buildPaperBotSyncUrl("/paper-bot/close");
  if (!syncUrl) {
    throw new Error("No paper bot sync endpoint configured.");
  }
  return fetchJsonRequest(
    syncUrl,
    {
      method: "POST",
      headers: getPaperBotSyncHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        trade,
        submittedAt: new Date().toISOString(),
      }),
    },
    15000,
  );
}

function buildPaperBotManualCloseTrade(position, normalizedTicker, price) {
  const shares = Number(position.shares ?? 0);
  const entryPrice = Number(position.entryPrice ?? price);
  const value = roundPaperBotMoney(shares * price);
  const pnl = roundPaperBotMoney((price - entryPrice) * shares);
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    time: new Date().toISOString(),
    type: "SELL",
    ticker: normalizedTicker,
    shares,
    entryPrice,
    exitPrice: price,
    price,
    value,
    realizedPnl: pnl,
    pnl,
    manualOverride: true,
    openedAt: position.openedAt,
    reason: "Manual override: user closed this paper trade at the current mark.",
  };
}

async function manuallyClosePaperBotTrade(ticker) {
  const normalizedTicker = getPaperBotTicker(ticker);
  const position = paperBotState.positions?.[normalizedTicker];
  if (!position) {
    closePaperBotCloseConfirm();
    renderPaperBotPanelForCurrentSelection();
    return;
  }
  const blockMessage = getPaperBotCloseBlockMessage(normalizedTicker);
  if (blockMessage) {
    closePaperBotCloseConfirm();
    if (paperBotState.mode === "max_autonomous_cloud" && !hasPaperBotCloudSync()) {
      clearPaperBotManualOverrides();
    }
    renderPaperBotPanelForCurrentSelection();
    setPaperBotLiveStatus(blockMessage, "warning");
    return;
  }
  const company = companyUniverseByTicker.get(normalizedTicker);
  const price = getPaperBotMarkPrice(position, company);
  const recordedTrade = buildPaperBotManualCloseTrade(position, normalizedTicker, price);
  const isCloudMode = paperBotState.mode === "max_autonomous_cloud";
  if (isCloudMode) {
    closePaperBotCloseConfirm();
    if (!hasPaperBotCloudSync()) {
      clearPaperBotManualOverrides();
      renderPaperBotPanelForCurrentSelection();
      setPaperBotLiveStatus(
        `No close was saved for ${normalizedTicker}. Paper-bot cloud sync is not configured, so closing locally would put desktop and mobile out of sync.`,
        "warning",
      );
      return;
    }
    setPaperBotLiveStatus(`Submitting ${normalizedTicker} close to Max's shared cloud ledger...`, "buy");
    try {
      await submitPaperBotManualClose(recordedTrade);
      rememberPaperBotManualClose(recordedTrade);
      await refreshPaperBotCloudState({ immediate: true, force: true });
      renderPaperBotPanelForCurrentSelection();
      setPaperBotLiveStatus(`${normalizedTicker} close synced to the shared cloud ledger.`, "buy");
    } catch (error) {
      clearPaperBotManualOverrides();
      await refreshPaperBotCloudState({ immediate: true, force: true });
      renderPaperBotPanelForCurrentSelection();
      const errorMessage = String(error?.message || "");
      setPaperBotLiveStatus(
        errorMessage.includes("401")
          ? `No close was saved for ${normalizedTicker}. The cloud sync key was rejected on this device.`
          : `No close was saved for ${normalizedTicker} because cloud sync did not confirm. Please try again once sync is reachable.`,
        "warning",
      );
    }
    return;
  }

  paperBotState.cash = roundPaperBotMoney(Number(paperBotState.cash ?? 0) + Number(recordedTrade.value ?? 0));
  paperBotState.realizedPnl = roundPaperBotMoney(
    Number(paperBotState.realizedPnl ?? 0) + Number(recordedTrade.realizedPnl ?? recordedTrade.pnl ?? 0),
  );
  delete paperBotState.positions[normalizedTicker];
  addPaperBotTrade(recordedTrade);
  savePaperBotState();
  closePaperBotCloseConfirm();
  renderPaperBotPanelForCurrentSelection();
  schedulePaperBotLiveRefresh();
}

function resetPaperBot() {
  paperBotState = createDefaultPaperBotState();
  paperBotMarkPriceCache.clear();
  savePaperBotState();
  schedulePaperBotLiveRefresh();
  const company = companyUniverseById.get(currentCompanyId);
  if (!company) {
    renderPaperBotPanel();
    return;
  }
  const opportunity = getOpportunityProfile(company);
  const johnView = buildJohnView(company, opportunity, opportunity.resolved, { includeDetails: false });
  const maxView = buildMaxView(company, opportunity, opportunity.resolved, { includeDetails: false });
  const decision = combineTradingDecision(johnView, maxView);
  renderPaperBotPanel(company, johnView, maxView, decision);
}

function renderPriceLadder(levels) {
  const ladder = document.querySelector("#max-price-ladder");
  if (!ladder) {
    return;
  }
  if (!levels) {
    ladder.textContent = "Attach OHLCV and swing-level data to render the Technical execution ladder.";
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
      "Select a ticker to combine Fundamental and Technical into one actionable view.";
    document.querySelector("#trading-decision-grid")?.replaceChildren();
    renderPaperBotPanel();
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
        { label: "Add zone", value: formatPriceRange(levels.addLow, levels.addHigh), note: "Deeper retracement zone; only valid if the fundamental thesis remains intact." },
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
      `${company.ticker}: Fundamental says ${johnView.verdict}, Technical says ${maxView.verdict}. Final Trading Decision is ${decision.finalCall} with ${decision.conviction}/100 conviction.`;
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
  renderPaperBotPanel(company, johnView, maxView, decision);
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
  renderTradingViewChart(company);
  renderMaxExecutionChart(company, opportunity, resolved);
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
  const finalCallRank = { Buy: 4, Watch: 3, Wait: 2, Avoid: 1 };
  const tableModels = filteredUniverse.map(getDecisionModel);
  const rankedModels = tableModels
    .filter((model) => currentFilters.finalCall === "all" || model.decision.finalCall === currentFilters.finalCall)
    .sort((leftModel, rightModel) => {
    const left = leftModel.company;
    const right = rightModel.company;
    if (currentFilters.finalCallSort !== "none") {
      const direction = currentFilters.finalCallSort === "best" ? 1 : -1;
      const callDelta =
        (finalCallRank[rightModel.decision.finalCall] ?? 0) -
        (finalCallRank[leftModel.decision.finalCall] ?? 0);
      if (callDelta !== 0) {
        return callDelta * direction;
      }
      const convictionDelta = rightModel.decision.conviction - leftModel.decision.conviction;
      if (convictionDelta !== 0) {
        return convictionDelta * direction;
      }
    }
    if (searchTerm) {
      const relevanceDelta =
        getSearchRelevance(right, searchTerm) - getSearchRelevance(left, searchTerm);
      if (relevanceDelta !== 0) {
        return relevanceDelta;
      }
    }
    const leftProfile = leftModel.opportunity;
    const rightProfile = rightModel.opportunity;
    if (leftProfile.opportunityScore !== rightProfile.opportunityScore) {
      return rightProfile.opportunityScore - leftProfile.opportunityScore;
    }
    if (isResearchReadyProfile(left) !== isResearchReadyProfile(right)) {
      return Number(isResearchReadyProfile(right)) - Number(isResearchReadyProfile(left));
    }
    return left.ticker.localeCompare(right.ticker);
  });
  const rankedUniverse = rankedModels.map((model) => model.company);

  const visibleModels = rankedModels.slice(0, MAX_TABLE_RESULTS);
  const currentFilteredModel = rankedModels.find((model) => model.company.id === currentCompanyId);
  const shouldPinCurrentCompany =
    currentFilters.finalCallSort === "none" && currentFilters.finalCall === "all";
  if (
    shouldPinCurrentCompany &&
    currentFilteredModel &&
    !visibleModels.some((model) => model.company.id === currentCompanyId)
  ) {
    visibleModels.unshift(currentFilteredModel);
    visibleModels.splice(MAX_TABLE_RESULTS);
  }

  if (companyCount) {
    companyCount.textContent =
      rankedModels.length > MAX_TABLE_RESULTS
        ? `${pluralize(rankedModels.length, "company", "companies")} match | showing top ${visibleModels.length} by decision score`
        : `${pluralize(rankedModels.length, "company", "companies")} shown`;
  }

  opportunityTableBody.replaceChildren(
    ...visibleModels.map(({ company, johnView, maxView, decision }) => {
      const isResearchReady = isResearchReadyProfile(company);
      const row = document.createElement("tr");
      row.dataset.id = company.id;
      row.innerHTML = `
        <td>
          <div class="opportunity-table__cell">
            <strong>${company.ticker}</strong>
            <small class="opportunity-table__name-line">
              <span>${company.name}</span>
              <i
                class="opportunity-table__status-dot ${isResearchReady ? "opportunity-table__status-dot--research" : "opportunity-table__status-dot--directory"}"
                title="${isResearchReady ? "Research-ready" : "Directory-only"}"
                aria-label="${isResearchReady ? "Research-ready" : "Directory-only"}"
              ></i>
            </small>
            <small>${company.industry} | ${company.sector}</small>
          </div>
        </td>
        <td>
          <div class="opportunity-table__decision-summary">
            <div class="opportunity-table__decision-topline">
              <span class="opportunity-table__decision opportunity-table__decision--${decision.finalCall.toLowerCase()}">${decision.finalCall}</span>
            </div>
          </div>
        </td>
        <td>
          ${buildMaxBotStatus(company)}
        </td>
        <td>
          <div class="opportunity-table__conviction">
            ${buildConvictionBar("Overall", decision.conviction, decision.finalCall)}
            ${buildConvictionBar("Fundamental", johnView.score, johnView.verdict)}
            ${buildConvictionBar("Technical", maxView.score, maxView.verdict)}
          </div>
        </td>
      `;
      row.addEventListener("click", () => renderCompany(company.id));
      return row;
    }),
  );

  if (visibleModels.length === 0) {
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
  if (!triggerForm) {
    return;
  }
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
  themeToggle.dataset.activeTheme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  window.localStorage.setItem("golden-pocket-theme", theme);
  renderTradingViewChart(companyUniverseById.get(currentCompanyId), { force: true });
  renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
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
  currentFilters.finalCall = "Buy";
  currentFilters.finalCallSort = "none";
  setTickerMenuOpen(false);
  refreshExplorer();
}

if (scenarioSwitcher) {
  scenarioSwitcher.replaceChildren(
    ...scenarios.map((scenario) => makeButton(scenario, "switcher-pill", renderScenario)),
  );
}

if (methodSwitcher) {
  methodSwitcher.replaceChildren(
    ...targetMethods.map((method) => makeButton(method, "method-pill", renderTargetMethod)),
  );
}

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

if (tickerSearch) {
  tickerSearch.addEventListener("input", (event) => {
    currentFilters.search = event.target.value;
    refreshExplorer();
  });
}

if (researchReadyOnlyToggle) {
  researchReadyOnlyToggle.addEventListener("change", (event) => {
    currentFilters.researchReadyOnly = event.target.checked;
    refreshExplorer();
  });
}

if (finalCallFilter) {
  finalCallFilter.addEventListener("change", (event) => {
    currentFilters.finalCall = event.target.value;
    refreshExplorer();
  });
}

if (finalCallSortButton) {
  finalCallSortButton.addEventListener("click", () => {
    currentFilters.finalCallSort =
      currentFilters.finalCallSort === "none"
        ? "best"
        : currentFilters.finalCallSort === "best"
          ? "worst"
          : "none";
    refreshExplorer();
  });
}

if (maxLiveToggle) {
  maxLiveToggle.addEventListener("click", () => {
    setMaxLiveEnabled(!maxExecutionLiveEnabled);
    fmpQuoteCache.clear();
    fmpHistoryCache.clear();
    renderMaxExecutionChart(companyUniverseById.get(currentCompanyId));
  });
}

if (maxLiveConnect) {
  maxLiveConnect.addEventListener("click", connectLocalFmpKey);
}

if (paperBotAutoToggle) {
  paperBotAutoToggle.addEventListener("click", () => {
    paperBotState.autoEnabled = !paperBotState.autoEnabled;
    savePaperBotState();
    const company = companyUniverseById.get(currentCompanyId);
    if (company) {
      renderCompany(company.id);
    } else {
      renderPaperBotPanel();
    }
  });
}

if (paperBotEvaluate) {
  paperBotEvaluate.addEventListener("click", () => {
    const company = companyUniverseById.get(currentCompanyId);
    if (!company) {
      renderPaperBotPanel();
      return;
    }
    const opportunity = getOpportunityProfile(company);
    const johnView = buildJohnView(company, opportunity, opportunity.resolved, { includeDetails: false });
    const maxView = buildMaxView(company, opportunity, opportunity.resolved, { includeDetails: false });
    const decision = combineTradingDecision(johnView, maxView);
    const plan = evaluatePaperBotForSelection(company, johnView, maxView, decision, { execute: true });
    renderPaperBotPanel(company, johnView, maxView, decision, plan);
  });
}

if (paperBotReset) {
  paperBotReset.addEventListener("click", resetPaperBot);
}

if (paperBotTransactionsOpen) {
  paperBotTransactionsOpen.addEventListener("click", openPaperBotTransactionsModal);
}

if (paperBotSyncConnect) {
  paperBotSyncConnect.addEventListener("click", connectPaperBotSyncToken);
}

if (paperBotTransactionsClose) {
  paperBotTransactionsClose.addEventListener("click", closePaperBotTransactionsModal);
}

if (paperBotTransactionsModal) {
  paperBotTransactionsModal.addEventListener("click", (event) => {
    if (event.target?.matches?.("[data-paper-bot-modal-close]")) {
      closePaperBotTransactionsModal();
    }
  });
}

if (paperBotPositions) {
  paperBotPositions.addEventListener("click", (event) => {
    const closeButton = event.target?.closest?.("[data-paper-bot-close-trade]");
    if (!closeButton) {
      const tickerButton = event.target?.closest?.("[data-paper-bot-select-ticker]");
      if (tickerButton) {
        selectPaperBotPositionTicker(tickerButton.dataset.paperBotSelectTicker);
      }
      return;
    }
    openPaperBotCloseConfirm(closeButton.dataset.paperBotCloseTrade);
  });
}

if (paperBotHoldingsChartWrap) {
  paperBotHoldingsChartWrap.addEventListener("pointermove", updatePaperBotHoldingsHover);
  paperBotHoldingsChartWrap.addEventListener("pointerleave", hidePaperBotHoldingsHover);
  paperBotHoldingsChartWrap.addEventListener("mousemove", updatePaperBotHoldingsHover);
  paperBotHoldingsChartWrap.addEventListener("mouseleave", hidePaperBotHoldingsHover);
}

if (paperBotCloseConfirmOk) {
  paperBotCloseConfirmOk.addEventListener("click", () => {
    if (pendingPaperBotCloseTicker) {
      manuallyClosePaperBotTrade(pendingPaperBotCloseTicker);
    }
  });
}

if (paperBotCloseConfirmCancel) {
  paperBotCloseConfirmCancel.addEventListener("click", closePaperBotCloseConfirm);
}

if (paperBotCloseConfirmModal) {
  paperBotCloseConfirmModal.addEventListener("click", (event) => {
    if (event.target?.matches?.("[data-paper-bot-close-confirm-cancel]")) {
      closePaperBotCloseConfirm();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && paperBotTransactionsModal && !paperBotTransactionsModal.hidden) {
    closePaperBotTransactionsModal();
  }
  if (event.key === "Escape" && paperBotCloseConfirmModal && !paperBotCloseConfirmModal.hidden) {
    closePaperBotCloseConfirm();
  }
});

clearFiltersButton.addEventListener("click", resetFilters);

if (triggerForm) {
  triggerForm.addEventListener("input", updateReadiness);
}
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
startPaperBotMarketClock();
renderPaperBotPanelForCurrentSelection();
schedulePaperBotCloudStateRefresh();
schedulePaperBotLiveRefresh();
refreshExplorer();
renderScenario("base");
updateReadiness();
