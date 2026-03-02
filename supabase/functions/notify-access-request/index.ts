const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, project_id, request_id } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
    if (!SLACK_API_KEY) throw new Error("SLACK_API_KEY is not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const approveUrl = `${SUPABASE_URL}/functions/v1/approve-access-request?id=${request_id}`;

    const hdrs = authHeaders(LOVABLE_API_KEY, SLACK_API_KEY);
    const channelId = await findChannel("portfolio", LOVABLE_API_KEY, SLACK_API_KEY);

    // Join channel first
    const joinRes = await fetch(`${GATEWAY_URL}/conversations.join`, {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify({ channel: channelId }),
    });
    const joinData = await joinRes.json();
    console.log("Join result:", JSON.stringify(joinData));

    // Send message with approve button
    const msgRes = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify({
        channel: channelId,
        text: `🔔 *New Case Study Access Request*\n\n• *Name:* ${name}\n• *Email:* ${email}\n• *Project:* ${project_id}\n• *Time:* ${new Date().toISOString()}\n\n<${approveUrl}|✅ Click here to approve>`,
      }),
    });
    const msgData = await msgRes.json();
    if (!msgData.ok) throw new Error(`chat.postMessage failed: ${JSON.stringify(msgData)}`);

    console.log(`✅ Slack notification sent for ${name} (${email})`);

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
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
