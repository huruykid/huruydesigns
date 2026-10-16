import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

/**
 * Turns a chat transcript into a lead record in public.appstore_chat_leads.
 *
 * Runs in the background after the reply has started streaming, so it never slows the
 * conversation down. It asks the model for a structured read of the transcript (forced
 * tool call, so the output is always the same JSON shape), merges it with what earlier
 * turns already captured (a field is never overwritten with "unknown"), upserts by
 * conversation id, and emails Huruy the first time an email address shows up.
 */

export type Role = "user" | "assistant";
export type Message = { role: Role; content: string };

const EMAIL_RE = /[^\s@<>()]+@[^\s@<>()]+\.[a-z]{2,}/i;
const PHONE_RE = /(?:\+?\d[\d\s().-]{8,}\d)/;
const URL_RE = /https?:\/\/\S+|\b[a-z0-9-]+\.(?:app|com|io|dev|co|net|org|tech|ai)\b/i;

/** Only transcripts that are starting to carry lead details are worth an extraction call. */
export function worthCapturing(messages: Message[]): boolean {
  const user = messages.filter((m) => m.role === "user");
  const text = user.map((m) => m.content).join("\n");
  return user.length >= 3 || EMAIL_RE.test(text) || PHONE_RE.test(text) || URL_RE.test(text);
}

const STAGES = new Set(["not-submitted", "rejected", "testflight", "not-started", "unknown"]);
const INTERESTS = new Set(["interested", "exploring", "not-now", "unknown"]);

export interface Lead {
  name: string | null;
  email: string | null;
  phone: string | null;
  app_name: string | null;
  app_link: string | null;
  stack: string | null;
  stage: string | null;
  guidelines: string[];
  issue_summary: string | null;
  interest: string | null;
  package_fit: string | null;
  developer_account: string | null;
}

// Plain string types only: the gateway forwards this to Gemini, which rejects union types
// and keywords outside its OpenAPI subset. "Unknown" fields come back as "" and normalize
// to null.
const EXTRACT_TOOL = {
  type: "function",
  function: {
    name: "save_lead",
    description:
      "Record what the visitor has shared so far about their app and themselves. Use an empty string for anything they have not said; never guess a name, email, phone number or link.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "The visitor's name, exactly as they gave it, or empty." },
        email: { type: "string", description: "The visitor's email address, exactly as they gave it, or empty." },
        phone: { type: "string", description: "The visitor's phone number if they gave one, or empty." },
        app_name: { type: "string", description: "The app's name, or empty." },
        app_link: { type: "string", description: "A website, App Store or TestFlight link for the app, or empty." },
        stack: { type: "string", description: "What the app was built with, e.g. Lovable, Bolt, Replit, Capacitor, React Native, or empty." },
        stage: {
          type: "string",
          enum: ["not-submitted", "rejected", "testflight", "not-started", "unknown"],
          description: "Where the app stands with Apple.",
        },
        guidelines: { type: "array", items: { type: "string" }, description: "App Review guideline numbers mentioned or diagnosed, e.g. [\"4.2\", \"4.8\"]." },
        issue_summary: {
          type: "string",
          description: "Two to four sentences for Huruy: the problem, what Apple said, what the fix involves, and what is at stake. Empty if nothing is known yet.",
        },
        interest: {
          type: "string",
          enum: ["interested", "exploring", "not-now", "unknown"],
          description: "Whether the visitor wants Huruy to take the work on.",
        },
        package_fit: { type: "string", description: "The package discussed as the likely fit: Readiness Check, Rejection Rescue, Launch, Launch + Polish, Unclear, or empty." },
        developer_account: { type: "string", description: "Whether they have an Apple Developer account, in their words, or empty." },
      },
      required: ["name", "email", "phone", "app_name", "app_link", "stack", "stage", "guidelines", "issue_summary", "interest", "package_fit", "developer_account"],
    },
  },
};

const EXTRACT_PROMPT =
  "You read a chat between a visitor and the assistant on huruy.tech/appstore, a service that gets AI-built apps approved on Apple's App Store. Call save_lead with what the visitor has shared so far. Only record facts the visitor stated or the assistant diagnosed in the chat. Never invent a name, email, phone number or link. Leave a field null when it has not come up.";

const clip = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
};

function normalize(raw: Record<string, unknown>): Lead {
  const email = clip(raw.email, 254);
  const phone = clip(raw.phone, 40);
  const stage = clip(raw.stage, 20);
  const interest = clip(raw.interest, 20);
  const guidelines = Array.isArray(raw.guidelines)
    ? [...new Set(raw.guidelines.filter((g): g is string => typeof g === "string").map((g) => g.trim().slice(0, 12)).filter(Boolean))].slice(0, 12)
    : [];
  return {
    name: clip(raw.name, 120),
    email: email && EMAIL_RE.test(email) ? email : null,
    phone: phone && /\d{7,}/.test(phone.replace(/\D/g, "")) ? phone : null,
    app_name: clip(raw.app_name, 120),
    app_link: clip(raw.app_link, 500),
    stack: clip(raw.stack, 80),
    stage: stage && STAGES.has(stage) ? stage : null,
    guidelines,
    issue_summary: clip(raw.issue_summary, 1500),
    interest: interest && INTERESTS.has(interest) ? interest : null,
    package_fit: clip(raw.package_fit, 80),
    developer_account: clip(raw.developer_account, 80),
  };
}

async function extract(messages: Message[], apiKey: string): Promise<Lead | null> {
  const transcript = messages.map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`).join("\n\n");
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: EXTRACT_PROMPT },
        { role: "user", content: transcript },
      ],
      tools: [EXTRACT_TOOL],
      tool_choice: { type: "function", function: { name: "save_lead" } },
    }),
  });
  if (!response.ok) {
    console.error("lead extraction gateway error:", response.status, await response.text().catch(() => ""));
    return null;
  }
  const data = await response.json();
  const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  if (typeof args !== "string") {
    console.error("lead extraction: no tool call in response");
    return null;
  }
  try {
    return normalize(JSON.parse(args));
  } catch (e) {
    console.error("lead extraction: bad JSON", e);
    return null;
  }
}

type Row = Lead & { id: string; conversation_id: string; turns: number; notified: boolean };

/** Earlier non-null values survive a turn where the model missed them; new values win. */
function merge(prev: Partial<Lead> | null, next: Lead): Lead {
  if (!prev) return next;
  const out = { ...next };
  for (const key of Object.keys(next) as (keyof Lead)[]) {
    if (key === "guidelines") {
      out.guidelines = [...new Set([...(prev.guidelines ?? []), ...next.guidelines])].slice(0, 12);
    } else if (next[key] === null || next[key] === "unknown") {
      (out as Record<string, unknown>)[key] = prev[key] ?? next[key];
    }
  }
  return out;
}

export async function captureLead(conversationId: string, messages: Message[]): Promise<void> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!apiKey || !supabaseUrl || !serviceKey) return;
  const headers = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" };
  const table = `${supabaseUrl}/rest/v1/appstore_chat_leads`;

  try {
    const extracted = await extract(messages, apiKey);
    if (!extracted) return;

    const existingRes = await fetch(`${table}?conversation_id=eq.${conversationId}&select=*`, { headers });
    const existing = existingRes.ok ? ((await existingRes.json()) as Row[])[0] ?? null : null;
    const lead = merge(existing, extracted);

    // Nothing to keep yet: no contact, no app, no diagnosis.
    if (!lead.email && !lead.phone && !lead.app_link && !lead.app_name && !lead.issue_summary) return;

    const turns = messages.filter((m) => m.role === "user").length;
    const upsert = await fetch(`${table}?on_conflict=conversation_id`, {
      method: "POST",
      headers: { ...headers, Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        conversation_id: conversationId,
        ...lead,
        turns,
        transcript: messages,
        updated_at: new Date().toISOString(),
      }),
    });
    if (!upsert.ok) {
      console.error("appstore_chat_leads upsert failed:", upsert.status, await upsert.text().catch(() => ""));
      return;
    }
    const [row] = (await upsert.json()) as Row[];
    if (row?.email && !row.notified) await notify(row, table, headers);
  } catch (e) {
    console.error("captureLead error:", e);
  }
}

const NOTIFY_TO = "huruydesigns@gmail.com";

async function notify(row: Row, table: string, headers: Record<string, string>) {
  const subject = `Chat lead: ${row.name ?? row.email}${row.app_name ? ` (${row.app_name})` : ""}`;
  const lines = [
    `Name: ${row.name ?? "Not given"}`,
    `Email: ${row.email}`,
    `Phone: ${row.phone ?? "Not given"}`,
    `App: ${row.app_name ?? "Not given"}${row.app_link ? ` · ${row.app_link}` : ""}`,
    `Built with: ${row.stack ?? "Not said"}`,
    `Where it stands: ${row.stage ?? "Not said"}`,
    `Apple Developer account: ${row.developer_account ?? "Not said"}`,
    `Guidelines: ${row.guidelines.length ? row.guidelines.join(", ") : "None cited yet"}`,
    `Interest: ${row.interest ?? "Not clear"} · Package discussed: ${row.package_fit ?? "None"}`,
    "",
    "Summary:",
    row.issue_summary ?? "(none yet)",
    "",
    `Conversation ${row.conversation_id} (${row.turns} visitor messages) is saved in appstore_chat_leads.`,
  ];
  try {
    const result = await sendTemplateEmail("appstore-lead", NOTIFY_TO, {
      templateData: { subject, text: lines.join("\n") },
      replyTo: row.email!,
      idempotencyKey: `appstore-chat-lead-${row.conversation_id}`,
    });
    if (!result.sent) {
      console.error("chat lead email not sent:", result.reason);
      return;
    }
    await fetch(`${table}?conversation_id=eq.${row.conversation_id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ notified: true }),
    });
  } catch (e) {
    console.error("chat lead email error:", e);
  }
}
