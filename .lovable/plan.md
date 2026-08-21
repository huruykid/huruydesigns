# Update Portfolio Resume for Capital Group Role

## Goal
Sync the portfolio resume page with your latest DOCX resume, adding Capital Group as your current role and refreshing positioning around senior conversational-AI UX design.

## Changes

1. **Update `src/pages/Resume.tsx`**
   - Add **Senior UX Designer — Capital Group (via Luxoft)** as the current role (Mar 2025 – Present).
   - Close **Asure Software** at **Mar 2025** instead of "Present".
   - Rewrite the summary to lead with conversational AI / LLM / enterprise finance experience.
   - Update the headline from "UX Designer & Product Designer" to "Senior UX Designer".
   - Draft placeholder bullets for Capital Group, Appfinity Labs, Asure, and Datable based on existing portfolio case-study content.
   - Update JSON-LD `jobTitle` and `hasOccupation` entries.

2. **Update `src/lib/generateResumeDocx.ts`**
   - Mirror the new experience array, summary, and title so the Word export matches the online resume.

3. **Refresh cross-page positioning**
   - Update current-role references in `src/pages/About.tsx`, `src/pages/Index.tsx`, and `src/pages/Hire.tsx` if they still say "Asure Software" or "UX Designer".
   - Update `mem://about/professional-details` to reflect the new senior/conversational-AI focus.

4. **Regenerate static resume artifact**
   - Replace `public/resume/huruy-kidanemariam-resume.pdf` with an updated PDF rendered from the new content.

5. **Verify**
   - Build the site and check `/resume` for correct dates, no broken layout, and accurate metadata.

## Notes
- The uploaded DOCX contains empty `[ ]` placeholders for most bullets. I will draft plausible placeholder bullets from your existing portfolio content; you can edit them afterward.
- The final wording will stay aligned with project memory: 8+ years experience, CSU Eastbay only, no em dashes.
