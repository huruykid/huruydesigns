

## Interactive Shmagele Matching Flow Diagram

### What We'll Build
Replace the `ImageSlot` for the Shmagele feature (in the "Core Features" section, line 49) with an interactive step-by-step flow diagram component. It will visually walk users through the Shmagele matching process -- from inviting a community matchmaker to reviewing a curated match -- using connected step nodes with icons and animations.

### Design
The component will render a vertical flow diagram with 5 connected steps:

1. **Invite Matchmaker** -- User invites a trusted elder or family member
2. **Matchmaker Reviews Profiles** -- The Shmagele browses compatible profiles
3. **Suggest a Match** -- Matchmaker sends a curated suggestion with a note
4. **Shmagele Score Calculated** -- App computes compatibility based on shared values
5. **Review Match** -- User sees the match card with compatibility explanation

Each step will be a styled card/node connected by a vertical line (connector). The currently "active" step will be highlighted, and users can click through steps or let them auto-advance. Each step expands to show a brief description when active.

Visual style:
- Vertical connector line in accent color
- Circle step indicators with icons (UserPlus, Search, Heart, BarChart, CheckCircle)
- Active step has accent border and expanded detail text
- Smooth framer-motion transitions when switching steps
- Theme-aware colors consistent with existing case study

### Technical Details

**New file: `src/components/case-study/ShmageleFlowDiagram.tsx`**
- React component with `useState` tracking active step (0-4)
- Five steps defined as data array with icon, title, and description
- Vertical layout with connecting line and circular step indicators
- Click-to-advance interaction on each step node
- `framer-motion` for expanding/collapsing step details with `AnimatePresence`
- Uses existing Card component and Lucide icons

**Modified file: `src/components/case-study/BelesCaseStudy.tsx`**
- In the solution features loop (~line 49): conditionally render `ShmageleFlowDiagram` instead of `ImageSlot` when `feat.imageSlot === "feature-shmagele-overview"`
- The second Shmagele `ImageSlot` at line 294 (in the detailed features section) remains unchanged for now
