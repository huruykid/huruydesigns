import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    // Log the request for the portfolio owner to see in function logs
    console.log(
      `🔔 New access request!\nName: ${name}\nEmail: ${email}\nProject: ${project_id}\nTime: ${new Date().toISOString()}`
    );

    // In the future, you could integrate Resend or another email service here.
    // For now, requests are logged and visible in the database + function logs.

    return new Response(
      JSON.stringify({ success: true, message: "Request logged" }),
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
