// Resolves, in order: an explicit NEXT_PUBLIC_SITE_URL override, Vercel's stable
// production domain, the current Vercel deployment URL (previews), then a
// hardcoded fallback for local dev / other hosts.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.planourtravel.com";
}

export const siteConfig = {
  name: "Plan Our Travel India",
  shortName: "Plan Our Travel",
  legalName: "Plan Our Travel India Pvt. Ltd.",
  tagline: "Crafting journeys across India & beyond",
  description:
    "Plan Our Travel India is a full-service travel company crafting bespoke India tours, international getaways, yoga retreats and luxury train journeys — designed around you, handled end to end.",
  url: resolveSiteUrl(),
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
  philosophy: "You just think, and we will make it happen for you.",
  contact: {
    phone: "+91-8920239200",
    phoneHref: "tel:+918920239200",
    mobile: "+91-7015213971",
    mobileHref: "tel:+917015213971",
    landline: "011-40199447",
    landlineHref: "tel:+911140199447",
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
    branchAddress:
      "Near Ram Sharan Mandir, 1 Raghunath Puri Colony, Tejli Road, Jagadhri, Yamuna Nagar, Haryana 135001, India",
  },
  departments: [
    { label: "Inbound tours", phone: "+91-8920239200", email: "vikas@planourtravel.com" },
    { label: "Domestic tours", phone: "011-40199447", email: "rajesh@planourtravel.com" },
    { label: "Hotel bookings", phone: "011-40199447", email: "info@planourtravel.com" },
  ],
  associateOffices: [
    "Rishikesh",
    "Bikaner",
    "Varanasi",
    "Agra",
    "Khajuraho",
    "Ahmedabad",
    "Aurangabad",
    "Shimla",
    "Kolkata",
    "Gujarat",
  ],
  internationalOffices: ["Kathmandu, Nepal", "St. Petersburg, Russia", "Dubai, UAE", "Paris, France"],
  hours: "Mon – Sat, 9:30 AM – 6:30 PM IST · 24/7 for urgent traveller support",
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

export const quickServiceLinks = [
  { label: "Hotel Booking", href: "/hotel-booking" },
  { label: "Flight Booking", href: "/flight-booking" },
  { label: "NGO Initiative", href: "/ngo" },
] as const;

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
    { label: "NGO Initiative", href: "/ngo" },
  ],
  services: [
    { label: "Flight Booking", href: "/flight-booking" },
    { label: "Hotel Booking", href: "/hotel-booking" },
    { label: "Visa Assistance", href: "/visa-assistance" },
    { label: "Custom Itineraries", href: "/custom-itineraries" },
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
