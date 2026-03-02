

## Plan: Light-mode print styles for resume PDF

Add print-specific CSS overrides to force a white background with dark text, so the PDF export looks clean and professional regardless of the site's dark theme.

### Changes in `src/pages/Resume.tsx` (print styles block, ~line 70-107)

Add these overrides inside the existing `@media print` block:

```css
/* Force light theme for print */
.resume-page, .resume-page * {
  color-scheme: light !important;
}
.resume-page .rounded-xl {
  background: white !important;
}
.resume-page, .resume-page div, .resume-page aside {
  background: white !important;
  color: #1a1a1a !important;
  border-color: #e5e5e5 !important;
}
.resume-page .text-muted-foreground,
.resume-page .text-foreground\/85 {
  color: #555 !important;
}
.resume-page .text-accent,
.resume-page .print-accent {
  color: #f97316 !important; /* keep orange accent */
}
.resume-page .resume-pill {
  background: #f3f4f6 !important;
  color: #333 !important;
  border-color: #d1d5db !important;
}
```

This preserves the orange accent color while switching everything else to a clean white/dark-text layout for PDF output.

