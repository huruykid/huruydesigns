import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Target, MessageSquareQuote, Lightbulb, Search, Users, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { projects } from "@/lib/projects";

const Section = ({ label, title, icon, children }: { label: string; title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
    <div className="flex items-center gap-2 mb-2">
      {icon && <span className="text-accent">{icon}</span>}
      <p className="text-accent font-semibold text-sm tracking-wide uppercase">{label}</p>
    </div>
    <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
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
        {/* Problem */}
        <Section label="The Problem" title="What needed to change" icon={<Search className="h-4 w-4" />}>
          <p>{project.problem}</p>
        </Section>

        {/* Insight (if available) */}
        {project.insight && (
          <Section label="The Insight" title="The opportunity I saw" icon={<Lightbulb className="h-4 w-4" />}>
            <p>{project.insight}</p>
          </Section>
        )}

        {/* Research Highlights */}
        {project.researchHighlights && (
          <Section label="Research" title="Research Highlights" icon={<BookOpen className="h-4 w-4" />}>
            <ul className="space-y-3">
              {project.researchHighlights.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Goals */}
        {project.goals && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-accent" />
              <p className="text-accent font-semibold text-sm tracking-wide uppercase">Goals</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What we set out to do</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.goals.map((g, i) => (
                <Card key={i} className="border-border bg-card/50">
                  <CardContent className="p-5 flex items-start gap-3">
                    <span className="text-accent font-bold text-lg shrink-0">0{i + 1}</span>
                    <p className="text-muted-foreground">{g}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Competitive Research */}
        {project.competitiveResearch && (
          <Section label="Competitive Analysis" title="Understanding the landscape" icon={<Search className="h-4 w-4" />}>
            <p>{project.competitiveResearch}</p>
          </Section>
        )}

        {/* Interviews */}
        {project.interviews && (
          <Section label="User Interviews" title="Hearing from real users" icon={<Users className="h-4 w-4" />}>
            <p>{project.interviews}</p>
          </Section>
        )}

        {/* Findings */}
        {project.findings && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareQuote className="h-4 w-4 text-accent" />
              <p className="text-accent font-semibold text-sm tracking-wide uppercase">Key Findings</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What users told us</h2>
            <div className="grid gap-4">
              {project.findings.map((f, i) => (
                <Card key={i} className="border-border bg-muted/30 overflow-hidden">
                  <CardContent className="p-6">
                    <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Finding {i + 1}</p>
                    <h3 className="text-lg font-bold mb-3 text-foreground">{f.title}</h3>
                    <blockquote className="border-l-2 border-accent pl-4 italic text-muted-foreground">
                      "{f.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Process (fallback for projects without rich data) */}
        {!project.insight && (
          <Section label="The Process" title="How I approached it">
            <p>{project.process}</p>
          </Section>
        )}

        {/* Solution */}
        <Section label="The Solution" title="What we built">
          <p>{project.solution}</p>
        </Section>

        {/* Learnings */}
        {project.learnings && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-accent" />
              <p className="text-accent font-semibold text-sm tracking-wide uppercase">Learnings</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What I took away</h2>
            <div className="space-y-4">
              {project.learnings.map((l, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
                  <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
                  <p className="text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        {project.nextSteps && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="h-4 w-4 text-accent" />
              <p className="text-accent font-semibold text-sm tracking-wide uppercase">Next Steps</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Where this is heading</h2>
            <div className="space-y-3 max-w-3xl">
              {project.nextSteps.map((s, i) => (
                <div key={i} className="flex items-start gap-3 text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                  <p>{s}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Impact */}
        <Section label="The Impact" title="Measurable outcomes" icon={<Target className="h-4 w-4" />}>
          <p>{project.outcomeMetrics}</p>
        </Section>

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
