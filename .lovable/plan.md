

# 8-Prompt Site Enhancement Plan

This plan covers all 8 prompts in sequence. Each is scoped to only the files and sections mentioned.

---

## Prompt 1: Hero Section Background Visual

**File:** `src/pages/Index.tsx`

Add decorative SVG elements to the hero section to fill the empty space above the headline. This will include:
- A subtle dot grid pattern using the accent/orange color at ~5% opacity positioned in the top-right area
- A few soft circular gradient blobs (accent color at 3-8% opacity) placed decoratively behind the content
- All elements will be absolutely positioned within the existing `relative overflow-hidden` hero section
- No changes to headline, subtext, buttons, or other content

---

## Prompt 2: Replace Skills & Tools Section

**File:** `src/pages/Index.tsx`

Replace the flat pill-tag cloud with 4 categorized cards:

| Category | Icon | Skills |
|---|---|---|
| Design & Prototyping | Palette | Figma, Prototyping, Wireframing, Visual Design |
| Research & Strategy | Search | User Research, Usability Testing, Information Architecture |
| Development | Code | React, HTML/CSS, JavaScript |
| Collaboration | Users | Agile, Design Systems, Cross-functional Teams |

Each card will have a small icon, category title, and skills listed below. Uses existing Card component. Grid layout: 2x2 on desktop, stacked on mobile.

---

## Prompt 3: Quantifiable Outcomes in OneAsure Case Study

**File:** `src/components/case-study/OneAsureCaseStudy.tsx`

Update the `outcomes` array (lines 94-98):
- "Administrators reported ~40% fewer errors thanks to clearer workflows and real-time notifications"
- "The sales team gained a product they could confidently demo, contributing to a 25% increase in enterprise prospect engagement"
- "Users no longer needed to manage 3 separate logins or navigate inconsistent interfaces, reducing onboarding time by ~50%"

---

## Prompt 4: Quantifiable Outcomes in EBT Finder Case Study

**File:** `src/pages/ProjectPage.tsx`

Two changes:
1. In the comparison chart (line 460), change `ebt: 100` to `ebt: 95` for "User satisfaction"
2. **File:** `src/lib/projects.ts` - Change the closing stats impact value from "Confidence, convenience, and reduced stigma" to "95% user satisfaction, 12x faster search, and reduced stigma"

---

## Prompt 5: Personalize About Page Bio

**File:** `src/pages/About.tsx`

Append to the existing bio paragraph (the `<p>` tag with "UX specialist with 8+ years..."):
"I'm drawn to projects where good design removes barriers, whether that means making enterprise software less frustrating or helping underserved communities access the tools they deserve. Design, for me, is about dignity."

---

## Prompt 6: Add "View Prototype" Buttons to Case Studies

**File:** `src/pages/ProjectPage.tsx`

Add a "View Prototype" button in the hero section of case study pages, after the tools badges and before the challenge card (around line 106-108). It will:
- Only show for projects that have rich case studies (`oneasure-portal` and `ebtfinder`)
- Use `variant="outline"` with accent-colored border/text styling
- Link to `"#"` as placeholder
- Include an arrow icon to indicate external link
- Text: "View Prototype"

---

## Prompt 7: Add Personality to Contact Page

**File:** `src/pages/Contact.tsx`

Add a new paragraph after the existing "Drop me a message..." text (after line 39):
"I'm especially excited about projects involving accessible design, social impact, and complex enterprise systems. Currently open to full-time roles and select freelance collaborations."

Styled with `text-sm text-muted-foreground/80` for lighter visual weight.

---

## Prompt 8: Micro-Interactions and Transitions

Multiple files affected:

**`src/components/Layout.tsx`** - Wrap page content in `framer-motion` `AnimatePresence` with a fade transition for route changes.

**`src/components/ProjectCard.tsx`** - Add `hover:shadow-lg hover:scale-[1.02]` and `transition-all duration-300` to the card wrapper (enhancing the existing hover styles).

**`src/pages/Index.tsx`** - Add staggered `whileInView` animations to the skills cards (from Prompt 2) and project section headings.

**`src/index.css`** or **`tailwind.config.ts`** - Add utility classes for smooth button/link hover transitions (subtle color shifts). Most buttons already have `transition-colors`; ensure consistency across all interactive elements.

**`src/components/case-study/CaseStudySection.tsx`** - The existing `whileInView` animation already handles scroll reveals. Add staggered children support by wrapping children content.

All animations will be 200-400ms, using `ease-out` timing. No content, layout, color, or typography changes.
