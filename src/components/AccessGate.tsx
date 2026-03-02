import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, Send, CheckCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Project } from "@/lib/projects";

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

      // Notify via edge function (fire and forget)
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
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-2xl">
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

          {/* Blurred preview teaser */}
          <div className="relative rounded-xl overflow-hidden mb-8 border border-border">
            <div className="bg-muted/50 p-8 blur-[6px] select-none pointer-events-none">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded-lg bg-accent/10" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-foreground/10 rounded w-full" />
                <div className="h-4 bg-foreground/10 rounded w-4/5" />
                <div className="h-4 bg-foreground/10 rounded w-3/5" />
              </div>
              <div className="mt-4 h-32 rounded-lg bg-accent/5" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-5 w-5" />
                <span className="text-sm font-medium">Full case study available upon request</span>
              </div>
            </div>
          </div>

          {/* Request form */}
          <Card className="border-accent/20">
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
                      Request Access
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This case study contains proprietary work. Enter your info to request a private viewing link.
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
                          <Send className="h-4 w-4 mr-2" /> Request Access
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
