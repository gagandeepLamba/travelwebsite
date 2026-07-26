import { createClient } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;
