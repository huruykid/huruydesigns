

## Remove Mobile Thumbnail Strip

### Change in `src/pages/Index.tsx`

Remove the mobile project thumbnail strip block (the `<div className="flex gap-3 mb-6 md:hidden ...">` section with the `projects.slice(0, 4).map(...)` loop). This is approximately lines 139-155.

No other files affected.

