import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const timeline = [
  { year: "2024", title: "UX Designer", org: "Freelance / Contract", description: "Designing user-centered products for social impact organizations and startups." },
  { year: "2023", title: "UX Design Intern", org: "OneAsure", description: "Redesigned insurance management portal for small businesses." },
  { year: "2022", title: "Software Developer", org: "Previous Role", description: "Built frontend applications with React and contributed to design systems." },
];

const About = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Photo + intro */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-square max-w-sm rounded-2xl bg-muted border border-border overflow-hidden mb-8">
              <img src="/placeholder.svg" alt="Huruy" className="w-full h-full object-cover" />
            </div>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Download className="h-4 w-4 mr-2" /> Download Resume
            </Button>
          </motion.div>

          {/* Right: Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">About Me</p>
            <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Designing with empathy, building with purpose.
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-12">
              <p>
                I'm Huruy — a UX designer and software developer passionate about creating digital products that make a real difference in people's lives.
              </p>
              <p>
                My work sits at the intersection of design and technology. I believe the best products come from deeply understanding users, testing assumptions, and iterating relentlessly.
              </p>
              <p>
                When I'm not designing, you'll find me exploring new technologies, contributing to open-source projects, or writing about design on Medium.
              </p>
            </div>

            {/* Experience */}
            <div className="mb-12">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Briefcase className="h-5 w-5 text-accent" /> Experience
              </h2>
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="text-sm font-semibold text-accent w-12 pt-1 shrink-0">{item.year}</div>
                    <div className="border-l border-border pl-4">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.org}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <GraduationCap className="h-5 w-5 text-accent" /> Education
              </h2>
              <p className="font-semibold">Bachelor's in Computer Science</p>
              <p className="text-sm text-muted-foreground">University — Class of 2022</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
