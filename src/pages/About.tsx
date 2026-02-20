import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import huruyHeadshot from "@/assets/huruy-headshot.jpg";

const experience = [
  { period: "Apr 2023 – Present", title: "UX Designer", org: "Asure Software | Austin, TX", bullets: [
    "Led content strategy for enterprise HR and compliance workflows across web and mobile. Mapped out edge cases and rewrote error messaging to reduce friction, improving task completion rates.",
    "Designed the persona and conversational scripts for 'Luna,' an AI chatbot. Partnered with PMs and QA to refine prompt engineering and AI-driven insights.",
    "Authored usage guidelines and accessibility standards (WCAG) for a new design system, ensuring consistent terminology and responsive layouts across 3 product lines.",
    "Facilitated workshops with stakeholders to align on product naming and messaging strategies, advocating for inclusive language and clear functional specs.",
  ]},
  { period: "Jan 2020 – Feb 2023", title: "UX Designer", org: "IMMERSE | Los Angeles, CA", bullets: [
    "Wrote and designed end-to-end onboarding narratives for VR learning experiences, transforming complex 3D interactions into intuitive, bite-sized instructional text.",
    "Developed Immerse's first content and design framework, establishing guidelines for tone, voice, and accessible instruction that were adopted company-wide.",
    "Conducted usability testing to identify linguistic friction points. Rewrote prompt copy to reduce cognitive load, improving learner retention and reducing motion discomfort.",
    "Partnered with instructional designers and engineers to ensure UI copy aligned with pedagogical goals and technical constraints.",
  ]},
  { period: "Jan 2016 – Jan 2020", title: "Product Designer", org: "Datable | Oakland, CA", bullets: [
    "Managed UX writing and design for multiple concurrent client projects across SaaS and fintech, adapting voice and tone to match distinct brand identities.",
    "Established a modular design system in Figma with standardized copy patterns for empty states and notifications, reducing design-to-dev turnaround by 30%.",
    "Collaborated with stakeholders to refine CTA copy based on business KPIs and conversion data, resulting in measurable engagement improvements.",
  ]},
];

const leadership = [
  { period: "2020 – Present", title: "Communications Team Lead", org: "HPN4Tigray | Portland, OR", description: "Directed communication strategy that increased donor contributions by 25% and expanded reach by 44%. Built reusable design templates that accelerated campaign launches by 37%." },
];

const expertiseGroups = [
  { label: "UX/UI Design", skills: "Wireframing, Prototyping, Journey Mapping, Information Architecture, Accessibility (WCAG), Storyboarding, Personas" },
  { label: "Research & Strategy", skills: "Usability Testing, Heuristic Evaluation, Quantitative & Qualitative Analysis, Data Analytics, Competitive Analysis" },
  { label: "Design Systems", skills: "Style Guides, Component Libraries, Responsive Design" },
  { label: "Design Software", skills: "Figma, Sketch, Adobe XD, InVision, Protopie, Adobe Illustrator, Adobe Photoshop" },
  { label: "Development", skills: "HTML, CSS, JavaScript Tools" },
  { label: "Collaboration", skills: "Abstract, Agile, Scrum Master, Lean UX, Contentful" },
];

const About = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Photo + intro */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[3/4] max-w-sm rounded-2xl bg-muted border border-border overflow-hidden mb-8">
              <img src={huruyHeadshot} alt="Huruy Kidanemariam" className="w-full h-full object-cover" />
            </div>
            <a href="/resume/huruy-kidanemariam-resume.pdf" download>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Download className="h-4 w-4 mr-2" /> Download Resume
              </Button>
            </a>
          </motion.div>

          {/* Right: Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">About Me</p>
            <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Huruy Kidanemariam
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              UX specialist with 8+ years of experience crafting accessible, data-informed product narratives for enterprise, SaaS, and immersive tech. Leveraging a background in Psychology and Human Factors, I simplify complex compliance and technical workflows into coherent, human-centered interface copy. Experienced in partnering with product, engineering, and legal teams to drive growth through clear messaging, chatbot conversational design, and scalable design systems.
            </p>

            {/* Experience */}
            <div className="mb-12">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Briefcase className="h-5 w-5 text-accent" /> Experience
              </h2>
              <div className="space-y-8">
                {experience.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-3 h-3 rounded-full bg-accent mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-accent">{item.period}</p>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground mb-2">{item.org}</p>
                      <ul className="space-y-1">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex gap-2">
                            <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-muted-foreground" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Design Leadership */}
            <div className="mb-12">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Briefcase className="h-5 w-5 text-accent" /> Design Leadership
              </h2>
              {leadership.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-accent">{item.period}</p>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">{item.org}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="mb-12">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <GraduationCap className="h-5 w-5 text-accent" /> Education
              </h2>
              <p className="text-sm font-semibold text-accent">2010 – 2014</p>
              <p className="font-semibold">Bachelor of Science in Psychology, Ergonomics & Human Factors Concentration</p>
              <p className="text-sm text-muted-foreground">CSU Eastbay</p>
            </div>

            {/* Expertise */}
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Briefcase className="h-5 w-5 text-accent" /> Expertise
              </h2>
              <div className="space-y-4">
                {expertiseGroups.map((g, i) => (
                  <div key={i}>
                    <p className="font-semibold text-sm">{g.label}</p>
                    <p className="text-sm text-muted-foreground">{g.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
