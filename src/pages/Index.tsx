import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { publicProjects } from "@/lib/projects";
import { person, resumePdfPath } from "@/lib/resume";
import { PERSON, PERSON_REF, SITE_URL, absoluteUrl } from "@/lib/seo";
import SEO from "@/components/SEO";

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
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{person.name}, {person.title}</p>
          <h1 className="mb-10 text-4xl font-bold leading-[1.08] tracking-tight font-display sm:text-5xl lg:text-6xl">
            I design enterprise products where <span className="text-gradient">getting it wrong is a liability</span>.
          </h1>
          <dl className="mb-10 grid gap-x-8 gap-y-6 sm:grid-cols-3">
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
      <div className="container mx-auto px-4">
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
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">More work</h3>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {moreWork.map((p) => (
                <li key={p.id}>
                  <Link to={`/project/${p.id}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground hover:text-accent">
                    {p.title}
                    <span className="text-muted-foreground font-normal">{p.impact}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>

    {/* Hiring */}
    <section id="hire" className="scroll-mt-16 py-20 sm:py-24" aria-labelledby="hire-heading">
      <div className="container mx-auto px-4">
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
