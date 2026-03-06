

## Mobile Resume: Download Button + Mobile-Optimized Layout

### What changes

**1. Add a "Download PDF" button** that links directly to the existing static PDF at `/resume/huruy-kidanemariam-resume.pdf`. This gives mobile users a one-tap download instead of relying on `window.print()` (which is clunky on phones).

**2. Create a mobile-friendly single-column resume layout** that renders beautifully on small screens — stacking sidebar content (skills, education, side projects) below the main experience section instead of side-by-side. The current layout already does `flex-col` on mobile via `flex flex-col md:flex-row`, but the spacing, padding, and typography aren't optimized for mobile reading.

### File changes

| File | Change |
|------|--------|
| `src/pages/Resume.tsx` | Add a `Download` button next to the existing "Save as PDF" button that links to `/resume/huruy-kidanemariam-resume.pdf` with `download` attribute. Tighten mobile padding (`px-5` instead of `px-8`), reduce heading sizes on small screens, and reorder sections so **Summary → Experience → Leadership** appear first, then **Skills → Education → Side Projects** below on mobile (using `order` utilities). |

### Details

- The download button uses a plain `<a>` tag with `download` attribute — no JS needed
- Mobile layout reorders via Tailwind `order-1`/`order-2` classes so the main content comes first on small screens (sidebar currently renders first in the DOM)
- Reduce `px-8` → `px-4 md:px-8` throughout the resume card for better mobile margins
- Slightly smaller text sizing on mobile for the name header (`text-xl` → `text-2xl md:text-3xl`)

One file edit, no new dependencies.

