

## Plan: Update Asure case study narrative to be more collaborative

The user wants the story reframed: they were brought onsite to redesign screens, discovered the real problem together with the team, and collectively built the map. Three places need updating:

### Changes

1. **`src/lib/projects.ts`** (line 94) — Project card description:
   - From: "I discovered the real problem was that no one...So I built that map first."
   - To: "I was brought onsite to redesign screens. We discovered the real problem was that no one...had ever fully mapped how the system worked. So we got together and built that map first."

2. **`src/components/case-study/AsureComplianceCaseStudy.tsx`** (lines 212-218) — Section 02 body text:
   - Reframe the discovery as collaborative ("we discovered", "we mapped it together") rather than solo observation
   - Keep the core insight (absence of a shared mental model) but position map-building as a team effort

3. **`src/pages/ProjectPage.tsx`** (line 234) — Stat label:
   - From: "1 Mental Model Built From Scratch"  
   - To: "1 Shared Mental Model Built Together" (or similar collaborative framing)

