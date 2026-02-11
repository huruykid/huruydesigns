import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const skills = [
  "Figma", "React", "User Research", "Prototyping", "Wireframing",
  "Usability Testing", "Information Architecture", "Visual Design", "HTML/CSS", "JavaScript",
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/3" />
      <div className="container mx-auto px-4 py-20 relative z-10">
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
            I craft user-centered digital products that solve real problems — from food assistance apps to AI-powered health tools. Let's make an impact together.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work <ArrowDown className="h-4 w-4 ml-1" />
            </Button>
            <Button size="lg" variant="outline">
              <Download className="h-4 w-4 mr-1" /> Download Resume
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/huruy" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@huruydesigns.com" className="text-muted-foreground hover:text-accent transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Projects */}
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Featured Projects
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Skills */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">Skills & Tools</p>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What I Work With</h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-accent/50 hover:bg-accent/5 transition-colors"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
