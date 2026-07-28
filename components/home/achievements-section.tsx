import { CalendarDays, Globe2, Star, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, StaggerGroup } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { siteConfig } from "@/lib/constants/site";

const icons = [CalendarDays, Users, Globe2, Star];

export function AchievementsSection() {
  const yearsActive = new Date().getFullYear() - siteConfig.founded;

  return (
    <section className="relative z-0 py-12 sm:py-16">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Established excellence
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {yearsActive}+ years of crafting journeys
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Trusted by thousands of travellers — our track record speaks for itself.
          </p>
        </Reveal>

        <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 lg:grid-cols-4">
          {siteConfig.stats.map((stat, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                key={stat.label}
                delay={Math.min(i * 0.05, 0.2)}
                className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card px-4 py-6 text-center shadow-sm shadow-black/5 sm:gap-3 sm:py-8"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                  className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
                />
                <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </Reveal>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
