import { mkdir, appendFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// On Vercel (and most serverless hosts) the deployment filesystem is read-only —
// only /tmp is writable, and it's ephemeral per invocation. Locally we write into
// the repo's data/leads folder so submissions are easy to inspect during dev.
const LEADS_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), "pot-leads")
  : path.join(process.cwd(), "data", "leads");
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl");

export async function saveLead(type: string, payload: Record<string, unknown>) {
  const record = { type, receivedAt: new Date().toISOString(), ...payload };
  try {
    await mkdir(LEADS_DIR, { recursive: true });
    await appendFile(LEADS_FILE, `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    // Best-effort only — this stub persists nowhere durable on serverless hosts.
    // Swallow the error so the API route still returns success; wire a real
    // email/CRM integration (see the TODO in the route handlers) for production use.
    console.error("saveLead: failed to persist lead", error);
  }
  return record;
}
