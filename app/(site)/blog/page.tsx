import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
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
    <div className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Journal</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Travel stories & guides
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Itinerary ideas, destination deep-dives and practical tips from our travel experts.
          </p>
        </Reveal>

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
