import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/sanity/env";
import { siteConfig } from "@/lib/constants/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = isSanityConfigured ? await getPostBySlug(slug) : null;
  const title = post?.title ?? siteConfig.name;
  const category = post?.categories?.[0]?.title;

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
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#ffffff",
              color: "#0b6e4f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            PT
          </div>
          <div style={{ fontSize: 26, fontWeight: 600 }}>{siteConfig.shortName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          {category && (
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#e2a63d",
              }}
            >
              {category}
            </div>
          )}
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.75)" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
