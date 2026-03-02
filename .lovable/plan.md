

## Analysis

At tablet width (834px), the featured card uses `md:flex` with a `md:w-3/5` preview area. That gives the preview roughly **500px** of available width. But the `ResponsiveAppShell` renders the dashboard at a fixed `desktopWidth={580}`, which overflows the container — the left sidebar gets clipped (you can see "pliance", "cy", "ment" etc. cut off in the screenshot).

The root cause: **580px desktop shell inside a ~500px container**.

## Plan

### File: `src/components/ProjectCard.tsx`

Reduce the `desktopWidth` for featured cards from `580` to `480` so the dashboard fits within the 3/5 preview area at tablet widths. Also reduce `desktopHeight` proportionally to `400`.

**Line 60-61** — change:
```tsx
desktopWidth={featured ? 480 : 380}
desktopHeight={featured ? 400 : 520}
```

This keeps the dashboard legible and fully visible at the `md` breakpoint (768px+) while still looking good on larger screens. The container has `overflow-hidden`, so anything wider than the available space simply gets cropped — which is what's happening now.

### Alternative consideration

If you want the dashboard to stay at 580px on large screens but scale down on tablets, we could use a CSS `scale()` transform approach instead. But the simpler fix is reducing the fixed width to fit the smallest `md` breakpoint.

