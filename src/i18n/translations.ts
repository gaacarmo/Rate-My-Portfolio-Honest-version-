export type Language = "en" | "pt";

const en = {
  header: {
    home: "Home",
    analyze: "Analyze",
  },
  landing: {
    badge: "Useful analysis. Unsolicited honesty.",
    heroLine1: "Analyze your portfolio.",
    heroLine2: "Roast your decisions.",
    tagline: "Real metrics. Honest scoring. Sarcasm that\u2019s earned.",
    funQuote1: "You diversified across different ways to panic.",
    funQuote2: "Not financial advice. Definitely financial opinions.",
    ctaAnalyze: "Analyze My Portfolio",
    ctaPreset: "Try a Preset",
    sampleObsLabel: "Sample Observations",
    sampleObsTitle: "What we\u2019ll tell you that your advisor won\u2019t",
    presetsLabel: "Portfolio Presets",
    presetsTitle: "Pick one that sounds familiar",
    featuresLabel: "What you get",
    featuresTitle: "Substantive analysis. Involuntary honesty.",
    ctaSectionTitle: "Ready to find out?",
    ctaSectionSubtitle: "Takes 2 minutes. Results are immediate. Regrets may vary.",
    ctaSectionBtn: "Get Your Portfolio Roasted",
    disclaimer:
      "Not financial advice. All analysis is for educational and entertainment purposes.",
    roastPreviews: [
      {
        quote: "You don\u2019t have a portfolio. You have a prayer.",
        label: "Crypto Chaos",
        icon: "Zap",
      },
      {
        quote: "Your investment thesis: software eats the world. Your diversification thesis: also software, but different software.",
        label: "Tech Bro",
        icon: "Cpu",
      },
      {
        quote: "You\u2019ve diversified across companies but forgotten that other countries also have stock markets.",
        label: "Home Bias",
        icon: "Home",
      },
      {
        quote: "Partially diversified. Partially not. The \u2018partial\u2019 part is doing a lot of work in that sentence.",
        label: "Almost There",
        icon: "CircleHelp",
      },
    ],
    features: [
      {
        icon: "SlidersHorizontal",
        title: "Real Metrics",
        description:
          "HHI concentration index, effective diversification count, weighted risk scoring, and sector exposure analysis.",
      },
      {
        icon: "Flame",
        title: "Contextual Roasts",
        description:
          "Sarcasm that\u2019s earned. Every comment is triggered by your actual portfolio structure, not generic templates.",
      },
      {
        icon: "Fingerprint",
        title: "Investor Personality",
        description:
          "Eight archetypes mapped to your real portfolio composition. The Crypto Evangelist hits different when it\u2019s based on data.",
      },
      {
        icon: "BarChart2",
        title: "Visual Analysis",
        description:
          "Allocation charts, quality radar, sector breakdown \u2014 the full picture at a glance.",
      },
      {
        icon: "AlertTriangle",
        title: "Useful Warnings",
        description:
          "Flags that matter: extreme concentration, thematic overexposure, mixed risk signals, and pseudo-diversification.",
      },
      {
        icon: "Target",
        title: "Actionable Recommendations",
        description:
          "Specific steps, not platitudes. What to change, why it matters, and how to actually do it.",
      },
    ],
    presetsPreviews: [
      { icon: "Cpu", name: "Tech Bro", tagline: "Move fast. Break diversification." },
      { icon: "Zap", name: "Crypto Chaos", tagline: "When the moon? Soon." },
      { icon: "BarChart2", name: "Dividend Dad", tagline: "Passive income. Aggressively boring." },
      { icon: "Smartphone", name: "TikTok Investor", tagline: "Due diligence is for boomers." },
      {
        icon: "Target",
        name: "Surprisingly Responsible",
        tagline: "Evidence-based. Mildly condescending.",
      },
    ],
  },
  analyze: {
    title: "Portfolio Analyzer",
    subtitle:
      "Build your portfolio manually or choose a preset, then get scored, roasted, and enlightened.",
    tabBuild: "Build Portfolio",
    tabPreset: "Load a Preset",
    presetDescription:
      "Select a preset portfolio archetype. Each one is a recognizable investor personality \u2014 they exist for a reason. Pick the closest and adjust if needed.",
    presetLoaded: "Preset loaded. Switch to",
    presetLoadedBuild: "Build Portfolio",
    presetLoadedEnd: "to review or adjust weights.",
    noAssets: "No assets added yet",
    assetCount: (count: number) => `${count} ${count === 1 ? "asset" : "assets"}`,
    allocated: "allocated",
    btnReset: "Reset",
    btnAnalyze: "Analyze Portfolio",
    btnAnalyzing: "Analyzing...",
    btnNewAnalysis: "New Analysis",
    resultsTitle: "Analysis Results",
    resultsSubtitle: (score: number, warnings: number, recs: number) =>
      `Score: ${score}/100 \u00b7 ${warnings} warning${warnings !== 1 ? "s" : ""} \u00b7 ${recs} recommendation${recs !== 1 ? "s" : ""}`,
  },
  builder: {
    searchPlaceholder: "Search assets... (AAPL, BTC, VTI, VALE3...)",
    asset: "Asset",
    weightPct: "Weight (%)",
    overAllocated: "Over-allocated",
    underAllocated: "Under-allocated",
    allocationGood: "Allocation looks good",
    autoNormalize: "Auto-normalize",
    clearAll: "Clear all",
    emptyMessage: "Search for assets above, or select a preset portfolio below.",
  },
  results: {
    portfolioScore: "Portfolio Score",
    portfolioScoreSubtitle: "Overall quality rating across four dimensions",
    portfolioComposition: "Portfolio Composition",
    portfolioCompositionSubtitle: "Visual breakdown of your allocation",
    allocationBreakdown: "Allocation Breakdown",
    qualityDimensions: "Quality Dimensions",
    portfolioMetrics: "Portfolio Metrics",
    portfolioMetricsSubtitle: "Key quantitative indicators",
    warnings: "Warnings",
    warningsSubtitle: (count: number) =>
      `${count} issue${count !== 1 ? "s" : ""} detected`,
    recommendations: "Recommendations",
    recommendationsSubtitle: "Actionable steps to improve portfolio quality",
    alternative: "A More Sensible Alternative",
    alternativeSubtitle:
      "What a standard diversified portfolio looks like at your risk level",
    disclaimerTitle: "Disclaimer:",
    disclaimerText:
      "This tool provides educational analysis and entertainment. Nothing here constitutes financial advice, investment recommendations, or a solicitation to buy or sell any security. Portfolio scoring is based on general diversification heuristics, not your personal financial situation, tax circumstances, or investment goals. Past portfolio structures do not predict future performance. Consult a qualified financial advisor before making investment decisions.",
  },
  scoreCard: {
    gradeLabels: {
      S: "Exceptional",
      A: "Strong",
      B: "Solid",
      C: "Adequate",
      D: "Needs Work",
      F: "Critical Issues",
    } as Record<string, string>,
    scoreDescription:
      "Overall portfolio quality score based on diversification, concentration risk, risk management, and structural coherence.",
    diversification: "Diversification",
    diversificationDesc:
      "Asset count, class mix, sector spread, and geographic exposure",
    concentration: "Concentration Control",
    concentrationDesc:
      "HHI index, max position weight, effective number of holdings",
    risk: "Risk Management",
    riskDesc: "Weighted risk level, crypto exposure, safety net allocation",
    coherence: "Structural Coherence",
    coherenceDesc:
      "Internal logic of the portfolio \u2014 does the mix make sense?",
  },
  personality: {
    sectionLabel: "What your portfolio says about you",
  },
  roast: {
    sectionLabel: "Unsolicited Honesty",
    severity: { 1: "Observation", 2: "Noted", 3: "Savage" } as Record<number, string>,
  },
  warnings: {
    danger: "Critical",
    warning: "Warning",
    info: "Note",
  },
  recommendations: {
    emptyTitle: "Nothing critical to fix",
    emptySubtitle:
      "Your portfolio structure doesn\u2019t trigger major recommendations.",
    priority: (p: string) => `${p} priority`,
    whatToDo: "What to do",
  },
  metrics: {
    positions: "Positions",
    positionsSub: (eff: number) => `${eff.toFixed(1)} effective (HHI)`,
    assetClasses: "Asset Classes",
    assetClassesSub: "Unique classes held",
    geographies: "Geographies",
    geographiesSub: "Markets represented",
    hhiIndex: "HHI Index",
    hhiIndexSub: "0 = perfect diversification",
    maxPosition: "Max Position",
    maxPositionSub: "Largest single holding",
    riskScore: "Risk Score",
    riskScoreSub: "Weighted avg (0\u2013100)",
    cryptoExposure: "Crypto Exposure",
    cryptoExposureSub: "Digital assets weight",
    techExposure: "Tech Exposure",
    techExposureSub: "Technology sector weight",
    bondFI: "Bond / FI",
    bondFISub: "Fixed income allocation",
    stockETF: "Stock / ETF",
    stockETFSub: "Equity exposure",
  },
  alternative: {
    comparableLabel: "Comparable Alternative",
    lowerComplexity: "Lower complexity",
    disclaimerText:
      "This is a structural reference \u2014 not a personalized recommendation. Past performance of any particular allocation does not guarantee future results. Adjust based on your actual time horizon, tax situation, and risk tolerance.",
  },
  chart: {
    byClass: "By Class",
    byAsset: "By Asset",
    byRegion: "By Region",
    classLabels: {
      stock: "Stocks",
      etf: "ETFs",
      crypto: "Crypto",
      bond: "Bonds",
      reit: "REITs",
      cash: "Cash",
      commodity: "Commodities",
      fixed_income: "Fixed Income",
    } as Record<string, string>,
    geoLabels: {
      us: "United States",
      brazil: "Brazil",
      europe: "Europe",
      emerging: "Emerging Mkts",
      global: "Global",
      latam: "Latin America",
    } as Record<string, string>,
  },
  metricsChart: {
    diversification: "Diversification",
    concentration: "Concentration",
    riskMgmt: "Risk Mgmt",
    coherence: "Coherence",
  },
};

const pt: typeof en = {
  header: {
    home: "Início",
    analyze: "Analisar",
  },
  landing: {
    badge: "Análise útil. Honestidade não solicitada.",
    heroLine1: "Analise seu portfólio.",
    heroLine2: "Leve uma rasteira nas suas decisões.",
    tagline: "Métricas reais. Pontuação honesta. Sarcasmo merecido.",
    funQuote1: "Você diversificou entre diferentes formas de entrar em pânico.",
    funQuote2:
      "Não é consultoria financeira. Definitivamente são opiniões financeiras.",
    ctaAnalyze: "Analisar Meu Portfólio",
    ctaPreset: "Testar um Preset",
    sampleObsLabel: "Observações de Exemplo",
    sampleObsTitle: "O que vamos te dizer que seu consultor não vai",
    presetsLabel: "Portfólios Pré-definidos",
    presetsTitle: "Escolha um que pareça familiar",
    featuresLabel: "O que você recebe",
    featuresTitle: "Análise substantiva. Honestidade involuntária.",
    ctaSectionTitle: "Pronto para descobrir?",
    ctaSectionSubtitle:
      "Leva 2 minutos. Resultados imediatos. Arrependimentos podem variar.",
    ctaSectionBtn: "Receba a Análise do Seu Portfólio",
    disclaimer:
      "Não é consultoria financeira. Toda análise é para fins educacionais e de entretenimento.",
    roastPreviews: [
      {
        quote: "Você não tem um portfólio. Você tem uma oração.",
        label: "Caos Cripto",
        icon: "Zap",
      },
      {
        quote: "Sua tese de investimento: software devora o mundo. Sua tese de diversificação: também software, mas software diferente.",
        label: "Tech Bro",
        icon: "Cpu",
      },
      {
        quote: "Você diversificou entre empresas mas esqueceu que outros países também têm bolsas de valores.",
        label: "Viés Doméstico",
        icon: "Home",
      },
      {
        quote: "Parcialmente diversificado. Parcialmente não. A palavra \u2018parcialmente\u2019 está trabalhando muito nessa frase.",
        label: "Quase Lá",
        icon: "CircleHelp",
      },
    ],
    features: [
      {
        icon: "SlidersHorizontal",
        title: "Métricas Reais",
        description:
          "Índice de concentração HHI, contagem de diversificação efetiva, pontuação de risco ponderada e análise de exposição setorial.",
      },
      {
        icon: "Flame",
        title: "Críticas Contextuais",
        description:
          "Sarcasmo merecido. Cada comentário é gerado pela estrutura real do seu portfólio, não por modelos genéricos.",
      },
      {
        icon: "Fingerprint",
        title: "Personalidade do Investidor",
        description:
          "Oito arquétipos mapeados para a composição real do seu portfólio. O Evangelista Cripto é diferente quando é baseado em dados.",
      },
      {
        icon: "BarChart2",
        title: "Análise Visual",
        description:
          "Gráficos de alocação, radar de qualidade, divisão por setor \u2014 o quadro completo de relance.",
      },
      {
        icon: "AlertTriangle",
        title: "Avisos Úteis",
        description:
          "Alertas que importam: concentração extrema, sobreexposição temática, sinais de risco mistos e pseudo-diversificação.",
      },
      {
        icon: "Target",
        title: "Recomendações Acionáveis",
        description:
          "Passos específicos, não platitudes. O que mudar, por que importa e como realmente fazer.",
      },
    ],
    presetsPreviews: [
      { icon: "Cpu", name: "Tech Bro", tagline: "Mova rápido. Quebre a diversificação." },
      { icon: "Zap", name: "Caos Cripto", tagline: "Quando vai à lua? Em breve." },
      {
        icon: "BarChart2",
        name: "Pai dos Dividendos",
        tagline: "Renda passiva. Agressivamente chato.",
      },
      {
        icon: "Smartphone",
        name: "Investidor do TikTok",
        tagline: "Due diligence é para velhos.",
      },
      {
        icon: "Target",
        name: "Surpreendentemente Responsável",
        tagline: "Baseado em evidências. Levemente condescendente.",
      },
    ],
  },
  analyze: {
    title: "Analisador de Portfólio",
    subtitle:
      "Monte seu portfólio manualmente ou escolha um preset, depois receba pontuação, críticas e esclarecimentos.",
    tabBuild: "Montar Portfólio",
    tabPreset: "Carregar Preset",
    presetDescription:
      "Selecione um arquétipo de portfólio pré-definido. Cada um é uma personalidade de investidor reconhecível \u2014 eles existem por uma razão. Escolha o mais próximo e ajuste se necessário.",
    presetLoaded: "Preset carregado. Mude para",
    presetLoadedBuild: "Montar Portfólio",
    presetLoadedEnd: "para revisar ou ajustar os pesos.",
    noAssets: "Nenhum ativo adicionado ainda",
    assetCount: (count: number) => `${count} ${count === 1 ? "ativo" : "ativos"}`,
    allocated: "alocados",
    btnReset: "Resetar",
    btnAnalyze: "Analisar Portfólio",
    btnAnalyzing: "Analisando...",
    btnNewAnalysis: "Nova Análise",
    resultsTitle: "Resultados da Análise",
    resultsSubtitle: (score: number, warnings: number, recs: number) =>
      `Pontuação: ${score}/100 \u00b7 ${warnings} aviso${warnings !== 1 ? "s" : ""} \u00b7 ${recs} recomenda\u00e7${recs !== 1 ? "\u00f5es" : "\u00e3o"}`,
  },
  builder: {
    searchPlaceholder: "Buscar ativos... (AAPL, BTC, VTI, VALE3...)",
    asset: "Ativo",
    weightPct: "Peso (%)",
    overAllocated: "Sobre-alocado",
    underAllocated: "Sub-alocado",
    allocationGood: "Alocação está boa",
    autoNormalize: "Auto-normalizar",
    clearAll: "Limpar tudo",
    emptyMessage: "Busque ativos acima ou selecione um portfólio pré-definido abaixo.",
  },
  results: {
    portfolioScore: "Pontuação do Portfólio",
    portfolioScoreSubtitle: "Avaliação geral de qualidade em quatro dimensões",
    portfolioComposition: "Composição do Portfólio",
    portfolioCompositionSubtitle: "Divisão visual da sua alocação",
    allocationBreakdown: "Divisão de Alocação",
    qualityDimensions: "Dimensões de Qualidade",
    portfolioMetrics: "Métricas do Portfólio",
    portfolioMetricsSubtitle: "Indicadores quantitativos principais",
    warnings: "Avisos",
    warningsSubtitle: (count: number) =>
      `${count} problema${count !== 1 ? "s" : ""} detectado${count !== 1 ? "s" : ""}`,
    recommendations: "Recomendações",
    recommendationsSubtitle:
      "Passos acionáveis para melhorar a qualidade do portfólio",
    alternative: "Uma Alternativa Mais Sensata",
    alternativeSubtitle:
      "Como é um portfólio diversificado padrão para o seu nível de risco",
    disclaimerTitle: "Aviso legal:",
    disclaimerText:
      "Esta ferramenta fornece análise educacional e entretenimento. Nada aqui constitui aconselhamento financeiro, recomendações de investimento ou solicitação de compra ou venda de qualquer ativo. A pontuação do portfólio é baseada em heurísticas gerais de diversificação, não na sua situação financeira pessoal, circunstâncias tributárias ou objetivos de investimento. Estruturas de portfólio passadas não preveem desempenho futuro. Consulte um assessor financeiro qualificado antes de tomar decisões de investimento.",
  },
  scoreCard: {
    gradeLabels: {
      S: "Excepcional",
      A: "Forte",
      B: "Sólido",
      C: "Adequado",
      D: "Precisa Melhorar",
      F: "Problemas Críticos",
    } as Record<string, string>,
    scoreDescription:
      "Pontuação geral de qualidade do portfólio baseada em diversificação, risco de concentração, gestão de risco e coerência estrutural.",
    diversification: "Diversificação",
    diversificationDesc:
      "Contagem de ativos, mix de classes, distribuição setorial e exposição geográfica",
    concentration: "Controle de Concentração",
    concentrationDesc:
      "Índice HHI, peso máximo de posição, número efetivo de posições",
    risk: "Gestão de Risco",
    riskDesc: "Nível de risco ponderado, exposição a cripto, alocação de reserva",
    coherence: "Coerência Estrutural",
    coherenceDesc: "Lógica interna do portfólio \u2014 a combinação faz sentido?",
  },
  personality: {
    sectionLabel: "O que seu portfólio diz sobre você",
  },
  roast: {
    sectionLabel: "Honestidade Não Solicitada",
    severity: { 1: "Observação", 2: "Anotado", 3: "Impiedoso" } as Record<number, string>,
  },
  warnings: {
    danger: "Crítico",
    warning: "Aviso",
    info: "Nota",
  },
  recommendations: {
    emptyTitle: "Nada crítico para corrigir",
    emptySubtitle:
      "A estrutura do seu portfólio não gera recomendações importantes.",
    priority: (p: string) => {
      const map: Record<string, string> = { high: "alta", medium: "média", low: "baixa" };
      return `prioridade ${map[p] || p}`;
    },
    whatToDo: "O que fazer",
  },
  metrics: {
    positions: "Posições",
    positionsSub: (eff: number) => `${eff.toFixed(1)} efetivas (HHI)`,
    assetClasses: "Classes de Ativos",
    assetClassesSub: "Classes únicas mantidas",
    geographies: "Geografias",
    geographiesSub: "Mercados representados",
    hhiIndex: "Índice HHI",
    hhiIndexSub: "0 = diversificação perfeita",
    maxPosition: "Posição Máxima",
    maxPositionSub: "Maior posição individual",
    riskScore: "Pontuação de Risco",
    riskScoreSub: "Média ponderada (0\u2013100)",
    cryptoExposure: "Exposição a Cripto",
    cryptoExposureSub: "Peso dos ativos digitais",
    techExposure: "Exposição a Tecnologia",
    techExposureSub: "Peso do setor de tecnologia",
    bondFI: "Renda Fixa",
    bondFISub: "Alocação em renda fixa",
    stockETF: "Ação / ETF",
    stockETFSub: "Exposição em renda variável",
  },
  alternative: {
    comparableLabel: "Alternativa Comparável",
    lowerComplexity: "Menor complexidade",
    disclaimerText:
      "Esta é uma referência estrutural \u2014 não uma recomendação personalizada. O desempenho passado de qualquer alocação específica não garante resultados futuros. Ajuste com base no seu horizonte de tempo, situação tributária e tolerância ao risco.",
  },
  chart: {
    byClass: "Por Classe",
    byAsset: "Por Ativo",
    byRegion: "Por Região",
    classLabels: {
      stock: "Ações",
      etf: "ETFs",
      crypto: "Cripto",
      bond: "Títulos",
      reit: "FIIs/REITs",
      cash: "Caixa",
      commodity: "Commodities",
      fixed_income: "Renda Fixa",
    } as Record<string, string>,
    geoLabels: {
      us: "Estados Unidos",
      brazil: "Brasil",
      europe: "Europa",
      emerging: "Emergentes",
      global: "Global",
      latam: "América Latina",
    } as Record<string, string>,
  },
  metricsChart: {
    diversification: "Diversificação",
    concentration: "Concentração",
    riskMgmt: "Gestão de Risco",
    coherence: "Coerência",
  },
};

export type TranslationSchema = typeof en;

export const translations: Record<Language, TranslationSchema> = { en, pt };
