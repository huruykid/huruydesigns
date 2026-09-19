import { useState } from "react";
import { Download, Printer, Mail, Linkedin, Globe, FileText, Loader2 } from "lucide-react";
import headshot from "@/assets/huruy-headshot.jpg";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { PERSON } from "@/lib/seo";
import { person, experience, sideProjects, leadership, skillGroups, contactLinks, resumePdfPath } from "@/lib/resume";

const resumeJsonLd = {
  "@context": "https://schema.org",
  ...PERSON,
  hasOccupation: experience.map((job) => ({
    "@type": "Occupation",
    name: job.title,
    occupationLocation: { "@type": "Place", name: job.location },
  })),
};

const contactIcons = { email: Mail, linkedin: Linkedin, website: Globe } as const;

const Resume = () => {
  const [exporting, setExporting] = useState(false);
  const handlePrint = () => window.print();
  // docx + file-saver are ~110 KB gzipped; load them only when someone asks for Word.
  const handleWord = async () => {
    setExporting(true);
    try {
      const { generateAndDownloadDocx } = await import("@/lib/generateResumeDocx");
      await generateAndDownloadDocx();
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <SEO
        title="Huruy Kidanemariam | Resume – Senior UX Designer"
        description="Resume of Huruy Kidanemariam – Senior UX Designer with 8+ years in enterprise SaaS, compliance, conversational AI, and product design."
        path="/resume"
        jsonLd={resumeJsonLd}
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
            width: 200px !important;
            min-width: 200px !important;
            flex-shrink: 0 !important;
            border-bottom: none !important;
          }
          .resume-main {
            flex: 1 !important;
          }

          /* Scale to fit one page */
          .resume-page > div {
            zoom: 0.72;
          }
          

          @page { margin: 0.2in; size: letter; }
        }
      `}</style>

      {/* Action bar - screen only */}
      <div className="no-print container mx-auto px-4 pt-8 pb-4 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
              Resume
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">View online or save as PDF</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={resumePdfPath} download>
                <Download className="h-4 w-4 mr-1" /> PDF
              </a>
            </Button>
            <Button variant="outline" onClick={handleWord} disabled={exporting}>
              {exporting ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <FileText className="h-4 w-4 mr-1" />} Word
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
                <h2 className="text-xl md:text-3xl font-bold tracking-tight font-display">
                  {person.name}
                </h2>
                <p className="text-accent font-semibold mt-1 print-accent font-display">
                  {person.title}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
                  {contactLinks.map((c) => {
                    const Icon = contactIcons[c.kind];
                    return (
                      <a
                        key={c.label}
                        href={c.href}
                        target={c.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {c.label}
                      </a>
                    );
                  })}
                </div>
              </div>
              <img
                src={headshot}
                alt="Huruy Kidanemariam, Senior UX Designer"
                className="h-20 w-20 rounded-full object-cover object-top border-2 border-accent/20 shrink-0"
              />
            </div>
          </div>

          {/* Two-column layout */}
          <div className="resume-two-col flex flex-col md:flex-row md:gap-6">
            
            {/* ── Sidebar ── */}
            <aside className="md:w-[220px] shrink-0 border-b md:border-b-0 md:border-r border-border resume-sidebar px-4 md:px-8 py-6 space-y-6 order-2 md:order-1">
              
              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 print-accent font-display">
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


              {/* Side Projects */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 print-accent font-display">
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
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 print-accent font-display">
                  Summary
                </h3>
                <p className="text-sm text-foreground leading-relaxed">{person.summary}</p>
              </div>

              <hr className="border-border resume-divider mb-6" />

              {/* Experience */}
              <div className="resume-section mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 print-accent font-display">
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
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 print-accent font-display">
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
    </>
  );
};

export default Resume;
