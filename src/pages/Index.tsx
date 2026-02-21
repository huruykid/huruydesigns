import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, Download, Palette, Search, Code, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import SEO from "@/components/SEO";

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

const DotGrid = () => (
  <svg className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
    {Array.from({ length: 20 }).map((_, row) =>
      Array.from({ length: 20 }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={col * 25 + 12}
          cy={row * 25 + 12}
          r="2.5"
          fill="hsl(var(--accent))"
        />
      ))
    )}
  </svg>
);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Huruy Kidanemariam",
  jobTitle: "UX Designer & Product Designer",
  url: "https://huruydesigns.lovable.app",
  sameAs: [
    "https://www.linkedin.com/in/huruydesigns/",
    "mailto:huruydesigns@gmail.com",
  ],
  description:
    "UX Designer and Product Designer specializing in accessible, human-centered design for enterprise and social impact products.",
};

const Index = () => (
  <Layout>
    <SEO
      title="Huruy Kidanemariam | UX Designer & Product Designer Portfolio"
      description="Huruy Kidanemariam is a UX Designer and Product Designer specializing in accessible, human-centered design for enterprise and social impact products."
      path="/"
      jsonLd={personJsonLd}
    />
    {/* Hero */}
    <section className="min-h-[80vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
      {/* Decorative blobs */}
      <div className="absolute -top-10 right-[5%] w-[28rem] h-[28rem] rounded-full bg-accent/[0.12] blur-3xl" />
      <div className="absolute top-32 right-[25%] w-80 h-80 rounded-full bg-accent/[0.08] blur-2xl" />
      <div className="absolute bottom-0 left-[2%] w-96 h-96 rounded-full bg-accent/[0.06] blur-3xl" />
      <DotGrid />
      <div className="container mx-auto px-4 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-4">UX Designer & Software Developer</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Hi, I'm <span className="text-gradient">Huruy</span>.
            <br />
            I design experiences that <span className="italic">matter</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            I bridge design and code to build products people actually use, grounded in psychology, shaped by empathy, and shipped with precision.
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-3 mb-8 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px] justify-center w-full sm:w-auto"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work <ArrowDown className="h-4 w-4 ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px] justify-center w-full sm:w-auto">
              <Download className="h-4 w-4 mr-1" /> Download Resume
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/huruydesigns/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:huruydesigns@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
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
        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured project (first) */}
          <div className="md:col-span-2">
            <ProjectCard project={projects[0]} index={0} featured />
          </div>
          {/* Remaining projects */}
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 1} />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-border hover:border-accent/30 transition-colors duration-300">
                <CardContent className="p-5">
                  <cat.icon className="h-5 w-5 text-accent mb-3" />
                  <h3 className="font-bold text-sm mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cat.title}</h3>
                  <ul className="space-y-1.5">
                    {cat.skills.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground">{s}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
