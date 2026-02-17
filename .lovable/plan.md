
## Clean Up BelesCaseStudy.tsx: Remove Duplicate ImageSlots & Static Cards

### What's Wrong Right Now

Three areas of redundancy/leftover placeholders to fix:

1. **Shmagele ImageSlot (line 307)** — Inside "Key Features in Detail > 1. Shmagele Matching", there's a bare `ImageSlot slot="feature-shmagele"` that has no interactive replacement. The `ShmageleFlowDiagram` already lives in the "Core Features" section above (lines 56-58). This placeholder should be replaced with `ShmageleFlowDiagram` here too.

2. **Static notification quote cards (lines 335–348)** — Four `Card` elements display the exact same notification messages that the `NotificationStack` animated component already shows below them. These static cards are redundant and should be removed, leaving only `NotificationStack`.

3. **Static event description cards (lines 314–327)** — Four `Card` elements list event types (Tigray Festival, Mekete Fundraiser, etc.) immediately before the `EventCarousel` which already renders those same events as interactive cards. The static cards should be removed, leaving just `EventCarousel`.

---

### Specific Changes to `src/components/case-study/BelesCaseStudy.tsx`

**Change 1 — Replace `feature-shmagele` ImageSlot with ShmageleFlowDiagram (line 307)**

Remove:
```
<ImageSlot slot="feature-shmagele" label="Shmagele matching screens" ... />
```
Replace with:
```
<ShmageleFlowDiagram />
```

**Change 2 — Remove static event description cards before EventCarousel (lines 314–327)**

Remove the entire `div.grid` block containing the 4 static event description `Card` components (Tigray Festival, Mekete Fundraiser, Cultural Workshop, Support Groups). Keep only `<EventCarousel />`.

**Change 3 — Remove static notification quote cards before NotificationStack (lines 335–348)**

Remove the entire `div.space-y-3` block containing the 4 quoted notification `Card` components. Keep only `<NotificationStack />` (already wrapped in `div.mt-4`, which can be simplified to no wrapper).

---

### Result

The "Key Features in Detail" section becomes clean — each feature has its prose description, a contextual card explaining how it works, then directly the interactive component. No content duplication, no orphaned placeholders.

```text
Key Features in Detail
├── 1. Shmagele Matching
│   ├── prose description
│   ├── "How it works" Card
│   └── ShmageleFlowDiagram (interactive)  ← replaces ImageSlot
│
├── 2. Event Discovery
│   ├── prose description
│   └── EventCarousel (interactive)         ← static cards removed
│
└── 3. Match Notifications
    ├── prose description
    └── NotificationStack (interactive)      ← static quote cards removed
```

### Files Modified
- `src/components/case-study/BelesCaseStudy.tsx` — 3 targeted edits, no new files needed
