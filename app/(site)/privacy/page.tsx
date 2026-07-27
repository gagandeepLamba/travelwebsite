import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="pb-16">
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect your personal information."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Laptop and documents on a desk"
      />
      <Container className="prose prose-neutral mx-auto max-w-3xl pt-12 sm:pt-16">
        <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

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
