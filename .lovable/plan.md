

## Plan: Replace UX Pong with UX Slot Machine

Replace the current `HeroPongGame.tsx` with a new UX Slot Machine game component.

### Game Design

**Core Mechanic**: Three spinning reels, each containing UX principles/concepts. Click "SPIN" to play. Reels stop one by one (left → right) with a satisfying stagger.

**Reel Symbols** (with emoji icons):
- Reel items: Empathy, Usability, Accessibility, Hierarchy, Consistency, Feedback, Affordance, Clarity

**Winning Conditions**:
- **3 matching**: "Perfect Design System! 🎯" — big celebration
- **2 matching**: "Almost pixel-perfect! ✨"  
- **No match**: Witty UX roast (e.g., "Inconsistent design tokens!", "Jakob is disappointed")

**UX Twist**: Each spin result displays a short UX tip related to the winning/losing combination. Your headshot sits above the reels, reacting to results (happy/sad expression via CSS filter or overlay emoji).

**States**: idle (headshot + "Spin to test your UX luck"), spinning, result (shows message + play again)

### Visual Layout

Same ~340×340 canvas area. Built with **DOM/CSS** instead of canvas for smoother animations:
- Headshot circle at top (reuses existing import)
- 3 reel columns with CSS overflow hidden + translateY animation
- Accent-colored SPIN button below
- Result message area at bottom

### Files Changed

| File | Change |
|------|--------|
| `src/components/HeroPongGame.tsx` | **Rewrite** — replace Pong with Slot Machine (keep same export name to avoid touching Index.tsx) |

No changes needed to `Index.tsx` since we keep the same component name and export.

### Key Implementation Details

- Use `framer-motion` for reel spin animations (already installed)
- Each reel is a vertical strip of items animated via `motion.div` with `y` transforms
- Staggered stop: reel 1 stops after 0.8s, reel 2 after 1.2s, reel 3 after 1.6s
- Headshot uses the existing `@/assets/huruy-headshot.jpg` import
- Mobile: stays hidden (`hidden md:flex`)
- Zero skill required — pure click-to-play fun

