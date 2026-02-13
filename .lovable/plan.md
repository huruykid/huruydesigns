

# EBT Finder Case Study Overhaul + Image Upload

## Overview

Two major changes: (1) restructure the case study with your improved content across 9 sections, and (2) add image placeholders throughout that you can fill by uploading images through the chat.

## How Images Will Work

Since this is a static portfolio (no database needed), the best approach is:

- **Image placeholder slots** will appear throughout the case study where visuals belong (hero, USDA screenshot, competitive audit, app screenshots, etc.)
- Each slot shows a labeled placeholder with an "Upload via chat" instruction
- **To add an image**: Simply drag-and-drop or attach images in this chat, tell me which slot they belong to, and I'll place them in the project
- Images get saved to `public/images/ebtfinder/` and referenced directly — fast, simple, no backend needed

This avoids unnecessary complexity (no localStorage hacks, no base64 in code) and gives you permanent, fast-loading images.

## Content Restructure

The EBT Finder data model and page layout will be expanded to support all 9 sections from your improved case study:

### New/Updated Sections

1. **Hero** — Updated with "The Challenge" stat (12M SNAP users), role as "Product Designer (Solo Project)", 4-week timeline
2. **Problem and Context** — Problem bullets + impact callout + USDA screenshot slot + Insight block
3. **Research** — Competitive analysis with structured platform comparisons + competitive audit image slot + user interviews section with interview goals + EBT sign photo slot
4. **Research Findings** — 3 findings with quotes AND insight explanations (new field)
5. **Research to Design** — New section: mapping table from user needs to design solutions + wireframe image slot
6. **The Solution** — Expanded with 4 sub-features, each with their own image slot, description, and "why it matters" callout
7. **Design System** — New section for visual design principles + design system image slot + user flow diagram
8. **Impact and Validation** — Restructured with specific metrics (task success rate, satisfaction, trust, time saved)
9. **Learnings and Reflection** — Split into "What I Learned" (4 items) and "What I'd Do Differently" (3 items, new)
10. **Business Model and Next Steps** — New section with business model explanation + phased roadmap
11. **Closing Statement** — New emotional closing with key stats
12. **Appendix** — Image gallery for additional screenshots

### Technical Changes

**`src/lib/projects.ts`**
- Extend `Project` interface with new optional fields: `challenge`, `problemImpact`, `interviewGoals`, `findingInsights`, `researchToDesign`, `solutionFeatures`, `designPrinciples`, `userFlow`, `validationMetrics`, `whatIdDoDifferently`, `businessModel`, `phasedRoadmap`, `closingStatement`, `appendixImages`, and multiple `sectionImages` fields
- Update EBT Finder data with all new content

**`src/pages/ProjectPage.tsx`**
- Redesign layout to render all 9+ sections with proper hierarchy
- Add `ImageSlot` component that shows a labeled placeholder with dimensions guidance
- Add the research-to-design mapping table
- Add solution sub-features with individual image slots
- Add validation metrics as stat cards
- Add "What I'd Do Differently" subsection
- Add business model and phased roadmap sections
- Add closing statement and appendix gallery

**`public/images/ebtfinder/`** (directory)
- Will hold uploaded images as you provide them

### Image Slots (13 total)

| Slot | Description |
|------|-------------|
| hero | Main app screen or USDA vs. your design comparison |
| usda-screenshot | Cluttered USDA site screenshot |
| competitive-audit | Comparison table graphic |
| ebt-sign | SNAP/EBT Accepted sign photo |
| wireframes | Annotated wireframes mapping research to features |
| feature-search | Homepage with filters |
| feature-profiles | Business detail page (Subway example) |
| feature-map | Map interface |
| feature-community | Profile page with reviews |
| design-system | Colors, typography, buttons, icons |
| user-flow | Journey diagram |
| validation-chart | Comparison chart or stat visualization |
| appendix-1 through appendix-6 | Additional app screenshots |

