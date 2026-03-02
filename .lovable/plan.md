

## Assessment: No further changes needed

The print styles in `Resume.tsx` already comprehensively force a light theme for PDF export:

- **Backgrounds**: All `div`, `section`, `aside` elements → `white !important`
- **Text**: Headings/bold → `#1a1a1a`, muted → `#555`, body → `#1a1a1a`
- **Borders**: All → `#e5e5e5`
- **Pills**: `#f3f4f6` background, `#333` text
- **Accent**: Only `.text-accent` and `.print-accent` → `#f97316` (section headers, org names)
- **Bullets**: `li::before` → `rgba(249,115,22,0.6)` (just the marker, not body text)
- **Color scheme**: `color-scheme: light !important` on all elements

The greedy `[class*="text-accent"]` selector that was causing excess orange was removed in the last edit. That was the root cause — no remaining dark-mode-specific values can leak through since every element gets explicit hardcoded colors in the print stylesheet.

**Recommendation**: Test by toggling to dark mode and printing/saving as PDF to confirm. The output should be identical to a light-mode export. No code changes are required.

