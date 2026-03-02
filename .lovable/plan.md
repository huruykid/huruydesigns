

## Plan: Fix Resume Print Styles & Hide Chat in Print

### Problem 1: Resume print doesn't match screen appearance
The current print CSS (lines 107-154 in `Resume.tsx`) forces light theme colors (`background: white`, `color: #1a1a1a`, etc.) regardless of the active theme. The user wants the PDF to look exactly like what's on screen — dark mode prints dark, light mode prints light.

**Fix**: Remove the "Force light theme for print" block (lines 107-154) that overrides all colors. Keep the structural print styles (layout, zoom, hiding nav) intact.

### Problem 2: ChatBubble appears in print
The floating chat button isn't hidden during print.

**Fix**: Add `print:hidden` to the ChatBubble's outermost wrapper elements (the floating button and the chat panel) so they disappear when printing.

### Files to change
- `src/pages/Resume.tsx` — Remove lines 107-154 (the forced light-theme print overrides)
- `src/components/ChatBubble.tsx` — Add `print:hidden` class to the fixed-position button and panel

