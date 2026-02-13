

# Fix Competitive Audit Table for Mobile

## Problem

On mobile, the table's sticky first column overlaps content, column headers get cut off, and horizontal scrolling loses context. Tables with 5 columns simply don't work well on small screens.

## Solution

Switch to a **stacked card layout on mobile** where each feature becomes its own card showing all 4 competitors vertically. On desktop, keep the current table layout.

### Mobile Layout (below 768px)

Each feature renders as a card:

```text
+-------------------------------+
| Mobile-optimized UX           |
+-------------------------------+
| EBT Finder          [check]   |
| USDA SNAP Locator   [x]       |
| Google Maps          [check]   |
| Fresh EBT (Propel)  [check]   |
+-------------------------------+
```

- Feature name as the card header
- Each competitor on its own row with name + check/x icon
- EBT Finder row gets the accent highlight
- No horizontal scrolling needed

### Desktop Layout (768px+)

Keep the current table exactly as-is — it works great on wider screens.

## Technical Changes

**`src/components/case-study/CompetitiveAuditTable.tsx`**

- Import `useIsMobile` hook
- On mobile: render a vertical stack of cards (one per feature), each listing competitors with their check/x status
- On desktop: render the existing table unchanged
- EBT Finder rows in the mobile cards get the same `bg-accent/10` highlight

No other files need changes.
