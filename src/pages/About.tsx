import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import HeroPongGame from "@/components/HeroPongGame";
import huruyHeadshot from "@/assets/huruy-headshot.jpg";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Huruy Kidanemariam",
    jobTitle: "Senior UX Designer",
    url: "https://huruy.tech",
    image: "https://huruy.tech/og-image.png",
    description:
      "Senior UX Designer with 8+ years of experience crafting accessible, data-informed products for enterprise, SaaS, and immersive tech.",
    knowsAbout: ["UX Design", "Product Design", "Accessibility", "Design Systems", "User Research"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Psychology (B.S.)",
    },
    sameAs: [
      "https://www.linkedin.com/in/huruykidanemariam/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Capital Group (via Luxoft)",
    },
  },
};

const experience = [
  { period: "Mar 2025 – Present", title: "Senior UX Designer", org: "Capital Group (via Luxoft) | Los Angeles, CA", bullets: [
    "Design research and analysis tools for investment analysts at a $2.7T asset manager, translating complex regulated enterprise workflows into intuitive, trusted interfaces.",
    "Partner with product, engineering, and compliance stakeholders to shape AI-assisted research experiences that meet strict governance and accuracy standards.",
    "Contribute to design systems and interaction patterns that scale across Capital Group's internal analyst platform.",
  ]},
  { period: "2024 – Present", title: "AI Product Designer & Builder", org: "Appfinity Labs (Independent) | Los Angeles, CA", bullets: [
    "Prototype and ship AI-powered products using LLM integrations, prompt engineering, and conversational UX patterns.",
    "Design guardrails, feedback loops, and human-in-the-loop flows that keep generative AI outputs accurate and on-brand.",
    "Build production React interfaces that connect design decisions directly to working code.",
  ]},
  { period: "Apr 2023 – Mar 2025", title: "UX Designer", org: "Asure Software | Austin, TX", bullets: [
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
    <SEO
      title="About Huruy Kidanemariam | Senior UX Designer"
      description="Huruy Kidanemariam is a Senior UX Designer with 8+ years of experience crafting accessible, data-informed products for enterprise, SaaS, and immersive tech."
      path="/about"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]}
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(profilePageJsonLd)}</script>
    </Helmet>
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Photo + intro */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[3/4] max-w-sm rounded-2xl bg-muted border border-border overflow-hidden mb-8">
              <img src={huruyHeadshot} alt="Huruy Kidanemariam, Senior UX Designer" className="w-full h-full object-cover" />
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
              About Huruy Kidanemariam
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Senior UX Designer with 8+ years of experience crafting accessible, data-informed product narratives for enterprise, SaaS, and immersive tech. Currently designing research and analysis tools for investment analysts at Capital Group. Previously led UX and content strategy at Asure Software, where I simplified complex compliance and technical workflows into coherent, human-centered interface copy. Experienced in partnering with product, engineering, and legal teams to drive growth through clear messaging, chatbot conversational design, and scalable design systems. I'm drawn to projects where good design removes barriers, whether that means making enterprise software less frustrating or helping underserved communities access the tools they deserve. Design, for me, is about dignity.{" "}When I'm not simplifying complex workflows, I'm probably building silly things like{" "}
              <a href="#ux-trivia" className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">this UX trivia game</a>.
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
              
              <p className="font-semibold">Bachelor of Science in Psychology, Ergonomics & Human Factors Concentration</p>
              <p className="text-sm text-muted-foreground">CSU Eastbay</p>
            </div>

            {/* Expertise */}
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Briefcase className="h-5 w-5 text-accent" /> Expertise
              </h2>
              <div className="space-y-5">
                {expertiseGroups.map((g, i) => (
                  <div key={i}>
                    <p className="font-semibold text-sm mb-2">{g.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {g.skills.split(", ").map((s) => (
                        <span key={s} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* UX Trivia Challenge */}
    <section id="ux-trivia" className="py-20 border-t border-border/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Test Your UX Knowledge
        </h2>
        <HeroPongGame />
      </div>
    </section>
  </Layout>
);

export default About;
