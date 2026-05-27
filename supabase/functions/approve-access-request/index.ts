import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const requestId = url.searchParams.get("id");
    const providedSecret = url.searchParams.get("secret") || req.headers.get("x-admin-secret");

    const ADMIN_SECRET = Deno.env.get("ADMIN_APPROVAL_SECRET");
    if (!ADMIN_SECRET) {
      console.error("ADMIN_APPROVAL_SECRET is not configured");
      return new Response("Server misconfigured", { status: 500, headers: corsHeaders });
    }

    if (!providedSecret || providedSecret !== ADMIN_SECRET) {
      return new Response("Unauthorized", { status: 401, headers: corsHeaders });
    }

    if (!requestId || !UUID_RE.test(requestId)) {
      return new Response("Invalid request id", { status: 400, headers: corsHeaders });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Only approve rows that are still pending
    const { data, error } = await supabase
      .from("access_requests")
      .update({ status: "approved" })
      .eq("id", requestId)
      .eq("status", "pending")
      .select("token, name, email, project_id")
      .single();

    if (error || !data) {
      console.error("Update error:", error);
      return new Response("Request not found or already processed", {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "text/html" },
      });
    }

    const siteUrl = "https://huruydesigns.lovable.app";
    const accessLink = `${siteUrl}/project/${data.project_id}?token=${data.token}`;

    const esc = (s: string) =>
      s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Access Approved</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; max-width: 500px; margin: 80px auto; padding: 20px; text-align: center; }
  .check { font-size: 48px; margin-bottom: 16px; }
  h1 { font-size: 24px; margin-bottom: 8px; }
  .info { color: #666; margin-bottom: 24px; }
  .link { background: #f4f4f5; border-radius: 8px; padding: 12px 16px; word-break: break-all; font-size: 14px; margin-bottom: 16px; }
  .copy-btn { background: #000; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; }
</style></head>
<body>
  <div class="check">✅</div>
  <h1>Access Approved</h1>
  <p class="info"><strong>${esc(data.name)}</strong> (${esc(data.email)}) now has access.</p>
  <div class="link" id="link">${esc(accessLink)}</div>
  <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('link').textContent);this.textContent='Copied!'">Copy Link</button>
</body></html>`;

    return new Response(html, {
      headers: { ...corsHeaders, "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal error", { status: 500, headers: corsHeaders });
  }
});
