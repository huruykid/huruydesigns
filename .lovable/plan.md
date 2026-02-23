

# Rewrite SEO for huruy.tech

All references to `huruydesigns.lovable.app` will be replaced with `https://huruy.tech` across 5 files. This ensures Google indexes the correct domain when someone searches "Huruy Kidanemariam."

## Changes

### 1. `index.html`
- Update canonical URL from `huruydesigns.lovable.app` to `https://huruy.tech/`

### 2. `src/components/SEO.tsx`
- Change `SITE_URL` constant to `"https://huruy.tech"`

### 3. `src/pages/Index.tsx`
- Update the JSON-LD Person schema `url` to `"https://huruy.tech"`

### 4. `public/sitemap.xml`
- Replace all `huruydesigns.lovable.app` URLs with `huruy.tech` (7 entries)

### 5. `public/robots.txt`
- Update the Sitemap URL to `https://huruy.tech/sitemap.xml`

---

All changes are simple find-and-replace of the old domain with `huruy.tech`. No logic changes needed.
