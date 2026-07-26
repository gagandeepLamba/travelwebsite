import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="prose prose-neutral mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">Information we collect</h2>
            <p className="mt-2">
              When you submit an enquiry, trip planner request or newsletter signup, we collect the
              details you provide — typically your name, email, phone number and trip preferences —
              to respond to your request.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">How we use it</h2>
            <p className="mt-2">
              Your information is used solely to plan and manage your trip, respond to enquiries,
              and — if you opt in — send occasional travel updates. We do not sell your data to
              third parties.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">Payments</h2>
            <p className="mt-2">
              Payments are processed through a secure, PCI-compliant gateway. We never store your
              full card details, and we will never ask you to transfer money to a personal bank
              account.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">Your choices</h2>
            <p className="mt-2">
              You can unsubscribe from marketing emails at any time, and can request access to or
              deletion of your data by emailing{" "}
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
