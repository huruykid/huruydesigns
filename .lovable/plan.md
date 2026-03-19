

## 5 Game Ideas That Showcase Your Skills to Recruiters

### 1. UX Roast Machine
You paste any website URL (or pick from presets like "bad login forms"). The game shows a mock screenshot and you tap hotspots to identify UX issues — missing contrast, no error states, bad hierarchy. Each correct find earns points. **Shows**: Your eye for UX problems, heuristic evaluation skills.

### 2. Design System Builder
Three broken UI components appear (mismatched button, wrong spacing, inconsistent typography). Drag-and-drop the correct design tokens (color, spacing, font) onto each component to "fix" them. Timer optional. **Shows**: Design systems knowledge, attention to detail, component thinking.

### 3. UX Trivia Challenge
Flip a card → UX question appears (e.g., "What does Fitts's Law predict?") with 3 choices. Your headshot reacts to correct/wrong answers. After 5 questions, shows a score with a witty title ("Senior UX Architect" vs "Intern Energy"). **Shows**: Deep UX knowledge, that you actually understand the theory behind your designs.

### 4. Wireframe Speed Sketch
A brief appears: "Design a checkout flow for mobile." Three wireframe options slide in — pick the best one. Your headshot explains why the right answer works. Quick 3-round game. **Shows**: Design thinking, ability to evaluate solutions quickly, product sense.

### 5. Accessibility Audit Game
A mock UI appears with intentional a11y violations (missing alt text, low contrast, no focus states). Click to find all the issues before time runs out. Score reflects how many you caught. **Shows**: Accessibility expertise — a huge differentiator that recruiters increasingly care about.

---

### My Recommendation: **#3 — UX Trivia Challenge**

- Zero-friction (click to flip, click to answer)
- Directly proves you know UX theory, not just tools
- Educational for the recruiter too — they learn something
- Your headshot reacting adds personality
- Easy to implement with the existing framer-motion setup
- 5 questions keeps it under 60 seconds

### Implementation (if you pick Trivia)

| File | Change |
|------|--------|
| `src/components/HeroPongGame.tsx` | Rewrite — card flip UI, question bank, score tracker, headshot reactions |

Same 340×340 desktop-only layout. Uses framer-motion for card flip animations. ~15 curated questions, randomly picks 5 per session.

