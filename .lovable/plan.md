

# Auto-Generate OG Share Image Page

## Goal
Create a dedicated `/og` route that renders a styled 1200x630 card with your name, title, headshot, and brand colors. You can then screenshot it to use as your OG image -- giving you a polished, on-brand social preview without needing Figma or Canva.

## What Gets Built

A new page at `/og` that renders a pixel-perfect 1200x630px card featuring:
- **Navy background** (matching your dark theme `hsl(222, 47%, 6%)`)
- **Orange accent gradient** (your brand orange `hsl(25, 95%, 53%)`)
- Your **headshot** (from `src/assets/huruy-headshot.jpg`)
- **"Huruy Kidanemariam"** in Space Grotesk bold
- **"UX Designer & Product Designer"** subtitle
- **huruy.tech** domain text
- Decorative dot grid pattern (matching your homepage hero)

## How to Use It
1. Navigate to `/og` in your browser preview
2. Take a screenshot (or use a browser extension)
3. Replace the current `public/og-image.png` with the new screenshot
4. Update the OG image URL in `index.html` if needed

## Technical Details

### New file: `src/pages/OGImage.tsx`
- Fixed 1200x630 container with inline styles (no Tailwind) to ensure exact pixel dimensions
- Imports the headshot image and renders it in a circular frame
- Uses the same Space Grotesk + Inter font stack
- Orange gradient accent bar across the top
- Dot grid decorative element in the corner

### Modified file: `src/App.tsx`
- Add a route: `<Route path="/og" element={<OGImage />} />`
- No Layout wrapper so the card renders in isolation

This is a utility page for you only -- visitors won't see it unless they navigate to `/og` directly.
