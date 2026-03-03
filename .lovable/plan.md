

## Plan: UX Pong — Hero Section Game

Replace the static headshot on desktop with an interactive Pong game where your face is the ball.

### Game Concept

- **Your headshot** is the ball, bouncing between two paddles
- **Paddles** are labeled with UX principles: left paddle = "Empathy", right paddle = "Usability" (or similar rotating labels)
- **Scoring**: each successful volley increments a score. Missing the ball triggers a "Dark Pattern detected!" or "Heuristic violation!" message with a brief screen shake
- **Start state**: your headshot sits static (current look) with a subtle "Click to play" prompt. Game activates on click
- **Idle/end state**: after game over, headshot returns to its resting position with score displayed and "Play again?" option

### Layout

The game canvas replaces the `motion.div` containing the headshot (right side of hero, desktop only). Same ~300x300 area. On mobile, the game is hidden — no change to mobile layout.

### Technical Approach

- **New component**: `src/components/HeroPongGame.tsx` — a self-contained React component using `<canvas>` with `requestAnimationFrame`
- **Ball rendering**: draw your headshot image (circular clip) as the ball on the canvas
- **Paddles**: drawn as rounded rectangles with UX labels rendered via `fillText`
- **Controls**: mouse/trackpad moves the right paddle vertically; left paddle is AI-controlled
- **State machine**: idle → playing → game-over, managed with `useState`
- **Styling**: canvas gets `rounded-2xl` wrapper, same glow ring animation as current headshot via framer-motion on the container

### Files

| File | Action |
|------|--------|
| `src/components/HeroPongGame.tsx` | **Create** — full game component (~200 lines) |
| `src/pages/Index.tsx` | **Edit** — swap headshot `motion.div` for `<HeroPongGame />` on desktop, keep headshot import for the game to use |

### UX Details

- Ball speed increases slightly each volley
- On miss: brief red flash + witty UX anti-pattern message (randomized from a list: "Dark pattern detected!", "Jakob's Law violated!", "Where's the affordance?!")
- On 5-point streak: "Pixel perfect!" celebration text
- Score persists in top-right of canvas
- Subtle canvas border matching `ring-4 ring-accent/30` to blend with current design

