# Move App Store Promo Banner Up + GA4 Click Tracking

## 1. Move the promo banner higher
- In `src/pages/ProjectPage.tsx`, render the banner near the top of the page (right under the back link / above the hero section) for projects with `appStoreUrl`, so it appears above the fold.
- Extract the banner from `src/components/case-study/EBTFinderCaseStudy.tsx` into a shared `AppStorePromoBanner` component, used by ProjectPage; remove it from the case study body.

## 2. Add UTM parameters to App Store links
- Update `appStoreUrl` in `src/lib/projects.ts` with UTM params plus Apple's campaign token:
  `?utm_source=portfolio&utm_medium=cta&utm_campaign=ios_installs&utm_content={placement}&ct=portfolio-{placement}`
- Placement varies per button: `homepage_card` (ProjectCard), `case_study_banner` (banner). Centralize in a small helper, e.g. `getAppStoreUrl(placement)`.

## 3. Google Analytics 4 click tracking
- Connect the Google Analytics connector (measurement ID arrives as `VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY`).
- Add `src/lib/analytics.ts`: initialize gtag.js once, expose `trackEvent()`.
- In `src/App.tsx`, send `page_view` events on route changes.
- Fire `app_store_click` events with `placement` parameter on:
  - The case study promo banner CTA
  - The homepage ProjectCard "Available on the App Store" button
- Clicks appear in GA4 under Events; UTM attribution shows in Apple App Analytics.

## Technical notes
- No em dashes in any copy.
- No backend changes; GA4 is frontend-only via the connector.
- No placeholder/prototype links.
