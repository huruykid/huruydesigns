export interface Finding {
  title: string;
  quote: string;
  insight?: string;
}

export interface ResearchToDesign {
  need: string;
  solution: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
  details: string[];
  whyItMatters: string;
  imageSlot: string;
}

export interface ValidationMetric {
  label: string;
  value: string;
  description: string;
}

export interface PhasedRoadmapItem {
  phase: string;
  title: string;
  description: string;
}

export interface CompetitorAnalysis {
  name: string;
  description: string;
}

export interface DesignPrinciple {
  title: string;
  description: string;
}

export interface SectionImages {
  [key: string]: string | undefined;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  tags: string[];
  role: string;
  timeline: string;
  tools: string[];
  problem: string;
  process: string;
  solution: string;
  outcomeMetrics: string;
  image: string;
  // Rich case study fields (optional)
  challenge?: string;
  insight?: string;
  problemBullets?: string[];
  problemImpact?: string;
  researchHighlights?: string[];
  goals?: string[];
  competitiveResearch?: string;
  competitors?: CompetitorAnalysis[];
  competitiveKeyTakeaways?: string[];
  interviews?: string;
  interviewGoals?: string[];
  findings?: Finding[];
  researchToDesign?: ResearchToDesign[];
  solutionFeatures?: SolutionFeature[];
  designPrinciples?: DesignPrinciple[];
  userFlow?: string[];
  validationMetrics?: ValidationMetric[];
  learnings?: string[];
  whatIdDoDifferently?: string[];
  businessModel?: string;
  businessModelDetails?: { label: string; description: string }[];
  phasedRoadmap?: PhasedRoadmapItem[];
  closingStatement?: string;
  closingStats?: { label: string; value: string }[];
  appendixImages?: { slot: string; caption: string }[];
  nextSteps?: string[];
  sectionImages?: SectionImages;
}

export const projects: Project[] = [
  {
    id: "ebtfinder",
    title: "EBT Finder",
    description: "A review-first platform that helps SNAP/EBT users discover nearby businesses with confidence and dignity.",
    impact: "Redesigned for 12M+ SNAP users",
    tags: ["UX Research", "Figma", "Prototyping", "Competitive Analysis"],
    role: "Product Designer (Solo Project)",
    timeline: "4 weeks",
    tools: ["Figma", "User Interviews", "Competitive Analysis", "Prototyping"],
    challenge: "12 million Americans use SNAP/EBT benefits, but the government's official store locator is outdated, overwhelming, and fails to build trust. People deserve to shop with confidence—not confusion.",
    problem: "Low-income families using EBT are underserved by digital tools. The USDA's SNAP Retailer Locator is failing them.",
    problemBullets: [
      "Is overwhelming and outdated",
      "Lacks visuals, reviews, or trust signals",
      "Isn't mobile-first",
      "Can't filter by user needs (hot food, delivery, open now)",
    ],
    problemImpact: "Users avoid using the tool entirely. Over 40% of Fresno's EBT-eligible businesses had no reviews or public presence, making it impossible for users to know if a store truly welcomes them.",
    insight: "People want to shop with confidence and dignity. And businesses want to serve—they just don't always know how.\n\nFor users: Make the SNAP map feel like Yelp.\nFor businesses: Show them how to accept EBT + provide digital tools.",
    competitors: [
      { name: "USDA SNAP Retailer Locator", description: "Official government tool with no filters, mobile usability, or user-friendly design. Essentially a CSV on a map." },
      { name: "Yelp / Google Maps", description: "Powerful discovery tools but with no EBT filtering and inconsistent tagging." },
      { name: "Fresh EBT (now Propel)", description: "Focused on benefits tracking, not store discovery. Had some store data but no robust search or reviews." },
    ],
    competitiveKeyTakeaways: [
      "No single platform combined SNAP eligibility with real-time visuals and user reviews",
      "None allowed filtering by \"Hot Foods,\" \"Grocery Only,\" or \"Open Now\"",
      "Major gap in trust-building features like ratings, photos, and reviews",
    ],
    interviews: "To ground the experience in real needs, I interviewed 7 EBT users over 4 days—including single parents, seniors, and working adults.",
    interviewGoals: [
      "Understand how EBT users currently find stores",
      "Identify pain points and frustrations",
      "Learn what builds trust in a new tool",
    ],
    findings: [
      { title: "Lack of Trust in Store Listings", quote: "Just because a store says they take EBT doesn't mean they actually do when you get there.", insight: "Users need social proof—reviews, photos, and community validation—before trying a new store." },
      { title: "Confusion Around Hot Foods", quote: "I've had EBT for years and still don't know where I can use it for hot food.", insight: "Hot food eligibility varies by state and is poorly communicated. Even long-time users don't understand the rules." },
      { title: "Stigma + Shame Still Exist", quote: "I don't want to be judged when I swipe my card. Knowing a place welcomes EBT helps.", insight: "Knowing a business explicitly welcomes EBT users reduces anxiety and shame. Dignity matters." },
    ],
    researchToDesign: [
      { need: "\"I need to know if this store actually takes EBT\"", solution: "Reviews + Ratings: User-generated reviews specifically about EBT acceptance" },
      { need: "\"I don't know where I can buy hot food\"", solution: "Hot Food Filter: Clear category filtering + educational tooltips per state" },
      { need: "\"I don't want to be embarrassed\"", solution: "Visual Trust Signals: Real photos, high ratings, and \"EBT-Friendly\" badges" },
      { need: "\"The USDA site is too cluttered\"", solution: "Clean, Mobile-First UI: Simple search, clear filters, map view" },
      { need: "\"I need to see what the store looks like\"", solution: "Google Places API Integration: Pull in real business photos automatically" },
    ],
    goals: [
      "Rebuild the SNAP locator for actual usability",
      "Let users rate and review stores/restaurants",
      "Pull in visuals via Google Places API",
      "Educate merchants & offer services to help them modernize",
    ],
    solutionFeatures: [
      {
        title: "Mobile-First Search & Filters",
        description: "Users can search by location and filter by category.",
        details: ["Hot Food / Fast Food", "Grocery Stores", "Bakery", "Farmers Markets", "Delivery options", "\"Open Now\""],
        whyItMatters: "Filtering = dignity. Users aren't looking for \"any\" EBT store—they want the right fit for their needs.",
        imageSlot: "feature-search",
      },
      {
        title: "Visual Business Profiles with Reviews",
        description: "Each listing includes real photos, reviews, and clear EBT acceptance info.",
        details: ["Real photos from Google Places API", "User reviews and ratings", "Address and hours", "Clear \"ACCEPTS SNAP FOOD AND SNAP HOT FOOD\" callouts", "EBT-friendliness score"],
        whyItMatters: "Trust matters more than features. Visual confirmation and peer reviews give users confidence before visiting.",
        imageSlot: "feature-profiles",
      },
      {
        title: "Map View with EBT-Only Results",
        description: "Unlike Google Maps or Yelp, EBT Finder only shows verified SNAP-accepting locations. No noise, no confusion.",
        details: [],
        whyItMatters: "Government tools ignore real workflows. Users need focused, relevant results—not a cluttered database.",
        imageSlot: "feature-map",
      },
      {
        title: "Community-Driven Trust",
        description: "Users can contribute to the platform and help others.",
        details: ["Share short reviews", "Rate EBT-friendliness", "Upload photos", "See recently viewed stores"],
        whyItMatters: "Peer-to-peer trust is more powerful than any official label. Real people vouching for real experiences.",
        imageSlot: "feature-community",
      },
    ],
    designPrinciples: [
      { title: "Clean & Approachable", description: "Soft green and teal color palette signals freshness and trust (not government bureaucracy)" },
      { title: "Photography-First", description: "Large hero images make businesses feel welcoming" },
      { title: "Clear Hierarchy", description: "Important info (EBT acceptance, ratings) is always above the fold" },
      { title: "Accessible", description: "High contrast, readable fonts, clear CTAs" },
    ],
    userFlow: [
      "User enters location or uses GPS",
      "Filters by need (Hot Food, Open Now, etc.)",
      "Reviews business profiles with photos and ratings",
      "Gets directions or saves to wishlist",
      "(Post-visit) Leaves a review to help others",
    ],
    validationMetrics: [
      { label: "Task Success Rate", value: "9/10", description: "users successfully found a hot food location within 15 seconds (vs. 3+ minutes on USDA site)" },
      { label: "User Satisfaction", value: "100%", description: "of testers said they'd use this over the USDA tool" },
      { label: "Trust Increase", value: "8/10", description: "users felt more confident shopping at stores with reviews and photos" },
      { label: "Time Saved", value: "65%", description: "faster average task completion than government site" },
    ],
    learnings: [
      "Trust is UX — Users don't care about feature count—they care about confidence. Visuals, reviews, and community feedback drive trust more than any official dataset.",
      "Government tools ignore real workflows — The USDA SNAP locator serves as a database, not a usable product. It fails on mobile, lacks accessibility, and assumes users will do all the work.",
      "Filtering = Dignity — People aren't just looking for \"any\" EBT store—they want the right fit: hot meals, open hours, safety, distance, and welcoming staff.",
      "Designing for underserved users requires humility — You can't assume you know what matters most until you talk to people living through the experience.",
    ],
    whatIdDoDifferently: [
      "Expand merchant research — I focused heavily on user needs but should have interviewed more small business owners to understand barriers to EBT adoption. This would strengthen the business model.",
      "Test with broader demographics — My 7 interviewees were valuable, but I'd include more rural users, non-English speakers, and users with disabilities to ensure accessibility.",
      "Build in educational content earlier — Hot food eligibility is confusing. I should have designed state-specific tooltips and FAQ content into the MVP, not as a \"next step.\"",
    ],
    businessModel: "EBT Finder uses a sustainable model that keeps the user experience free while generating revenue from merchant services.",
    businessModelDetails: [
      { label: "For Users", description: "Free, ad-free experience" },
      { label: "Freemium Listings", description: "Basic listing is free; premium tier offers enhanced profiles, analytics, and customer insights" },
      { label: "Lead Generation", description: "Help businesses apply for EBT acceptance (revenue share with payment processors)" },
      { label: "Scalability", description: "Partner with local governments and nonprofits to drive adoption and verify listings" },
    ],
    phasedRoadmap: [
      { phase: "Phase 1", title: "Launch MVP in Fresno, CA", description: "Test in a mid-sized market with high SNAP usage and refine based on real user behavior." },
      { phase: "Phase 2", title: "Expand Social Proof Features", description: "Add photo uploads, video reviews, and \"top-rated\" badges to increase community engagement." },
      { phase: "Phase 3", title: "Merchant Dashboard", description: "Create self-service tools for businesses to manage their listings, respond to reviews, and track performance." },
      { phase: "Phase 4", title: "Scale Nationally", description: "Partner with state SNAP agencies to become the de facto store locator nationwide." },
    ],
    closingStatement: "EBT Finder isn't just a better map—it's a tool for dignity. By combining modern UX design with user research and community trust-building, we can transform how millions of Americans access their benefits.",
    closingStats: [
      { label: "The opportunity", value: "12 million SNAP users deserve better tools" },
      { label: "The solution", value: "A Yelp-like experience built for their needs" },
      { label: "The impact", value: "Confidence, convenience, and reduced stigma" },
    ],
    appendixImages: [
      { slot: "appendix-1", caption: "Homepage with category filters" },
      { slot: "appendix-2", caption: "Map view with markers" },
      { slot: "appendix-3", caption: "Business detail page (Whole Foods example)" },
      { slot: "appendix-4", caption: "User profile and saved locations" },
      { slot: "appendix-5", caption: "Search results with visual cards" },
      { slot: "appendix-6", caption: "Filter drawer open" },
    ],
    sectionImages: {
      "usda-screenshot": "/images/ebtfinder/usda-screenshot.png",
      "ebt-sign": "/images/ebtfinder/ebt-sign.png",
      "wireframes": "/images/ebtfinder/wireframes.png",
      "feature-search": "/images/ebtfinder/feature-search.png",
    },
    // Legacy fields kept for compatibility
    researchHighlights: [
      "Audited existing USDA SNAP site",
      "Interviewed 7 EBT users about how they decide where to go",
      "Surveyed 3 small restaurant owners — none knew they were eligible to accept hot food",
      "Found >40% of Fresno EBT-eligible spots had no reviews or public presence",
    ],
    nextSteps: [],
    competitiveResearch: "",
    solution: "A clean, map-based mobile interface with real-time store locator, user reviews and ratings, real business photos via Google Places API, and filters for store type, hot food eligibility, and open hours.",
    process: "Conducted user interviews with 7 EBT users, created journey maps and personas, ran competitive analysis across USDA, Yelp, and Fresh EBT, designed wireframes, and performed usability testing across 3 iterations.",
    outcomeMetrics: "Task completion rate improved from 45% to 89%. Average time-to-find reduced by 62%. Received positive feedback from 92% of usability test participants.",
    image: "/images/ebtfinder/hero-mockup.png",
  },
  {
    id: "ai-fent-finder",
    title: "Fent Finder",
    description: "Designing a UX-First Pill Detection App for Harm Reduction",
    impact: "Because when a single tap can save a life, design isn't just a feature—it's a responsibility.",
    tags: ["AI/ML", "UX Design", "Harm Reduction", "Health Tech"],
    role: "UX Designer & Product Lead",
    timeline: "3 months",
    tools: ["Figma", "UserTesting", "Google Vision API"],
    challenge: "Fent Finder is a mobile app concept designed to combat the alarming issue of counterfeit and fentanyl-laced pills. Powered by AI and centered on harm reduction principles, the app uses a clean, accessible interface to guide users through a quick, life-saving process of pill identification and safety verification.",
    problem: "In recent years, counterfeit pills have surged across the U.S., often containing lethal amounts of fentanyl. People think they're taking a Xanax, Percocet, or Adderall—but end up ingesting something far more dangerous.",
    problemBullets: [
      "Too clinical or complex (e.g., Drugs.com's identifier requires detailed technical knowledge)",
      "Require advanced knowledge (e.g., lab testing, mass spectrometry)",
      "Not built with the user in mind—especially those in crisis moments",
    ],
    problemImpact: "There's a massive gap between the tools that exist and what real users need: a fast, judgment-free, visual-first experience.",
    goals: [
      "Fast: 30-second identification flow",
      "Visual: Pill photos, real-time comparison, and AI feedback",
      "Low cognitive load: Minimal text, bold affordances, intuitive navigation",
      "Harm-reduction forward: No judgment, just support",
    ],
    solutionFeatures: [
      {
        title: "Scan a Pill",
        description: "Use your phone camera to scan a pill next to a reference object (like a dime) for scale.",
        details: [],
        whyItMatters: "Speed and simplicity are critical in high-stress moments. A quick scan removes barriers to identification.",
        imageSlot: "feature-scan",
      },
      {
        title: "Compare by Photo",
        description: "Upload a photo and visually compare to known pills in the database.",
        details: [],
        whyItMatters: "Visual comparison builds confidence and helps users make informed decisions about their safety.",
        imageSlot: "feature-compare",
      },
      {
        title: "Search by Name",
        description: "For users who know what the pill is supposed to be.",
        details: [],
        whyItMatters: "Provides a fallback for users who have some knowledge about the substance they're examining.",
        imageSlot: "feature-search",
      },
      {
        title: "Harm Reduction Resources",
        description: "Narcan finder, hotline access, first-aid info, and educational content.",
        details: [],
        whyItMatters: "Resources save lives. Making them easily accessible in the same app reduces friction when every second counts.",
        imageSlot: "feature-resources",
      },
    ],
    designPrinciples: [
      { title: "Calming Color Scheme", description: "Muted reds and blacks to reduce anxiety while using the app" },
      { title: "Interactive Pill ID", description: "Users can scan pills with size reference for accurate matching" },
      { title: "Safety Alerts", description: "Clear visual warnings for dangerous substances" },
      { title: "Educational Resources", description: "Designed to enhance user understanding and encourage safe practices" },
    ],
    validationMetrics: [
      { label: "Task Completion Rate", value: "93%", description: "of participants completed pill identification successfully" },
      { label: "Avg. Time to Identify", value: "28s", description: "average time to identify a pill" },
      { label: "Simple & Not Overwhelming", value: "87%", description: "of users found the interface simple and not overwhelming" },
      { label: "Crisis Confidence", value: "4.6/5", description: "confidence in using app during crisis" },
    ],
    learnings: [
      "The best UX isn't flashy—it's invisible. Users should feel confident and in control without noticing the design. Every interaction was stripped to its essence.",
      "Designing for crisis moments requires radical clarity. High-stress situations demand zero ambiguity. I learned to test not just for usability, but for usability under stress.",
      "Empathy over elegance. Working on Fent Finder reminded me that good design can save lives. It pushed me to focus on empathy, not elegance.",
      "Accessibility is non-negotiable. From color contrast to font sizing, every element was tested for WCAG AA compliance. Harm reduction tools must be accessible to everyone.",
    ],
    closingStatement: "Fent Finder represents what I believe UX design should be at its core: human-centered, purpose-driven, and potentially life-saving. This project challenged me to think beyond conventional design metrics and consider the real-world impact of every pixel, every word, and every interaction.",
    closingStats: [
      { label: "The crisis", value: "76% of drug deaths in ages 14-23 involved fentanyl" },
      { label: "The solution", value: "A fast, judgment-free, visual-first experience" },
      { label: "The impact", value: "93% task completion in under 30 seconds" },
    ],
    appendixImages: [
      { slot: "appendix-1", caption: "Home screen with primary actions" },
      { slot: "appendix-2", caption: "Scan flow with reference object" },
      { slot: "appendix-3", caption: "Results screen — Safe vs. Dangerous" },
      { slot: "appendix-4", caption: "Harm reduction resources page" },
    ],
    // Legacy fields
    process: "Conducted 12 user interviews, created user journey maps, designed wireframes across 3 iterations, and performed usability testing with 15 participants.",
    solution: "An AI-powered mobile app that guides users through pill identification via scanning, photo comparison, and name search, with integrated harm reduction resources.",
    outcomeMetrics: "93% task completion rate. 28-second average identification time. 87% found interface simple. 4.6/5 crisis confidence score.",
    image: "/placeholder.svg",
  },
  {
    id: "beles",
    title: "Beles",
    description: "Designing a safe, authentic dating app for the Tigrayan community.",
    impact: "Bridging Tradition and Technology",
    tags: ["UX Design", "User Research", "Dating App", "Cultural Design"],
    role: "UX Designer",
    timeline: "8+ weeks",
    tools: ["Figma", "Miro", "Axure"],
    challenge: "Designing Beles was a game-changer for my career—this project took me out of my comfort zone and propelled me to new heights as a designer.",
    problem: "Amidst the devastating humanitarian crisis faced by Tigray beginning in November 2020, Tigrayans globally found themselves without a dedicated haven to connect and support each other. The diaspora community, scattered across continents, needed a way to maintain cultural identity, find romantic partners who understand their cultural values, discover community events, and build support networks during an incredibly turbulent and traumatic time.",
    problemBullets: [
      "Maintain cultural identity while navigating life in foreign countries",
      "Find romantic partners who understand their cultural values and traditions",
      "Discover community events and stay connected with other Tigrayans in their area",
      "Build support networks during an incredibly turbulent and traumatic time",
    ],
    problemImpact: "Mainstream dating apps like Tinder, Bumble, and Hinge don't offer specific filters for Tigrayan ethnicity or cultural preferences, leaving a diaspora community without a dedicated platform for connection.",
    solutionFeatures: [
      {
        title: "Shmagele Matching",
        description: "A unique feature based on traditional Tigrayan matchmaking, where community elders or family members help facilitate connections.",
        details: ["Users can invite trusted community members", "Matchmakers suggest potential matches", "Shmagele Score based on shared values", "Curated matches with compatibility explanations"],
        whyItMatters: "Honors traditional Tigrayan matchmaking practices while bringing them into a digital context, creating deeper, more meaningful connections.",
        imageSlot: "feature-shmagele-overview",
      },
      {
        title: "Event Discovery",
        description: "Find and attend Tigrayan cultural events, festivals, and community gatherings in your area.",
        details: [],
        whyItMatters: "Strengthens community bonds by connecting diaspora members with local cultural events and support networks.",
        imageSlot: "feature-events-overview",
      },
      {
        title: "Just Friends Option",
        description: "Not everyone is looking to date—this mode allows users to build platonic connections within the community.",
        details: [],
        whyItMatters: "Addresses the needs of users like Semhal who want community connection without the pressure of dating.",
        imageSlot: "feature-friends",
      },
      {
        title: "Match Notifications & Celebrations",
        description: "When users match, they receive celebratory notifications. The app also celebrates community engagement with achievement notifications.",
        details: ["Celebratory match banners with personalised messages", "Shmagele Score ranking updates", "Community milestone celebrations", "Achievement notifications for helping others connect"],
        whyItMatters: "Positive reinforcement encourages continued community participation, making the experience feel rewarding and celebratory rather than transactional.",
        imageSlot: "feature-notifications",
      },
    ],
    designPrinciples: [
      { title: "Color Palette", description: "Carefully crafted to transmit trust and reliability, drawing direct inspiration from the Tigray flag (red, yellow, and dark backgrounds)" },
      { title: "Cultural Illustrations", description: "Custom illustrations to add freshness and diversity, celebrating Tigrayan heritage" },
      { title: "Typography", description: "Clean, modern fonts that balance readability with personality" },
      { title: "Photography Style", description: "Authentic photos of Tigrayan people and cultural events to create emotional resonance" },
      { title: "Accessibility", description: "Design optimized for all platforms and devices with WCAG AA compliance" },
    ],
    validationMetrics: [
      { label: "Event Location Success", value: "100%", description: "of users swiftly located events after navigation redesign" },
      { label: "Shmagele Understanding", value: "87.5%", description: "of users understood Shmagele feature after redesign" },
      { label: "Launch Interest", value: "75%+", description: "of users expressing interest in using app at launch" },
      { label: "Design Feedback", value: "Wide acceptance", description: "Positive feedback on overall design and features" },
    ],
    learnings: [
      "Building a community-focused UI requires deep cultural understanding. You can't design for a cultural community without immersing yourself in their values, traditions, and pain points.",
      "Experimentation with matchmaking features teaches iterative design. Complex features need scaffolding—tooltips, explainer screens, and gradual introduction—to help users understand their value.",
      "User feedback is gold—listen, iterate, validate. Every round of usability testing revealed insights I never would have discovered on my own.",
      "Design can be an act of resistance and healing. Creating a platform that helps a diaspora community stay connected during a humanitarian crisis showed me the real-world impact design can have.",
    ],
    closingStatement: "Beles represents more than just a dating app—it's a lifeline for a diaspora community seeking connection during one of the darkest periods in Tigrayan history.",
    appendixImages: [
      { slot: "appendix-1", caption: "Onboarding flow" },
      { slot: "appendix-2", caption: "Profile creation screens" },
      { slot: "appendix-3", caption: "Shmagele matching flow" },
      { slot: "appendix-4", caption: "Event discovery screens" },
    ],
    // Legacy fields
    process: "Followed a user-centered design approach across six phases: empathize, research, personas, wireframing, usability testing, and visual design.",
    solution: "A dating and social media app blending traditional Tigrayan matchmaking (Shmagele) with modern dating app technology, featuring event discovery, Just Friends mode, and community features.",
    outcomeMetrics: "100% event location success rate. 87.5% Shmagele feature understanding. 75%+ launch interest. Wide acceptance of design.",
    image: "/images/beles/hero-mockup.png",
  },
  {
    id: "oneasure-portal",
    title: "OneAsure Portal",
    description: "Streamlining insurance management for small businesses and HR teams.",
    impact: "Simplified insurance for 500+ businesses",
    tags: ["Enterprise UX", "Dashboard", "Figma", "B2B"],
    role: "UX Designer",
    timeline: "May – Aug 2023",
    tools: ["Figma", "Jira", "Confluence"],
    problem: "Small business HR teams were overwhelmed by complex insurance portals, leading to enrollment errors and employee confusion about their benefits.",
    process: "Shadowed HR administrators, mapped existing workflows, identified 12 pain points, created information architecture, and designed a simplified dashboard.",
    solution: "A streamlined portal with guided enrollment flows, at-a-glance benefits summaries, and automated reminders for deadlines.",
    outcomeMetrics: "Enrollment errors reduced by 40%. Admin time spent on insurance tasks decreased by 3 hours/week. NPS score improved from 32 to 71.",
    image: "/placeholder.svg",
  },
  {
    id: "love-and-friendship",
    title: "Love & Friendship",
    description: "A social platform redesign focused on meaningful connections over metrics.",
    impact: "Rethinking social media UX",
    tags: ["Social Platform", "UX Research", "Visual Design", "Mobile"],
    role: "UX Designer",
    timeline: "Feb – May 2023",
    tools: ["Figma", "Principle", "Maze"],
    problem: "Users reported feeling anxious and performative on existing social platforms. Metrics like likes and follower counts were driving unhealthy behaviors.",
    process: "Surveyed 200+ users about social media habits, ran card sorting exercises, designed low-fi prototypes, and conducted A/B testing on key features.",
    solution: "A social platform that emphasizes private sharing, removes public metrics, and uses AI to surface meaningful content from close connections.",
    outcomeMetrics: "In testing, users reported 35% less anxiety. Average session quality score increased by 48%. 78% preferred the redesigned feed over traditional feeds.",
    image: "/placeholder.svg",
  },
];
