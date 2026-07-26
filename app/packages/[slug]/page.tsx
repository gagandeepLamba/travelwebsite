import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, Star, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PackageCard } from "@/components/packages/package-card";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, touristTripSchema } from "@/lib/seo/schema";
import {
  getPackageBySlug,
  getRelatedPackages,
  tourPackages,
} from "@/lib/data/packages";
import { packageCategories, siteConfig } from "@/lib/constants/site";

export function generateStaticParams() {
  return tourPackages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};

  return {
    title: pkg.title,
    description: pkg.summary,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      title: pkg.title,
      description: pkg.summary,
      images: [{ url: pkg.heroImage.url, width: 1200, height: 800, alt: pkg.heroImage.alt }],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const category = packageCategories.find((c) => c.slug === pkg.category);
  const related = getRelatedPackages(pkg);

  return (
    <div className="pb-16">
      <JsonLd data={touristTripSchema(pkg)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Packages", url: `${siteConfig.url}/packages` },
          { name: pkg.title, url: `${siteConfig.url}/packages/${pkg.slug}` },
        ])}
      />

      <div className="relative h-[46vh] min-h-80 w-full overflow-hidden sm:h-[56vh]">
        <Image
          src={pkg.heroImage.url}
          alt={pkg.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <Container className="relative flex h-full flex-col justify-end pb-8">
          {category && (
            <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {category.label}
            </span>
          )}
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-semibold text-white sm:text-5xl">
            {pkg.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {pkg.duration.nights}N / {pkg.duration.days}D
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" /> {pkg.destinations.join(" · ")}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-gold text-gold" /> {pkg.rating.toFixed(1)} ({pkg.reviewCount} reviews)
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="mt-8 text-lg text-muted-foreground">{pkg.summary}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {pkg.gallery.map((img) => (
                  <div key={img.url} className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <section className="mt-10">
                <h2 className="font-heading text-2xl font-semibold text-foreground">Highlights</h2>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.15}>
              <section className="mt-10">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Day-by-day itinerary
                </h2>
                <Accordion defaultValue={[pkg.itinerary[0]?.day]} className="mt-4">
                  {pkg.itinerary.map((day) => (
                    <AccordionItem key={day.day} value={day.day}>
                      <AccordionTrigger>
                        <span>
                          <span className="mr-2 text-primary">Day {day.day}</span>
                          {day.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>{day.description}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </Reveal>

            <Reveal delay={0.2}>
              <section className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground">Inclusions</h2>
                  <ul className="mt-3 space-y-2">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground">Exclusions</h2>
                  <ul className="mt-3 space-y-2">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/5">
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="font-heading text-3xl font-semibold text-foreground">
                ₹{pkg.price.amount.toLocaleString("en-IN")}
                <span className="text-sm font-normal text-muted-foreground"> /{pkg.price.unit}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Best season: {pkg.bestSeason}</p>
              <Button size="lg" className="mt-5 w-full rounded-full" render={<Link href="/contact" />}>
                Enquire Now
              </Button>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                  `Hi, I'm interested in the ${pkg.title} package.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 flex w-full items-center justify-center rounded-full border border-border py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              You might also like
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PackageCard key={r.slug} pkg={r} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
