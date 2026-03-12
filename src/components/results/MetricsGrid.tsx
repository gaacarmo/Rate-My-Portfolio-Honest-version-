"use client";

import { PortfolioMetrics } from "@/types";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

interface MetricsGridProps {
  metrics: PortfolioMetrics;
}

type Status = "good" | "warn" | "bad" | "neutral";

const statusConfig: Record<Status, { value: string; dot: string; bg: string; border: string }> = {
  good:    { value: "text-success",     dot: "bg-success",  bg: "rgba(74,222,128,0.04)",   border: "rgba(74,222,128,0.10)" },
  warn:    { value: "text-warning",     dot: "bg-warning",  bg: "rgba(252,211,77,0.04)",   border: "rgba(252,211,77,0.10)" },
  bad:     { value: "text-danger",      dot: "bg-danger",   bg: "rgba(248,113,113,0.04)",  border: "rgba(248,113,113,0.10)" },
  neutral: { value: "text-ink",         dot: "bg-ink/20",   bg: "transparent",             border: "rgba(255,255,255,0.07)" },
};

function Tile({
  label,
  value,
  sub,
  status = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  status?: Status;
}) {
  const s = statusConfig[status];

  return (
    <div
      className="relative px-4 py-4 rounded-xl border space-y-1.5 overflow-hidden"
      style={{ background: s.bg, borderColor: s.border }}
    >
      {/* Status dot */}
      <div className="flex items-center justify-between mb-1">
        <p className="label flex-1 min-w-0 truncate">{label}</p>
        {status !== "neutral" && (
          <span className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0 ml-2", s.dot)} />
        )}
      </div>

      <div className={clsx("num text-[22px] font-black leading-none tabular-nums", s.value)}>
        {value}
      </div>

      {sub && (
        <p className="text-[10px] text-ink-disabled leading-tight">{sub}</p>
      )}
    </div>
  );
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  const { t } = useLanguage();
  const m = t.metrics;

  const cColor: Status = metrics.cryptoExposure > 40 ? "bad" : metrics.cryptoExposure > 20 ? "warn" : "good";
  const tColor: Status = metrics.techExposure > 65 ? "bad"  : metrics.techExposure > 45  ? "warn" : "good";
  const hColor: Status = metrics.hhi > 0.4           ? "bad" : metrics.hhi > 0.2          ? "warn" : "good";
  const rColor: Status = metrics.weightedRiskScore > 75 ? "bad" : metrics.weightedRiskScore > 55 ? "warn" : "good";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <Tile label={m.positions}      value={String(metrics.assetCount)}                 sub={m.positionsSub(metrics.effectiveN)}  status={metrics.assetCount < 4 ? "warn" : "neutral"} />
      <Tile label={m.assetClasses}   value={String(metrics.assetClassCount)}            sub={m.assetClassesSub}                   status={metrics.assetClassCount < 2 ? "warn" : "good"} />
      <Tile label={m.geographies}    value={String(metrics.geographyCount)}             sub={m.geographiesSub}                    status={metrics.geographyCount < 2 ? "warn" : "good"} />
      <Tile label={m.hhiIndex}       value={metrics.hhi.toFixed(3)}                     sub={m.hhiIndexSub}                       status={hColor} />
      <Tile label={m.maxPosition}    value={`${metrics.maxPositionWeight.toFixed(1)}%`} sub={m.maxPositionSub}                    status={metrics.maxPositionWeight > 50 ? "bad" : metrics.maxPositionWeight > 30 ? "warn" : "good"} />
      <Tile label={m.riskScore}      value={metrics.weightedRiskScore.toFixed(0)}       sub={m.riskScoreSub}                      status={rColor} />
      <Tile label={m.cryptoExposure} value={`${metrics.cryptoExposure.toFixed(1)}%`}   sub={m.cryptoExposureSub}                 status={cColor} />
      <Tile label={m.techExposure}   value={`${metrics.techExposure.toFixed(1)}%`}     sub={m.techExposureSub}                   status={tColor} />
      <Tile label={m.bondFI}         value={`${metrics.bondExposure.toFixed(1)}%`}     sub={m.bondFISub}                         status={metrics.bondExposure === 0 && metrics.weightedRiskScore > 60 ? "warn" : "neutral"} />
      <Tile label={m.stockETF}       value={`${metrics.stockExposure.toFixed(1)}%`}    sub={m.stockETFSub}                       status="neutral" />
    </div>
  );
}
