import type { PackageCategorySlug } from "@/lib/constants/site";

export interface TourImage {
  url: string;
  alt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackage {
  slug: string;
  title: string;
  category: PackageCategorySlug;
  duration: { nights: number; days: number };
  destinations: string[];
  price: { amount: number; currency: "INR"; unit: "per person" | "per couple" };
  rating: number;
  reviewCount: number;
  summary: string;
  highlights: string[];
  heroImage: TourImage;
  gallery: TourImage[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  bestSeason: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  packageTitle: string;
  quote: string;
  rating: number;
  avatar: string;
  videoUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "Booking" | "Payments" | "Travel" | "Yoga & Wellness" | "General";
}
