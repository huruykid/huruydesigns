

# Fix Cut-Off Images in Case Study Slots

## Problem
The `ImageSlot` component uses `object-cover` inside a fixed `aspect-video` (16:9) container. When the uploaded image is taller than 16:9 (like your search/filters screenshot), the bottom gets cropped.

## Solution
Switch from a fixed-aspect cropped container to one that shows the full image:

- **Remove the fixed aspect ratio** from the image container (keep it only for empty placeholder slots)
- **Change `object-cover` to `object-contain`** or simply let the image render at its natural aspect ratio with `w-full h-auto`
- The container will size itself to the image rather than forcing the image into a box

## Changes

| File | Change |
|------|--------|
| `src/components/case-study/ImageSlot.tsx` | When an image is present, render it with `w-full h-auto` (natural size) instead of `w-full h-full object-cover` inside a fixed aspect-ratio box. Keep the fixed aspect ratio only for the empty/placeholder state so it looks intentional. |

This is a one-line-level change -- swap the image rendering approach so the full image is always visible, whether it's portrait, landscape, or square.

