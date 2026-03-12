export type AssetClass =
  | "stock"
  | "etf"
  | "crypto"
  | "bond"
  | "reit"
  | "cash"
  | "commodity"
  | "fixed_income";

export type Sector =
  | "tech"
  | "finance"
  | "healthcare"
  | "energy"
  | "consumer"
  | "industrial"
  | "utilities"
  | "materials"
  | "telecom"
  | "real_estate"
  | "diversified";

export type Geography =
  | "us"
  | "brazil"
  | "europe"
  | "emerging"
  | "global"
  | "latam";

export type RiskLevel = "very_low" | "low" | "medium" | "high" | "extreme";

export interface AssetDefinition {
  ticker: string;
  name: string;
  assetClass: AssetClass;
  sector?: Sector;
  geography: Geography;
  riskLevel: RiskLevel;
  description?: string;
  tags?: string[];
}

export interface PortfolioAsset {
  id: string;
  ticker: string;
  name: string;
  weight: number;
  assetClass: AssetClass;
  sector?: Sector;
  geography: Geography;
  riskLevel: RiskLevel;
}

export interface Portfolio {
  id: string;
  name: string;
  assets: PortfolioAsset[];
  description?: string;
}

export type WarningLevel = "info" | "warning" | "danger";

export interface Warning {
  id: string;
  level: WarningLevel;
  title: string;
  description: string;
  metric?: string;
}

export interface Roast {
  id: string;
  text: string;
  category:
    | "concentration"
    | "crypto"
    | "tech"
    | "diversity"
    | "risk"
    | "general"
    | "positive";
  severity: 1 | 2 | 3;
}

export interface PersonalityType {
  key: string;
  name: string;
  icon: string;
  description: string;
  tagline: string;
}

export interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  actionable: string;
}

export interface PortfolioMetrics {
  hhi: number;
  maxPositionWeight: number;
  effectiveN: number;
  assetClassCount: number;
  sectorCount: number;
  geographyCount: number;
  assetCount: number;
  weightedRiskScore: number;
  cryptoExposure: number;
  techExposure: number;
  stockExposure: number;
  bondExposure: number;
  byAssetClass: Record<string, number>;
  bySector: Record<string, number>;
  byGeography: Record<string, number>;
  byRiskLevel: Record<string, number>;
}

export interface AnalysisResult {
  score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  diversificationScore: number;
  concentrationScore: number;
  riskScore: number;
  coherenceScore: number;
  metrics: PortfolioMetrics;
  warnings: Warning[];
  roasts: Roast[];
  personality: PersonalityType;
  recommendations: Recommendation[];
  alternativePortfolio: Portfolio;
}

export interface PresetPortfolio {
  key: string;
  name: string;
  icon: string;
  description: string;
  tagline: string;
  assets: Omit<PortfolioAsset, "id">[];
}
