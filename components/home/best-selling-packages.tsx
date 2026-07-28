import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PackageCard } from "@/components/packages/package-card";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { getPackageBySlug } from "@/lib/data/packages";

const bestSellingSlugs = [
  "ayodhya-varanasi-prayagraj",
  "char-dham-yatra",
  "yoga-teacher-training-rishikesh",
  "royal-rajasthan-tour",
] as const;

export function BestSellingPackages() {
  const packages = bestSellingSlugs
    .map((slug) => getPackageBySlug(slug))
    .filter((pkg) => pkg !== undefined);

  return (
    <section className="bg-secondary/40 py-16 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Traveller favourites
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Best selling packages
            </h2>
          </div>
          <Button
            variant="outline"
            className="rounded-full"
            nativeButton={false}
            render={<Link href="/packages" />}
          >
            View all packages <ArrowRight className="size-4" />
          </Button>
        </Reveal>

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={Math.min(i * 0.05, 0.2)}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
