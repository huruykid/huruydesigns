

## Problem

The print/PDF styles have a CSS selector `[class*="text-accent"]` that's too greedy. Bullet list items use the class `before:text-accent/60` for the bullet marker, but the `[class*="text-accent"]` selector matches the whole `<li>` element and turns all its body text orange too. This makes the PDF appear with far too much orange text compared to what's shown on screen.

## Fix in `src/pages/Resume.tsx`

**Replace the broad print selectors** (lines 138-148) with more targeted ones:

1. Remove `[class*="text-accent"]` — it's matching elements that only use accent on pseudo-elements
2. Keep `.text-accent` and `.print-accent` as explicit class matches (these are the section headers and org names that should genuinely be orange)
3. For bullet `::before` pseudo-elements, target them directly with `.resume-page li::before` using the accent color
4. Ensure bullet body text (`text-foreground/85`) stays dark (`#333`) by not accidentally overriding it with orange

**Specific CSS change:**
```css
/* REMOVE this overly broad rule */
.resume-page [class*="text-accent"] { color: #f97316 !important; }
.resume-page [class*="before:text-accent"] { color: #f97316 !important; }

/* KEEP these targeted rules */
.resume-page .text-accent,
.resume-page .print-accent { color: #f97316 !important; }
.resume-page li::before { color: rgba(249, 115, 22, 0.6) !important; }
```

This is a ~6-line change in the print `<style>` block. No other files affected.

