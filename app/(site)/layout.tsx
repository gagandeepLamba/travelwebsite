import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { MegaFooter } from "@/components/layout/mega-footer";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { WhatsAppButton } from "@/components/chat/whatsapp-button";
import { ChatWidget } from "@/components/chat/chat-widget";
import { JsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/seo/google-analytics";
import { organizationSchema } from "@/lib/seo/schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <JsonLd data={organizationSchema()} />
      <GoogleAnalytics />
      <Header />
      <main>{children}</main>
      <MegaFooter />
      <Footer />
      <StickyMobileCta />
      <WhatsAppButton />
      <ChatWidget />
      <BackToTop />
      <Toaster theme="light" />
    </TooltipProvider>
  );
}
