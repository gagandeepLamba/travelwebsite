import type { Metadata } from "next";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/home/cta-banner";
import { testimonials } from "@/lib/data/testimonials";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Traveller Testimonials",
  description: `Read what travellers say about booking with ${siteConfig.name} — real trips, real feedback.`,
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <div className="pb-16">
      <Container className="pt-12 sm:pt-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Traveller stories
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-5xl">
            Loved by thousands of travellers
          </h1>
          <p className="mt-4 text-muted-foreground">
            Every trip is different, but the feeling of coming home already planning the next one
            is something our travellers keep telling us about.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={Math.min(i * 0.05, 0.25)}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm shadow-black/5">
                <Quote className="size-7 text-primary/30" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.location} · {t.packageTitle}
                    </p>
                  </div>
                  <div className="ml-auto flex shrink-0 items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`size-3.5 ${
                          idx < Math.round(t.rating) ? "fill-gold text-gold" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>

      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}
