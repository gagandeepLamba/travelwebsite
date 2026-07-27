import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, BedDouble, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description:
    "Book hotels across India at discounted rates with Plan Our Travel India — comfort, care and a reply within 3 hours.",
  alternates: { canonical: "/hotel-booking" },
};

const features = [
  {
    icon: BadgePercent,
    title: "Best discounted rates",
    description: "A wide range of hotels across India at special, attractive discounted rates.",
  },
  {
    icon: Sparkles,
    title: "Special season offers",
    description: "Seasonal deals across popular Indian destinations, updated as they come in.",
  },
  {
    icon: ShieldCheck,
    title: "Stay with comfort & care",
    description: "Hand-picked stays, so you can expect the same comfort and care on every trip.",
  },
  {
    icon: BedDouble,
    title: "5% off your second stay",
    description: "A special 5% discount on your second hotel booking with us.",
  },
];

export default function HotelBookingPage() {
  return (
    <div className="pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Hotel Booking", url: `${siteConfig.url}/hotel-booking` },
        ])}
      />
      <PageBanner
        eyebrow="Hotel booking"
        title="Best hotel deals across India"
        description="A wide range of hotels throughout India at special, discounted rates — comfort and care, guaranteed."
        image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Comfortable hotel room interior"
      />

      <Container className="pt-12 sm:pt-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground">
            Tell us your stay dates, city and preferences and we&rsquo;ll come back with the best
            options — acknowledged within 3 hours, sooner for urgent requests over phone or
            WhatsApp.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Reveal key={feature.title}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <h2 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Contact our experts to get the best deal — guaranteed
            </h2>
            <p className="text-sm text-muted-foreground">
              Send your check-in and check-out dates, city and number of guests, and we&rsquo;ll
              take it from there.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="rounded-full" nativeButton={false} render={<Link href="/contact" />}>
                Get hotel rates
              </Button>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <MessageCircle className="size-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
