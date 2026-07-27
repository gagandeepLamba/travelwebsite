import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { getAllCategories, getAllPosts } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/sanity/env";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Blog",
  description:
    "Guides, itineraries and inspiration for India tours, international getaways, yoga retreats and luxury train journeys.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  if (!isSanityConfigured) {
    return (
      <div className="py-20">
        <Container className="mx-auto max-w-lg text-center">
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            The blog is warming up
          </h1>
          <p className="mt-3 text-muted-foreground">
            This section is powered by Sanity and will populate automatically once the CMS is
            connected — no code changes required.
          </p>
        </Container>
      </div>
    );
  }

  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);
  const filtered = category ? posts.filter((p) => p.categories.some((c) => c.slug === category)) : posts;

  return (
    <div className="pb-16">
      <PageBanner
        eyebrow="Journal"
        title="Travel stories & guides"
        description="Itinerary ideas, destination deep-dives and practical tips from our travel experts."
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Open journal and camera on a travel desk"
      />
      <Container className="pt-12 sm:pt-16">
        {categories.length > 0 && (
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/blog"
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                !category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary/50"
              )}
            >
              All posts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  category === cat.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary/50"
                )}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}

        {filtered.length > 0 ? (
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post._id} delay={Math.min(i * 0.05, 0.3)}>
                <BlogCard post={post} priority={i < 3} />
              </Reveal>
            ))}
          </StaggerGroup>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            No posts here yet — check back soon.
          </p>
        )}
      </Container>
    </div>
  );
}
