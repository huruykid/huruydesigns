import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  TWITTER_HANDLE,
  absoluteUrl,
} from "@/lib/seo";

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
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
}

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

/**
 * Per-route head tags. Public routes are also prerendered at build time
 * (scripts/prerender.mjs), so these tags reach crawlers that never run JavaScript.
 */
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
  // og:image must be an absolute URL: social crawlers can't resolve relative paths.
  const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE);
  const ogImageAlt = imageAlt || DEFAULT_OG_IMAGE_ALT;
  const breadcrumbJsonLd = breadcrumbs ? buildBreadcrumbJsonLd(breadcrumbs) : null;
  const jsonLdBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

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
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      )}
    </Helmet>
  );
};

export { SITE_URL };
export default SEO;
