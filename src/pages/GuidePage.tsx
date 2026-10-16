import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import GuideText from "@/components/guides/GuideText";
import GuideCta from "@/components/guides/GuideCta";
import NotFound from "./NotFound";
import { PERSON_REF, absoluteUrl } from "@/lib/seo";
import { GUIDES_UPDATED, GUIDES_UPDATED_LABEL, guideBySlug, guidePath, plainText } from "@/lib/guides";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{children}</p>
);

/** One App Store guide: short answer first, then the fix, first-hand notes, FAQ, one action. */
const GuidePage = () => {
  const { slug = "" } = useParams();
  const guide = guideBySlug(slug);
  if (!guide) return <NotFound />;

  const path = guidePath(guide.slug);
  const related = guide.related.map(guideBySlug).filter((g): g is NonNullable<typeof g> => Boolean(g));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url: absoluteUrl(path),
      mainEntityOfPage: absoluteUrl(path),
      dateModified: GUIDES_UPDATED,
      datePublished: "2026-10-16",
      image: absoluteUrl("/og/appstore.png"),
      author: PERSON_REF,
      publisher: PERSON_REF,
      isPartOf: { "@type": "CollectionPage", name: "App Store guides", url: absoluteUrl("/guides") },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={guide.seoTitle}
        description={guide.description}
        path={path}
        ogType="article"
        image="/og/appstore.png"
        imageAlt="App Store guides for apps built with Lovable and other AI tools"
        jsonLd={jsonLd}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "App Store guides", path: "/guides" },
          { name: guide.title, path },
        ]}
      />

      <article className="container py-14 sm:py-20">
        <div className="mx-auto max-w-[44rem]">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/guides" className="underline underline-offset-4 hover:text-foreground">App Store guides</Link>
          </nav>

          <Eyebrow>{guide.group === "rejection" ? "Common rejection" : "Getting on the App Store"}</Eyebrow>
          <h1 className="text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl">{guide.title}</h1>
          <p className="mt-5 text-sm text-muted-foreground">
            By <Link to="/about" className="underline underline-offset-4 hover:text-foreground">Huruy Kidanemariam</Link>, who shipped{" "}
            <Link to="/project/beles" className="underline underline-offset-4 hover:text-foreground">Beles</Link> and{" "}
            <Link to="/project/ebtfinder" className="underline underline-offset-4 hover:text-foreground">EBT Finder</Link> to the App Store.
            Updated <time dateTime={GUIDES_UPDATED}>{GUIDES_UPDATED_LABEL}</time>.
          </p>

          <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">The short answer</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground">
              <GuideText text={guide.short} />
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-medium tracking-tight text-foreground">{s.heading}</h2>
                {s.body?.map((p, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    <GuideText text={p} />
                  </p>
                ))}
                {s.steps && (
                  <ol className="mt-5 space-y-3">
                    {s.steps.map((step, i) => (
                      <li key={i} className="flex gap-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs text-foreground" aria-hidden="true">
                          {i + 1}
                        </span>
                        <span>
                          <GuideText text={step} />
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            {guide.fromExperience && (
              <section>
                <h2 className="text-2xl font-medium tracking-tight text-foreground">What I ran into</h2>
                <blockquote className="mt-4 border-l-2 border-foreground pl-5 text-base leading-relaxed text-foreground sm:text-lg">
                  <GuideText text={guide.fromExperience} />
                </blockquote>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-medium tracking-tight text-foreground">Questions</h2>
              <dl className="mt-4 divide-y divide-border border-y border-border">
                {guide.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-medium text-foreground">{f.q}</dt>
                    <dd className="mt-2 leading-relaxed text-muted-foreground">
                      <GuideText text={f.a} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <GuideCta from={guide.slug} />

            {guide.appleTerm && (
              <p className="text-sm text-muted-foreground">
                Apple calls this <span className="text-foreground">{guide.appleTerm}</span> in the App Review Guidelines.
              </p>
            )}

            {related.length > 0 && (
              <nav aria-label="Related guides">
                <h2 className="text-lg font-medium text-foreground">Related guides</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((g) => (
                    <li key={g.slug}>
                      <Link to={guidePath(g.slug)} className="group inline-flex min-h-11 items-center gap-2 text-foreground underline-offset-4 hover:underline">
                        {g.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default GuidePage;
