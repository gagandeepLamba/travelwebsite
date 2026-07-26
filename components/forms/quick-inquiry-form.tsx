"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  quickInquirySchema,
  type QuickInquiryInput,
} from "@/lib/validations/inquiry";
import { cn } from "@/lib/utils";

export function QuickInquiryForm({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickInquiryInput>({ resolver: zodResolver(quickInquirySchema) });

  async function onSubmit(data: QuickInquiryInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "quick-inquiry" }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Thanks! Our travel expert will call you shortly.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        "grid grid-cols-1 gap-4 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:grid-cols-2 sm:p-8",
        className
      )}
    >
      <div className="sm:col-span-2">
        <h3 className="font-heading text-xl font-semibold text-foreground">
          Plan your trip in 60 seconds
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Share a few details and a travel expert calls you back — no spam, ever.
        </p>
      </div>

      <Field id="qi-name" label="Full name" error={errors.name?.message}>
        <Input
          id="qi-name"
          {...register("name")}
          placeholder="Ananya Sharma"
          aria-invalid={!!errors.name}
        />
      </Field>

      <Field id="qi-email" label="Email" error={errors.email?.message}>
        <Input
          id="qi-email"
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
        />
      </Field>

      <Field id="qi-phone" label="Phone / WhatsApp" error={errors.phone?.message}>
        <Input
          id="qi-phone"
          {...register("phone")}
          placeholder="+91 98765 43210"
          aria-invalid={!!errors.phone}
        />
      </Field>

      <Field id="qi-date" label="Preferred travel date" error={errors.travelDate?.message}>
        <Input id="qi-date" {...register("travelDate")} type="date" />
      </Field>

      <Field id="qi-days" label="No. of days" error={errors.days?.message}>
        <Input id="qi-days" {...register("days")} placeholder="e.g. 6" inputMode="numeric" />
      </Field>

      <Field id="qi-persons" label="No. of travellers" error={errors.persons?.message}>
        <Input id="qi-persons" {...register("persons")} placeholder="e.g. 2" inputMode="numeric" />
      </Field>

      <div className="sm:col-span-2">
        <Label htmlFor="comments" className="mb-1.5">
          Tell us about your dream trip
        </Label>
        <Textarea
          id="comments"
          {...register("comments")}
          rows={3}
          placeholder="Destinations, budget, interests…"
        />
        {errors.comments && (
          <p className="mt-1 text-xs text-destructive">{errors.comments.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="sm:col-span-2 rounded-full">
        {submitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Get a free quote
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5">
        {label}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
