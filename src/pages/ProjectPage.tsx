import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { projects } from "@/lib/projects";

const Section = ({ label, title, children }: { label: string; title: string; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
    <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">{label}</p>
    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
    <div className="text-muted-foreground leading-relaxed max-w-3xl">{children}</div>
  </motion.div>
);

const ProjectPage = () => {
  const { id } = useParams();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return <Navigate to="/" />;
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">{project.impact}</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span><strong className="text-foreground">Role:</strong> {project.role}</span>
              <span><strong className="text-foreground">Timeline:</strong> {project.timeline}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project image */}
      <div className="container mx-auto px-4 -mt-2 mb-16">
        <div className="rounded-xl overflow-hidden border border-border aspect-video bg-muted">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-24">
        <Section label="01" title="The Problem"><p>{project.problem}</p></Section>
        <Section label="02" title="The Process"><p>{project.process}</p></Section>
        <Section label="03" title="The Solution"><p>{project.solution}</p></Section>
        <Section label="04" title="The Impact"><p>{project.outcomeMetrics}</p></Section>

        {/* Next project */}
        <div className="border-t border-border pt-12">
          <p className="text-sm text-muted-foreground mb-2">Next Project</p>
          <Link to={`/project/${next.id}`} className="group inline-flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {next.title} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectPage;
