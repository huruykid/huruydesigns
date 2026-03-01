import { Download, Printer, MapPin, Mail, Linkedin, ExternalLink, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

// ── Source of truth: mirrors About.tsx data exactly ──

const experience = [
  { period: "Apr 2023 – Present", title: "UX Designer", org: "Asure Software", location: "Austin, TX", bullets: [
    "Led content strategy for enterprise HR and compliance workflows across web and mobile. Mapped out edge cases and rewrote error messaging to reduce friction, improving task completion rates.",
    "Designed the persona and conversational scripts for 'Luna,' an AI chatbot. Partnered with PMs and QA to refine prompt engineering and AI-driven insights.",
    "Authored usage guidelines and accessibility standards (WCAG) for a new design system, ensuring consistent terminology and responsive layouts across 3 product lines.",
    "Facilitated workshops with stakeholders to align on product naming and messaging strategies, advocating for inclusive language and clear functional specs.",
  ]},
  { period: "Jan 2020 – Feb 2023", title: "UX Designer", org: "IMMERSE", location: "Los Angeles, CA", bullets: [
    "Wrote and designed end-to-end onboarding narratives for VR learning experiences, transforming complex 3D interactions into intuitive, bite-sized instructional text.",
    "Developed Immerse's first content and design framework, establishing guidelines for tone, voice, and accessible instruction that were adopted company-wide.",
    "Conducted usability testing to identify linguistic friction points. Rewrote prompt copy to reduce cognitive load, improving learner retention and reducing motion discomfort.",
    "Partnered with instructional designers and engineers to ensure UI copy aligned with pedagogical goals and technical constraints.",
  ]},
  { period: "Jan 2016 – Jan 2020", title: "Product Designer", org: "Datable", location: "Oakland, CA", bullets: [
    "Managed UX writing and design for multiple concurrent client projects across SaaS and fintech, adapting voice and tone to match distinct brand identities.",
    "Established a modular design system in Figma with standardized copy patterns for empty states and notifications, reducing design-to-dev turnaround by 30%.",
    "Collaborated with stakeholders to refine CTA copy based on business KPIs and conversion data, resulting in measurable engagement improvements.",
  ]},
];

const leadership = [
  { period: "2020 – Present", title: "Communications Team Lead", org: "HPN4Tigray", location: "Portland, OR", description: "Directed communication strategy that increased donor contributions by 25% and expanded reach by 44%. Built reusable design templates that accelerated campaign launches by 37%." },
];

const expertiseGroups = [
  { label: "UX/UI Design", skills: "Wireframing, Prototyping, Journey Mapping, Information Architecture, Accessibility (WCAG), Storyboarding, Personas" },
  { label: "Research & Strategy", skills: "Usability Testing, Heuristic Evaluation, Quantitative & Qualitative Analysis, Data Analytics, Competitive Analysis" },
  { label: "Design Systems", skills: "Style Guides, Component Libraries, Responsive Design" },
  { label: "Design Software", skills: "Figma, Sketch, Adobe XD, InVision, Protopie, Adobe Illustrator, Adobe Photoshop" },
  { label: "Development", skills: "HTML, CSS, JavaScript Tools" },
  { label: "Collaboration", skills: "Abstract, Agile, Scrum Master, Lean UX, Contentful" },
];

const Resume = () => {
  const handlePrint = () => window.print();

  return (
    <Layout>
      <SEO
        title="Resume — Huruy Kidanemariam | UX Designer & Product Designer"
        description="UX Designer with 8+ years of experience crafting accessible, data-informed products for enterprise, SaaS, and immersive tech."
        path="/resume"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ]}
      />

      {/* Print styles */}
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          main { padding-top: 0 !important; }
          body { background: white !important; color: black !important; font-size: 11px !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-container { max-width: 100% !important; padding: 0 0.5in !important; margin: 0 !important; }
          .print-container * { color: black !important; border-color: #ddd !important; }
          .print-accent { color: #e8590c !important; }
          .resume-section { break-inside: avoid; }
          .resume-pill { background: #f3f4f6 !important; border-color: #e5e7eb !important; }
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl print-container">
        {/* Action bar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Resume
            </h1>
            <p className="text-muted-foreground mt-1">Updated 2025</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handlePrint} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Printer className="h-4 w-4 mr-1" /> Print / Save PDF
            </Button>
            <a href="/resume/huruy-kidanemariam-resume.pdf" download>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-1" /> Download PDF
              </Button>
            </a>
          </div>
        </div>

        {/* ── Header ── */}
        <div className="resume-section mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Huruy Kidanemariam
          </h2>
          <p className="text-lg text-accent font-semibold mt-1 print-accent">UX Designer & Product Designer</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-muted-foreground">
            <a href="mailto:huruydesigns@gmail.com" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5" /> huruydesigns@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/huruydesigns/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/huruydesigns
            </a>
            <a href="https://huruy.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <ExternalLink className="h-3.5 w-3.5" /> huruy.tech
            </a>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* ── Summary ── */}
        <div className="resume-section mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Summary</h3>
          <p className="text-foreground leading-relaxed">
            UX Designer with 8+ years bridging psychology, design, and code to ship accessible enterprise products — from HR compliance platforms serving 9,000+ agencies to VR learning experiences and social impact tools.
          </p>
        </div>

        <Separator className="mb-6" />

        {/* ── Experience ── */}
        <div className="resume-section mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5" /> Experience
          </h3>
          <div className="space-y-7">
            {experience.map((job, i) => (
              <div key={i} className="resume-section">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-foreground">{job.title}</h4>
                    <p className="text-sm font-medium text-accent print-accent">{job.org}</p>
                  </div>
                  <div className="text-sm text-muted-foreground sm:text-right shrink-0">
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-foreground/85 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-muted-foreground">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* ── Design Leadership ── */}
        <div className="resume-section mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5" /> Design Leadership
          </h3>
          {leadership.map((item, i) => (
            <div key={i} className="resume-section">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm font-medium text-accent print-accent">{item.org}</p>
                </div>
                <div className="text-sm text-muted-foreground sm:text-right shrink-0">
                  <p>{item.period}</p>
                  <p>{item.location}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        {/* ── Education ── */}
        <div className="resume-section mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5" /> Education
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <h4 className="text-base font-bold text-foreground">Bachelor of Science in Psychology</h4>
              <p className="text-sm text-muted-foreground">Ergonomics & Human Factors Concentration</p>
              <p className="text-sm font-medium text-accent print-accent">CSU Eastbay</p>
            </div>
            <p className="text-sm text-muted-foreground shrink-0">2010 – 2014</p>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* ── Expertise ── */}
        <div className="resume-section mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5" /> Expertise
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {expertiseGroups.map((g, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-foreground mb-1.5">{g.label}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.split(", ").map((skill) => (
                    <span
                      key={skill}
                      className="resume-pill text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
