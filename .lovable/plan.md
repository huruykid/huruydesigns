
## Modern Swipe Matching: Remove from solutionFeatures

### Recommendation: Remove it

The "Modern Swipe Matching" entry is the weakest of the five features for three reasons:

1. **Empty details array** — Unlike every other feature, it has `details: []`. There's nothing substantive to say about it beyond the single-line description.

2. **It falls through to a blank ImageSlot** — With no uploaded image and no interactive component, it currently renders an empty dashed placeholder box in the middle of the Core Features flow. This actively harms the presentation.

3. **It's not Beles-specific** — Swipe matching is a commodity mechanic. The Beles case study's narrative strength comes from its *culturally distinctive* features — Shmagele, Just Friends, Event Discovery, and Notifications. Swipe matching dilutes that story.

---

### What the Core Features section looks like after removal

```text
Core Features
├── Shmagele Matching     → ShmageleFlowDiagram (interactive)
├── Event Discovery       → EventCarousel (interactive)
├── Just Friends Option   → JustFriendsToggle (interactive)
└── Match Notifications   → NotificationStack (interactive)
```

Every single feature has a meaningful interactive component. The narrative is tight and culturally focused.

---

### Specific Change

**File: `src/lib/projects.ts`**

Remove the entire `feature-swipe` object from `solutionFeatures`:

```ts
// DELETE this block:
{
  title: "Modern Swipe Matching",
  description: "Familiar dating app mechanics with Tigrayan-specific filters and preferences.",
  details: [],
  whyItMatters: "Provides a familiar experience for users accustomed to modern dating apps...",
  imageSlot: "feature-swipe",
},
```

No changes needed in `BelesCaseStudy.tsx` — the feature map already handles the remaining four slots cleanly.

---

### Files Modified
- `src/lib/projects.ts` — remove one entry from `solutionFeatures` array
