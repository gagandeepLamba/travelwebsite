"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { siteConfig } from "@/lib/constants/site";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80&auto=format&fit=crop",
    alt: "The Taj Mahal at sunrise",
    eyebrow: "Golden Triangle",
    title: "Where every sunrise feels like a postcard",
  },
  {
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1920&q=80&auto=format&fit=crop",
    alt: "Houseboat on Kerala's backwaters",
    eyebrow: "Kerala Backwaters",
    title: "Slow down, and let the backwaters carry you",
  },
  {
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80&auto=format&fit=crop",
    alt: "Hawa Mahal, Jaipur",
    eyebrow: "Royal Rajasthan",
    title: "Palaces, forts and desert sunsets await",
  },
  {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80&auto=format&fit=crop",
    alt: "Dubai skyline at dusk",
    eyebrow: "Dubai City Lights",
    title: "Take the getaway you've been putting off",
  },
];

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || shouldReduceMotion) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 5500);
    return () => clearInterval(interval);
  }, [api, shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden">
      <Carousel setApi={setApi} opts={{ loop: true }} className="absolute inset-0">
        <CarouselContent className="ml-0 h-[86vh] min-h-[34rem] sm:h-[92vh]">
          {slides.map((slide, i) => (
            <CarouselItem key={slide.image} className="relative h-full pl-0">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: current === i ? 1.08 : 1 }}
                transition={{ duration: 6, ease: "linear" }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative flex h-[86vh] min-h-[34rem] flex-col justify-end sm:h-[92vh]">
        <Container className="pb-28 sm:pb-32">
          <motion.p
            key={`eyebrow-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm"
          >
            {slides[current].eyebrow}
          </motion.p>
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-4 max-w-2xl font-heading text-4xl font-semibold leading-[1.1] text-white sm:text-6xl"
          >
            {slides[current].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-4 max-w-lg text-base text-white/85 sm:text-lg"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              className="rounded-full px-6 text-base"
              render={<Link href="/contact" />}
            >
              Plan my trip <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 px-6 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              render={<Link href="/testimonials" />}
            >
              <PlayCircle className="size-4" /> Traveller stories
            </Button>
          </motion.div>

          <div className="mt-2 flex gap-1.5 pt-8">
            {slides.map((slide, i) => (
              <button
                key={slide.image}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  current === i ? "w-8 bg-white" : "w-4 bg-white/40"
                }`}
              />
            ))}
          </div>
        </Container>
      </div>

      <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-md">
        <Container className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
                className="font-heading text-2xl font-semibold text-white sm:text-3xl"
              />
              <p className="mt-0.5 text-xs text-white/70 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
