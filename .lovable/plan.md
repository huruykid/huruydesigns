

## Improve Word Document (.docx) Generation

### Issues Found

1. **Wrong accent color**: The docx uses `#2563EB` (blue), but the portfolio's accent color is orange (`#F97316` — the Tailwind `orange-500` / `hsl(25 95% 53%)`)
2. **Font sizes too small**: Body text is 9-10pt (sizes 17-20 in half-points). Should be bumped up to match a professional resume (~11-12pt body, ~16pt name, ~13pt title)
3. **Spacing too tight**: Section headings, bullet spacing, and gaps between jobs need more breathing room

### Changes — `src/lib/generateResumeDocx.ts`

- Change `ACCENT_COLOR` from `"2563EB"` to `"F97316"` (orange, matching the site)
- Increase font sizes across the board:
  - Name: 32 → 40 (20pt)
  - Title: 22 → 28 (14pt)
  - Contact links: 18 → 20 (10pt)
  - Section headings: 18 → 22 (11pt)
  - Body/bullets: 19-20 → 22-24 (11-12pt)
  - Sidebar skill labels: 18 → 20 (10pt)
  - Sidebar skill text: 17 → 19 (9.5pt)
  - Side project descriptions: 17 → 19 (9.5pt)
- Increase spacing between sections, jobs, and after bullets for better readability

No changes needed to `Resume.tsx` — this is purely the Word document output.

