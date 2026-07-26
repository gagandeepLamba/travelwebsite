import type { Metadata } from "next";
import { Building2, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { TripPlannerQuiz } from "@/components/forms/trip-planner-quiz";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} — call, WhatsApp or start our trip planner and a travel expert will reach out with a tailored itinerary.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-12 pb-16 sm:py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Contact", url: `${siteConfig.url}/contact` },
        ])}
      />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact us</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-5xl">
            Let&rsquo;s plan your trip
          </h1>
          <p className="mt-4 text-muted-foreground">
            Answer a few quick questions and a travel expert will reach out with a tailored
            itinerary — or reach us directly using the details below.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <TripPlannerQuiz />
            </Reveal>
          </div>

          <div className="space-y-5 lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Head office
                </h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    {siteConfig.contact.address.full}
                  </p>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="flex items-center gap-2.5 hover:text-primary"
                  >
                    <Phone className="size-4 shrink-0 text-primary" /> {siteConfig.contact.phone}
                  </a>
                  <a
                    href={siteConfig.contact.landlineHref}
                    className="flex items-center gap-2.5 hover:text-primary"
                  >
                    <Phone className="size-4 shrink-0 text-primary" /> {siteConfig.contact.landline}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2.5 hover:text-primary"
                  >
                    <Mail className="size-4 shrink-0 text-primary" /> {siteConfig.contact.email}
                  </a>
                  <p className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" /> {siteConfig.hours}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
                  <Building2 className="size-4.5 text-primary" /> Branch office
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {siteConfig.contact.branchAddress}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Talk to the right team
                </h2>
                <div className="mt-4 space-y-3">
                  {siteConfig.departments.map((dept) => (
                    <div key={dept.label} className="text-sm">
                      <p className="font-medium text-foreground">{dept.label}</p>
                      <p className="text-muted-foreground">
                        {dept.phone} · {dept.email}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="rounded-3xl border border-border bg-card p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
                  <Globe className="size-4.5 text-primary" /> Where you&rsquo;ll find us
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Associate offices across {siteConfig.associateOffices.join(", ")}.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  International desks in {siteConfig.internationalOffices.join(", ")}.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
