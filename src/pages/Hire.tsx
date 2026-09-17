import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowRight, Mail, Download, CheckCircle2, Briefcase, Users, Zap, Shield } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { resumePdfPath } from "@/lib/resume";
import { PERSON, PERSON_REF, SITE_URL } from "@/lib/seo";

const PAGE_TITLE = "Hire a Senior UX Designer in Los Angeles | Huruy Kidanemariam";
const PAGE_DESC =
  "Senior UX Designer in Los Angeles with 8+ years shipping accessible, human-centered products for enterprise SaaS, compliance, and AI. Open to senior roles, remote or hybrid. Portfolio and resume.";

const valueProps = [
  {
    icon: Briefcase,
    title: "8+ Years, Enterprise-Tested",
    body: "Senior UX Designer at Capital Group designing research tools for investment analysts. Previously UX Designer on HR, compliance, and AI surfaces at Asure Software, VR learning at IMMERSE, and fintech SaaS at Datable.",
  },
  {
    icon: Shield,
    title: "Accessibility as Default",
    body: "WCAG-grounded design systems, error states, and content patterns. I write the usage guidelines other designers and engineers actually follow.",
  },
  {
    icon: Users,
    title: "Research to Roadmap",
    body: "Interview synthesis, usability testing, and competitive analysis translated into prioritized features and measurable shipping plans.",
  },
  {
    icon: Zap,
    title: "Design + Code Fluency",
    body: "React, HTML, CSS, and prototype engineering. I hand off specs that ship, and I can prototype real interactions when static mocks fall short.",
  },
];

const whatHiringTeamsGet = [
  "End-to-end product design across web and mobile, from discovery to launch",
  "Design systems and component libraries with documented usage and accessibility rules",
  "AI and conversational UX, including persona, prompts, and human-in-the-loop flows",
  "Compliance and high-stakes enterprise workflows where getting UX wrong is a liability",
  "Cross-functional facilitation with PM, engineering, QA, and stakeholders",
  "Coded prototypes when fidelity matters more than another flat mock",
];

const faqs = [
  {
    q: "Are you available for senior UX designer roles?",
    a: "Yes. I am open to senior UX designer, senior product designer, and staff UX roles, including full-time, contract, and consulting engagements. I am based in Los Angeles and open to remote, hybrid, or relocation.",
  },
  {
    q: "What industries have you worked in?",
    a: "Asset management and financial research at Capital Group, enterprise HR and compliance SaaS at Asure Software, VR learning at IMMERSE, fintech and SaaS at Datable, plus social impact work for diaspora communities. The common thread is high-stakes systems where clarity and accessibility matter.",
  },
  {
    q: "Do you design or do you also code?",
    a: "Both. I design in Figma and ship production React, HTML, and CSS. That fluency lets me prototype real interactions, pressure-test technical constraints early, and write specs that engineers can actually build.",
  },
  {
    q: "How do you approach a new product or feature?",
    a: "Discovery and stakeholder interviews, then competitive and heuristic review, then usability testing on prototypes, then a phased shipping plan with success metrics. Every case study on this site shows that arc end to end.",
  },
  {
    q: "What is the fastest way to start a conversation?",
    a: "Email huruydesigns at gmail dot com, or use the contact page. I reply within one business day. Resume and portfolio links are at the top of this page so a hiring manager can scan in under two minutes.",
  },
];

// Public, ungated case studies a recruiter can read end to end without a passcode.
const featuredProjects = projects.filter((p) => ["ebtfinder", "oneasure-portal", "beles"].includes(p.id));

const HIRE_URL = `${SITE_URL}/senior-ux-designer`;
const CONTACT_CTA = "/contact?role=senior-ux-designer";

const personJsonLd = {
  "@context": "https://schema.org",
  ...PERSON,
  mainEntityOfPage: HIRE_URL,
  seeks: {
    "@type": "Demand",
    name: "Senior UX Designer, Senior Product Designer, and Staff UX roles",
    businessFunction: "https://purl.org/goodrelations/v1#ProvideService",
    itemOffered: {
      "@type": "Service",
      name: "Senior UX design engagements",
      serviceType: "UX design",
    },
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${HIRE_URL}#service`,
  name: "Senior UX Design Services, Huruy Kidanemariam",
  url: HIRE_URL,
  description:
    "Senior UX and product design for enterprise SaaS, compliance, and AI products: user research, design systems, accessibility, and coded prototypes.",
  provider: PERSON_REF,
  areaServed: { "@type": "Country", name: "United States" },
  availableLanguage: "English",
  serviceType: "UX design, product design, design systems, accessibility",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement types",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Full-time senior UX designer role" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Contract product design engagement" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Design system and accessibility consulting" },
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${HIRE_URL}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Mobile-only sticky bar: appears once the hero CTAs scroll out of view. */
const StickyHireCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur px-4 py-3 flex gap-2 print:hidden">
      <Button asChild className="flex-1 min-h-11 bg-accent text-accent-foreground hover:bg-accent/90">
        <Link to={CONTACT_CTA}>
          <Mail className="h-4 w-4 mr-2" aria-hidden="true" /> Email Huruy
        </Link>
      </Button>
      <Button asChild variant="outline" size="icon" className="h-11 w-11">
        <a href={resumePdfPath} download aria-label="Download resume (PDF)">
          <Download className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
};

const Hire = () => (
  <>
    <SEO
      title={PAGE_TITLE}
      description={PAGE_DESC}
      path="/senior-ux-designer"
      ogType="profile"
      imageAlt="Huruy Kidanemariam, Senior UX Designer portfolio for hire"
      jsonLd={[personJsonLd, serviceJsonLd, faqJsonLd]}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Senior UX Designer", path: "/senior-ux-designer" },
      ]}
    />

    {/* Hero */}
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
      <div className="absolute -top-20 right-[5%] w-[28rem] h-[28rem] rounded-full bg-accent/[0.12] blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Rendered without an entrance animation so the H1 paints immediately (LCP). */}
        <div className="max-w-4xl">
          <p className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Available for Hire
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Senior UX Designer
            </span>
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 font-display"
          >
            Senior UX Designer with 8+ years shipping{" "}
            <span className="text-gradient">enterprise SaaS, compliance, and AI products</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            I am Huruy Kidanemariam, a Senior UX Designer in Los Angeles, currently at Capital Group,
            who bridges research, design systems, and production code. If your team is hiring for a
            senior UX role, this page is the fastest way to evaluate fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="sm:min-w-[200px] bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to={CONTACT_CTA}>
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" /> Email Huruy
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="sm:min-w-[200px]">
              <a href={resumePdfPath} download>
                <Download className="h-4 w-4 mr-2" aria-hidden="true" /> Download resume
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-8">
            <span className="font-medium text-foreground">8+ Years Experience</span>
            <span className="text-accent">•</span>
            <span className="font-medium text-foreground">Enterprise SaaS, Compliance, AI</span>
            <span className="text-accent">•</span>
            <span className="font-medium text-foreground">Los Angeles, CA</span>
            <span className="text-accent">•</span>
            <span className="font-medium text-foreground">Remote, hybrid, or relocation</span>
          </div>
        </div>
      </div>

    </section>

    {/* Value props */}
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
            Why hiring teams bring me in
          </h2>
          <p className="text-muted-foreground text-lg">
            I specialize in systems where getting the UX wrong is not an inconvenience, it is a
            liability. Compliance, HR, financial research, and AI surfaces are where I do my
            best work.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {valueProps.map((v) => (
            <Card key={v.title} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <v.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2 font-display">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button asChild size="lg" className="sm:min-w-[200px] bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to={CONTACT_CTA}>
              <Mail className="h-4 w-4 mr-2" aria-hidden="true" /> Email Huruy
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="sm:min-w-[200px]">
            <a href={resumePdfPath} download>
              <Download className="h-4 w-4 mr-2" aria-hidden="true" /> Download resume
            </a>
          </Button>
        </div>
      </div>
    </section>


    {/* What you get */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 font-display">
            What hiring teams get on day one
          </h2>
          <ul className="space-y-4">
            {whatHiringTeamsGet.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Featured case studies */}
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 font-display">
              Selected senior-level case studies
            </h2>
            <p className="text-muted-foreground">
              Each case study walks through the problem, the research, the design decisions, and
              the outcome. No passcode needed; each reads in under five minutes.
            </p>
          </div>
          <Link to="/#projects" className="text-accent font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 font-display">
            Hiring questions, answered
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-lg mb-2 font-display">
                  {f.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA after FAQ */}
    <section className="pb-4">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl rounded-xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-base font-medium flex-1">
            Still have a question about fit? I answer hiring emails within one business day.
          </p>
          <Button asChild className="sm:min-w-[200px] bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to={CONTACT_CTA}>
              <Mail className="h-4 w-4 mr-2" aria-hidden="true" /> Ask a question
            </Link>
          </Button>
        </div>
      </div>
    </section>



    {/* Final CTA */}
    <section className="py-20 bg-gradient-to-br from-accent/10 via-transparent to-accent/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
          Ready to talk?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          The fastest signal is a quick call. Send a role description and I will respond within
          one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="sm:min-w-[200px] bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to={CONTACT_CTA}>
              <Mail className="h-4 w-4 mr-2" aria-hidden="true" /> Send a role description
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="sm:min-w-[200px]">
            <Link to="/about">Read full background</Link>
          </Button>
        </div>
      </div>
    </section>

    <StickyHireCta />
  </>
);

export default Hire;
