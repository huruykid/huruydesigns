

## Problem Analysis

The `TaxComplianceDashboardDemo` component has two layout issues:

1. **Desktop version looks squished**: The dashboard renders a 130px sidebar + main content with 4-column stat grids and 3-column content grids. When embedded in the homepage ProjectCard (480px shell) or ProjectPage (520px shell), there's only ~350-390px left for the main content area, crushing everything.

2. **Mobile version table overflow**: The "Recent Filings & Payments" table has 5 columns (Document, Date, Status, Amount, Actions) that overflow the mobile shell width (~240-280px).

## Plan

### 1. Fix desktop layout density for small containers
In `TaxComplianceDashboardDemo.tsx`:
- Reduce sidebar width from 130px to ~110px and tighten padding/font sizes
- Change desktop stat cards from `grid-cols-4` to `grid-cols-2` (the container is too narrow for 4 columns)
- Change the chart+deadlines row from `grid-cols-3` to `grid-cols-5` with `col-span-3` / `col-span-2` split, or keep `grid-cols-3` but ensure the chart area has enough breathing room
- Reduce stat card value font-size from 16px to ~13px to prevent cramping

### 2. Fix mobile table overflow
In the same file:
- For the mobile layout, hide the "Date" and "Actions" columns from the filings table (show only Document, Status, Amount)
- Add `overflow-x-hidden` and `min-w-0` to ensure the table card stays within bounds
- Reduce document name text with truncation (`max-w-[100px] truncate`)

### 3. Tighten Quick Actions for desktop
- The Quick Actions panel shares the `grid-cols-3` row with the table; ensure it doesn't get too narrow by adjusting padding

### Files changed
- `src/components/case-study/TaxComplianceDashboardDemo.tsx` — all fixes in this single file

