

## Narrow Sidebar + Add Column Gap

### Changes in `src/pages/Resume.tsx`

1. **Reduce sidebar width**: Change `md:w-[280px]` to `md:w-[220px]` on the `<aside>` element (line 179)
2. **Add gap between columns**: Add `md:gap-6` to the two-column flex container (line 176) to create spacing between sidebar and main content
3. **Update print styles**: Change the print sidebar width from `240px` to `200px` (around line 99)

