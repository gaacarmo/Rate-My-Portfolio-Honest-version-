import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ratemyportfolio.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rate My Portfolio — Honest Mode",
    template: "%s | Rate My Portfolio",
  },
  description:
    "Analyze your investment portfolio. Get real metrics, actual insights, and unsolicited honesty about your financial decisions.",
  keywords: ["portfolio analysis", "investment", "diversification", "roast", "finance", "HHI", "portfolio score"],
  authors: [{ name: "Rate My Portfolio" }],
  openGraph: {
    title: "Rate My Portfolio — Honest Mode",
    description: "Get a brutally honest analysis of your investment portfolio. Real metrics, real roasts.",
    url: siteUrl,
    siteName: "Rate My Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rate My Portfolio — Honest Mode",
    description: "Get a brutally honest analysis of your investment portfolio. Real metrics, real roasts.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg-base text-slate-200">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
