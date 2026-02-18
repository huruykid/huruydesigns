
## Scrollable Phone Mockup for OneAsure Pay Screen

### What I Found

The current implementation renders the pay screen image inside a phone frame, but the image is fully expanded — showing its entire height (~750px+) at once. This creates a very tall, visually heavy block in the middle of the case study. The image itself is loading correctly and contains rich content (Pay header, Pay Breakdown donut chart, Deductions Calculator, etc.).

### Goal

Replace the static tall image with a compact, fixed-height phone shell (~500px tall) where the image scrolls naturally inside the phone body — just like a real phone screen. This makes it:
- Compact — takes up much less vertical space on the page
- Interactive — users can scroll through the app screen content inside the frame
- Realistic — mirrors the actual phone UX

---

### Implementation Plan

#### 1. Update the phone frame in `OneAsureCaseStudy.tsx`

The phone frame `div` currently has `overflow-hidden` with no fixed height, so the image stretches to full height. The fix:

- Give the phone screen area a **fixed height** (e.g. `h-[480px]`) 
- Make the inner image container `overflow-y-auto` (scrollable) with `-webkit-overflow-scrolling: touch` for smooth momentum scrolling on iOS
- Keep `overflow-hidden` on the outer rounded phone frame shell so scrollbars don't escape the frame border
- Add a subtle scroll indicator (a faint gradient fade at the bottom of the phone screen) to hint that the content is scrollable
- Add a small animated "scroll" icon or pill label below the phone ("Scroll to explore") that fades in after a brief delay

#### 2. Layout adjustment

The current layout is `flex` with the description text beside the phone. On the compact phone this still works well — we'll keep the side-by-side layout on desktop and stack on mobile.

- Adjust the description side to `max-w-[240px]` to better balance with the narrower phone
- Add a "scroll to explore" micro-label below the phone frame with a subtle bounce arrow

#### 3. Scroll container specifics

```text
Phone outer shell
├── Notch bar (h-6, static)
├── Screen area (h-[480px], overflow-y-auto, scroll-smooth)
│   └── img (w-full, object-cover, h-auto — natural full height)
└── Home indicator bar (h-4, static)
```

The scrollbar inside the phone will be hidden (using `scrollbar-hide` or inline style `scrollbar-width: none`) so it looks clean, but the content remains scrollable via touch/mouse wheel.

---

### Files to Modify

- **`src/components/case-study/OneAsureCaseStudy.tsx`** — update the phone frame block (lines 211–241) to:
  - Add a fixed-height scrollable screen area
  - Hide the native scrollbar
  - Add a bottom gradient fade overlay (positioned absolute, pointer-events-none) inside the phone to hint at scrollability
  - Add a "Scroll to explore ↓" micro-label below the phone with a subtle bounce animation using framer-motion
  - Add a home indicator bar at the bottom of the phone frame for realism

No new files are needed — this is a self-contained style update to the existing mockup block.
