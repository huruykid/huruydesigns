

## Analysis

The featured project cards have text content (impact label, title, description) clustered at the top, then a large empty gap, then tags pushed to the very bottom by `mt-auto`. This creates an awkward vertical gap that makes the cards feel hollow.

The root cause: the text container has `md:justify-center` but `mt-auto` on the tags wrapper overrides this by forcing tags to the bottom, splitting the content into two distant groups.

## Plan

**File: `src/components/ProjectCard.tsx` (lines 112-122)**

1. For featured cards, remove `mt-auto` from the tags wrapper so all text content stays grouped together and the parent's `md:justify-center` can vertically center everything as a unit
2. Increase spacing between description and tags slightly (`mb-4` instead of `mb-3`) for breathing room
3. Bump the featured description size to `text-lg` for more visual weight and to fill the space better
4. Add the project role as a subtle detail line between description and tags to give recruiters more context and fill space naturally

```text
Before:
┌──────────────────┐
│ Impact label     │
│ Title            │
│ Description      │
│                  │  ← awkward gap
│                  │
│ Tags (mt-auto)   │
└──────────────────┘

After:
┌──────────────────┐
│                  │
│ Impact label     │
│ Title            │  ← vertically centered
│ Description      │     as a group
│ Role             │
│ Tags             │
│                  │
└──────────────────┘
```

