

## Analysis

The "THE CHALLENGE" card at lines 187-194 of `ProjectPage.tsx` renders as a boxed `Card` component with an accent background (`bg-accent/5`) and border (`border-accent/30`). Sitting below the stats bar, it creates a heavy stack of distinct visual blocks in the left column: title → description → role/timeline → tools → stats bar → challenge card. The card format makes it feel like a separate module rather than part of the narrative flow.

For the Asure case study specifically, this content is also repeated almost verbatim in Section 01 of `AsureComplianceCaseStudy.tsx`, making it doubly redundant.

## Plan

### File: `src/pages/ProjectPage.tsx` (lines 187-194)

Replace the `Card` component with a subtle left-border blockquote style that flows naturally with the text content above it:

```tsx
{project.challenge && (
  <div className="border-l-2 border-accent/40 pl-4 max-w-2xl">
    <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-1">The Challenge</p>
    <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
  </div>
)}
```

This removes the boxy card appearance and makes the challenge text feel like a natural continuation of the hero narrative — similar to a pull quote. The left accent border provides just enough visual distinction without creating another container in an already dense column.

