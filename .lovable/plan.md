

## Plan: Even-Sized 4-Card Grid with Balanced Interactive Previews

### Current State
- Homepage renders `projects[0]` as a `featured` card spanning full width (`md:col-span-2`) with a horizontal layout (`md:flex`)
- Remaining 3 cards are in a 2-column grid, creating an uneven 1+3 layout

### Changes

**1. `src/pages/Index.tsx` (lines 149-158)**
Remove the featured card treatment. Render all 4 projects identically in a 2x2 grid:
```tsx
<div className="grid md:grid-cols-2 gap-6">
  {projects.map((p, i) => (
    <ProjectCard key={p.id} project={p} index={i} />
  ))}
</div>
```

**2. `src/components/ProjectCard.tsx`**
- Remove all `featured` prop logic (the horizontal layout, larger text sizes, different tag counts, different shell dimensions)
- Optionally increase the default `shellWidth`/`shellHeight` slightly so the interactive previews look good in the equal-width cards (e.g. `shellWidth=220`, `shellHeight=380`)
- Keep the `ResponsiveAppShell` `desktopWidth` at a reasonable size for the half-width card (e.g. 380px)

### Result
All 4 project cards will be equal-sized in a clean 2×2 grid, each with the same card structure (image/preview on top, text below).

