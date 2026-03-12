"use client";

import { PRESET_PORTFOLIOS } from "@/data/presets";
import { PresetPortfolio } from "@/types";
import { clsx } from "clsx";
import { ICON_MAP } from "@/lib/iconMap";
import { CircleHelp } from "lucide-react";

interface PresetSelectorProps {
  onSelect: (preset: PresetPortfolio) => void;
  selected?: string;
}

export default function PresetSelector({ onSelect, selected }: PresetSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {PRESET_PORTFOLIOS.map((preset) => {
        const Icon = ICON_MAP[preset.icon] ?? CircleHelp;
        return (
        <button
          key={preset.key}
          type="button"
          onClick={() => onSelect(preset)}
          className={clsx(
            "text-left p-4 rounded-xl border transition-all duration-150",
            selected === preset.key
              ? "border-brand/40 bg-brand-subtle"
              : "border-bg-border bg-bg-raised hover:border-white/12 hover:bg-bg-overlay"
          )}
        >
          <div className="mb-2.5"><Icon className="w-5 h-5 text-brand" strokeWidth={1.5} /></div>
          <div className="text-[13px] font-semibold text-ink mb-1 leading-tight">{preset.name}</div>
          <div className="text-[11px] text-ink-disabled leading-snug">{preset.tagline}</div>
        </button>
        );
      })}
    </div>
  );
}
