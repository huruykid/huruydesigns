import { clientIp, corsHeaders, isAllowedOrigin, json, withinRateLimit } from "../_shared/http.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";

/**
 * Streams answers about the portfolio from the Lovable AI gateway.
 *
 * Limits (per IP, fixed windows in public.rate_limits): 15 messages per 10 minutes and
 * 60 per day, plus a site-wide cap of 1,500 messages per day so a scripted client can
 * never run up the gateway bill.
 */
const PER_IP_LIMIT = 15;
const PER_IP_WINDOW_SECONDS = 10 * 60;
const PER_IP_DAILY_LIMIT = 60;
const GLOBAL_DAILY_LIMIT = 1500;
const DAY_SECONDS = 24 * 60 * 60;
const MAX_MESSAGES = 20;
const MAX_LEN = 2000;

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

function parseMessages(raw: unknown): Message[] | string {
  if (!Array.isArray(raw)) return "Invalid request: messages array required";
  if (raw.length === 0 || raw.length > MAX_MESSAGES) return `Messages must be between 1 and ${MAX_MESSAGES}`;

  const messages: Message[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return "Each message needs role 'user'|'assistant' and string content";
    }
    if (content.length === 0 || content.length > MAX_LEN) return `Message content must be 1-${MAX_LEN} characters`;
    messages.push({ role, content });
  }
  // The transcript must be a genuine conversation: starts and ends with the visitor,
  // strictly alternating. This stops a client from planting fabricated assistant turns
  // (or several in a row) to steer the model.
  if (messages[0]?.role !== "user" || messages[messages.length - 1]?.role !== "user") {
    return "Conversation must start and end with a user message";
  }
  for (let i = 1; i < messages.length; i++) {
    if (messages[i].role === messages[i - 1].role) return "Messages must alternate between user and assistant";
  }
  return messages;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, origin);
  }
  // Browsers always send Origin on cross-site POSTs; a missing or foreign origin is not our site.
  if (!isAllowedOrigin(origin)) {
    return json({ error: "Forbidden" }, 403, origin);
  }

  try {
    const body = await req.json().catch(() => null);
    const parsed = parseMessages(body?.messages);
    if (typeof parsed === "string") {
      return json({ error: parsed }, 400, origin);
    }

    const ip = clientIp(req);
    const today = new Date().toISOString().slice(0, 10);
    const allowed =
      (await withinRateLimit(`chat:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_SECONDS)) &&
      (await withinRateLimit(`chat:day:${ip}`, PER_IP_DAILY_LIMIT, DAY_SECONDS)) &&
      (await withinRateLimit(`chat:global:${today}`, GLOBAL_DAILY_LIMIT, DAY_SECONDS));
    if (!allowed) {
      return json(
        { error: "I'm getting a lot of questions right now. Please try again in a few minutes, or email huruydesigns@gmail.com." },
        429,
        origin,
        { "Retry-After": String(PER_IP_WINDOW_SECONDS) },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return json({ error: "Chat is temporarily unavailable. Please email huruydesigns@gmail.com instead." }, 503, origin);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...parsed],
        stream: true,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("AI gateway error:", response.status, text);
      if (response.status === 429) {
        return json({ error: "I'm getting a lot of questions right now. Please try again in a moment." }, 429, origin);
      }
      if (response.status === 402) {
        return json({ error: "Chat is temporarily unavailable. Please email huruydesigns@gmail.com instead." }, 503, origin);
      }
      return json({ error: "Something went wrong. Please try again." }, 502, origin);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders(origin), "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  } catch (e) {
    console.error("portfolio-chat error:", e);
    return json({ error: "Something went wrong. Please try again." }, 500, origin);
  }
});
