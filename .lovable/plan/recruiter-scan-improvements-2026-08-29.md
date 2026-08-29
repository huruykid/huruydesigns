# Recruiter-Scan Improvements

Recruiters spend roughly 30 seconds on a first pass and look for: current role, location, availability, resume access, and proof of impact. These are the gaps on the current site and the fixes.

## 1. Hero: answer "who, where, doing what now" instantly

The hero never says where you work or where you live. Recruiters filter on both.

- Add a current-role line under the intro paragraph: "Currently designing research tools for investment analysts at Capital Group."
- Add location and work preference to the credibility bar: "Los Angeles, CA" and "Open to Remote / Hybrid".
- Keep "8+ Years Experience" and "12M+ Users Impacted".

## 2. Hero: add a direct Contact CTA

Right now the only actions are "View My Work" and "Resume". A recruiter who is already sold has to hunt for contact.

- Add a third button: "Get in Touch" routing to `/contact?role=senior-ux-designer`.
- Make the PDF resume a one-click direct download (`/resume/huruy-kidanemariam-resume.pdf`) alongside the existing link to the full resume page, so a recruiter can save it without a second click.

## 3. Homepage availability signal

The "Available for Hire" pill only exists on /hire. Add a small status pill in the homepage hero (dot indicator + "Open to senior UX opportunities") that links to `/senior-ux-designer`.

## 4. Featured project order

Confirm the first two full-width featured cards are the strongest enterprise stories for your target roles (Asure Compliance and OneAsure), with EBT Finder as the scale/social-impact proof point. Reorder `src/lib/projects.ts` if needed.

## 5. Footer / contact polish

- Spell out the LinkedIn URL as text next to the icon in the hero social row so it is copy-pasteable for recruiter notes.
- No invented testimonials or stats. Anything not verifiable stays out.

## Technical notes

- Files touched: `src/pages/Index.tsx` (hero, CTAs, pill), possibly `src/lib/projects.ts` (order only).
- No backend, schema, or routing changes.
- Copy rules apply: no em dashes, CSU Eastbay only, no fabricated metrics.
