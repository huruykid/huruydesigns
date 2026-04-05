

## Move UX Trivia Challenge to the About Page

**Recommendation**: Option 1 — move to About page. Cleans up the homepage funnel (hero → projects with no distractions) and rewards visitors who are already curious about you.

### Changes

**1. `src/pages/Index.tsx`**
- Remove the `HeroPongGame` import (line 3)
- Remove `<HeroPongGame />` from the hero section (line 158)
- The hero will now be just the left-column intro text + social links, clean and direct

**2. `src/pages/About.tsx`**
- Add `import HeroPongGame from "@/components/HeroPongGame"`
- Insert `<HeroPongGame />` as a new full-width section after the main two-column grid (after the closing `</div>` of the grid), wrapped in a centered container with vertical padding
- Place it between the bio content and the footer, with a small heading like "Test Your UX Knowledge" for context

**3. No changes to `HeroPongGame.tsx`**
- The component is self-contained (all state/hooks are internal), so it migrates cleanly with just an import move

### Layout on About Page

```text
┌─────────────────────────────┐
│  Photo + Bio (existing)     │
│  Experience, Education...   │
├─────────────────────────────┤
│  "Test Your UX Knowledge"   │
│  [ UX Trivia Challenge ]    │
├─────────────────────────────┤
│  Footer                     │
└─────────────────────────────┘
```

Two files changed, zero logic modifications.

