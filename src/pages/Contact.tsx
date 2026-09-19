import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Send, Linkedin, Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEO from "@/components/SEO";
import { person } from "@/lib/resume";
import { PERSON_REF, absoluteUrl } from "@/lib/seo";

const ROLE_CONTEXT: Record<string, { subject: string; message: string }> = {
  "senior-ux-designer": {
    subject: "Senior UX Designer role for Huruy Kidanemariam",
    message:
      "Hi Huruy, I found your Senior UX Designer page and would like to talk about a role.\n\nCompany:\nRole:\nLocation / remote:\n\nDetails:\n",
  },
};

const PAGE_DESC = `Get in touch with Huruy Kidanemariam, Senior UX Designer in Los Angeles, about senior UX roles, product design collaborations, or consulting. Replies within one business day.`;

const Contact = () => {
  const [searchParams] = useSearchParams();
  const roleContext = ROLE_CONTEXT[searchParams.get("role") ?? ""];
  const [status, setStatus] = useState<"idle" | "opened" | "copied">("idle");
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();
    if (!name || !email || !message) return;

    const subject = roleContext ? `${roleContext.subject}, from ${name}` : `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    setDraft({ subject, body });
    setStatus("opened");
    // Hand off to the visitor's mail app. The form keeps its contents so nothing is
    // lost on a device with no mail handler; the copy fallback below covers that case.
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyDraft = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${person.email}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setStatus("copied");
    } catch {
      setStatus("opened");
    }
  };

  return (
    <>
      <SEO
        title="Contact Huruy Kidanemariam | Senior UX Designer"
        description={PAGE_DESC}
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Huruy Kidanemariam",
          description: PAGE_DESC,
          url: absoluteUrl("/contact"),
          mainEntity: PERSON_REF,
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">Get In Touch</p>
              <h1 className="text-4xl font-bold mb-4 font-display">Contact Huruy Kidanemariam</h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always open to new opportunities, collaborations, or a conversation about design and technology. Send a message and I'll reply within one business day.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  I'm especially interested in accessible design, social impact, and complex enterprise systems. Currently open to senior full-time roles and select consulting engagements.
                </p>
                <a href={`mailto:${person.email}`} className="flex items-center gap-3 min-h-11 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="h-5 w-5" aria-hidden="true" /> {person.email}
                </a>
                <a href={person.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 min-h-11 text-muted-foreground hover:text-accent transition-colors">
                  <Linkedin className="h-5 w-5" aria-hidden="true" /> LinkedIn profile
                </a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" autoComplete="name" placeholder="Your name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    required
                    rows={5}
                    className="mt-1.5"
                    maxLength={2000}
                    defaultValue={roleContext?.message ?? ""}
                  />
                </div>
                <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-1" aria-hidden="true" /> Open in your email app
                </Button>
                <p className="text-xs text-muted-foreground">
                  This opens a pre-filled email to {person.email}. Nothing is sent until you press send in your mail app.
                </p>
                {status !== "idle" && (
                  <div role="status" className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm">
                    <p className="mb-3">
                      If your email app didn't open, copy the message and paste it into any email to{" "}
                      <a href={`mailto:${person.email}`} className="text-accent underline underline-offset-4">{person.email}</a>.
                    </p>
                    <Button type="button" variant="outline" size="sm" onClick={copyDraft} className="min-h-11">
                      {status === "copied" ? <Check className="h-4 w-4 mr-1" aria-hidden="true" /> : <Copy className="h-4 w-4 mr-1" aria-hidden="true" />}
                      {status === "copied" ? "Copied" : "Copy message"}
                    </Button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
