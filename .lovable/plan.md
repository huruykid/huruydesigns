

## Plan: Add headshot avatar to resume header

Add the existing headshot image (`src/assets/huruy-headshot.jpg`) as a circular avatar in the top-right of the resume name header section.

### Changes in `src/pages/Resume.tsx`

1. **Import** the headshot image (already used in About page)
2. **Update the header section** (lines 136-157): Wrap the existing name/title/contact block and a new avatar image in a flex row with `justify-between`, placing the circular photo on the right

The avatar will be ~64px, circular, with object-cover styling — visible both on screen and in print.

