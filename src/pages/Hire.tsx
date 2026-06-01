import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Download, CheckCircle2, Briefcase, Users, Zap, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { Helmet } from "react-helmet-async";

const PAGE_TITLE = "Senior UX Designer Portfolio | Huruy Kidanemariam, Available for Hire";
const PAGE_DESC =
  "Senior UX Designer with 8+ years shipping accessible, human-centered products for enterprise SaaS, compliance, and social impact. Portfolio, case studies, and resume for hiring teams.";

const valueProps = [
  {
    icon: Briefcase,
    title: "8+ Years, Enterprise-Tested",
    body: "Lead designer on HR, compliance, and AI surfaces at Asure Software. Shipped end-to-end on VR learning at IMMERSE and fintech SaaS at Datable.",
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
    a: "Yes. I am open to senior UX designer, senior product designer, and staff UX roles, including full-time, contract, and consulting engagements. I am open to relocation and hybrid or remote arrangements.",
  },
  {
    q: "What industries have you worked in?",
    a: "Enterprise HR and compliance SaaS at Asure Software, VR learning at IMMERSE, fintech and SaaS at Datable, plus social impact work for diaspora communities. The common thread is high-stakes systems where clarity and accessibility matter.",
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
    a: "Email huruydesigns at gmail dot com, or reach out via the contact page. Resume and portfolio links are at the top of this page so a hiring manager can scan in under two minutes.",
  },
];

const featuredProjects = projects.filter((p) =>
  ["asure-compliance", "oneasure-portal", "ebtfinder"].includes(p.id)
);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Huruy Kidanemariam",
  jobTitle: "Senior UX Designer",
  url: "https://huruy.tech/senior-ux-designer",
  email: "huruydesigns@gmail.com",
  description: PAGE_DESC,
  knowsAbout: [
    "Senior UX Design",
    "Product Design",
    "Design Systems",
    "Accessibility (WCAG)",
    "User Research",
    "Enterprise SaaS",
    "AI and Conversational UX",
  ],
  sameAs: ["https://www.linkedin.com/in/huruykidanemariam/"],
  seeks: {
    "@type": "Demand",
    name: "Senior UX Designer, Senior Product Designer, Staff UX roles",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Hire = () => (
  <Layout>
    <SEO
      title={PAGE_TITLE}
      description={PAGE_DESC}
      path="/senior-ux-designer"
      ogType="profile"
      imageAlt="Huruy Kidanemariam, Senior UX Designer portfolio for hire"
      jsonLd={personJsonLd}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Senior UX Designer", path: "/senior-ux-designer" },
      ]}
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
    </Helmet>

    {/* Hero */}
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
      <div className="absolute -top-20 right-[5%] w-[28rem] h-[28rem] rounded-full bg-accent/[0.12] blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-4">
            Senior UX Designer, Available for Hire
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Senior UX Designer with 8+ years shipping{" "}
            <span className="text-gradient">enterprise SaaS, compliance, and AI products</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            I am Huruy Kidanemariam, a Senior UX Designer and Product Designer who bridges
            research, design systems, and production code. If your team is hiring for a senior
            UX role, this page is the fastest way to evaluate fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="sm:min-w-[200px]">
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Mail className="h-4 w-4 mr-2" /> Start a conversation
              </Button>
            </Link>
            <a href="/resume/huruy-kidanemariam-resume.pdf" download className="sm:min-w-[200px]">
              <Button size="lg" variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" /> Download resume
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-8">
            <span className="font-medium text-foreground">8+ Years Experience</span>
            <span className="text-accent">•</span>
            <span className="font-medium text-foreground">Enterprise SaaS, Compliance, AI</span>
            <span className="text-accent">•</span>
            <span className="font-medium text-foreground">12M+ Users Impacted</span>
            <span className="text-accent">•</span>
            <span className="font-medium text-foreground">Open to relocation</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Value props */}
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why hiring teams bring me in
          </h2>
          <p className="text-muted-foreground text-lg">
            I specialize in systems where getting the UX wrong is not an inconvenience, it is a
            liability. Compliance, HR, healthcare-adjacent, and AI surfaces are where I do my
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
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* What you get */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Selected senior-level case studies
            </h2>
            <p className="text-muted-foreground">
              Each case study walks through the problem, the research, the design decisions, and
              the shipped outcome. Built to read in under five minutes.
            </p>
          </div>
          <Link to="/" className="text-accent font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Hiring questions, answered
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {f.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-20 bg-gradient-to-br from-accent/10 via-transparent to-accent/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Ready to talk?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          The fastest signal is a quick call. Send a role description and I will respond within
          one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contact" className="sm:min-w-[200px]">
            <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Mail className="h-4 w-4 mr-2" /> Contact Huruy
            </Button>
          </Link>
          <Link to="/about" className="sm:min-w-[200px]">
            <Button size="lg" variant="outline" className="w-full">
              Read full background
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Hire;
