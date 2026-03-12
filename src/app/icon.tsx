import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0a0a0a",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Bar chart icon */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          <div style={{ width: 5, height: 10, background: "#F97316", borderRadius: 2 }} />
          <div style={{ width: 5, height: 16, background: "#F97316", borderRadius: 2 }} />
          <div style={{ width: 5, height: 8, background: "#F97316", borderRadius: 2 }} />
          <div style={{ width: 5, height: 20, background: "#F97316", borderRadius: 2 }} />
        </div>
      </div>
    ),
    size
  );
}
