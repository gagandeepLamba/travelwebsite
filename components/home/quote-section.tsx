import { CircleCheck, Clock, HeartHandshake, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { QuickInquiryForm } from "@/components/forms/quick-inquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/constants/site";

const points = [
  {
    icon: HeartHandshake,
    title: "Tailored to you",
    description: "Every itinerary is a starting point — we adjust pace, hotels and budget to fit.",
  },
  {
    icon: Clock,
    title: "Fast response",
    description: "A dedicated travel expert calls you back within hours, not days.",
  },
  {
    icon: ShieldCheck,
    title: "Book with confidence",
    description: "Secure payments and transparent pricing, with 24/7 support during your trip.",
  },
  {
    icon: CircleCheck,
    title: "No hidden costs",
    description: "Inclusions and exclusions are spelled out clearly before you pay a rupee.",
  },
];

export function QuoteSection() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {siteConfig.stats[1].value.toLocaleString("en-IN")}+ happy travellers
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Tell us your dream trip. We'll handle the rest.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            From a weekend in Goa to a three-week grand tour of India, our travel experts turn
            your wishlist into a real itinerary — no obligation, no spam.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {points.map((point) => (
              <div key={point.title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <point.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{point.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <QuickInquiryForm />
        </Reveal>
      </Container>
    </section>
  );
}
