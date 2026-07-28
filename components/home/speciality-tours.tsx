import Link from "next/link";
import {
  Flower2,
  Heart,
  Landmark,
  PawPrint,
  PersonStanding,
  Ship,
  TrainFront,
  Venus,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";

const specialityTours = [
  { label: "Senior Tours", icon: PersonStanding, href: "/packages" },
  { label: "Women Special", icon: Venus, href: "/packages" },
  { label: "Pilgrimage", icon: Landmark, href: "/packages?category=spiritual-tours" },
  { label: "Spiritual", icon: Flower2, href: "/packages?category=yoga-retreats" },
  { label: "Wildlife Tours", icon: PawPrint, href: "/packages" },
  { label: "Honeymoon", icon: Heart, href: "/packages?category=honeymoon" },
  { label: "Cruise Tours", icon: Ship, href: "/packages" },
  { label: "Luxury Trains", icon: TrainFront, href: "/packages?category=luxury-trains" },
];

export function SpecialityTours() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Catered experiences
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Speciality tours
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            From wellness retreats to luxury rail journeys, find the escape tailored to your
            lifestyle.
          </p>
        </Reveal>

        <StaggerGroup className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2 sm:mt-10 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-8">
          {specialityTours.map((tour) => (
            <Reveal key={tour.label} className="shrink-0">
              <Link
                href={tour.href}
                className="group flex w-24 flex-col items-center gap-2.5 sm:w-full"
              >
                <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:size-18">
                  <tour.icon className="size-7" />
                </span>
                <span className="text-center text-xs font-medium text-foreground sm:text-sm">
                  {tour.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
