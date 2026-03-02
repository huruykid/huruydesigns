

## Problem

On mobile viewports, the Asure Compliance card's `ResponsiveAppShell` renders the desktop shell at 540px wide — but the screen is only ~390px. The shell overflows horizontally and gets clipped by the card's `overflow-hidden`.

The `ResponsiveAppShell` starts in desktop mode when `forcedLayout` is null and `useIsMobile()` returns false (which depends on the 768px breakpoint). But even when it correctly shows desktop mode, the 540px shell simply doesn't fit on small screens.

## Fix

**File: `src/components/ProjectCard.tsx`**

Constrain the desktop shell width for featured cards so it doesn't overflow on smaller screens. Use `max-w-full` on the shell wrapper div and reduce the `desktopWidth` to something that fits within the card on mobile — or better, add a CSS `max-width: 100%` + `overflow-x: hidden` on the interactive preview container so the shell scales gracefully.

Two changes:

1. **Preview container (line 41):** Remove `overflow-hidden` and replace with `overflow-x-auto` or add `max-w-full` so the shell can shrink on mobile instead of being clipped silently.

2. **Shell wrapper (line 58):** Add `max-w-full overflow-hidden` to the div wrapping `ResponsiveAppShell`, so on narrow screens the shell scales down instead of overflowing. Use CSS `transform: scale()` approach — wrap in a container that measures available width and scales the shell to fit.

Simpler approach: just add `className="max-w-full overflow-hidden"` to the shell wrapper div at line 58, and on the `ResponsiveAppShell` pass capped `desktopWidth` values. Since the card on mobile is ~350px usable width, cap desktop width at the available space using a responsive value:

```tsx
// Line 58: Add scaling wrapper
<div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center">
  <div className="max-w-full" style={{ transform: 'scale(var(--shell-scale, 1))', transformOrigin: 'top center' }}>
    <ResponsiveAppShell ...>
```

Actually, the cleanest fix: on mobile viewports, the `ResponsiveAppShell` should default to mobile layout (phone shell) rather than showing the oversized desktop shell. The `useIsMobile` hook uses 768px. Looking at the screenshot, the user is on a narrow phone screen — `useIsMobile()` should return `true` there. Let me check if the issue is that `forcedLayout` persists as "desktop" after the user toggled it.

The screenshot shows the desktop shell (traffic lights) on a mobile screen with the toggle pill showing the desktop icon highlighted. This means the user (or the component) set `forcedLayout` to `"desktop"`. When toggled to desktop on a phone screen, the 540px shell overflows.

**Root cause:** When `forcedLayout === "desktop"` on a mobile viewport, the 540px desktop shell doesn't fit.

**Fix:** Scale the desktop shell down when viewport is narrow. Add a CSS scale transform wrapper:

**File: `src/components/ProjectCard.tsx` (line 58)**
```tsx
<div onClick={(e) => e.stopPropagation()} className="max-w-[calc(100vw-3rem)] overflow-hidden rounded-xl">
```

This caps the shell container width to the viewport minus padding, clipping it cleanly rather than having it overflow the card awkwardly.

**Better alternative — scale transform:**

**File: `src/components/ResponsiveAppShell.tsx`**
Add a scale-down wrapper when in desktop layout on a mobile viewport:

```tsx
// After the desktop shell div, wrap with a scaling container on mobile
const scale = isMobile && activeLayout === "desktop" 
  ? Math.min(1, (window.innerWidth - 48) / desktopWidth) 
  : 1;

// Wrap the desktop shell with:
<div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
```

This scales the entire desktop shell proportionally to fit the mobile screen while preserving the full layout. The user can still toggle to desktop view on mobile and see a scaled-down but complete desktop preview.

