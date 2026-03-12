"use client";

import { Roast } from "@/types";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flame, Zap, AlertTriangle } from "lucide-react";

interface RoastSectionProps {
  roasts: Roast[];
}

const severityConfig = {
  1: {
    Icon: AlertTriangle,
    labelEn: "Mild Observation",
    labelPt: "Observação Suave",
    hex: "#F97316",
    badgeText: "text-brand",
    badgeBg: "rgba(249,115,22,0.10)",
    badgeBorder: "rgba(249,115,22,0.22)",
    barFrom: "rgba(249,115,22,0.5)",
    barTo: "rgba(249,115,22,0)",
    cardBorder: "rgba(249,115,22,0.10)",
    cardBg: "rgba(249,115,22,0.02)",
    quoteMark: "rgba(249,115,22,0.12)",
    glow: "rgba(249,115,22,0.05)",
    textSize: "text-[14px]",
  },
  2: {
    Icon: Zap,
    labelEn: "Spicy Truth",
    labelPt: "Verdade Picante",
    hex: "#FCD34D",
    badgeText: "text-warning",
    badgeBg: "rgba(252,211,77,0.10)",
    badgeBorder: "rgba(252,211,77,0.22)",
    barFrom: "rgba(252,211,77,0.55)",
    barTo: "rgba(252,211,77,0)",
    cardBorder: "rgba(252,211,77,0.10)",
    cardBg: "rgba(252,211,77,0.02)",
    quoteMark: "rgba(252,211,77,0.12)",
    glow: "rgba(252,211,77,0.04)",
    textSize: "text-[15px]",
  },
  3: {
    Icon: Flame,
    labelEn: "No Mercy",
    labelPt: "Sem Misericórdia",
    hex: "#F87171",
    badgeText: "text-danger",
    badgeBg: "rgba(248,113,113,0.10)",
    badgeBorder: "rgba(248,113,113,0.25)",
    barFrom: "rgba(248,113,113,0.65)",
    barTo: "rgba(248,113,113,0)",
    cardBorder: "rgba(248,113,113,0.14)",
    cardBg: "rgba(248,113,113,0.03)",
    quoteMark: "rgba(248,113,113,0.12)",
    glow: "rgba(248,113,113,0.06)",
    textSize: "text-[15px] sm:text-[16px]",
  },
} as const;

export default function RoastSection({ roasts }: RoastSectionProps) {
  const { language } = useLanguage();
  if (!roasts.length) return null;

  const sorted = [...roasts].sort((a, b) => b.severity - a.severity);
  const noMercyCount = sorted.filter(r => r.severity === 3).length;

  return (
    <div className="space-y-4">

      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-7 h-7 flex-shrink-0">
          <span
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: "rgba(248,113,113,0.15)",
              animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <Flame className="w-4 h-4 text-danger relative z-10" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-disabled">
            {language === "pt" ? "Análise Honesta" : "Honest Assessment"}
          </p>
          <p className="text-[12px] text-ink-tertiary mt-0.5">
            {language === "pt"
              ? noMercyCount > 0
                ? `${sorted.length} observações — ${noMercyCount} sem misericórdia`
                : `${sorted.length} observações geradas`
              : noMercyCount > 0
              ? `${sorted.length} observations — ${noMercyCount} without mercy`
              : `${sorted.length} observations generated`
            }
          </p>
        </div>
      </div>

      {/* Roast cards */}
      <div className="space-y-3">
        {sorted.map((roast, i) => {
          const cfg = severityConfig[roast.severity];
          const { Icon } = cfg;

          return (
            <div
              key={roast.id}
              className="relative rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${cfg.cardBorder}`,
                background: cfg.cardBg,
                boxShadow: `0 0 40px ${cfg.glow}`,
              }}
            >
              {/* Left gradient bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{
                  background: `linear-gradient(180deg, ${cfg.barFrom}, ${cfg.barTo})`,
                }}
              />

              {/* Huge decorative quote mark */}
              <div
                className="absolute right-3 top-0 font-serif select-none pointer-events-none leading-none"
                style={{ fontSize: "8rem", color: cfg.quoteMark }}
                aria-hidden
              >
                &ldquo;
              </div>

              {/* Card index */}
              <div
                className="absolute top-3.5 right-5 num text-[10px] font-bold tabular-nums"
                style={{ color: cfg.hex, opacity: 0.3 }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="pl-6 pr-10 pt-5 pb-5">

                {/* Badge row */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      color: cfg.hex,
                      background: cfg.badgeBg,
                      borderColor: cfg.badgeBorder,
                    }}
                  >
                    <Icon className="w-3 h-3" strokeWidth={2.5} />
                    {language === "pt" ? cfg.labelPt : cfg.labelEn}
                  </div>
                  <span className="text-[10px] text-ink-disabled">·</span>
                  <span className="text-[10px] text-ink-disabled uppercase tracking-wider font-medium">
                    {roast.category}
                  </span>
                </div>

                {/* Roast text — this is the star */}
                <p
                  className={clsx(
                    "leading-[1.7] text-ink font-medium relative z-10 max-w-[640px]",
                    cfg.textSize
                  )}
                >
                  {roast.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-[10px] text-ink-disabled text-center pt-1 italic opacity-60">
        {language === "pt"
          ? "Gerado por algoritmo. Não é aconselhamento financeiro. É honestidade não solicitada."
          : "Algorithmically generated. Not financial advice. Unsolicited honesty."
        }
      </p>
    </div>
  );
}
