"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ICON_MAP } from "@/lib/iconMap";
import { CircleHelp } from "lucide-react";

/* ── Hooks ─────────────────────────────────────────────── */

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, duration = 1200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return count;
}

/* ── FadeIn wrapper ────────────────────────────────────── */

function FadeIn({
  children, delay = 0, className = "",
}: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Hero product preview card ─────────────────────────── */

function HeroPreview() {
  const [active, setActive] = useState(false);
  const score = useCountUp(74, 1600, active);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 700);
    return () => clearTimeout(t);
  }, []);

  const p = active ? score / 74 : 0;
  const grade = score >= 80 ? "A" : score >= 70 ? "B" : "C";
  const gradeColor = grade === "A" ? "#4ADE80" : grade === "B" ? "#F97316" : "#FCD34D";

  // 270° arc gauge math
  const R = 30;
  const circ = 2 * Math.PI * R;
  const arc270 = circ * 0.75;
  const arcFill = (score / 100) * arc270;

  const dims = [
    { label: "Diversification", value: 68, color: "#F97316" },
    { label: "Concentration",   value: 55, color: "#FCD34D" },
    { label: "Risk Mgmt",       value: 82, color: "#4ADE80" },
    { label: "Coherence",       value: 75, color: "#F97316" },
  ];

  return (
    <div className="relative animate-float">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-56px",
          background: "radial-gradient(ellipse at 50% 40%, rgba(249,115,22,0.12) 0%, transparent 60%)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden card-glass"
        style={{ width: 336 }}
      >
        {/* macOS window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-bg-raised border-b border-bg-border">
          <span className="w-2.5 h-2.5 rounded-full bg-danger/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-success/50" />
          <div className="flex-1 mx-3 h-[18px] bg-bg-overlay border border-bg-border rounded flex items-center px-2.5 gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success/60 flex-shrink-0" />
            <span className="text-[9px] text-ink-disabled tracking-wide">ratemy.portfolio/analyze</span>
          </div>
        </div>

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="label">Portfolio Analysis</p>
              <p className="text-[11px] text-ink-disabled mt-0.5">Tech Bro · 6 positions</p>
            </div>
            <span className="text-[9px] font-bold tracking-widest text-brand bg-brand-subtle border border-brand/20 px-2 py-0.5 rounded-full uppercase">
              Live
            </span>
          </div>

          {/* Score row */}
          <div className="flex items-center gap-4 mb-5">
            {/* 270° gauge */}
            <div className="relative w-[68px] h-[68px] flex-shrink-0">
              <svg viewBox="0 0 72 72" className="absolute inset-0 w-full h-full">
                <circle cx="36" cy="36" r={R} fill="none"
                  stroke="rgba(255,255,255,0.06)" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={`${arc270} ${circ}`}
                  strokeDashoffset={circ * 0.625}
                  transform="rotate(135 36 36)"
                />
                <circle cx="36" cy="36" r={R} fill="none"
                  stroke={gradeColor} strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={`${arcFill} ${circ}`}
                  strokeDashoffset={circ * 0.625}
                  transform="rotate(135 36 36)"
                  style={{ transition: "stroke-dasharray 0.06s linear, stroke 0.5s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="num text-[20px] font-black" style={{ color: gradeColor }}>{grade}</span>
              </div>
            </div>

            <div>
              <div className="text-[9px] text-ink-disabled mb-1 uppercase tracking-widest font-semibold">Overall Score</div>
              <div className="flex items-baseline gap-1">
                <span className="num text-[42px] font-black text-ink leading-none">{score}</span>
                <span className="text-[12px] text-ink-disabled">/100</span>
              </div>
            </div>
          </div>

          {/* Dimension bars */}
          <div className="space-y-2.5 mb-4">
            {dims.map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-ink-tertiary">{d.label}</span>
                  <span className="num text-[10px] text-ink-secondary font-semibold">
                    {Math.round(d.value * p)}
                  </span>
                </div>
                <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${d.value * p}%`,
                      backgroundColor: d.color,
                      transition: "width 0.06s linear",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div
            className="px-3 py-2 rounded-lg bg-warning-subtle border border-warning/15 flex items-center gap-2 mb-4"
            style={{ opacity: p > 0.5 ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <span className="w-1 h-1 rounded-full bg-warning flex-shrink-0" />
            <span className="text-[10px] text-warning">Tech sector overweight: 78%</span>
          </div>

          {/* Personality */}
          <div
            className="pt-3.5 border-t border-bg-border flex items-center gap-3"
            style={{ opacity: p > 0.75 ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <span className="text-[20px] leading-none flex-shrink-0">💻</span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-ink truncate">The Tech True Believer</div>
              <div className="text-[9px] text-ink-disabled mt-0.5 truncate">Disrupting the concept of diversification.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Marquee ───────────────────────────────────────────── */

function Marquee() {
  const items = [
    "The Crypto Evangelist", "The FOMO Surfer", "The Tech True Believer",
    "The Overcautious Hibernator", "The Dividend Collector",
    "The Surprisingly Responsible Adult", "The Index Fundamentalist",
    "The Chaos Agent", "The Confused Optimist",
  ];
  const all = [...items, ...items];
  return (
    <div className="relative border-y border-bg-border overflow-hidden py-3"
      style={{ background: "rgba(17,17,17,0.7)" }}>
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />
      <div className="flex animate-marquee whitespace-nowrap">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-[11px] text-ink-disabled font-medium tracking-wide">
            <span className="w-1 h-1 rounded-full bg-brand/50 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stat tile ─────────────────────────────────────────── */

function StatTile({ prefix = "", value, suffix = "", label, active, className = "" }: {
  prefix?: string; value: number; suffix?: string; label: string; active: boolean; className?: string;
}) {
  const count = useCountUp(value, 1100, active);
  return (
    <div className={`text-center sm:text-left ${className}`}>
      <div className="num text-[38px] sm:text-[44px] font-black leading-none tracking-tight">
        <span className="text-ink-tertiary text-[0.6em] align-middle">{prefix}</span>
        <span className="text-gradient">{count}</span>
        <span className="text-ink-tertiary text-[0.45em] align-middle ml-0.5">{suffix}</span>
      </div>
      <div className="text-[12px] text-ink-disabled mt-2 leading-tight">{label}</div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function LandingPage() {
  const { t } = useLanguage();
  const { landing: l } = t;
  const scrollY = useScrollY();

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative overflow-x-hidden">

      {/* ── Fixed parallax background ────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute top-0 left-1/2 w-[800px] h-[700px] rounded-full"
          style={{
            transform: `translate(-50%, calc(-35% + ${scrollY * 0.18}px))`,
            background: "radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 65%)",
            willChange: "transform",
          }} />
        <div className="absolute top-[15vh] right-0 w-[480px] h-[480px] rounded-full"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            background: "radial-gradient(circle, rgba(249,115,22,0.035) 0%, transparent 65%)",
            willChange: "transform",
          }} />
        <div className="absolute top-[55vh] left-0 w-[320px] h-[320px] rounded-full"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            background: "radial-gradient(circle, rgba(249,115,22,0.025) 0%, transparent 65%)",
            willChange: "transform",
          }} />
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.033) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            transform: `translateY(${scrollY * 0.03}px)`,
            willChange: "transform",
          }} />
      </div>

      {/* ── Floating geometry ────────────────────────── */}
      <div className="pointer-events-none absolute top-[140px] right-[7%] w-px h-24 bg-gradient-to-b from-transparent via-brand/20 to-transparent"
        style={{ transform: `translateY(${scrollY * 0.3}px)`, willChange: "transform" }} />
      <div className="pointer-events-none absolute top-[190px] right-[11%] w-14 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent"
        style={{ transform: `translateY(${scrollY * 0.24}px)`, willChange: "transform" }} />
      <div className="pointer-events-none absolute top-[230px] left-[5%] w-14 h-14 rounded-full border border-white/[0.04]"
        style={{ transform: `translateY(${scrollY * 0.2}px)`, willChange: "transform" }} />
      <div className="pointer-events-none absolute top-[320px] left-[8.5%] w-5 h-5 rounded-full border border-brand/10"
        style={{ transform: `translateY(${scrollY * 0.36}px)`, willChange: "transform" }} />
      <div className="pointer-events-none absolute top-[95px] right-[20%] w-2 h-2 rounded-full bg-brand/18"
        style={{ transform: `translateY(${scrollY * 0.44}px)`, willChange: "transform" }} />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 lg:gap-10 items-center min-h-[calc(88vh-80px)]">

          {/* Left: copy */}
          <div style={{ transform: `translateY(${-scrollY * 0.1}px)`, willChange: "transform" }}>

            {/* Pulsing badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/25 bg-brand-subtle text-[11px] font-semibold text-brand tracking-wide mb-10"
              style={{ transform: `translateY(${-scrollY * 0.03}px)`, willChange: "transform" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
              </span>
              {l.badge}
            </div>

            {/* Headline — mixed weight */}
            <h1
              className="font-black tracking-[-0.04em] leading-[0.9] mb-7"
              style={{
                fontSize: "clamp(50px, 7.5vw, 88px)",
                transform: `translateY(${-scrollY * 0.06}px)`,
                willChange: "transform",
              }}
            >
              <span
                className="block text-ink-secondary font-light tracking-[-0.02em] mb-1"
                style={{ fontSize: "0.54em" }}
              >
                {l.heroLine1}
              </span>
              <span className="block text-gradient">{l.heroLine2}</span>
            </h1>

            {/* Tagline */}
            <p
              className="text-[17px] text-ink-secondary leading-relaxed max-w-md mb-10"
              style={{ transform: `translateY(${-scrollY * 0.05}px)`, willChange: "transform" }}
            >
              {l.tagline}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-3 mb-14"
              style={{ transform: `translateY(${-scrollY * 0.04}px)`, willChange: "transform" }}
            >
              <Link href="/analyze">
                <Button size="lg">
                  {l.ctaAnalyze}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/analyze">
                <Button variant="secondary" size="lg">{l.ctaPreset}</Button>
              </Link>
            </div>

            {/* Quotes */}
            <div
              className="flex flex-col sm:flex-row gap-5 sm:gap-10"
              style={{ transform: `translateY(${-scrollY * 0.03}px)`, willChange: "transform" }}
            >
              {[l.funQuote1, l.funQuote2].map((q, i) => (
                <p key={i} className="text-[13px] text-ink-disabled italic leading-relaxed">
                  &ldquo;{q}&rdquo;
                </p>
              ))}
            </div>
          </div>

          {/* Right: product preview */}
          <div
            className="hidden lg:flex justify-center items-center"
            style={{ transform: `translateY(${-scrollY * 0.06}px)`, willChange: "transform" }}
          >
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────── */}
      <Marquee />

      {/* ── Stats ────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
        <FadeIn>
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-0 sm:divide-x sm:divide-bg-border"
          >
            <StatTile value={8}   suffix="+"        label="investor archetypes identified" active={statsActive} />
            <StatTile value={4}   suffix=" axes"    label="portfolio quality dimensions"   active={statsActive} className="sm:pl-10" />
            <StatTile value={100} suffix=" pts"     label="scoring scale · S through F"    active={statsActive} className="sm:pl-10" />
            <StatTile value={12}  suffix="s"        label="avg time to complete analysis"  active={statsActive} className="sm:pl-10" />
          </div>
        </FadeIn>
      </section>

      {/* ── Divider ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8"><div className="divider" /></div>

      {/* ── Roast previews ───────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
        <FadeIn>
          <div className="mb-12">
            <p className="label mb-3">{l.sampleObsLabel}</p>
            <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-ink leading-tight">
              {l.sampleObsTitle}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {l.roastPreviews.map((r, i) => {
            const RIcon = ICON_MAP[r.icon] ?? CircleHelp;
            return (
              <FadeIn key={i} delay={i * 80}>
                <div
                  className="group relative p-6 rounded-xl border border-bg-border bg-bg-surface overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-bg-raised"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  <div className="absolute top-5 right-5 opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-300">
                    <RIcon className="w-7 h-7 text-ink" />
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at top right, rgba(249,115,22,0.04) 0%, transparent 55%)" }} />
                  <p className="label mb-4">{r.label}</p>
                  <p className="text-[15px] text-ink-secondary leading-relaxed italic relative">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8"><div className="divider" /></div>

      {/* ── Presets ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
        <FadeIn>
          <div className="mb-12">
            <p className="label mb-3">{l.presetsLabel}</p>
            <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-ink leading-tight">
              {l.presetsTitle}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {l.presetsPreviews.map((p, i) => (
            <FadeIn key={p.name} delay={i * 55}>
              <Link href="/analyze" className="block h-full">
                <div
                  className="group relative p-5 rounded-xl border border-bg-border bg-bg-surface h-full overflow-hidden transition-all duration-200 hover:border-white/10 hover:bg-bg-raised hover:-translate-y-0.5"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top, rgba(249,115,22,0.05) 0%, transparent 65%)" }} />
                  <div className="mb-3 transition-transform duration-300 group-hover:scale-110 origin-left relative">{(() => { const I = ICON_MAP[p.icon] ?? CircleHelp; return <I className="w-6 h-6 text-ink-secondary" />; })()}</div>
                  <div className="text-[13px] font-semibold text-ink mb-1.5 leading-tight relative">{p.name}</div>
                  <div className="text-[11px] text-ink-disabled leading-snug relative">{p.tagline}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8"><div className="divider" /></div>

      {/* ── Features ─────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
        <FadeIn>
          <div className="mb-12">
            <p className="label mb-3">{l.featuresLabel}</p>
            <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-ink leading-tight">
              {l.featuresTitle}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-bg-border"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {l.features.map((f) => (
              <div
                key={f.title}
                className="group bg-bg-base p-6 hover:bg-bg-surface transition-colors duration-200"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
              >
                <div className="text-[22px] mb-4 transition-transform duration-300 group-hover:scale-110 origin-left">{f.icon}</div>
                <h3 className="text-[14px] font-semibold text-ink mb-2">{f.title}</h3>
                <p className="text-[13px] text-ink-tertiary leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-32">
        <FadeIn>
          <div
            className="relative rounded-3xl overflow-hidden border border-bg-border p-12 sm:p-16 text-center"
            style={{
              background: "linear-gradient(160deg, #141414 0%, #0d0d0d 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.4)",
            }}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.09) 0%, transparent 65%)" }} />

            <div className="relative">
              <h2 className="text-[38px] sm:text-[50px] font-black tracking-[-0.03em] text-ink mb-4 leading-tight">
                {l.ctaSectionTitle}
              </h2>
              <p className="text-[15px] text-ink-secondary mb-10 max-w-sm mx-auto leading-relaxed">
                {l.ctaSectionSubtitle}
              </p>
              <Link href="/analyze">
                <Button size="lg">{l.ctaSectionBtn}</Button>
              </Link>
              <p className="text-[11px] text-ink-disabled mt-6 max-w-md mx-auto leading-relaxed">
                {l.disclaimer}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
