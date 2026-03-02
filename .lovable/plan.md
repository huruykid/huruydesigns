

## Plan: Update SEO for All Pages

### Current State
- **SEO component** exists with title, description, canonical, OG, Twitter, JSON-LD, and breadcrumbs
- **Missing from SEO component**: `og:image`, `twitter:image`, `twitter:card` meta tags — these are only set in `index.html` and don't update per-page
- **index.html** has duplicate/hardcoded OG and Twitter tags that conflict with Helmet-injected tags
- **Sitemap** is missing `/resume` and `/about` routes; missing `asure-compliance` project; no `<lastmod>` dates
- **NotFound page** has no SEO component
- **Resume page** has no description in SEO call

### Changes

#### 1. Enhance `src/components/SEO.tsx`
- Add `og:image` and `twitter:image` pointing to the uploaded social image
- Add `twitter:card` as `summary_large_image`
- Accept optional `image` prop, default to the social card URL
- Add `og:site_name` for brand consistency

#### 2. Clean up `index.html`
- Remove all duplicated `og:title`, `og:description`, `twitter:title`, `twitter:description` tags (lines 33-36) — Helmet handles these per-page
- Keep the fallback `og:image` and `twitter:image` for non-JS crawlers
- Remove the `<!-- TODO -->` comments

#### 3. Update per-page SEO calls
- **Index**: Already good — add breadcrumbs (Home)
- **About**: Already good
- **Contact**: Already good
- **Resume**: Add a proper description to the SEO call
- **ProjectPage**: Add JSON-LD `CreativeWork` schema per project
- **NotFound**: Add basic SEO with `noindex` robot directive

#### 4. Update `public/sitemap.xml`
- Add `/resume` page
- Add `/project/asure-compliance`
- Add `<lastmod>` dates
- Add `<changefreq>` hints

### Files to change
- `src/components/SEO.tsx` — Add image/twitter:card support
- `index.html` — Remove duplicate meta tags
- `src/pages/Index.tsx` — Add breadcrumbs to SEO
- `src/pages/Resume.tsx` — Add description
- `src/pages/ProjectPage.tsx` — Add CreativeWork JSON-LD
- `src/pages/NotFound.tsx` — Add SEO with noindex
- `public/sitemap.xml` — Add missing pages, lastmod, changefreq

