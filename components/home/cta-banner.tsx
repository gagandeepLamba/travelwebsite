import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/constants/site";

export function CtaBanner() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gold/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <h2 className="relative font-heading text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Your next journey starts with one message
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Tell us where you'd love to go — we'll take care of the rest, from the first flight to
            the last sunset.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-6 text-base"
              render={<Link href="/contact" />}
            >
              Start planning <ArrowRight className="size-4" />
            </Button>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary-foreground/30 px-6 py-2.5 text-base font-medium text-primary-foreground hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
