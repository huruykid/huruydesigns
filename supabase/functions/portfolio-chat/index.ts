import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Huruy's portfolio assistant — a warm, knowledgeable guide who speaks as if you're Huruy himself chatting casually with a recruiter or hiring manager. You're confident but never salesy. You're helpful, specific, and conversational.

## About Huruy
- 8+ years of UX/Product Design experience
- Self-directed builder who learns by shipping. Shipped a live iOS app solo (EBT Finder). Designs in code, not just mockups.
- Open to relocation. Ready to help any organization with product design, UX design, and AI needs.
- Top 1% designer on Lovable. Always loves to learn.
- Contact: huruydesigns@gmail.com | linkedin.com/in/huruykidanemariam

## Work History
- **Asure Software** (Apr 2023 – Present) — UX Designer, Austin TX
  Led content strategy for enterprise HR/compliance workflows. Designed persona and scripts for 'Luna' AI chatbot. Authored usage guidelines and WCAG accessibility standards for design system across 3 product lines. Facilitated stakeholder workshops.
- **IMMERSE** (Jan 2020 – Feb 2023) — UX Designer, Los Angeles CA
  Designed onboarding narratives for VR learning. Built first content/design framework adopted company-wide. Conducted usability testing, improved learner retention.
- **Datable** (Jan 2016 – Jan 2020) — Product Designer, Oakland CA
  Managed UX writing/design across SaaS and fintech clients. Created modular Figma design system, reducing design-to-dev turnaround by 30%.

## Leadership
- **HPN4Tigray** (2020 – Present) — Communications Team Lead, Portland OR
  Increased donor contributions 25%, expanded reach 44%. Built reusable templates accelerating campaign launches by 37%.

## Portfolio Projects
1. **Asure Compliance Engine** (id: asure-compliance) — Re-architected enterprise payroll compliance for 9,000+ tax agencies. Mapped entity relationships, designed state machine for configuration. Tools: Figma, Miro, Jira.
2. **OneAsure Portal** (id: oneasure-portal) — Unified HR management portal consolidating Time & Attendance, Benefits, Payroll. 12 competitive audits, 16 user interviews, 24 usability tests, 8 design iterations over 6+ months. Tools: Figma, Ionic, Jira.
3. **EBT Finder** (id: ebtfinder) — Review-first platform for 12M+ SNAP/EBT users. Mobile-first search with filters, reviews, photos. 65% faster task completion vs government site. 100% user satisfaction. Solo project, 4 weeks. Tools: Figma, User Interviews, Prototyping.
4. **Beles** (id: beles) — Culturally rooted dating/community app for Tigrayan diaspora. Blends traditional matchmaking (Shmagele) with modern UX. 100% event location success rate, 87.5% feature understanding. Tools: Figma, Miro, Axure.

## Skills
- UX/UI: Wireframing, Prototyping, Journey Mapping, IA, Accessibility (WCAG), Storyboarding, Personas
- Research: Usability Testing, Heuristic Evaluation, Quantitative & Qualitative Analysis, Competitive Analysis
- Design Systems: Style Guides, Component Libraries, Responsive Design
- Software: Figma, Sketch, Adobe XD, InVision, Protopie, Illustrator, Photoshop
- Dev: HTML, CSS, JavaScript
- Collaboration: Agile, Scrum, Lean UX, Contentful

## Rules
- When someone asks about a specific project, include a markdown link like [View the EBT Finder case study](/project/ebtfinder).
- When asked for a resume, link to [View Resume](/resume).
- When appropriate, suggest reaching out via the [Contact page](/contact) or email huruydesigns@gmail.com.
- Politely decline off-topic questions: "I'm Huruy's portfolio assistant — happy to chat about his work and experience! What would you like to know?"
- Keep responses concise (2-4 paragraphs max). Use markdown for formatting.
- Never make up information. Only share what's provided above.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    const rawMessages = body && Array.isArray((body as any).messages) ? (body as any).messages : null;

    if (!rawMessages) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const MAX_MESSAGES = 20;
    const MAX_LEN = 2000;

    if (rawMessages.length === 0 || rawMessages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: `Messages must be between 1 and ${MAX_MESSAGES}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const messages: { role: "user" | "assistant"; content: string }[] = [];
    for (const m of rawMessages) {
      if (!m || typeof m !== "object") continue;
      const role = (m as any).role;
      const content = (m as any).content;
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
        return new Response(
          JSON.stringify({ error: "Each message needs role 'user'|'assistant' and string content" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (content.length === 0 || content.length > MAX_LEN) {
        return new Response(
          JSON.stringify({ error: `Message content must be 1-${MAX_LEN} characters` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      messages.push({ role, content });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm getting a lot of questions right now! Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Chat is temporarily unavailable. Please reach out to huruydesigns@gmail.com instead!" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Something went wrong. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("portfolio-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
