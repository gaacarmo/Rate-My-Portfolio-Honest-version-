"use client";

import { useState, useRef, useEffect } from "react";
import { PortfolioAsset, AssetDefinition } from "@/types";
import { searchAssets } from "@/data/assets";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import { FolderOpen } from "lucide-react";

interface PortfolioBuilderProps {
  assets: PortfolioAsset[];
  onChange: (assets: PortfolioAsset[]) => void;
}

const CLASS_ABBR: Record<string, string> = {
  stock: "STK", etf: "ETF", crypto: "CRY", bond: "BND",
  reit: "REI", cash: "CSH", commodity: "COM", fixed_income: "FI",
};

const CLASS_COLOR: Record<string, string> = {
  stock: "text-blue-data", etf: "text-brand", crypto: "text-warning",
  bond: "text-success", reit: "text-orange-400", cash: "text-ink-tertiary",
  commodity: "text-yellow-400", fixed_income: "text-emerald-400",
};

let counter = 0;
function genId() {
  return `a-${Date.now()}-${++counter}`;
}

function WeightInput({
  value,
  onCommit,
  className,
}: {
  value: number;
  onCommit: (n: number) => void;
  className?: string;
}) {
  const [raw, setRaw] = useState(String(value));

  // Sync display when value changes from outside (e.g. auto-normalize)
  useEffect(() => {
    setRaw(String(value));
  }, [value]);

  return (
    <input
      type="number"
      min="0"
      max="100"
      step="0.1"
      value={raw}
      onChange={(e) => setRaw(e.target.value)}
      onBlur={() => {
        const n = parseFloat(raw);
        if (isNaN(n) || raw.trim() === "") {
          setRaw(String(value)); // revert to last valid on empty/invalid
        } else {
          onCommit(n);
        }
      }}
      className={className}
    />
  );
}

export default function PortfolioBuilder({ assets, onChange }: PortfolioBuilderProps) {
  const { t } = useLanguage();
  const b = t.builder;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AssetDefinition[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const total = assets.reduce((s, a) => s + a.weight, 0);
  const isOver = total > 100.5;
  const isUnder = total < 99.5 && assets.length > 0;

  useEffect(() => {
    const existing = new Set(assets.map((a) => a.ticker));
    setResults(searchAssets(query).filter((r) => !existing.has(r.ticker)));
  }, [query, assets]);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        inputRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function addAsset(def: AssetDefinition) {
    const rem = Math.max(0, 100 - total);
    const w = Math.min(rem > 0 ? rem : 10, 10);
    onChange([
      ...assets,
      {
        id: genId(), ticker: def.ticker, name: def.name,
        weight: +w.toFixed(1),
        assetClass: def.assetClass, sector: def.sector,
        geography: def.geography, riskLevel: def.riskLevel,
      },
    ]);
    setQuery("");
    setOpen(false);
  }

  function remove(id: string) {
    onChange(assets.filter((a) => a.id !== id));
  }

  function updateWeight(id: string, n: number) {
    onChange(assets.map((a) => a.id === id ? { ...a, weight: Math.max(0, Math.min(100, n)) } : a));
  }

  function normalize() {
    if (total === 0) return;
    onChange(assets.map((a) => ({ ...a, weight: +((a.weight / total) * 100).toFixed(1) })));
  }

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={b.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2.5 bg-bg-raised border border-bg-border rounded-lg text-[13px] text-ink placeholder:text-ink-disabled focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all"
          />
        </div>

        {open && results.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-bg-raised border border-bg-border rounded-xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto"
          >
            {results.map((asset) => (
              <button
                key={asset.ticker}
                type="button"
                onClick={() => addAsset(asset)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-overlay transition-colors text-left border-b border-bg-separator last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="num font-semibold text-[13px] text-ink">{asset.ticker}</span>
                    <span className={clsx("text-[10px] font-bold", CLASS_COLOR[asset.assetClass])}>
                      {CLASS_ABBR[asset.assetClass] || asset.assetClass.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-tertiary truncate">{asset.name}</div>
                </div>
                <svg className="w-3.5 h-3.5 text-ink-disabled flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Asset rows */}
      {assets.length > 0 && (
        <div className="space-y-2">
          {/* Column labels */}
          <div className="grid grid-cols-[1fr_80px_36px] sm:grid-cols-[1fr_96px_36px] gap-2 sm:gap-3 px-3 py-1">
            <span className="label">{b.asset}</span>
            <span className="label text-right">{b.weightPct}</span>
            <span />
          </div>

          {assets.map((asset) => (
            <div
              key={asset.id}
              className="grid grid-cols-[1fr_80px_36px] sm:grid-cols-[1fr_96px_36px] gap-2 sm:gap-3 items-center px-3 py-2.5 rounded-lg border border-bg-border bg-bg-raised hover:border-white/10 transition-colors"
            >
              {/* Asset info */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className={clsx("num text-[9px] font-bold w-7 sm:w-8 text-center flex-shrink-0", CLASS_COLOR[asset.assetClass])}>
                  {CLASS_ABBR[asset.assetClass] || "???"}
                </div>
                <div className="min-w-0">
                  <div className="num text-[13px] font-semibold text-ink truncate">{asset.ticker}</div>
                  <div className="text-[11px] text-ink-disabled truncate">{asset.name}</div>
                </div>
              </div>

              {/* Weight */}
              <WeightInput
                value={asset.weight}
                onCommit={(n) => updateWeight(asset.id, n)}
                className="num w-full text-right bg-bg-surface border border-bg-border rounded-lg px-2 sm:px-2.5 py-1.5 text-[13px] font-semibold text-ink focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all"
              />

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(asset.id)}
                className="w-9 h-9 rounded-md flex items-center justify-center text-ink-disabled hover:text-danger hover:bg-danger-muted transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          {/* Weight total */}
          <div
            className={clsx(
              "flex items-center justify-between px-3 py-2.5 rounded-lg border text-[12px]",
              isOver  ? "border-danger/20 bg-danger-subtle text-danger"
                      : isUnder ? "border-warning/20 bg-warning-subtle text-warning"
                      : "border-success/20 bg-success-subtle text-success"
            )}
          >
            <span className="font-medium">
              {isOver ? b.overAllocated : isUnder ? b.underAllocated : b.allocationGood}
            </span>
            <div className="flex items-center gap-3">
              <span className="num font-semibold">{total.toFixed(1)}% / 100%</span>
              {(isOver || isUnder) && (
                <button type="button" onClick={normalize} className="text-[11px] underline underline-offset-2 opacity-70 hover:opacity-100 font-sans">
                  {b.autoNormalize}
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange([])}>
              {b.clearAll}
            </Button>
          </div>
        </div>
      )}

      {assets.length === 0 && (
        <div className="text-center py-14 space-y-2">
          <div className="flex justify-center"><FolderOpen className="w-8 h-8 text-ink-disabled" strokeWidth={1.5} /></div>
          <p className="text-[13px] text-ink-disabled">{b.emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
