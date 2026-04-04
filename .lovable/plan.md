

## Update LinkedIn URL Across the Site

Replace all occurrences of `https://www.linkedin.com/in/huruydesigns/` with `https://www.linkedin.com/in/huruykidanemariam/` and update display text from `linkedin.com/in/huruydesigns` to `linkedin.com/in/huruykidanemariam`.

### Files to update (8 files, ~15 occurrences)

1. **`src/pages/Index.tsx`** — hero link + JSON-LD `sameAs`
2. **`src/components/Footer.tsx`** — footer link
3. **`src/pages/Contact.tsx`** — contact link + JSON-LD `sameAs`
4. **`src/pages/Resume.tsx`** — contact array + JSON-LD `sameAs`
5. **`src/pages/ResumeAlt.tsx`** — contact array
6. **`src/pages/About.tsx`** — JSON-LD `sameAs`
7. **`src/lib/generateResumeDocx.ts`** — Word doc link + display text
8. **`supabase/functions/portfolio-chat/index.ts`** — AI chat context string

Simple find-and-replace across all files. No structural changes.

