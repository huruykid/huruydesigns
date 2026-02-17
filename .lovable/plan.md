

## Interactive "Existing Solutions Fall Short" Component

### What We'll Build
Replace the static bullet list with an interactive comparison component that lets users click through mainstream dating apps (Tinder, Bumble, Hinge) and see how each one fails to meet Tigrayan community needs. This creates a more engaging, storytelling-driven experience.

### Design
The component will feature:
- A row of app "cards" (Tinder, Bumble, Hinge) that users can click/select
- Each card shows the app's name and a brief tagline
- Below, an animated panel displays the specific pain points as interactive checklist-style items with red X marks, emphasizing what's missing
- A summary bar at the bottom showing "0/4 cultural needs met" reinforcing the gap
- Smooth framer-motion transitions between selections
- Theme-aware styling consistent with the existing case study design

### Technical Details

**New file: `src/components/case-study/ExistingSolutionsComparison.tsx`**
- A React component with `useState` to track which app is selected
- Three app options: Tinder, Bumble, Hinge -- each with the same four pain points but slightly tailored wording
- Pain points rendered with animated X icons and strikethrough-style treatment
- Uses framer-motion `AnimatePresence` for smooth panel transitions
- Uses existing Card, Badge components for consistency
- Color accents: red/destructive tones for the "missing" indicators, contrasting with the green/accent used elsewhere

**Modified file: `src/components/case-study/BelesCaseStudy.tsx`**
- Replace lines 31-45 (the static heading, paragraph, and bullet list) with the new `ExistingSolutionsComparison` component
- Keep the heading "Existing Solutions Fall Short" as a prop or within the component
- The ImageSlot below remains unchanged

