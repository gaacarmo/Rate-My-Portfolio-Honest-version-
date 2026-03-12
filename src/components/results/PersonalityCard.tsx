"use client";

import { PersonalityType } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { ICON_MAP } from "@/lib/iconMap";
import { CircleHelp } from "lucide-react";

interface PersonalityCardProps {
  personality: PersonalityType;
}

export default function PersonalityCard({ personality }: PersonalityCardProps) {
  const { t } = useLanguage();
  const Icon = ICON_MAP[personality.icon] ?? CircleHelp;

  return (
    <div className="relative rounded-xl border border-bg-border bg-bg-surface overflow-hidden shadow-card">
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      {/* Background ambient glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative p-6 sm:p-7 flex gap-5 sm:gap-7 items-start">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div
            className="relative p-3.5 rounded-xl border border-brand/20"
            style={{ background: "rgba(249,115,22,0.08)" }}
          >
            <Icon className="w-8 h-8 text-brand" strokeWidth={1.5} />
            {/* Glow behind icon */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{ boxShadow: "0 0 24px rgba(249,115,22,0.15)" }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          {/* Label */}
          <p className="label">{t.personality.sectionLabel}</p>

          {/* Personality name */}
          <h3 className="text-[22px] sm:text-[24px] font-black tracking-tight text-ink leading-tight">
            {personality.name}
          </h3>

          {/* Tagline */}
          <div className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-0.5 self-stretch rounded-full bg-brand/40 mt-0.5" />
            <p className="text-[13px] text-ink-secondary italic leading-relaxed font-medium">
              &ldquo;{personality.tagline}&rdquo;
            </p>
          </div>

          {/* Description */}
          <p className="text-[13px] sm:text-[14px] text-ink-tertiary leading-relaxed pt-0.5">
            {personality.description}
          </p>
        </div>
      </div>
    </div>
  );
}
