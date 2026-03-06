

## SEO Improvements

The site already has solid SEO foundations (react-helmet-async, JSON-LD, sitemap, robots.txt, canonical URLs). Here are the remaining gaps and fixes:

### 1. Remove duplicate static meta from `index.html`

`index.html` has hardcoded `<title>`, `<meta description>`, `<link canonical>`, and OG/Twitter tags that conflict with Helmet's dynamic injection. On client-side render, Helmet overrides them, but crawlers that don't execute JS (or are slow to) may see duplicates. Strip everything except charset, viewport, and the root div.

### 2. Add semantic heading hierarchy check

Already looks good (`h1` on Index, `h2` for sections). No change needed.

### 3. Add `alt` text audit for images

Ensure all `<img>` tags across case study components and project cards have descriptive `alt` attributes. Quick grep needed at implementation time.

### 4. Add `<meta name="theme-color">` to `index.html`

Improves mobile browser chrome appearance and is a minor ranking signal for mobile-first indexing.

### 5. Add preconnect hints for external origins

The OG image is hosted on `storage.googleapis.com`. Add `<link rel="preconnect">` for that origin to speed up social image loading.

### 6. Add `lang` attribute dynamically (already present statically — good)

No change needed.

---

### File changes

| File | Change |
|------|--------|
| `index.html` | Remove hardcoded title, description, canonical, OG, and Twitter meta tags (Helmet handles these). Add `<meta name="theme-color" content="#0f172a">` and `<link rel="preconnect" href="https://storage.googleapis.com">`. Keep charset, viewport, author. |
| `src/components/SEO.tsx` | Add `theme-color` meta tag injection so it's consistent across pages. |
| `public/sitemap.xml` | Update `lastmod` dates to `2026-03-06` to reflect recent changes. |

Three small file edits. No new dependencies.

