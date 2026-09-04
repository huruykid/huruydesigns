import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, Palette, Search, Code, Users, FileText, ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";

const skillCategories = [
  {
    icon: Palette,
    title: "Design & Prototyping",
    skills: ["Figma", "Prototyping", "Wireframing", "Visual Design"],
  },
  {
    icon: Search,
    title: "Research & Strategy",
    skills: ["User Research", "Usability Testing", "Information Architecture"],
  },
  {
    icon: Code,
    title: "Development",
    skills: ["React", "HTML/CSS", "JavaScript"],
  },
  {
    icon: Users,
    title: "Collaboration",
    skills: ["Agile", "Design Systems", "Cross-functional Teams"],
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Huruy Kidanemariam",
  jobTitle: "Senior UX Designer",
  url: "https://huruy.tech",
  sameAs: [
    "https://www.linkedin.com/in/huruykidanemariam/",
    "https://huruy.tech",
  ],
  email: "huruydesigns@gmail.com",
  description:
    "Senior UX Designer at Capital Group with 8+ years specializing in accessible, human-centered design for enterprise SaaS, financial research tools, compliance, and social impact products.",
};

// Hidden from the homepage; case study route stays live by direct link.
const visibleProjects = projects.filter((p) => p.id !== "fentfinder");

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Senior UX Design Portfolio – Huruy Kidanemariam",
  itemListElement: visibleProjects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: `https://huruy.tech/project/${p.id}`,
      author: { "@type": "Person", name: "Huruy Kidanemariam" },
    },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Huruy Kidanemariam – Senior UX Designer Portfolio",
  url: "https://huruy.tech",
  author: { "@type": "Person", name: "Huruy Kidanemariam" },
};

const SkillCard = ({ category: cat, index }: { category: typeof skillCategories[number]; index: number }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const titleId = useId();
  const detailsId = useId();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card role="region" aria-labelledby={titleId} className="h-full rounded-lg border-border transition-colors duration-300 hover:border-accent/30 focus-within:border-accent/40">
        <CardContent className="flex h-full flex-col p-5 sm:p-6">
          <cat.icon className="mb-3 h-5 w-5 text-accent" aria-hidden="true" />
          <h3 id={titleId} className="min-h-7 text-xl font-bold leading-7">{cat.title}</h3>
          <p className="mb-5 mt-2 min-h-10 text-sm leading-5 text-muted-foreground">Core methods and tools used in shipped product work.</p>
          <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen} className="mt-auto">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="min-h-11 w-full justify-between" aria-controls={detailsId}>
                View details
                <ChevronDown className={`transition-transform ${detailsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent id={detailsId} className="pt-4">
              <ul className="flex flex-wrap gap-2" aria-label={`${cat.title} skills`}>
                {cat.skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">{skill}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Index = () => (
  <Layout>
    <SEO
      title="Huruy Kidanemariam | Senior UX Designer & Builder Portfolio"
      description="Senior UX Designer and Builder with 8+ years crafting accessible, human-centered products for enterprise SaaS and social impact."
      path="/"
      imageAlt="Huruy Kidanemariam, Senior UX Designer and Builder portfolio"
      jsonLd={personJsonLd}
      breadcrumbs={[{ name: "Home", path: "/" }]}
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(portfolioJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
    </Helmet>
    {/* Hero */}
    <section className="min-h-[50vh] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-4">Senior UX Designer & Builder</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Hi, I'm <span className="text-gradient">Huruy Kidanemariam</span>.<span className="sr-only"> Senior UX Designer Portfolio.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-2 leading-relaxed">
              I bridge design and code to build products people actually use, grounded in psychology, shaped by empathy, and shipped with precision.
            </p>
            <p className="text-sm text-foreground/80 max-w-xl mb-4">
              Currently designing research tools for investment analysts at <span className="font-semibold text-foreground">Capital Group</span>.
            </p>
            <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <Link
                to="/senior-ux-designer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Open to senior UX opportunities
              </Link>
              <span className="font-medium text-foreground">8+ Years Experience</span>
              <span className="text-accent">•</span>
              <span className="font-medium text-foreground">12M+ Users Impacted</span>
              <span className="text-accent">•</span>
              <span className="font-medium text-foreground">Los Angeles, CA</span>
              <span className="text-accent">•</span>
              <span className="font-medium text-foreground">Open to Remote / Hybrid</span>
            </div>
            <div className="mb-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px] justify-center w-full sm:w-auto"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Work <ArrowDown className="h-4 w-4 ml-1" />
              </Button>
              <Link to="/resume" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="min-w-[200px] justify-center w-full sm:w-auto">
                  <FileText className="h-4 w-4 mr-1" /> Resume
                </Button>
              </Link>
              <Button asChild size="lg" variant="link" className="w-full text-muted-foreground hover:text-accent sm:w-auto">
                <Link to="/contact?role=senior-ux-designer">
                  <Mail className="h-4 w-4" /> Get in Touch
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href="https://www.linkedin.com/in/huruykidanemariam/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                linkedin.com/in/huruykidanemariam
              </a>
              <a href="mailto:huruydesigns@gmail.com" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Mail className="h-4 w-4" aria-hidden="true" />
                huruydesigns@gmail.com
              </a>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>

    {/* Projects */}
    <section id="projects" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Featured Projects
          </h2>
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
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What I Work With</h2>
        </motion.div>
        <div className="mx-auto grid max-w-3xl auto-rows-fr gap-6 sm:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
