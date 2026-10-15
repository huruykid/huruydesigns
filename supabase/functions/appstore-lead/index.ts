import { clientIp, corsHeaders, isAllowedOrigin, json, withinRateLimit } from "../_shared/http.ts";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

/**
 * Saves an intake lead from huruy.tech/appstore into public.appstore_leads and emails
 * Huruy about it through Lovable's built-in app emails.
 *
 * Abuse limits: allowed origins only, a honeypot field, 5 submissions per hour and
 * 20 per day per IP. Saving the lead never depends on the email succeeding.
 */
const STAGES = new Set(["not-submitted", "rejected", "testflight", "not-started"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(origin) });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405, origin);
  if (!isAllowedOrigin(origin)) return json({ ok: false, error: "Forbidden" }, 403, origin);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ ok: false, error: "Invalid request" }, 400, origin);

    // Honeypot: real visitors never see or fill this field. Pretend success to bots.
    if (str(body.website, 200)) return json({ ok: true }, 200, origin);

    const lead = {
      name: str(body.name, 120),
      email: str(body.email, 254),
      app_url: str(body.appUrl, 500),
      stage: str(body.stage, 40),
      developer_account: str(body.account, 80) || null,
      details: str(body.details, 2000) || null,
    };

    if (!lead.name || !EMAIL_RE.test(lead.email) || !/^https?:\/\/\S+\.\S+/i.test(lead.app_url) || !STAGES.has(lead.stage)) {
      return json({ ok: false, error: "Please check your name, email, app link and where it stands." }, 422, origin);
    }

    const ip = clientIp(req);
    const allowed =
      (await withinRateLimit(`lead:${ip}`, 5, 60 * 60)) && (await withinRateLimit(`lead:day:${ip}`, 20, 24 * 60 * 60));
    if (!allowed) return json({ ok: false, error: "Too many submissions. Please email me instead." }, 429, origin);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const insert = await fetch(`${supabaseUrl}/rest/v1/appstore_leads`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(lead),
    });
    if (!insert.ok) {
      console.error("appstore_leads insert failed:", insert.status, await insert.text().catch(() => ""));
      return json({ ok: false, error: "Could not save your request" }, 500, origin);
    }
    const [row] = (await insert.json()) as { id: string }[];

    await notify(lead, row?.id, supabaseUrl, serviceKey);
    return json({ ok: true }, 200, origin, { "Cache-Control": "no-store" });
  } catch (e) {
    console.error("appstore-lead error:", e);
    return json({ ok: false, error: "Something went wrong" }, 500, origin);
  }
});

/**
 * Best-effort email to Huruy via Lovable's built-in app emails (template
 * "appstore-lead", fixed recipient huruydesigns@gmail.com). If the send fails
 * (e.g. sender domain still verifying), it is only logged; the lead is saved.
 */
const NOTIFY_TO = "huruydesigns@gmail.com";

async function notify(
  lead: { name: string; email: string; app_url: string; stage: string; developer_account: string | null; details: string | null },
  id: string | undefined,
  supabaseUrl: string,
  serviceKey: string,
) {
  const subject = `App Store ${lead.stage === "rejected" ? "rescue" : "launch"}: ${lead.name}`;
  const text = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `App: ${lead.app_url}`,
    `Where it stands: ${lead.stage}`,
    `Apple Developer account: ${lead.developer_account ?? "Not said"}`,
    "",
    lead.details ?? "(No details)",
  ].join("\n");

  try {
    const result = await sendTemplateEmail("appstore-lead", NOTIFY_TO, {
      templateData: { subject, text },
      replyTo: lead.email,
      idempotencyKey: `appstore-lead-${id ?? crypto.randomUUID()}`,
    });
    if (!result.sent) {
      console.error("lead email not sent:", result.reason);
      return;
    }
    if (id) {
      await fetch(`${supabaseUrl}/rest/v1/appstore_leads?id=eq.${id}`, {
        method: "PATCH",
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ notified: true }),
      });
    }
  } catch (e) {
    console.error("lead email error:", e);
  }
}
