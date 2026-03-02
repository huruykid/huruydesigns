

## Analysis

The homepage project cards have two different interactive preview treatments:

1. **Featured cards** (Asure, OneAsure): Use `ResponsiveAppShell` with traffic light dots, toggle pills, and scroll hints -- polished but heavy with labels
2. **Non-featured cards** (EBT Finder, Beles): Use a basic DIY phone shell (thin border, simple notch bar) that looks rough compared to `ResponsiveAppShell`

Issues across both:
- The "INTERACTIVE PREVIEW" label with pinging green dot is noisy and redundant -- the phone/desktop chrome already signals interactivity
- The `bg-muted/30` background is flat and doesn't create visual depth
- On non-featured cards, the DIY shell lacks polish (no status bar with time/icons, no home indicator, no glow)
- The scroll hint text below the shell adds visual noise on the homepage where scrolling the prototype isn't the primary action

## Plan

### File: `src/components/ProjectCard.tsx`

**1. Remove the "INTERACTIVE PREVIEW" badge entirely** (lines 49-55). On a portfolio homepage, the phone/desktop chrome is sufficient to communicate interactivity. Removing it declutters the preview area.

**2. Replace the DIY phone shell** (lines 69-88) for non-responsive projects with `ResponsiveAppShell` in mobile-only mode (no toggle). This gives EBT Finder and Beles the same polished phone chrome (rounded corners, status bar notch, home indicator, subtle glow) that the responsive projects get.

Changes:
- Remove the `responsiveProjects` set and `useResponsiveShell` branching
- All demo components use `ResponsiveAppShell` -- responsive projects get `allowToggle`, others get mobile-only (no toggle)
- Remove the "Interactive Preview" label with pinging dot
- Add a subtle gradient background to the preview area for depth (`bg-gradient-to-b from-muted/20 to-muted/40`)

**3. Simplify `ResponsiveAppShell` scroll hint** -- hide it when rendered inside project cards by passing a `compact` prop that suppresses the scroll hint and reduces spacing.

### File: `src/components/case-study/ResponsiveAppShell.tsx`

Add an optional `compact` prop that:
- Hides the "Scroll to explore" hint
- Reduces bottom margin spacing
- Still shows the mobile/desktop toggle if `allowToggle` is true

### Summary of visual changes

```text
Before (non-featured card):
┌──────────────────────────┐
│  ● INTERACTIVE PREVIEW   │
│  ┌────────────────────┐  │
│  │▬▬▬▬▬▬▬ notch ▬▬▬▬▬│  │
│  │                    │  │
│  │   demo content     │  │
│  │                    │  │
│  └────────────────────┘  │
│  ↓ Scroll to explore     │  (no toggle)
├──────────────────────────┤
│  Title, description, tags│
└──────────────────────────┘

After (non-featured card):
┌──────────────────────────┐
│  ┌────────────────────┐  │
│  │▬▬▬▬ status bar ▬▬▬│  │
│  │                    │  │
│  │   demo content     │  │
│  │                    │  │
│  │▬▬ home indicator ▬│  │
│  └────────────────────┘  │
│          ✨ glow          │
├──────────────────────────┤
│  Title, description, tags│
└──────────────────────────┘
```

Featured cards keep the mobile/desktop toggle but also drop the label and scroll hint.

