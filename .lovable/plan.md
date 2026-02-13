

## Resize Hero Image for Better Readability

### Problem
The uploaded hero image renders at its full natural size (`w-full h-auto`), which makes it excessively large and pushes all case study content far below the fold.

### Solution
Constrain the hero image in the `ImageSlot` component and the hero image container in `ProjectPage.tsx` so that uploaded images display at a reasonable, readable size.

### Changes

**1. `src/components/case-study/ImageSlot.tsx`**
- When an image is present, add a `max-h-[600px]` constraint and switch from `h-auto` to `object-contain` so the image scales down while preserving its aspect ratio
- This ensures no uploaded image — hero or otherwise — dominates the viewport

**2. `src/pages/ProjectPage.tsx`**
- Add a `max-h-[600px]` constraint to the hero image container specifically, ensuring the hero section stays compact regardless of the uploaded image dimensions

### Technical Details
- The `img` tag in ImageSlot's "has image" branch (line 83) will change from `className="w-full h-auto"` to `className="w-full max-h-[600px] object-contain"`
- The wrapping `div` will also get `max-h-[600px]` to prevent the container from being oversized
- All other image slots throughout the case studies will benefit from this same constraint, keeping layouts consistent

