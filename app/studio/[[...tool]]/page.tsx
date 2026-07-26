import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Studio",
  description: "Content studio for the Plan Our Travel India blog.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-8 text-center text-neutral-100">
        <div className="max-w-md">
          <h1 className="text-xl font-semibold">Studio not connected yet</h1>
          <p className="mt-3 text-sm text-neutral-400">
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code> to your <code>.env.local</code>, then restart
            the dev server to open the blog content studio here.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
