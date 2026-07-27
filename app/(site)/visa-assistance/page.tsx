import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, FileCheck2, Globe2, MessageCircle, ShieldCheck, Stamp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Visa Assistance",
  description:
    "Visa assistance from Plan Our Travel India — document checklists, application support and tracking for tourist visas to popular destinations.",
  alternates: { canonical: "/visa-assistance" },
};

const features = [
  {
    icon: FileCheck2,
    title: "Document checklist, sorted",
    description: "A clear list of exactly what you need for your destination, so there are no last-minute surprises.",
  },
  {
    icon: Stamp,
    title: "Application support",
    description: "We help you fill and file the application correctly the first time, for e-visas and embassy visas alike.",
  },
  {
    icon: Clock3,
    title: "Tracking & follow-up",
    description: "We track your application status and follow up on your behalf until it's approved.",
  },
  {
    icon: Globe2,
    title: "Popular destinations covered",
    description: "Dubai, Thailand, Singapore, Malaysia, Mauritius and more — plus guidance for less common routes.",
  },
];

export default function VisaAssistancePage() {
  return (
    <div className="pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Visa Assistance", url: `${siteConfig.url}/visa-assistance` },
        ])}
      />
      <PageBanner
        eyebrow="Visa assistance"
        title="Visa paperwork, handled for you"
        description="Document checklists, application support and status tracking — so visa paperwork is one less thing to worry about."
        image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Passport and travel documents on a desk"
      />

      <Container className="pt-12 sm:pt-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground">
            Every destination has its own visa rules, forms and processing times. Tell us where
            you&rsquo;re headed and {siteConfig.shortName} will guide you through exactly
            what&rsquo;s needed — from documents to appointment booking to follow-up.
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
            <ShieldCheck className="size-8 text-primary" />
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Tell us your destination and travel dates
            </h2>
            <p className="text-sm text-muted-foreground">
              We&rsquo;ll confirm the visa type you need and what to prepare, so your application
              goes in right the first time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="rounded-full" nativeButton={false} render={<Link href="/contact" />}>
                Ask about my visa
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
