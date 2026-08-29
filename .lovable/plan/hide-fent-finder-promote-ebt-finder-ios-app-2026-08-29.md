# Hide Fent Finder & Promote EBT Finder iOS App

## 1. Hide Fent Finder from the homepage
- Filter `fentfinder` out of the project list rendered on the homepage in `src/pages/Index.tsx` (and its JSON-LD item list).
- The `/project/fentfinder` case study route stays live and reachable by direct link; sitemap unchanged.

## 2. App Store badge on the EBT Finder homepage card
- Add an "Available on the App Store" button (Apple logo + label) to the EBT Finder `ProjectCard`, styled like a compact ad banner below the stat row.
- Links to `https://apps.apple.com/app/ebt-finder/id6751323829` (region-free; Apple auto-redirects to the visitor's storefront, works on all devices).
- Opens in a new tab and stops click propagation so it doesn't trigger the card's case-study link.

## 3. Download banner on the EBT Finder case study page
- Add a promo banner in `EBTFinderCaseStudy.tsx` near the top (after the hero): app icon-style tile, headline "Get EBT Finder on iOS", short line about the live app, and an App Store button linking to the same URL in a new tab.

## Technical details
- Files: `src/pages/Index.tsx`, `src/components/ProjectCard.tsx`, `src/components/case-study/EBTFinderCaseStudy.tsx`.
- App Store URL stored as a constant; dark/light-mode safe styling using existing accent tokens; no em dashes.
- External link gets `target="_blank" rel="noopener noreferrer"` and an aria-label for accessibility.
