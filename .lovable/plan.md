
# Add Interactive Previews to EBT Finder and Beles Project Cards

## Goal
Add the same "Interactive Preview" treatment (pulsing badge + phone mockup with interactive content) to the EBT Finder and Beles project cards on the homepage, matching the existing OneAsure card style.

## Approach

### 1. Choose Interactive Components for Each Card

- **EBT Finder**: There is no standalone interactive demo component for this project. I will create a small `EBTSearchDemo` component -- a mini search/filter UI showing category pills (Hot Food, Grocery, Farmers Market, Open Now) and a couple of store result cards with ratings and "ACCEPTS EBT" badges. This mirrors the core value prop of the project.

- **Beles**: The `EventCarousel` component already exists and is compact, interactive (RSVP toggle), and visually engaging. It will work well inside a phone shell.

### 2. Update ProjectCard Component

Generalize the current OneAsure-specific interactive preview logic so it works for all three projects:

- Replace the `isOneasure` check with a mapping of project IDs to their interactive demo components
- Each mapped project gets the phone shell treatment with the pulsing "Interactive Preview" badge
- Projects without a mapping fall back to the standard image display

### 3. Create EBTSearchDemo Component

A new lightweight component (`src/components/case-study/EBTSearchDemo.tsx`) that renders:
- A search bar with location text
- Tappable filter pills (Hot Food, Grocery, Open Now, etc.)
- 2-3 mini store cards with name, rating stars, distance, and an "ACCEPTS EBT" badge
- Styled to fit inside the 220px-wide phone shell

---

## Technical Details

**New file:**
- `src/components/case-study/EBTSearchDemo.tsx` -- interactive mini search/filter UI

**Modified file:**
- `src/components/ProjectCard.tsx`:
  - Import `EventCarousel` and `EBTSearchDemo`
  - Create a `demoComponents` map: `{ "oneasure-portal": BenefitsModuleDemo, "ebtfinder": EBTSearchDemo, "beles": EventCarousel }`
  - Replace `featured && isOneasure` condition with a check against this map for any project
  - All three cards get the phone shell + pulsing badge treatment
  - Non-featured cards with demos also get the phone shell (slightly smaller, e.g. 180px wide) so the two bottom cards also show interactive previews
