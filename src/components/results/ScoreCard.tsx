"use client";

import { AnalysisResult } from "@/types";
import { clsx } from "clsx";
import Progress, { getScoreColor } from "@/components/ui/Progress";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScoreCardProps {
  result: AnalysisResult;
}

const gradeConfig: Record<string, {
  color: string;
  glow: string;
  trackFill: string;
  bg: string;
}> = {
  S: { color: "#4ADE80", glow: "rgba(74,222,128,0.25)", trackFill: "#4ADE80", bg: "rgba(74,222,128,0.06)" },
  A: { color: "#4ADE80", glow: "rgba(74,222,128,0.2)",  trackFill: "#4ADE80", bg: "rgba(74,222,128,0.05)" },
  B: { color: "#F97316", glow: "rgba(249,115,22,0.22)", trackFill: "#F97316", bg: "rgba(249,115,22,0.05)" },
  C: { color: "#FCD34D", glow: "rgba(252,211,77,0.22)", trackFill: "#FCD34D", bg: "rgba(252,211,77,0.05)" },
  D: { color: "#FB923C", glow: "rgba(251,146,60,0.22)", trackFill: "#FB923C", bg: "rgba(251,146,60,0.05)" },
  F: { color: "#F87171", glow: "rgba(248,113,113,0.22)",trackFill: "#F87171", bg: "rgba(248,113,113,0.05)" },
};

function ScoreGauge({ score, grade }: { score: number; grade: string }) {
  const cfg = gradeConfig[grade] ?? gradeConfig["F"];
  const R = 72;
  const circ = Math.PI * R;
  const filled = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Arc gauge */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 200, height: 112 }}
      >
        {/* Glow ring */}
        <div
          className="absolute rounded-full opacity-30"
          style={{
            width: 160,
            height: 160,
            top: -24,
            background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
          }}
        />
        <svg width="200" height="112" viewBox="0 0 200 112" fill="none">
          {/* Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          {/* Shadow fill for depth */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Fill */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            stroke={cfg.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circ}`}
            fill="none"
            style={{
              filter: `drop-shadow(0 0 6px ${cfg.glow})`,
              transition: "stroke-dasharray 1.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute bottom-1 text-center">
          <div
            className="num font-black leading-none"
            style={{
              fontSize: "3.5rem",
              color: cfg.color,
              textShadow: `0 0 20px ${cfg.glow}`,
              letterSpacing: "-0.02em",
            }}
          >
            {grade}
          </div>
          <div className="num text-[11px] text-ink-tertiary mt-1 tabular-nums">
            {score}<span className="text-ink-disabled">/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DimRow({
  label,
  score,
  description,
}: {
  label: string;
  score: number;
  description: string;
}) {
  const color = getScoreColor(score);
  const textColor =
    color === "success" ? "text-success"
    : color === "brand"   ? "text-brand"
    : color === "warning" ? "text-warning"
    : "text-danger";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-secondary">{label}</span>
        <span className={clsx("num text-[13px] font-bold tabular-nums", textColor)}>{score}</span>
      </div>
      <Progress value={score} color={color} size="xs" />
      <p className="text-[11px] text-ink-disabled leading-relaxed">{description}</p>
    </div>
  );
}

export default function ScoreCard({ result }: ScoreCardProps) {
  const { t } = useLanguage();
  const sc = t.scoreCard;
  const { score, grade, diversificationScore, concentrationScore, riskScore, coherenceScore } = result;
  const cfg = gradeConfig[grade] ?? gradeConfig["F"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">

      {/* Left: Grade + label */}
      <div
        className="flex flex-col items-center gap-4 md:border-r md:border-bg-border md:pb-2"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <ScoreGauge score={score} grade={grade} />

        {/* Grade label */}
        <div
          className="w-full text-center px-4 py-2.5 rounded-lg border"
          style={{ background: cfg.bg, borderColor: `${cfg.color}22` }}
        >
          <div className="text-[13px] font-bold" style={{ color: cfg.color }}>
            {sc.gradeLabels[grade]}
          </div>
          <p className="text-[11px] text-ink-disabled mt-0.5 leading-relaxed">
            {sc.scoreDescription}
          </p>
        </div>
      </div>

      {/* Right: Dimension bars */}
      <div className="space-y-6 pt-1">
        <DimRow label={sc.diversification} score={diversificationScore} description={sc.diversificationDesc} />
        <DimRow label={sc.concentration}   score={concentrationScore}   description={sc.concentrationDesc} />
        <DimRow label={sc.risk}            score={riskScore}            description={sc.riskDesc} />
        <DimRow label={sc.coherence}       score={coherenceScore}       description={sc.coherenceDesc} />
      </div>
    </div>
  );
}
