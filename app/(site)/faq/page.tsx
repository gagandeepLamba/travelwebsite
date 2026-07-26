import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
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
    <div className="py-12 pb-16 sm:py-16">
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "FAQ", url: `${siteConfig.url}/faq` },
        ])}
      />
      <Container className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Need to know
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-muted-foreground">
            Can't find what you're looking for? Chat with us on the widget in the corner, or reach
            out on WhatsApp.
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
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
