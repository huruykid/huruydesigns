import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { publicProjects } from "@/lib/projects";
import { person, experience, resumePdfPath } from "@/lib/resume";
import { PERSON, PERSON_REF, SITE_URL, absoluteUrl } from "@/lib/seo";
import SEO from "@/components/SEO";

/** Enterprise work first: it's what the roles Huruy is applying for ask about. With an
 * odd count, the last card spans the row, so healthcare gets the featured slot. */
const ORDER = ["asure-compliance", "oneasure-portal", "ebtfinder", "beles", "doula-care-portal"];
const visibleProjects = publicProjects();
const work = [
  ...ORDER.map((id) => visibleProjects.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p),
  ...visibleProjects.filter((p) => !ORDER.includes(p.id)),
];

const current = experience[0];
const previous = experience.find((e) => e.org.startsWith("Asure"));

/** The "who, where, available?" answers a recruiter looks for first. */
const facts = [
  { label: "Currently", value: `${current.title} at ${person.currentEmployer}`, detail: "Enterprise products in a regulated industry" },
  ...(previous ? [{ label: "Previously", value: `${previous.title} at Asure Software`, detail: "Payroll compliance and HR platforms" }] : []),
  { label: "Experience", value: `${person.yearsExperience} years in UX and product design`, detail: "Enterprise SaaS, compliance, healthcare, AI" },
  { label: "Open to", value: "Senior and staff UX roles", detail: `${person.location} · remote or hybrid` },
];

const hiringFacts = [
  "Senior UX, senior product design and staff UX roles: full-time, contract or consulting.",
  `Based in ${person.location}. Remote, hybrid, or onsite in LA.`,
  "I reply to hiring emails within one business day.",
];

const jsonLd = [
  { "@context": "https://schema.org", ...PERSON },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Senior UX Design Portfolio, Huruy Kidanemariam",
    itemListElement: work.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "CreativeWork", name: p.title, description: p.description, url: absoluteUrl(`/project/${p.id}`), author: PERSON_REF },
    })),
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: "Huruy Kidanemariam, Senior UX Designer Portfolio", url: SITE_URL, author: PERSON_REF },
];

const mailto = `mailto:${person.email}?subject=${encodeURIComponent("Senior UX role")}`;

const Index = () => (
  <>
    <SEO
      title="Huruy Kidanemariam | Senior UX Designer, Los Angeles"
      description="Huruy Kidanemariam, Senior UX Designer in Los Angeles, designs fintech and enterprise SaaS products. Explore case studies and 8+ years of hands-on experience."
      path="/"
      imageAlt="Huruy Kidanemariam, Senior UX Designer and Builder portfolio"
      jsonLd={jsonLd}
      breadcrumbs={[{ name: "Home", path: "/" }]}
    />

    {/* Intro: who he is, what he does, where he is, how to reach him */}
    <section className="pb-14 pt-16 sm:pb-20 sm:pt-28 lg:pt-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16"
        >
          <div>
            <h1 className="mb-6 text-[2.75rem] font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Hi, I'm Huruy.
            </h1>
            <p className="mb-8 max-w-[38ch] text-lg leading-relaxed text-foreground sm:text-xl">
              A senior UX designer in Los Angeles. I design enterprise products where getting it wrong is a liability,
              and I build what I design.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href="#work">View selected work</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/resume">View resume</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-5 text-muted-foreground hover:text-foreground">
                <a href={mailto}>Say hello</a>
              </Button>
            </div>
          </div>

          <dl className="grid gap-5 text-[15px] sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            {facts.map((f) => (
              <div key={f.label} className="grid gap-0.5 lg:grid-cols-[6.5rem_1fr] lg:gap-3">
                <dt className="text-muted-foreground">{f.label}</dt>
                <dd>
                  <span className="text-foreground">{f.value}</span>
                  <span className="block text-muted-foreground">{f.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>

    {/* Work */}
    <section id="work" className="scroll-mt-16 pb-20 sm:pb-28" aria-labelledby="work-heading">
      <div className="container">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border pt-6">
          <h2 id="work-heading" className="text-[15px] font-medium tracking-normal">Selected work</h2>
          <p className="text-[15px] text-muted-foreground">Each case study opens with a one-minute summary.</p>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {work.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} wide={work.length % 2 === 1 && index === work.length - 1} />
          ))}
        </div>
      </div>
    </section>

    {/* Hiring */}
    <section id="hire" className="scroll-mt-16 pb-24" aria-labelledby="hire-heading">
      <div className="container">
        <div className="grid gap-8 rounded-2xl bg-muted p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="hire-heading" className="mb-3 text-3xl font-light tracking-tight sm:text-4xl">Hiring a senior UX designer?</h2>
            <p className="text-muted-foreground">I'm open to new roles now.</p>
          </div>
          <div>
            <ul className="mb-8 space-y-3">
              {hiringFacts.map((f) => (
                <li key={f} className="flex gap-3 text-foreground">
                  <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href={mailto}>Email {person.givenName}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent px-6">
                <a href={resumePdfPath} download>Download resume (PDF)</a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-4">
                <Link to="/about#how-i-work">
                  How I work <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Index;
