import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base:      "#0a0a0a",
          surface:   "#111111",
          raised:    "#1a1a1a",
          overlay:   "#222222",
          border:    "rgba(255,255,255,0.07)",
          separator: "rgba(255,255,255,0.04)",
        },
        brand: {
          DEFAULT: "#F97316",
          hover:   "#EA580C",
          muted:   "rgba(249,115,22,0.12)",
          subtle:  "rgba(249,115,22,0.06)",
        },
        ink: {
          DEFAULT:   "#FAFAFA",
          secondary: "#A3A3A3",
          tertiary:  "#737373",
          disabled:  "#404040",
        },
        success: {
          DEFAULT: "#4ADE80",
          muted:   "rgba(74,222,128,0.12)",
          subtle:  "rgba(74,222,128,0.06)",
        },
        warning: {
          DEFAULT: "#FCD34D",
          muted:   "rgba(252,211,77,0.12)",
          subtle:  "rgba(252,211,77,0.06)",
        },
        danger: {
          DEFAULT: "#F87171",
          muted:   "rgba(248,113,113,0.12)",
          subtle:  "rgba(248,113,113,0.06)",
        },
        blue: {
          data: "#60A5FA",
          muted: "rgba(96,165,250,0.12)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system", "BlinkMacSystemFont",
          '"SF Pro Display"', '"Segoe UI"',
          "Inter", "system-ui", "sans-serif",
        ],
        mono: [
          '"SF Mono"', '"JetBrains Mono"',
          '"Fira Code"', "ui-monospace", "monospace",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        sm:    "6px",
        DEFAULT: "8px",
        md:    "10px",
        lg:    "12px",
        xl:    "16px",
        "2xl": "20px",
        "3xl": "28px",
        "4xl": "36px",
      },
      boxShadow: {
        "card":        "0 0 0 1px rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.4)",
        "card-lg":     "0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px rgba(0,0,0,0.55)",
        "card-glow":   "0 0 0 1px rgba(249,115,22,0.2), 0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(249,115,22,0.08)",
        "glow-brand":  "0 0 40px rgba(249,115,22,0.18), 0 0 80px rgba(249,115,22,0.08)",
        "glow-sm":     "0 0 20px rgba(249,115,22,0.14)",
        "inset-top":   "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "gradient-brand":   "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
        "gradient-surface": "linear-gradient(180deg, #111111 0%, #0a0a0a 100%)",
        "gradient-radial":  "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-up":   "slideUp 0.35s ease forwards",
        "spin-slow":  "spin 2s linear infinite",
        "marquee":    "marquee 36s linear infinite",
        "marquee-rev":"marqueeRev 36s linear infinite",
        "float":      "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "shimmer":    "shimmer 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.06" },
          "50%":      { opacity: "0.14" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
