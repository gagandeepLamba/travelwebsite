"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/constants/site";

const DEFAULT_MESSAGE =
  "Hi Plan Our Travel India, I'd like help planning a trip.";

export function WhatsAppButton({ bottomOffsetClass = "bottom-24 sm:bottom-6" }: { bottomOffsetClass?: string }) {
  const href = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 ${bottomOffsetClass}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:animate-none" />
      <WhatsAppIcon className="size-7" />
    </motion.a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.764.462 3.42 1.27 4.855L2 22l5.29-1.288A9.96 9.96 0 0 0 12.04 22c5.522 0 10-4.477 10-10s-4.478-10-10-10zm0 18.2a8.17 8.17 0 0 1-4.166-1.14l-.299-.178-3.14.764.838-3.062-.194-.314A8.19 8.19 0 0 1 3.84 12c0-4.529 3.68-8.2 8.2-8.2 4.52 0 8.2 3.671 8.2 8.2 0 4.529-3.68 8.2-8.2 8.2z" />
    </svg>
  );
}
