"use client";

import { AnalysisResult, PortfolioAsset } from "@/types";
import ScoreCard from "./ScoreCard";
import PersonalityCard from "./PersonalityCard";
import RoastSection from "./RoastSection";
import WarningsPanel from "./WarningsPanel";
import RecommendationsPanel from "./RecommendationsPanel";
import MetricsGrid from "./MetricsGrid";
import AlternativePortfolio from "./AlternativePortfolio";
import AllocationChart from "@/components/charts/AllocationChart";
import MetricsChart from "@/components/charts/MetricsChart";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnalysisResultsProps {
  result: AnalysisResult;
  assets: PortfolioAsset[];
}

function SectionDivider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
  );
}

function Section({
  label,
  subtitle,
  children,
}: {
  label: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <p className="label">{label}</p>
        {subtitle && <p className="text-[11px] text-ink-disabled mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function AnalysisResults({ result, assets }: AnalysisResultsProps) {
  const { t } = useLanguage();
  const r = t.results;

  return (
    <div className="space-y-10">

      {/* ── 1. Roasts — the star of the show ─────────── */}
      {result.roasts.length > 0 && (
        <RoastSection roasts={result.roasts} />
      )}

      <SectionDivider />

      {/* ── 2. Personality ───────────────────────────── */}
      <PersonalityCard personality={result.personality} />

      <SectionDivider />

      {/* ── 3. Score breakdown ───────────────────────── */}
      <Section label={r.portfolioScore} subtitle={r.portfolioScoreSubtitle}>
        <div className="rounded-xl border border-bg-border bg-bg-surface p-7 shadow-card">
          <ScoreCard result={result} />
        </div>
      </Section>

      <SectionDivider />

      {/* ── 4. Charts ────────────────────────────────── */}
      <Section label={r.portfolioComposition} subtitle={r.portfolioCompositionSubtitle}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-bg-border bg-bg-surface p-6 shadow-card">
            <p className="label mb-5">{r.allocationBreakdown}</p>
            <AllocationChart assets={assets} metrics={result.metrics} />
          </div>
          <div className="rounded-xl border border-bg-border bg-bg-surface p-6 shadow-card">
            <p className="label mb-5">{r.qualityDimensions}</p>
            <MetricsChart result={result} />
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ── 5. Key metrics ───────────────────────────── */}
      <Section label={r.portfolioMetrics} subtitle={r.portfolioMetricsSubtitle}>
        <MetricsGrid metrics={result.metrics} />
      </Section>

      <SectionDivider />

      {/* ── 6. Warnings ──────────────────────────────── */}
      <Section
        label={r.warnings}
        subtitle={r.warningsSubtitle(result.warnings.length)}
      >
        <WarningsPanel warnings={result.warnings} />
      </Section>

      <SectionDivider />

      {/* ── 7. Recommendations ───────────────────────── */}
      <Section label={r.recommendations} subtitle={r.recommendationsSubtitle}>
        <RecommendationsPanel recommendations={result.recommendations} />
      </Section>

      <SectionDivider />

      {/* ── 8. Alternative portfolio ─────────────────── */}
      <Section label={r.alternative} subtitle={r.alternativeSubtitle}>
        <AlternativePortfolio alternative={result.alternativePortfolio} />
      </Section>

      {/* ── Disclaimer ───────────────────────────────── */}
      <div className="px-5 py-4 rounded-xl border border-bg-border bg-bg-surface/40">
        <p className="text-[11px] text-ink-disabled leading-relaxed">
          <span className="font-semibold text-ink-tertiary">{r.disclaimerTitle}</span>{" "}
          {r.disclaimerText}
        </p>
      </div>
    </div>
  );
}
