import { Hero } from "@/components/home/hero";
import { QuoteSection } from "@/components/home/quote-section";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { ComparisonSection } from "@/components/home/comparison-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <QuoteSection />
      <ComparisonSection />
      <TestimonialsSection />
      <BlogPreview />
      <CtaBanner />
    </>
  );
}
