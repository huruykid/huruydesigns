

## Plan: Remove all em dashes site-wide

I found em dashes (`—`) in **7 files** across the project (117 total matches). Here's the breakdown and what changes are needed:

### Files to edit

| File | Type of em dashes | Count |
|---|---|---|
| `src/lib/projects.ts` | User-facing text in project descriptions, problems, solutions, learnings | ~8 |
| `src/pages/Resume.tsx` | SEO title, summary text, side project description, plus CSS comments | ~5 (2 rendered, 3 comments) |
| `src/components/case-study/AsureComplianceCaseStudy.tsx` | Code comments only (already cleaned rendered text) | ~8 comments |
| `src/components/case-study/OneAsureCaseStudy.tsx` | Code comment only | 1 comment |
| `src/components/case-study/BelesCaseStudy.tsx` | Code comment only | 1 comment |
| `src/components/case-study/PayModuleDemo.tsx` | Code comments only | 2 comments |
| `src/components/case-study/TaxComplianceDashboardDemo.tsx` | 1 rendered value (`"—"` as placeholder amount), plus 1 comment | 2 |

### Approach

- **Rendered/user-facing text**: Replace em dashes with commas, colons, periods, or slight rewording depending on sentence context (same approach already used for the Asure case study)
- **Code comments**: Replace `—` with `–` or just remove for cleaner comments
- **Data placeholder** (`"—"` as amount in TaxComplianceDashboardDemo): Replace with `"N/A"` or `"-"`

### No other files affected
The AccessGate, Contact, About, Index, Footer, and Navbar files are clean.

