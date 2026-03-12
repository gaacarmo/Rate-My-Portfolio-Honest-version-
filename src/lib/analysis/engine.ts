import {
  PortfolioAsset,
  PortfolioMetrics,
  AnalysisResult,
  Warning,
  Recommendation,
  PersonalityType,
  Portfolio,
} from "@/types";
import type { Language } from "@/i18n/translations";

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

function t<T>(lang: Language, en: T, pt: T): T {
  return lang === "pt" ? pt : en;
}

function generateWarnings(m: PortfolioMetrics, lang: Language): Warning[] {
  const warnings: Warning[] = [];

  if (m.maxPositionWeight > 50) {
    warnings.push({
      id: "concentration-extreme",
      level: "danger",
      title: t(lang,
        "Extreme Concentration Risk",
        "Risco de Concentração Extrema"
      ),
      description: t(lang,
        `Your largest position is ${m.maxPositionWeight.toFixed(1)}% of the portfolio. One bad earnings call away from an existential crisis.`,
        `Sua maior posição é ${m.maxPositionWeight.toFixed(1)}% da carteira. A um resultado ruim de uma crise existencial.`
      ),
      metric: `${m.maxPositionWeight.toFixed(1)}% max position`,
    });
  } else if (m.maxPositionWeight > 30) {
    warnings.push({
      id: "concentration-high",
      level: "warning",
      title: t(lang,
        "High Single-Position Weight",
        "Peso Elevado em Posição Única"
      ),
      description: t(lang,
        `Your top position represents ${m.maxPositionWeight.toFixed(1)}% of your portfolio. You have convictions. Hopefully, well-researched ones.`,
        `Sua maior posição representa ${m.maxPositionWeight.toFixed(1)}% da carteira. Você tem convicções. Esperamos que bem fundamentadas.`
      ),
      metric: `${m.maxPositionWeight.toFixed(1)}% max position`,
    });
  }

  if (m.cryptoExposure > 60) {
    warnings.push({
      id: "crypto-extreme",
      level: "danger",
      title: t(lang,
        "This Is Primarily a Crypto Bet",
        "Isso É Principalmente uma Aposta em Cripto"
      ),
      description: t(lang,
        `${m.cryptoExposure.toFixed(1)}% in crypto. Your risk management strategy appears to be 'vibe-based.' This is a description, not a compliment.`,
        `${m.cryptoExposure.toFixed(1)}% em cripto. Sua estratégia de gestão de risco parece ser baseada em 'vibes'. Isso é uma descrição, não um elogio.`
      ),
      metric: `${m.cryptoExposure.toFixed(1)}% crypto`,
    });
  } else if (m.cryptoExposure > 30) {
    warnings.push({
      id: "crypto-high",
      level: "warning",
      title: t(lang,
        "Significant Crypto Exposure",
        "Exposição Significativa a Cripto"
      ),
      description: t(lang,
        `${m.cryptoExposure.toFixed(1)}% in crypto. Make sure your thesis includes a plan for 'down 80% in 6 months,' because history is data.`,
        `${m.cryptoExposure.toFixed(1)}% em cripto. Certifique-se de que sua tese inclui um plano para 'queda de 80% em 6 meses', porque histórico é dado.`
      ),
      metric: `${m.cryptoExposure.toFixed(1)}% crypto`,
    });
  }

  if (m.techExposure > 65) {
    warnings.push({
      id: "tech-thematic",
      level: "warning",
      title: t(lang,
        "Thematic Risk: Technology Overweight",
        "Risco Temático: Excesso em Tecnologia"
      ),
      description: t(lang,
        `${m.techExposure.toFixed(1)}% tech exposure. You're betting on one sector's continued dominance, which has worked... until it hasn't.`,
        `${m.techExposure.toFixed(1)}% em tecnologia. Você está apostando na dominância contínua de um setor, o que funcionou... até não funcionar.`
      ),
      metric: `${m.techExposure.toFixed(1)}% tech`,
    });
  }

  if (m.geographyCount === 1 && m.stockExposure > 40) {
    warnings.push({
      id: "home-bias",
      level: "warning",
      title: t(lang,
        "Geographic Concentration (Home Bias)",
        "Concentração Geográfica (Viés Doméstico)"
      ),
      description: t(lang,
        "All equity exposure is in one country. The world has more than one economy, which is worth acknowledging in your asset allocation.",
        "Toda a exposição em renda variável está em um único país. O mundo tem mais de uma economia, o que vale a pena reconhecer na sua alocação."
      ),
      metric: t(lang, "Single geography", "Uma única geografia"),
    });
  }

  if (m.assetCount > 20) {
    warnings.push({
      id: "overdiversified",
      level: "info",
      title: t(lang,
        "Possible Over-Diversification",
        "Possível Excesso de Diversificação"
      ),
      description: t(lang,
        `${m.assetCount} positions. At this scale, you're likely paying fees to track an index less efficiently than just buying the index.`,
        `${m.assetCount} posições. Nessa escala, você provavelmente paga taxas para replicar um índice de forma menos eficiente do que simplesmente comprando o índice.`
      ),
      metric: `${m.assetCount} ${t(lang, "assets", "ativos")}`,
    });
  }

  if (m.bondExposure === 0 && m.weightedRiskScore > 60) {
    warnings.push({
      id: "no-fixed-income",
      level: "info",
      title: t(lang,
        "Zero Fixed Income Allocation",
        "Zero de Renda Fixa na Carteira"
      ),
      description: t(lang,
        "No bonds or fixed income. Either you have a very long time horizon, very high risk tolerance, or haven't gotten to that chapter yet.",
        "Sem títulos ou renda fixa. Ou você tem um horizonte muito longo, tolerância ao risco muito alta, ou ainda não chegou nesse capítulo."
      ),
      metric: t(lang, "0% bonds/fixed income", "0% títulos/renda fixa"),
    });
  }

  if (m.hhi > 0.5) {
    warnings.push({
      id: "hhi-extreme",
      level: "danger",
      title: t(lang,
        "Portfolio Resembles a Single Bet",
        "Carteira Se Assemelha a Uma Aposta Única"
      ),
      description: t(lang,
        `Effective diversification equivalent to ~${m.effectiveN.toFixed(1)} distinct positions. Concentration this extreme requires either exceptional research or exceptional luck.`,
        `Diversificação efetiva equivalente a ~${m.effectiveN.toFixed(1)} posições distintas. Concentração tão extrema exige pesquisa excepcional ou sorte excepcional.`
      ),
      metric: `HHI: ${m.hhi.toFixed(2)}`,
    });
  }

  if (m.cryptoExposure > 15 && m.bondExposure > 20) {
    warnings.push({
      id: "mixed-signals",
      level: "warning",
      title: t(lang, "Mixed Risk Signals", "Sinais de Risco Contraditórios"),
      description: t(lang,
        "Holding significant crypto and bonds simultaneously suggests either sophisticated hedging or contradictory risk preferences. Only you know which.",
        "Ter cripto e renda fixa simultaneamente sugere hedge sofisticado ou preferências de risco contraditórias. Só você sabe qual dos dois."
      ),
      metric: `${m.cryptoExposure.toFixed(0)}% crypto + ${m.bondExposure.toFixed(0)}% ${t(lang, "bonds", "renda fixa")}`,
    });
  }

  return warnings;
}

function generateRecommendations(
  m: PortfolioMetrics,
  scores: { diversification: number; concentration: number; risk: number; coherence: number },
  lang: Language
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (scores.concentration < 50) {
    recs.push({
      id: "reduce-concentration",
      priority: "high",
      title: t(lang,
        "Reduce Position Concentration",
        "Reduzir Concentração de Posições"
      ),
      description: t(lang,
        "Your portfolio is heavily concentrated, amplifying company-specific risk beyond what diversification should allow.",
        "Sua carteira está altamente concentrada, amplificando o risco específico de empresa além do que a diversificação deveria permitir."
      ),
      actionable: t(lang,
        "Cap individual stock positions at 5–10% of the total portfolio. Use broad ETFs (SPY, VTI) for core exposure and keep single-stock picks as satellite positions.",
        "Limite posições individuais a 5–10% da carteira total. Use ETFs amplos (SPY, VTI) para exposição central e mantenha ações individuais como posições satélite."
      ),
    });
  }

  if (m.cryptoExposure > 20) {
    recs.push({
      id: "rebalance-crypto",
      priority: m.cryptoExposure > 40 ? "high" : "medium",
      title: t(lang, "Review Crypto Allocation", "Revisar Alocação em Cripto"),
      description: t(lang,
        `${m.cryptoExposure.toFixed(0)}% in crypto creates outsized portfolio volatility and tail risk relative to traditional assets.`,
        `${m.cryptoExposure.toFixed(0)}% em cripto gera volatilidade desproporcional e risco de cauda em relação a ativos tradicionais.`
      ),
      actionable: t(lang,
        "Most evidence-based frameworks suggest limiting speculative assets (including crypto) to 5–15% of holdings. Rebalancing doesn't mean abandoning the thesis — it means sizing it appropriately.",
        "A maioria dos frameworks baseados em evidências sugere limitar ativos especulativos (incluindo cripto) a 5–15% da carteira. Rebalancear não significa abandonar a tese — significa dimensioná-la corretamente."
      ),
    });
  }

  if (m.bondExposure === 0 && m.weightedRiskScore > 50) {
    recs.push({
      id: "add-fixed-income",
      priority: "medium",
      title: t(lang,
        "Consider Adding Fixed Income",
        "Considere Adicionar Renda Fixa"
      ),
      description: t(lang,
        "A complete absence of bonds or fixed income reduces portfolio resilience during equity market downturns.",
        "A ausência total de títulos ou renda fixa reduz a resiliência da carteira durante quedas no mercado de renda variável."
      ),
      actionable: t(lang,
        "Even a 10–20% allocation to investment-grade bonds (BND, AGG) or Treasuries (TLT) can meaningfully reduce maximum drawdown with limited long-term return impact.",
        "Mesmo uma alocação de 10–20% em títulos de grau de investimento (BND, AGG) ou Tesouro (TLT) pode reduzir significativamente o drawdown máximo com impacto limitado no retorno de longo prazo."
      ),
    });
  }

  if (m.geographyCount === 1 && m.stockExposure > 40) {
    recs.push({
      id: "add-international",
      priority: "medium",
      title: t(lang,
        "Add International Diversification",
        "Adicionar Diversificação Internacional"
      ),
      description: t(lang,
        "Single-country equity exposure concentrates political, currency, and economic cycle risks in one market.",
        "Exposição em renda variável de um único país concentra riscos políticos, cambiais e de ciclo econômico em um único mercado."
      ),
      actionable: t(lang,
        "Allocate 20–30% of equity exposure to international developed markets (VEA, EFA) and 5–15% to emerging markets (VWO, EEM) for genuine geographic diversification.",
        "Aloque 20–30% da exposição em ações para mercados desenvolvidos internacionais (VEA, EFA) e 5–15% para mercados emergentes (VWO, EEM) para diversificação geográfica real."
      ),
    });
  }

  if (m.assetCount <= 3 && m.assetClassCount <= 1) {
    recs.push({
      id: "broaden-holdings",
      priority: "high",
      title: t(lang, "Broaden Your Holdings", "Amplie Seus Ativos"),
      description: t(lang,
        "Very few positions leave the portfolio entirely exposed to idiosyncratic events in a handful of assets.",
        "Poucas posições deixam a carteira totalmente exposta a eventos idiossincráticos em poucos ativos."
      ),
      actionable: t(lang,
        "Consider building to 10–15 positions across at least 2–3 asset classes, or use a single broad index ETF (VTI, SPY) to gain instant diversification.",
        "Considere expandir para 10–15 posições em pelo menos 2–3 classes de ativos, ou use um único ETF de índice amplo (VTI, SPY) para obter diversificação instantânea."
      ),
    });
  }

  if (m.weightedRiskScore > 75 && scores.risk < 60) {
    recs.push({
      id: "add-defensive-anchor",
      priority: "medium",
      title: t(lang, "Add Defensive Anchors", "Adicionar Âncoras Defensivas"),
      description: t(lang,
        "Your portfolio's overall risk level is very high. Defensive assets can improve risk-adjusted returns over full market cycles.",
        "O nível de risco geral da sua carteira é muito alto. Ativos defensivos podem melhorar os retornos ajustados ao risco ao longo de ciclos completos de mercado."
      ),
      actionable: t(lang,
        "Allocate 15–25% to defensive assets — gold (GLD), bonds (BND), or dividend-focused ETFs — to act as a volatility buffer during market stress.",
        "Aloque 15–25% em ativos defensivos — ouro (GLD), títulos (BND) ou ETFs focados em dividendos — para funcionar como amortecedor de volatilidade em momentos de estresse."
      ),
    });
  }

  return recs;
}

function determinePersonality(m: PortfolioMetrics, score: number, lang: Language): PersonalityType {
  if (m.cryptoExposure > 65) {
    return {
      key: "crypto_evangelist",
      name: t(lang, "The Crypto Evangelist", "O Evangelista Cripto"),
      icon: "Moon",
      description: t(lang,
        "You believe traditional finance is broken. You're proving it by breaking your own finances faster. Commitment to the cause is admirable.",
        "Você acredita que o sistema financeiro tradicional está quebrado. Está provando isso quebrando suas próprias finanças mais rápido. O compromisso com a causa é admirável."
      ),
      tagline: t(lang,
        "WAGMI. (Statistically unlikely, but fine.)",
        "WAGMI. (Estatisticamente improvável, mas tudo bem.)"
      ),
    };
  }

  if (m.hhi > 0.45 && m.weightedRiskScore > 75) {
    return {
      key: "fomo_surfer",
      name: t(lang, "The FOMO Surfer", "O Surfista do FOMO"),
      icon: "Waves",
      description: t(lang,
        "Your portfolio is a real-time record of whatever was trending the last time you opened your brokerage app. You call this 'being opportunistic.' We call it something else.",
        "Sua carteira é um registro em tempo real do que estava em alta da última vez que você abriu o app. Você chama isso de 'ser oportunista'. Nós chamamos de outra coisa."
      ),
      tagline: t(lang,
        "Buy high. Panic sell. Repeat.",
        "Compra no topo. Vende em pânico. Repete."
      ),
    };
  }

  if (m.techExposure > 65) {
    return {
      key: "tech_true_believer",
      name: t(lang, "The Tech True Believer", "O Verdadeiro Crente em Tech"),
      icon: "Laptop",
      description: t(lang,
        "You're not investing in companies. You're investing in the future — specifically, the future where software eats the world and your NVDA position justifies your personality.",
        "Você não investe em empresas. Você investe no futuro — especificamente, o futuro onde o software domina o mundo e sua posição em NVDA justifica sua personalidade."
      ),
      tagline: t(lang,
        "Disrupting the concept of diversification.",
        "Disruptando o conceito de diversificação."
      ),
    };
  }

  if (m.bondExposure > 50 || (m.byRiskLevel["very_low"] || 0) + (m.byRiskLevel["low"] || 0) > 60) {
    return {
      key: "overcautious_hibernator",
      name: t(lang, "The Overcautious Hibernator", "O Hibernador Hipercautioso"),
      icon: "Shield",
      description: t(lang,
        "Safety is a virtue. So is beating inflation. Your portfolio is very good at one of these two things.",
        "Segurança é uma virtude. Bater a inflação também. Sua carteira é muito boa em uma dessas duas coisas."
      ),
      tagline: t(lang,
        "Capital preservation above all. Including real returns.",
        "Preservação de capital acima de tudo. Inclusive dos retornos reais."
      ),
    };
  }

  if (m.bondExposure + (m.byAssetClass["reit"] || 0) > 30 && m.weightedRiskScore < 40) {
    return {
      key: "dividend_collector",
      name: t(lang, "The Dividend Collector", "O Colecionador de Dividendos"),
      icon: "Inbox",
      description: t(lang,
        "You don't need growth. You need quarterly deposits and the ability to mention passive income at every social gathering. You have found your calling.",
        "Você não precisa de crescimento. Você precisa de depósitos trimestrais e da capacidade de mencionar renda passiva em todo encontro social. Você encontrou sua vocação."
      ),
      tagline: t(lang,
        "Compounding wisdom. At 2.3% yield.",
        "Juros compostos de sabedoria. A 2,3% de yield."
      ),
    };
  }

  if (score >= 78) {
    return {
      key: "surprisingly_responsible",
      name: t(lang, "The Surprisingly Responsible Adult", "O Adulto Surpreendentemente Responsável"),
      icon: "Target",
      description: t(lang,
        "Against all odds, you have constructed a portfolio that is diversified, risk-aware, and defensible at a dinner party. This is not common. Your future self will acknowledge this.",
        "Contra todas as probabilidades, você construiu uma carteira diversificada, consciente dos riscos e defensável num jantar. Isso não é comum. Seu eu futuro vai reconhecer isso."
      ),
      tagline: t(lang,
        "Doing the boring thing. Correctly.",
        "Fazendo a coisa chata. Corretamente."
      ),
    };
  }

  if (m.assetCount <= 4 && m.assetClassCount <= 2 && m.weightedRiskScore < 55) {
    return {
      key: "index_fundamentalist",
      name: t(lang, "The Index Fundamentalist", "O Fundamentalista de Índices"),
      icon: "TrendingUp",
      description: t(lang,
        "You've read about efficient markets and taken it extremely literally. Three ETFs. No individual names. No fun. Statistically defensible. Possibly correct.",
        "Você leu sobre mercados eficientes e levou ao pé da letra. Três ETFs. Nenhum nome individual. Sem diversão. Estatisticamente defensável. Possivelmente correto."
      ),
      tagline: t(lang,
        "If you can't beat the market, at least be the market.",
        "Se não pode bater o mercado, pelo menos seja o mercado."
      ),
    };
  }

  if (m.assetCount > 15) {
    return {
      key: "chaos_agent",
      name: t(lang, "The Chaos Agent", "O Agente do Caos"),
      icon: "Dices",
      description: t(lang,
        "Diversified? Yes. Intentionally? Unclear. You own a piece of everything and understand none of it, which is actually a coherent strategy if you're comfortable with that description.",
        "Diversificado? Sim. Intencionalmente? Não está claro. Você tem um pedaço de tudo e não entende nada, o que é uma estratégia coerente se você estiver confortável com essa descrição."
      ),
      tagline: t(lang,
        "Throwing darts at the entire global market.",
        "Jogando dardos em todo o mercado global."
      ),
    };
  }

  return {
    key: "confused_optimist",
    name: t(lang, "The Confused Optimist", "O Otimista Confuso"),
    icon: "CircleHelp",
    description: t(lang,
      "Your portfolio tells the story of someone who has done some research, acted on some of it, ignored some of it, and is still figuring out the rest. This is, frankly, most people.",
      "Sua carteira conta a história de alguém que fez alguma pesquisa, agiu em parte dela, ignorou outra parte, e ainda está descobrindo o resto. Isso é, honestamente, a maioria das pessoas."
    ),
    tagline: t(lang,
      "A work in progress. Aren't we all.",
      "Em construção. Como todos nós."
    ),
  };
}

function generateAlternative(m: PortfolioMetrics, lang: Language): Portfolio {
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
    name: t(lang, "A More Defensible Alternative", "Uma Alternativa Mais Defensável"),
    assets,
    description: t(lang,
      "A globally diversified, low-cost, multi-asset portfolio matching your approximate risk profile.",
      "Uma carteira globalmente diversificada, de baixo custo e multi-ativo, compatível com seu perfil de risco aproximado."
    ),
  };
}

export function analyzePortfolio(assets: PortfolioAsset[], lang: Language = "en"): AnalysisResult {
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

  const warnings = generateWarnings(metrics, lang);
  const recommendations = generateRecommendations(metrics, {
    diversification: diversificationScore,
    concentration: concentrationScore,
    risk: riskScore,
    coherence: coherenceScore,
  }, lang);
  const personality = determinePersonality(metrics, score, lang);
  const alternativePortfolio = generateAlternative(metrics, lang);

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
