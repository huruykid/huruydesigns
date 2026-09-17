import { motion } from "framer-motion";
import { Download, Briefcase, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import UXTriviaQuiz from "@/components/UXTriviaQuiz";
import huruyHeadshot from "@/assets/huruy-headshot.jpg";
import SEO from "@/components/SEO";
import { PERSON } from "@/lib/seo";
import { person, experience, leadership, skillGroups, resumePdfPath } from "@/lib/resume";

const PAGE_DESC = `${person.positioning} Currently designing research tools for investment analysts at ${person.currentEmployer}.`;

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: PERSON,
};

const About = () => (
  <>
    <SEO
      title="About Huruy Kidanemariam | Senior UX Designer, Los Angeles"
      description={PAGE_DESC}
      path="/about"
      jsonLd={profilePageJsonLd}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]}
    />
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Photo + intro */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[3/4] max-w-sm rounded-2xl bg-muted border border-border overflow-hidden mb-8">
              <img
                src={huruyHeadshot}
                alt="Huruy Kidanemariam, Senior UX Designer"
                className="w-full h-full object-cover"
                width={640}
                height={853}
                decoding="async"
              />
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={resumePdfPath} download>
                <Download className="h-4 w-4 mr-2" /> Download resume
              </a>
            </Button>
          </motion.div>

          {/* Right: Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">About Me</p>
            <h1 className="text-4xl font-bold mb-6 font-display">About Huruy Kidanemariam</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {person.positioning} Currently designing research and analysis tools for investment analysts at {person.currentEmployer}.
              Previously led UX and content strategy at Asure Software, where I simplified complex compliance and technical
              workflows into coherent, human-centered interfaces. I partner with product, engineering, and legal teams on
              clear messaging, conversational design, and scalable design systems. I'm drawn to projects where good design
              removes barriers, whether that means making enterprise software less frustrating or helping underserved
              communities access the tools they deserve. Design, for me, is about dignity.
              <span className="hidden md:inline">
                {" "}When I'm not simplifying complex workflows, I'm probably building small things like{" "}
                <a href="#ux-trivia" className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">
                  this UX trivia quiz
                </a>
                .
              </span>
            </p>

            {/* Experience */}
            <div className="mb-12">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6 font-display">
                <Briefcase className="h-5 w-5 text-accent" aria-hidden="true" /> Experience
              </h2>
              <div className="space-y-8">
                {experience.map((item, i) => (
                  <motion.div
                    key={item.org + item.start}
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
                      <p className="text-sm text-muted-foreground mb-2">{item.org} | {item.location}</p>
                      <ul className="space-y-1">
                        {item.bullets.map((b) => (
                          <li key={b} className="text-sm text-muted-foreground flex gap-2">
                            <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-muted-foreground" />
                            {b}.
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
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6 font-display">
                <Briefcase className="h-5 w-5 text-accent" aria-hidden="true" /> Design Leadership
              </h2>
              {leadership.map((item) => (
                <div key={item.org} className="flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-accent">{item.period}</p>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">{item.org} | {item.location}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* In the Field */}
            <div className="mb-12">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 font-display">
                <Rocket className="h-5 w-5 text-accent" aria-hidden="true" /> In the Field
              </h2>
              <div className="space-y-3">
                {[
                  { lead: "8+ years in the field,", rest: "designing and shipping real products across enterprise, SaaS, and consumer." },
                  { lead: "Shipped EBT Finder solo,", rest: "from a 4-week research sprint to a live app on the App Store." },
                  { lead: "Top 1% designer on Lovable.", rest: "I design in code, not just mockups." },
                ].map((item) => (
                  <div key={item.lead} className="flex gap-4">
                    <div className="w-3 h-3 rounded-full bg-accent mt-1.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{item.lead}</span> {item.rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6 font-display">
                <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" /> Expertise
              </h2>
              <div className="space-y-5">
                {skillGroups.map((g) => (
                  <div key={g.label}>
                    <p className="font-semibold text-sm mb-2">{g.label}</p>
                    <ul className="flex flex-wrap gap-2" aria-label={`${g.label} skills`}>
                      {g.skills.map((s) => (
                        <li key={s} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* UX Trivia: desktop only, the whole section, so phones never get an empty heading. */}
    <section id="ux-trivia" className="hidden md:block py-20 border-t border-border/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-8 font-display">Test Your UX Knowledge</h2>
        <UXTriviaQuiz />
      </div>
    </section>
  </>
);

export default About;
