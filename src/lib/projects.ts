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
    image: "/placeholder.svg",
  },
  {
    id: "ai-fent-finder",
    title: "AI Fent Finder",
    description: "Using AI to detect fentanyl contamination and save lives through harm reduction.",
    impact: "Potentially life-saving AI tool",
    tags: ["AI/ML", "UX Design", "React", "Health Tech"],
    role: "UX Designer & Developer",
    timeline: "Sep – Dec 2023",
    tools: ["Figma", "React", "TensorFlow"],
    problem: "Fentanyl contamination in street drugs is a leading cause of overdose deaths. Users lack accessible tools to identify contaminated substances before use.",
    process: "Partnered with harm reduction organizations, conducted stakeholder interviews, designed a judgment-free UI, and iterated based on community feedback.",
    solution: "An AI-powered web application that guides users through substance testing with clear, non-judgmental instructions and immediate results.",
    outcomeMetrics: "Prototype tested with 3 harm reduction organizations. 100% of testers found the interface intuitive. Presented at university health innovation showcase.",
    image: "/placeholder.svg",
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
