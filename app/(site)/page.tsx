import { Hero } from "@/components/home/hero";
import { AchievementsSection } from "@/components/home/achievements-section";
import { SpecialityTours } from "@/components/home/speciality-tours";
import { QuoteSection } from "@/components/home/quote-section";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { BestSellingPackages } from "@/components/home/best-selling-packages";
import { ComparisonSection } from "@/components/home/comparison-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AchievementsSection />
      <SpecialityTours />
      <FeaturedPackages />
      <BestSellingPackages />
      <QuoteSection />
      <ComparisonSection />
      <TestimonialsSection />
      <BlogPreview />
      <CtaBanner />
    </>
  );
}
