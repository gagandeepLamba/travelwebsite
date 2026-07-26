import Link from "next/link";
import { MessageSquareText, Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur-md sm:hidden">
      <a
        href={siteConfig.contact.phoneHref}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-foreground/80"
      >
        <Phone className="size-4.5" />
        Call
      </a>
      <a
        href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 border-x border-border py-2.5 text-xs font-medium text-foreground/80"
      >
        <MessageSquareText className="size-4.5" />
        WhatsApp
      </a>
      <Link
        href="/contact"
        className="flex flex-col items-center justify-center gap-0.5 bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
      >
        Enquire Now
      </Link>
    </div>
  );
}
