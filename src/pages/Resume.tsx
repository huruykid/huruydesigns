import { Download, Printer, Mail, Linkedin, ExternalLink, Globe, FileText } from "lucide-react";
import { generateAndDownloadDocx } from "@/lib/generateResumeDocx";
import headshot from "@/assets/huruy-headshot.jpg";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

// ── Data ──

const experience = [
  { period: "Apr 2023 – Present", title: "UX Designer", org: "Asure Software", location: "Austin, TX", bullets: [
    "Led end-to-end UX for a compliance engine used by 9,000+ payroll agencies, re-architecting tax compliance workflows that reduced filing errors",
    "Designed persona and conversational scripts for 'Luna,' an enterprise AI chatbot integrated across HR, payroll, and benefits",
    "Built and authored WCAG-compliant design system guidelines, establishing accessibility standards across web and mobile products",
    "Facilitated cross-functional workshops with product, engineering, and SME stakeholders to align on content strategy and information architecture",
  ]},
  { period: "Jan 2020 – Feb 2023", title: "UX Designer", org: "IMMERSE", location: "Los Angeles, CA", bullets: [
    "Designed onboarding flows for VR-based English language learning experiences, improving learner retention",
    "Developed Immerse's first content and design framework, establishing reusable guidelines for instructional designers",
    "Conducted usability testing to identify linguistic friction points. Rewrote prompt sequences reducing user errors",
    "Partnered with instructional designers and engineers to ensure UI copy aligned with pedagogical best practices",
  ]},
  { period: "Jan 2016 – Jan 2020", title: "Product Designer", org: "Datable", location: "Oakland, CA", bullets: [
    "Managed UX writing and design for multiple concurrent SaaS client projects across diverse industries",
    "Established a modular design system in Figma with standardized copy patterns for error states, empty states, and CTAs",
    "Collaborated with stakeholders to refine CTA copy based on business KPIs and conversion data",
  ]},
];

const sideProjects = [
  { title: "EBT Finder", description: "Designed a review-first SNAP/EBT store locator for 12M+ users. UX Research, Figma, Prototyping" },
  { title: "Beles", description: "Designed a culturally authentic dating app for the Tigrayan diaspora community" },
];

const leadership = [
  { period: "2020 – Present", title: "Communications Team Lead", org: "HPN4Tigray", location: "Portland, OR", description: "Led storytelling and advocacy campaigns that increased donor contributions by 25% and expanded reach by 44%. Built reusable design templates that accelerated campaign launches by 37%." },
];

const skillGroups = [
  { label: "Design", skills: ["Figma", "Prototyping", "Wireframing", "Visual Design", "Design Systems", "Information Architecture", "Journey Mapping"] },
  { label: "Research", skills: ["Usability Testing", "Heuristic Evaluation", "Competitive Analysis", "User Interviews"] },
  { label: "Development", skills: ["React", "HTML/CSS", "JavaScript"] },
  { label: "Collaboration", skills: ["Agile", "Scrum", "Cross-functional Teams", "Lean UX"] },
  { label: "AI", skills: ["Prompt Engineering", "AI Prototyping", "LLM Integration", "AI-Assisted Research"] },
];

const contact = [
  { icon: Mail, label: "huruydesigns@gmail.com", href: "mailto:huruydesigns@gmail.com" },
  { icon: Linkedin, label: "linkedin.com/in/huruydesigns", href: "https://www.linkedin.com/in/huruydesigns/" },
  { icon: Globe, label: "huruy.tech", href: "https://huruy.tech" },
];

const Resume = () => {
  const handlePrint = () => window.print();

  return (
    <Layout>
      <SEO
        title="Resume | Huruy Kidanemariam | UX Designer & Product Designer"
        description="UX Designer with 8+ years bridging psychology, design, and code to ship accessible enterprise products."
        path="/resume"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ]}
      />

      {/* Print styles */}
      <style>{`
        @media print {
          header, footer, .no-print, nav { display: none !important; }
          main { padding-top: 0 !important; }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }
          .resume-page { 
            max-width: 100% !important; 
            padding: 0 !important; 
            margin: 0 !important; 
          }
          .resume-page .rounded-xl { 
            border-radius: 0 !important; 
            box-shadow: none !important; 
            border: none !important;
          }

          /* Force two-column layout in print */
          .resume-two-col {
            display: flex !important;
            flex-direction: row !important;
          }
          .resume-sidebar {
            width: 240px !important;
            min-width: 240px !important;
            flex-shrink: 0 !important;
            border-bottom: none !important;
          }
          .resume-main {
            flex: 1 !important;
          }

          /* Scale to fit one page */
          .resume-page > div {
            zoom: 0.8;
          }
          

          @page { margin: 0.2in; size: letter; }
        }
      `}</style>

      {/* Action bar - screen only */}
      <div className="no-print container mx-auto px-4 pt-8 pb-4 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Resume
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">View online or save as PDF</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href="/resume/huruy-kidanemariam-resume.pdf" download>
                <Download className="h-4 w-4 mr-1" /> PDF
              </a>
            </Button>
            <Button variant="outline" onClick={generateAndDownloadDocx}>
              <FileText className="h-4 w-4 mr-1" /> Word
            </Button>
            <Button onClick={handlePrint} className="bg-accent text-accent-foreground hover:bg-accent/90 hidden sm:inline-flex">
              <Printer className="h-4 w-4 mr-1" /> Print
            </Button>
          </div>
        </div>
      </div>

      {/* Resume document */}
      <div className="container mx-auto px-4 pb-16 max-w-5xl resume-page">
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          
          {/* Name header */}
          <div className="px-4 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 border-b border-border resume-divider">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Huruy Kidanemariam
                </h2>
                <p className="text-accent font-semibold mt-1 print-accent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  UX Designer & Product Designer
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
                  {contact.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <c.icon className="h-3.5 w-3.5 shrink-0" />
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
              <img
                src={headshot}
                alt="Huruy Kidanemariam, UX Designer"
                className="h-20 w-20 rounded-full object-cover object-top border-2 border-accent/20 shrink-0"
              />
            </div>
          </div>

          {/* Two-column layout */}
          <div className="resume-two-col flex flex-col md:flex-row">
            
            {/* ── Sidebar ── */}
            <aside className="md:w-[280px] shrink-0 border-b md:border-b-0 md:border-r border-border resume-sidebar px-4 md:px-8 py-6 space-y-6 order-2 md:order-1">
              
              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 print-accent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Skills
                </h3>
                <div className="space-y-4">
                  {skillGroups.map((g) => (
                    <div key={g.label}>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">{g.label}</h4>
                      <div className="flex flex-wrap gap-1">
                        {g.skills.map((s) => (
                          <span key={s} className="resume-pill text-[11px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 print-accent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Education
                </h3>
                <p className="text-sm text-foreground">CSU Eastbay</p>
              </div>

              {/* Side Projects */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 print-accent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Side Projects
                </h3>
                <div className="space-y-2.5">
                  {sideProjects.map((p) => (
                    <div key={p.title}>
                      <h4 className="text-sm font-semibold text-foreground">{p.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Main column ── */}
            <div className="resume-main flex-1 px-4 md:px-8 py-6 order-1 md:order-2">
              
              {/* Summary */}
              <div className="resume-section mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 print-accent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Summary
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  UX Designer with 8+ years bridging psychology, design, and code to ship accessible enterprise products, from HR compliance platforms serving 9,000+ agencies to VR learning experiences and social impact tools.
                </p>
              </div>

              <hr className="border-border resume-divider mb-6" />

              {/* Experience */}
              <div className="resume-section mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 print-accent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Experience
                </h3>
                <div className="space-y-6">
                  {experience.map((job, i) => (
                    <div key={i} className="resume-section">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1.5">
                        <div>
                          <h4 className="text-sm font-bold text-foreground">{job.title}</h4>
                          <p className="text-xs font-medium text-accent print-accent">{job.org} · {job.location}</p>
                        </div>
                        <p className="text-xs text-muted-foreground shrink-0">{job.period}</p>
                      </div>
                      <ul className="mt-1.5 space-y-1">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="text-sm text-foreground/85 leading-relaxed pl-3.5 relative before:content-['•'] before:absolute before:left-0 before:text-accent/60">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-border resume-divider mb-6" />

              {/* Design Leadership */}
              <div className="resume-section">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 print-accent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Design Leadership
                </h3>
                {leadership.map((item, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1.5">
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                        <p className="text-xs font-medium text-accent print-accent">{item.org} · {item.location}</p>
                      </div>
                      <p className="text-xs text-muted-foreground shrink-0">{item.period}</p>
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
