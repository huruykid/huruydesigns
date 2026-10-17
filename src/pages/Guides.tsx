import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import GuideCta from "@/components/guides/GuideCta";
import { PERSON_REF, absoluteUrl } from "@/lib/seo";
import { GUIDES_UPDATED, guidePath, guides, type Guide } from "@/lib/guides";

const PATH = "/guides";
const TITLE = "App Store Guides for Lovable and AI-Built Apps";
const DESCRIPTION =
  "Plain answers for apps built with Lovable, Bolt, Replit, v0 or Cursor: how to get on the App Store, and how to fix the rejections Apple sends most.";

const groups: { id: Guide["group"]; title: string }[] = [
  { id: "start", title: "Getting on the App Store" },
  { id: "rejection", title: "Common rejections, in plain words" },
];

/** The guides hub: two short lists, each guide one line. */
const Guides = () => (
  <>
    <SEO
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      image="/og/appstore.png"
      imageAlt="App Store guides for apps built with Lovable and other AI tools"
      breadcrumbs={[
        { name: "App Store Launch", path: "/appstore" },
        { name: "App Store guides", path: PATH },
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "App Store guides",
        description: DESCRIPTION,
        url: absoluteUrl(PATH),
        dateModified: GUIDES_UPDATED,
        author: PERSON_REF,
        hasPart: guides.map((g) => ({ "@type": "Article", headline: g.title, url: absoluteUrl(guidePath(g.slug)) })),
      }}
    />

    <div className="service-container service-section">
      <div className="mx-auto max-w-[44rem]">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">App Store guides</p>
        <h1 className="text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl">
          Built it with AI?{" "}
          <span className="font-serif-display block font-normal italic">Here's how to get it on the App Store.</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
          For apps made with Lovable, Bolt, Replit, v0 or Cursor. Each guide starts with the short answer.
        </p>

        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`guides-${group.id}`} className="mt-12">
            <h2 id={`guides-${group.id}`} className="text-xl font-medium tracking-tight text-foreground">
              {group.title}
            </h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {guides
                .filter((g) => g.group === group.id)
                .map((g) => (
                  <li key={g.slug}>
                    <Link to={guidePath(g.slug)} className="group flex items-start justify-between gap-6 py-6">
                      <span>
                        <span className="block text-lg font-medium text-foreground group-hover:underline group-hover:underline-offset-4">{g.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{g.description}</span>
                      </span>
                      <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <div className="mt-12">
          <GuideCta from="hub" />
        </div>
      </div>
    </div>
  </>
);

export default Guides;
