"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="num text-7xl font-bold text-gradient mb-4">404</div>
      <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Page not found</h1>
      <p className="text-[#A3A3A3] mb-8 max-w-sm">
        This portfolio doesn&apos;t exist. Unlike your crypto-heavy allocation, this one actually can&apos;t be recovered.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-orange-600 transition-colors"
        style={{ backgroundColor: "#F97316" }}
      >
        Back to safety
      </Link>
    </div>
  );
}
