import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, Palette, Search, Code, Users, FileText, Sparkles, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import { publicProjects } from "@/lib/projects";
import { person, skillGroups } from "@/lib/resume";
import { PERSON, PERSON_REF, SITE_URL, absoluteUrl } from "@/lib/seo";
import SEO from "@/components/SEO";

const skillIcons: Record<string, LucideIcon> = {
  Design: Palette,
  Research: Search,
  Development: Code,
  Collaboration: Users,
  AI: Sparkles,
};

const visibleProjects = publicProjects();

const personJsonLd = { "@context": "https://schema.org", ...PERSON };

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Senior UX Design Portfolio, Huruy Kidanemariam",
  itemListElement: visibleProjects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: absoluteUrl(`/project/${p.id}`),
      author: PERSON_REF,
    },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Huruy Kidanemariam, Senior UX Designer Portfolio",
  url: SITE_URL,
  author: PERSON_REF,
};

const Index = () => (
  <>
    <SEO
      title="Huruy Kidanemariam | Senior UX Designer & Builder, Los Angeles"
      description={person.positioning}
      path="/"
      imageAlt="Huruy Kidanemariam, Senior UX Designer and Builder portfolio"
      jsonLd={[personJsonLd, portfolioJsonLd, websiteJsonLd]}
      breadcrumbs={[{ name: "Home", path: "/" }]}
    />
    {/* Hero */}
    <section className="min-h-[50vh] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-4">{person.tagline}</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-2 font-display">
            Hi, I'm <span className="text-gradient">{person.name}</span>.<span className="sr-only"> Senior UX Designer Portfolio.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-2 leading-relaxed">
            I bridge design and code to build products people actually use, grounded in psychology, shaped by empathy, and shipped with precision.
          </p>
          <p className="text-sm text-foreground/80 max-w-xl mb-4">
            Currently designing research tools for investment analysts at <span className="font-semibold text-foreground">{person.currentEmployer}</span>.
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <Link
              to="/senior-ux-designer"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Open to senior UX opportunities
            </Link>
            <span className="font-medium text-foreground">{person.yearsExperience} years experience</span>
            <span className="text-accent" aria-hidden="true">•</span>
            <span className="font-medium text-foreground">Shipped to the App Store</span>
            <span className="text-accent" aria-hidden="true">•</span>
            <span className="font-medium text-foreground">{person.location}</span>
            <span className="text-accent" aria-hidden="true">•</span>
            <span className="font-medium text-foreground">Open to remote or hybrid</span>
          </div>
          <div className="mb-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px] justify-center w-full sm:w-auto"
            >
              <a href="#projects">
                View my work <ArrowDown className="h-4 w-4 ml-1" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] justify-center w-full sm:w-auto">
              <Link to="/resume">
                <FileText className="h-4 w-4 mr-1" aria-hidden="true" /> Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="link" className="w-full text-muted-foreground hover:text-accent sm:w-auto">
              <Link to="/contact?role=senior-ux-designer">
                <Mail className="h-4 w-4" aria-hidden="true" /> Email Huruy
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              {person.linkedinLabel}
            </a>
            <a href={`mailto:${person.email}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {person.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Projects */}
    <section id="projects" className="py-12 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">Featured Projects</h2>
        </motion.div>
        <div className="grid gap-6 md:auto-rows-fr md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>

    {/* Skills & Tools */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">Skills & Tools</p>
          <h2 className="text-2xl font-bold font-display">What I Work With</h2>
        </motion.div>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = skillIcons[group.label] ?? Sparkles;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="h-full"
              >
                <Card className="h-full rounded-lg border-border transition-colors duration-300 hover:border-accent/30">
                  <CardContent className="flex h-full flex-col p-5 sm:p-6">
                    <Icon className="mb-3 h-5 w-5 text-accent" aria-hidden="true" />
                    <h3 className="mb-3 text-lg font-bold leading-7">{group.label}</h3>
                    <ul className="flex flex-wrap gap-2" aria-label={`${group.label} skills`}>
                      {group.skills.map((skill) => (
                        <li key={skill} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">{skill}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default Index;
