"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedPackages } from "@/lib/data/packages";
import { faqs } from "@/lib/data/faqs";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: ReactNode;
}

interface QuickReply {
  label: string;
  onSelect: () => void;
}

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
  "Hi Plan Our Travel India, I'd like help planning a trip."
)}`;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  function handleToggle() {
    if (!open) {
      trackEvent("chat_widget_open");
      if (!hasOpenedOnce) {
        setHasOpenedOnce(true);
        pushBot(greetingMessage());
        setQuickReplies(rootQuickReplies());
      }
    }
    setOpen((v) => !v);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function pushBot(content: ReactNode) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content }]);
  }

  function pushUser(content: ReactNode) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content }]);
  }

  function rootQuickReplies(): QuickReply[] {
    return [
      { label: "🏝️ Popular packages", onSelect: showPackages },
      { label: "💬 Get a custom quote", onSelect: showQuote },
      { label: "❓ FAQs", onSelect: showFaqCategories },
      { label: "📱 Talk to a human", onSelect: showWhatsApp },
    ];
  }

  function showPackages() {
    pushUser("Show me popular packages");
    const featured = getFeaturedPackages().slice(0, 4);
    pushBot(
      <div className="flex flex-col gap-2">
        <p>Here are a few traveller favourites:</p>
        <div className="flex flex-col gap-1.5">
          {featured.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {pkg.title}
              <span className="block text-xs font-normal text-muted-foreground">
                {pkg.duration.nights}N/{pkg.duration.days}D · from ₹{pkg.price.amount.toLocaleString("en-IN")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
    setQuickReplies([
      { label: "See all packages", onSelect: () => (window.location.href = "/packages") },
      ...backToMenu(),
    ]);
  }

  function showQuote() {
    pushUser("I want a custom quote");
    pushBot(
      "Tell us your destination, travel dates and group size on our trip planner, and a travel expert will get back with a tailored itinerary within a day."
    );
    setQuickReplies([
      { label: "Open trip planner", onSelect: () => (window.location.href = "/contact") },
      ...backToMenu(),
    ]);
  }

  function showWhatsApp() {
    pushUser("Talk to a human");
    pushBot("Sure — tap below to continue this conversation with our travel team on WhatsApp.");
    setQuickReplies([
      { label: "Open WhatsApp", onSelect: () => window.open(whatsappHref, "_blank") },
      ...backToMenu(),
    ]);
  }

  function showFaqCategories() {
    pushUser("I have a question");
    const categories = Array.from(new Set(faqs.map((f) => f.category)));
    pushBot("What's your question about?");
    setQuickReplies([
      ...categories.map((cat) => ({
        label: cat,
        onSelect: () => showFaqForCategory(cat),
      })),
      ...backToMenu(),
    ]);
  }

  function showFaqForCategory(category: string) {
    pushUser(category);
    const matches = faqs.filter((f) => f.category === category).slice(0, 3);
    pushBot(
      <div className="flex flex-col gap-2">
        {matches.map((f) => (
          <div key={f.question}>
            <p className="text-sm font-semibold text-foreground">{f.question}</p>
            <p className="text-sm text-muted-foreground">{f.answer}</p>
          </div>
        ))}
      </div>
    );
    setQuickReplies([
      { label: "See full FAQ page", onSelect: () => (window.location.href = "/faq") },
      ...backToMenu(),
    ]);
  }

  function backToMenu(): QuickReply[] {
    return [{ label: "⟵ Main menu", onSelect: () => showMainMenu() }];
  }

  function showMainMenu() {
    pushBot("What else can I help with?");
    setQuickReplies(rootQuickReplies());
  }

  function greetingMessage() {
    return `Namaste! I'm the ${siteConfig.shortName} assistant. Ask me about packages, pricing or anything else — or pick an option below.`;
  }

  function handleFreeText(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushUser(trimmed);
    setInputValue("");

    const lower = trimmed.toLowerCase();
    const scored = faqs
      .map((f) => {
        const haystack = `${f.question} ${f.answer}`.toLowerCase();
        const words = lower.split(/\s+/).filter((w) => w.length > 3);
        const score = words.reduce((acc, w) => (haystack.includes(w) ? acc + 1 : acc), 0);
        return { f, score };
      })
      .sort((a, b) => b.score - a.score);

    const best = scored[0];
    if (best && best.score > 0) {
      pushBot(
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">{best.f.question}</p>
          <p>{best.f.answer}</p>
        </div>
      );
      setQuickReplies([
        { label: "That helped, thanks!", onSelect: () => showMainMenu() },
        ...backToMenu(),
      ]);
    } else {
      pushBot(
        "I couldn't find an exact answer for that. Our travel team can help directly — chat on WhatsApp or leave your details on the contact form."
      );
      setQuickReplies([
        { label: "Open WhatsApp", onSelect: () => window.open(whatsappHref, "_blank") },
        { label: "Open contact form", onSelect: () => (window.location.href = "/contact") },
        ...backToMenu(),
      ]);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() =>
          setOpen((v) => {
            if (!v) trackEvent("chat_widget_open");
            return !v;
          })
        }
        className="fixed right-5 bottom-42 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 sm:bottom-24"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>
        {!open && !hasOpenedOnce && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
            1
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-3 bottom-58 z-40 flex h-[min(32rem,70vh)] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-popover shadow-2xl sm:right-5 sm:bottom-40"
          >
            <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="size-4.5" />
              </span>
              <div className="min-w-0">
                <p id={titleId} className="truncate font-heading text-sm font-semibold">
                  {siteConfig.shortName} Assistant
                </p>
                <p className="text-xs text-primary-foreground/80">Usually replies instantly</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "bot"
                      ? "bg-muted text-foreground"
                      : "ml-auto bg-primary text-primary-foreground"
                  )}
                >
                  {m.content}
                </div>
              ))}
            </div>

            {quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={qr.onSelect}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFreeText(inputValue);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question…"
                className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0" aria-label="Send message">
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
