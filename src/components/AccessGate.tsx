import { useId, useState } from "react";
import { Lock, KeyRound, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/lib/projects";
import { person } from "@/lib/resume";
import { isAsureGatedContent, type AsureGatedContent, type VerifyPasscodeResponse } from "@/lib/gatedContent";

interface AccessGateProps {
  project: Project;
  /** Called with the narrative the server returned for a correct passcode. */
  onAccessGranted: (content: AsureGatedContent) => void;
}

const whatsInside = [
  "The discovery narrative: how the missing entity map surfaced and what it changed",
  "The validation matrix and threshold rules behind the conditional disclosure",
  "Stakeholder work with engineering, compliance and product, in specifics",
  "Impact analysis and reflection",
];

/** Passcode form that unlocks the full narrative. Sits under the public case study. */
const AccessGate = ({ project, onAccessGranted }: AccessGateProps) => {
  const [passcode, setPasscode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const errorId = useId();
  const inputId = useId();
  const genericError = `Something went wrong. Try again, or email ${person.email}.`;

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
          setError(genericError);
        }
        return;
      }

      if (data?.valid && isAsureGatedContent(data.content)) {
        onAccessGranted(data.content);
      } else if (data && data.valid === false) {
        setError("Incorrect passcode. Please try again.");
      } else {
        setError(genericError);
      }
    } catch {
      setError(genericError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="gate-heading" className="mb-20 rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
            <Lock className="h-6 w-6 text-accent" aria-hidden="true" />
          </div>
          <h2 id="gate-heading" className="text-2xl font-bold mb-2 font-display">The full narrative is shared by request</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The architecture-level story above is public. The detailed narrative contains client-specific work and is available with a passcode. What's inside:
          </p>
          <ul className="space-y-2">
            {whatsInside.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-accent/20">
          <CardContent className="p-6">
            <div className="mb-5">
              <KeyRound className="h-7 w-7 text-accent mb-3" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-1 font-display">Enter passcode</h3>
              <p className="text-sm text-muted-foreground">Hiring teams: email me and I'll send it the same day.</p>
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
                {submitting ? "Verifying…" : "Unlock the full narrative"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Need access? Email{" "}
              <a href={`mailto:${person.email}?subject=Asure%20Compliance%20case%20study%20access`} className="text-accent hover:underline">
                {person.email}
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
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
