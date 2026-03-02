

## Plan: Accessibility Audit — Alt Text & Aria-Labels

After reviewing all pages and components, the site is already in good shape. Here are the specific gaps to fix:

### Issues Found

1. **Navbar mobile hamburger button** (`src/components/Navbar.tsx`, line 53) — Missing `aria-label`. The button only contains an icon (Menu/X) with no accessible name.

2. **About page headshot alt text** (`src/pages/About.tsx`, line 88) — Generic `alt="Huruy Kidanemariam"`. Should be more descriptive: `"Huruy Kidanemariam, UX Designer"`.

3. **Resume page headshot alt text** (`src/pages/Resume.tsx`, line 160) — Same generic alt. Should match: `"Huruy Kidanemariam, UX Designer"`.

4. **Index page DotGrid SVG** (`src/pages/Index.tsx`, line 37) — Decorative SVG missing `aria-hidden="true"` and `role="presentation"`.

5. **AccessGate decorative icons** (`src/components/AccessGate.tsx`) — The Lock icon in the header (line 66) is decorative but not hidden from screen readers. Add `aria-hidden="true"`.

6. **Footer social links** (`src/components/Footer.tsx`) — Already have aria-labels. No changes needed.

7. **ChatBubble** — Already has aria-labels on all buttons. No changes needed.

### Files to Change

| File | Change |
|------|--------|
| `src/components/Navbar.tsx` | Add `aria-label="Toggle navigation menu"` to mobile menu button |
| `src/pages/About.tsx` | Improve headshot alt text |
| `src/pages/Resume.tsx` | Improve headshot alt text |
| `src/pages/Index.tsx` | Add `aria-hidden="true"` and `role="presentation"` to DotGrid SVG |
| `src/components/AccessGate.tsx` | Add `aria-hidden="true"` to decorative Lock icon |

All changes are single-line attribute additions — no structural changes needed.

