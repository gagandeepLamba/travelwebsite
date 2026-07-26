"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedPackages } from "@/lib/data/packages";
import { faqs } from "@/lib/data/faqs";
import { packageCategories, siteConfig } from "@/lib/constants/site";
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

type FlowStep = "idle" | "awaiting-name" | "awaiting-email" | "awaiting-phone" | "awaiting-message" | "submitting";

interface LeadData {
  tripType?: string;
  tripTypeLabel?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
  "Hi Plan Our Travel India, I'd like help planning a trip."
)}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [flowStep, setFlowStep] = useState<FlowStep>("idle");
  const [leadData, setLeadData] = useState<LeadData>({});
  // Quick-reply callbacks (e.g. the "Skip" button) are created inside an
  // earlier render's closure, so they can't rely on the `leadData` state
  // variable staying fresh — a ref sidesteps that stale-closure trap.
  const leadDataRef = useRef<LeadData>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  function updateLeadData(patch: Partial<LeadData>) {
    leadDataRef.current = { ...leadDataRef.current, ...patch };
    setLeadData(leadDataRef.current);
  }

  function handleToggle() {
    if (!open) {
      trackEvent("chat_widget_open");
      if (!hasOpenedOnce) {
        setHasOpenedOnce(true);
        void startConversation();
      }
    }
    setOpen((v) => !v);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, botTyping]);

  function pushBot(content: ReactNode) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content }]);
  }

  function pushUser(content: ReactNode) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content }]);
  }

  /** Shows a brief typing indicator before the bot's message lands, for a real-time feel. */
  async function pushBotTyping(content: ReactNode, delay = 650) {
    setBotTyping(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    setBotTyping(false);
    pushBot(content);
  }

  async function startConversation() {
    await pushBotTyping(
      `Namaste! I'm the ${siteConfig.shortName} assistant. Let's find the right trip for you — what are you interested in?`,
      500
    );
    setQuickReplies(tripTypeQuickReplies());
  }

  function tripTypeQuickReplies(): QuickReply[] {
    return [
      ...packageCategories.map((cat) => ({
        label: cat.label,
        onSelect: () => selectTripType(cat.slug, cat.label),
      })),
      { label: "✨ Something custom", onSelect: () => selectTripType("custom", "Something custom") },
      { label: "❓ I have a question instead", onSelect: () => showMainMenu() },
    ];
  }

  async function selectTripType(value: string, label: string) {
    pushUser(label);
    leadDataRef.current = {};
    updateLeadData({ tripType: value, tripTypeLabel: label });
    setQuickReplies([]);
    await pushBotTyping(`Great choice! What's your name?`);
    setFlowStep("awaiting-name");
  }

  function rootQuickReplies(): QuickReply[] {
    return [
      { label: "🏝️ Popular packages", onSelect: showPackages },
      { label: "💬 Get a custom quote", onSelect: showQuote },
      { label: "❓ FAQs", onSelect: showFaqCategories },
      { label: "📱 Talk to a human", onSelect: showWhatsApp },
    ];
  }

  async function showPackages() {
    pushUser("Show me popular packages");
    const featured = getFeaturedPackages().slice(0, 4);
    await pushBotTyping(
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

  async function showQuote() {
    pushUser("I want a custom quote");
    await pushBotTyping("Sure — what kind of trip are you interested in?");
    setQuickReplies(tripTypeQuickReplies());
  }

  async function showWhatsApp() {
    pushUser("Talk to a human");
    await pushBotTyping("Sure — tap below to continue this conversation with our travel team on WhatsApp.");
    setQuickReplies([
      { label: "Open WhatsApp", onSelect: () => window.open(whatsappHref, "_blank") },
      ...backToMenu(),
    ]);
  }

  async function showFaqCategories() {
    pushUser("I have a question");
    const categories = Array.from(new Set(faqs.map((f) => f.category)));
    await pushBotTyping("What's your question about?");
    setQuickReplies([
      ...categories.map((cat) => ({
        label: cat,
        onSelect: () => showFaqForCategory(cat),
      })),
      ...backToMenu(),
    ]);
  }

  async function showFaqForCategory(category: string) {
    pushUser(category);
    const matches = faqs.filter((f) => f.category === category).slice(0, 3);
    await pushBotTyping(
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

  async function showMainMenu() {
    setFlowStep("idle");
    await pushBotTyping("What else can I help with?");
    setQuickReplies(rootQuickReplies());
  }

  async function submitLead(message: string) {
    const lead = leadDataRef.current;
    setFlowStep("submitting");
    setQuickReplies([]);
    await pushBotTyping("Got it — sending this to our travel team…", 500);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "chatbot",
          tripType: lead.tripType,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          message: message || undefined,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("generate_lead", { form: "chatbot", trip_type: lead.tripType });
      await pushBotTyping(
        `All set, ${lead.name?.split(" ")[0] ?? "there"}! A travel expert will reach out to you at ${lead.email} shortly. 🎉`
      );
      setQuickReplies(backToMenu());
    } catch {
      await pushBotTyping(
        "Something went wrong sending that through — please try WhatsApp instead so we don't lose your details."
      );
      setQuickReplies([
        { label: "Open WhatsApp", onSelect: () => window.open(whatsappHref, "_blank") },
        ...backToMenu(),
      ]);
    } finally {
      setFlowStep("idle");
    }
  }

  async function handleFreeText(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushUser(trimmed);
    setInputValue("");

    if (flowStep === "awaiting-name") {
      if (trimmed.length < 2) {
        await pushBotTyping("That doesn't quite look like a name — could you share your full name?");
        return;
      }
      updateLeadData({ name: trimmed });
      await pushBotTyping(`Thanks, ${trimmed.split(" ")[0]}! What's the best email to reach you at?`);
      setFlowStep("awaiting-email");
      return;
    }

    if (flowStep === "awaiting-email") {
      if (!EMAIL_RE.test(trimmed)) {
        await pushBotTyping("Hmm, that doesn't look like a valid email — mind double-checking?");
        return;
      }
      updateLeadData({ email: trimmed });
      await pushBotTyping("And a phone or WhatsApp number we can reach you on?");
      setFlowStep("awaiting-phone");
      return;
    }

    if (flowStep === "awaiting-phone") {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 7) {
        await pushBotTyping("That number looks too short — could you share a valid phone number?");
        return;
      }
      updateLeadData({ phone: trimmed });
      await pushBotTyping("Anything specific you'd like us to know? (or tap Skip)");
      setQuickReplies([{ label: "Skip", onSelect: () => submitLead("") }]);
      setFlowStep("awaiting-message");
      return;
    }

    if (flowStep === "awaiting-message") {
      await submitLead(trimmed);
      return;
    }

    // Idle — fall back to lightweight FAQ keyword matching.
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
      await pushBotTyping(
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
      await pushBotTyping(
        "I couldn't find an exact answer for that. Our travel team can help directly — chat on WhatsApp or leave your details on the contact form."
      );
      setQuickReplies([
        { label: "Open WhatsApp", onSelect: () => window.open(whatsappHref, "_blank") },
        { label: "Open contact form", onSelect: () => (window.location.href = "/contact") },
        ...backToMenu(),
      ]);
    }
  }

  const placeholder =
    flowStep === "awaiting-name"
      ? "Type your name…"
      : flowStep === "awaiting-email"
        ? "Type your email…"
        : flowStep === "awaiting-phone"
          ? "Type your phone number…"
          : flowStep === "awaiting-message"
            ? "Type a message (optional)…"
            : "Type your question…";

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={handleToggle}
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
              {botTyping && (
                <div className="flex w-fit items-center gap-1 rounded-2xl bg-muted px-3.5 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-muted-foreground/60"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
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
                void handleFreeText(inputValue);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                disabled={flowStep === "submitting"}
                className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full shrink-0"
                aria-label="Send message"
                disabled={flowStep === "submitting"}
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
