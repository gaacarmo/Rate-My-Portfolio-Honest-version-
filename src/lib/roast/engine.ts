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
      en: "This isn't a portfolio. It's a Hail Mary with a Ledger wallet. The only diversification here is which stablecoins you'll be clutching while everything else collapses.",
      pt: "Isso não é uma carteira. É uma promessa pra santo com interface blockchain. A única diversificação é qual stablecoin você vai abraçar enquanto tudo o mais implode.",
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-sandcastle",
      en: `${m.cryptoExposure.toFixed(0)}% crypto. You've handed your financial future to a Discord server. This isn't a portfolio review — it's a welfare check.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto. Você entregou seu futuro financeiro para um grupo no Telegram. Isso não é uma análise de carteira — é uma visita de assistência social.`,
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-vibes",
      en: `${m.cryptoExposure.toFixed(0)}% crypto and apparently zero therapy. Your risk tolerance isn't high — it's absent. There's a difference between brave and reckless, and this portfolio stopped caring around the 60% mark.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto e aparentemente zero terapia. Sua tolerância ao risco não é alta — ela simplesmente não existe. Há uma diferença entre corajoso e irresponsável, e essa carteira parou de fazer essa distinção lá pelos 60%.`,
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-sleep",
      en: "You don't check prices every hour because you're managing a portfolio. You do it because you've tied your emotional stability to the mood of anonymous strangers on the internet. That's not investing. That's a parasocial relationship with volatility.",
      pt: "Você não verifica preços de hora em hora porque gerencia uma carteira. Faz isso porque amarrou sua estabilidade emocional ao humor de estranhos anônimos na internet. Isso não é investimento. É um relacionamento parasocial com a volatilidade.",
      category: "crypto",
      severity: 3,
    });
  } else if (m.cryptoExposure > 50) {
    pool.push({
      id: "crypto-dominant",
      en: `${m.cryptoExposure.toFixed(0)}% in crypto. Your portfolio has a personality disorder — it desperately wants to be taken seriously while refusing to behave like anything serious. We've seen this pattern before. It doesn't end quietly.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto. Sua carteira tem um conflito de identidade — quer ser levada a sério enquanto se recusa a se comportar como algo sério. Já vimos esse padrão. Não termina bem.`,
      category: "crypto",
      severity: 3,
    });
    pool.push({
      id: "crypto-beta",
      en: `At ${m.cryptoExposure.toFixed(0)}% crypto your portfolio doesn't just have high beta — it has the emotional range of a teenager at a casino. Every news cycle is a crisis. Every green candle is euphoria. This is not a financial strategy. It's mood dysregulation with transaction fees.`,
      pt: `Com ${m.cryptoExposure.toFixed(0)}% em cripto, sua carteira não tem beta alto — ela tem a estabilidade emocional de um adolescente num cassino. Cada ciclo de notícias é uma crise. Cada vela verde é euforia. Isso não é estratégia financeira. É desregulação emocional com taxa de transação.`,
      category: "crypto",
      severity: 3,
    });
  } else if (m.cryptoExposure > 30) {
    pool.push({
      id: "crypto-gym",
      en: `${m.cryptoExposure.toFixed(0)}% crypto. You know it's probably too much. You knew it when you bought it. You're going to keep it anyway and explain why this time is different. We've read that story before. The ending doesn't change.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto. Você sabe que é provavelmente demais. Sabia na hora que comprou. Vai manter mesmo assim e explicar por que dessa vez é diferente. Já lemos essa história. O final não muda.`,
      category: "crypto",
      severity: 2,
    });
    pool.push({
      id: "crypto-roulette",
      en: `${m.cryptoExposure.toFixed(0)}% in crypto means roughly 1-in-3 times you open your portfolio app you'll regret it instantly. That's not acceptable risk exposure — that's a subscription to disappointment.`,
      pt: `${m.cryptoExposure.toFixed(0)}% em cripto significa que aproximadamente 1 em cada 3 vezes que você abre o app de investimentos vai se arrepender na hora. Isso não é exposição aceitável ao risco — é uma assinatura de arrependimento.`,
      category: "crypto",
      severity: 2,
    });
  } else if (m.cryptoExposure > 12) {
    pool.push({
      id: "crypto-youtube",
      en: `The ${m.cryptoExposure.toFixed(0)}% crypto position says 'calculated risk.' The rest of the portfolio says the calculation involved a YouTube thumbnail that said '10x guaranteed.' We can't prove this. We don't need to.`,
      pt: `Os ${m.cryptoExposure.toFixed(0)}% em cripto dizem 'risco calculado'. O resto da carteira diz que o cálculo envolveu uma thumbnail de YouTube que dizia '10x garantido'. Não podemos provar. Não precisamos.`,
      category: "crypto",
      severity: 1,
    });
    pool.push({
      id: "crypto-spice",
      en: `A ${m.cryptoExposure.toFixed(0)}% crypto position. Spices things up. Also adds enough volatility to make monthly reviews emotionally taxing and quarterly reviews genuinely depressing.`,
      pt: `Uma posição de ${m.cryptoExposure.toFixed(0)}% em cripto. Dá tempero. Também adiciona volatilidade suficiente para tornar os reviews mensais emocionalmente desgastantes e os trimestrais genuinamente deprimentos.`,
      category: "crypto",
      severity: 1,
    });
  }

  // ── Meme coins / low-quality crypto ───────────────────────────
  if (m.cryptoExposure > 20 && m.byAssetClass["crypto"] > 0) {
    pool.push({
      id: "meme-coin",
      en: "Part of your crypto exposure appears to involve assets that exist primarily as jokes people forgot were jokes. Dogecoin was created in two hours as a meme. You may want to sit with that for a moment.",
      pt: "Parte da sua exposição cripto parece envolver ativos que existem principalmente como piadas que as pessoas esqueceram que eram piadas. Dogecoin foi criado em duas horas como meme. Vale refletir sobre isso.",
      category: "crypto",
      severity: 2,
    });
  }

  // ── Tech roasts ───────────────────────────────────────────────
  if (m.techExposure > 75) {
    pool.push({
      id: "tech-extreme",
      en: "Investment thesis: tech dominates everything. Diversification thesis: also tech, but different tech. This isn't a portfolio — it's a concentrated bet wearing a diversification costume.",
      pt: "Tese de investimento: tech domina tudo. Tese de diversificação: também tech, mas diferente. Isso não é uma carteira — é uma aposta concentrada vestida de diversificação.",
      category: "tech",
      severity: 3,
    });
    pool.push({
      id: "tech-correlation",
      en: "You own 7 different tech companies and congratulations — you've discovered that 7 things that decline together in a rate hike cycle is just 1 thing written in a trenchcoat.",
      pt: "Você possui 7 empresas de tech diferentes e parabéns — você descobriu que 7 coisas que caem juntas num ciclo de alta de juros é só 1 coisa usando um sobretudo.",
      category: "tech",
      severity: 3,
    });
  } else if (m.techExposure > 55) {
    pool.push({
      id: "tech-heavy",
      en: `${m.techExposure.toFixed(0)}% in tech. You've mistaken sector concentration for diversification — an understandable error if you've never lived through Q4 2022. The market will eventually provide a very expensive tutorial.`,
      pt: `${m.techExposure.toFixed(0)}% em tech. Você confundiu concentração setorial com diversificação — um erro compreensível se você nunca viveu o 4T22. O mercado eventualmente vai oferecer um tutorial muito caro.`,
      category: "tech",
      severity: 2,
    });
    pool.push({
      id: "tech-ecosystem",
      en: `You've built a portfolio that moves as a single unit — downward. Not because the companies are bad, but because correlated assets ignore the concept of 'diversification benefit' entirely and so, apparently, did you.`,
      pt: `Você construiu uma carteira que se move como uma unidade — para baixo. Não porque as empresas são ruins, mas porque ativos correlacionados ignoram completamente o 'benefício da diversificação', e você também.`,
      category: "tech",
      severity: 2,
    });
  } else if (m.techExposure > 35) {
    pool.push({
      id: "tech-moderate",
      en: `Strong tech tilt. You know what you like. What you like delivered correlated drawdown in Q4 2022 and, to a lesser extent, Q1 2022. It will do this again. Probably while you're not watching.`,
      pt: `Forte inclinação para tech. Você sabe o que gosta. O que você gosta entregou queda correlacionada no 4T22 e, em menor extensão, no 1T22. Vai repetir. Provavelmente quando você não estiver olhando.`,
      category: "tech",
      severity: 1,
    });
  }

  // ── Concentration roasts ──────────────────────────────────────
  if (m.maxPositionWeight > 65) {
    pool.push({
      id: "concentration-relationship",
      en: `${m.maxPositionWeight.toFixed(0)}% in one position. You've essentially proposed to a single asset without a prenup. When this goes wrong — and statistically, it tends to — the settlement will be both emotionally and financially complicated.`,
      pt: `${m.maxPositionWeight.toFixed(0)}% em uma única posição. Você pediu esse ativo em casamento sem contrato. Quando isso der errado — e estatisticamente tende a dar — a separação vai ser emocional e financeiramente complicada.`,
      category: "concentration",
      severity: 3,
    });
    pool.push({
      id: "concentration-cold",
      en: `Your largest holding is ${m.maxPositionWeight.toFixed(0)}% of the portfolio. One bad earnings call away from a genuinely terrible day. One SEC investigation away from a very different life. That's the risk profile you're currently paying a premium to carry.`,
      pt: `Sua maior posição é ${m.maxPositionWeight.toFixed(0)}% da carteira. A um resultado ruim de uma manhã verdadeiramente horrível. A uma investigação regulatória de uma vida muito diferente. Esse é o perfil de risco pelo qual você paga prêmio para carregar.`,
      category: "concentration",
      severity: 3,
    });
    pool.push({
      id: "concentration-conviction",
      en: `${m.maxPositionWeight.toFixed(0)}% in one asset. Either you have profound conviction based on deep research, information the market doesn't have, or you just really like the logo. The outcome distribution looks identical from the outside.`,
      pt: `${m.maxPositionWeight.toFixed(0)}% em um ativo. Ou você tem convicção profunda baseada em pesquisa séria, informação que o mercado não tem, ou simplesmente gosta muito do logo. A distribuição de resultados parece idêntica de fora.`,
      category: "concentration",
      severity: 3,
    });
  } else if (m.maxPositionWeight > 45) {
    pool.push({
      id: "concentration-convicted",
      en: `Your largest position is ${m.maxPositionWeight.toFixed(0)}%. Confidence is fine. Diversification is recommended. You've picked one of these two philosophies and it shows.`,
      pt: `Sua maior posição é ${m.maxPositionWeight.toFixed(0)}%. Confiança tudo bem. Diversificação é recomendada. Você escolheu uma das duas filosofias e isso aparece.`,
      category: "concentration",
      severity: 2,
    });
  } else if (m.maxPositionWeight > 28) {
    pool.push({
      id: "concentration-podcast",
      en: `${m.maxPositionWeight.toFixed(0)}% in your top position. Confident but not unreasonable. Somewhere between deep fundamental analysis and 'I heard a compelling podcast and acted within 48 hours.'`,
      pt: `${m.maxPositionWeight.toFixed(0)}% na posição principal. Confiante mas não irracional. Em algum lugar entre análise fundamentalista profunda e 'ouvi um podcast convincente e agi em 48 horas'.`,
      category: "concentration",
      severity: 1,
    });
  }

  // ── Asset count / diversity roasts ───────────────────────────
  if (m.assetCount === 1) {
    pool.push({
      id: "one-asset",
      en: "One asset. We respect the commitment. We absolutely do not respect the risk management. You took everything you have and said 'this one. I trust this one.' That's not a portfolio strategy. That's a breakup waiting to happen.",
      pt: "Um ativo. Respeitamos o compromisso. Não respeitamos absolutamente a gestão de risco. Você pegou tudo que tem e disse 'esse aqui. Confio nesse'. Isso não é uma estratégia. É uma separação esperando pra acontecer.",
      category: "concentration",
      severity: 3,
    });
    pool.push({
      id: "one-asset-minimalism",
      en: "Portfolio construction reduced to its absolute limit. Minimum effort. Maximum single-point-of-failure exposure. If this goes wrong there's nothing to soften it. That's not conviction — it's a coin flip with extra steps.",
      pt: "Construção de carteira reduzida ao limite absoluto. Esforço mínimo. Exposição máxima a ponto único de falha. Se isso der errado não há nada para suavizar. Isso não é convicção — é cara ou coroa com etapas extras.",
      category: "concentration",
      severity: 3,
    });
  } else if (m.assetCount === 2) {
    pool.push({
      id: "two-assets",
      en: "Two assets. You've diversified in the sense that there are now two separate things that can individually disappoint you. The statistical definition of diversification requires a few more data points, but sure — progress.",
      pt: "Dois ativos. Você diversificou no sentido de que agora são duas coisas separadas que podem individualmente te decepcionar. A definição estatística de diversificação exige mais alguns pontos, mas tudo bem — progresso.",
      category: "concentration",
      severity: 2,
    });
  } else if (m.assetCount === 3) {
    pool.push({
      id: "three-assets",
      en: "Three assets. A holy trinity of conviction. Technically diversified. Practically, one rough earnings season away from having serious regrets about this approach.",
      pt: "Três ativos. Uma trindade sagrada de convicção. Tecnicamente diversificado. Na prática, a um trimestre ruim de ter sérios arrependimentos com essa abordagem.",
      category: "concentration",
      severity: 1,
    });
  }

  // ── Pseudo-diversification ────────────────────────────────────
  if (m.assetCount > 7 && m.hhi > 0.3) {
    pool.push({
      id: "pseudo-diversified",
      en: `${m.assetCount} positions. Effective diversification ≈ ${m.effectiveN.toFixed(0)}. You've mastered the aesthetic of spreading risk without the mathematical reality of it. That's the financial equivalent of rearranging deck chairs.`,
      pt: `${m.assetCount} posições. Diversificação efetiva ≈ ${m.effectiveN.toFixed(0)}. Você dominou a estética de distribuir risco sem a realidade matemática disso. É o equivalente financeiro de reorganizar as cadeiras do Titanic.`,
      category: "diversity",
      severity: 2,
    });
  }

  // ── Home bias ─────────────────────────────────────────────────
  if (m.geographyCount === 1 && m.assetCount > 4) {
    pool.push({
      id: "home-bias",
      en: "You've diversified across companies while apparently never considering that other countries also operate capital markets. Home bias isn't irrational. It's just limiting in ways that compound over time without you noticing.",
      pt: "Você diversificou por empresas enquanto aparentemente nunca considerou que outros países também têm mercados de capitais. Viés doméstico não é irracional. É apenas limitante de formas que se acumulam ao longo do tempo sem você perceber.",
      category: "diversity",
      severity: 2,
    });
    pool.push({
      id: "home-bias-2",
      en: "Single geography. Your entire financial future depends on the competence of one government's monetary policy. That's either extreme confidence or simply never having considered there are other options.",
      pt: "Uma única geografia. Seu futuro financeiro inteiro depende da competência da política monetária de um único governo. É extrema confiança ou simplesmente nunca ter considerado que existem outras opções.",
      category: "diversity",
      severity: 1,
    });
  }

  // ── No bonds / zero safety net ────────────────────────────────
  if (m.bondExposure === 0 && m.weightedRiskScore > 65) {
    pool.push({
      id: "no-bonds",
      en: "Zero fixed income. No floor, no cushion, no shock absorber. This works beautifully until it doesn't — and when it doesn't, you'll wish you had something simply boring instead of something simply broken.",
      pt: "Zero renda fixa. Sem piso, sem amortecedor, sem colchão. Funciona muito bem até não funcionar — e quando não funcionar, você vai querer ter tido algo simplesmente chato em vez de algo simplesmente quebrado.",
      category: "risk",
      severity: 2,
    });
  }

  // ── Too conservative ──────────────────────────────────────────
  if (m.bondExposure > 70 && m.stockExposure < 15) {
    pool.push({
      id: "bunker-portfolio",
      en: "This is less a portfolio and more a financial bunker. Admirably safe. Also admirably mediocre in real return after inflation. You've solved the volatility problem by eliminating any possibility of growth. Technically a solution.",
      pt: "Isso é menos uma carteira e mais um bunker financeiro. Admiravelmente seguro. Também admiravelmente medíocre em retorno real depois da inflação. Você resolveu o problema da volatilidade eliminando qualquer possibilidade de crescimento. Tecnicamente uma solução.",
      category: "risk",
      severity: 2,
    });
    pool.push({
      id: "mattress-money",
      en: "So conservative it makes a savings account look aggressive. Inflation is quietly eroding your purchasing power in the background while you congratulate yourself on low volatility. But sure — you'll sleep fine.",
      pt: "Tão conservadora que faz a poupança parecer agressiva. A inflação está corroendo silenciosamente seu poder de compra em segundo plano enquanto você se parabeniza pela baixa volatilidade. Mas tudo bem — você vai dormir bem.",
      category: "risk",
      severity: 1,
    });
  }

  // ── Mixed signals ─────────────────────────────────────────────
  if (m.cryptoExposure > 15 && m.bondExposure > 20) {
    pool.push({
      id: "crypto-bonds",
      en: "Crypto and government bonds in the same portfolio. The aggressive side bets on chaos. The conservative side bets against it. They cancel each other out and charge you fees for the privilege. Creative.",
      pt: "Cripto e renda fixa na mesma carteira. O lado agressivo aposta no caos. O conservador aposta contra. Eles se cancelam mutuamente e cobram taxas por isso. Criativo.",
      category: "risk",
      severity: 2,
    });
  }

  // ── High effective N but still bad ───────────────────────────
  if (m.assetCount > 15 && m.hhi > 0.2) {
    pool.push({
      id: "diworsification",
      en: `${m.assetCount} positions with an HHI that says you're still heavily concentrated. More positions ≠ more diversification. At some point you're adding complexity without adding benefit. You passed that point a few positions ago.`,
      pt: `${m.assetCount} posições com um HHI que diz que você ainda está altamente concentrado. Mais posições ≠ mais diversificação. Em algum momento você adiciona complexidade sem adicionar benefício. Você passou esse ponto algumas posições atrás.`,
      category: "diversity",
      severity: 1,
    });
  }

  // ── Score-based general roasts ────────────────────────────────
  if (score < 30) {
    pool.push({
      id: "score-disaster",
      en: `Score: ${score}. This portfolio failed the basic stress test of simply existing in a market with normal conditions. We've seen more structurally coherent financial decisions made in Las Vegas. At least those have free drinks.`,
      pt: `Nota: ${score}. Essa carteira falhou no teste básico de estresse de simplesmente existir em um mercado com condições normais. Já vimos decisões financeiras mais estruturalmente coerentes em cassinos. Pelo menos lá tem bebida grátis.`,
      category: "general",
      severity: 3,
    });
    pool.push({
      id: "score-headline",
      en: "The strategic logic here appears to have been assembled from financial hot takes and Twitter threads. There is no other plausible explanation for this particular combination of assets.",
      pt: "A lógica estratégica aqui parece ter sido montada a partir de hot takes financeiros e threads no Twitter. Não há outra explicação plausível para essa combinação específica de ativos.",
      category: "general",
      severity: 3,
    });
    pool.push({
      id: "score-situation",
      en: "This isn't a financial plan. It's financial evidence. The kind that would be submitted in proceedings titled 'how did we get here.' We're not judging. We're documenting.",
      pt: "Isso não é um plano financeiro. É uma evidência financeira. O tipo que seria apresentado em processos intitulados 'como chegamos aqui'. Não estamos julgando. Estamos documentando.",
      category: "general",
      severity: 3,
    });
  } else if (score < 45) {
    pool.push({
      id: "score-dismal",
      en: `Score: ${score}. These decisions were made with urgency, possibly during a bull market, and certainly without consulting anyone whose job description includes the word 'fiduciary.'`,
      pt: `Nota: ${score}. Essas decisões foram tomadas com urgência, possivelmente durante um mercado de alta, e certamente sem consultar ninguém cuja descrição de cargo inclua a palavra 'fiduciário'.`,
      category: "general",
      severity: 3,
    });
    pool.push({
      id: "score-potential",
      en: "There is potential here. It is currently buried under several layers of sub-optimal allocation decisions, but structurally, the potential exists. Somewhere underneath all this.",
      pt: "Há potencial aqui. Está atualmente enterrado sob várias camadas de decisões de alocação subótimas, mas estruturalmente, o potencial existe. Em algum lugar sob tudo isso.",
      category: "general",
      severity: 2,
    });
  } else if (score < 58) {
    pool.push({
      id: "score-low",
      en: "You're in the territory of 'trying but not quite.' The gap between here and genuinely competent is fixable. The fix requires admitting what isn't working, which is historically the harder part.",
      pt: "Você está no território de 'tentando mas não chegando lá'. A distância entre aqui e genuinamente competente é corrigível. A correção exige admitir o que não está funcionando, o que historicamente é a parte mais difícil.",
      category: "general",
      severity: 2,
    });
  } else if (score < 70) {
    pool.push({
      id: "score-mediocre",
      en: "Neither broken nor optimized — which is the most frustrating place to be. Just bad enough to cost you in the long run. Just good enough that you'll probably ignore the warnings and do nothing.",
      pt: "Nem quebrada nem otimizada — o que é honestamente o lugar mais frustrante para estar. Ruim o suficiente para custar no longo prazo. Boa o suficiente para você provavelmente ignorar os avisos e não fazer nada.",
      category: "general",
      severity: 1,
    });
    pool.push({
      id: "score-almost",
      en: "Within striking distance of 'actually good.' The remaining issues are minor, fixable, and currently being actively ignored. This is the part where people nod and do nothing. Don't be that person.",
      pt: "Perto de 'realmente bom'. Os problemas restantes são menores, corrigíveis, e atualmente sendo ativamente ignorados. Essa é a parte onde as pessoas acenam e não fazem nada. Não seja essa pessoa.",
      category: "general",
      severity: 1,
    });
  } else if (score >= 85) {
    pool.push({
      id: "score-good",
      en: "Genuinely well-constructed. We looked for something to roast and the pickings were thin. The only available observation is that being this disciplined about portfolio construction suggests you might be slightly boring at parties. That's a compliment.",
      pt: "Genuinamente bem construída. Procuramos algo para criticar e as opções eram escassas. A única observação disponível é que ser tão disciplinado com a carteira sugere que você pode ser levemente chato em festas. Isso é um elogio.",
      category: "positive",
      severity: 1,
    });
    pool.push({
      id: "score-suspiciously-good",
      en: "Suspiciously well-diversified. Either you did serious research, copied someone who did, or got lucky and then had the discipline not to ruin it. We don't care which. Don't change it.",
      pt: "Suspeita de tão bem diversificada. Ou você fez pesquisa séria, copiou alguém que fez, ou teve sorte e teve disciplina para não estragar depois. Não importa qual. Não mude.",
      category: "positive",
      severity: 1,
    });
  }

  // ── Extra thematic roasts ──────────────────────────────────────

  // FOMO-driven portfolio
  if (m.assetCount >= 4 && m.hhi > 0.35 && m.cryptoExposure > 10 && m.techExposure > 25) {
    pool.push({
      id: "fomo-portfolio",
      en: "This portfolio has the architecture of FOMO — concentrated in whatever was printing last quarter, diversification as an afterthought. The market runs on memory. It remembers who bought the top.",
      pt: "Essa carteira tem a arquitetura do FOMO — concentrada no que subiu no último trimestre, diversificação como reflexo tardio. O mercado tem memória. Ele lembra quem comprou no topo.",
      category: "general",
      severity: 2,
    });
  }

  // Geographic single bet (US-only with many stocks)
  if (m.geographyCount === 1 && m.byGeography["us"] > 90 && m.assetCount > 5) {
    pool.push({
      id: "us-only",
      en: "100% US allocation. You've made an implicit bet that American exceptionalism is a permanent feature of global capital markets. That's worked for decades. It's also the same argument people made about the British Empire.",
      pt: "100% alocado nos EUA. Você fez uma aposta implícita de que o excepcionalismo americano é uma característica permanente dos mercados globais de capital. Funcionou por décadas. É também o mesmo argumento que faziam sobre o Império Britânico.",
      category: "diversity",
      severity: 1,
    });
  }

  // Brazil-only bias
  if (m.geographyCount === 1 && m.byGeography["brazil"] > 90 && m.assetCount > 4) {
    pool.push({
      id: "brazil-only",
      en: "Exclusively Brazilian assets. Concentrated domestic risk in a market with legendary political interference, regular interest rate shocks, and a central bank that treats 13% as a reasonable starting point. Brave or local. Possibly both.",
      pt: "Exclusivamente ativos brasileiros. Risco doméstico concentrado em um mercado com histórica interferência política, choques regulares de taxa de juros, e um banco central que trata 13% como ponto de partida razoável. Corajoso ou local. Possivelmente os dois.",
      category: "diversity",
      severity: 2,
    });
  }

  // High risk score with no bonds
  if (m.weightedRiskScore > 80 && m.bondExposure < 5) {
    pool.push({
      id: "extreme-risk",
      en: `Risk score: ${m.weightedRiskScore.toFixed(0)}/100. Zero fixed income buffer. You've engineered a portfolio that performs beautifully in bull markets and experiences genuine distress in anything else. The market spends about 30% of its time in 'anything else.'`,
      pt: `Score de risco: ${m.weightedRiskScore.toFixed(0)}/100. Zero amortecedor de renda fixa. Você construiu uma carteira que performa lindamente em mercados de alta e experimenta dificuldade real em qualquer outra coisa. O mercado passa cerca de 30% do tempo em 'qualquer outra coisa'.`,
      category: "risk",
      severity: 2,
    });
  }

  // Very low risk but poor diversification
  if (m.weightedRiskScore < 25 && m.assetClassCount < 3) {
    pool.push({
      id: "safe-but-dull",
      en: "Impeccable risk management. The kind that guarantees you'll underperform inflation over a long enough horizon. You've solved volatility by eliminating growth. That's technically a solution to a problem no one asked you to solve.",
      pt: "Gestão de risco impecável. O tipo que garante que você vai perder para a inflação no longo prazo. Você resolveu a volatilidade eliminando o crescimento. Isso é tecnicamente uma solução para um problema que ninguém pediu para você resolver.",
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
