"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tripPlannerSchema, type TripPlannerInput } from "@/lib/validations/inquiry";
import { packageCategories } from "@/lib/constants/site";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const tripTypeOptions = [
  ...packageCategories.map((c) => ({ value: c.slug, label: c.label })),
  { value: "custom" as const, label: "Something custom" },
];

const travelerOptions = ["1", "2", "3-4", "5+"];
const budgetOptions = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
];

const steps: { key: keyof TripPlannerInput | "trip-details"; title: string }[] = [
  { key: "tripType", title: "What kind of trip are you dreaming of?" },
  { key: "interest", title: "Any destinations or experiences in mind?" },
  { key: "trip-details", title: "A few trip details" },
  { key: "name", title: "Where should we send your itinerary?" },
];

const fieldsByStep: (keyof TripPlannerInput)[][] = [
  ["tripType"],
  ["interest"],
  ["travelDate", "travelers", "budget"],
  ["name", "email", "phone"],
];

export function TripPlannerQuiz() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TripPlannerInput>({
    resolver: zodResolver(tripPlannerSchema),
    defaultValues: { tripType: undefined, interest: "", travelDate: "", travelers: "", budget: "" },
  });

  const isLastStep = step === steps.length - 1;

  async function goNext() {
    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: TripPlannerInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "trip-planner" }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("generate_lead", { form: "trip_planner", trip_type: data.tripType });
      setSubmitted(true);
      toast.success("Got it! Your travel expert will reach out shortly.");
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
          Thanks — your trip request is in!
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          A travel expert will reach out within one business day with a tailored itinerary. In the
          meantime, feel free to browse our packages.
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
                <Controller
                  name="tripType"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {tripTypeOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => field.onChange(opt.value)}
                          className={cn(
                            "rounded-xl border px-3 py-3.5 text-left text-sm font-medium transition-colors",
                            field.value === opt.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-foreground hover:border-primary/50"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                />
              )}
              {errors.tripType && step === 0 && (
                <p className="mt-2 text-xs text-destructive">Please choose an option to continue</p>
              )}

              {step === 1 && (
                <div>
                  <Label htmlFor="interest" className="mb-1.5">
                    e.g. Golden Triangle, Kerala backwaters, Dubai desert safari…
                  </Label>
                  <Input id="interest" {...register("interest")} placeholder="Tell us in a few words" />
                  {errors.interest && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.interest.message}</p>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="travelDate" className="mb-1.5">
                      Approx. travel date
                    </Label>
                    <Input id="travelDate" type="date" {...register("travelDate")} />
                    {errors.travelDate && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.travelDate.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-1.5">Travellers</Label>
                    <Controller
                      name="travelers"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {travelerOptions.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.travelers && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.travelers.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-1.5">Budget (per person)</Label>
                    <Controller
                      name="budget"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetOptions.map((b) => (
                              <SelectItem key={b} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.budget && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.budget.message}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="tp-name" className="mb-1.5">
                      Full name
                    </Label>
                    <Input id="tp-name" {...register("name")} placeholder="Your name" />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tp-email" className="mb-1.5">
                      Email
                    </Label>
                    <Input id="tp-email" type="email" {...register("email")} placeholder="you@example.com" />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tp-phone" className="mb-1.5">
                      Phone / WhatsApp
                    </Label>
                    <Input id="tp-phone" {...register("phone")} placeholder="+91 98765 43210" />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-between gap-3">
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
