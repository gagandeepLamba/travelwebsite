import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/sanity/env";

export async function BlogPreview() {
  const posts = isSanityConfigured ? await getLatestPosts(3) : [];

  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              From the journal
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Travel stories & guides
            </h2>
          </div>
          <Button variant="outline" className="rounded-full" nativeButton={false} render={<Link href="/blog" />}>
            Read the blog <ArrowRight className="size-4" />
          </Button>
        </Reveal>

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post._id} delay={Math.min(i * 0.05, 0.2)}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
