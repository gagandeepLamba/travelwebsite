import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/inquiry";
import { saveLead } from "@/lib/server/leads";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = newsletterSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 422 }
    );
  }

  await saveLead("newsletter", result.data);

  // TODO: wire a real email/CRM integration here (e.g. Resend or SMTP) —
  // this stub only persists submissions to data/leads/leads.jsonl for now.

  return NextResponse.json({ ok: true });
}
