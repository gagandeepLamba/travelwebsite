"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/inquiry";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(data: NewsletterInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("newsletter_signup");
      toast.success("You're subscribed — welcome aboard!");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} noValidate>
      <div className="flex gap-2">
        <input
          {...register("email")}
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          className="h-11 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <Button type="submit" size="icon-lg" className="shrink-0 rounded-full" disabled={submitting} aria-label="Subscribe">
          <Send className="size-4" />
        </Button>
      </div>
      {errors.email && (
        <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
      )}
    </form>
  );
}
