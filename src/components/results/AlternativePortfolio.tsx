"use client";

import { Portfolio } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

const CLASS_COLORS: Record<string, string> = {
  stock: "#60A5FA",
  etf: "#F97316",
  crypto: "#FCD34D",
  bond: "#4ADE80",
  reit: "#FB923C",
  cash: "#737373",
  commodity: "#FCD34D",
  fixed_income: "#4ADE80",
};

interface AlternativePortfolioProps {
  alternative: Portfolio;
}

export default function AlternativePortfolio({ alternative }: AlternativePortfolioProps) {
  const { t } = useLanguage();
  const alt = t.alternative;

  return (
    <div className="rounded-xl border border-bg-border bg-bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-bg-border">
        <div>
          <p className="label mb-1">{alt.comparableLabel}</p>
          <h3 className="text-[16px] font-bold text-ink tracking-tight">{alternative.name}</h3>
          <p className="text-[12px] text-ink-tertiary mt-1">{alternative.description}</p>
        </div>
        <span className="flex-shrink-0 text-[11px] font-semibold text-success bg-success-subtle border border-success/20 px-2.5 py-1 rounded-full">
          {alt.lowerComplexity}
        </span>
      </div>

      {/* Assets */}
      <div className="px-4 py-3 space-y-1">
        {alternative.assets.map((asset) => (
          <div
            key={asset.id}
            className="flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-bg-raised transition-colors"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: CLASS_COLORS[asset.assetClass] || "#737373" }}
            />
            <div className="flex-1 min-w-0">
              <span className="num text-[13px] font-semibold text-ink">{asset.ticker}</span>
              <span className="text-[12px] text-ink-tertiary ml-2">{asset.name}</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-20 h-[3px] bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${asset.weight}%`,
                    backgroundColor: CLASS_COLORS[asset.assetClass] || "#737373",
                  }}
                />
              </div>
              <span className="num text-[13px] font-bold text-ink w-10 text-right tabular-nums">
                {asset.weight}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-4 border-t border-bg-border">
        <p className="text-[11px] text-ink-disabled leading-relaxed">{alt.disclaimerText}</p>
      </div>
    </div>
  );
}
