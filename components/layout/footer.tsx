import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import { Container } from "@/components/layout/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerLinks, siteConfig } from "@/lib/constants/site";

const socialLinks = [
  { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: siteConfig.social.youtube, label: "YouTube", icon: YoutubeIcon },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 pb-24 sm:pb-0">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary font-heading text-base font-semibold text-primary-foreground">
                PT
              </span>
              <span className="font-heading text-lg font-semibold text-foreground">
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Corporate" links={footerLinks.corporate} />
          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Packages" links={footerLinks.packages} />
          <FooterColumn title="Customer Care" links={footerLinks.customerCare} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2.5 text-sm text-muted-foreground">
            <a href={siteConfig.contact.phoneHref} className="flex items-center gap-2 hover:text-primary">
              <Phone className="size-4 shrink-0" /> {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-primary">
              <Mail className="size-4 shrink-0" /> {siteConfig.contact.email}
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="size-4 shrink-0 mt-0.5" /> {siteConfig.contact.address.full}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Stay in the loop
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Handpicked deals and travel inspiration, straight to your inbox.
            </p>
            <NewsletterForm className="mt-4 max-w-xs" />
          </div>

          <div className="rounded-2xl border border-border bg-background/60 p-4 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5 font-medium text-foreground">
              <ShieldCheck className="size-4 text-primary" /> Booking safely
            </p>
            <p className="mt-2">
              We will never ask you to transfer money to a personal bank account. Always verify
              official payment details before paying, and report suspicious requests to{" "}
              {siteConfig.contact.email}.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {siteConfig.trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border px-2.5 py-1 font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
