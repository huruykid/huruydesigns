import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Linkedin, Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { person } from "@/lib/resume";
import { PERSON_REF, absoluteUrl } from "@/lib/seo";

const PAGE_DESC = "Contact Huruy Kidanemariam about senior UX roles, product design or consulting. Based in Los Angeles. Replies within one business day.";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const subject = searchParams.get("role") === "senior-ux-designer" ? "Senior UX Designer opportunity" : "Portfolio inquiry";
  const emailHref = `mailto:${person.email}?subject=${encodeURIComponent(subject)}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <>
      <SEO title="Contact Huruy Kidanemariam | Senior UX Designer" description={PAGE_DESC} path="/contact"
        jsonLd={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Huruy Kidanemariam", description: PAGE_DESC, url: absoluteUrl("/contact"), mainEntity: PERSON_REF }}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <section className="py-14 sm:py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Get in touch</p>
            <h1 className="mb-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">Let's talk about the work.</h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">I'm open to senior UX and product design roles, contract work and select consulting engagements.</p>
            <dl className="mt-8 space-y-4 border-t border-border pt-6 text-sm">
              <div><dt className="font-semibold">Based in</dt><dd className="mt-1 text-muted-foreground">{person.location}. Open to remote, hybrid or relocation.</dd></div>
              <div><dt className="font-semibold">Especially interested in</dt><dd className="mt-1 text-muted-foreground">Complex enterprise systems, accessible products and social impact.</dd></div>
              <div><dt className="font-semibold">Response time</dt><dd className="mt-1 text-muted-foreground">Within one business day.</dd></div>
            </dl>
          </div>
          <div className="self-start rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold">Email me directly</h2>
            <a href={emailHref} className="mt-3 inline-flex min-h-11 items-center break-all text-lg font-medium text-accent underline underline-offset-4">{person.email}</a>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><a href={emailHref}><Mail className="mr-2 h-4 w-4" aria-hidden="true" />Email Huruy</a></Button>
              <Button type="button" variant="outline" size="lg" onClick={copyEmail}>
                {copyStatus === "copied" ? <Check className="mr-2 h-4 w-4" aria-hidden="true" /> : <Copy className="mr-2 h-4 w-4" aria-hidden="true" />}Copy email
              </Button>
            </div>
            <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-muted-foreground">
              {copyStatus === "copied" ? "Email address copied." : copyStatus === "error" ? "Couldn't copy automatically. Select and copy the address above." : "Email opens your mail app. You can also copy the address."}
            </p>
            <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">For a role, include the company, scope, location and compensation range. For a project, tell me what needs to change and your timeline.</p>
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:underline"><Linkedin className="h-4 w-4" aria-hidden="true" />Connect on LinkedIn<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
