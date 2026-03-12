"use client";

import { useState, useRef } from "react";
import { PortfolioAsset, AnalysisResult, PresetPortfolio } from "@/types";
import { analyzePortfolio, normalizeWeights } from "@/lib/analysis/engine";
import { integrateRoasts } from "@/lib/roast/engine";
import PortfolioBuilder from "@/components/portfolio/PortfolioBuilder";
import PresetSelector from "@/components/portfolio/PresetSelector";
import AnalysisResults from "@/components/results/AnalysisResults";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import { ICON_MAP } from "@/lib/iconMap";
import { Check, CircleHelp, RotateCcw } from "lucide-react";

let assetIdCounter = 0;
function makeId() {
  return `pa-${Date.now()}-${++assetIdCounter}`;
}

const gradeColorHex: Record<string, string> = {
  S: "#4ADE80", A: "#4ADE80", B: "#F97316", C: "#FCD34D", D: "#FB923C", F: "#F87171",
};

const gradeSeverityLabel: Record<string, { en: string; pt: string }> = {
  S: { en: "Surprisingly Responsible",   pt: "Surpreendentemente Responsável" },
  A: { en: "Actually Competent",          pt: "Genuinamente Competente" },
  B: { en: "Mostly Functional",           pt: "Principalmente Funcional" },
  C: { en: "Work In Progress",            pt: "Em Desenvolvimento" },
  D: { en: "Concerning",                  pt: "Preocupante" },
  F: { en: "We Need to Talk",             pt: "Precisamos Conversar" },
};

function VerdictCard({
  result,
  onReset,
}: {
  result: AnalysisResult;
  onReset: () => void;
}) {
  const { t, language } = useLanguage();
  const topRoast = [...result.roasts].sort((a, b) => b.severity - a.severity)[0];
  const Icon = ICON_MAP[result.personality.icon] ?? CircleHelp;
  const hex = gradeColorHex[result.grade] ?? "#F87171";
  const gradeLabel = gradeSeverityLabel[result.grade];

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{
      border: `1px solid ${hex}1a`,
      background: "#111111",
      boxShadow: `0 0 0 1px ${hex}0f, 0 32px 80px rgba(0,0,0,0.6), 0 0 80px ${hex}0a`,
    }}>
      {/* Top highlight line — grade color */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: `linear-gradient(90deg, transparent, ${hex}55, transparent)`,
      }} />

      {/* Ambient glow — upper left */}
      <div className="absolute pointer-events-none" style={{
        top: 0, left: 0, width: "55%", height: "65%",
        background: `radial-gradient(ellipse at top left, ${hex}0e 0%, transparent 70%)`,
      }} />

      {/* Brand watermark — top right */}
      <div className="absolute top-5 right-6 text-right select-none pointer-events-none">
        <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-disabled opacity-50">
          Rate My Portfolio
        </div>
        <div className="text-[8px] uppercase tracking-[0.12em] opacity-30 text-ink-disabled">
          Honest Mode
        </div>
      </div>

      <div className="relative px-7 sm:px-9 pt-8 pb-7 space-y-7">

        {/* ── Top: Grade + Personality ───────────────────────── */}
        <div className="flex items-start gap-6 sm:gap-8">

          {/* Grade block */}
          <div className="flex-shrink-0 text-center">
            <div
              className="num font-black leading-none"
              style={{
                fontSize: "5rem",
                color: hex,
                textShadow: `0 0 32px ${hex}66, 0 0 64px ${hex}22`,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {result.grade}
            </div>
            <div className="num text-[11px] tabular-nums mt-2" style={{ color: `${hex}80` }}>
              {result.score}<span className="opacity-50">/100</span>
            </div>
          </div>

          {/* Vertical separator */}
          <div className="hidden sm:block w-px self-stretch flex-shrink-0" style={{
            background: `linear-gradient(180deg, transparent, ${hex}20, transparent)`,
          }} />

          {/* Personality */}
          <div className="flex-1 min-w-0 pt-1 space-y-2">
            {/* Grade verdict */}
            <div
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
              style={{ color: hex, background: `${hex}12`, borderColor: `${hex}25` }}
            >
              {language === "pt" ? gradeLabel.pt : gradeLabel.en}
            </div>

            {/* Personality name */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div
                className="flex-shrink-0 p-1.5 rounded-lg border"
                style={{ background: `${hex}10`, borderColor: `${hex}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: hex }} strokeWidth={1.5} />
              </div>
              <h2 className="text-[20px] sm:text-[22px] font-black tracking-tight text-ink leading-tight">
                {result.personality.name}
              </h2>
            </div>

            {/* Personality tagline */}
            <p className="text-[13px] text-ink-tertiary italic leading-relaxed">
              &ldquo;{result.personality.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* ── The Roast ─────────────────────────────────────── */}
        {topRoast && (
          <div className="relative" style={{
            borderLeft: `2px solid ${hex}35`,
            paddingLeft: "1.25rem",
          }}>
            {/* Big quote mark */}
            <div
              className="absolute -top-3 -left-1 font-serif leading-none select-none pointer-events-none opacity-20"
              style={{ fontSize: "3.5rem", color: hex }}
              aria-hidden
            >
              &ldquo;
            </div>
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-ink font-medium relative z-10">
              {topRoast.text}
            </p>
          </div>
        )}

        {/* ── Footer stats + reset ──────────────────────────── */}
        <div className="flex items-center justify-between gap-4 pt-1" style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { value: result.roasts.length, label: language === "pt" ? "roasts" : "roasts" },
              { value: result.warnings.length, label: language === "pt" ? "alertas" : "warnings" },
              { value: result.recommendations.length, label: language === "pt" ? "ações" : "actions" },
            ].map((stat, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-ink-disabled text-[10px]">·</span>}
                <span className="num text-[12px] font-bold text-ink-secondary">{stat.value}</span>
                <span className="text-[11px] text-ink-disabled">{stat.label}</span>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-[11px] text-ink-disabled hover:text-ink-tertiary transition-colors"
          >
            <RotateCcw className="w-3 h-3" strokeWidth={2} />
            {language === "pt" ? "Nova análise" : "New analysis"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  const { t, language } = useLanguage();
  const a = t.analyze;
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<"build" | "preset">("build");
  const resultsRef = useRef<HTMLDivElement>(null);

  const totalWeight = assets.reduce((s, a) => s + a.weight, 0);
  const canAnalyze = assets.length >= 1;

  function handlePresetSelect(preset: PresetPortfolio) {
    const presetAssets: PortfolioAsset[] = preset.assets.map((a) => ({
      ...a,
      id: makeId(),
    }));
    setAssets(presetAssets);
    setSelectedPreset(preset.key);
    setResult(null);
    setActiveTab("build");
  }

  function handleAnalyze() {
    if (!canAnalyze) return;
    setIsAnalyzing(true);
    const normalized = Math.abs(totalWeight - 100) > 0.5 ? normalizeWeights(assets) : assets;

    setTimeout(() => {
      const raw = analyzePortfolio(normalized);
      const final = integrateRoasts(raw, language);
      setResult(final);
      setIsAnalyzing(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 700);
  }

  function handleReset() {
    setAssets([]);
    setResult(null);
    setSelectedPreset(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 space-y-10">

      {/* ── Page header ──────────────────────────────── */}
      <div className="space-y-1.5">
        <h1 className="text-[32px] font-black tracking-[-0.025em] text-ink">{a.title}</h1>
        <p className="text-[14px] text-ink-tertiary">{a.subtitle}</p>
      </div>

      {/* ── Input card ───────────────────────────────── */}
      <div className="rounded-xl border border-bg-border bg-bg-surface overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b border-bg-border">
          {(["build", "preset"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "flex-1 px-6 py-3.5 text-[13px] font-semibold transition-colors duration-150",
                activeTab === tab
                  ? "text-ink border-b-2 border-brand"
                  : "text-ink-disabled hover:text-ink-tertiary"
              )}
            >
              {tab === "build" ? a.tabBuild : a.tabPreset}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === "build" ? (
            <PortfolioBuilder assets={assets} onChange={setAssets} />
          ) : (
            <div className="space-y-5">
              <p className="text-[13px] text-ink-tertiary leading-relaxed">
                {a.presetDescription}
              </p>
              <PresetSelector onSelect={handlePresetSelect} selected={selectedPreset} />
              {selectedPreset && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-success/20 bg-success-subtle text-[13px]">
                  <Check className="w-4 h-4 text-success flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-ink-secondary">
                    {a.presetLoaded}{" "}
                    <button
                      type="button"
                      className="text-brand underline underline-offset-2 hover:no-underline"
                      onClick={() => setActiveTab("build")}
                    >
                      {a.presetLoadedBuild}
                    </button>{" "}
                    {a.presetLoadedEnd}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / Analyze bar */}
        <div className="px-6 pb-5 border-t border-bg-separator">
          <div className="flex items-center justify-between gap-4 pt-4">

            {/* Weight status */}
            <div className="text-[13px] text-ink-tertiary">
              {assets.length === 0 ? (
                a.noAssets
              ) : (
                <span className="flex items-center gap-2">
                  <span className="num font-semibold text-ink-secondary">{assets.length}</span>
                  <span>{a.assetCount(assets.length)}</span>
                  <span className="text-ink-disabled">·</span>
                  <span
                    className={clsx(
                      "num font-semibold",
                      Math.abs(totalWeight - 100) < 0.5 ? "text-success" : "text-warning"
                    )}
                  >
                    {totalWeight.toFixed(1)}%
                  </span>
                  <span>{a.allocated}</span>
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {assets.length > 0 && (
                <Button type="button" variant="ghost" size="sm" onClick={handleReset}>
                  {a.btnReset}
                </Button>
              )}
              <Button
                type="button"
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                size="md"
                className="min-w-36"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {a.btnAnalyzing}
                  </>
                ) : (
                  a.btnAnalyze
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────── */}
      {result && (
        <div ref={resultsRef} className="pt-2 space-y-10 animate-slide-up">

          {/* THE VERDICT — the shareable card */}
          <VerdictCard result={result} onReset={handleReset} />

          {/* Full analysis */}
          <AnalysisResults result={result} assets={assets} />
        </div>
      )}
    </div>
  );
}
