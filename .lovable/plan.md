

## Interactive "Just Friends" Mode Toggle Component

### What We'll Build
Replace the ImageSlot for the "Just Friends Option" feature with an interactive toggle demo component. Visitors can switch between "Dating" and "Just Friends" modes to see how the app experience changes -- reinforcing Semhal's persona and the community-first design philosophy.

### Design
The component will feature:
- A segmented toggle at the top: "Dating" | "Just Friends"
- Below, an animated preview card that changes based on the selected mode
- **Dating mode**: A sample match card showing a name, compatibility score, heart icon, and "Suggested by your Shmagele" label
- **Just Friends mode**: A sample community card showing a name, shared interests (e.g., "Tigrayan cooking, cultural events"), and a "Connect" button instead of a heart
- Smooth framer-motion crossfade transition between modes
- Theme-aware colors: accent tones for dating, a softer/warm tone for friends mode

### Technical Details

**New file: `src/components/case-study/JustFriendsToggle.tsx`**
- React component with `useState` tracking the active mode ("dating" | "friends")
- Two mock profile cards defined as data, one for each mode context
- Segmented control built with two styled buttons (active state highlighted)
- `framer-motion` with `AnimatePresence` for smooth card transitions on mode switch
- Uses Lucide icons: `Heart` for dating, `Users` for friends
- Consistent styling with existing case study components

**Modified file: `src/components/case-study/BelesCaseStudy.tsx`**
- In the solution features loop: conditionally render `JustFriendsToggle` instead of `ImageSlot` when `feat.imageSlot === "feature-just-friends"`
- Same pattern already used for the ShmageleFlowDiagram conditional

