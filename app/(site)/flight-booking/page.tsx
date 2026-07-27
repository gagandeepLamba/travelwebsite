import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, Clock3, MessageCircle, Phone, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Flight Booking",
  description:
    "Book flight tickets at discounted rates with Plan Our Travel India — a tailored quote within 3 hours, for every kind of traveller.",
  alternates: { canonical: "/flight-booking" },
};

const features = [
  {
    icon: BadgePercent,
    title: "Discounted flight fares",
    description: "Competitive, discounted rates across airlines — we shop the best fare for your route.",
  },
  {
    icon: Clock3,
    title: "Quote within 3 hours",
    description: "Share your travel details and get a tailored fare quote back within three hours.",
  },
  {
    icon: Phone,
    title: "Expert consultation",
    description: "Our travel experts help you pick the best combination of price, timing and layovers.",
  },
  {
    icon: Users,
    title: "Every passenger type",
    description: "Fares and support for adults, children and infants, on domestic and international routes.",
  },
];

export default function FlightBookingPage() {
  return (
    <div className="pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Flight Booking", url: `${siteConfig.url}/flight-booking` },
        ])}
      />
      <PageBanner
        eyebrow="Flight booking"
        title="Book flight tickets at the best price"
        description="Discounted fares, expert consultation and a quote within 3 hours — for every kind of traveller."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Airplane wing above the clouds"
      />

      <Container className="pt-12 sm:pt-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground">
            Share where you&rsquo;d like to fly and we&rsquo;ll find the best fare for you — no
            markup surprises, just a straight, discounted quote from our travel experts.
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
              Send your departure and arrival cities, travel dates and passenger count, and
              we&rsquo;ll take it from there.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="rounded-full" nativeButton={false} render={<Link href="/contact" />}>
                Get a fare quote
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
