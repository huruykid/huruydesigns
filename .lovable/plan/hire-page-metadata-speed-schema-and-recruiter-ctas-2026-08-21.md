# Hire Page: Metadata, Speed, Schema, and Recruiter CTAs

SSR is skipped per your call, so social previews stay sitewide-generic for LinkedIn and Facebook (those crawlers do not run JavaScript). Everything else below still lands.

## 1. Social preview reality check

- Verify what crawlers actually receive by fetching the published HTML for `/senior-ux-designer` and `/hire` and reading the static head.
- Make sure the static fallback in `index.html` is accurate and appealing as a sitewide card: correct title, description, `og:type`, absolute image, `twitter:card=summary_large_image`.
- Keep the per-route tags from the `SEO` component for Google and other JS-executing crawlers.
- I cannot log into Facebook Sharing Debugger or LinkedIn Post Inspector. I will give you the two direct debugger URLs plus what you should see, and you can hit "Scrape Again" / "Inspect" to clear their caches. Note: cached previews can lag a day or two after any tag change.

## 2. Core Web Vitals for /senior-ux-designer

Measure first with Lighthouse (mobile emulation) against a production build, then fix what the report names. Likely candidates already visible in the code:

- The hero block animates in with Framer Motion on mount, which delays LCP paint. Render hero text immediately and drop the entrance animation on the largest text element.
- Featured case-study images: add explicit width/height (or aspect ratio) and `loading="lazy"` / `decoding="async"` below the fold to cut layout shift.
- Preload the hero font weights already preconnected in `index.html`.
- Re-run Lighthouse after the changes and report before/after numbers for LCP, CLS, and TBT.

## 3. JSON-LD validation

- Validate the `Person` and `FAQPage` blocks on the page against schema.org and Google's structured-data rules.
- Fix issues found: `Person.seeks` currently carries a bare `Demand`; add `image`, `worksFor`, and `address` locality so the entity is richer and unambiguous.
- Add a `Service`/`ProfessionalService`-style offer block describing senior UX design engagements, linked to the Person entity.
- Honest note: `FAQPage` rich results were retired for most sites and `Person` is not a rich-result type, so passing validation means clean, machine-readable markup for Google and AI answer engines, not a guaranteed visual rich snippet.

## 4. "Available for Hire" CTAs

- Add a persistent availability signal: a small status pill ("Available for Hire") in the hero and a sticky bottom CTA bar on mobile that appears after the hero scrolls out.
- Add mid-page CTA buttons after the value props and after the FAQ so a recruiter never has to scroll back up.
- All CTAs route to the existing `/contact` page (your choice), passing a `?role=senior-ux-designer` hint so the contact form prefills its subject line with the role context.
- Keep the resume download CTA paired with each contact CTA, since recruiters usually want both.

## Technical notes

- Files touched: `src/pages/Hire.tsx`, `src/pages/Contact.tsx` (prefill from query param), `src/components/SEO.tsx` (if image/type gaps show up), `index.html` (static fallback tags only).
- No backend, no schema, no auth changes.
- Lighthouse runs headless in the sandbox against a local production preview build; results are directional but comparable before/after.
