## Alternative Resume Page (Hidden)

Create a new resume variant at a non-linked route (`/resume/alt`) that's not discoverable from navigation — only accessible via direct URL.

### Key differences from the main resume


| Section          | Change                                                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Experience**   | Remove IMMERSE. Replace with "AI Product Designer & Builder" role (2024–Present) with Lovable/AI bullets. Keep Asure and Datable. Expand Datable bullets to fill space. |
| **Education**    | Show "Psychology Major" (or a variation of it) and "CSU Eastbay" only — no graduation year, no concentration/major subtitle                                             |
| **Certificates** | New sidebar section: Google UX Design Certificate, Lovable Top 1% Developer                                                                                             |
| **Summary**      | Adjusted to remove VR reference, lean into AI + enterprise                                                                                                              |


### File changes


| File                      | Change                                                                      |
| ------------------------- | --------------------------------------------------------------------------- |
| `src/pages/ResumeAlt.tsx` | New file — fork of `Resume.tsx` with modified data arrays and layout tweaks |
| `src/App.tsx`             | Add route: `/resume/alt` → `<ResumeAlt />`                                  |


### Data specifics for `ResumeAlt.tsx`

**Experience array** (3 roles):

1. **Asure Software** — same as current
2. **AI Product Designer & Builder** (2024–Present, Remote) — bullets about top 1% Lovable dev, AI-assisted product development, rapid MVP prototyping, full-stack workflows with backend APIs
3. **Datable — Product Designer** (2016–2020) — expand from 3 to 5-6 bullets to fill space (add bullets about user research, A/B testing, client presentations)

**Certificates section** in sidebar:

- Google UX Design Certificate
- Lovable — Top 1% Developer

**Education**: `CSU Eastbay` with `Psychology` only, no dates, no concentration line.

The page will not appear in the navbar or sitemap. No `noindex` meta needed since it's simply not linked — but we'll add `noindex` via Helmet to be safe.

Two file changes total.