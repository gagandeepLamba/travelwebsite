import { NextResponse } from "next/server";
import { z } from "zod";
import { quickInquirySchema, tripPlannerSchema } from "@/lib/validations/inquiry";
import { saveLead } from "@/lib/server/leads";

const inquirySchema = z.union([
  quickInquirySchema.extend({ source: z.literal("quick-inquiry") }),
  tripPlannerSchema.extend({ source: z.literal("trip-planner") }),
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

  const { source, ...payload } = result.data;
  await saveLead(source, payload);

  // TODO: wire a real email/CRM integration here (e.g. Resend or SMTP) —
  // this stub only persists submissions to data/leads/leads.jsonl for now.

  return NextResponse.json({ ok: true });
}
