import Link from "next/link";
import { ChevronsRight, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import { Container } from "@/components/layout/container";
import { footerLinks, siteConfig } from "@/lib/constants/site";

const socialLinks = [
  { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: siteConfig.social.twitter, label: "Twitter", icon: TwitterIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: siteConfig.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: siteConfig.social.youtube, label: "YouTube", icon: YoutubeIcon },
];

function ColumnHeading({ children }: { children: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-background">
        {children}
      </h3>
      <div className="mt-2 flex h-0.5 w-20 overflow-hidden rounded-full">
        <span className="w-1/2 bg-primary" />
        <span className="w-1/2 bg-destructive" />
      </div>
    </div>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <ColumnHeading>{title}</ColumnHeading>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="flex items-start gap-1.5 text-sm text-background/80 transition-colors hover:text-primary"
            >
              <ChevronsRight className="mt-0.5 size-3.5 shrink-0 text-destructive" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaFooter() {
  return (
    <section className="bg-foreground text-background">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <LinkColumn title="Corporate Information" links={footerLinks.corporate} />
          <LinkColumn title="Our Services" links={footerLinks.services} />
          <LinkColumn title="Packages" links={footerLinks.packages} />
          <LinkColumn title="Customer Care" links={footerLinks.customerCare} />

          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <div className="space-y-3 text-sm text-background/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {siteConfig.contact.address.full}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <span className="font-medium text-background">Office</span>:{" "}
                {siteConfig.contact.phone}
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0 text-primary" />
                <span className="font-medium text-background">WhatsApp</span>:{" "}
                {siteConfig.contact.whatsapp}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <span className="font-medium text-background">Mobile</span>:{" "}
                {siteConfig.contact.mobile}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <span className="font-medium text-background">Email</span>:{" "}
                {siteConfig.contact.email}
              </p>
            </div>

            <div className="mt-5 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-md border border-background/20 text-background/80 transition-colors hover:border-primary hover:text-primary"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-primary text-primary-foreground">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-4 text-xs">
          <p>
            Copyright © {new Date().getFullYear()} - {siteConfig.legalName}. All rights reserved.
          </p>
          {/* Placeholder pending a real registration/trust badge image from the client */}
          <div className="flex items-center gap-1.5 rounded-md border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 font-medium">
            <ShieldCheck className="size-4" />
            Registered Company
          </div>
        </Container>
      </div>
    </section>
  );
}
