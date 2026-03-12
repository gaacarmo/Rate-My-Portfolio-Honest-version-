import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rate My Portfolio — Honest Mode";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Bar chart icon */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 40 }}>
          {[40, 64, 32, 80, 48].map((h, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: h,
                background: "#F97316",
                borderRadius: 6,
                opacity: 0.7 + i * 0.06,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#FAFAFA",
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          Rate My Portfolio
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: "#F97316",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Honest Mode
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 18,
            color: "#A3A3A3",
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Real metrics. Real roasts. No sugarcoating.
        </div>

        {/* Border decoration */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #F97316, transparent)",
          }}
        />
      </div>
    ),
    size
  );
}
