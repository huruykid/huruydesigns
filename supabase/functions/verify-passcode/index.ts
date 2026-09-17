import { clientIp, corsHeaders, isAllowedOrigin, json, timingSafeEqual, withinRateLimit } from "../_shared/http.ts";

/**
 * Checks the case-study passcode and, when it matches, returns the gated
 * narrative from public.gated_content. The prose never ships in the site bundle.
 *
 * Limits: 5 attempts per 15 minutes per IP, plus 30 per hour per IP as a backstop.
 */
const ATTEMPT_LIMIT = 5;
const ATTEMPT_WINDOW_SECONDS = 15 * 60;
const HOURLY_LIMIT = 30;
const ALLOWED_PROJECTS = new Set(["asure-compliance"]);

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json({ valid: false, error: "Method not allowed" }, 405, origin);
  }
  if (origin && !isAllowedOrigin(origin)) {
    return json({ valid: false, error: "Forbidden" }, 403, origin);
  }

  try {
    const body = await req.json().catch(() => null);
    const passcode = typeof body?.passcode === "string" ? body.passcode.trim() : "";
    const projectId = typeof body?.projectId === "string" ? body.projectId : "asure-compliance";

    if (!passcode || passcode.length > 200 || !ALLOWED_PROJECTS.has(projectId)) {
      return json({ valid: false }, 400, origin);
    }

    const ip = clientIp(req);
    const allowed =
      (await withinRateLimit(`passcode:${ip}`, ATTEMPT_LIMIT, ATTEMPT_WINDOW_SECONDS)) &&
      (await withinRateLimit(`passcode:hour:${ip}`, HOURLY_LIMIT, 60 * 60));
    if (!allowed) {
      return json(
        { valid: false, error: "Too many attempts", retryAfterSeconds: ATTEMPT_WINDOW_SECONDS },
        429,
        origin,
        { "Retry-After": String(ATTEMPT_WINDOW_SECONDS) },
      );
    }

    const expected = Deno.env.get("CASE_STUDY_PASSCODE");
    if (!expected) {
      console.error("CASE_STUDY_PASSCODE secret is not configured");
      return json({ valid: false, error: "Server misconfigured" }, 500, origin);
    }

    if (!timingSafeEqual(passcode, expected.trim())) {
      return json({ valid: false }, 401, origin);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const res = await fetch(
      `${supabaseUrl}/rest/v1/gated_content?project_id=eq.${encodeURIComponent(projectId)}&select=content`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );
    if (!res.ok) {
      console.error("gated_content fetch failed:", res.status, await res.text().catch(() => ""));
      return json({ valid: false, error: "Content unavailable" }, 500, origin);
    }
    const rows = (await res.json()) as { content: unknown }[];
    if (!rows.length) {
      return json({ valid: false, error: "Content unavailable" }, 500, origin);
    }

    return json({ valid: true, content: rows[0].content }, 200, origin, { "Cache-Control": "no-store" });
  } catch (e) {
    console.error("verify-passcode error:", e);
    return json({ valid: false, error: "Something went wrong" }, 500, origin);
  }
});
