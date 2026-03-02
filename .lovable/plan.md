

## Plan

### Change: Full-width bar chart with deadlines below

**File: `src/components/case-study/TaxComplianceDashboardDemo.tsx` (lines 322-336)**

Currently the chart and deadlines sit in a `grid-cols-5` with a 3:2 split. Change this to stack them vertically:

1. Remove the `grid-cols-5` layout on the chart + deadlines wrapper
2. Make the chart card full-width (remove `col-span-3`)
3. Move the deadlines card below (remove `col-span-2`), keeping it full-width
4. Optionally lay out the deadline items in a 2-column grid on desktop to use the wider space well

```text
Before (desktop):
┌──────────────┬──────────┐
│  Bar Chart   │Deadlines │
│  (3/5 width) │(2/5)     │
└──────────────┴──────────┘

After (desktop):
┌─────────────────────────┐
│  Bar Chart (full width) │
└─────────────────────────┘
┌─────────────────────────┐
│  Deadlines (full width) │
│  (2-col grid on desktop)│
└─────────────────────────┘
```

This gives the bar chart room to breathe and makes the bars more readable. The deadlines section benefits from the wider layout with a 2-column arrangement on desktop.

