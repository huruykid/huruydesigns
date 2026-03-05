

## Add Confetti on Perfect Score

**What**: When a player scores 5/5, trigger a confetti burst animation on the result screen.

**How**: Use a lightweight canvas-based confetti effect with `canvas-confetti` npm package (or a pure CSS/framer-motion particle approach to avoid adding a dependency).

**Approach — Pure framer-motion particles (no new dependency)**:
- In `src/components/HeroPongGame.tsx`, add a `ConfettiBurst` component that renders ~30 small colored circles using `framer-motion`
- Each particle gets random x/y trajectory, rotation, and fade-out over ~1.5s
- Render it conditionally in the `result` phase only when `score === 5`
- Particles animate from the center of the card outward

**File changes**:
| File | Change |
|------|--------|
| `src/components/HeroPongGame.tsx` | Add `ConfettiBurst` component (~25 lines), render it inside the result phase when `score === 5` |

