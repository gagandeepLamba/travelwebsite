import { z } from "zod";

export const quickInquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a valid phone number"),
  travelDate: z.string().optional(),
  days: z.string().optional(),
  persons: z.string().optional(),
  comments: z.string().max(1000).optional(),
});

export type QuickInquiryInput = z.infer<typeof quickInquirySchema>;

export const tripPlannerSchema = z.object({
  tripType: z.enum([
    "india-tours",
    "international-tours",
    "yoga-retreats",
    "luxury-trains",
    "honeymoon",
    "custom",
  ]),
  interest: z.string().min(1, "Please tell us what you're interested in"),
  travelDate: z.string().min(1, "Please choose an approximate travel date"),
  travelers: z.string().min(1, "Please select the number of travellers"),
  budget: z.string().min(1, "Please select a budget range"),
  name: z.string().min(2, "Please enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a valid phone number"),
});

export type TripPlannerInput = z.infer<typeof tripPlannerSchema>;

export const chatbotInquirySchema = z.object({
  tripType: z.enum([
    "india-tours",
    "international-tours",
    "yoga-retreats",
    "luxury-trains",
    "honeymoon",
    "custom",
  ]),
  name: z.string().min(2, "Please enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a valid phone number"),
  message: z.string().max(1000).optional(),
});

export type ChatbotInquiryInput = z.infer<typeof chatbotInquirySchema>;

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
