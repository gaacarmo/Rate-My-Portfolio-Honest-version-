import {
  PortfolioAsset,
  PortfolioMetrics,
  AnalysisResult,
  Warning,
  Recommendation,
  PersonalityType,
  Portfolio,
} from "@/types";

const RISK_SCORES: Record<string, number> = {
  very_low: 10,
  low: 25,
  medium: 50,
  high: 75,
  extreme: 100,
};

export function normalizeWeights(assets: PortfolioAsset[]): PortfolioAsset[] {
  const total = assets.reduce((s, a) => s + a.weight, 0);
  if (total === 0) return assets;
  return assets.map((a) => ({ ...a, weight: (a.weight / total) * 100 }));
}

export function calculateMetrics(assets: PortfolioAsset[]): PortfolioMetrics {
  const normalized = normalizeWeights(assets);

  const hhi = normalized.reduce(
    (sum, a) => sum + Math.pow(a.weight / 100, 2),
    0
  );
  const maxPositionWeight = Math.max(...normalized.map((a) => a.weight));
  const effectiveN = hhi > 0 ? 1 / hhi : 0;

  const byAssetClass: Record<string, number> = {};
  const bySector: Record<string, number> = {};
  const byGeography: Record<string, number> = {};
  const byRiskLevel: Record<string, number> = {};

  normalized.forEach((a) => {
    byAssetClass[a.assetClass] = (byAssetClass[a.assetClass] || 0) + a.weight;
    if (a.sector) {
      bySector[a.sector] = (bySector[a.sector] || 0) + a.weight;
    }
    byGeography[a.geography] = (byGeography[a.geography] || 0) + a.weight;
    byRiskLevel[a.riskLevel] = (byRiskLevel[a.riskLevel] || 0) + a.weight;
  });

  const cryptoExposure = byAssetClass["crypto"] || 0;
  const techExposure = bySector["tech"] || 0;
  const stockExposure = (byAssetClass["stock"] || 0) + (byAssetClass["etf"] || 0);
  const bondExposure = (byAssetClass["bond"] || 0) + (byAssetClass["fixed_income"] || 0);

  const weightedRiskScore = normalized.reduce(
    (sum, a) => sum + (a.weight / 100) * RISK_SCORES[a.riskLevel],
    0
  );

  return {
    hhi,
    maxPositionWeight,
    effectiveN,
    assetClassCount: Object.keys(byAssetClass).length,
    sectorCount: Object.keys(bySector).length,
    geographyCount: Object.keys(byGeography).length,
    assetCount: assets.length,
    weightedRiskScore,
    cryptoExposure,
    techExposure,
    stockExposure,
    bondExposure,
    byAssetClass,
    bySector,
    byGeography,
    byRiskLevel,
  };
}

function calcDiversificationScore(m: PortfolioMetrics): number {
  let score = 0;
  // Asset count (max 25pts)
  score += Math.min(25, m.assetCount * 2.5);
  // Asset class diversity (max 30pts)
  score += Math.min(30, (m.assetClassCount - 1) * 10);
  // Sector diversity (max 20pts)
  score += Math.min(20, m.sectorCount * 4);
  // Geographic diversity (max 25pts)
  score += Math.min(25, (m.geographyCount - 1) * 10);
  return Math.min(100, Math.max(0, score));
}

function calcConcentrationScore(m: PortfolioMetrics): number {
  let score = 100;
  // HHI penalty (primary driver)
  score -= m.hhi * 100;
  // Max position penalty
  if (m.maxPositionWeight > 60) score -= 25;
  else if (m.maxPositionWeight > 40) score -= 15;
  else if (m.maxPositionWeight > 25) score -= 5;
  return Math.min(100, Math.max(0, score));
}

function calcRiskScore(m: PortfolioMetrics): number {
  let score = 100;
  // Crypto penalty
  if (m.cryptoExposure > 70) score -= 40;
  else if (m.cryptoExposure > 50) score -= 30;
  else if (m.cryptoExposure > 30) score -= 20;
  else if (m.cryptoExposure > 15) score -= 10;
  // No fixed income safety net for high-risk portfolio
  if (m.weightedRiskScore > 70 && m.bondExposure < 5) score -= 20;
  // Weighted risk penalty
  if (m.weightedRiskScore > 80) score -= 20;
  else if (m.weightedRiskScore > 65) score -= 10;
  return Math.min(100, Math.max(0, score));
}

function calcCoherenceScore(m: PortfolioMetrics): number {
  let score = 60;
  // Bonus: traditional mix (stocks + bonds)
  if (m.bondExposure > 0 && m.stockExposure > 0) score += 20;
  // Penalty: schizophrenic risk profile (crypto + bonds)
  if (m.cryptoExposure > 20 && m.bondExposure > 20) score -= 20;
  // Bonus: geo diversity
  if (m.geographyCount >= 3) score += 15;
  else if (m.geographyCount >= 2) score += 8;
  // Penalty: all same class
  if (m.assetClassCount === 1) score -= 15;
  // Bonus: multiple risk levels present
  if (Object.keys(m.byRiskLevel).length >= 3) score += 5;
  return Math.min(100, Math.max(0, score));
}

function generateWarnings(m: PortfolioMetrics): Warning[] {
  const warnings: Warning[] = [];

  if (m.maxPositionWeight > 50) {
    warnings.push({
      id: "concentration-extreme",
      level: "danger",
      title: "Extreme Concentration Risk",
      description: `Your largest position is ${m.maxPositionWeight.toFixed(1)}% of the portfolio. One bad earnings call away from an existential crisis.`,
      metric: `${m.maxPositionWeight.toFixed(1)}% max position`,
    });
  } else if (m.maxPositionWeight > 30) {
    warnings.push({
      id: "concentration-high",
      level: "warning",
      title: "High Single-Position Weight",
      description: `Your top position represents ${m.maxPositionWeight.toFixed(1)}% of your portfolio. You have convictions. Hopefully, well-researched ones.`,
      metric: `${m.maxPositionWeight.toFixed(1)}% max position`,
    });
  }

  if (m.cryptoExposure > 60) {
    warnings.push({
      id: "crypto-extreme",
      level: "danger",
      title: "This Is Primarily a Crypto Bet",
      description: `${m.cryptoExposure.toFixed(1)}% in crypto. Your risk management strategy appears to be 'vibe-based.' This is a description, not a compliment.`,
      metric: `${m.cryptoExposure.toFixed(1)}% crypto`,
    });
  } else if (m.cryptoExposure > 30) {
    warnings.push({
      id: "crypto-high",
      level: "warning",
      title: "Significant Crypto Exposure",
      description: `${m.cryptoExposure.toFixed(1)}% in crypto. Make sure your thesis includes a plan for 'down 80% in 6 months,' because history is data.`,
      metric: `${m.cryptoExposure.toFixed(1)}% crypto`,
    });
  }

  if (m.techExposure > 65) {
    warnings.push({
      id: "tech-thematic",
      level: "warning",
      title: "Thematic Risk: Technology Overweight",
      description: `${m.techExposure.toFixed(1)}% tech exposure. You're betting on one sector's continued dominance, which has worked... until it hasn't.`,
      metric: `${m.techExposure.toFixed(1)}% tech`,
    });
  }

  if (m.geographyCount === 1 && m.stockExposure > 40) {
    warnings.push({
      id: "home-bias",
      level: "warning",
      title: "Geographic Concentration (Home Bias)",
      description: "All equity exposure is in one country. The world has more than one economy, which is worth acknowledging in your asset allocation.",
      metric: "Single geography",
    });
  }

  if (m.assetCount > 20) {
    warnings.push({
      id: "overdiversified",
      level: "info",
      title: "Possible Over-Diversification",
      description: `${m.assetCount} positions. At this scale, you're likely paying fees to track an index less efficiently than just buying the index.`,
      metric: `${m.assetCount} assets`,
    });
  }

  if (m.bondExposure === 0 && m.weightedRiskScore > 60) {
    warnings.push({
      id: "no-fixed-income",
      level: "info",
      title: "Zero Fixed Income Allocation",
      description: "No bonds or fixed income. Either you have a very long time horizon, very high risk tolerance, or haven't gotten to that chapter yet.",
      metric: "0% bonds/fixed income",
    });
  }

  if (m.hhi > 0.5) {
    warnings.push({
      id: "hhi-extreme",
      level: "danger",
      title: "Portfolio Resembles a Single Bet",
      description: `Effective diversification equivalent to ~${m.effectiveN.toFixed(1)} distinct positions. Concentration this extreme requires either exceptional research or exceptional luck.`,
      metric: `HHI: ${m.hhi.toFixed(2)}`,
    });
  }

  if (m.cryptoExposure > 15 && m.bondExposure > 20) {
    warnings.push({
      id: "mixed-signals",
      level: "warning",
      title: "Mixed Risk Signals",
      description: "Holding significant crypto and bonds simultaneously suggests either sophisticated hedging or contradictory risk preferences. Only you know which.",
      metric: `${m.cryptoExposure.toFixed(0)}% crypto + ${m.bondExposure.toFixed(0)}% bonds`,
    });
  }

  return warnings;
}

function generateRecommendations(
  m: PortfolioMetrics,
  scores: { diversification: number; concentration: number; risk: number; coherence: number }
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (scores.concentration < 50) {
    recs.push({
      id: "reduce-concentration",
      priority: "high",
      title: "Reduce Position Concentration",
      description: "Your portfolio is heavily concentrated, amplifying company-specific risk beyond what diversification should allow.",
      actionable: "Cap individual stock positions at 5–10% of the total portfolio. Use broad ETFs (SPY, VTI) for core exposure and keep single-stock picks as satellite positions.",
    });
  }

  if (m.cryptoExposure > 20) {
    recs.push({
      id: "rebalance-crypto",
      priority: m.cryptoExposure > 40 ? "high" : "medium",
      title: "Review Crypto Allocation",
      description: `${m.cryptoExposure.toFixed(0)}% in crypto creates outsized portfolio volatility and tail risk relative to traditional assets.`,
      actionable: "Most evidence-based frameworks suggest limiting speculative assets (including crypto) to 5–15% of holdings. Rebalancing doesn't mean abandoning the thesis — it means sizing it appropriately.",
    });
  }

  if (m.bondExposure === 0 && m.weightedRiskScore > 50) {
    recs.push({
      id: "add-fixed-income",
      priority: "medium",
      title: "Consider Adding Fixed Income",
      description: "A complete absence of bonds or fixed income reduces portfolio resilience during equity market downturns.",
      actionable: "Even a 10–20% allocation to investment-grade bonds (BND, AGG) or Treasuries (TLT) can meaningfully reduce maximum drawdown with limited long-term return impact.",
    });
  }

  if (m.geographyCount === 1 && m.stockExposure > 40) {
    recs.push({
      id: "add-international",
      priority: "medium",
      title: "Add International Diversification",
      description: "Single-country equity exposure concentrates political, currency, and economic cycle risks in one market.",
      actionable: "Allocate 20–30% of equity exposure to international developed markets (VEA, EFA) and 5–15% to emerging markets (VWO, EEM) for genuine geographic diversification.",
    });
  }

  if (m.assetCount <= 3 && m.assetClassCount <= 1) {
    recs.push({
      id: "broaden-holdings",
      priority: "high",
      title: "Broaden Your Holdings",
      description: "Very few positions leave the portfolio entirely exposed to idiosyncratic events in a handful of assets.",
      actionable: "Consider building to 10–15 positions across at least 2–3 asset classes, or use a single broad index ETF (VTI, SPY) to gain instant diversification.",
    });
  }

  if (m.weightedRiskScore > 75 && scores.risk < 60) {
    recs.push({
      id: "add-defensive-anchor",
      priority: "medium",
      title: "Add Defensive Anchors",
      description: "Your portfolio's overall risk level is very high. Defensive assets can improve risk-adjusted returns over full market cycles.",
      actionable: "Allocate 15–25% to defensive assets — gold (GLD), bonds (BND), or dividend-focused ETFs — to act as a volatility buffer during market stress.",
    });
  }

  return recs;
}

function determinePersonality(m: PortfolioMetrics, score: number): PersonalityType {
  if (m.cryptoExposure > 65) {
    return {
      key: "crypto_evangelist",
      name: "The Crypto Evangelist",
      icon: "Moon",
      description: "You believe traditional finance is broken. You're proving it by breaking your own finances faster. Commitment to the cause is admirable.",
      tagline: "WAGMI. (Statistically unlikely, but fine.)",
    };
  }

  if (m.hhi > 0.45 && m.weightedRiskScore > 75) {
    return {
      key: "fomo_surfer",
      name: "The FOMO Surfer",
      icon: "Waves",
      description: "Your portfolio is a real-time record of whatever was trending the last time you opened your brokerage app. You call this 'being opportunistic.' We call it something else.",
      tagline: "Buy high. Panic sell. Repeat.",
    };
  }

  if (m.techExposure > 65) {
    return {
      key: "tech_true_believer",
      name: "The Tech True Believer",
      icon: "Laptop",
      description: "You're not investing in companies. You're investing in the future — specifically, the future where software eats the world and your NVDA position justifies your personality.",
      tagline: "Disrupting the concept of diversification.",
    };
  }

  if (m.bondExposure > 50 || (m.byRiskLevel["very_low"] || 0) + (m.byRiskLevel["low"] || 0) > 60) {
    return {
      key: "overcautious_hibernator",
      name: "The Overcautious Hibernator",
      icon: "Shield",
      description: "Safety is a virtue. So is beating inflation. Your portfolio is very good at one of these two things.",
      tagline: "Capital preservation above all. Including real returns.",
    };
  }

  if (m.bondExposure + (m.byAssetClass["reit"] || 0) > 30 && m.weightedRiskScore < 40) {
    return {
      key: "dividend_collector",
      name: "The Dividend Collector",
      icon: "Inbox",
      description: "You don't need growth. You need quarterly deposits and the ability to mention passive income at every social gathering. You have found your calling.",
      tagline: "Compounding wisdom. At 2.3% yield.",
    };
  }

  if (score >= 78) {
    return {
      key: "surprisingly_responsible",
      name: "The Surprisingly Responsible Adult",
      icon: "Target",
      description: "Against all odds, you have constructed a portfolio that is diversified, risk-aware, and defensible at a dinner party. This is not common. Your future self will acknowledge this.",
      tagline: "Doing the boring thing. Correctly.",
    };
  }

  if (m.assetCount <= 4 && m.assetClassCount <= 2 && m.weightedRiskScore < 55) {
    return {
      key: "index_fundamentalist",
      name: "The Index Fundamentalist",
      icon: "TrendingUp",
      description: "You've read about efficient markets and taken it extremely literally. Three ETFs. No individual names. No fun. Statistically defensible. Possibly correct.",
      tagline: "If you can't beat the market, at least be the market.",
    };
  }

  if (m.assetCount > 15) {
    return {
      key: "chaos_agent",
      name: "The Chaos Agent",
      icon: "Dices",
      description: "Diversified? Yes. Intentionally? Unclear. You own a piece of everything and understand none of it, which is actually a coherent strategy if you're comfortable with that description.",
      tagline: "Throwing darts at the entire global market.",
    };
  }

  return {
    key: "confused_optimist",
    name: "The Confused Optimist",
    icon: "CircleHelp",
    description: "Your portfolio tells the story of someone who has done some research, acted on some of it, ignored some of it, and is still figuring out the rest. This is, frankly, most people.",
    tagline: "A work in progress. Aren't we all.",
  };
}

function generateAlternative(m: PortfolioMetrics): Portfolio {
  const isHighRisk = m.weightedRiskScore > 60;

  const assets: PortfolioAsset[] = isHighRisk
    ? [
        { id: "alt-1", ticker: "VTI", name: "Vanguard Total Market ETF", weight: 45, assetClass: "etf", sector: "diversified", geography: "us", riskLevel: "medium" },
        { id: "alt-2", ticker: "VEA", name: "Vanguard Dev. Markets ETF", weight: 25, assetClass: "etf", sector: "diversified", geography: "global", riskLevel: "medium" },
        { id: "alt-3", ticker: "VWO", name: "Vanguard Emerging Markets ETF", weight: 15, assetClass: "etf", sector: "diversified", geography: "emerging", riskLevel: "high" },
        { id: "alt-4", ticker: "BND", name: "Vanguard Total Bond Market ETF", weight: 10, assetClass: "bond", geography: "us", riskLevel: "low" },
        { id: "alt-5", ticker: "GLD", name: "SPDR Gold Shares", weight: 5, assetClass: "commodity", geography: "global", riskLevel: "medium" },
      ]
    : [
        { id: "alt-1", ticker: "VTI", name: "Vanguard Total Market ETF", weight: 35, assetClass: "etf", sector: "diversified", geography: "us", riskLevel: "medium" },
        { id: "alt-2", ticker: "VEA", name: "Vanguard Dev. Markets ETF", weight: 20, assetClass: "etf", sector: "diversified", geography: "global", riskLevel: "medium" },
        { id: "alt-3", ticker: "BND", name: "Vanguard Total Bond Market ETF", weight: 30, assetClass: "bond", geography: "us", riskLevel: "low" },
        { id: "alt-4", ticker: "VNQ", name: "Vanguard Real Estate ETF", weight: 10, assetClass: "reit", geography: "us", riskLevel: "medium" },
        { id: "alt-5", ticker: "GLD", name: "SPDR Gold Shares", weight: 5, assetClass: "commodity", geography: "global", riskLevel: "medium" },
      ];

  return {
    id: "alternative",
    name: "A More Defensible Alternative",
    assets,
    description: "A globally diversified, low-cost, multi-asset portfolio matching your approximate risk profile.",
  };
}

export function analyzePortfolio(assets: PortfolioAsset[]): AnalysisResult {
  const metrics = calculateMetrics(assets);

  const diversificationScore = Math.round(calcDiversificationScore(metrics));
  const concentrationScore = Math.round(calcConcentrationScore(metrics));
  const riskScore = Math.round(calcRiskScore(metrics));
  const coherenceScore = Math.round(calcCoherenceScore(metrics));

  const score = Math.round(
    diversificationScore * 0.3 +
    concentrationScore * 0.3 +
    riskScore * 0.25 +
    coherenceScore * 0.15
  );

  let grade: "S" | "A" | "B" | "C" | "D" | "F";
  if (score >= 90) grade = "S";
  else if (score >= 80) grade = "A";
  else if (score >= 70) grade = "B";
  else if (score >= 60) grade = "C";
  else if (score >= 50) grade = "D";
  else grade = "F";

  const warnings = generateWarnings(metrics);
  const recommendations = generateRecommendations(metrics, {
    diversification: diversificationScore,
    concentration: concentrationScore,
    risk: riskScore,
    coherence: coherenceScore,
  });
  const personality = determinePersonality(metrics, score);
  const alternativePortfolio = generateAlternative(metrics);

  return {
    score,
    grade,
    diversificationScore,
    concentrationScore,
    riskScore,
    coherenceScore,
    metrics,
    warnings,
    recommendations,
    personality,
    roasts: [],
    alternativePortfolio,
  };
}
