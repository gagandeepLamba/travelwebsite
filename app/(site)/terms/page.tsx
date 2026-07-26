import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for booking tours and services with ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="prose prose-neutral mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">1. Bookings & Payments</h2>
            <p className="mt-2">
              A booking is confirmed once the applicable deposit is received through our secure
              payment gateway. Full payment terms, cancellation windows and refund conditions are
              shared in writing at the time of booking and vary by package.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">2. Pricing</h2>
            <p className="mt-2">
              Package prices are per person (or per couple where indicated) and subject to change
              based on travel dates, availability and currency fluctuations for international
              packages. Confirmed bookings are locked at the quoted price.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">3. Traveller Responsibilities</h2>
            <p className="mt-2">
              Travellers are responsible for holding valid travel documents, visas and any required
              vaccinations for their itinerary. {siteConfig.shortName} assists with documentation
              guidance but does not guarantee visa approval.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">4. Liability</h2>
            <p className="mt-2">
              {siteConfig.legalName} acts as an agent for third-party service providers (airlines,
              hotels, transport operators) and is not liable for delays, losses or events outside
              its reasonable control.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">5. Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-primary underline">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
