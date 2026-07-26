"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  name: "plan-our-travel-studio",
  title: "Plan Our Travel — Blog Studio",
  projectId: projectId ?? "",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
});
