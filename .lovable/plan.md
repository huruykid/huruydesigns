

## Plan: Make Asure Compliance Card Span Full Width

The desktop dashboard preview has a sidebar + content layout that gets cramped in a half-width card. The fix is to make the Asure card span 2 columns while keeping the other 3 cards in the grid.

### Changes

**`src/pages/Index.tsx` (lines 149-153)**

Render the Asure card (index 0) spanning full width, then the remaining 3 in the 2-col grid. Since 3 cards in a 2-col grid leaves one orphan, we can either accept that or use a 3-col layout for the remaining cards.

```tsx
<div className="grid md:grid-cols-2 gap-6">
  <div className="md:col-span-2">
    <ProjectCard project={projects[0]} index={0} featured />
  </div>
  {projects.slice(1).map((p, i) => (
    <ProjectCard key={p.id} project={p} index={i + 1} />
  ))}
</div>
```

**`src/components/ProjectCard.tsx`**

Re-add the `featured` prop with a horizontal layout (image left, text right on desktop) so the dashboard preview gets more width. Increase `desktopWidth` to ~480 for the featured card so the sidebar+content layout has room to breathe. Keep the standard card layout for non-featured cards.

Key featured-card differences:
- `md:flex md:items-stretch` on the card container
- `md:w-3/5` on the preview area, `md:w-2/5` on the text area
- `desktopWidth={480}` for the ResponsiveAppShell
- Larger title (`text-2xl`) and show more tags (6)

### Result
Asure Compliance spans full width with a comfortable desktop dashboard preview. The other 3 projects sit below in a 2-col grid (2 + 1).

