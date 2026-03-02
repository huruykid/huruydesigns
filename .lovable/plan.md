

## Plan: Make Recent Filings & Quick Actions full-width too

Same approach as the chart/deadlines change. The "Recent Filings & Payments" table and "Quick Actions" currently share a `grid-cols-5` row (3:2 split). Stack them vertically instead.

**File: `src/components/case-study/TaxComplianceDashboardDemo.tsx` (lines 371-434)**

1. Remove the `grid grid-cols-5` wrapper around the table and Quick Actions
2. Make the **Recent Filings & Payments** table full-width (remove `col-span-3`)
3. Move **Quick Actions** below the table as a full-width card (remove `col-span-2`)
4. Change Quick Actions from a 2x2 grid to a single horizontal row (4 columns) on desktop to use the wider space

```text
Before (desktop):
┌────────────────────┬──────────────┐
│  Filings Table     │ Quick Actions│
│  (3/5 width)       │ (2/5)        │
└────────────────────┴──────────────┘

After (desktop):
┌────────────────────────────────────┐
│  Filings Table (full width)        │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│  Quick Actions (full width, 4-col) │
└────────────────────────────────────┘
```

The table gets more room for columns (Date and Actions won't feel cramped), and the Quick Actions buttons spread out in a single row.

