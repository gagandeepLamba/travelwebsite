import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPortableText } from "@/components/blog/portable-text";
import { ShareButtons } from "@/components/blog/share-buttons";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { estimateReadingTime } from "@/lib/blog";
import { urlForImage } from "@/lib/sanity/image";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/sanity/env";
import { siteConfig } from "@/lib/constants/site";

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = isSanityConfigured ? await getPostBySlug(slug) : null;
  if (!post) return {};

  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = isSanityConfigured ? await getPostBySlug(slug) : null;
  if (!post) notFound();

  const heroUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(1600).height(900).fit("crop").url()
    : null;
  const readingTime = estimateReadingTime(post.body);
  const related = await getRelatedPosts(
    post.categories.map((c) => c.slug),
    post.slug,
    3
  );
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <article className="pb-16">
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          image: heroUrl ?? undefined,
          publishedAt: post.publishedAt,
          authorName: post.author?.name,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: postUrl },
        ])}
      />

      <Container className="pt-10 sm:pt-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          {post.categories?.[0] && (
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {post.categories[0].title}
            </p>
          )}
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
            {post.author?.name && <span>· {post.author.name}</span>}
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {readingTime} min read
            </span>
          </div>
        </Reveal>

        {heroUrl && (
          <Reveal delay={0.1}>
            <div className="relative mx-auto mt-8 aspect-video max-w-4xl overflow-hidden rounded-3xl">
              <Image
                src={heroUrl}
                alt={post.mainImage?.alt ?? post.title}
                fill
                priority
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 max-w-2xl">
            {post.body?.length > 0 && <BlogPortableText value={post.body} />}
            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground">Share this article</p>
              <ShareButtons url={postUrl} title={post.title} />
            </div>
          </div>
        </Reveal>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            More from the journal
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <BlogCard key={r._id} post={r} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
