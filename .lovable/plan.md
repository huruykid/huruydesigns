

## Word Resume (.docx) — Industry Standard Improvements

### Issues Identified from Screenshot

1. **Sidebar too wide (30%)** — pushes into main content, skills text wraps awkwardly. Industry standard: 25% or narrower sidebar.
2. **Skills use bullet separator ("•") inline** — looks cluttered. Comma-separated is cleaner and more ATS-friendly.
3. **No horizontal rule under header** — the PDF/web version has a visual separator between the header and body. Adding a thin orange border or line improves hierarchy.
4. **Date formatting inconsistent** — uses gray pipe separator (`|`) which looks faded. Industry standard: place dates right-aligned or use an em-dash.
5. **Bullet spacing too tight** — bullets at `after: 50` feel cramped. Slightly more breathing room (80-100) improves scanability.
6. **Summary font too large (12pt)** — at size 24, it's the same as job titles. Should be slightly smaller (11pt / size 22) to create hierarchy.
7. **No cell padding/margin between columns** — sidebar and main column text run close together. Need inner margins on cells.
8. **Section heading spacing could be more consistent** — Leadership section needs same visual weight as Experience.

### Plan — Changes to `src/lib/generateResumeDocx.ts`

1. **Narrow sidebar**: 30% → 25%
2. **Add cell margins**: Add `margin` to both TableCell configs to create gutter between columns (~200 twips right margin on sidebar, ~200 left on main)
3. **Add header separator**: Insert a thin orange bottom-border paragraph or horizontal rule after the contact line
4. **Skills formatting**: Change `join("  •  ")` to `join(", ")` for cleaner ATS-friendly display
5. **Increase bullet spacing**: `after: 50` → `after: 80`
6. **Summary size**: 24 → 22 to differentiate from job titles
7. **Date styling**: Keep pipe but darken color from `888888` → `666666` for better readability
8. **Consistent section spacing**: Standardize `before`/`after` values across all section headings

