import { person } from "./resume";

export const SITE_URL = "https://huruy.tech";
export const PERSON_ID = `${SITE_URL}/#person`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_OG_IMAGE_ALT = "Huruy Kidanemariam, Senior UX Designer and Builder";
export const TWITTER_HANDLE = "@huruydesigns";
export const SITE_NAME = "Huruy Kidanemariam, UX Portfolio";

/** One Person entity, referenced by @id from every page's JSON-LD. */
export const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: person.name,
  givenName: person.givenName,
  familyName: person.familyName,
  jobTitle: person.title,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  email: `mailto:${person.email}`,
  description: person.positioning,
  address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA", addressCountry: "US" },
  worksFor: { "@type": "Organization", name: person.currentEmployerFull },
  knowsAbout: [
    "Senior UX Design",
    "Product Design",
    "Design Systems",
    "Accessibility (WCAG)",
    "User Research",
    "Enterprise SaaS",
    "AI and Conversational UX",
  ],
  sameAs: [person.linkedin],
} as const;

/** Short reference for nested author/provider fields. */
export const PERSON_REF = { "@id": PERSON_ID } as const;

export const absoluteUrl = (path: string) =>
  /^https?:\/\//i.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
