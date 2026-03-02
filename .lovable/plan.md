

## Plan: Enlarge headshot, add glow ring, reduce gap

### Changes in `src/pages/Index.tsx`

1. **Line 103** — Reduce gap from `gap-10` to `gap-6` to bring headshot closer to text.

2. **Lines 142-153** — Update the headshot block:
   - Increase size from `h-64 w-64` to `h-[300px] w-[300px]`
   - Wrap image in a container with a pulsing ring: `ring-4 ring-accent/30` with a CSS animation
   - Add an outer glow using `shadow-[0_0_40px_rgba(249,115,22,0.25)]` for a subtle orange glow effect

3. **Add a keyframe** via inline Tailwind `animate-` or a small `@keyframes` for a subtle pulsing ring that cycles opacity (e.g., `ring-accent/20` → `ring-accent/40`). We'll use framer-motion's `animate` prop for a clean breathing glow effect instead of custom CSS keyframes.

### Result
The headshot will be 300px, closer to the text, with a soft animated orange glow ring that pulses subtly.

