# Bring authentic Beles app data and flows into the portfolio case study

The live Beles app (belesconnect.app) has a rich staging cast and real flow mechanics. The portfolio's Beles case study currently uses generic placeholder names ("Berhane", "Selam", "Makda", "Yohannes") and invented match copy. This plan swaps in the real thing and points visitors to the live app.

## What changes

### 1. Authentic profile data in the demos
Source: `/tmp/cross-project/beles-.../src/lib/staging-fixtures.ts` (SEED_CAST).

- **BelesMatchDemo.tsx**: replace the 4 generic matches with real cast members, e.g. Hiwet Tesfay (29, Los Angeles, roots: Adwa, "Nurse, weekend hiker, keeper of the family jebena"), Yonas Berhe (Oakland, civil engineer, "I cook shiro better than my mother"), Feven Araya (Minneapolis, pharmacy student). Show name, city, and roots; strip the `[TEST]` suffixes.
- **JustFriendsToggle.tsx**: replace "Makda, 28" and "Yohannes, 24" with cast profiles whose `intents` actually include `friends` (e.g. Yonas Berhe has `["dating", "friends"]`), with real interests ("Football", "Cooking", "History") as the tag chips.

### 2. Real match-flow mechanics
Source: `match-overlay.tsx` and `shmagele_matchmaking.sql`.

- The real app's match screen says "It's a match, {name}!" for dating and "Kemay, {name}!" for friends, and when a match came through a Shmagele it shows a "{Matchmaker} suggested them" card with the matchmaker's note at the moment the match lands. Add that suggested-by card to BelesMatchDemo so the Shmagele mechanism is visible in the interaction, not just described in text.
- Keep the existing "Say Kemey" greeting button (matches the app's "kemay" language).

### 3. Live app link and updated status copy
- **projects.ts** (beles entry): update `timeline`/status framing from "tested prototype" to reflect the live web app; the case study's final "Where it stands" section in **BelesCaseStudy.tsx** gets rewritten to say Beles is now a live web app at belesconnect.app, with a "Visit the live app" external link (opens in a new tab, UTM-tagged like the App Store links).
- Keep the research narrative (8 interviews, two testing rounds) unchanged; only the status and demo data change.

## Technical details

- Files touched: `src/components/case-study/BelesMatchDemo.tsx`, `src/components/case-study/JustFriendsToggle.tsx`, `src/components/case-study/BelesCaseStudy.tsx`, `src/lib/projects.ts` (beles entry only).
- No new dependencies; data is inlined as a small typed array in the demo components (no import from the other project).
- Copy rules honored: no em dashes, no education mentions in portfolio copy (profile fields like `education` are simply not rendered).
- Verify with the existing test suite and a Playwright pass on `/project/beles` (desktop + mobile shell toggle).

## Out of scope

- No changes to other case studies, the homepage card system, or the chatbot.
- No live data fetching from the Beles backend; the portfolio stays self-contained.
