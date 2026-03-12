"use client";

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from "recharts";
import { AnalysisResult } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface MetricsChartProps {
  result: AnalysisResult;
}

export default function MetricsChart({ result }: MetricsChartProps) {
  const { t } = useLanguage();
  const mc = t.metricsChart;

  const data = [
    { metric: mc.diversification, score: result.diversificationScore },
    { metric: mc.concentration,   score: result.concentrationScore },
    { metric: mc.riskMgmt,        score: result.riskScore },
    { metric: mc.coherence,       score: result.coherenceScore },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-bg-raised border border-bg-border rounded-lg px-3 py-2 shadow-xl">
        <div className="text-[11px] text-ink-tertiary">{payload[0].payload.metric}</div>
        <div className="num text-[18px] font-bold text-brand">{payload[0].value} / 100</div>
      </div>
    );
  };

  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 4, right: 24, bottom: 4, left: 24 }}>
          <PolarGrid stroke="rgba(255,255,255,0.05)" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "#737373", fontSize: 11, fontFamily: "inherit" }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#F97316"
            fill="#F97316"
            fillOpacity={0.12}
            strokeWidth={1.5}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
