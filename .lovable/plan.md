

## Plan: Maximize interactive preview space in featured cards

Looking at the screenshot and code, there are two sources of wasted space:

1. **`py-8` padding** on the preview container (line 40) — adds 64px of vertical padding around the shell
2. **Desktop shell dimensions** could be larger since there's room within the 3/5 width area

**File: `src/components/ProjectCard.tsx`**

### Changes:

1. **Reduce vertical padding** on the preview area for featured cards: change `py-8` to `py-4` (keeps some breathing room without wasting space)
2. **Increase desktop shell size** for featured cards: bump `desktopWidth` from `480` → `540` and `desktopHeight` from `400` → `440` (line 60-61). This keeps the same aspect ratio (~1.2:1) while filling more of the available area
3. Keep mobile shell dimensions unchanged since mobile cards already fill their width well

```text
Before:  480 × 400 shell with py-8 padding
After:   540 × 440 shell with py-4 padding
```

The proportions stay the same (~1.35 width:height ratio), just scaled up with less padding around it.

