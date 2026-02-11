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
}

export const projects: Project[] = [
  {
    id: "ebtfinder",
    title: "EBTFinder",
    description: "Redesigning the food assistance experience for SNAP recipients across the US.",
    impact: "Redesigned for 2M+ SNAP users",
    tags: ["UX Research", "Figma", "Prototyping", "Accessibility"],
    role: "UX Designer",
    timeline: "Jan – Apr 2024",
    tools: ["Figma", "Miro", "UserTesting"],
    problem: "SNAP recipients struggled to find nearby retailers that accept EBT cards, leading to frustration and wasted time. The existing tools were outdated and hard to navigate.",
    process: "Conducted user interviews with 15+ SNAP recipients, created journey maps and personas, ran competitive analysis, designed wireframes, and performed usability testing across 3 iterations.",
    solution: "A clean, map-based mobile interface with real-time store locator, filters for store type, and accessibility features for low-literacy users.",
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
