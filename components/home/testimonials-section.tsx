"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Traveller stories
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Loved by thousands of travellers
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel opts={{ align: "start", loop: true }} className="mt-10">
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="sm:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm shadow-black/5">
                    <Quote className="size-7 text-primary/30" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                      {t.quote}
                    </p>
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
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3.5 ${
                              i < Math.round(t.rating) ? "fill-gold text-gold" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex justify-center gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}
