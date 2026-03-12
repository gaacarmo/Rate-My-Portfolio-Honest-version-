"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PortfolioMetrics, PortfolioAsset } from "@/types";
import { normalizeWeights } from "@/lib/analysis/engine";
import { useLanguage } from "@/contexts/LanguageContext";

const PALETTE = [
  "#F97316", "#60A5FA", "#4ADE80", "#FCD34D", "#A78BFA",
  "#F472B6", "#34D399", "#FB923C", "#818CF8", "#22D3EE",
  "#E879F9", "#A3E635", "#38BDF8", "#FBBF24", "#6EE7B7",
];

type View = "asset" | "class" | "geography";

interface AllocationChartProps {
  assets: PortfolioAsset[];
  metrics: PortfolioMetrics;
}

export default function AllocationChart({ assets, metrics }: AllocationChartProps) {
  const [view, setView] = useState<View>("class");
  const { t } = useLanguage();
  const ch = t.chart;

  const normalized = normalizeWeights(assets);

  const data =
    view === "asset"
      ? normalized.map((a) => ({ name: a.ticker, value: +a.weight.toFixed(1) }))
      : view === "class"
      ? Object.entries(metrics.byAssetClass).map(([k, v]) => ({
          name: ch.classLabels[k] || k, value: +v.toFixed(1),
        }))
      : Object.entries(metrics.byGeography).map(([k, v]) => ({
          name: ch.geoLabels[k] || k, value: +v.toFixed(1),
        }));

  data.sort((a, b) => b.value - a.value);

  const viewLabels: Record<View, string> = {
    class: ch.byClass, asset: ch.byAsset, geography: ch.byRegion,
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-bg-raised border border-bg-border rounded-lg px-3 py-2 shadow-xl">
        <div className="text-[12px] text-ink-secondary">{payload[0].name}</div>
        <div className="num text-[18px] font-bold text-ink">{payload[0].value.toFixed(1)}%</div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Toggle */}
      <div className="flex gap-0.5 p-0.5 bg-bg-raised rounded-lg w-fit border border-bg-border">
        {(["class", "asset", "geography"] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all duration-150 ${
              view === v
                ? "bg-bg-overlay text-ink shadow-sm"
                : "text-ink-disabled hover:text-ink-tertiary"
            }`}
          >
            {viewLabels[v]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Donut */}
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={88}
                paddingAngle={1.5}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.slice(0, 8).map((item, i) => (
            <div key={item.name} className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
              />
              <span className="text-[12px] text-ink-secondary flex-1 min-w-0 truncate">{item.name}</span>
              <span className="num text-[12px] font-semibold text-ink tabular-nums">{item.value.toFixed(1)}%</span>
              <div className="w-14 h-[3px] bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: PALETTE[i % PALETTE.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
