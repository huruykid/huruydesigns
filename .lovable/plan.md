

## Plan: Add Mobile Layout to Tax Compliance Dashboard

The `ResponsiveAppShell` already passes a `layout` prop (`"mobile" | "desktop"`) to children. The `TaxComplianceDashboardDemo` currently ignores it and always renders the desktop layout with a sidebar and multi-column grids, which doesn't work in a narrow mobile frame.

### Changes to `TaxComplianceDashboardDemo.tsx`

1. **Accept `layout` prop** — add an optional `layout?: "mobile" | "desktop"` prop, defaulting to `"desktop"`.

2. **Hide sidebar on mobile** — conditionally hide the 130px sidebar. Replace it with a compact top bar showing the logo and a horizontal icon-only nav strip.

3. **Stack all grids to single column on mobile**:
   - Stat cards: `grid-cols-4` → `grid-cols-2`
   - Chart + Deadlines row: `grid-cols-3` → `grid-cols-1` (chart full width, then deadlines below)
   - Table + Quick Actions row: `grid-cols-3` → `grid-cols-1` (table full width, then quick actions below)

4. **Simplify header on mobile** — hide the user avatar/name on the right, keep just the title.

5. **Enable toggle in ResponsiveAppShell** — update `AsureComplianceCaseStudy.tsx` to pass `allowToggle` and appropriate `mobileWidth`/`mobileHeight` to the `ResponsiveAppShell` so users can switch between desktop and mobile views.

### Files Modified
- `src/components/case-study/TaxComplianceDashboardDemo.tsx`
- `src/components/case-study/AsureComplianceCaseStudy.tsx`

