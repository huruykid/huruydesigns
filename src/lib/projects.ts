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
  goals?: string[];
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
  sectionImages?: SectionImages;
  seoDescription?: string;
  keyResults?: { value: string; label: string }[];
  appStoreUrl?: string;
  /** Social card image when it differs from the hero image. */
  ogImage?: string;
  /** Full narrative is served by verify-passcode after a correct passcode. */
  gated?: boolean;
  /** Reachable by direct link only: never listed, linked, prerendered or in the sitemap. */
  hidden?: boolean;
  /** Set once a concept has been built and released. */
  shipped?: {
    summary: string;
    facts: { label: string; value: string }[];
    /** Real production numbers with their source and the date they were read. */
    stats?: { value: string; label: string; source: string }[];
    /** Screens of the live product. */
    screens?: { src: string; caption: string }[];
    /** Operational problems solved after launch: the senior evidence. */
    postLaunch?: { title: string; problem: string; fix: string; lesson: string }[];
  };
}

export const projects: Project[] = [
  {
    id: "ebtfinder",
    title: "EBT Finder",
    description: "A review-first store locator that helps SNAP/EBT users find nearby businesses with confidence and dignity. Researched, designed, built, and shipped solo to the App Store.",
    impact: "Shipped: a store locator for 12M+ SNAP households",
    appStoreUrl: "https://apps.apple.com/app/ebt-finder/id6751323829",
    tags: ["UX Research", "Figma", "Prototyping", "Competitive Analysis"],
    role: "Product Designer and Developer (solo)",
    timeline: "4-week design sprint, then built and shipped to the App Store",
    tools: ["Figma", "User Interviews", "Prototyping", "React", "Supabase", "Capacitor"],
    shipped: {
      summary:
        "EBT Finder didn't stop at the prototype. I built the product in React with a Supabase backend, wrapped it with Capacitor, and released it on the iOS App Store. The research below shaped the first version. Everything since has been shaped by running it: real data pipelines, a real App Store review, real crashes, and users on weak connections.",
      facts: [
        { label: "Status", value: "Live on the App Store (1.0.2) and at ebtfinder.org" },
        { label: "Built with", value: "React, TypeScript, Supabase (Postgres, RLS, 20 edge functions), Google Places API, Capacitor" },
        { label: "Data", value: "USDA SNAP retailer dataset synced on a schedule, enriched with Google Places, plus community verifications" },
        { label: "Team", value: "Solo: research, design, code, backend, release and support" },
      ],
      // Read from production on 2026-09-18 (Supabase) and Google Analytics (docs/vercel-deploy-guide.md).
      stats: [
        { value: "264,000+", label: "EBT-accepting locations mapped", source: "production database" },
        { value: "53", label: "states and territories covered", source: "production database" },
        { value: "~318", label: "real US users a week on the web app", source: "Google Analytics" },
        { value: "13", label: "TestFlight builds to reach a clean release", source: "release log" },
      ],
      screens: [
        { src: "/images/ebtfinder/app/map.webp", caption: "Opens straight to EBT stores near you: nearby list, map, and the Open Now and Hot Meals filters." },
        { src: "/images/ebtfinder/app/store.webp", caption: "Store pages answer fast: distance, USDA listing, hours, directions, and whether EBT worked for recent shoppers." },
        { src: "/images/ebtfinder/app/community.webp", caption: "Community signals: verifications and reports from shoppers who were actually there." },
        { src: "/images/ebtfinder/app/guides.webp", caption: "Guides and SNAP news, the content layer that brings search traffic to the web app." },
        { src: "/images/ebtfinder/app/trust.webp", caption: "Trust, stated plainly: independent, free, no judgment, browse without an account." },
      ],
      postLaunch: [
        {
          title: "Google changed the shape of its data and took down every store page",
          problem: "Google Places moved reviews from one JSON shape to another. Rows written before and after the change coexisted in the same column. Rendering the new shape crashed every enriched store page; a SQL filter reading the old key silently dropped new-shape stores from Open Now results.",
          fix: "Normalized both shapes at one boundary, guarded every render of external data, made the SQL read both keys, and locked it with a regression test built from the actual crashing row.",
          lesson: "The database stores whatever shape the API had on the day each row was written. Every consumer, client and SQL, has to handle both, forever.",
        },
        {
          title: "Users open the app where the signal is worst",
          problem: "The core use is standing in a store with one bar. Queries returned empty on network failure and the app showed nothing.",
          fix: "A last-good-result cache keyed on the full query identity (bucketed location plus every filter), so an area with zero results shows zero and never another area's cache. Fresh data always wins; the cache only speaks when the network can't.",
          lesson: "Offline support is a product decision about which screens must work, not a technical checkbox.",
        },
        {
          title: "Apple rejected the build for a bug that wasn't in the build",
          problem: "App Review reported that account creation failed. The cause was a database trigger referencing a column I had removed: every new sign-up returned a 500, which the app surfaced as the error the reviewer saw.",
          fix: "Fixed the trigger server-side, reproduced the sign-up on a physical device against the same build, and replied to the Resolution Center with the root cause and evidence. No new binary was needed.",
          lesson: "The backend is a shared artery. A schema change hits the website and every installed build at once, so server changes must be additive and tested against shipped versions.",
        },
        {
          title: "Thirteen TestFlight builds to a clean release",
          problem: "The 1.0.2 redesign found its native-UX bugs on the phone, after upload: a sticky header that never stuck, dead-tap card images, a login screen with a manufactured scroll region, GPS refresh that navigated away instead of updating inline.",
          fix: "Turned every bug class into a written rule and a pre-archive audit at phone dimensions (safe areas owned by one component each, 44pt targets, one tap target per card, inline refresh with skeletons). Later releases audit before they archive.",
          lesson: "Every rule in that checklist is a build that cost a day. The discipline is auditing before the archive exists.",
        },
        {
          title: "Notifications that respect people who are stretched thin",
          problem: "Push is the easiest way to look engaged and the fastest way to lose trust with users who are checking their benefits, not browsing.",
          fix: "A standing policy: a notification sends only if it saves a wasted trip or wasted money. Two are allowed (a saved store may have stopped taking EBT; an opt-in proximity alert), permission is asked right after the first favorite, never at launch, and there are no marketing or re-engagement pushes at all.",
          lesson: "Attention is not an engagement metric. For this audience, restraint is the feature.",
        },
      ],
    },
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
    interviews: "To ground the experience in real needs, I interviewed 7 EBT users in Fresno over 4 days, including single parents, seniors, and working adults. I later ran moderated usability tests of the prototype with 10 people.",
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
    // One test session, 10 moderated participants. Every EBT Finder number on the site comes from here.
    validationMetrics: [
      { label: "Task success", value: "9 of 10", description: "testers found a hot food location in under 15 seconds, against 3+ minutes on the USDA site" },
      { label: "Preference", value: "10 of 10", description: "testers said they would use EBT Finder over the USDA tool" },
      { label: "Confidence", value: "8 of 10", description: "testers felt more confident visiting a store after seeing its reviews and photos" },
      { label: "Time to find hot food", value: "12x faster", description: "median 15 seconds in EBT Finder versus 180 seconds on the USDA locator" },
    ],
    learnings: [
      "Trust is UX. Users don't care about feature count; they care about confidence. Visuals, reviews, and community feedback drive trust more than any official dataset.",
      "Government tools ignore real workflows. The USDA SNAP locator serves as a database, not a usable product. It fails on mobile, lacks accessibility, and assumes users will do all the work.",
      "Filtering equals dignity. People aren't just looking for \"any\" EBT store. They want the right fit: hot meals, open hours, safety, distance, and welcoming staff.",
      "Designing for underserved users requires humility. You can't assume you know what matters most until you talk to people living through the experience.",
    ],
    whatIdDoDifferently: [
      "Expand merchant research. I focused heavily on user needs but should have interviewed more small business owners to understand barriers to EBT adoption. This would strengthen the business model.",
      "Test with broader demographics. My 7 interviewees and 10 testers were valuable, but I'd include more rural users, non-English speakers, and users with disabilities to ensure accessibility.",
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
      { phase: "Shipped", title: "Launched on the App Store", description: "The MVP is live. Early usage in Fresno, a mid-sized market with high SNAP participation, is shaping what gets built next." },
      { phase: "Next", title: "Expand social proof", description: "Photo uploads, video reviews, and \"top-rated\" badges to deepen community trust." },
      { phase: "Later", title: "Merchant dashboard", description: "Self-service tools for businesses to manage listings, respond to reviews, and track performance." },
      { phase: "Later", title: "Scale nationally", description: "Partner with state SNAP agencies to become the default store locator nationwide." },
    ],
    closingStatement: "EBT Finder isn't just a better map. It's a tool for dignity. By combining modern UX design with user research and community trust-building, I built something that changes how people access their benefits, and then I shipped it.",
    closingStats: [
      { label: "The opportunity", value: "12 million SNAP households deserve better tools" },
      { label: "The solution", value: "A review-first store locator, live on the App Store" },
      { label: "The evidence", value: "264k+ locations mapped, real users every week, and a release process that survived App Review" },
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
      "usda-screenshot": "/images/ebtfinder/usda-screenshot.webp",
      "ebt-sign": "/images/ebtfinder/ebt-sign.webp",
      "wireframes": "/images/ebtfinder/wireframes.webp",
    },
    solution: "A clean, map-based mobile app with a real-time store locator, user reviews and ratings, real business photos via the Google Places API, and filters for store type, hot food eligibility, and open hours.",
    process: "I interviewed 7 EBT users, created journey maps and personas, ran a competitive analysis across USDA, Yelp, and Fresh EBT, designed wireframes, and usability-tested the prototype with 10 people before building the app.",
    keyResults: [
      { value: "264k+", label: "EBT-accepting locations mapped, 53 states and territories" },
      { value: "~318", label: "real users a week on the web app" },
      { value: "Shipped", label: "live on the iOS App Store, run solo" },
    ],
    outcomeMetrics: "Live on the App Store and at ebtfinder.org: 264,000+ EBT-accepting locations across 53 states and territories, about 318 real US users a week on the web app, and a release process rebuilt after a 13-build TestFlight cycle. Before code, moderated testing with 10 participants: 9 found a hot food location in under 15 seconds and all 10 preferred it to the USDA locator.",
    image: "/images/ebtfinder/hero-mockup.webp",
  },
  {
    id: "asure-compliance",
    title: "Asure Compliance Engine",
    seoDescription: "Onsite redesign of Asure's enterprise payroll compliance engine for 9,000+ tax agencies across the US and Canada.",
    description: "Brought onsite to redesign screens, I found that no one had ever mapped how the compliance engine's entities depended on each other. I built that map first, then designed the state machine and configuration patterns on top of it.",
    impact: "Re-Architecting Enterprise Payroll Compliance",
    tags: ["Enterprise SaaS", "Payroll Compliance", "Multi-Jurisdiction", "State-Driven System", "9,000+ Agencies"],
    role: "UX Designer, sole designer embedded onsite from discovery through delivery",
    gated: true,
    timeline: "Onsite engagement, Dallas TX",
    tools: ["Figma", "Whiteboarding", "Miro", "Jira"],
    challenge: "Asure's compliance engine supported 9,000+ tax agencies across the US and Canada. When I joined the project onsite in Dallas, the codebase had a complete entity model. The product did not.",
    // Teaser-level summaries only. The narrative lives in the gated_content table.
    problem: "Legacy configuration screens exposed the database model directly, and no one had mapped how the compliance entities depended on each other end to end.",
    solution: "A shared entity map, an explicit revision state machine, surfaced validation rules, and scalable configuration patterns for 9,000+ tax agencies.",
    process: "Embedded onsite in Dallas with engineering, product, and compliance SMEs: whiteboarding, entity mapping, wireframes, and interactive prototypes.",
    keyResults: [
      { value: "9,000+", label: "tax agencies configured through one model" },
      { value: "6", label: "entity types mapped end-to-end" },
      { value: "1:1", label: "UI state to backend state, no silent changes" },
    ],
    outcomeMetrics: "Eliminated silent state changes, made entity relationships visible, and gave the product an audit-ready revision lifecycle. Full narrative available by request.",
    image: "/placeholder.svg",
  },
  {
    id: "capital-group-research",
    title: "Capital Group: AI-Assisted Research Tools",
    seoDescription: "How Huruy Kidanemariam designs AI-assisted research and analysis tools for investment analysts at Capital Group, where trust, provenance and governance decide whether a feature gets used.",
    description: "My current work: research and analysis tools for investment analysts at a $2.7T asset manager, including AI-assisted experiences that have to meet strict governance and accuracy standards. Details are confidential; this page is about how I approach the problem.",
    impact: "Now: designing for analysts at Capital Group",
    tags: ["Financial Research", "AI-Assisted Workflows", "Enterprise", "Design Systems"],
    role: "Senior UX Designer (via Luxoft), embedded with product, engineering and compliance",
    timeline: "Mar 2025 to present",
    tools: ["Figma", "Design system contributions", "Prototyping in code", "Analyst research sessions"],
    challenge: "Investment analysts already have a workflow that works. A new tool, and especially an AI-assisted one, has to earn a place in it by being right, traceable and faster, or it gets ignored.",
    problem: "Analysts distrust output they can't trace, and regulated research has no tolerance for confident-sounding errors. The design problem is less about screens and more about where the model's work ends and the analyst's judgment begins.",
    solution: "Interaction patterns that keep the analyst in control: sources and provenance always one step away, explicit confidence and review states, and AI assistance that drafts and surfaces rather than decides. Shipped as reusable patterns in the internal design system so every team builds the same trust model.",
    process: "Shadow analysts, map the research workflow end to end, prototype the trust-critical moments in code with product and compliance in the room, test with analysts, then codify what works as design-system patterns.",
    keyResults: [
      { value: "Provenance", label: "every AI-assisted output links to its sources" },
      { value: "Governed", label: "review and confidence states designed with compliance" },
      { value: "Systemized", label: "patterns contributed back to the analyst platform's design system" },
    ],
    outcomeMetrics: "Confidential engagement. Outcomes are described qualitatively; specifics are available in conversation where I'm cleared to share them.",
    image: "/images/capital-group/cover.svg",
    learnings: [
      "Trust is a workflow property, not a UI property. Analysts trust a tool when every claim can be checked in one click and the tool never hides what it did.",
      "In regulated products, the review state is the product. Designing who signs off, when, and what they see is more consequential than any individual screen.",
      "The fastest way to align product, engineering and compliance is a prototype they can all click, with the risky moments built in, not described.",
    ],
  },
  {
    id: "oneasure-portal",
    title: "OneAsure Portal",
    description: "Three enterprise HR portals with three logins became one. I led the research that reframed the brief from a visual refresh to a structural consolidation, then designed the portal across eight iterations.",
    impact: "Three portals, one product",
    tags: ["Enterprise UX", "HCM", "Figma", "B2B"],
    role: "UX Designer, led research and IA on a team of four designers",
    timeline: "6+ months",
    tools: ["Figma", "Ionic", "Jira"],
    challenge: "HR professionals at mid-to-large enterprises were navigating a fractured ecosystem: separate portals for time & attendance, benefits, and payroll, each with its own login, its own logic, and its own quirks.",
    problem: "HR professionals at mid-to-large enterprises were navigating a fractured ecosystem: separate portals for time & attendance, benefits, and payroll, each with its own login, its own logic, and its own quirks. The result wasn't just frustrating. It was expensive.",
    solution: "The final OneAsure portal consolidated Time & Attendance, Benefits, Payroll, and related HR functions into a single, unified experience, with one login, consistent UI patterns, and workflows that reflected how people actually worked.",
    process: "Conducted software audits, gap analysis, competitive research across 12 HCM platforms, 16 remote user interviews, and 24 usability tests across 8 iterative design rounds over 6+ months.",
    keyResults: [
      { value: "3 to 1", label: "portals and logins consolidated" },
      { value: "16 + 24", label: "interviews and usability tests behind the decisions" },
      { value: "8", label: "design iterations shipped over six months" },
    ],
    outcomeMetrics: "Three portals and three logins consolidated into one product with consistent patterns; admins reported fewer errors, and the sales team gained a product it could demo. 16 interviews and 24 usability tests across 8 iterations over six months.",
    whatIdDoDifferently: [
      "Instrument the portal before launch. I have qualitative evidence that admin errors dropped and onboarding got faster; I should have baselined both so I could state the numbers, not just the direction.",
      "Push the single sign-on decision earlier. It was the most requested change and the least contested; sequencing it first would have bought goodwill for the harder IA changes.",
    ],
    learnings: [
      "Stakeholder alignment is a design skill, not something that happens after the design work. Translating UX decisions into business language, anticipating objections before they derailed progress, and building shared ownership of the design direction were as important as anything made in Figma.",
      "Sequencing matters. On a project this complex, the order in which you tackle problems is critical. Fixing visual design before addressing structural issues would have been the wrong call. Starting with research before wireframes kept the team from solving the wrong problem.",
    ],
    image: "/placeholder.svg",
  },
  {
    id: "beles",
    title: "Beles",
    seoDescription: "Culturally rooted dating and community app for the Tigrayan diaspora, blending traditional matchmaking with modern UX.",
    description: "A dating and community app for the Tigrayan diaspora. The hard problem was making traditional matchmaking (Shmagele) legible inside a modern app without flattening it, and serving people who wanted community more than dates.",
    impact: "Tradition inside a modern app",
    tags: ["UX Design", "User Research", "Dating App", "Cultural Design"],
    role: "UX Designer",
    timeline: "8 weeks, concept through tested prototype",
    tools: ["Figma", "Miro", "Axure"],
    challenge: "A displaced community needed a place to find partners, friends, and events that understood its culture. Mainstream dating apps had no way to filter for Tigrayan heritage or to honor traditional matchmaking.",
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
    // 8 usability-test participants; before/after numbers compare round one to the final prototype.
    validationMetrics: [
      { label: "Shmagele understanding", value: "37.5% to 87.5%", description: "of the 8 participants understood the matchmaking feature before vs. after onboarding screens and tooltips were added" },
      { label: "Personal connection", value: "62.5% to 0%", description: "reported the layout lacked a personal connection before vs. after the Tigray-inspired palette and illustrations" },
      { label: "Navigation clutter", value: "8 of 8 to 0 of 5", description: "flagged the nav bar as cluttered in round one; none did in the follow-up test of the streamlined nav" },
      { label: "Launch interest", value: "6 of 8", description: "said they would use the app at launch" },
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
    process: "Followed a user-centered design approach across six phases: empathize, research, personas, wireframing, usability testing, and visual design.",
    solution: "A dating and social media app blending traditional Tigrayan matchmaking (Shmagele) with modern dating app technology, featuring event discovery, Just Friends mode, and community features.",
    keyResults: [
      { value: "37.5% to 87.5%", label: "Shmagele feature understanding" },
      { value: "8 of 8 to 0", label: "participants flagging nav clutter" },
      { value: "6 of 8", label: "would use the app at launch" },
    ],
    outcomeMetrics: "Across 8 usability-test participants, understanding of the Shmagele feature rose from 37.5% to 87.5%, navigation clutter complaints dropped from 8 of 8 to none, and 6 of 8 said they would use the app at launch.",
    image: "/images/beles/hero-mockup.webp",
  },
  {
    id: "fentfinder",
    hidden: true,
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

/** Projects that may be listed, linked, prerendered and put in the sitemap. */
export const publicProjects = () => projects.filter((p) => !p.hidden);

/** Resolves a route id, tolerating hyphenated variants such as /project/ebt-finder. */
export const findProject = (id?: string): Project | undefined => {
  if (!id) return undefined;
  const normalized = id.replace(/-/g, "");
  return projects.find((p) => p.id === id || p.id === normalized);
};
