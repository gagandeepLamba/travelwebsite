import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

const LEADS_DIR = path.join(process.cwd(), "data", "leads");
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl");

export async function saveLead(type: string, payload: Record<string, unknown>) {
  await mkdir(LEADS_DIR, { recursive: true });
  const record = { type, receivedAt: new Date().toISOString(), ...payload };
  await appendFile(LEADS_FILE, `${JSON.stringify(record)}\n`, "utf8");
  return record;
}
