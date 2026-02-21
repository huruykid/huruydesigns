

## Add Responsive Preview Toggle to Interactive Prototypes

### What Changes

A small toggle control will appear below each interactive preview, letting visitors switch between the mobile phone mockup and desktop browser frame on demand. This showcases your responsive design skills and makes the portfolio more interactive.

### Visual Layout

```text
+--[ Browser Chrome / Phone ]--+
|                               |
|       Interactive Preview     |
|                               |
+-------------------------------+
   [phone icon] [monitor icon]    <-- toggle pill
     "Scroll to explore"
```

### How It Works

- The `ResponsiveAppShell` will gain an optional `allowToggle` prop (default `false`)
- When `allowToggle` is `true`, a small pill-shaped toggle appears below the preview with a phone icon and a monitor icon
- Clicking an icon overrides the automatic viewport detection, forcing mobile or desktop layout
- The existing crossfade animation plays when switching
- By default (no toggle, or on pages where `allowToggle` isn't set), behavior stays exactly as it is today -- automatic viewport-based switching

### Implementation Details

**File: `src/components/case-study/ResponsiveAppShell.tsx`**

- Add `allowToggle?: boolean` to `ResponsiveAppShellProps`
- Add internal state: `forcedLayout: "mobile" | "desktop" | null` (null = auto/viewport-based)
- Resolve the active layout: if `forcedLayout` is set, use it; otherwise fall back to the `isMobile` hook
- Render a toggle pill below the "Scroll to explore" hint when `allowToggle` is true:
  - Two icon buttons (Smartphone + Monitor from lucide-react) inside a rounded pill
  - Active icon gets a filled background tint; inactive icon is muted
  - Subtle fade-in animation on mount
- Pass `layout` down through `children` using React.cloneElement so the demo components receive the correct `layout` prop when toggled

**File: `src/components/case-study/OneAsureCaseStudy.tsx`**

- Pass `allowToggle` to the two `ResponsiveAppShell` instances wrapping the Benefits and Pay modules

No changes needed to `BenefitsModuleDemo` or `PayModuleDemo` -- they already accept and respond to a `layout` prop.

