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
  seoDescription?: string;
  keyResults?: { value: string; label: string }[];
  appStoreUrl?: string;
}

export const projects: Project[] = [
  {
    id: "asure-compliance",
    title: "Asure Compliance Engine",
    seoDescription: "Onsite redesign of Asure's enterprise payroll compliance engine for 9,000+ tax agencies across the US and Canada.",
    description: "I was brought onsite to redesign screens. We discovered the real problem was that no one (not engineering, not product, not the SME team) had ever fully mapped how the system worked. So we got together and built that map first.",
    impact: "Re-Architecting Enterprise Payroll Compliance",
    tags: ["Enterprise SaaS", "Payroll Compliance", "Multi-Jurisdiction", "State-Driven System", "9,000+ Agencies"],
    role: "Lead Product Designer · Solo embedded engagement · Discovery through delivery",
    timeline: "Onsite engagement, Dallas TX",
    tools: ["Figma", "Whiteboarding", "Miro", "Jira"],
    challenge: "Asure's compliance engine supported 9,000+ tax agencies across the US and Canada. When I joined the project onsite in Dallas, the codebase had a complete entity model. The product did not.",
    problem: "Nobody (not engineering, not the SME team, not product) had a complete map of how the entities related to each other. Everyone held a partial model. The dependency chain connecting a tax code to a formula to a filing frequency to a payee to an agency had never been drawn end-to-end.",
    solution: "I helped build the translation layer: from regulatory logic to human configuration. That meant mapping entity relationships, resolving ambiguity between engineering and compliance teams, and designing a state machine that both groups could trust.",
    process: "Spent multiple days onsite in Dallas collaborating with engineering, PM, and SMEs. Facilitated whiteboarding sessions, redefined configuration flows, designed revision lifecycle behavior, and created wireframes and interactive prototypes.",
    keyResults: [
      { value: "9,000+", label: "tax agencies supported" },
      { value: "2", label: "countries unified (US + Canada)" },
      { value: "5", label: "entity layers mapped end-to-end" },
    ],
    outcomeMetrics: "Prevented silent state changes · Clarified entity relationships · Reduced configuration ambiguity · Improved audit transparency · Aligned UX with backend state model · Structured scalable architecture for 9,000+ agencies",
    image: "/placeholder.svg",
    learnings: [
      "The most impactful design work often isn't a deliverable. It's forcing a conversation that hasn't happened yet. Mapping the entity dependency chain on a whiteboard created more alignment than any prototype.",
      "For compliance products, UI state should map 1:1 to backend state. No abstract statuses, no optimistic UI that hides what's actually happening. That's not a UX preference. It's a correctness requirement.",
    ],
  },
  {
    id: "oneasure-portal",
    title: "OneAsure Portal",
    description: "Unifying enterprise HR management into a single, seamless experience.",
    impact: "Unified HR management for enterprise teams",
    tags: ["Enterprise UX", "HCM", "Figma", "B2B"],
    role: "UX Designer, UX Researcher, Stakeholder Presenter",
    timeline: "6+ months",
    tools: ["Figma", "Ionic", "Jira"],
    challenge: "HR professionals at mid-to-large enterprises were navigating a fractured ecosystem: separate portals for time & attendance, benefits, and payroll, each with its own login, its own logic, and its own quirks.",
    problem: "HR professionals at mid-to-large enterprises were navigating a fractured ecosystem: separate portals for time & attendance, benefits, and payroll, each with its own login, its own logic, and its own quirks. The result wasn't just frustrating. It was expensive.",
    solution: "The final OneAsure portal consolidated Time & Attendance, Benefits, Payroll, and related HR functions into a single, unified experience, with one login, consistent UI patterns, and workflows that reflected how people actually worked.",
    process: "Conducted software audits, gap analysis, competitive research across 12 HCM platforms, 16 remote user interviews, and 24 usability tests across 8 iterative design rounds over 6+ months.",
    keyResults: [
      { value: "~40%", label: "fewer admin errors reported" },
      { value: "+25%", label: "enterprise prospect engagement" },
      { value: "~50%", label: "faster user onboarding" },
    ],
    outcomeMetrics: "12 competitive audits · 16 user interviews · 24 usability tests · 8 design iterations over 6+ months",
    learnings: [
      "Stakeholder alignment is a design skill, not something that happens after the design work. Translating UX decisions into business language, anticipating objections before they derailed progress, and building shared ownership of the design direction were as important as anything made in Figma.",
      "Sequencing matters. On a project this complex, the order in which you tackle problems is critical. Fixing visual design before addressing structural issues would have been the wrong call. Starting with research before wireframes kept the team from solving the wrong problem.",
    ],
    image: "/placeholder.svg",
  },
  {
    id: "ebtfinder",
    title: "EBT Finder",
    description: "A review-first platform that helps SNAP/EBT users discover nearby businesses with confidence and dignity.",
    impact: "Redesigned for 12M+ SNAP users",
    appStoreUrl: "https://apps.apple.com/app/ebt-finder/id6751323829",
    tags: ["UX Research", "Figma", "Prototyping", "Competitive Analysis"],
    role: "Product Designer (Solo Project)",
    timeline: "4 weeks",
    tools: ["Figma", "User Interviews", "Competitive Analysis", "Prototyping"],
    challenge: "12 million Americans use SNAP/EBT benefits, but the government's official store locator is outdated, overwhelming, and fails to build trust. People deserve to shop with confidence, not confusion.",
    problem: "Low-income families using EBT are underserved by digital tools. The USDA's SNAP Retailer Locator is failing them.",
    problemBullets: [
      "Is overwhelming and outdated",
      "Lacks visuals, reviews, or trust signals",
      "Isn't mobile-first",
      "Can't filter by user needs (hot food, delivery, open now)",
    ],
    problemImpact: "Users avoid using the tool entirely. Over 40% of Fresno's EBT-eligible businesses had no reviews or public presence, making it impossible for users to know if a store truly welcomes them.",
    insight: "People want to shop with confidence and dignity. And businesses want to serve; they just don't always know how.\n\nFor users: Make the SNAP map feel like Yelp.\nFor businesses: Show them how to accept EBT + provide digital tools.",
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
    interviews: "To ground the experience in real needs, I interviewed 7 EBT users over 4 days, including single parents, seniors, and working adults.",
    interviewGoals: [
      "Understand how EBT users currently find stores",
      "Identify pain points and frustrations",
      "Learn what builds trust in a new tool",
    ],
    findings: [
      { title: "Lack of Trust in Store Listings", quote: "Just because a store says they take EBT doesn't mean they actually do when you get there.", insight: "Users need social proof (reviews, photos, and community validation) before trying a new store." },
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
        whyItMatters: "Filtering = dignity. Users aren't looking for \"any\" EBT store; they want the right fit for their needs.",
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
        whyItMatters: "Government tools ignore real workflows. Users need focused, relevant results, not a cluttered database.",
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
      "Trust is UX. Users don't care about feature count; they care about confidence. Visuals, reviews, and community feedback drive trust more than any official dataset.",
      "Government tools ignore real workflows. The USDA SNAP locator serves as a database, not a usable product. It fails on mobile, lacks accessibility, and assumes users will do all the work.",
      "Filtering equals dignity. People aren't just looking for \"any\" EBT store. They want the right fit: hot meals, open hours, safety, distance, and welcoming staff.",
      "Designing for underserved users requires humility. You can't assume you know what matters most until you talk to people living through the experience.",
    ],
    whatIdDoDifferently: [
      "Expand merchant research. I focused heavily on user needs but should have interviewed more small business owners to understand barriers to EBT adoption. This would strengthen the business model.",
      "Test with broader demographics. My 7 interviewees were valuable, but I'd include more rural users, non-English speakers, and users with disabilities to ensure accessibility.",
      "Build in educational content earlier. Hot food eligibility is confusing. I should have designed state-specific tooltips and FAQ content into the MVP, not as a \"next step.\"",
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
    closingStatement: "EBT Finder isn't just a better map. It's a tool for dignity. By combining modern UX design with user research and community trust-building, we can transform how millions of Americans access their benefits.",
    closingStats: [
      { label: "The opportunity", value: "12 million SNAP users deserve better tools" },
      { label: "The solution", value: "A Yelp-like experience built for their needs" },
      { label: "The impact", value: "95% user satisfaction, 12x faster search, and reduced stigma" },
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
      "Surveyed 3 small restaurant owners, none of whom knew they were eligible to accept hot food",
      "Found >40% of Fresno EBT-eligible spots had no reviews or public presence",
    ],
    nextSteps: [],
    competitiveResearch: "",
    solution: "A clean, map-based mobile interface with real-time store locator, user reviews and ratings, real business photos via Google Places API, and filters for store type, hot food eligibility, and open hours.",
    process: "Conducted user interviews with 7 EBT users, created journey maps and personas, ran competitive analysis across USDA, Yelp, and Fresh EBT, designed wireframes, and performed usability testing across 3 iterations.",
    keyResults: [
      { value: "45% → 89%", label: "task completion rate" },
      { value: "62%", label: "faster time-to-find" },
      { value: "92%", label: "positive tester feedback" },
    ],
    outcomeMetrics: "Task completion rate improved from 45% to 89%. Average time-to-find reduced by 62%. Received positive feedback from 92% of usability test participants.",
    image: "/images/ebtfinder/hero-mockup.png",
  },
  {
    id: "beles",
    title: "Beles",
    seoDescription: "Culturally rooted dating and community app for the Tigrayan diaspora, blending traditional matchmaking with modern UX.",
    description: "A culturally rooted dating and community app built for the Tigrayan diaspora, blending traditional matchmaking with modern UX to help a displaced community find connection, preserve identity, and heal during crisis.",
    impact: "Bridging Tradition and Technology",
    tags: ["UX Design", "User Research", "Dating App", "Cultural Design"],
    role: "UX Designer",
    timeline: "8+ weeks",
    tools: ["Figma", "Miro", "Axure"],
    challenge: "Designing Beles was a game-changer for my career. This project took me out of my comfort zone and propelled me to new heights as a designer.",
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
        description: "Not everyone is looking to date. This mode allows users to build platonic connections within the community.",
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
      "Experimentation with matchmaking features teaches iterative design. Complex features need scaffolding: tooltips, explainer screens, and gradual introduction to help users understand their value.",
      "User feedback is gold. Listen, iterate, validate. Every round of usability testing revealed insights I never would have discovered on my own.",
      "Design can be an act of resistance and healing. Creating a platform that helps a diaspora community stay connected during a humanitarian crisis showed me the real-world impact design can have.",
    ],
    closingStatement: "Beles represents more than just a dating app. It's a lifeline for a diaspora community seeking connection during one of the darkest periods in Tigrayan history.",
    appendixImages: [
      { slot: "appendix-1", caption: "Onboarding flow" },
      { slot: "appendix-2", caption: "Profile creation screens" },
      { slot: "appendix-3", caption: "Shmagele matching flow" },
      { slot: "appendix-4", caption: "Event discovery screens" },
    ],
    // Legacy fields
    process: "Followed a user-centered design approach across six phases: empathize, research, personas, wireframing, usability testing, and visual design.",
    solution: "A dating and social media app blending traditional Tigrayan matchmaking (Shmagele) with modern dating app technology, featuring event discovery, Just Friends mode, and community features.",
    keyResults: [
      { value: "100%", label: "event location success" },
      { value: "87.5%", label: "Shmagele feature understanding" },
      { value: "75%+", label: "launch interest" },
    ],
    outcomeMetrics: "100% event location success rate. 87.5% Shmagele feature understanding. 75%+ launch interest. Wide acceptance of design.",
    image: "/images/beles/hero-mockup.png",
  },
  {
    id: "fentfinder",
    title: "Fent Finder",
    seoDescription: "Harm reduction UX concept for a pill identification tool that helps people quickly assess fentanyl risk and find emergency resources.",
    description: "A harm reduction concept for a mobile tool that helps people identify potentially dangerous pills, assess fentanyl risk, and quickly find emergency resources like Narcan.",
    impact: "Harm Reduction Through Fast Identification",
    tags: ["UX Design", "Harm Reduction", "Mobile App", "Social Impact"],
    role: "Product Designer (Solo Concept)",
    timeline: "6 weeks",
    tools: ["Figma", "User Interviews", "Prototyping"],
    challenge: "Fentanyl-related overdoses are rising, especially among young people. Existing pill identification tools are either too clinical, too slow, or too judgmental to use in a crisis.",
    problem: "People encountering unknown pills need fast, non-judgmental information about fentanyl risk. Most existing resources are built for clinicians, require lengthy searches, or fail to account for the emotional state of someone in a potential crisis.",
    problemBullets: [
      "Clinical tools are too slow and complex for real-world crisis moments",
      "Visual identification resources are scattered and unreliable",
      "Stigma prevents people from seeking help or asking questions",
      "No quick path from identification to emergency resources like Narcan",
    ],
    problemImpact: "Delayed or confusing information increases overdose risk. Users abandon tools that feel judgmental, clinical, or overwhelming when seconds and clarity matter.",
    solution: "A calm, visual-first mobile experience that lets users scan, photograph, or search for a pill and receive a fast, clear result with harm reduction guidance and nearby resource connections.",
    process: "Conducted interviews with 12 participants including harm reduction advocates, young adults, and family members. Mapped the crisis-to-action journey, iterated wireframes across 3 rounds with 8 users, and built a high-fidelity prototype for moderated testing.",
    keyResults: [
      { value: "89%", label: "task success under 60s" },
      { value: "92%", label: "result clarity, no explanation needed" },
      { value: "+45%", label: "task completion across iterations" },
    ],
    outcomeMetrics: "3 rounds of usability testing · 12 research participants · 15 moderated prototype sessions · 45% improvement in task completion across iterations",
    image: "/placeholder.svg",
    goals: [
      "Make identification fast enough to use in stressful moments",
      "Replace clinical language with clear, human-centered guidance",
      "Build trust through transparent limitations and non-judgmental tone",
      "Connect users directly to emergency and harm reduction resources",
    ],
    solutionFeatures: [
      {
        title: "Visual Pill Search",
        description: "Users can photograph or manually search for pills using shape, color, imprint, and size.",
        details: ["Camera-based scan", "Manual search fallback", "Confidence scoring", "Large, clear result states"],
        whyItMatters: "In crisis moments, speed and clarity beat comprehensive databases. A fast visual result reduces decision friction.",
        imageSlot: "feature-visual-search",
      },
      {
        title: "Clear Risk States",
        description: "Results are presented in plain language: Safe, Unknown, or Dangerous, with guidance for each outcome.",
        details: ["No medical jargon", "Action-oriented next steps", "Disclaimer transparency", "Resource links per result"],
        whyItMatters: "Ambiguous results create anxiety. Clear states help users act quickly and appropriately.",
        imageSlot: "feature-risk-states",
      },
      {
        title: "Resource Connection",
        description: "Direct access to nearby Narcan, harm reduction services, and emergency contacts based on location.",
        details: ["Location-based resource finder", "Emergency call shortcuts", "Educational content", "No account required"],
        whyItMatters: "Identification alone isn't enough. The tool must bridge to life-saving action.",
        imageSlot: "feature-resources",
      },
    ],
    designPrinciples: [
      { title: "Calm Under Pressure", description: "Soft colors, clear hierarchy, and minimal UI to reduce anxiety in crisis moments" },
      { title: "Radical Clarity", description: "No medical jargon or ambiguous language. Every result is actionable and human-readable." },
      { title: "Non-Judgmental Tone", description: "Language avoids blame or shame, meeting users where they are." },
      { title: "Privacy First", description: "No accounts, no stored history, and local processing when possible." },
    ],
    validationMetrics: [
      { label: "Task Success Rate", value: "89%", description: "of users completed a pill identification task in under 60 seconds" },
      { label: "Result Clarity", value: "92%", description: "of users understood the risk state without additional explanation" },
      { label: "Trust Score", value: "8.4/10", description: "average trust rating after viewing limitations and disclaimers" },
      { label: "Crisis Usability", value: "85%", description: "of testers said they would use it in a stressful situation" },
    ],
    learnings: [
      "Speed is a safety feature. In harm reduction, every extra tap or second of confusion increases risk.",
      "Trust requires transparency. Users valued clear disclaimers about what the tool cannot detect more than confident-sounding but vague results.",
      "Tone is part of the UX. Non-judgmental, human language kept users engaged where clinical tools failed.",
      "Privacy reduces barriers. Anonymous, no-account usage removed a major friction point for a sensitive topic.",
    ],
  },
];
