import { Check, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/constants/site";

const rows: { label: string; direct: boolean | "maybe"; other: boolean | "maybe" }[] = [
  { label: "Dedicated travel expert from enquiry to return", direct: true, other: false },
  { label: "Itinerary customised to your budget & pace", direct: true, other: false },
  { label: "Transparent, all-inclusive pricing", direct: true, other: "maybe" },
  { label: "24/7 support during your trip", direct: true, other: false },
  { label: "Verified hotels & local partners", direct: true, other: "maybe" },
  { label: "Secure payment gateway, no cash transfers", direct: true, other: "maybe" },
];

function Cell({ value }: { value: boolean | "maybe" }) {
  if (value === true) {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-4" />
      </span>
    );
  }
  if (value === "maybe") {
    return <span className="text-xs font-medium text-muted-foreground">Varies</span>;
  }
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-destructive/10 text-destructive">
      <X className="size-4" />
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why book direct
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {siteConfig.shortName} vs. a generic booking site
          </h2>
          <p className="mt-4 text-muted-foreground">
            Marketplaces sell you a listing. We build you a trip — and stay with you the whole
            way through.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-3 bg-muted/60 text-sm font-semibold text-foreground">
            <div className="px-4 py-3.5">What you get</div>
            <div className="border-x border-border px-4 py-3.5 text-center text-primary">
              {siteConfig.shortName}
            </div>
            <div className="px-4 py-3.5 text-center text-muted-foreground">Generic site</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 items-center text-sm ${i % 2 === 1 ? "bg-muted/20" : ""}`}
            >
              <div className="px-4 py-3.5 text-foreground">{row.label}</div>
              <div className="flex justify-center border-x border-border px-4 py-3.5">
                <Cell value={row.direct} />
              </div>
              <div className="flex justify-center px-4 py-3.5">
                <Cell value={row.other} />
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
