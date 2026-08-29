# Fix App Store Badge to Single Line

## Problem
The App Store promo badge under the EBT Finder title currently stacks "Download on the" and "App Store" on two lines. It should read as one continuous line.

## Changes
1. Update `src/components/AppStorePromoBanner.tsx` so the label text renders on a single line.
2. Keep the Apple logo, dark badge styling, UTM link, click tracking, and accessibility label unchanged.
3. Adjust font sizes and spacing as needed so the single line remains balanced and readable.

## Files
- `src/components/AppStorePromoBanner.tsx`
