

## Analysis

The Tax Compliance Dashboard currently renders at:
- **Case study page**: 680px desktop shell (looks fine)
- **Homepage card (featured)**: 480px desktop shell (looks stretched/squished)
- **Homepage card (non-featured)**: 380px desktop shell

The user says it "fits but looks stretched vertically" — this means the content height is too tall relative to the width. The fix is to widen the desktop shell on the homepage card so the dashboard has more room, reducing the vertical stretch.

## Plan

### 1. Widen the desktop shell for the Asure card on the homepage

In `src/components/ProjectCard.tsx`:
- Increase the `desktopWidth` for featured cards from `480` to `580` (or `600`) so the dashboard layout breathes better
- This keeps it within the card's 3/5 preview area on desktop

### 2. Optionally reduce the inner content height

In `src/components/case-study/ResponsiveAppShell.tsx`:
- The desktop shell has a fixed inner height of `520px` (line ~137). Consider reducing it to ~420–440px so the dashboard isn't so tall in the homepage card context, or make it configurable via a `desktopHeight` prop.

### Files changed
- `src/components/ProjectCard.tsx` — increase `desktopWidth` for featured cards
- `src/components/case-study/ResponsiveAppShell.tsx` — add optional `desktopHeight` prop (default 520) so cards can use a shorter height

