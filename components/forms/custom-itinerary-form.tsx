"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customItinerarySchema, type CustomItineraryInput } from "@/lib/validations/inquiry";
import { trackEvent } from "@/lib/analytics";

const countryOptions = [
  "India",
  "Nepal",
  "Bhutan",
  "Sri Lanka",
  "Dubai (UAE)",
  "Thailand",
  "Singapore",
  "Malaysia",
  "Mauritius",
  "Maldives",
  "Multiple countries",
  "Not sure yet",
];

const steps = [
  { title: "Where would you like to go, and for how many days?" },
  { title: "What would you like to do on each day?" },
  { title: "Where should we send your itinerary?" },
];

export function CustomItineraryForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CustomItineraryInput>({
    resolver: zodResolver(customItinerarySchema),
    defaultValues: {
      country: "",
      days: 5,
      dayPlans: Array.from({ length: 5 }, (_, i) => ({ day: i + 1, plan: "" })),
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "dayPlans" });
  const days = useWatch({ control, name: "days" });

  useEffect(() => {
    const target = Math.max(1, Math.min(60, Number(days) || 0));
    if (target > fields.length) {
      for (let i = fields.length; i < target; i++) append({ day: i + 1, plan: "" });
    } else if (target < fields.length) {
      for (let i = fields.length - 1; i >= target; i--) remove(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const isLastStep = step === steps.length - 1;

  async function goNext() {
    const fieldsByStep: (keyof CustomItineraryInput)[][] = [
      ["country", "days"],
      ["dayPlans"],
      ["name", "email", "phone"],
    ];
    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: CustomItineraryInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "custom-itinerary" }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("generate_lead", { form: "custom_itinerary", country: data.country });
      setSubmitted(true);
      toast.success("Got it! Your custom itinerary request is on its way to our team.");
    } catch {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-10 text-center shadow-xl shadow-black/5">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-7" />
        </span>
        <h3 className="font-heading text-xl font-semibold text-foreground">
          Thanks — your custom itinerary request is in!
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          One of our travel experts will review your day-by-day plan and get back to you with a
          tailored itinerary and pricing.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{Math.round(((step + 1) / steps.length) * 100)}% complete</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={false}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {steps[step].title}
            </h3>

            <div className="mt-5">
              {step === 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5">Country / destination</Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryOptions.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.country && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.country.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="ci-days" className="mb-1.5">
                      Number of days
                    </Label>
                    <Input
                      id="ci-days"
                      type="number"
                      min={1}
                      max={60}
                      {...register("days", { valueAsNumber: true })}
                    />
                    {errors.days && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.days.message}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="max-h-96 space-y-4 overflow-y-auto pr-1">
                  {fields.map((field, index) => (
                    <div key={field.id}>
                      <Label htmlFor={`ci-day-${index}`} className="mb-1.5">
                        Day {index + 1}
                      </Label>
                      <Textarea
                        id={`ci-day-${index}`}
                        rows={2}
                        placeholder="e.g. Arrive & check in, city sightseeing, a specific site you want to see…"
                        {...register(`dayPlans.${index}.plan` as const)}
                      />
                    </div>
                  ))}
                  {errors.dayPlans?.root && (
                    <p className="text-xs text-destructive">
                      {errors.dayPlans.root.message ?? "Please tell us about at least one day"}
                    </p>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="ci-name" className="mb-1.5">
                      Full name
                    </Label>
                    <Input id="ci-name" {...register("name")} placeholder="Your name" />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="ci-email" className="mb-1.5">
                      Email
                    </Label>
                    <Input id="ci-email" type="email" {...register("email")} placeholder="you@example.com" />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="ci-phone" className="mb-1.5">
                      Phone / WhatsApp
                    </Label>
                    <Input id="ci-phone" {...register("phone")} placeholder="+91 98765 43210" />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="ci-notes" className="mb-1.5">
                      Anything else we should know? (optional)
                    </Label>
                    <Textarea
                      id="ci-notes"
                      rows={3}
                      placeholder="Budget, hotel star rating, dietary needs…"
                      {...register("notes")}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-between gap-3 pr-16 sm:pr-0">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={step === 0}
            className="rounded-full"
          >
            <ArrowLeft className="size-4" /> Back
          </Button>

          {isLastStep ? (
            <Button type="submit" disabled={submitting} className="rounded-full">
              {submitting ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              Submit request
            </Button>
          ) : (
            <Button type="button" onClick={goNext} className="rounded-full">
              Next <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
