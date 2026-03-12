import { PortfolioMetrics, Roast, AnalysisResult } from "@/types";
import type { Language } from "@/i18n/translations";

type RoastCandidate = {
  id: string;
  en: string;
  pt: string;
  category: Roast["category"];
  severity: 1 | 2 | 3;
};

export function generateRoasts(
  m: PortfolioMetrics,
  score: number,
  lang: Language = "en"
): Roast[] {
  const pool: RoastCandidate[] = [];

  // ── Crypto roasts ─────────────────────────────────────────────
  if (m.cryptoExposure > 80) {
    pool.push({
      id: "crypto-prayer",
      en: "You don't have a portfolio. You have a prayer circle with extra steps.",
      pt: "Você não tem uma carteira. Você tem um ato de fé com interface blockchain.",
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-sandcastle",
      en: `${m.cryptoExposure.toFixed(0)}% crypto. Your portfolio has the structural integrity of a sandcastle during high tide. A sandcastle that checks Twitter constantly.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto. Sua carteira tem a estabilidade emocional de um grupo de WhatsApp de memes de Bitcoin às 3 da manhã.`,
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-vibes",
      en: `${m.cryptoExposure.toFixed(0)}% crypto. Risk management strategy: vibes. Portfolio thesis: number go up. This is not a critique — it's a clinical observation.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto. Estratégia de gestão de risco: fé. Tese de investimento: vai subir. Não é uma crítica — é um diagnóstico.`,
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-sleep",
      en: "At this crypto allocation, 'sleeping through market hours' is not a lifestyle choice — it's a psychological defense mechanism.",
      pt: "Com essa alocação em cripto, 'dormir durante o pregão' não é estilo de vida — é mecanismo de defesa psicológica.",
      category: "crypto",
      severity: 3,
    });
  } else if (m.cryptoExposure > 50) {
    pool.push({
      id: "crypto-dominant",
      en: `${m.cryptoExposure.toFixed(0)}% in crypto is less of an investment allocation and more of a personality trait. We've noted it. We have concerns.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto não é uma alocação — é uma identidade. Registramos e estamos preocupados.`,
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-beta",
      en: `At ${m.cryptoExposure.toFixed(0)}% crypto, your portfolio beta is high enough to develop its own weather patterns. Expect turbulence. Also expect turbulence about the turbulence.`,
      pt: `Com ${m.cryptoExposure.toFixed(0)}% em cripto, o beta da sua carteira é tão alto que desenvolveu clima próprio. Espere turbulência. E depois mais turbulência sobre a turbulência.`,
      category: "crypto",
      severity: 3,
    });
  } else if (m.cryptoExposure > 30) {
    pool.push({
      id: "crypto-gym",
      en: `${m.cryptoExposure.toFixed(0)}% crypto. You've committed to volatility the same way most people commit to the gym: with genuine enthusiasm and mounting regret.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto. Você abraçou a volatilidade como a maioria abraça academia: com entusiasmo genuíno e arrependimento crescente.`,
      category: "crypto",
      severity: 2,
    });
    pool.push({
      id: "crypto-roulette",
      en: `${m.cryptoExposure.toFixed(0)}% crypto. The risk-adjusted return profile of this portfolio resembles a roulette table. A roulette table with a lot of Discord notifications.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto. O perfil de retorno ajustado ao risco se assemelha a uma roleta. Uma roleta com muita notificação de grupo no Telegram.`,
      category: "crypto",
      severity: 2,
    });
  } else if (m.cryptoExposure > 12) {
    pool.push({
      id: "crypto-youtube",
      en: `The ${m.cryptoExposure.toFixed(0)}% crypto says 'I've done my research.' The rest of the portfolio suggests that research was primarily YouTube thumbnails.`,
      pt: `Os ${m.cryptoExposure.toFixed(0)}% em cripto dizem 'fiz minha análise'. O restante da carteira sugere que a análise foi principalmente vídeos no YouTube.`,
      category: "crypto",
      severity: 1,
    });
    pool.push({
      id: "crypto-spice",
      en: `A ${m.cryptoExposure.toFixed(0)}% crypto position. Adds spice to the portfolio. Also adds the kind of volatility that makes portfolio reviews emotionally taxing.`,
      pt: `Uma posição de ${m.cryptoExposure.toFixed(0)}% em cripto. Adiciona tempero à carteira. Também adiciona volatilidade suficiente para tornar os reviews mensais terapeuticamente necessários.`,
      category: "crypto",
      severity: 1,
    });
  }

  // ── Meme coins / low-quality crypto ───────────────────────────
  if (m.cryptoExposure > 20 && m.byAssetClass["crypto"] > 0) {
    pool.push({
      id: "meme-coin",
      en: "Some crypto exposure appears to involve assets whose primary value proposition is 'community sentiment and irony.' This is a market. It is not a portfolio strategy.",
      pt: "Parte da exposição cripto parece envolver ativos cuja proposta de valor principal é 'sentimento de comunidade e memes'. É um mercado. Não é uma estratégia de carteira.",
      category: "crypto",
      severity: 2,
    });
  }

  // ── Tech roasts ───────────────────────────────────────────────
  if (m.techExposure > 75) {
    pool.push({
      id: "tech-extreme",
      en: "Investment thesis: software eats the world. Diversification thesis: also software, but different software. In slightly different fonts.",
      pt: "Tese de investimento: software vai dominar o mundo. Tese de diversificação: também software, mas de empresas diferentes. Em fontes ligeiramente distintas.",
      category: "tech",
      severity: 3,
    });
    pool.push({
      id: "tech-correlation",
      en: "You've achieved near-perfect correlation in your portfolio. Unfortunately it's the correlation of everything losing 40% simultaneously during rate hikes. That's technically diversification.",
      pt: "Você atingiu correlação quase perfeita na carteira. Infelizmente é a correlação de tudo cair 40% ao mesmo tempo durante ciclo de juros. Tecnicamente é diversificação.",
      category: "tech",
      severity: 3,
    });
  } else if (m.techExposure > 55) {
    pool.push({
      id: "tech-heavy",
      en: `${m.techExposure.toFixed(0)}% tech. Diversified across multiple companies that all decline in unison during rate hikes. This is a theme, not a strategy.`,
      pt: `${m.techExposure.toFixed(0)}% em tech. Diversificado entre empresas que caem juntas em ciclos de juros. Isso é um tema, não uma estratégia.`,
      category: "tech",
      severity: 2,
    });
    pool.push({
      id: "tech-ecosystem",
      en: `Strong tech concentration. You've built an ecosystem inside your portfolio. Ecosystems are beautiful until they all need the same weather conditions to survive.`,
      pt: `Forte concentração em tech. Você construiu um ecossistema dentro da carteira. Ecossistemas são bonitos até que todos precisam das mesmas condições climáticas para sobreviver.`,
      category: "tech",
      severity: 2,
    });
  } else if (m.techExposure > 35) {
    pool.push({
      id: "tech-moderate",
      en: `Strong tech tilt detected. You know what you like. What you like is correlated drawdown in Q4 2022 and, to a lesser extent, Q1 2022.`,
      pt: `Forte inclinação para tech. Você sabe o que gosta. O que você gosta é queda correlacionada no 4T22 e, em menor extensão, no 1T22.`,
      category: "tech",
      severity: 1,
    });
  }

  // ── Concentration roasts ──────────────────────────────────────
  if (m.maxPositionWeight > 65) {
    pool.push({
      id: "concentration-relationship",
      en: `${m.maxPositionWeight.toFixed(0)}% in one position. At this point it's not investing — it's a relationship. Hope it doesn't ghost you during earnings season.`,
      pt: `${m.maxPositionWeight.toFixed(0)}% em uma única posição. Isso não é investimento — é um relacionamento. Espero que não te dê ghost na divulgação de resultados.`,
      category: "concentration",
      severity: 3,
    });
    pool.push({
      id: "concentration-cold",
      en: `Your largest holding is ${m.maxPositionWeight.toFixed(0)}% of the portfolio. When it sneezes, your net worth catches a cold. When it has a bad quarter, you develop symptoms.`,
      pt: `Sua maior posição é ${m.maxPositionWeight.toFixed(0)}% da carteira. Quando espirra, seu patrimônio resfria. Quando tem um trimestre ruim, você desenvolve sintomas.`,
      category: "concentration",
      severity: 3,
    });
    pool.push({
      id: "concentration-conviction",
      en: `${m.maxPositionWeight.toFixed(0)}% in one asset is either profound conviction or an inability to sell. Time will clarify which one this is.`,
      pt: `${m.maxPositionWeight.toFixed(0)}% em um ativo é convicção profunda ou incapacidade de vender. O tempo vai esclarecer qual dos dois é esse caso.`,
      category: "concentration",
      severity: 3,
    });
  } else if (m.maxPositionWeight > 45) {
    pool.push({
      id: "concentration-convicted",
      en: `Your largest position is ${m.maxPositionWeight.toFixed(0)}%. Confidence is admirable. Diversification is recommended. You've elected one of these two philosophies.`,
      pt: `Sua maior posição é ${m.maxPositionWeight.toFixed(0)}%. Confiança é admirável. Diversificação é recomendada. Você escolheu uma das duas filosofias.`,
      category: "concentration",
      severity: 2,
    });
  } else if (m.maxPositionWeight > 28) {
    pool.push({
      id: "concentration-podcast",
      en: `${m.maxPositionWeight.toFixed(0)}% in your top position. Confident but not unreasonable. Somewhere between Warren Buffett and 'I heard a compelling podcast.'`,
      pt: `${m.maxPositionWeight.toFixed(0)}% na posição principal. Confiante mas não irracional. Em algum lugar entre Warren Buffett e 'ouvi um podcast convincente'.`,
      category: "concentration",
      severity: 1,
    });
  }

  // ── Asset count / diversity roasts ───────────────────────────
  if (m.assetCount === 1) {
    pool.push({
      id: "one-asset",
      en: "One asset. Elegant. Decisive. Statistically inadvisable. Please also invest in antacids.",
      pt: "Um ativo. Elegante. Decidido. Estatisticamente temerário. Considere também investir em antiácidos.",
      category: "concentration",
      severity: 3,
    });
    pool.push({
      id: "one-asset-minimalism",
      en: "You've distilled portfolio construction down to its logical extreme. It's either genius or a bet. Those two things feel similar until they don't.",
      pt: "Você reduziu a construção de carteira ao seu extremo lógico. É genialidade ou apostão. Essas duas coisas parecem iguais até que não são.",
      category: "concentration",
      severity: 3,
    });
  } else if (m.assetCount === 2) {
    pool.push({
      id: "two-assets",
      en: "Two assets. You've diversified in the sense that there are now two separate things that can individually disappoint you. Progress.",
      pt: "Dois ativos. Você diversificou no sentido de que agora são duas coisas separadas que podem individualmente te decepcionar. Progresso.",
      category: "concentration",
      severity: 2,
    });
  } else if (m.assetCount === 3) {
    pool.push({
      id: "three-assets",
      en: "Three assets. A trinity of conviction. Marginally more diversified than 'all-in on one thing' is still not particularly diversified.",
      pt: "Três ativos. Uma trindade de convicção. Marginalmente mais diversificado que 'tudo em uma coisa' ainda não é particularmente diversificado.",
      category: "concentration",
      severity: 1,
    });
  }

  // ── Pseudo-diversification ────────────────────────────────────
  if (m.assetCount > 7 && m.hhi > 0.3) {
    pool.push({
      id: "pseudo-diversified",
      en: `${m.assetCount} positions, effective diversification ≈ ${m.effectiveN.toFixed(0)}. You've mastered the art of pseudo-diversification: the aesthetic of spreading risk without the mathematical consequence.`,
      pt: `${m.assetCount} posições, diversificação efetiva ≈ ${m.effectiveN.toFixed(0)}. Você dominou a arte da pseudo-diversificação: a estética de distribuir risco sem a consequência matemática.`,
      category: "diversity",
      severity: 2,
    });
  }

  // ── Home bias ─────────────────────────────────────────────────
  if (m.geographyCount === 1 && m.assetCount > 4) {
    pool.push({
      id: "home-bias",
      en: "You've diversified across companies but apparently forgotten that other countries also operate stock markets. Home bias, executed with remarkable commitment.",
      pt: "Você diversificou por empresas mas aparentemente esqueceu que outros países também têm bolsas de valores. Viés doméstico executado com notável dedicação.",
      category: "diversity",
      severity: 2,
    });
    pool.push({
      id: "home-bias-2",
      en: "Single geography exposure. You've built a portfolio that will thrive or collapse based primarily on the macroeconomic decisions of one government. Bold bet.",
      pt: "Exposição geográfica única. Você construiu uma carteira que vai prosperar ou colapsar com base principalmente nas decisões macroeconômicas de um único governo. Aposta audaciosa.",
      category: "diversity",
      severity: 1,
    });
  }

  // ── No bonds / zero safety net ────────────────────────────────
  if (m.bondExposure === 0 && m.weightedRiskScore > 65) {
    pool.push({
      id: "no-bonds",
      en: "Zero fixed income. You've decided you don't need a safety net because you're going to nail the tightrope walk every single time. Impressive assumption.",
      pt: "Zero renda fixa. Você decidiu que não precisa de rede de proteção porque vai acertar o equilíbrio na corda bamba toda vez. Suposição impressionante.",
      category: "risk",
      severity: 2,
    });
  }

  // ── Too conservative ──────────────────────────────────────────
  if (m.bondExposure > 70 && m.stockExposure < 15) {
    pool.push({
      id: "bunker-portfolio",
      en: "The risk score here is impressively low. So is the growth potential. You've built a financial bunker for an apocalypse that may not arrive within your investment horizon.",
      pt: "O score de risco aqui é impressionantemente baixo. O potencial de crescimento também. Você construiu um bunker financeiro para um apocalipse que talvez não chegue no seu horizonte de investimento.",
      category: "risk",
      severity: 2,
    });
    pool.push({
      id: "mattress-money",
      en: "This portfolio is so conservative it makes a savings account look aggressive. Inflation is patiently eroding the purchasing power in the background. But at least volatility is low.",
      pt: "Essa carteira é tão conservadora que faz uma poupança parecer agressiva. A inflação está corroendo pacientemente o poder de compra em segundo plano. Mas a volatilidade está baixa.",
      category: "risk",
      severity: 1,
    });
  }

  // ── Mixed signals ─────────────────────────────────────────────
  if (m.cryptoExposure > 15 && m.bondExposure > 20) {
    pool.push({
      id: "crypto-bonds",
      en: "Crypto and government bonds in the same portfolio. Like wearing a seatbelt while simultaneously removing the airbags and replacing them with fireworks. Creative risk management.",
      pt: "Cripto e renda fixa na mesma carteira. É o equivalente financeiro de malhar de manhã e pedir sobremesa dupla à noite. O esforço e a sabotagem coexistem em perfeita harmonia.",
      category: "risk",
      severity: 2,
    });
  }

  // ── High effective N but still bad ───────────────────────────
  if (m.assetCount > 15 && m.hhi > 0.2) {
    pool.push({
      id: "diworsification",
      en: `${m.assetCount} positions. At some point portfolio construction becomes portfolio collection. The HHI score suggests you've crossed that line.`,
      pt: `${m.assetCount} posições. Em algum momento construção de carteira vira coleção de ativos. O índice HHI sugere que você cruzou essa linha.`,
      category: "diversity",
      severity: 1,
    });
  }

  // ── Score-based general roasts ────────────────────────────────
  if (score < 30) {
    pool.push({
      id: "score-disaster",
      en: `Portfolio score: ${score}. The algorithm looked at this and asked to speak with a manager. We don't have one to offer. We have this report instead.`,
      pt: `Nota da carteira: ${score}. O algoritmo olhou para isso e pediu para falar com um gerente. Não temos um para oferecer. Temos esse relatório em vez disso.`,
      category: "general",
      severity: 3,
    });
    pool.push({
      id: "score-headline",
      en: "This portfolio was assembled with the strategic coherence of someone who read a financial headline and acted before finishing the sentence.",
      pt: "Essa carteira foi montada com a coerência estratégica de alguém que leu uma manchete financeira e agiu antes de terminar de ler a frase.",
      category: "general",
      severity: 3,
    });
    pool.push({
      id: "score-situation",
      en: "Your portfolio is not a financial plan. It is a financial situation. There is a meaningful difference and we are gently pointing it out.",
      pt: "Sua carteira não é um plano financeiro. É uma situação financeira. Há uma diferença significativa e estamos educadamente apontando isso.",
      category: "general",
      severity: 3,
    });
  } else if (score < 45) {
    pool.push({
      id: "score-dismal",
      en: "This portfolio was assembled with the energy of someone who read one financial article and acted immediately. We mean this constructively.",
      pt: "Essa carteira foi montada com a energia de alguém que leu um artigo financeiro e agiu imediatamente. Dizemos isso de forma construtiva.",
      category: "general",
      severity: 3,
    });
    pool.push({
      id: "score-potential",
      en: "Your portfolio has potential. It's currently expressing that potential primarily through risk exposure.",
      pt: "Sua carteira tem potencial. Atualmente esse potencial se expressa principalmente como exposição ao risco.",
      category: "general",
      severity: 2,
    });
  } else if (score < 58) {
    pool.push({
      id: "score-low",
      en: "There's promise here. It's currently indistinguishable from volatility risk, but the structural promise exists beneath the noise.",
      pt: "Há promessa aqui. Atualmente indistinguível de risco de volatilidade, mas a promessa estrutural existe sob o ruído.",
      category: "general",
      severity: 2,
    });
  } else if (score < 70) {
    pool.push({
      id: "score-mediocre",
      en: "Partially diversified. Partially not. The 'partial' is doing considerable load-bearing work in that sentence.",
      pt: "Parcialmente diversificada. Parcialmente não. O 'parcialmente' está carregando muito peso nessa frase.",
      category: "general",
      severity: 1,
    });
    pool.push({
      id: "score-almost",
      en: "You're most of the way there. The remaining gap between 'mostly fine' and 'actually good' is smaller than it looks but requires deliberate action.",
      pt: "Você está na maior parte do caminho. A distância entre 'quase bom' e 'realmente bom' é menor do que parece mas requer ação deliberada.",
      category: "general",
      severity: 1,
    });
  } else if (score >= 85) {
    pool.push({
      id: "score-good",
      en: "Genuinely well-structured. We checked twice. This is a legitimate observation, not a roast. The roast is that this level of discipline is statistically rare.",
      pt: "Genuinamente bem estruturada. Checamos duas vezes. Isso é uma observação legítima, não um roast. O roast é que esse nível de disciplina é estatisticamente raro.",
      category: "positive",
      severity: 1,
    });
    pool.push({
      id: "score-suspiciously-good",
      en: "This portfolio is suspiciously reasonable. Either you know exactly what you're doing or you stumbled into competence by accident. Either way, don't change it.",
      pt: "Essa carteira é suspeita de tão razoável. Ou você sabe exatamente o que está fazendo, ou tropeçou na competência por acidente. De qualquer forma, não mude.",
      category: "positive",
      severity: 1,
    });
  }

  // ── Extra thematic roasts for variety ─────────────────────────

  // FOMO-driven portfolio
  if (m.assetCount >= 4 && m.hhi > 0.35 && m.cryptoExposure > 10 && m.techExposure > 25) {
    pool.push({
      id: "fomo-portfolio",
      en: "This portfolio has the architecture of FOMO: concentrated in the things that went up recently, diversification as an afterthought. The market has feelings too, and they're cyclical.",
      pt: "Essa carteira tem a arquitetura do FOMO: concentrada nas coisas que subiram recentemente, diversificação como reflexo tardio. O mercado tem ciclos e ele não lembra de você com carinho.",
      category: "general",
      severity: 2,
    });
  }

  // Geographic single bet (US-only with many stocks)
  if (m.geographyCount === 1 && m.byGeography["us"] > 90 && m.assetCount > 5) {
    pool.push({
      id: "us-only",
      en: "100% US allocation. You've made an implicit macro bet that the United States outperforms every other economy indefinitely. That's worked well historically. History isn't a guarantee.",
      pt: "100% alocado nos EUA. Você fez uma aposta macro implícita de que os Estados Unidos superam toda outra economia indefinidamente. Funcionou bem historicamente. Histórico não é garantia.",
      category: "diversity",
      severity: 1,
    });
  }

  // Brazil-only bias
  if (m.geographyCount === 1 && m.byGeography["brazil"] > 90 && m.assetCount > 4) {
    pool.push({
      id: "brazil-only",
      en: "Exclusively Brazilian assets. Confident domestic conviction in a market known for political risk, currency volatility, and interest rate surprises. Brave.",
      pt: "Exclusivamente ativos brasileiros. Convicção doméstica confiante em um mercado conhecido por risco político, volatilidade cambial e surpresas na taxa de juros. Corajoso.",
      category: "diversity",
      severity: 2,
    });
  }

  // High risk score with no bonds
  if (m.weightedRiskScore > 80 && m.bondExposure < 5) {
    pool.push({
      id: "extreme-risk",
      en: `Weighted risk score: ${m.weightedRiskScore.toFixed(0)}/100. Zero cushioning from fixed income. You've built a portfolio designed exclusively for good weather. Weather changes.`,
      pt: `Score de risco ponderado: ${m.weightedRiskScore.toFixed(0)}/100. Zero amortecimento de renda fixa. Você construiu uma carteira projetada exclusivamente para bom tempo. O tempo muda.`,
      category: "risk",
      severity: 2,
    });
  }

  // Very low risk but poor diversification
  if (m.weightedRiskScore < 25 && m.assetClassCount < 3) {
    pool.push({
      id: "safe-but-dull",
      en: "Excellent risk management. The kind that ensures you'll definitely underperform inflation over a long enough horizon. Safety has a cost — it's measured in real returns.",
      pt: "Excelente gestão de risco. O tipo que garante que você vai definitivamente perder para a inflação no longo prazo. Segurança tem um custo — ele é medido em retorno real.",
      category: "risk",
      severity: 1,
    });
  }

  // ── Select top 4 by severity, one per category ─────────────
  const seen = new Set<string>();
  const selected = pool
    .sort((a, b) => b.severity - a.severity)
    .filter((r) => {
      if (seen.has(r.category)) return false;
      seen.add(r.category);
      return true;
    })
    .slice(0, 4);

  return selected.map((c) => ({
    id: c.id,
    text: lang === "pt" ? c.pt : c.en,
    category: c.category,
    severity: c.severity,
  }));
}

export function integrateRoasts(
  analysis: AnalysisResult,
  lang: Language = "en"
): AnalysisResult {
  const roasts = generateRoasts(analysis.metrics, analysis.score, lang);
  return { ...analysis, roasts };
}
