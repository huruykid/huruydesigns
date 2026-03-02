const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, project_id } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
    if (!SLACK_API_KEY) throw new Error("SLACK_API_KEY is not configured");

    // Send Slack notification to #portfolio
    const slackRes = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": SLACK_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "#portfolio",
        text: `🔔 *New Case Study Access Request*\n\n• *Name:* ${name}\n• *Email:* ${email}\n• *Project:* ${project_id}\n• *Time:* ${new Date().toISOString()}`,
      }),
    });

    const slackData = await slackRes.json();
    if (!slackRes.ok || !slackData.ok) {
      console.error("Slack API error:", JSON.stringify(slackData));
      throw new Error(`Slack API failed [${slackRes.status}]: ${JSON.stringify(slackData)}`);
    }

    console.log(`✅ Slack notification sent for access request from ${name} (${email})`);

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing access request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
