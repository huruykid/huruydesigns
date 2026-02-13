export interface Finding {
  title: string;
  quote: string;
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
  insight?: string;
  researchHighlights?: string[];
  goals?: string[];
  competitiveResearch?: string;
  interviews?: string;
  findings?: Finding[];
  learnings?: string[];
  nextSteps?: string[];
}

export const projects: Project[] = [
  {
    id: "ebtfinder",
    title: "EBT Finder",
    description: "EBTFinder.org is a review-first platform built to help SNAP/EBT users quickly discover nearby businesses that accept EBT. Unlike the outdated government database, we show real images, user reviews, and clear filters — so you can shop with ease, trust, and dignity.",
    impact: "Redesigned for 2M+ SNAP users",
    tags: ["UX Research", "Figma", "Prototyping", "Accessibility"],
    role: "UX Designer",
    timeline: "Jan – Apr 2024",
    tools: ["Figma", "Miro", "UserTesting", "Google Places API"],
    problem: "Low-income families and individuals using EBT are underserved by digital tools. The USDA's official SNAP locator is overwhelming and outdated, lacking visuals or reviews, not mobile-first, and not filterable by user needs (e.g. hot food, open now, delivery options).",
    insight: "People want to shop with confidence and dignity. And businesses want to serve — they just don't always know how. I saw an opportunity to fix both sides of that equation: For users, make the SNAP map feel like Yelp. For businesses, show them how to apply to accept EBT and upsell digital tools.",
    researchHighlights: [
      "Audited existing USDA SNAP site",
      "Interviewed 5 EBT users about how they decide where to go",
      "Surveyed 3 small restaurant owners — none knew they were eligible to accept hot food",
      "Found >40% of Fresno EBT-eligible spots had no reviews or public presence",
    ],
    goals: [
      "Rebuild the SNAP locator for actual usability",
      "Let users rate and review stores/restaurants",
      "Pull in visuals via Google Places API",
      "Educate merchants & offer services to help them modernize",
    ],
    competitiveResearch: "We conducted a deep dive into both direct and indirect competitors. The USDA SNAP Retailer Locator lacks filters, mobile usability, and user-friendly design — essentially a CSV on a map. Yelp and Google Maps are powerful discovery tools but have no EBT filtering and inconsistent tagging. Fresh EBT (now Propel) focused more on benefits tracking than store discovery. No single platform combined SNAP eligibility with real-time business visuals and user reviews. None allowed users to filter by critical needs like 'Hot Foods,' 'Grocery Only,' or 'Open Now.' There was a major gap for trust-building features like ratings, photos, and reviews — which are table stakes in other industries.",
    interviews: "Over 4 days, I remotely interviewed 7 EBT users — including single parents, seniors, and working adults — to surface patterns in behavior, values, and pain points. The interviews revealed that trust matters more than features, the current USDA site is barely usable (most users tried it once and never returned), and Hot Food eligibility is confusing even for long-time EBT users.",
    findings: [
      { title: "Lack of Trust in Store Listings", quote: "Just because a store says they take EBT doesn't mean they actually do when you get there." },
      { title: "Confusion Around Hot Foods", quote: "I've had EBT for years and still don't know where I can use it for hot food." },
      { title: "Stigma + Shame Still Exist", quote: "I don't want to be judged when I swipe my card. Knowing a place welcomes EBT helps." },
    ],
    learnings: [
      "Trust is UX. Users don't care about feature count — they care about confidence. Visuals, reviews, and real community feedback drive trust more than any official label or dataset.",
      "Government tools ignore real workflows. The USDA SNAP locator serves as a database, not a usable product. It fails on mobile, lacks accessibility, and assumes users will do all the work.",
      "Filtering = Dignity. People aren't just looking for 'any' EBT store — they want the right fit for their needs: Hot Meals, open hours, safety, distance, and staff treatment.",
      "Designing for underserved users requires humility. You can't assume you know what matters most until you talk to people living through the experience.",
    ],
    nextSteps: [
      "Incorporate more social proof — allow users to share short reviews, rate EBT-friendliness, and upload quick photos to build peer-to-peer trust.",
      "Add 'Hot Food' clarity + education — create tooltips and mini-guides per state so users know what's allowed, including a map toggle for 'Hot Food eligible nearby.'",
      "Expand interviews to merchants — understand why more stores don't accept EBT and how to remove onboarding friction.",
      "Test with real-time tasks — run click tests like 'How fast can someone find a Hot Food location within 3 miles?'",
    ],
    process: "Conducted user interviews with 7 EBT users, created journey maps and personas, ran competitive analysis across USDA, Yelp, and Fresh EBT, designed wireframes, and performed usability testing across 3 iterations.",
    solution: "A clean, map-based mobile interface with real-time store locator, user reviews and ratings, real business photos via Google Places API, and filters for store type, hot food eligibility, and open hours.",
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
