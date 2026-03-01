import { Download, Printer, MapPin, Mail, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const experience = [
  {
    company: "Asure Software",
    role: "Lead Product Designer",
    period: "2023 – 2024",
    location: "Dallas, TX (Onsite)",
    bullets: [
      "Led end-to-end UX redesign of enterprise payroll compliance engine supporting 9,000+ tax agencies across US and Canada",
      "Facilitated cross-functional whiteboarding sessions with engineering, PM, and SMEs to map entity dependency chains that had never been documented",
      "Designed state-machine driven UI ensuring 1:1 mapping between frontend state and backend compliance logic",
      "Created the unified OneAsure Portal consolidating Time & Attendance, Benefits, and Payroll into a single experience",
      "Conducted 16 remote user interviews and 24 usability tests across 8 iterative design rounds over 6+ months",
    ],
  },
  {
    company: "IMMERSE",
    role: "UX Designer",
    period: "2022 – 2023",
    location: "Remote",
    bullets: [
      "Designed immersive VR-based language learning experiences for enterprise and education clients",
      "Conducted user research and usability testing to iterate on 3D interaction patterns",
      "Collaborated with engineering to define interaction specifications for Unity-based environments",
    ],
  },
  {
    company: "Datable",
    role: "UX Designer",
    period: "2021 – 2022",
    location: "Remote",
    bullets: [
      "Designed social discovery features for a dating/friendship platform, including event creation flows and matching interfaces",
      "Built and maintained a component-based design system in Figma",
      "Ran competitive audits across 12+ platforms to identify differentiation opportunities",
    ],
  },
];

const skills = {
  "Design & Prototyping": ["Figma", "Prototyping", "Wireframing", "Visual Design", "Design Systems", "Interaction Design"],
  "Research & Strategy": ["User Research", "Usability Testing", "Information Architecture", "Competitive Analysis", "Journey Mapping"],
  "Development": ["React", "TypeScript", "HTML/CSS", "Tailwind CSS", "JavaScript"],
  "Collaboration": ["Agile/Scrum", "Cross-functional Teams", "Stakeholder Presentations", "Miro", "Jira"],
};

const Resume = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <SEO
        title="Resume — Huruy Kidanemariam | UX & Product Designer"
        description="UX and Product Designer specializing in complex enterprise systems, payroll compliance, and social impact products."
        path="/resume"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ]}
      />

      {/* Print-only styles */}
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          main { padding-top: 0 !important; }
          body { background: white !important; color: black !important; font-size: 11px !important; }
          .print-container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .print-container * { color: black !important; border-color: #ddd !important; }
          .resume-section { break-inside: avoid; }
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl print-container">
        {/* Action bar — hidden on print */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Resume
            </h1>
            <p className="text-muted-foreground mt-1">Updated 2024</p>
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

        {/* Header / Name block */}
        <div className="resume-section mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Huruy Kidanemariam
          </h2>
          <p className="text-lg text-accent font-semibold mt-1">UX & Product Designer</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Dallas, TX
            </span>
            <a href="mailto:huruy@huruy.tech" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5" /> huruy@huruy.tech
            </a>
            <a href="https://linkedin.com/in/huruy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a href="https://huruy.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <ExternalLink className="h-3.5 w-3.5" /> huruy.tech
            </a>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Summary */}
        <div className="resume-section mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Summary</h3>
          <p className="text-foreground leading-relaxed">
            UX and Product Designer with a psychology background, specializing in complex enterprise and social impact products. 
            I bring systems thinking to ambiguous problem spaces — mapping entity relationships, aligning cross-functional teams, 
            and designing interfaces where getting the UX wrong isn't an inconvenience, it's a liability. 
            Proven track record across payroll compliance (9,000+ agencies), unified HCM portals, and community-driven platforms.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Experience */}
        <div className="resume-section mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Experience</h3>
          <div className="space-y-8">
            {experience.map((job, i) => (
              <div key={i} className="resume-section">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-foreground">{job.role}</h4>
                    <p className="text-sm font-medium text-accent">{job.company}</p>
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

        <Separator className="mb-8" />

        {/* Skills */}
        <div className="resume-section mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Skills</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-foreground mb-2">{category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Education */}
        <div className="resume-section mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Education</h3>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h4 className="text-base font-bold text-foreground">B.S. Psychology</h4>
              <p className="text-sm text-muted-foreground">University — Focus on cognitive psychology and human behavior</p>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Selected Projects */}
        <div className="resume-section mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Selected Projects</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Asure Compliance Engine</h4>
              <p className="text-sm text-foreground/85">Re-architected enterprise payroll compliance UX for 9,000+ tax agencies. Mapped entity relationships, designed state-machine UI, and aligned engineering with SME teams.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">OneAsure Portal</h4>
              <p className="text-sm text-foreground/85">Unified HR management consolidating Time & Attendance, Benefits, and Payroll into a single experience with 24 usability tests and 8 design iterations.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">EBT Finder</h4>
              <p className="text-sm text-foreground/85">Designed a review-first SNAP/EBT store locator achieving 95% user satisfaction and 65% faster task completion vs. the USDA's official tool.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
