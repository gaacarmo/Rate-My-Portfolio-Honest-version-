"use client";

import { Recommendation } from "@/types";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

const priorityConfig = {
  high:   { dot: "bg-danger",    label: "text-danger",   bar: "bg-gradient-to-b from-danger/60 via-danger/20 to-danger/0",    bg: "rgba(248,113,113,0.03)",  border: "rgba(248,113,113,0.12)" },
  medium: { dot: "bg-warning",   label: "text-warning",  bar: "bg-gradient-to-b from-warning/60 via-warning/20 to-warning/0", bg: "rgba(252,211,77,0.03)",   border: "rgba(252,211,77,0.12)" },
  low:    { dot: "bg-blue-data", label: "text-blue-data",bar: "bg-gradient-to-b from-blue-data/60 via-blue-data/20 to-blue-data/0", bg: "rgba(96,165,250,0.03)", border: "rgba(96,165,250,0.10)" },
};

export default function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  const { t } = useLanguage();
  const tr = t.recommendations;

  if (!recommendations.length) {
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-success/20 bg-success-subtle">
        <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
        <div>
          <div className="text-[13px] font-semibold text-ink-secondary">{tr.emptyTitle}</div>
          <div className="text-[12px] text-ink-tertiary">{tr.emptySubtitle}</div>
        </div>
      </div>
    );
  }

  const sorted = [...recommendations].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-3">
      {sorted.map((rec, i) => {
        const s = priorityConfig[rec.priority];
        return (
          <div
            key={rec.id}
            className="relative rounded-xl border overflow-hidden"
            style={{ background: s.bg, borderColor: s.border }}
          >
            {/* Left gradient bar */}
            <div className={clsx("absolute left-0 top-0 bottom-0 w-[3px]", s.bar)} />

            <div className="pl-5 pr-5 pt-4 pb-0 flex items-start gap-4">
              {/* Number */}
              <div className="flex-shrink-0 flex items-center gap-2 mt-0.5">
                <span className={clsx("w-1.5 h-1.5 rounded-full block flex-shrink-0", s.dot)} />
                <span className="num text-[11px] text-ink-disabled tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex-1 space-y-1.5 pb-4">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className={clsx("text-[10px] font-bold uppercase tracking-widest", s.label)}>
                    {tr.priority(rec.priority)}
                  </span>
                  <span className="text-[14px] font-semibold text-ink">{rec.title}</span>
                </div>
                <p className="text-[12px] text-ink-tertiary leading-relaxed">{rec.description}</p>
              </div>
            </div>

            {/* Action block */}
            <div className="ml-5 mr-5 mb-4 px-4 py-3 rounded-lg bg-bg-raised border border-bg-border">
              <div className="flex items-center gap-2 mb-1.5">
                <ArrowRight className="w-3 h-3 text-brand flex-shrink-0" strokeWidth={2.5} />
                <p className="label">{tr.whatToDo}</p>
              </div>
              <p className="text-[12px] text-ink-secondary leading-relaxed">{rec.actionable}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
