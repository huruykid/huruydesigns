import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  ogType?: "website" | "article" | "profile";
  jsonLd?: Record<string, unknown>;
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
}

const SITE_URL = "https://huruy.tech";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/kGTxCfCl6FWDdTknBfRBy7wDvqL2/social-images/social-1771881539918-Screenshot_2026-02-23_at_1.18.31_PM.webp";
const DEFAULT_OG_IMAGE_ALT =
  "Huruy Kidanemariam, Senior UX Designer and Builder";
const TWITTER_HANDLE = "@huruydesigns";

const buildBreadcrumbJsonLd = (breadcrumbs: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

const SEO = ({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  ogType = "website",
  jsonLd,
  breadcrumbs,
  noindex,
}: SEOProps) => {
  const normalizedPath = path.replace(/\/+$/, "") || "/";
  const url = `${SITE_URL}${normalizedPath}`;
  const rawImage = image || DEFAULT_OG_IMAGE;
  // og:image must be an absolute URL — social crawlers can't resolve relative paths.
  const ogImage = /^https?:\/\//i.test(rawImage)
    ? rawImage
    : `${SITE_URL}${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`;
  const ogImageAlt = imageAlt || DEFAULT_OG_IMAGE_ALT;
  const breadcrumbJsonLd = breadcrumbs ? buildBreadcrumbJsonLd(breadcrumbs) : null;

  // The static index.html carries baseline og/twitter tags for crawlers that do not run
  // JavaScript. Once React mounts, drop them so the per-route tags below are unambiguous.
  useEffect(() => {
    document
      .querySelectorAll("meta[data-fallback-social]")
      .forEach((el) => el.remove());
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="Huruy Kidanemariam, UX Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      <meta name="theme-color" content="#0f172a" />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      )}
    </Helmet>
  );
};

export { SITE_URL };
export default SEO;
