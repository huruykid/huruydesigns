

## Responsive Interactive Previews for OneAsure

### Concept
On mobile, keep the current phone mockup shell (as-is). On desktop, switch to a browser/desktop window shell with a wider layout, making the interactive demos feel like a real desktop application rather than a phone app.

### What Changes

**1. Create a responsive shell wrapper component**
- New file: `src/components/case-study/ResponsiveAppShell.tsx`
- Uses the `useIsMobile` hook to detect viewport
- Mobile: renders the existing phone mockup (rounded corners, notch, bottom bar)
- Desktop: renders a browser-style window frame (title bar with traffic light dots, wider container ~500-600px, no status bar/bottom nav)

**2. Update BenefitsModuleDemo to be layout-aware**
- Accept an optional `layout` prop: `"mobile" | "desktop"` (default `"mobile"`)
- Mobile: current behavior (narrow, status bar, bottom nav visible)
- Desktop: hide the faux status bar and bottom nav (the shell provides the chrome), use a wider card layout, potentially show items in a 2-column grid where it makes sense (e.g., the benefit list could show more info per row)

**3. Update PayModuleDemo similarly**
- Same `layout` prop approach
- Desktop: wider pay breakdown area, donut chart alongside legend instead of stacked, disbursement and history rows with more breathing room

**4. Update all three usage sites**
- **ProjectPage hero** (`HeroPhoneMockup`): Replace with `ResponsiveAppShell` wrapping `BenefitsModuleDemo`
- **ProjectCard** (homepage card for oneasure-portal): Keep as phone mockup since it's a thumbnail preview — no change needed here
- **OneAsureCaseStudy** (the two side-by-side phones in the Design Process section): On desktop, show both modules in browser-style shells side by side (or stacked browser windows); on mobile, keep phone mockups stacked

### Technical Details

**ResponsiveAppShell.tsx**
```
- Props: children, width (optional), label (optional)
- Uses useIsMobile() hook
- Mobile render:
    - Rounded phone shell (2.5rem corners, 260px wide)
    - Notch bar, bottom home indicator
    - Fixed height with overflow scroll
- Desktop render:
    - Browser-style frame (rounded-xl, ~520px wide)
    - Title bar with 3 colored dots (red/yellow/green) + centered label
    - Taller viewport (~500px) with overflow scroll
    - No phone-specific chrome (status bar, bottom nav)
```

**Demo component changes (BenefitsModuleDemo, PayModuleDemo)**
- Conditionally hide the built-in status bar and bottom nav when `layout="desktop"`
- Adjust padding and spacing for the wider viewport
- Benefits: show enrollment banner and benefit list rows with more horizontal space
- Pay: donut chart and legend can sit side-by-side; pay card can be wider

**Affected files:**
1. `src/components/case-study/ResponsiveAppShell.tsx` (new)
2. `src/components/case-study/BenefitsModuleDemo.tsx` (add layout prop, conditional rendering)
3. `src/components/case-study/PayModuleDemo.tsx` (add layout prop, conditional rendering)
4. `src/pages/ProjectPage.tsx` (update HeroPhoneMockup)
5. `src/components/case-study/OneAsureCaseStudy.tsx` (update Design Process mockups)
6. `src/components/ProjectCard.tsx` (no change — keeps phone shell for thumbnail)
