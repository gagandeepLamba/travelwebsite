/**
 * One-off script to push starter blog content into a freshly connected Sanity
 * project. Run with `npm run seed:blog` after setting SANITY_API_TOKEN (a
 * write token from manage.sanity.io) plus the NEXT_PUBLIC_SANITY_* vars in
 * .env.local. Safe to re-run — posts are upserted by a fixed _id.
 */
import { config } from "dotenv";
import { createClient } from "@sanity/client";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local — see README for setup steps."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const author = {
  _id: "author-editorial-team",
  _type: "author",
  name: "Plan Our Travel Editorial Team",
  bio: "Travel experts sharing itineraries, guides and destination inspiration.",
};

const categories = [
  { _id: "category-india", _type: "category", title: "India Travel" },
  { _id: "category-international", _type: "category", title: "International" },
  { _id: "category-tips", _type: "category", title: "Travel Tips" },
];

const posts = [
  {
    _id: "post-golden-triangle-guide",
    title: "The Perfect Golden Triangle Itinerary: Delhi, Agra & Jaipur in 6 Days",
    excerpt:
      "Everything you need to plan a first-time India trip covering Delhi's heritage, the Taj Mahal at sunrise, and Jaipur's pink-city palaces.",
    categorySlug: "category-india",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "The Taj Mahal at sunrise, Agra",
    body: [
      "Delhi, Agra and Jaipur form India's most famous travel circuit for good reason — six days is enough to see three of the country's most iconic cities without feeling rushed.",
      "Start in Delhi with a day split between the grandeur of Humayun's Tomb and the chaos of Old Delhi's spice markets. Give yourself an early night — the drive to Agra starts before sunrise.",
      "In Agra, nothing beats seeing the Taj Mahal at first light, when the marble shifts through shades of pink and gold and the crowds are thinnest.",
      "Jaipur closes out the loop with Amber Fort, the City Palace, and enough bazaars to fill an extra suitcase. Build in a free afternoon — you'll want it.",
    ],
  },
  {
    _id: "post-kerala-backwaters-guide",
    title: "Kerala Backwaters: How to Choose the Right Houseboat",
    excerpt:
      "Private deck or shared boat? Alleppey or Kumarakom? A practical guide to picking the right Kerala houseboat experience.",
    categorySlug: "category-india",
    imageUrl: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Traditional houseboat on Kerala's backwaters",
    body: [
      "A night on a Kerala houseboat is one of those experiences that photographs well and lives up to the photos — but the details matter more than most travellers expect.",
      "Alleppey gets the postcard shots; Kumarakom is quieter and better for birdwatching. Both are within easy reach of Kochi.",
      "Private boats cost more but are worth it for couples and families — you set the pace, and meals are cooked fresh onboard as you cruise.",
    ],
  },
  {
    _id: "post-rajasthan-desert-camp",
    title: "A Night Under the Stars: Desert Camping in Jaisalmer",
    excerpt:
      "What to actually expect from an overnight camel safari and desert camp in the Thar Desert — beyond the Instagram photos.",
    categorySlug: "category-india",
    imageUrl: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Desert dunes near Jaisalmer at sunset",
    body: [
      "The camel ride out to camp is slower and bumpier than it looks in photos — wear closed shoes and expect sand everywhere by the time you arrive.",
      "Camp itself is where the trip earns its reputation: folk music around a fire, a rooftop-under-the-stars dinner, and a silence that's hard to find anywhere else in Rajasthan.",
      "Pack a warm layer even in summer — desert nights cool down fast once the sun is gone.",
    ],
  },
  {
    _id: "post-dubai-first-timer",
    title: "Dubai for First-Timers: 5 Days, No Wasted Time",
    excerpt:
      "A tight but realistic 5-day Dubai itinerary balancing skyline views, desert safaris and an easy day trip to Abu Dhabi.",
    categorySlug: "category-international",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Dubai skyline at dusk",
    body: [
      "Dubai rewards a plan — the city is spread out, and without one you'll lose half a day to traffic.",
      "Anchor the trip around Burj Khalifa and Dubai Mall on day one, then dedicate an evening to a desert safari; the BBQ dinner and dune bashing are worth the early alarm the next morning.",
      "Save a full day for Abu Dhabi — Sheikh Zayed Mosque alone justifies the 90-minute drive.",
    ],
  },
  {
    _id: "post-packing-tips-india",
    title: "What to Actually Pack for a Multi-Climate India Trip",
    excerpt:
      "From Himalayan cold to Kerala humidity — a realistic packing list for travellers covering multiple regions of India in one trip.",
    categorySlug: "category-tips",
    imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Himalayan mountain range",
    body: [
      "India's regions can differ by 20+ degrees on the same day if your itinerary spans hills and coast — layering is non-negotiable.",
      "A light scarf or shawl does triple duty: sun protection, temple modesty coverage, and an extra layer on air-conditioned buses.",
      "Pack fewer clothes than you think you need — laundry is fast and cheap almost everywhere, and you'll want the suitcase space for souvenirs.",
    ],
  },
];

async function uploadImage(url: string, filename: string) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

async function seed() {
  console.log(`Seeding dataset "${dataset}" on project ${projectId}...`);

  await client.createOrReplace(author);
  for (const category of categories) {
    await client.createOrReplace(category);
  }
  console.log("Author + categories upserted.");

  for (const post of posts) {
    const asset = await uploadImage(post.imageUrl, `${post._id}.jpg`);
    await client.createOrReplace({
      _id: post._id,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post._id.replace(/^post-/, "") },
      excerpt: post.excerpt,
      mainImage: {
        _type: "image",
        alt: post.imageAlt,
        asset: { _type: "reference", _ref: asset._id },
      },
      categories: [{ _type: "reference", _ref: post.categorySlug, _key: post.categorySlug }],
      author: { _type: "reference", _ref: author._id },
      publishedAt: new Date().toISOString(),
      body: post.body.map((paragraph, i) => ({
        _type: "block",
        _key: `${post._id}-block-${i}`,
        style: "normal",
        children: [{ _type: "span", _key: `${post._id}-span-${i}`, text: paragraph }],
      })),
    });
    console.log(`Seeded post: ${post.title}`);
  }

  console.log("Done. Visit /blog to see the seeded posts.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
