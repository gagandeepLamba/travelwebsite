import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0b6e4f",
          backgroundImage: "linear-gradient(135deg, #0b6e4f 0%, #16241d 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#ffffff",
              color: "#0b6e4f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            PT
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 980 }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.15 }}>{siteConfig.tagline}</div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.8)" }}>
            India tours · International getaways · Yoga retreats · Luxury trains
          </div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.75)" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
