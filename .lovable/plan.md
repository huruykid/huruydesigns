

## Problem
The screenshot shows the PDF is rendering with the two-column layout but the content is still overflowing past one page. The `scale(0.67)` approach scales the visual rendering but the browser's print engine still calculates the element's original height for pagination, so it breaks across pages.

## Plan

### Change approach: use CSS `zoom` instead of `transform: scale()`

The `transform: scale()` approach doesn't actually reduce the element's layout size for print pagination — it only visually shrinks it while the original box dimensions remain. The browser still sees the full-height content and splits it across pages.

**`zoom`** property actually changes the element's layout size, so the browser's print engine will see the reduced dimensions and fit everything on one page.

### Changes in `src/pages/Resume.tsx`

Replace the `transform: scale(0.67)` block (lines 109-114) with:

```css
.resume-page > div {
  zoom: 0.75;
}
```

This is simpler, doesn't need the reciprocal width hack, and crucially tells the print engine the content is smaller — fitting it on one page. We'll also remove the container `max-width`/`padding`/`margin` overrides that fight with the zoom, and keep everything else (two-column force, colors, accent).

If `0.75` is still too large, we can reduce to `0.7` or `0.65`.

