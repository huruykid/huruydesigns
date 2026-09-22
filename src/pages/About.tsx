import { motion } from "framer-motion";
import { Download, Briefcase, Compass, MessageSquare, GitBranch, Users, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import huruyHeadshot from "@/assets/huruy-headshot.jpg";
import SEO from "@/components/SEO";
import { PERSON } from "@/lib/seo";
import { person, experience, leadership, resumePdfPath } from "@/lib/resume";
import { testimonials } from "@/lib/testimonials";

const PAGE_DESC = `${person.positioning} Currently a ${person.title} at ${person.currentEmployer}.`;

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: PERSON,
};

const howIWork = [
  {
    icon: Compass,
    title: "I find the real problem before the brief's problem",
    body: "Twice now the brief was \"redesign the screens\" and the real problem was structural: a missing entity map at Asure, three products pretending to be one at OneAsure. I spend the first weeks with users and engineers, and I'll push back on a brief when the evidence says to, with the evidence in hand.",
  },
  {
    icon: MessageSquare,
    title: "How I run design reviews",
    body: "One decision per review, the options I rejected shown next to the one I'm proposing, and the user evidence for each. Engineers and compliance are in the room from the first prototype, not at sign-off. Silence is not agreement; I ask each discipline what would make them say no.",
  },
  {
    icon: GitBranch,
    title: "When I disagree with engineering",
    body: "I start by assuming the constraint is real and asking to see it. If it is, I redesign. If it's a preference, I make the case with a working prototype and the user cost of the alternative. At Asure that meant arguing for more UI states than engineering wanted; the compliance team made the case with me, and we shipped it.",
  },
  {
    icon: Users,
    title: "How I mentor and hand off",
    body: "I pair on real work rather than reviewing finished files: the junior designer runs the session or the review, I take notes and debrief after. I write specs engineers can build from without a meeting, and I'd rather leave behind a pattern in the design system than a screen only I understand.",
  },
];

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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">About</p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight font-display sm:text-5xl">Huruy Kidanemariam</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {person.positioning} Currently a {person.title} at {person.currentEmployer};
              before that, payroll compliance and HR platforms at Asure Software. I'm drawn to products where good design removes
              a barrier, whether that's enterprise software that stops punishing its users or a tool that helps people find food
              with dignity. I design in code when a working prototype settles an argument a deck can't.
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

          </motion.div>
        </div>
      </div>
    </section>

    {/* How I work */}
    <section id="how-i-work" className="py-20 border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">How I Work</p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight font-display">The questions a senior interview asks, answered up front</h2>
          <p className="text-muted-foreground">
            These are the habits behind every case study on this site. They're also what I'd want to know before hiring a senior designer.
          </p>
        </div>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {howIWork.map((item) => (
            <div key={item.title} className="border-t border-border pt-6">
              <item.icon className="mb-4 h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold tracking-tight font-display">{item.title}</h3>
              <p className="max-w-[60ch] text-[15px] leading-7 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* Renders only once real quotes exist in src/lib/testimonials.ts */}
    {testimonials.length > 0 && (
      <section className="py-20 border-t border-border/50" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <h2 id="testimonials-heading" className="text-3xl font-bold mb-8 font-display">From people I've worked with</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name + t.context} className="flex h-full flex-col border-t border-border pt-6">
                <Quote className="h-5 w-5 text-accent mb-4" aria-hidden="true" />
                <blockquote className="flex-1 text-base leading-relaxed text-foreground">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-foreground">
                    {t.url ? <a href={t.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{t.name}</a> : t.name}
                  </span>
                  <span className="block text-muted-foreground">{t.role}, {t.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    )}
  </>
);

export default About;
