import { motion } from "framer-motion";
import { AlertTriangle, Users, Map, Lightbulb, Palette, BarChart3, Rocket, Heart, ChevronRight, Search, MessageSquareQuote, Target } from "lucide-react";
import ExistingSolutionsComparison from "./ExistingSolutionsComparison";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import ImageSlot from "./ImageSlot";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
  onUploaded: (slot: string, url: string) => void;
  projectId: string;
}

const BelesCaseStudy = ({ project, getSlotImage, onUploaded, projectId }: Props) => (
  <>
    {/* Problem & Context */}
    <CaseStudySection label="The Problem" title="How can we empower Tigrayans to connect safely during a crisis?" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-6">{project.problem}</p>
      {project.problemBullets && (
        <ul className="space-y-2 mb-6">
          {project.problemBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="font-bold text-foreground mb-3">Existing Solutions Fall Short</h3>
      <p className="mb-4">Mainstream dating apps don't offer specific filters for Tigrayan ethnicity or cultural preferences. Here's how each one falls short:</p>
      <ExistingSolutionsComparison />
      <ImageSlot slot="problem-context" label="Problem context visual" imageSrc={getSlotImage("problem-context")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* The Solution */}
    <CaseStudySection label="The Solution" title="Blending Tradition with Technology" icon={<Lightbulb className="h-4 w-4" />}>
      <p className="mb-6">Beles seamlessly blends traditional Tigrayan matchmaking customs with cutting-edge technology to provide a safe and genuine space for connection during a crisis.</p>

      {project.solutionFeatures && (
        <div className="space-y-16">
          <h3 className="text-xl font-bold text-foreground">Core Features</h3>
          {project.solutionFeatures.map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-foreground mb-2">{feat.title}</h3>
              <p className="mb-4">{feat.description}</p>
              <ImageSlot slot={feat.imageSlot} label={feat.title} imageSrc={getSlotImage(feat.imageSlot)} projectId={projectId} onUploaded={onUploaded} />
              {feat.details.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {feat.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
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
    <CaseStudySection label="Design Process" title="User-Centered Design Across Six Phases" icon={<Users className="h-4 w-4" />}>
      <p className="mb-6">I followed a user-centered design approach across six key phases:</p>

      {/* Phase 1 */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-foreground mb-3">Phase 1: Empathize & Define</h3>
        <p className="mb-3">I began by deeply understanding the unique challenges facing the Tigrayan diaspora. Through secondary research, I learned about:</p>
        <ul className="space-y-2">
          {[
            "The humanitarian crisis in Tigray and its impact on the global community",
            "Traditional Tigrayan courtship and matchmaking practices (Shmagele)",
            "The importance of cultural preservation in diaspora communities",
            "Existing gaps in dating apps for ethnicity-specific matching",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phase 2 */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-foreground mb-3">Phase 2: User Research & Interviews</h3>
        <p className="mb-3">During the ideation phase, I conducted in-depth user interviews to build personas and inform the design. Working with the team, I prepared an interview script with 18 open-ended questions focused on:</p>
        <ul className="space-y-2 mb-4">
          {[
            "User values, motivations, and daily routines",
            "Experiences with existing dating platforms",
            "Attitudes toward traditional vs. modern matchmaking",
            "Desires for community connection and event discovery",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <Target className="h-4 w-4 mt-1 text-accent shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Research Scope</p>
            <ul className="space-y-1 text-sm">
              <li>• 8 participants recruited and interviewed remotely over 4 days</li>
              <li>• Ages 19-55 representing diverse life stages and experiences</li>
              <li>• Mix of genders, occupations, and geographic locations across the Tigrayan diaspora</li>
            </ul>
          </CardContent>
        </Card>
        <ImageSlot slot="user-research" label="User research process" imageSrc={getSlotImage("user-research")} projectId={projectId} onUploaded={onUploaded} />
      </div>
    </CaseStudySection>

    {/* Personas */}
    <CaseStudySection label="Personas" title="Understanding Our Users" icon={<Users className="h-4 w-4" />}>
      <p className="mb-6">To better understand user goals, needs, experiences, and behaviors, I created four detailed personas. These were continuously updated throughout the project.</p>
      <div className="space-y-4 mb-6">
        {[
          {
            name: "Kibrom, 32",
            subtitle: "The Career-Focused Engineer",
            bg: "Systems engineer who has recently begun working in his new field. Now that he's established in his career, he's ready to date.",
            painPoint: "Mainstream dating apps don't allow him to specifically filter for other Tigrayans. He's committed to his heritage and wants a partner who understands his cultural values.",
            quote: "I want to date a Tigrayan. It's an act of resistance. Dating apps in the marketplace don't allow me to do that since the Genocide began.",
          },
          {
            name: "Semhal, 26",
            subtitle: "The Community-Seeking Student",
            bg: "Student at Texas Southern University who has been longing for ways to meet more Tigrayans in her area.",
            painPoint: "While she doesn't necessarily want to date right now, she loves the idea of Tigrayans making new connections during such a turbulent time.",
            quote: "I want to keep up-to-date on Tigrayan events in my area. It's difficult to find a dating app that caters to Tigrayans.",
          },
        ].map((persona, i) => (
          <Card key={i} className="border-border bg-muted/30 overflow-hidden">
            <CardContent className="p-6">
              <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-1">{persona.subtitle}</p>
              <h3 className="text-lg font-bold mb-3 text-foreground">{persona.name}</h3>
              <p className="mb-2"><strong className="text-foreground">Background:</strong> {persona.bg}</p>
              <p className="mb-3"><strong className="text-foreground">Pain Point:</strong> {persona.painPoint}</p>
              <blockquote className="border-l-2 border-accent pl-4 italic text-foreground">"{persona.quote}"</blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
      <ImageSlot slot="personas" label="User personas" imageSrc={getSlotImage("personas")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Wireframing & Iteration */}
    <CaseStudySection label="Wireframing" title="Wireframing & Iteration" icon={<Lightbulb className="h-4 w-4" />}>
      <p className="mb-6">To ensure the app would meet the needs of users like Kibrom and Semhal, I began by creating paper wireframes. I spent hours carefully crafting multiple versions, selecting the one that best balanced user needs with the app's overall aesthetic.</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { title: "Home Screen", desc: "Balanced between Shmagele matching and modern swipe features" },
          { title: "Navigation", desc: "Bottom nav bar with Home, Matches, Events, and Profile sections" },
          { title: "Event Discovery", desc: "Card-based layout showcasing Tigrayan festivals and community gatherings" },
          { title: "Profile Customization", desc: "Sections for preferences, photos, and cultural information" },
        ].map((item, i) => (
          <Card key={i} className="border-border bg-card/50">
            <CardContent className="p-5">
              <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ImageSlot slot="wireframes" label="Paper and digital wireframes" imageSrc={getSlotImage("wireframes")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Usability Testing */}
    <CaseStudySection label="Usability Testing" title="Testing & Iteration" icon={<BarChart3 className="h-4 w-4" />}>
      <p className="mb-6">I tested the low-fidelity prototype with 8 participants to understand their thoughts and feelings about the design.</p>

      <h3 className="font-bold text-foreground mb-3">Key Findings</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Lacked personal connection", value: "62.5%", desc: "did not feel personal connection with overall layout" },
          { label: "Shmagele confusion", value: "37.5%", desc: "were confused about Shmagele feature" },
          { label: "Women: Just Friends", value: "50%", desc: "of women would use app today with Just Friends option" },
          { label: "Men: Just Friends", value: "12.5%", desc: "of men would use app today with Just Friends option" },
        ].map((m, i) => (
          <Card key={i} className="border-accent/30 bg-accent/5">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-accent mb-1">{m.value}</p>
              <p className="font-semibold text-foreground text-sm mb-1">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="font-bold text-foreground mb-3">Critical Iterations Based on Findings</h3>
      <div className="space-y-3 mb-6">
        {[
          { title: "Tigrayan-centric design", desc: "Used colors from the Tigray flag and cultural illustrations to create a stronger emotional connection" },
          { title: "Shmagele explanation", desc: "Added onboarding screens and tooltips explaining traditional matchmaking" },
          { title: "Just Friends mode", desc: "Created a toggle allowing users to switch between dating and friendship-seeking modes" },
          { title: "Streamlined navigation", desc: "Decluttered the navigation bar based on user feedback" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
            <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
            <div>
              <p className="font-bold text-foreground">{item.title}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <ImageSlot slot="usability-testing" label="Usability testing results" imageSrc={getSlotImage("usability-testing")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Navigation Redesign Deep Dive */}
    <CaseStudySection label="Case Study" title="Navigation Redesign Deep Dive" icon={<Search className="h-4 w-4" />}>
      <Card className="border-border bg-muted/30 mb-6">
        <CardContent className="p-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Issue: Navigation Bar Layout</p>
          <p className="mb-3">While users could quickly find the Events location, the navigation bar was cluttered and overwhelming. This issue appeared in all 8 usability tests.</p>
          <ul className="space-y-1 text-sm">
            <li>• The navigation bar felt cramped with too many icons</li>
            <li>• Users wanted a decluttered navigation experience</li>
            <li>• Removing unnecessary icons would increase whitespace and improve usability</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-accent/30 bg-accent/5 mb-6">
        <CardContent className="p-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Solution: Streamlined Navigation</p>
          <ul className="space-y-2 text-sm">
            {[
              "Observations from usability testing: Identified which icons were actually being used vs. ignored",
              "A/B testing: Tested different configurations with 5 users to determine optimal layout",
              "Multiple design iterations: Created 3 variations and gathered user feedback on each",
              "Additional validation testing: Confirmed the streamlined navigation improved user satisfaction",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-medium text-accent text-sm">Result: Users swiftly located events, simplifying navigation. User satisfaction improved significantly.</p>
        </CardContent>
      </Card>
      <ImageSlot slot="nav-redesign" label="Navigation before & after comparison" imageSrc={getSlotImage("nav-redesign")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Visual Design */}
    <CaseStudySection label="Visual Design" title="Design Principles" icon={<Palette className="h-4 w-4" />}>
      <p className="mb-6">Simplicity was key in my final design. I utilized Figma to create a visually stunning and user-friendly experience that honored Tigrayan culture while feeling modern and accessible.</p>
      {project.designPrinciples && (
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
      )}
      <ImageSlot slot="visual-design" label="Final visual design screens" imageSrc={getSlotImage("visual-design")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Key Features in Detail */}
    <CaseStudySection label="Features" title="Key Features in Detail" icon={<Rocket className="h-4 w-4" />}>
      <div className="space-y-8">
        {/* Shmagele */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">1. Shmagele Matching</h3>
          <p className="mb-3">The crown jewel of Beles is the Shmagele feature—a digital adaptation of traditional Tigrayan matchmaking. In traditional practice, respected community elders or family members facilitate introductions between compatible individuals.</p>
          <Card className="border-accent/30 bg-accent/5 mb-4">
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">How it works in the app</p>
              <ul className="space-y-1 text-sm">
                <li>• Users can invite trusted community members to their network</li>
                <li>• These matchmakers can suggest potential matches based on compatibility</li>
                <li>• The app calculates a Shmagele Score based on shared values, goals, and preferences</li>
                <li>• Users receive curated matches with explanations of compatibility</li>
              </ul>
            </CardContent>
          </Card>
          <ImageSlot slot="feature-shmagele" label="Shmagele matching screens" imageSrc={getSlotImage("feature-shmagele")} projectId={projectId} onUploaded={onUploaded} />
        </div>

        {/* Events */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">2. Event Discovery</h3>
          <p className="mb-3">Users can discover Tigrayan cultural events, festivals, and community gatherings happening in their area.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              "Tigray Festival: Annual celebrations showcasing Tigrayan culture and traditions",
              "Mekete Fundraising: Community fundraisers supporting people in Tigray",
              "Cultural Workshops: Learn traditional dances, cuisine, and customs",
              "Support Groups: Connect with others processing the ongoing crisis",
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card/50">
                <CardContent className="p-4">
                  <p className="text-sm">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ImageSlot slot="feature-events" label="Event discovery screens" imageSrc={getSlotImage("feature-events")} projectId={projectId} onUploaded={onUploaded} />
        </div>

        {/* Match Notifications */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">3. Match Notifications & Celebrations</h3>
          <p className="mb-3">When users match, they receive celebratory notifications. The app also celebrates community engagement with achievement notifications.</p>
          <div className="space-y-3">
            {[
              "It's a match, Berhane! The feelings mutual! Start a conversation with each other.",
              "Congrats! 2 users you recommended have matched each other!",
              "Your Shmagele Score: You've ranked as the number 7 Top Ranked Shmagele",
              "Thank you for helping our community create more connections!",
            ].map((msg, i) => (
              <Card key={i} className="border-border bg-muted/30">
                <CardContent className="p-4">
                  <p className="text-sm italic text-foreground">"{msg}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <ImageSlot slot="feature-notifications" label="Match notification screens" imageSrc={getSlotImage("feature-notifications")} projectId={projectId} onUploaded={onUploaded} />
          </div>
        </div>
      </div>
    </CaseStudySection>

    {/* Impact & Outcomes */}
    {project.validationMetrics && (
      <CaseStudySection label="Impact" title="Impact & Outcomes" icon={<BarChart3 className="h-4 w-4" />}>
        <p className="mb-6">Beles successfully combines traditional dating methods with modern technology to create a genuine and safe user experience.</p>
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

    {/* Next Steps */}
    <CaseStudySection label="Next Steps" title="Taking Beles to the Next Level" icon={<Rocket className="h-4 w-4" />}>
      <p className="mb-6">Let's take this Shmagele app to the next level! The vision is to:</p>
      <ul className="space-y-3">
        {[
          "Gather continuous user feedback through beta testing with the Tigrayan community",
          "Make data-driven decisions by tracking key metrics like match rates, event attendance, and user engagement",
          "Add more cultural spice—considering features like Tigrinya language support, cultural compatibility quizzes, and virtual event hosting",
          "Involve the engineering team early to ensure technical feasibility and smooth implementation",
          "Develop a strategic launch plan that leverages community leaders and cultural organizations",
          "Never stop iterating for a seamless user experience that truly serves the community",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CaseStudySection>

    {/* Conclusion */}
    <CaseStudySection label="Conclusion" title="More Than Just a Dating App" icon={<Heart className="h-4 w-4" />}>
      <p className="mb-4">Beles represents more than just a dating app—it's a lifeline for a diaspora community seeking connection during one of the darkest periods in Tigrayan history. By honoring traditional matchmaking practices while embracing modern technology, Beles creates a space where culture is preserved, relationships are formed, and community is strengthened.</p>
      <p className="mb-6">This project challenged me to think beyond conventional design patterns and consider the unique needs of a specific cultural community. It taught me that great design requires empathy, cultural humility, and a willingness to learn from users at every step of the process.</p>
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-5 text-center">
          <p className="text-foreground font-medium italic">Join the Beles revolution and see for yourself the power of connection, cultural preservation, and community growth through thoughtful design.</p>
        </CardContent>
      </Card>

      {/* Appendix Images */}
      {project.appendixImages && project.appendixImages.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold text-foreground mb-4">Additional Screens</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.appendixImages.map((img, i) => (
              <div key={i}>
                <ImageSlot slot={img.slot} label={img.caption} imageSrc={getSlotImage(img.slot)} projectId={projectId} onUploaded={onUploaded} />
                <p className="text-xs text-muted-foreground mt-1 text-center">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </CaseStudySection>
  </>
);

export default BelesCaseStudy;
