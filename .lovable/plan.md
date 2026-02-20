

# Remove All Em Dashes From the Site

## Overview
There are approximately 296 em dash occurrences across 13 files. Each will be replaced with a contextually appropriate alternative based on how the em dash is being used.

## Replacement Strategy

Em dashes serve different purposes, so each will be replaced based on context:

| Usage Pattern | Replacement |
|---|---|
| Clause separator ("X — Y" joining two related thoughts) | Period or semicolon to split into two sentences/clauses |
| Parenthetical aside ("...a Shmagele — a traditional matchmaker — who...") | Commas |
| List/label separator ("Medical — $32.00") | Colon or pipe |
| Emphasis/continuation ("not just frustrated — they had lost trust") | Period or comma |
| Before a concluding phrase ("...reducing confusion — not a replacement") | Comma or period |

## Files to Update (13 total)

1. **src/pages/Index.tsx** - Hero tagline
2. **src/pages/About.tsx** - Bio and experience descriptions
3. **src/pages/Contact.tsx** - Contact page copy
4. **src/lib/projects.ts** - All project descriptions, challenges, solutions, findings, and learnings
5. **src/components/case-study/OneAsureCaseStudy.tsx** - Case study body text
6. **src/components/case-study/BelesCaseStudy.tsx** - Case study body text
7. **src/components/case-study/FentFinderCaseStudy.tsx** - Case study body text
8. **src/components/case-study/InterviewInsightCards.tsx** - Interview quotes and insights
9. **src/components/case-study/ShmageleFlowDiagram.tsx** - Step descriptions
10. **src/components/case-study/NavRedesignComparison.tsx** - Labels and quotes
11. **src/components/case-study/BenefitsModuleDemo.tsx** - Benefit item labels
12. **src/components/case-study/IterationTimeline.tsx** - Timeline descriptions
13. **src/pages/ProjectPage.tsx** - Project page content

## Approach
- Go file by file, reading each one carefully
- Replace every em dash with the most natural-sounding alternative (period, comma, colon, semicolon, or restructured sentence)
- Preserve the original meaning and tone throughout

