import { AssetDefinition } from "@/types";

export const ASSET_DATABASE: AssetDefinition[] = [
  // US Tech
  { ticker: "AAPL", name: "Apple Inc.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "medium" },
  { ticker: "MSFT", name: "Microsoft Corp.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "medium" },
  { ticker: "GOOGL", name: "Alphabet Inc.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "medium" },
  { ticker: "META", name: "Meta Platforms", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "medium" },
  { ticker: "AMZN", name: "Amazon.com Inc.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "medium" },
  { ticker: "NVDA", name: "NVIDIA Corp.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "high" },
  { ticker: "TSLA", name: "Tesla Inc.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "high" },
  { ticker: "NFLX", name: "Netflix Inc.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "high" },
  { ticker: "AMD", name: "Advanced Micro Devices", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "high" },
  { ticker: "CRM", name: "Salesforce Inc.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "medium" },
  { ticker: "UBER", name: "Uber Technologies", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "high" },
  { ticker: "SHOP", name: "Shopify Inc.", assetClass: "stock", sector: "tech", geography: "us", riskLevel: "high" },

  // US Finance
  { ticker: "JPM", name: "JPMorgan Chase", assetClass: "stock", sector: "finance", geography: "us", riskLevel: "medium" },
  { ticker: "BAC", name: "Bank of America", assetClass: "stock", sector: "finance", geography: "us", riskLevel: "medium" },
  { ticker: "GS", name: "Goldman Sachs", assetClass: "stock", sector: "finance", geography: "us", riskLevel: "medium" },
  { ticker: "V", name: "Visa Inc.", assetClass: "stock", sector: "finance", geography: "us", riskLevel: "low" },
  { ticker: "MA", name: "Mastercard Inc.", assetClass: "stock", sector: "finance", geography: "us", riskLevel: "low" },
  { ticker: "BRK.B", name: "Berkshire Hathaway B", assetClass: "stock", sector: "finance", geography: "us", riskLevel: "low" },

  // US Healthcare
  { ticker: "JNJ", name: "Johnson & Johnson", assetClass: "stock", sector: "healthcare", geography: "us", riskLevel: "low" },
  { ticker: "PFE", name: "Pfizer Inc.", assetClass: "stock", sector: "healthcare", geography: "us", riskLevel: "medium" },
  { ticker: "UNH", name: "UnitedHealth Group", assetClass: "stock", sector: "healthcare", geography: "us", riskLevel: "medium" },
  { ticker: "LLY", name: "Eli Lilly and Co.", assetClass: "stock", sector: "healthcare", geography: "us", riskLevel: "medium" },

  // US Consumer
  { ticker: "WMT", name: "Walmart Inc.", assetClass: "stock", sector: "consumer", geography: "us", riskLevel: "low" },
  { ticker: "PG", name: "Procter & Gamble", assetClass: "stock", sector: "consumer", geography: "us", riskLevel: "low" },
  { ticker: "KO", name: "Coca-Cola Co.", assetClass: "stock", sector: "consumer", geography: "us", riskLevel: "very_low" },
  { ticker: "MCD", name: "McDonald's Corp.", assetClass: "stock", sector: "consumer", geography: "us", riskLevel: "low" },
  { ticker: "NKE", name: "Nike Inc.", assetClass: "stock", sector: "consumer", geography: "us", riskLevel: "medium" },

  // US Energy
  { ticker: "XOM", name: "ExxonMobil Corp.", assetClass: "stock", sector: "energy", geography: "us", riskLevel: "medium" },
  { ticker: "CVX", name: "Chevron Corp.", assetClass: "stock", sector: "energy", geography: "us", riskLevel: "medium" },

  // US ETFs
  { ticker: "SPY", name: "SPDR S&P 500 ETF", assetClass: "etf", sector: "diversified", geography: "us", riskLevel: "medium", tags: ["index"] },
  { ticker: "QQQ", name: "Invesco QQQ (Nasdaq-100)", assetClass: "etf", sector: "tech", geography: "us", riskLevel: "high", tags: ["index"] },
  { ticker: "VTI", name: "Vanguard Total Market ETF", assetClass: "etf", sector: "diversified", geography: "us", riskLevel: "medium", tags: ["index"] },
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", assetClass: "etf", sector: "diversified", geography: "us", riskLevel: "medium", tags: ["index"] },
  { ticker: "IWM", name: "iShares Russell 2000 ETF", assetClass: "etf", sector: "diversified", geography: "us", riskLevel: "high" },
  { ticker: "ARKK", name: "ARK Innovation ETF", assetClass: "etf", sector: "tech", geography: "us", riskLevel: "extreme", tags: ["thematic"] },

  // International ETFs
  { ticker: "VEA", name: "Vanguard Dev. Markets ETF", assetClass: "etf", sector: "diversified", geography: "global", riskLevel: "medium", tags: ["index"] },
  { ticker: "VWO", name: "Vanguard Emerging Markets ETF", assetClass: "etf", sector: "diversified", geography: "emerging", riskLevel: "high", tags: ["index"] },
  { ticker: "EEM", name: "iShares MSCI Emerging Markets", assetClass: "etf", sector: "diversified", geography: "emerging", riskLevel: "high" },
  { ticker: "EFA", name: "iShares MSCI EAFE ETF", assetClass: "etf", sector: "diversified", geography: "europe", riskLevel: "medium" },

  // Commodities
  { ticker: "GLD", name: "SPDR Gold Shares", assetClass: "commodity", geography: "global", riskLevel: "medium" },
  { ticker: "SLV", name: "iShares Silver Trust", assetClass: "commodity", geography: "global", riskLevel: "high" },
  { ticker: "DJP", name: "iPath Bloomberg Commodity", assetClass: "commodity", geography: "global", riskLevel: "medium" },

  // Bonds
  { ticker: "BND", name: "Vanguard Total Bond Market ETF", assetClass: "bond", geography: "us", riskLevel: "low" },
  { ticker: "AGG", name: "iShares Core U.S. Aggregate Bond", assetClass: "bond", geography: "us", riskLevel: "low" },
  { ticker: "TLT", name: "iShares 20+ Year Treasury ETF", assetClass: "bond", geography: "us", riskLevel: "medium" },
  { ticker: "HYG", name: "iShares High Yield Corporate Bond", assetClass: "bond", geography: "us", riskLevel: "medium" },

  // REITs
  { ticker: "VNQ", name: "Vanguard Real Estate ETF", assetClass: "reit", geography: "us", riskLevel: "medium" },
  { ticker: "O", name: "Realty Income Corp.", assetClass: "reit", geography: "us", riskLevel: "low" },

  // Crypto
  { ticker: "BTC", name: "Bitcoin", assetClass: "crypto", geography: "global", riskLevel: "extreme" },
  { ticker: "ETH", name: "Ethereum", assetClass: "crypto", geography: "global", riskLevel: "extreme" },
  { ticker: "SOL", name: "Solana", assetClass: "crypto", geography: "global", riskLevel: "extreme" },
  { ticker: "ADA", name: "Cardano", assetClass: "crypto", geography: "global", riskLevel: "extreme" },
  { ticker: "DOGE", name: "Dogecoin", assetClass: "crypto", geography: "global", riskLevel: "extreme", tags: ["meme"] },
  { ticker: "SHIB", name: "Shiba Inu", assetClass: "crypto", geography: "global", riskLevel: "extreme", tags: ["meme"] },
  { ticker: "XRP", name: "Ripple (XRP)", assetClass: "crypto", geography: "global", riskLevel: "extreme" },
  { ticker: "MATIC", name: "Polygon (MATIC)", assetClass: "crypto", geography: "global", riskLevel: "extreme" },
  { ticker: "LINK", name: "Chainlink", assetClass: "crypto", geography: "global", riskLevel: "extreme" },

  // Brazilian Stocks
  { ticker: "VALE3", name: "Vale S.A.", assetClass: "stock", sector: "materials", geography: "brazil", riskLevel: "high" },
  { ticker: "PETR4", name: "Petrobras PN", assetClass: "stock", sector: "energy", geography: "brazil", riskLevel: "high" },
  { ticker: "ITUB4", name: "Itaú Unibanco PN", assetClass: "stock", sector: "finance", geography: "brazil", riskLevel: "medium" },
  { ticker: "BBDC4", name: "Bradesco PN", assetClass: "stock", sector: "finance", geography: "brazil", riskLevel: "medium" },
  { ticker: "WEGE3", name: "WEG S.A.", assetClass: "stock", sector: "industrial", geography: "brazil", riskLevel: "medium" },
  { ticker: "B3SA3", name: "B3 S.A.", assetClass: "stock", sector: "finance", geography: "brazil", riskLevel: "medium" },
  { ticker: "MGLU3", name: "Magazine Luiza", assetClass: "stock", sector: "consumer", geography: "brazil", riskLevel: "extreme" },
  { ticker: "RENT3", name: "Localiza S.A.", assetClass: "stock", sector: "consumer", geography: "brazil", riskLevel: "medium" },
  { ticker: "EMBR3", name: "Embraer S.A.", assetClass: "stock", sector: "industrial", geography: "brazil", riskLevel: "high" },

  // Brazilian Fixed Income
  { ticker: "SELIC", name: "Tesouro SELIC", assetClass: "fixed_income", geography: "brazil", riskLevel: "very_low" },
  { ticker: "IPCA+", name: "Tesouro IPCA+", assetClass: "fixed_income", geography: "brazil", riskLevel: "low" },
  { ticker: "PREFIXADO", name: "Tesouro Prefixado", assetClass: "fixed_income", geography: "brazil", riskLevel: "low" },
  { ticker: "CDI", name: "CDB / CDI", assetClass: "fixed_income", geography: "brazil", riskLevel: "very_low" },
  { ticker: "LCI", name: "LCI / LCA", assetClass: "fixed_income", geography: "brazil", riskLevel: "very_low" },

  // Cash
  { ticker: "CASH", name: "Cash / Money Market", assetClass: "cash", geography: "us", riskLevel: "very_low" },
];

export function searchAssets(query: string): AssetDefinition[] {
  const q = query.toLowerCase().trim();
  if (!q) return ASSET_DATABASE.slice(0, 20);
  return ASSET_DATABASE.filter(
    (a) =>
      a.ticker.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.assetClass.toLowerCase().includes(q)
  ).slice(0, 10);
}
