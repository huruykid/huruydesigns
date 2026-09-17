import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound, Map, BarChart3, Users, Layers, ArrowRight, Sparkles, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/lib/projects";
import { person } from "@/lib/resume";
import { isAsureGatedContent, type AsureGatedContent, type VerifyPasscodeResponse } from "@/lib/gatedContent";
import TaxComplianceDashboardDemo from "@/components/case-study/TaxComplianceDashboardDemo";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";
import { EntityDiagram, StateMachineDiagram, teaserTransformations, asureEntities } from "@/components/case-study/AsureDiagrams";

interface AccessGateProps {
  project: Project;
  /** Called with the narrative the server returned for a correct passcode. */
  onAccessGranted: (content: AsureGatedContent) => void;
}

const teaserStats = [
  { number: "9,000+", label: "Tax agencies" },
  { number: "3", label: "Disciplines aligned" },
  { number: String(asureEntities.length), label: "Entity types mapped" },
  { number: "1", label: "Shared mental model" },
];

const whatsInside = [
  { icon: Map, text: "Deep-dive into the cross-discipline discovery process" },
  { icon: BarChart3, text: "Four architectural design contributions (A to D)" },
  { icon: Users, text: "Stakeholder collaboration and validation details" },
  { icon: Layers, text: "Full impact analysis and reflection" },
];

const AccessGate = ({ project, onAccessGranted }: AccessGateProps) => {
  const [passcode, setPasscode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const errorId = useId();
  const inputId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = passcode.trim();
    if (!candidate) return;

    setSubmitting(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke<VerifyPasscodeResponse>("verify-passcode", {
        body: { passcode: candidate, projectId: project.id },
      });

      // supabase-js surfaces non-2xx as an error; the body still carries our message.
      if (fnError) {
        const body = await readErrorBody(fnError);
        if (body?.retryAfterSeconds) {
          setError(`Too many attempts. Try again in ${Math.ceil(body.retryAfterSeconds / 60)} minutes.`);
        } else if (body && body.valid === false && !body.error) {
          setError("Incorrect passcode. Please try again.");
        } else {
          setError(`Something went wrong. Try again, or email ${person.email}.`);
        }
        return;
      }

      if (data?.valid && isAsureGatedContent(data.content)) {
        onAccessGranted(data.content);
      } else if (data && data.valid === false) {
        setError("Incorrect passcode. Please try again.");
      } else {
        setError(`Something went wrong. Try again, or email ${person.email}.`);
      }
    } catch {
      setError(`Something went wrong. Try again, or email ${person.email}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Teaser header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <Lock className="h-7 w-7 text-accent" aria-hidden="true" />
            </div>
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">{project.impact}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 font-display">{project.title}</h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-4">{project.description}</p>
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
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {teaserStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center p-3 rounded-lg border border-border bg-card"
              >
                <dd className="text-lg font-bold text-accent">{stat.number}</dd>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              </motion.div>
            ))}
          </dl>

          {/* Interactive prototype */}
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10" aria-labelledby="gate-prototype">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              <h2 id="gate-prototype" className="text-sm font-semibold text-accent uppercase tracking-wide">Interactive Prototype</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Click through the dashboard to explore the compliance configuration interface I designed.
            </p>
            <div className="rounded-xl overflow-hidden border border-border">
              <ResponsiveAppShell>
                <TaxComplianceDashboardDemo />
              </ResponsiveAppShell>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10" aria-labelledby="gate-architecture">
            <h2 id="gate-architecture" className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">System Architecture</h2>
            <p className="text-sm text-muted-foreground mb-4">
              I mapped {asureEntities.length} interconnected entity types into a navigable hierarchy, the foundation for every configuration flow.
            </p>
            <EntityDiagram />
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10" aria-labelledby="gate-lifecycle">
            <h2 id="gate-lifecycle" className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">Revision Lifecycle</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Every configuration change follows an explicit state machine: no silent edits, no compliance drift.
            </p>
            <StateMachineDiagram />
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10" aria-labelledby="gate-before-after">
            <h2 id="gate-before-after" className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">Before and After</h2>
            <div className="grid gap-2">
              {teaserTransformations.map((t, i) => (
                <motion.div
                  key={t.from}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  <span className="text-sm text-muted-foreground line-through flex-1">{t.from}</span>
                  <ArrowRight className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground flex-1">{t.to}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* What's Inside */}
          <section className="mb-10" aria-labelledby="gate-inside">
            <h2 id="gate-inside" className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 text-center">
              What's inside the full case study
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {whatsInside.map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  <item.icon className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm text-foreground">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* Passcode form */}
          <Card className="border-accent/20 max-w-md mx-auto">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <KeyRound className="h-8 w-8 text-accent mx-auto mb-3" aria-hidden="true" />
                <h2 className="text-lg font-bold mb-1 font-display">Enter passcode</h2>
                <p className="text-sm text-muted-foreground">
                  This case study contains proprietary work and is shared by request. Enter the passcode to read the full study.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="relative">
                  <label htmlFor={inputId} className="sr-only">Passcode</label>
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id={inputId}
                    type="password"
                    placeholder="Enter passcode"
                    value={passcode}
                    onChange={(e) => { setPasscode(e.target.value); setError(""); }}
                    className="pl-10"
                    autoComplete="off"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    required
                    autoFocus
                  />
                </div>
                {error && (
                  <div id={errorId} role="alert" className="flex items-center gap-2 text-sm text-destructive">
                    <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={submitting || !passcode.trim()}
                >
                  {submitting ? "Verifying…" : "Unlock case study"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Need access? Email{" "}
                <a href={`mailto:${person.email}?subject=Asure%20Compliance%20case%20study%20access`} className="text-accent hover:underline">
                  {person.email}
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

/** supabase-js wraps non-2xx responses; pull our JSON body back out when present. */
async function readErrorBody(err: unknown): Promise<VerifyPasscodeResponse | null> {
  const ctx = (err as { context?: unknown })?.context;
  if (ctx instanceof Response) {
    try {
      return (await ctx.clone().json()) as VerifyPasscodeResponse;
    } catch {
      return null;
    }
  }
  return null;
}

export default AccessGate;
