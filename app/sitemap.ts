import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";
import { tourPackages } from "@/lib/data/packages";
import { getAllPostSlugs } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/sanity/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/packages`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/testimonials`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const packageRoutes: MetadataRoute.Sitemap = tourPackages.map((pkg) => ({
    url: `${siteConfig.url}/packages/${pkg.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogSlugs = isSanityConfigured ? await getAllPostSlugs() : [];
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...packageRoutes, ...blogRoutes];
}
