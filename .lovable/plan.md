

## Problem
The resume currently spills onto two pages when printed/saved as PDF. The content (3 jobs with 11 bullets, leadership, skills, education, side projects) needs to fit on a single US Letter page while preserving the site's design system (Space Grotesk headings, Inter body, orange accent, dark navy/white card style).

## Plan

### Tighten print styles in `src/pages/Resume.tsx`

Update the `@media print` block with these density changes:

1. **Reduce font size**: 10.5pt → 9pt
2. **Tighten line-height**: 1.4 → 1.3
3. **Reduce page margins**: 0.4in/0.5in → 0.25in/0.4in
4. **Compact the card**: Remove border-radius and shadow in print, reduce internal padding from `px-8 py-6` to print-specific smaller values
5. **Reduce spacing between sections**: Add print-specific utility overrides to shrink `space-y-6` gaps, `mb-6` margins, and `mb-5`/`mb-4`/`mb-3` heading margins
6. **Compact header**: Reduce name header padding (`pt-8 pb-6` → tighter in print)
7. **Shrink sidebar width**: 280px → 240px in print
8. **Tighten experience bullets**: Reduce `space-y-6` between jobs to `space-y-3`, `space-y-1` between bullets stays

Add print-specific CSS classes:
```css
.resume-page .rounded-xl { border-radius: 0 !important; }
.resume-page { padding: 0.25in 0.4in !important; }
.resume-sidebar { width: 220px !important; padding: 0.3rem 1rem !important; }
/* Compact all vertical spacing */
.resume-page .space-y-6 > * + * { margin-top: 0.5rem !important; }
.resume-page .space-y-4 > * + * { margin-top: 0.35rem !important; }
.resume-page .mb-6 { margin-bottom: 0.4rem !important; }
.resume-page .mb-5 { margin-bottom: 0.3rem !important; }
.resume-page .mb-4 { margin-bottom: 0.25rem !important; }
.resume-page .mb-3 { margin-bottom: 0.2rem !important; }
.resume-page .py-6 { padding-top: 0.4rem !important; padding-bottom: 0.4rem !important; }
.resume-page .pt-8 { padding-top: 0.5rem !important; }
.resume-page .pb-6 { padding-bottom: 0.3rem !important; }
.resume-page .px-8 { padding-left: 1rem !important; padding-right: 1rem !important; }
```

The on-screen view remains unchanged -- all changes are scoped to `@media print`. The design system (Space Grotesk headings, Inter body, orange accent color `#e8590c`) is preserved in print output.

### Single file change
- **`src/pages/Resume.tsx`** -- update the `<style>` print block (lines 66-93)

