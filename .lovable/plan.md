## Add Responsive Toggle to OneAsure Homepage Preview

### What Changes

Replace the hardcoded phone shell in `ProjectCard.tsx` with the existing `ResponsiveAppShell` component for interactive demo previews. This gives the OneAsure card (only the one asure card because EBTFinder/Beles interactieve cards are in mobile version only) a mobile/desktop toggle, defaulting to whatever device the visitor is using.

### Implementation Details

**File: `src/components/ProjectCard.tsx**`

- Import `ResponsiveAppShell` from `@/components/case-study/ResponsiveAppShell`
- Replace the manual phone shell markup (lines 42-69 -- the notch bar, rounded border, fixed-width container) with `<ResponsiveAppShell allowToggle desktopWidth={shellWidth === 220 ? 420 : 380}>` wrapping the `<DemoComponent />`
- Keep the "Interactive Preview" badge above the shell
- The `ResponsiveAppShell` already uses `useIsMobile()` internally to default to the visitor's device, so no extra logic is needed
- Remove the inline `shellWidth`/`shellHeight` constants since `ResponsiveAppShell` manages its own sizing

**File: `src/components/case-study/ResponsiveAppShell.tsx**` (minor tweak)

- Add optional `mobileHeight` and `mobileWidth` props so the homepage card can use slightly smaller dimensions than case study pages (e.g., 380px height vs 480px, 220px width vs 260px)
- Default values stay at the current 260px/480px so existing case study usage is unaffected

### What Stays

- The text content area, hover effects, Link wrapper, and badges in `ProjectCard` remain unchanged
- Non-interactive project cards (those without a `DemoComponent`) continue using the image fallback
- The `ResponsiveAppShell` scroll hint and toggle pill render as they already do in case studies