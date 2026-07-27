import { NextResponse } from "next/server";
import { z } from "zod";
import {
  chatbotInquirySchema,
  customItinerarySchema,
  quickInquirySchema,
  tripPlannerSchema,
} from "@/lib/validations/inquiry";
import { saveLead } from "@/lib/server/leads";
import { sendLeadEmail } from "@/lib/server/email";

const inquirySchema = z.union([
  quickInquirySchema.extend({ source: z.literal("quick-inquiry") }),
  tripPlannerSchema.extend({ source: z.literal("trip-planner") }),
  chatbotInquirySchema.extend({ source: z.literal("chatbot") }),
  customItinerarySchema.extend({ source: z.literal("custom-itinerary") }),
]);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = inquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 422 }
    );
  }

  if (
    result.data.source === "custom-itinerary" &&
    result.data.dayPlans.length !== result.data.days
  ) {
    return NextResponse.json(
      { error: "Validation failed", issues: [{ message: "Day plans must match the number of days" }] },
      { status: 422 }
    );
  }

  const { source, ...payload } = result.data;
  await saveLead(source, payload);
  await sendLeadEmail(source, payload);

  return NextResponse.json({ ok: true });
}
