## Current state

`src/components/SEO.tsx` already emits a baseline set of social tags on every route (home, projects, about, resume, contact):

- `og:title`, `og:description`, `og:url`, `og:type="website"`, `og:image`, `og:site_name`
- `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`

Gaps that hurt how links actually render on LinkedIn, X/Twitter, Slack, iMessage, Facebook:

1. Every page uses the same default OG image — project links don't show project-specific previews.
2. `og:type` is hardcoded to `website`, even on case-study pages where `article` is more accurate.
3. No `og:image:width` / `og:image:height` / `og:image:alt`. LinkedIn and Slack frequently fail to render large cards without explicit dimensions.
4. No `twitter:site` / `twitter:creator` handle, so X attributes the card to nobody.
5. The static fallback in `index.html` (for non-JS crawlers like LinkedIn/Slack/Facebook) is fine for the homepage but is the only thing those crawlers ever see — they don't execute Helmet. Worth confirming the chosen default image is the right one.

## Changes

### 1. `src/components/SEO.tsx`

Extend props and rendered tags:

- Add optional props: `ogType?: "website" | "article"` (default `"website"`), `imageAlt?: string`, `imageWidth?: number`, `imageHeight?: number`.
- Render additional tags inside `<Helmet>`:
  - `<meta property="og:image:width" />`, `<meta property="og:image:height" />`, `<meta property="og:image:alt" />`
  - `<meta property="og:type" content={ogType} />` (replace the hardcoded `website`)
  - `<meta name="twitter:site" content="@huruydesigns" />` and `<meta name="twitter:creator" content="@huruydesigns" />` (confirm handle with user — see Questions)
  - `<meta name="twitter:image:alt" content={imageAlt} />`
- Default image dimensions match the existing default OG image (1200×630 — confirm by inspecting the asset).

### 2. `src/pages/ProjectPage.tsx`

- Pass `ogType="article"` to `<SEO>` for the main case-study render (the access-gate branch stays `website`).
- Pass `image={project.ogImage ?? project.image}` so each project link previews with its own visual.
- Pass `imageAlt={\`${project.title} case study cover\`}`.

### 3. `src/lib/projects.ts`

- Add optional `ogImage?: string` field to the `Project` interface for projects whose `image` is not a good 1200×630 social card. Most projects can fall back to `project.image`.
- No data changes required unless the user wants to supply dedicated social cards (see Questions).

### 4. `src/pages/Index.tsx`

- Pass `imageAlt="Huruy Kidanemariam — UX Designer and Software Developer"` to `<SEO>` for the homepage. `ogType` stays default.

### 5. `index.html`

- Add `og:image:width="1200"`, `og:image:height="630"`, `og:image:alt="..."`, and `twitter:site` / `twitter:creator` to the static head so non-JS social crawlers (LinkedIn, Slack, Facebook) get the same enrichment for the homepage.

## Verification

- Open `view-source:` on `huruydesigns.lovable.app` and on a project URL after publishing — confirm tags are present.
- Run each URL through the LinkedIn Post Inspector and X Card Validator.
- Mark the relevant SEO findings fixed via `seo_chat--update_findings` after the next scan.

## Out of scope

- Generating new social card images (would require imagegen and user direction on style).
- SSR for accurate per-route previews on non-JS crawlers — would need a stack change. Per-route OG via Helmet still works for JS-executing crawlers (Googlebot, X, Discord).

## Questions for you

1. What's your X/Twitter handle? (I'll use it for `twitter:site` / `twitter:creator`. Skip if you don't want one.)
2. Each project's `image` field — is it a landscape 1200×630-ish asset suitable for social previews, or should I generate dedicated OG cards per project later?
