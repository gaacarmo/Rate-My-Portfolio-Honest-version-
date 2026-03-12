# Rate My Portfolio — Honest Mode

> Get a brutally honest analysis of your investment portfolio. Real metrics, real roasts. No sugarcoating.

![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-F97316)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

A client-side web app that scores your investment portfolio across four dimensions, identifies weaknesses, and delivers contextual roasts calibrated to how bad things actually are. No backend, no database, no data collection.

**[Live demo →](https://ratemyportfolio.app)**

---

## Table of contents

- [How it works](#how-it-works)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [Good first issues](#good-first-issues)
- [Roadmap](#roadmap)
- [Disclaimer](#disclaimer)

---

## How it works

Add your assets and their portfolio weights. The app scores the portfolio and tells you the truth.

**Four scoring dimensions (0–100):**

| Dimension | Weight | What it measures |
|---|---|---|
| Diversification | 30% | Asset count, class variety, sector spread, geographic exposure |
| Concentration | 30% | HHI index, max single position weight |
| Risk Management | 25% | Crypto exposure, weighted risk score, bond safety net |
| Coherence | 15% | Logical mix, geographic spread, risk level consistency |

**Grades:** S (90+) · A (80+) · B (70+) · C (60+) · D (50+) · F (<50)

Beyond the score, you get warnings, recommendations, an alternative portfolio suggestion, your investor personality type (9 archetypes), and severity-ranked roasts.

---

## Tech stack

- **Next.js 14** App Router
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Recharts** — allocation pie chart + metrics radar
- **lucide-react** — icons

100% client-side. No backend, no API keys required, no user data collected or stored.

---

## Getting started

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/gaacarmo/rate-my-portfolio.git
cd rate-my-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build
npm run lint     # run ESLint
```

No environment variables are required to run the project locally.

---

## Project structure

```
src/
  app/
    page.tsx              # Landing page
    analyze/page.tsx      # Analysis page (form + results)
    layout.tsx            # Root layout + SEO metadata
    globals.css           # Design tokens + Tailwind utilities
  types/index.ts          # All TypeScript interfaces — start here
  data/
    assets.ts             # Asset database (tickers, class, sector, geography, risk)
    presets.ts            # 5 preset portfolios
  lib/
    analysis/engine.ts    # Core scoring engine (HHI, 4 dimensions, warnings, recommendations)
    roast/engine.ts       # Roast generator (100+ roasts, severity 1–3, bilingual)
  components/
    ui/                   # Primitives: Button, Card, Badge, Progress
    layout/Header.tsx
    portfolio/            # PortfolioBuilder, PresetSelector
    charts/               # AllocationChart (pie), MetricsChart (radar)
    results/              # AnalysisResults, ScoreCard, RoastSection, PersonalityCard,
                          # MetricsGrid, WarningsPanel, RecommendationsPanel, AlternativePortfolio
  contexts/
    LanguageContext.tsx   # EN/PT language switcher
  i18n/
    translations.ts       # All UI strings in English and Portuguese
```

The two most important files for understanding the logic are:

- `src/lib/analysis/engine.ts` — scoring, HHI calculation, warnings, recommendations, personality detection
- `src/lib/roast/engine.ts` — roast selection algorithm and all roast content

---

## Contributing

Contributions are welcome. The project is intentionally simple — no backend to set up, no environment variables, just clone and run.

### Workflow

1. Fork the repo and create a branch: `git checkout -b your-feature`
2. Make your changes
3. Run `npm run build` to confirm there are no TypeScript or build errors
4. Open a pull request with a clear description of what you changed and why

### Guidelines

- **TypeScript is strict.** All new code must be properly typed — check `src/types/index.ts` for existing interfaces before adding new ones.
- **Match the tone.** The app is honest but not mean. Roasts should be educational — they should explain *why* something is a risk, not just insult the user.
- **Bilingual.** Any user-facing string must have both English and Portuguese translations in `src/i18n/translations.ts`. Roasts in `roast/engine.ts` have their own `en`/`pt` fields.
- **No new dependencies** for things that can be done with what's already installed. Open a discussion first if you think a new package is truly necessary.

---

## Good first issues

These are self-contained, well-scoped contributions that don't require deep knowledge of the codebase:

### Add assets to the database

`src/data/assets.ts` contains the asset database. Each entry is a simple object:

```ts
{ ticker: "VTI", name: "Vanguard Total Stock Market ETF", assetClass: "etf", sector: "diversified", geography: "us", riskLevel: "low" }
```

Missing categories that need more coverage:
- European stocks and ETFs (LSE, Euronext)
- Asian markets (Japan, South Korea, Hong Kong)
- Brazilian stocks (B3) and local ETFs (BOVA11, IVVB11, etc.)
- Commodities (gold, silver, oil ETFs)
- Real estate / REITs

### Add roasts

`src/lib/roast/engine.ts` contains all roast content. Each roast has:

```ts
{
  id: "unique_id",
  category: "crypto" | "concentration" | "tech" | "bonds" | "geography" | "general" | "coherence" | "overdiversification",
  severity: 1 | 2 | 3,           // 1 = mild, 2 = spicy, 3 = no mercy
  condition: (m: PortfolioMetrics) => boolean,  // when to show this roast
  text: {
    en: "English roast text. ${cryptoExposure.toFixed(0)}% is not a personality.",
    pt: "Portuguese translation. ${cryptoExposure.toFixed(0)}% não é personalidade.",
  },
}
```

Good places to add roasts: overdiversification (10+ assets with no strategy), geography (100% domestic), bonds (no fixed income at any age).

### Add a preset portfolio

`src/data/presets.ts` has 5 presets. A new preset needs: a key, name, icon (lucide-react name), description, tagline, and an array of assets with weights that sum to 100.

Ideas: European investor, retirement-focused, ESG/sustainable, emerging markets only.

### Translations / language improvements

All UI strings are in `src/i18n/translations.ts`. If you're a native speaker of another language and want to add support, that's a great contribution — open an issue first to coordinate.

---

## Roadmap

Things that are planned but not yet built. Open an issue before starting work on any of these to avoid duplication:

- [ ] not mocked assets, assets by API to include alL registered assets
- [ ] Share results via URL (encode portfolio in query params, no backend needed)
- [ ] PDF export of the analysis
- [ ] More languages (Spanish, French)
- [ ] Additional personality archetypes
- [ ] Historical context for scores ("your portfolio would have lost X% in 2022")
- [ ] Dark/light theme toggle

---

## Disclaimer

This tool is for entertainment and educational purposes only. Nothing here is financial advice. Scores and roasts are algorithmically generated based on general diversification principles. Your financial decisions are your own.

---

## License

MIT — do what you want, attribution appreciated.
