"use client";

import { Warning, WarningLevel } from "@/types";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

interface WarningsPanelProps {
  warnings: Warning[];
}

const levelConfig: Record<WarningLevel, {
  Icon: typeof AlertTriangle;
  iconColor: string;
  badgeClass: string;
  barColor: string;
  bg: string;
  border: string;
  labelColor: string;
}> = {
  danger: {
    Icon: ShieldAlert,
    iconColor: "text-danger",
    badgeClass: "bg-danger/10 text-danger border border-danger/20",
    barColor: "bg-gradient-to-b from-danger/60 via-danger/30 to-danger/0",
    bg: "rgba(248,113,113,0.03)",
    border: "rgba(248,113,113,0.12)",
    labelColor: "text-danger",
  },
  warning: {
    Icon: AlertTriangle,
    iconColor: "text-warning",
    badgeClass: "bg-warning/10 text-warning border border-warning/20",
    barColor: "bg-gradient-to-b from-warning/60 via-warning/30 to-warning/0",
    bg: "rgba(252,211,77,0.03)",
    border: "rgba(252,211,77,0.12)",
    labelColor: "text-warning",
  },
  info: {
    Icon: Info,
    iconColor: "text-blue-data",
    badgeClass: "bg-blue-muted text-blue-data border border-blue-data/20",
    barColor: "bg-gradient-to-b from-blue-data/60 via-blue-data/30 to-blue-data/0",
    bg: "rgba(96,165,250,0.03)",
    border: "rgba(96,165,250,0.12)",
    labelColor: "text-blue-data",
  },
};

export default function WarningsPanel({ warnings }: WarningsPanelProps) {
  const { t } = useLanguage();

  if (!warnings.length) {
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-success/20 bg-success-subtle">
        <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
        <span className="text-[13px] text-ink-secondary">{t.recommendations.emptyTitle}</span>
      </div>
    );
  }

  const sorted = [...warnings].sort((a, b) => {
    const order: Record<WarningLevel, number> = { danger: 0, warning: 1, info: 2 };
    return order[a.level] - order[b.level];
  });

  return (
    <div className="space-y-2.5">
      {sorted.map((w) => {
        const s = levelConfig[w.level];
        const levelLabel = t.warnings[w.level];
        const { Icon } = s;
        return (
          <div
            key={w.id}
            className="relative rounded-xl border overflow-hidden"
            style={{ background: s.bg, borderColor: s.border }}
          >
            {/* Left gradient bar */}
            <div className={clsx("absolute left-0 top-0 bottom-0 w-[3px]", s.barColor)} />

            <div className="pl-5 pr-5 pt-4 pb-4 flex gap-4 items-start">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={clsx("w-4 h-4", s.iconColor)} strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className={clsx("text-[10px] font-bold uppercase tracking-widest", s.labelColor)}>
                    {levelLabel}
                  </span>
                  <span className="text-[13px] font-semibold text-ink">{w.title}</span>
                  {w.metric && (
                    <span className="num text-[10px] text-ink-disabled bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                      {w.metric}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-ink-tertiary leading-relaxed">{w.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
