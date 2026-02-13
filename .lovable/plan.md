

# Build Competitive Audit as a Coded Component

## What Changes

Replace the `ImageSlot` placeholder for "competitive-audit" with a styled comparison table built directly in React, matching the look of your uploaded reference image but adapted to fit the portfolio's color palette and design system.

## Design Approach

The table will use your portfolio's existing design tokens (accent orange, muted backgrounds, border colors) and adapt automatically to dark/light mode. Instead of generic green/red circles, it will use your accent color for supported features and muted tones for unsupported ones.

**Layout:**
- Sticky first column with feature names on mobile (horizontal scroll for the competitor columns)
- Column headers: EBT Finder, USDA SNAP Locator, Google Maps, Fresh EBT (Propel)
- 5 feature rows: Mobile-optimized UX, Filter by Hot Food / Grocery Only, User reviews + ratings, Visuals of businesses (via API), Show only EBT-accepting businesses
- Check and X icons from lucide-react (Check, X) inside colored circles
- EBT Finder column subtly highlighted to stand out

## Technical Changes

### 1. New component: `src/components/case-study/CompetitiveAuditTable.tsx`
- Accepts data as props (competitors array, features array with boolean support per competitor)
- Renders a responsive table with proper styling
- Uses `Check` and `X` icons from lucide-react inside accent-colored and muted circles
- EBT Finder column gets a subtle accent background highlight
- Rounded card wrapper with border, matching existing Card styling

### 2. Update `src/pages/ProjectPage.tsx`
- In the competitive analysis section (~line 159), replace the `ImageSlot` for "competitive-audit" with the new `CompetitiveAuditTable` component
- Pass hardcoded data for EBT Finder's competitive audit (since this is project-specific content)

### 3. Data
The competitive data is hardcoded in the component usage since it's specific to EBT Finder. No changes to `projects.ts` needed.

**Features compared:**

| Feature | EBT Finder | USDA | Google Maps | Fresh EBT |
|---------|-----------|------|-------------|-----------|
| Mobile-optimized UX | Yes | No | Yes | Yes |
| Filter by Hot Food / Grocery Only | Yes | No | No | No |
| User reviews + ratings | Yes | No | Yes | No |
| Visuals of businesses (via API) | Yes | No | No | No |
| Show only EBT-accepting businesses | Yes | No | Yes | No |
