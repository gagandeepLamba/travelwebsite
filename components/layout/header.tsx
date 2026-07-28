"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Mail, MessageCircle, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import { packageCategories, siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Hotel Booking", href: "/hotel-booking" },
  { label: "Flight Booking", href: "/flight-booking" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

const topbarSocialLinks = [
  { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: siteConfig.social.twitter, label: "Twitter", icon: TwitterIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: siteConfig.social.youtube, label: "YouTube", icon: YoutubeIcon },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="hidden bg-foreground text-background sm:block">
        <Container className="flex h-9 items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
            >
              <Mail className="size-3.5" />
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.contact.phoneHref}
              className="hidden items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 md:flex"
            >
              <Phone className="size-3.5" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100 md:flex"
            >
              <MessageCircle className="size-3.5" />
              {siteConfig.contact.whatsapp}
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            {topbarSocialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <s.icon className="size-3.5" />
              </a>
            ))}
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "w-full bg-primary transition-shadow duration-300",
          scrolled && "shadow-md shadow-black/10"
        )}
      >
        <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded-full bg-background px-2.5 py-1.5 shadow-sm sm:px-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary font-heading text-base font-semibold text-primary-foreground sm:size-10">
              PT
            </span>
            <span className="hidden font-heading text-lg font-semibold leading-tight text-foreground sm:block">
              {siteConfig.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-white/10 hover:text-primary-foreground"
            >
              Home
            </Link>

            <div className="group relative">
              <button
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-white/10 hover:text-primary-foreground"
                aria-haspopup="true"
              >
                Tours
                <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 rounded-2xl border border-border bg-popover p-2 opacity-0 shadow-xl ring-1 ring-foreground/5 transition-all duration-150 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100">
                {packageCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/packages?category=${cat.slug}`}
                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="block text-sm font-medium text-foreground">
                      {cat.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {cat.description}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/packages"
                  className="mt-1 block rounded-xl px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
                >
                  View all packages →
                </Link>
              </div>
            </div>

            {primaryLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-white/10 hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 rounded-full bg-background py-1.5 pl-1.5 pr-4 shadow-sm"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Phone className="size-4" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Call Us Now
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {siteConfig.contact.phone}
                </span>
              </span>
            </a>
            <Button
              size="lg"
              className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Plan My Trip
            </Button>
          </div>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4">
              {primaryLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
              <motion.div
                initial={false}
                className="mt-2 rounded-xl border border-border bg-muted/40 p-2"
              >
                <p className="px-2 pb-1 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Tour categories
                </p>
                {packageCategories.map((cat) => (
                  <SheetClose
                    key={cat.slug}
                    render={
                      <Link
                        href={`/packages?category=${cat.slug}`}
                        className="block rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-background"
                      />
                    }
                  >
                    {cat.label}
                  </SheetClose>
                ))}
              </motion.div>
            </nav>
            <SheetFooterActions />
          </SheetContent>
        </Sheet>
        </Container>
      </div>
    </header>
  );
}

function SheetFooterActions() {
  return (
    <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
      <a
        href={siteConfig.contact.phoneHref}
        className="flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium text-foreground"
      >
        <Phone className="size-4" />
        {siteConfig.contact.phone}
      </a>
      <SheetClose
        render={
          <Link
            href="/contact"
            className="flex items-center justify-center rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
          />
        }
      >
        Plan My Trip
      </SheetClose>
    </div>
  );
}
