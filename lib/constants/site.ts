export const siteConfig = {
  name: "Plan Our Travel India",
  shortName: "Plan Our Travel",
  legalName: "Plan Our Travel India Pvt. Ltd.",
  tagline: "Crafting journeys across India & beyond",
  description:
    "Plan Our Travel India is a full-service travel company crafting bespoke India tours, international getaways, yoga retreats and luxury train journeys — designed around you, handled end to end.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.planourtravel.com",
  ogImage: "/og-default.jpg",
  keywords: [
    "India tour packages",
    "international tour packages",
    "yoga retreat India",
    "luxury train India",
    "Golden Triangle tour",
    "Kerala backwaters package",
    "Rajasthan tour package",
    "honeymoon packages India",
    "custom travel itinerary India",
    "travel agency Delhi",
  ],
  founded: 2012,
  contact: {
    phone: "+91-8920239200",
    phoneHref: "tel:+918920239200",
    mobile: "+91-7015213971",
    mobileHref: "tel:+917015213971",
    whatsapp: "+91-7840040998",
    whatsappNumber: "917840040998",
    email: "info@planourtravel.com",
    address: {
      line1: "Basement, NIL 4B, Malviya Nagar",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110017",
      country: "India",
      full: "Basement, NIL 4B, Malviya Nagar, New Delhi 110017, India",
    },
  },
  hours: "Mon – Sun, 9:00 AM – 9:00 IST",
  social: {
    facebook: "https://facebook.com/planourtravel",
    instagram: "https://instagram.com/planourtravel",
    twitter: "https://twitter.com/planourtravel",
    linkedin: "https://linkedin.com/company/planourtravel",
    youtube: "https://youtube.com/@planourtravel",
    pinterest: "https://pinterest.com/planourtravel",
  },
  stats: [
    { label: "Years crafting journeys", value: 13, suffix: "+" },
    { label: "Happy travellers", value: 25000, suffix: "+" },
    { label: "Destinations covered", value: 60, suffix: "+" },
    { label: "Avg. traveller rating", value: 4.8, suffix: "/5" },
  ],
  trustBadges: [
    "MCA Registered Company",
    "Secure Payment Gateway",
    "24/7 Traveller Support",
    "Handpicked Local Experiences",
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "India Tours",
    href: "/packages?category=india-tours",
  },
  {
    label: "International",
    href: "/packages?category=international-tours",
  },
  { label: "Yoga Programs", href: "/packages?category=yoga-retreats" },
  { label: "Luxury Trains", href: "/packages?category=luxury-trains" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const packageCategories = [
  {
    slug: "india-tours",
    label: "India Tours",
    description: "Golden Triangle classics, Himalayan pilgrimages and coastal escapes across India.",
  },
  {
    slug: "international-tours",
    label: "International Tours",
    description: "Dubai, Thailand, Singapore, Mauritius and Malaysia — curated getaways abroad.",
  },
  {
    slug: "yoga-retreats",
    label: "Yoga Retreats",
    description: "Certified yoga teacher training and wellness retreats in the Himalayas.",
  },
  {
    slug: "luxury-trains",
    label: "Luxury Trains",
    description: "Palace on Wheels and other iconic luxury rail journeys across Rajasthan.",
  },
  {
    slug: "honeymoon",
    label: "Honeymoon",
    description: "Romantic escapes handpicked for newlyweds, in India and abroad.",
  },
] as const;

export type PackageCategorySlug = (typeof packageCategories)[number]["slug"];

export const footerLinks = {
  corporate: [
    { label: "About Us", href: "/about" },
    { label: "Why Plan Our Travel", href: "/about#why-us" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/contact" },
  ],
  services: [
    { label: "Flight Booking", href: "/contact" },
    { label: "Hotel Booking", href: "/contact" },
    { label: "Visa Assistance", href: "/contact" },
    { label: "Custom Itineraries", href: "/contact" },
    { label: "Group & Corporate Tours", href: "/contact" },
  ],
  packages: packageCategories.map((c) => ({
    label: c.label,
    href: `/packages?category=${c.slug}`,
  })),
  customerCare: [
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
} as const;
