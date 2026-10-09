import type { AsureGatedContent } from "./gatedContent";

/** Public Asure narrative, preserved from the original case study. */
export const asureContent: AsureGatedContent = {
  "audienceNeeds": [
    {
      "need": "Determinism: predictable, safe, explicit configuration flows",
      "role": "Payroll Admins"
    },
    {
      "need": "Compliance rigor: no way to accidentally violate regulatory rules",
      "role": "SMEs"
    },
    {
      "need": "Clear state definitions: UI that maps to the actual backend model",
      "role": "Engineering"
    }
  ],
  "collaboration": [
    "The sharpest moment came when we got to revision and release. Engineers had a precise technical definition of \"released\": a record flag, a database state. SMEs had a compliance definition: a configuration that had been reviewed, approved, and is now legally in effect. These weren't the same thing, and for years the product had quietly conflated them.",
    "The state machine we landed on wasn't just a UX pattern. It was a negotiated definition, a shared contract between what the system does and what the business means. That conversation couldn't have happened in a ticket or a Slack thread. It happened on a whiteboard in Dallas with both sides in the room."
  ],
  "collaborators": [
    {
      "group": "Engineers",
      "items": [
        "Validated technical feasibility of state models",
        "Informed data architecture constraints",
        "Confirmed which relationships were database-enforced",
        "Aligned on API-level state transitions"
      ]
    },
    {
      "group": "Subject Matter Experts",
      "items": [
        "Validated compliance accuracy of flows",
        "Confirmed threshold trigger logic",
        "Reviewed jurisdiction-specific edge cases",
        "Approved revision lifecycle model"
      ]
    },
    {
      "group": "Product Managers",
      "items": [
        "Aligned design scope with roadmap priorities",
        "Triaged which entity types to tackle first",
        "Managed stakeholder expectations on phasing",
        "Bridged business requirements to design intent"
      ]
    }
  ],
  "context": [
    "Asure's payroll compliance engine sits underneath payroll processing for thousands of employers across the US and Canada. Every state, province, and locality has its own rules, and misconfiguring any one of them doesn't produce a bug. It produces a failed tax filing or a regulatory penalty."
  ],
  "contributionsIntro": "Each contribution addressed a distinct failure mode in the legacy system, and together they formed a coherent, scalable configuration platform.",
  "coreContributions": [
    {
      "letter": "A",
      "problemPoints": [
        "Entities visually disconnected",
        "Hidden downstream dependencies",
        "No parent-child hierarchy visible",
        "Silent cascading on edit"
      ],
      "solutionPoints": [
        "Clarified parent-child hierarchy",
        "Navigation mirrors entity model",
        "Surfaced downstream impact",
        "Reduced hidden dependencies"
      ],
      "subtitle": "Parent-child hierarchy surfaced in navigation and forms, so a payroll admin editing a formula understands what downstream tax codes and filing frequencies are affected.",
      "title": "Entity Relationship Clarity"
    },
    {
      "letter": "B",
      "problemPoints": [
        "No visible draft vs. live distinction",
        "Changes could silently affect live filing",
        "No audit trail for revisions",
        "Locking behavior undocumented"
      ],
      "solutionPoints": [
        "Draft → Review → Locked → Released",
        "Explicit release triggers",
        "Historical version access",
        "Audit visibility throughout"
      ],
      "subtitle": "Explicit state. No silent changes. No compliance drift.",
      "title": "State-Driven Revision Lifecycle"
    },
    {
      "letter": "C",
      "problemPoints": [
        "Threshold triggers implicit and invisible",
        "No field-level validation feedback",
        "Jurisdiction rules not surfaced",
        "Users guessed at required values"
      ],
      "solutionPoints": [
        "Conditional field visibility",
        "Threshold warnings before errors",
        "Hard stops with clear rationale",
        "Jurisdiction-specific validation rules"
      ],
      "subtitle": "Making threshold logic legible, not surprising",
      "title": "Dynamic Validation & Threshold Modeling"
    },
    {
      "letter": "D",
      "problemPoints": [
        "Flat, unsortable tax code lists",
        "No structured search or filtering",
        "Linking across entities was manual",
        "Accidental misconfiguration risk"
      ],
      "solutionPoints": [
        "Multi-dimension filterable tables",
        "Structured search with clear scope",
        "Deterministic entity linking",
        "Dependency warnings on destructive actions"
      ],
      "subtitle": "Usability at a scale that breaks default patterns",
      "title": "Scalable CRUD for 9,000+ Tax Agencies"
    }
  ],
  "impactIntro": "The results of this work aren't measured in clicks. They're measured in eliminated risk, increased clarity, and an architecture that scales to regulatory complexity.",
  "impactItems": [
    {
      "body": "Explicit state machine eliminated a class of errors where configuration edits cascaded invisibly into live payroll filings, protecting compliance for thousands of active employers.",
      "icon": "Shield",
      "title": "Prevented Silent State Changes"
    },
    {
      "body": "Parent-child hierarchy made visible in navigation and forms, reducing misconfiguration from disconnected entity editing.",
      "icon": "Layers",
      "title": "Clarified Entity Relationships"
    },
    {
      "body": "Structured step-based workflows gave payroll admins a clear path through every configuration. No more guessing, no more silent errors.",
      "icon": "BarChart3",
      "title": "Reduced Configuration Ambiguity"
    },
    {
      "body": "Every state change is now traceable with a full revision history, a non-negotiable requirement for regulatory compliance audits.",
      "icon": "ClipboardList",
      "title": "Improved Audit Transparency"
    },
    {
      "body": "UI state transitions map 1:1 to actual data model states, reducing implementation ambiguity, cutting engineering overhead, and preventing the product from diverging from the system again.",
      "icon": "Search",
      "title": "Aligned UX with Backend State Model"
    },
    {
      "body": "Consistent interaction patterns across all 9,000+ tax agencies mean new jurisdictions can be onboarded without a redesign.",
      "icon": "Building2",
      "title": "Structured Scalable Architecture"
    }
  ],
  "intuitionCards": [
    {
      "body": "Complex configurations broken into ordered, completable steps. Progress made visible.",
      "title": "Step-Based Workflows"
    },
    {
      "body": "Consistent interaction models across all entity types. Learn once, apply across 9,000+ tax agencies.",
      "title": "Predictable Patterns"
    },
    {
      "body": "Every record communicates its state immediately: draft, locked, released, error.",
      "title": "Clear Status Indicators"
    },
    {
      "body": "Critical fields up front, advanced settings revealed progressively.",
      "title": "Visual Hierarchy for Decisions"
    },
    {
      "body": "Advanced jurisdiction-specific settings hidden by default. Surfaced only when relevant.",
      "title": "Progressive Disclosure"
    },
    {
      "body": "Create, edit, delete, and link interactions followed identical models regardless of entity type.",
      "title": "Consistent CRUD Patterns"
    }
  ],
  "intuitionIntro": "The differentiator wasn't the UI patterns. It was the translation layer. Turning compliance logic into something a payroll admin can confidently configure without a tax law degree.",
  "learnings": [
    "The most impactful design work often isn't a deliverable. It's forcing a conversation that hasn't happened yet. Mapping the entity dependency chain on a whiteboard created more alignment than any prototype.",
    "For compliance products, UI state should map 1:1 to backend state. No abstract statuses, no optimistic UI that hides what's actually happening. That's not a UX preference. It's a correctness requirement."
  ],
  "onsitePhoto": {
    "alt": "Onsite collaboration session in Dallas with the Asure engineering and compliance teams",
    "caption": "Onsite in Dallas, collaborating with engineering and compliance SMEs",
    "src": "/images/asure/dallas-onsite.webp"
  },
  "problem": [
    "Once I was onsite, we quickly realized that nobody (not engineering, not the SME team, not product) had a complete map of how the entities related to each other. Everyone held a partial model. Engineers understood the data layer. SMEs understood the regulatory logic. But the dependency chain connecting a tax code to a formula to a filing frequency to a payee to a holiday calendar had never been drawn end-to-end.",
    "That was the real problem. Not the screens. The absence of a shared mental model, and a product that had been built on top of that absence for years. So we got together and built that map first."
  ],
  "problemCards": [
    {
      "body": "Database-level relationships surfaced in the UI with no conceptual scaffolding. Users had to understand the system model just to complete basic tasks.",
      "icon": "Lock",
      "title": "Backend Logic Exposed"
    },
    {
      "body": "Saving a configuration could silently alter downstream compliance behavior. Users had no visibility into what changed or what it affected.",
      "icon": "Eye",
      "title": "Implicit State Changes"
    },
    {
      "body": "Tax codes, formulas, filing frequencies, and payees were interdependent, but visually disconnected. Edits cascaded in unexpected ways.",
      "icon": "Layers",
      "title": "Invisible Entity Relationships"
    },
    {
      "body": "When a config should be locked, released, or versioned was undocumented and opaque, creating compliance drift risk.",
      "icon": "Shield",
      "title": "Revision Rules Not Intuitive"
    },
    {
      "body": "Threshold-based behavioral changes, where one value unlocks or restricts another, were entirely hidden from the user.",
      "icon": "Zap",
      "title": "Confusing Threshold Triggers"
    },
    {
      "body": "9,000+ tax agencies with no consistent interaction model. Every configuration felt bespoke and fragile.",
      "icon": "Building2",
      "title": "No Scalability Pattern"
    }
  ],
  "role": [
    "My most significant contribution wasn't a deliverable. It was forcing a conversation that hadn't happened yet.",
    "When I mapped the entity dependency chain on a whiteboard (tax code to formula to filing frequency to payee to holiday calendar) the room got quiet. Engineers recognized the data relationships. SMEs recognized the compliance logic. Neither group had seen both layers mapped together before. That diagram became the foundation for everything that followed.",
    "I also pushed hard for one specific architectural decision that engineering initially resisted: UI state should map 1:1 to backend state. No abstract statuses, no optimistic UI that hid what was actually happening in the system. For a compliance product, that's not a UX preference. It's a correctness requirement."
  ],
  "roleItems": [
    "Spent multiple days onsite in Dallas collaborating with engineering, PM, and SMEs",
    "Facilitated whiteboarding sessions to map entity relationships and dependency chains",
    "Redefined configuration flows to reflect real compliance mental models",
    "Influenced how state transitions were surfaced and communicated in the UI",
    "Designed revision lifecycle behavior: draft, lock, release, version",
    "Created wireframes and interactive prototypes to align all three stakeholder groups"
  ],
  "transformations": [
    {
      "from": "Raw database relationships",
      "to": "Structured entity hierarchy"
    },
    {
      "from": "Implicit state changes",
      "to": "Explicit state machine"
    },
    {
      "from": "Hidden threshold logic",
      "to": "Surfaced validation logic"
    },
    {
      "from": "Disconnected entity forms",
      "to": "Unified configuration flows"
    },
    {
      "from": "No revision visibility",
      "to": "Audit-ready revision lifecycle"
    },
    {
      "from": "Flat unstructured tables",
      "to": "Filterable, searchable tables"
    }
  ],
  "validationMatrix": [
    {
      "behavior": "Additional rate fields revealed",
      "condition": "Rate > jurisdiction threshold",
      "type": "Warning"
    },
    {
      "behavior": "Annual limit field required",
      "condition": "Filing frequency = quarterly",
      "type": "Conditional"
    },
    {
      "behavior": "Routing + account fields visible",
      "condition": "Payee type = electronic",
      "type": "Standard"
    },
    {
      "behavior": "Reciprocity field required",
      "condition": "Multi-state employer flag",
      "type": "Conditional"
    },
    {
      "behavior": "Save blocked, inline guidance shown",
      "condition": "Missing required jurisdiction field",
      "type": "Hard Stop"
    },
    {
      "behavior": "Auto-adjusted date surfaced for review",
      "condition": "Holiday falls on filing date",
      "type": "Warning"
    }
  ],
  "version": 1
};
