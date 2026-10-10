import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { publicProjects } from "@/lib/projects";
import { person, resumePdfPath } from "@/lib/resume";
import { PERSON, PERSON_REF, SITE_URL, absoluteUrl } from "@/lib/seo";
import SEO from "@/components/SEO";
import { imageDimensions } from "@/lib/imageDimensions";

const FEATURED = ["asure-compliance", "beles", "ebtfinder"];
const visibleProjects = publicProjects();
const featured = FEATURED.map((id) => visibleProjects.find((p) => p.id === id)!).filter(Boolean);
const moreWork = visibleProjects.filter((p) => !FEATURED.includes(p.id));

const proofPoints = [
  { value: "8+ years", label: "enterprise UX in payroll compliance, HR platforms and financial services" },
  { value: "9,000+", label: "tax agencies configured through the compliance model I designed at Asure" },
  { value: "Shipped", label: "a consumer app I researched, designed, built and released myself" },
];

const hiringFacts = [
  "Senior UX, senior product design and staff UX roles: full-time, contract or consulting.",
  `Based in ${person.location}. Remote, hybrid or relocation.`,
  "I reply to hiring emails within one business day.",
];

const jsonLd = [
  { "@context": "https://schema.org", ...PERSON },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Senior UX Design Portfolio, Huruy Kidanemariam",
    itemListElement: visibleProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "CreativeWork", name: p.title, description: p.description, url: absoluteUrl(`/project/${p.id}`), author: PERSON_REF },
    })),
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: "Huruy Kidanemariam, Senior UX Designer Portfolio", url: SITE_URL, author: PERSON_REF },
];

const Index = () => (
  <>
    <SEO
      title="Huruy Kidanemariam | Senior UX Designer, Los Angeles"
      description={person.positioning}
      path="/"
      imageAlt="Huruy Kidanemariam, Senior UX Designer and Builder portfolio"
      jsonLd={jsonLd}
      breadcrumbs={[{ name: "Home", path: "/" }]}
    />

    {/* Hero: the 60-second scan */}
    <section className="py-14 sm:py-24 lg:py-28">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent sm:mb-5">{person.name}, {person.title}</p>
          <h1 className="mb-8 text-4xl font-bold leading-[1.08] tracking-tight font-display sm:mb-10 sm:text-5xl lg:text-6xl">
            I design enterprise products where <span className="text-gradient">getting it wrong is a liability</span>.
          </h1>
          <dl className="mb-8 grid gap-x-8 gap-y-4 sm:mb-10 sm:grid-cols-3 sm:gap-y-6">
            {proofPoints.map((p) => (
              <div key={p.value} className="border-t border-border pt-4">
                <dt className="text-2xl font-bold tracking-tight text-foreground font-display">{p.value}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.label}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px]">
              <a href="#work">
                See the work <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px]">
              <a href={resumePdfPath} download>Download resume</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Work */}
    <section id="work" className="scroll-mt-16 bg-muted/30 py-20 sm:py-24" aria-labelledby="work-heading">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Selected work</p>
            <h2 id="work-heading" className="text-3xl font-bold tracking-tight font-display sm:text-4xl">Three case studies</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Each one opens with a summary you can read in a minute, then the decisions and what I turned down.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        {moreWork.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">More work</h3>
            <div className="grid gap-4">
              {moreWork.map((p) => {
                const result = p.keyResults?.[0];
                const dims = imageDimensions[p.image];
                return (
                  <article key={p.id} className="grid overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-[180px_1fr]">
                    <div className="aspect-[16/9] overflow-hidden bg-muted sm:aspect-auto">
                      <img src={p.image} alt="" width={dims?.width ?? 1200} height={dims?.height ?? 750} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">{p.impact}</p>
                        <h4 className="text-xl font-bold font-display">{p.title}</h4>
                        {result && <p className="mt-1 text-sm text-muted-foreground"><span className="font-semibold text-foreground">{result.value}</span> {result.label}</p>}
                      </div>
                      <Button asChild variant="outline" className="min-h-11 shrink-0 sm:self-center">
                        <Link to={`/project/${p.id}`} aria-label={`Read the ${p.title} case study`}>
                          Read case study <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>

    {/* Hiring */}
    <section id="hire" className="scroll-mt-16 py-20 sm:py-24" aria-labelledby="hire-heading">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Hiring?</p>
          <h2 id="hire-heading" className="mb-5 text-2xl font-bold tracking-tight font-display sm:text-3xl">Open to senior UX roles</h2>
          <ul className="mb-6 space-y-2 text-muted-foreground">
            {hiringFacts.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact?role=senior-ux-designer">
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" /> Email Huruy
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">How I work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Index;
