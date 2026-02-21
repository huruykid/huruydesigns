import { motion } from "framer-motion";
import { AlertTriangle, Users, Map, Lightbulb, Palette, BarChart3, Rocket, Heart, ChevronRight, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import ImageSlot from "./ImageSlot";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

const FentFinderCaseStudy = ({ project, getSlotImage }: Props) => (
  <>
    {/* Problem & Context with Stats */}
    <CaseStudySection label="The Problem" title="Problem & Context" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-6">{project.problem}</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-destructive mb-1">76%</p>
            <p className="text-sm text-foreground">of drug deaths in people ages 14-23 involved fentanyl in 2020 (CDC)</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-destructive mb-1">50x stronger</p>
            <p className="text-sm text-foreground">Fentanyl is up to 50 times stronger than heroin and 100 times stronger than morphine</p>
          </CardContent>
        </Card>
      </div>

      <h3 className="font-bold text-foreground mb-3">Existing Solutions Fall Short</h3>
      <p className="mb-3">Most existing tools are either:</p>
      {project.problemBullets && (
        <ul className="space-y-2 mb-4">
          {project.problemBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {project.problemImpact && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-5">
            <p className="text-foreground font-medium">{project.problemImpact}</p>
          </CardContent>
        </Card>
      )}
    </CaseStudySection>

    {/* The Solution & Goals */}
    <CaseStudySection label="The Solution" title="Design Goals & Approach" icon={<Lightbulb className="h-4 w-4" />}>
      <p className="mb-6">From the outset, I made it clear this product isn't about flashy features. It's about utility, empathy, and trust.</p>
      {project.goals && (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {project.goals.map((g, i) => (
            <Card key={i} className="border-border bg-card/50">
              <CardContent className="p-5 flex items-start gap-3">
                <span className="text-accent font-bold text-lg shrink-0">0{i + 1}</span>
                <p>{g}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Core Features */}
      {project.solutionFeatures && (
        <div className="space-y-16">
          <h3 className="text-xl font-bold text-foreground">Core Features</h3>
          {project.solutionFeatures.map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-foreground mb-2">{i + 1}. {feat.title}</h3>
              <p className="mb-4">{feat.description}</p>
              <ImageSlot slot={feat.imageSlot} label={feat.title} imageSrc={getSlotImage(feat.imageSlot)} />
              <Card className="border-accent/30 bg-accent/5 mt-4">
                <CardContent className="p-4">
                  <p className="text-sm"><strong className="text-accent">Why it matters:</strong> {feat.whyItMatters}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </CaseStudySection>

    {/* Design Process */}
    <CaseStudySection label="Design Process" title="Research & Discovery" icon={<Users className="h-4 w-4" />}>
      <p className="mb-4">I conducted interviews with 12 participants, including harm reduction advocates, young adults who recreationally use substances, and family members of overdose victims. Key insights emerged:</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { title: "Speed matters", desc: "Users won't use an app that takes more than a minute" },
          { title: "Visual over text", desc: "Users want to see what pills look like, not read lengthy descriptions" },
          { title: "Trust is fragile", desc: "Any hint of judgment or preachiness would cause immediate abandonment" },
          { title: "Crisis mode", desc: "Users are often stressed, confused, or in active decision-making. The UI must be calming and clear." },
        ].map((item, i) => (
          <Card key={i} className="border-border bg-card/50">
            <CardContent className="p-5">
              <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ImageSlot slot="user-research" label="User research synthesis" imageSrc={getSlotImage("user-research")} />
    </CaseStudySection>

    {/* User Journey Mapping */}
    <CaseStudySection label="User Journey" title="Mapping the Experience" icon={<Map className="h-4 w-4" />}>
      <p className="mb-6">To ensure Fent Finder could deliver value in critical moments, I mapped the real-world journey a user takes when trying to identify a potentially dangerous pill.</p>
      <div className="space-y-4 mb-6">
        {[
          {
            stage: "Stage 1: Motivation",
            desc: "User recognizes fake pills and other drugs laced with fentanyl often look real, but can be deadly.",
            feeling: "Concerned about a pill's safety. Unsure where to start or what's legit.",
          },
          {
            stage: "Stage 2: Discovery",
            desc: "User opens Fent Finder to scan the pill or search visually using the app's tools.",
            feeling: "Stressful situation, limited time. Unsure how to take a proper scan.",
          },
          {
            stage: "Stage 3: Verification",
            desc: "App processes image and returns a result: Safe, Unknown, or Dangerous.",
            feeling: "Needs fast, clear result. Confused by ambiguous or non-conclusive results.",
          },
          {
            stage: "Stage 4: Decision & Action",
            desc: "User takes the next step: gets resources, alerts, or help based on result.",
            feeling: "Needs clear guidance if pill is unsafe or unknown. May not know how to access Narcan nearby.",
          },
        ].map((s, i) => (
          <Card key={i} className="border-border bg-card/50 overflow-hidden">
            <CardContent className="p-6">
              <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">{s.stage}</p>
              <p className="text-foreground mb-3">{s.desc}</p>
              <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
                <p className="text-sm"><strong className="text-muted-foreground">Feelings & Pain Points:</strong> {s.feeling}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ImageSlot slot="user-journey" label="User journey map" imageSrc={getSlotImage("user-journey")} />
    </CaseStudySection>

    {/* Wireframing & Iteration */}
    <CaseStudySection label="Iteration" title="Wireframing & Testing" icon={<Lightbulb className="h-4 w-4" />}>
      <p className="mb-6">I started with low-fidelity wireframes, testing with 8 users over 3 rounds. Key changes included:</p>
      <div className="space-y-4 mb-6">
        {[
          { version: "Version 1", change: "Included too many options on the home screen. Users felt overwhelmed.", result: "" },
          { version: "Version 2", change: "Simplified to three primary actions (Scan, Photo, Search).", result: "Testing improved task completion by 45%." },
          { version: "Version 3", change: "Added inline help text and visual cues.", result: "Reduced confusion about the scanning process from 60% to 15%." },
        ].map((v, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
            <span className="text-accent font-bold text-sm shrink-0 mt-0.5 whitespace-nowrap">{v.version}</span>
            <div>
              <p className="text-foreground">{v.change}</p>
              {v.result && <p className="text-sm text-accent mt-1 font-medium">{v.result}</p>}
            </div>
          </div>
        ))}
      </div>
      <ImageSlot slot="wireframes" label="Wireframe iterations" imageSrc={getSlotImage("wireframes")} />
    </CaseStudySection>

    {/* Visual Design & Accessibility */}
    {project.designPrinciples && (
      <CaseStudySection label="Visual Design" title="Design & Accessibility" icon={<Palette className="h-4 w-4" />}>
        <p className="mb-6">The final UI design prioritized user accessibility with a clean layout and straightforward navigation.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {project.designPrinciples.map((p, i) => (
            <Card key={i} className="border-border bg-card/50">
              <CardContent className="p-5">
                <h3 className="font-bold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ImageSlot slot="visual-design" label="Final UI design screens" imageSrc={getSlotImage("visual-design")} />
      </CaseStudySection>
    )}

    {/* Prototyping & User Testing */}
    {project.validationMetrics && (
      <CaseStudySection label="Validation" title="Prototyping & User Testing" icon={<BarChart3 className="h-4 w-4" />}>
        <p className="mb-6">I created a high-fidelity prototype in Figma and conducted moderated usability testing with 15 participants.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {project.validationMetrics.map((m, i) => (
            <Card key={i} className="border-accent/30 bg-accent/5">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-accent mb-1">{m.value}</p>
                <p className="font-semibold text-foreground text-sm mb-1">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ImageSlot slot="validation-chart" label="Usability testing results" imageSrc={getSlotImage("validation-chart")} />
      </CaseStudySection>
    )}

    {/* Key Learnings */}
    {project.learnings && (
      <CaseStudySection label="Learnings" title="What I Learned" icon={<Lightbulb className="h-4 w-4" />}>
        <div className="space-y-4">
          {project.learnings.map((l, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
              <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
              <p>{l}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* Stakeholder Feedback */}
    <CaseStudySection label="Impact" title="Stakeholder Feedback" icon={<Heart className="h-4 w-4" />}>
      <p className="mb-6">While not yet live, the concept has been tested with early stakeholders including harm reduction advocates, emergency medical professionals, and potential users.</p>
      <div className="space-y-4 mb-8">
        {[
          { quote: "If this existed two years ago, my cousin might still be alive.", source: "Family member of overdose victim" },
          { quote: "This is simple. It's not overwhelming like other pill sites.", source: "Harm reduction advocate" },
          { quote: "Finally, a tool designed for people, not clinicians.", source: "Emergency room physician" },
        ].map((q, i) => (
          <Card key={i} className="border-border bg-muted/30">
            <CardContent className="p-6">
              <blockquote className="border-l-2 border-accent pl-4 italic mb-3 text-foreground">"{q.quote}"</blockquote>
              <p className="text-sm text-muted-foreground">- {q.source}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="font-bold text-foreground mb-3">Current Status & Outcomes</h3>
      <ul className="space-y-2 mb-6">
        {[
          "Figma prototype complete with full user flow and interactive components",
          "Positive feedback from harm reduction advocates at 3 major organizations",
          "Developer interest in MVP with preliminary technical feasibility assessment complete",
          "Planning open-source collaboration to make tool freely available",
          "Exploring grant opportunities with public health organizations to fund development",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CaseStudySection>

    {/* Next Steps */}
    <CaseStudySection label="Roadmap" title="Next Steps" icon={<Rocket className="h-4 w-4" />}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-foreground mb-3">Short-term (0-6 months)</h3>
          <ul className="space-y-2">
            {[
              "Finalize AI model training with expanded pill database (targeting 95%+ accuracy)",
              "Develop MVP with core scanning and identification features",
              "Conduct beta testing with 50+ users in partnership with harm reduction centers",
              "Submit grant applications to CDC and SAMHSA for development funding",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-3">Long-term (6-12 months)</h3>
          <ul className="space-y-2">
            {[
              "Launch open-source version for community contribution",
              "Partner with Narcan distributors to integrate location finder",
              "Expand educational content with input from addiction specialists",
              "Track impact metrics: downloads, scans performed, resources accessed",
              "Explore partnerships with universities for ongoing research",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CaseStudySection>

    {/* Technical Considerations */}
    <CaseStudySection label="Technical" title="Technical Considerations" icon={<Lightbulb className="h-4 w-4" />}>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-foreground mb-3">AI Model Development</h3>
          <p className="mb-3">The pill identification system uses a convolutional neural network trained on the Drugs.com pill database (containing over 24,000 pill images).</p>
          <ul className="space-y-2">
            {[
              "Image preprocessing: Background removal and normalization for consistent matching",
              "Multi-factor matching: Shape, color, imprint, and size (when reference provided)",
              "Confidence thresholds: Results flagged as Unknown if confidence < 85%",
              "Continuous learning: System designed to incorporate new pill data as counterfeit patterns evolve",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-3">Privacy & Security</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "No user accounts required", desc: "Anonymous usage to reduce barriers and protect privacy" },
              { title: "Local image processing", desc: "Photos processed on-device when possible, deleted immediately after analysis" },
              { title: "No data retention", desc: "Search history and scan results not stored on servers" },
              { title: "Encrypted connections", desc: "All API calls use end-to-end encryption" },
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card/50">
                <CardContent className="p-4">
                  <h4 className="font-bold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Limitations & Disclaimers</p>
            <ul className="space-y-1 text-sm">
              <li>• Visual identification cannot detect fentanyl or other adulterants with certainty</li>
              <li>• Results should be used in combination with other harm reduction strategies</li>
              <li>• App is a risk reduction tool, not a guarantee of safety</li>
              <li>• Users encouraged to seek professional medical advice when needed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </CaseStudySection>

    {/* Closing */}
    {project.closingStatement && (
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
        <Card className="border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-8 text-center">
            <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
            <p className="text-lg text-foreground font-medium mb-6">{project.closingStatement}</p>
            {project.closingStats && (
              <div className="grid sm:grid-cols-3 gap-4">
                {project.closingStats.map((s, i) => (
                  <div key={i}>
                    <p className="text-xs text-accent uppercase font-semibold tracking-wide">{s.label}</p>
                    <p className="text-sm text-foreground mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )}

    {/* Appendix */}
    {project.appendixImages && project.appendixImages.length > 0 && (
      <CaseStudySection label="Appendix" title="Additional Screens" icon={<ImageIcon className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          {project.appendixImages.map((img, i) => (
            <div key={i}>
              <ImageSlot slot={img.slot} label={img.caption} aspectRatio="aspect-[4/3]" imageSrc={getSlotImage(img.slot)} />
              <p className="text-xs text-muted-foreground mt-2 text-center">{img.caption}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    )}
  </>
);

export default FentFinderCaseStudy;
