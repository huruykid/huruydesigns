# Remove Education Site-Wide, Emphasize Hands-On Experience

Remove every education mention (degree, CSU Eastbay, alumniOf schema) and replace with field-proven credibility signals.

## Changes

### 1. About page (`src/pages/About.tsx`)
- Delete the Education section (degree + CSU Eastbay) and unused `GraduationCap` import.
- Remove the `EducationalOrganization` entry from JSON-LD.
- Replace with a new "In the Field" section placed before Expertise, with 3 short stat-style bullets:
  - 8+ years designing and shipping real products in enterprise, SaaS, and consumer
  - Shipped EBT Finder solo in 4 weeks, now live on the App Store
  - Top 1% designer on Lovable: designs in code, not just mockups

### 2. Resume pages (`src/pages/Resume.tsx`, `src/pages/ResumeAlt.tsx`)
- Remove the Education sidebar block and the `alumniOf` schema entry.

### 3. Word resume export (`src/lib/generateResumeDocx.ts`)
- Remove the Education section from the generated .docx.

### 4. Hire page (`src/pages/Hire.tsx`)
- Remove the `alumniOf` / `CollegeOrUniversity` JSON-LD block.

### 5. AI chatbot (`supabase/functions/portfolio-chat/index.ts`)
- Remove the "B.S. Psychology... CSU East Bay" line from the system prompt.
- Replace with hands-on framing: "Self-directed builder who learns by shipping. Shipped a live iOS app solo (EBT Finder). Top 1% designer on Lovable. Designs in code."
- Redeploy the edge function.

### 6. Memory
- Update the "Education is ALWAYS 'CSU Eastbay'" core rule to "no education mentions anywhere on the site".

## Out of scope
- "Educational content" mentions inside case study copy (EBT Finder tooltips, FentFinder) — those describe product features, not Huruy's education, and stay.

## Verification
- Rebuild, visually check About and Resume pages for clean layout after section removal.
- Ask the chatbot "what's your background?" and confirm no education mention.
- Confirm the Word resume export generates without the Education section.
