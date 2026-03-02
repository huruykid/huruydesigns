

## Plan: Enrich the Asure Compliance Access Gate Preview

Currently the access gate shows a generic blurred placeholder (3 colored rectangles + text lines). This doesn't give visitors any sense of what the case study contains or why it's worth requesting access.

### Changes to `src/components/AccessGate.tsx`

Replace the generic blurred placeholder (lines 87-107) with a much richer preview layout:

1. **Show the actual interactive dashboard (blurred)** - Render the real `TaxComplianceDashboardDemo` inside a `ResponsiveAppShell`, wrapped in a blur + overlay. This gives visitors a genuine glimpse of the work's complexity and polish.

2. **Add key stats bar** - Show the stats (9,000+ Tax Codes, 3 Disciplines Aligned, 6 Entity Types Mapped, 1 Shared Mental Model) above or below the blurred preview to communicate scale and impact.

3. **Add a "What's Inside" preview list** - Below the blurred dashboard, add 3-4 short bullet points hinting at the case study sections (e.g., "System-wide entity mapping", "Interactive compliance dashboard prototype", "Cross-discipline discovery process", "Before/after navigation redesign").

4. **Keep the existing request form** unchanged below.

### Layout (top to bottom)
- Lock icon + title + description + tags + role (existing, unchanged)
- **Stats bar** (moved from full project page hero)
- **Blurred real dashboard** in a ResponsiveAppShell with overlay text
- **"What's Inside" section** - 3-4 teaser items with icons
- Request form card (existing, unchanged)

### Files to edit
- `src/components/AccessGate.tsx` - Replace generic blur placeholder with real dashboard + stats + teaser list

