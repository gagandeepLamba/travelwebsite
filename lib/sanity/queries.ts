import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";
import { sanityClient } from "@/lib/sanity/client";

export interface SanityCategory {
  title: string;
  slug: string;
}

export interface SanityPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: (Image & { alt?: string }) | null;
  categories: SanityCategory[];
  author: { name: string } | null;
  publishedAt: string;
}

export interface SanityPost extends SanityPostSummary {
  body: PortableTextBlock[];
}

const postSummaryProjection = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  "categories": categories[]->{title, "slug": slug.current},
  "author": author->{name},
  publishedAt
`;

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return fallback;
  }
}

export function getAllPosts() {
  return safeFetch<SanityPostSummary[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){${postSummaryProjection}}`,
    {},
    []
  );
}

export function getLatestPosts(limit = 3) {
  return safeFetch<SanityPostSummary[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit]{${postSummaryProjection}}`,
    { limit },
    []
  );
}

export function getAllPostSlugs() {
  return safeFetch<{ slug: string }[]>(
    `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
    {},
    []
  );
}

export function getPostBySlug(slug: string) {
  return safeFetch<SanityPost | null>(
    `*[_type == "post" && slug.current == $slug][0]{${postSummaryProjection}, body}`,
    { slug },
    null
  );
}

export function getRelatedPosts(categorySlugs: string[], excludeSlug: string, limit = 3) {
  if (categorySlugs.length === 0) return Promise.resolve<SanityPostSummary[]>([]);
  return safeFetch<SanityPostSummary[]>(
    `*[_type == "post" && slug.current != $excludeSlug && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc)[0...$limit]{${postSummaryProjection}}`,
    { excludeSlug, categorySlugs, limit },
    []
  );
}

export function getAllCategories() {
  return safeFetch<SanityCategory[]>(
    `*[_type == "category"] | order(title asc){title, "slug": slug.current}`,
    {},
    []
  );
}
