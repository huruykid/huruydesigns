/**
 * Helpers shared by the edge functions: origin allow-list, JSON responses,
 * client IP extraction, and the table-backed rate limiter (check_rate_limit RPC).
 */

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/huruy\.tech$/,
  /^https:\/\/www\.huruy\.tech$/,
  /^https:\/\/([a-z0-9-]+\.)*lovable\.app$/,
  /^https:\/\/([a-z0-9-]+\.)*lovableproject\.com$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));
}

export function corsHeaders(origin: string | null): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : "https://huruy.tech",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

export function json(body: unknown, status: number, origin: string | null, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json", ...extra },
  });
}

/** First hop of x-forwarded-for; Supabase's gateway sets it from the real client. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") ?? req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Fixed-window counter in public.rate_limits via the check_rate_limit() SQL function.
 * Returns true when the call is within limits. Fails closed on RPC errors.
 */
export async function withinRateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) {
    console.error("rate limit: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured");
    return false;
  }
  const res = await fetch(`${url}/rest/v1/rpc/check_rate_limit`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_key: key, p_limit: limit, p_window_seconds: windowSeconds }),
  });
  if (!res.ok) {
    console.error("rate limit RPC failed:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return (await res.json()) === true;
}

/** Constant-time string comparison so response timing never leaks the passcode. */
export function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ab.length ^ bb.length;
  const len = Math.max(ab.length, bb.length);
  for (let i = 0; i < len; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}
