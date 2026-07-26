"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PackageCard } from "@/components/packages/package-card";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { getPackagesByCategory } from "@/lib/data/packages";
import { packageCategories } from "@/lib/constants/site";

const tabs = [
  { value: "all", label: "All" },
  ...packageCategories.map((c) => ({ value: c.slug, label: c.label })),
];

export function FeaturedPackages() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Handpicked itineraries
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Popular tour packages
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

        <Tabs defaultValue="all" className="mt-8">
          <TabsList variant="line" className="no-scrollbar h-auto flex-wrap justify-start gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="rounded-full px-4 py-2">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {getPackagesByCategory(tab.value === "all" ? undefined : tab.value)
                  .slice(0, 6)
                  .map((pkg, i) => (
                    <Reveal key={pkg.slug} delay={Math.min(i * 0.05, 0.25)}>
                      <PackageCard pkg={pkg} />
                    </Reveal>
                  ))}
              </StaggerGroup>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  );
}
