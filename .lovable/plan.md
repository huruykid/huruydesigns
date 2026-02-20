

## Boost SEO for "Huruy Kidanemariam"

Right now, your site has a single set of meta tags in `index.html` that apply to every page. Search engines see the same title and description no matter which page they crawl. To rank for your name across multiple search results, each page needs its own unique title, description, and structured data.

### What will change

**1. Add per-page SEO meta tags**
Install `react-helmet-async` so each page can set its own `<title>` and `<meta>` tags dynamically. Every page will include "Huruy Kidanemariam" in the title for name recognition:
- Home: "Huruy Kidanemariam | UX Designer & Product Designer Portfolio"
- About: "About Huruy Kidanemariam | UX Designer with 8+ Years Experience"
- Contact: "Contact Huruy Kidanemariam | UX Designer"
- Each project page: "Huruy Kidanemariam | [Project Name] - UX Case Study"

**2. Fix index.html base meta tags**
- Change author from "Lovable" to "Huruy Kidanemariam"
- Add keyword-rich default description: "Huruy Kidanemariam is a UX Designer and Product Designer specializing in accessible, human-centered design for enterprise and social impact products."
- Add `og:url` and canonical link

**3. Add structured data (JSON-LD)**
Add a Person schema on the homepage so Google can show a rich knowledge panel:
- Name, job title, url, social links, image, description

**4. Create a sitemap.xml**
A static sitemap listing all pages (home, about, contact, and each project page) so search engines know every URL to crawl.

**5. Update robots.txt**
Add a reference to the sitemap so crawlers find it automatically.

### Technical details

**New dependency:** `react-helmet-async`

**New file: `src/components/SEO.tsx`**
A reusable component that takes title, description, and optional structured data, then renders the appropriate `<Helmet>` tags.

**Modified files:**
- `src/main.tsx` - Wrap app in `HelmetProvider`
- `src/pages/Index.tsx` - Add SEO component with Person JSON-LD schema
- `src/pages/About.tsx` - Add SEO with about-specific title/description
- `src/pages/Contact.tsx` - Add SEO with contact-specific title/description
- `src/pages/ProjectPage.tsx` - Add SEO with dynamic project title/description
- `src/components/Layout.tsx` - No changes needed
- `index.html` - Fix author, improve default description, add canonical
- `public/robots.txt` - Add `Sitemap:` directive

**New file: `public/sitemap.xml`**
Static sitemap with all page URLs using your published domain.
