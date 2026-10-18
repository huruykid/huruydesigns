import { clientIp, corsHeaders, isAllowedOrigin, json, withinRateLimit } from "../_shared/http.ts";
import { withLeadReceipt, type LeadReceipt } from "./stream.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";
import { captureLead, worthCapturing, type Message, type Role } from "./lead.ts";

declare const EdgeRuntime: { waitUntil(promise: Promise<unknown>): void } | undefined;

/**
 * Streams the /appstore assistant's replies from the Lovable AI gateway. Same shape as
 * portfolio-chat, with room for a pasted rejection message (Apple's notes run long) and
 * its own rate-limit keys so the two chats never share a window.
 *
 * When the client sends a conversation_id and the transcript has started carrying lead
 * details, the function also records the lead in the background (see lead.ts) without
 * delaying the stream.
 *
 * Limits (per IP, fixed windows in public.rate_limits): 20 messages per 10 minutes and
 * 80 per day, plus a site-wide cap of 1,500 messages per day.
 */
const PER_IP_LIMIT = 20;
const PER_IP_WINDOW_SECONDS = 10 * 60;
const PER_IP_DAILY_LIMIT = 80;
const GLOBAL_DAILY_LIMIT = 1500;
const DAY_SECONDS = 24 * 60 * 60;
const MAX_MESSAGES = 24;
const MAX_LEN = 8000;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
    messages.push({ role: role as Role, content });
  }
  // A genuine conversation: starts and ends with the visitor, strictly alternating, so a
  // client can't plant assistant turns to steer the model.
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
  if (!isAllowedOrigin(origin)) {
    return json({ error: "Forbidden" }, 403, origin);
  }

  try {
    const body = await req.json().catch(() => null);
    const parsed = parseMessages(body?.messages);
    if (typeof parsed === "string") {
      return json({ error: parsed }, 400, origin);
    }
    const conversationId = typeof body?.conversation_id === "string" && UUID_RE.test(body.conversation_id) ? body.conversation_id.toLowerCase() : null;

    const ip = clientIp(req);
    const today = new Date().toISOString().slice(0, 10);
    const allowed =
      (await withinRateLimit(`rescue:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_SECONDS)) &&
      (await withinRateLimit(`rescue:day:${ip}`, PER_IP_DAILY_LIMIT, DAY_SECONDS)) &&
      (await withinRateLimit(`rescue:global:${today}`, GLOBAL_DAILY_LIMIT, DAY_SECONDS));
    if (!allowed) {
      return json(
        { error: "A lot of people are asking right now. Try again in a few minutes, or send the form below and Huruy replies within one business day." },
        429,
        origin,
        { "Retry-After": String(PER_IP_WINDOW_SECONDS) },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return json({ error: "The assistant is offline for a moment. Send the form below and Huruy replies within one business day." }, 503, origin);
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
        return json({ error: "A lot of people are asking right now. Please try again in a moment." }, 429, origin);
      }
      if (response.status === 402) {
        return json({ error: "The assistant is offline for a moment. Send the form below and Huruy replies within one business day." }, 503, origin);
      }
      return json({ error: "Something went wrong. Please try again." }, 502, origin);
    }

    let work: Promise<LeadReceipt | null> | undefined;
    if (conversationId && worthCapturing(parsed)) {
      work = captureLead(conversationId, parsed);
      if (typeof EdgeRuntime !== "undefined" && EdgeRuntime) EdgeRuntime.waitUntil(work);
      else work.catch((e) => console.error("captureLead:", e));
    }

    const stream = response.body && work ? withLeadReceipt(response.body, work) : response.body;
    return new Response(stream, {
      headers: { ...corsHeaders(origin), "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  } catch (e) {
    console.error("appstore-chat error:", e);
    return json({ error: "Something went wrong. Please try again." }, 500, origin);
  }
});
