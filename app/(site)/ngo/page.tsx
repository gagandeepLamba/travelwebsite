import type { Metadata } from "next";
import { HandHeart, Leaf, Sprout, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { CtaBanner } from "@/components/home/cta-banner";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Our NGO Initiative",
  description:
    "Plan Our Travel's social initiative — supporting rural education, health and wellness camps across India.",
  alternates: { canonical: "/ngo" },
};

const programs = [
  {
    icon: Users,
    title: "Vimal Environmental and Social Welfare Society",
    description:
      "Works in rural areas and villages across India, focused on education, health and the upliftment of disadvantaged populations.",
  },
  {
    icon: Sprout,
    title: "DevShiv Manav Uthan Pariyojna",
    description:
      "A social initiative promoting yoga and wellness awareness through organised camps in rural villages, urban slums and city centres.",
  },
  {
    icon: Leaf,
    title: "Customised Camps",
    description:
      "Health, education and wellness camps organised on request in rural areas or villages, open to volunteers and philanthropists who want to participate.",
  },
];

export default function NgoPage() {
  return (
    <div className="pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "NGO Initiative", url: `${siteConfig.url}/ngo` },
        ])}
      />
      <PageBanner
        eyebrow="Our initiative"
        title="A small contribution to society"
        description="Real happiness is in sharing and spreading happiness — real joy of life is to enjoy together."
        image="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Volunteers working together in a rural community"
      />

      <Container className="pt-12 sm:pt-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground">
            In a world driven by greed and restlessness, we believe in giving back. Good health of
            the citizens of any nation is the sign of its development and prosperity — and every
            small contribution towards that health, education and wellness matters.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {programs.map((program) => (
            <Reveal key={program.title}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <program.icon className="size-5" />
                </span>
                <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {program.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{program.description}</p>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 rounded-3xl border border-border bg-card p-8 text-center">
            <HandHeart className="size-8 text-primary" />
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Volunteer or contribute
            </h2>
            <p className="text-sm text-muted-foreground">
              Individuals and groups are welcome to contribute, volunteer or participate in our
              camps — reach out and we&rsquo;ll get you involved.
            </p>
          </div>
        </Reveal>
      </Container>

      <div className="mt-16">
        <CtaBanner />
      </div>
    </div>
  );
}
