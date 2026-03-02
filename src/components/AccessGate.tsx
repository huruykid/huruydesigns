import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, Send, CheckCircle, Map, BarChart3, Users, Layers, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Project } from "@/lib/projects";
import TaxComplianceDashboardDemo from "@/components/case-study/TaxComplianceDashboardDemo";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";
import { EntityDiagram, StateMachineDiagram, transformations } from "@/components/case-study/AsureComplianceCaseStudy";

interface AccessGateProps {
  project: Project;
}

const AccessGate = ({ project }: AccessGateProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("access_requests" as any)
        .insert({ name: name.trim(), email: email.trim(), project_id: project.id } as any);

      if (error) throw error;

      supabase.functions.invoke("notify-access-request", {
        body: { name: name.trim(), email: email.trim(), project_id: project.id },
      }).catch(() => {});

      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email huruydesigns@gmail.com directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Teaser header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <Lock className="h-7 w-7 text-accent" />
            </div>
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">
              {project.impact}
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.title}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {project.tags.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span><strong className="text-foreground">Role:</strong> {project.role}</span>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { number: "9,000+", label: "Tax Codes" },
              { number: "3", label: "Disciplines Aligned" },
              { number: "6", label: "Entity Types Mapped" },
              { number: "1", label: "Shared Mental Model" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center p-3 rounded-lg border border-border bg-card"
              >
                <p className="text-lg font-bold text-accent">{stat.number}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Interactive prototype - fully visible */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">
                Interactive Prototype
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Click through the dashboard to explore the compliance configuration interface I designed.
            </p>
            <div className="rounded-xl overflow-hidden border border-border">
              <ResponsiveAppShell>
                <TaxComplianceDashboardDemo />
              </ResponsiveAppShell>
            </div>
          </motion.div>

          {/* Entity Relationship Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
              System Architecture
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              I mapped six interconnected entity types into a navigable hierarchy — the foundation for all configuration flows.
            </p>
            <EntityDiagram />
          </motion.div>

          {/* State Machine Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
              Revision Lifecycle
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Every configuration change follows an explicit state machine — no silent edits, no compliance drift.
            </p>
            <StateMachineDiagram />
          </motion.div>

          {/* Before → After transformations */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Before → After
            </h3>
            <div className="grid gap-2">
              {transformations.slice(0, 4).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  <span className="text-sm text-muted-foreground line-through flex-1">{t.from}</span>
                  <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground flex-1">{t.to}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What's Inside teaser */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 text-center">
              What's Inside the Full Case Study
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: <Map className="h-4 w-4 text-accent" />, text: "Deep-dive into cross-discipline discovery process" },
                { icon: <BarChart3 className="h-4 w-4 text-accent" />, text: "Four architectural design contributions (A–D)" },
                { icon: <Users className="h-4 w-4 text-accent" />, text: "Stakeholder collaboration & validation details" },
                { icon: <Layers className="h-4 w-4 text-accent" />, text: "Full impact analysis & reflection" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  {item.icon}
                  <span className="text-sm text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Request form */}
          <Card className="border-accent/20 max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Request Submitted
                  </h3>
                  <p className="text-muted-foreground">
                    You'll receive an email with a private link once your request is approved.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Request Full Access
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The full case study includes proprietary process details, stakeholder validation, and design rationale. Request a private viewing link below.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        maxLength={255}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Request Full Access
                        </>
                      )}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Or email me directly at{" "}
                    <a href="mailto:huruydesigns@gmail.com" className="text-accent hover:underline">
                      huruydesigns@gmail.com
                    </a>
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessGate;
