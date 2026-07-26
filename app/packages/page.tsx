import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { CategoryFilter } from "@/components/packages/category-filter";
import { PackageCard } from "@/components/packages/package-card";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { getPackagesByCategory } from "@/lib/data/packages";
import { packageCategories, siteConfig } from "@/lib/constants/site";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = await searchParams;
  const cat = packageCategories.find((c) => c.slug === category);
  const title = cat ? `${cat.label} Packages` : "All Tour Packages";
  const description = cat
    ? cat.description
    : "Browse India tours, international getaways, yoga retreats, luxury trains and honeymoon packages — all handpicked and fully customisable.";

  return {
    title,
    description,
    alternates: { canonical: cat ? `/packages?category=${cat.slug}` : "/packages" },
  };
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const cat = packageCategories.find((c) => c.slug === category);
  const packages = getPackagesByCategory(cat?.slug);

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Packages", url: `${siteConfig.url}/packages` },
        ])}
      />
      <Container>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {cat ? cat.label : "All Packages"}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {cat ? cat.label : "Tour Packages"}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {cat
              ? cat.description
              : "Every itinerary here is a starting point — share your dates and interests and we'll tailor it just for you."}
          </p>
        </Reveal>

        <div className="mt-8">
          <CategoryFilter active={cat?.slug} />
        </div>

        {packages.length > 0 ? (
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={Math.min(i * 0.05, 0.3)}>
                <PackageCard pkg={pkg} priority={i < 3} />
              </Reveal>
            ))}
          </StaggerGroup>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            No packages found in this category yet — check back soon or ask us for a custom
            itinerary.
          </p>
        )}
      </Container>
    </div>
  );
}
