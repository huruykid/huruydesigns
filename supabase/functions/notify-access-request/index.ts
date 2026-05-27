import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function authHeaders(lovableKey: string, slackKey: string) {
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": slackKey,
    "Content-Type": "application/json",
  };
}

async function findChannel(name: string, lovableKey: string, slackKey: string): Promise<string> {
  const target = name.replace(/^#/, "");
  let cursor = "";
  do {
    const params = new URLSearchParams({ types: "public_channel", limit: "200" });
    if (cursor) params.set("cursor", cursor);
    const res = await fetch(`${GATEWAY_URL}/conversations.list?${params}`, {
      method: "GET",
      headers: authHeaders(lovableKey, slackKey),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(`conversations.list failed: ${JSON.stringify(data)}`);
    const ch = data.channels?.find((c: any) => c.name === target);
    if (ch) return ch.id;
    cursor = data.response_metadata?.next_cursor || "";
  } while (cursor);
  throw new Error(`Channel "${name}" not found`);
}

function escapeSlack(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { request_id } = body as { request_id?: unknown };

    if (typeof request_id !== "string" || !UUID_RE.test(request_id)) {
      return new Response(JSON.stringify({ error: "Invalid request_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Look up the row server-side; never trust caller-supplied name/email/project_id.
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const { data: row, error: rowErr } = await supabase
      .from("access_requests")
      .select("id, name, email, project_id, status, created_at")
      .eq("id", request_id)
      .eq("status", "pending")
      .single();

    if (rowErr || !row) {
      return new Response(JSON.stringify({ error: "Request not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
    if (!SLACK_API_KEY) throw new Error("SLACK_API_KEY is not configured");

    const ADMIN_SECRET = Deno.env.get("ADMIN_APPROVAL_SECRET");
    if (!ADMIN_SECRET) throw new Error("ADMIN_APPROVAL_SECRET is not configured");

    const approveUrl = `${SUPABASE_URL}/functions/v1/approve-access-request?id=${row.id}&secret=${encodeURIComponent(ADMIN_SECRET)}`;

    const hdrs = authHeaders(LOVABLE_API_KEY, SLACK_API_KEY);
    const channelId = await findChannel("portfolio", LOVABLE_API_KEY, SLACK_API_KEY);

    await fetch(`${GATEWAY_URL}/conversations.join`, {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify({ channel: channelId }),
    });

    const safeName = escapeSlack(String(row.name).slice(0, 100));
    const safeEmail = escapeSlack(String(row.email).slice(0, 200));
    const safeProject = escapeSlack(String(row.project_id).slice(0, 100));

    const msgRes = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify({
        channel: channelId,
        text: `🔔 *New Case Study Access Request*\n\n• *Name:* ${safeName}\n• *Email:* ${safeEmail}\n• *Project:* ${safeProject}\n• *Time:* ${new Date().toISOString()}\n\n<${approveUrl}|✅ Click here to approve>`,
      }),
    });
    const msgData = await msgRes.json();
    if (!msgData.ok) throw new Error(`chat.postMessage failed: ${JSON.stringify(msgData)}`);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
