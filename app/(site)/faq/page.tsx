import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageBanner } from "@/components/layout/page-banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { faqs } from "@/lib/data/faqs";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about booking, payments, travel documents and our yoga retreats.",
  alternates: { canonical: "/faq" },
};

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export default function FaqPage() {
  return (
    <div className="pb-16">
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "FAQ", url: `${siteConfig.url}/faq` },
        ])}
      />
      <PageBanner
        eyebrow="Need to know"
        title="Frequently asked questions"
        description="Can't find what you're looking for? Chat with us on the widget in the corner, or reach out on WhatsApp."
        image="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80&auto=format&fit=crop"
        imageAlt="Traveller planning a trip with a notebook and coffee"
      />
      <Container className="mx-auto max-w-3xl pt-12 sm:pt-16">
        <div className="space-y-10">
          {categories.map((category) => (
            <Reveal key={category}>
              <h2 className="font-heading text-lg font-semibold text-foreground">{category}</h2>
              <Accordion className="mt-2">
                {faqs
                  .filter((f) => f.category === category)
                  .map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
