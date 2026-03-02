

## Plan: Swap text and image for Asure Compliance card

**File: `src/components/ProjectCard.tsx`**

Currently all featured cards use `md:flex-row` (image left, text right). For the Asure Compliance card specifically, we'll use `md:flex-row-reverse` to put text on the left and the interactive preview on the right.

**Change (line 22):** Add a prop-driven check — pass `project.id` into the flex direction logic on line 36:

```tsx
// line 36: add conditional reverse for asure-compliance
const reverseLayout = featured && project.id === "asure-compliance";

// In the className:
`... ${featured ? `md:flex-row${reverseLayout ? '-reverse' : ''} md:items-stretch` : ''}`
```

Single line change, no new components or props needed.

