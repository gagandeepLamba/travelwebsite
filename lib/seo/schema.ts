import { siteConfig } from "@/lib/constants/site";
import type { FaqItem, TourPackage } from "@/lib/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.line1,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: "IN",
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function touristTripSchema(pkg: TourPackage) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    image: pkg.heroImage.url,
    touristType: pkg.category,
    itinerary: pkg.itinerary.map((day) => ({
      "@type": "TouristAttraction",
      name: day.title,
      description: day.description,
    })),
    offers: {
      "@type": "Offer",
      price: pkg.price.amount,
      priceCurrency: pkg.price.currency,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/packages/${pkg.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewCount,
    },
  };
}

export function articleSchema(params: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    image: params.image ? [params.image] : undefined,
    datePublished: params.publishedAt,
    dateModified: params.updatedAt ?? params.publishedAt,
    author: {
      "@type": "Person",
      name: params.authorName ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${params.slug}`,
    },
  };
}
