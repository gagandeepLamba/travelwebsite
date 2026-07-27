import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.RESEND_FROM_EMAIL || "Plan Our Travel <onboarding@resend.dev>";
const TO = process.env.LEAD_NOTIFICATION_EMAIL || "info@planourtravel.com";

const sourceLabels: Record<string, string> = {
  "quick-inquiry": "Quick enquiry",
  "trip-planner": "Trip planner",
  chatbot: "Chat widget",
  "custom-itinerary": "Custom itinerary request",
};

function renderValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `<ol style="margin:4px 0 0;padding-left:18px;">${value
      .map((item) => `<li style="margin-bottom:4px;">${renderValue(item)}</li>`)
      .join("")}</ol>`;
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `<strong>${k}:</strong> ${renderValue(v)}`)
      .join("<br/>");
  }
  return String(value ?? "—");
}

function renderLeadHtml(source: string, payload: Record<string, unknown>) {
  const rows = Object.entries(payload)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:6px 12px;font-weight:600;vertical-align:top;white-space:nowrap;">${key}</td>
          <td style="padding:6px 12px;">${renderValue(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;font-size:14px;color:#16241d;">
      <h2 style="margin:0 0 12px;">New ${sourceLabels[source] ?? source} submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
    </div>`;
}

export async function sendLeadEmail(source: string, payload: Record<string, unknown>) {
  if (!resend) {
    console.warn("sendLeadEmail: RESEND_API_KEY is not set — skipping email send.");
    return;
  }

  const name = typeof payload.name === "string" ? payload.name : "Unknown";
  const replyTo = typeof payload.email === "string" ? payload.email : undefined;

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo,
      subject: `New ${sourceLabels[source] ?? source} — ${name}`,
      html: renderLeadHtml(source, payload),
    });
  } catch (error) {
    console.error("sendLeadEmail: failed to send", error);
  }
}
