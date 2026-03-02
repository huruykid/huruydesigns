

## Plan

The case study hero for Asure Compliance currently uses `desktopWidth={520}` (default) and `desktopHeight={440}`, while the homepage card uses `desktopWidth={580}`, `desktopHeight={440}`, and `allowToggle`. 

### Change

**`src/pages/ProjectPage.tsx` (line 200)**  
Update the hero `ResponsiveAppShell` to match the homepage card props:
- Add `desktopWidth={580}`
- Add `allowToggle`
- Keep `desktopHeight={440}` (already set)

This single line change makes the case study hero identical to the homepage preview.

