

## Add Side Navigation to Desktop Interactive Previews

### What Changes

On desktop, the interactive previews (Benefits and Pay modules) will display a vertical sidebar navigation on the left side of the browser frame, replacing the hidden bottom nav. This makes the prototypes feel like authentic desktop enterprise applications.

### Visual Layout

**Mobile (unchanged):**
```text
+--------------------+
| Status Bar         |
| App Header         |
|                    |
|   Content Area     |
|                    |
| [Home][Time][Pay]  |  <-- bottom nav
+--------------------+
```

**Desktop (new):**
```text
+--[ Browser Chrome ]------------------+
| [red][yellow][green]    Pay Module   |
+------+-------------------------------+
| Home |                               |
| Time |       Content Area            |
| Pay* |       (scrollable)            |
| Bene |                               |
| More |                               |
+------+-------------------------------+
```

### Implementation Details

**1. Both `BenefitsModuleDemo.tsx` and `PayModuleDemo.tsx`**

- When `layout === "desktop"`, wrap the existing content in a horizontal flex layout:
  - Left: A narrow (~56px) vertical sidebar with the nav items stacked vertically, using the existing `navItems` array
  - Right: The existing scrollable content area (app header + body)
- The sidebar will have a light background, a right border, and show icons with small labels beneath each
- The active nav item gets highlighted with the teal accent color
- The bottom nav remains hidden in desktop mode (already the case)

**2. Sidebar styling**
- Width: ~56px, matching common enterprise app patterns
- Background: white with a subtle right border
- Each nav item: icon centered, small label below, vertical stack
- Active item: teal background tint, teal text
- Non-active items: gray text

**Affected files:**
- `src/components/case-study/BenefitsModuleDemo.tsx` -- add desktop side nav
- `src/components/case-study/PayModuleDemo.tsx` -- add desktop side nav

No changes needed to `ResponsiveAppShell.tsx` since the side nav lives inside the demo components themselves.

