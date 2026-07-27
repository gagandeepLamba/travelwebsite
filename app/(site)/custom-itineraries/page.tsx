import type { Metadata } from "next";
import { CalendarCheck, MapPin, PencilLine } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { CustomItineraryForm } from "@/components/forms/custom-itinerary-form";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Custom Itineraries",
  description:
    "Build your own day-by-day itinerary — pick a destination, choose your trip length, tell us what you want each day, and our travel experts take it from there.",
  alternates: { canonical: "/custom-itineraries" },
};

const steps = [
  {
    icon: MapPin,
    title: "Pick a destination & trip length",
    description: "Choose where you'd like to go and how many days you have to spend there.",
  },
  {
    icon: PencilLine,
    title: "Plan it day by day",
    description: "Tell us what you'd like to do (or see) on each day — as much or as little detail as you like.",
  },
  {
    icon: CalendarCheck,
    title: "We take it from here",
    description: "Your day-by-day plan is sent straight to our travel experts, who'll turn it into a priced itinerary.",
  },
];

export default function CustomItinerariesPage() {
  return (
    <div className="pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Custom Itineraries", url: `${siteConfig.url}/custom-itineraries` },
        ])}
      />
      <PageBanner
        eyebrow="Custom itineraries"
        title="Plan your trip, day by day"
        description="Pick a destination and trip length, tell us what you want on each day, and a travel expert will turn it into a tailored itinerary."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Traveller planning a route on a map"
      />

      <Container className="pt-12 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <CustomItineraryForm />
            </Reveal>
          </div>

          <div className="space-y-5 lg:col-span-2">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <s.icon className="size-5" />
                  </span>
                  <h2 className="mt-3 font-heading text-base font-semibold text-foreground">
                    {s.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
