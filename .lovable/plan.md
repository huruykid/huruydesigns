

## Maximize Google Search Presence for "Huruy Kidanemariam"

### Current State (Already Good)
- All pages have SEO component with unique titles/descriptions containing "Huruy Kidanemariam"
- JSON-LD structured data on Home (Person + ItemList) and About (ProfilePage)
- Sitemap.xml and robots.txt configured
- Breadcrumb JSON-LD on key pages
- Canonical URLs set

### What's Missing / Can Be Improved

**1. Add "Huruy Kidanemariam" to every page title**
Some titles don't include the full name prominently:
- Contact: "Contact Huruy Kidanemariam | UX Designer" ✓
- Resume: "Resume | Huruy Kidanemariam | UX Designer..." — name buried after "Resume"
- Project pages: ✓

Fix: Reorder titles so name comes first on Resume page.

**2. Add JSON-LD to pages that lack it**
- **Contact** page: No JSON-LD. Add `ContactPage` schema.
- **Resume** page: No JSON-LD. Add `Person` schema with `hasOccupation` and career details — this is the most impactful missing schema for name searches.

**3. Add a WebSite schema with SearchAction to homepage**
This helps Google understand the site as a unified entity tied to "Huruy Kidanemariam" and can generate sitelinks (multiple results from same domain).

**4. Add sameAs links consistently**
The Person JSON-LD on Index only has LinkedIn and email. Add the portfolio URL itself and match the About page's schema.

**5. Update sitemap.xml lastmod dates**
All dates say `2026-03-06`. Update to current date so Google knows content is fresh.

**6. Add inter-page linking in footer or nav**
Google rewards sites with strong internal linking. The footer should link to all key pages (About, Resume, Contact, Projects) to help Google discover and rank each page.

---

### Changes

| File | Change |
|------|--------|
| `src/pages/Resume.tsx` | Reorder title to "Huruy Kidanemariam | Resume – UX Designer". Add Person JSON-LD with job history. |
| `src/pages/Contact.tsx` | Add ContactPage JSON-LD schema with name. |
| `src/pages/Index.tsx` | Add WebSite JSON-LD schema for sitelinks. |
| `src/components/SEO.tsx` | No changes needed. |
| `src/components/Footer.tsx` | Add nav links to About, Resume, Contact for internal linking. |
| `public/sitemap.xml` | Update all `lastmod` to `2026-03-17`. |

### Beyond Code (Recommendations)
These are things you should do outside Lovable to dominate page 1:
- **Google Search Console**: Submit sitemap at `https://huruy.tech/sitemap.xml` and request indexing of each page
- **Publish the site** (click Update in publish dialog) so Google can crawl the latest version
- **Backlinks**: Your LinkedIn profile linking to huruy.tech is valuable. Add the URL to any other profiles (GitHub, Dribbble, Medium, etc.)
- **Google yourself** periodically and click your own results to signal relevance

