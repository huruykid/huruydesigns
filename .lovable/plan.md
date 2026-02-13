

# Fix EBT Sign Image Not Displaying

## Problem

The image file exists at `public/images/ebtfinder/ebt-sign.png`, but the `sectionImages` mapping in `src/lib/projects.ts` doesn't include an entry for `"ebt-sign"`. The `getSlotImage()` helper returns `undefined`, so the `ImageSlot` component renders the placeholder instead of the image.

## Fix

**File: `src/lib/projects.ts`**

Add `"ebt-sign": "/images/ebtfinder/ebt-sign.png"` to the `sectionImages` object for the EBT Finder project, alongside the existing `"usda-screenshot"` entry.

That single line addition will make the image appear immediately.

