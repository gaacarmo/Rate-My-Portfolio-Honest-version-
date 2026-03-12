"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-bg-base/90 backdrop-blur-2xl border-b border-bg-separator">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-[52px] flex items-center justify-between gap-4">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10V6M6 10V2M10 10V4" stroke="white" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-semibold text-[13px] text-ink tracking-tight hidden sm:block">
            Rate My Portfolio
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Nav */}
          <nav className="flex items-center">
            <Link
              href="/"
              className={clsx(
                "px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                pathname === "/"
                  ? "text-ink bg-white/6"
                  : "text-ink-tertiary hover:text-ink-secondary"
              )}
            >
              {t.header.home}
            </Link>
            <Link
              href="/analyze"
              className={clsx(
                "px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                pathname === "/analyze"
                  ? "text-ink bg-white/6"
                  : "text-ink-tertiary hover:text-ink-secondary"
              )}
            >
              {t.header.analyze}
            </Link>
          </nav>

          {/* Divider */}
          <div className="w-px h-4 bg-bg-border mx-1" />

          {/* Language toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setLanguage("en")}
              className={clsx(
                "px-2.5 py-1 rounded-l-md text-[11px] font-semibold border border-r-0 transition-all",
                language === "en"
                  ? "bg-bg-raised border-bg-border text-ink"
                  : "border-bg-border text-ink-disabled hover:text-ink-tertiary"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("pt")}
              className={clsx(
                "px-2.5 py-1 rounded-r-md text-[11px] font-semibold border transition-all",
                language === "pt"
                  ? "bg-bg-raised border-bg-border text-ink"
                  : "border-bg-border text-ink-disabled hover:text-ink-tertiary"
              )}
            >
              PT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
