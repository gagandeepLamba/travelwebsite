import type { Metadata } from "next";
import {
  Award,
  Compass,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { CtaBanner } from "@/components/home/cta-banner";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — a full-service travel company crafting bespoke India tours, international getaways, yoga retreats and luxury train journeys since ${siteConfig.founded}.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: HeartHandshake,
    title: "Trip planning, not template selling",
    description:
      "Flexible tour packages built around your budget — every itinerary starts as a conversation, not a catalogue pick.",
  },
  {
    icon: Compass,
    title: "Government-approved, registered travel agency",
    description:
      "A nationwide network of ground handling partners and associate offices across India, plus international desks in Dubai, Kathmandu, Paris and St. Petersburg.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent, secure bookings",
    description:
      "Clear inclusions and exclusions before you pay, secure payment gateways, and a strict no-personal-bank-transfer policy to keep you safe.",
  },
  {
    icon: Users,
    title: "24×7 support, quick response",
    description:
      "Quick acknowledgement on every enquiry, and a dedicated travel expert reachable throughout your trip — not just until the invoice is paid.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <PageBanner
        eyebrow="About us"
        title="We plan trips the way we’d want them planned for us"
        image="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Amber Fort, a royal Rajasthan hill fort"
      />

      <Container>
        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg text-muted-foreground">
            {siteConfig.legalName} started with a simple frustration: too many &ldquo;customised&rdquo;
            itineraries were really just the same template with a new name on it. Since{" "}
            {siteConfig.founded}, we&rsquo;ve built our business the other way around — every trip
            begins with your budget, your pace and your interests, and the itinerary is built to
            match.
          </p>
          <p className="mt-5 font-heading text-xl italic text-foreground sm:text-2xl">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 rounded-3xl border border-border bg-card p-8 sm:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                  className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <section id="why-us" className="mt-20 scroll-mt-24">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Why travel with us
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              What makes a trip actually go well
            </h2>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <value.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </StaggerGroup>
        </section>

        <Reveal delay={0.1}>
          <section className="mt-20 grid grid-cols-1 gap-8 rounded-3xl border border-border bg-secondary/40 p-8 sm:grid-cols-2 sm:p-10">
            <div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPinned className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                Where we operate
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Headquartered in {siteConfig.contact.address.city}, with associate offices across{" "}
                {siteConfig.associateOffices.join(", ")}, and international desks in{" "}
                {siteConfig.internationalOffices.join(", ")}.
              </p>
            </div>
            <div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                Booking safely, always
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We never ask travellers to transfer money to a personal bank account. All payments
                run through a secure, verified gateway — if anything looks off, contact us
                directly at {siteConfig.contact.email}.
              </p>
            </div>
          </section>
        </Reveal>
      </Container>

      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}
