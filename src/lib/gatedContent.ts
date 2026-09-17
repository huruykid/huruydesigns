/**
 * Shape of the passcode-gated Asure Compliance narrative.
 *
 * The prose lives in the `gated_content` table (project_id = "asure-compliance")
 * and is returned by the `verify-passcode` edge function only after a correct
 * passcode, so it never ships in the public JavaScript bundle.
 */

export type GatedIconName =
  | "Shield"
  | "Layers"
  | "BarChart3"
  | "ClipboardList"
  | "Search"
  | "Building2"
  | "Lock"
  | "Eye"
  | "Zap";

export interface GatedIconCard {
  icon: GatedIconName;
  title: string;
  body: string;
}

export interface GatedContribution {
  letter: string;
  title: string;
  subtitle: string;
  problemPoints: string[];
  solutionPoints: string[];
}

export interface AsureGatedContent {
  version: number;
  context: string[];
  problem: string[];
  problemCards: GatedIconCard[];
  audienceNeeds: { role: string; need: string }[];
  role: string[];
  roleItems: string[];
  onsitePhoto?: { src: string; alt: string; caption: string };
  contributionsIntro: string;
  coreContributions: GatedContribution[];
  validationMatrix: { condition: string; behavior: string; type: string }[];
  intuitionIntro: string;
  intuitionCards: { title: string; body: string }[];
  transformations: { from: string; to: string }[];
  collaboration: string[];
  collaborators: { group: string; items: string[] }[];
  impactIntro: string;
  impactItems: GatedIconCard[];
  learnings: string[];
}

export interface VerifyPasscodeResponse {
  valid: boolean;
  content?: AsureGatedContent;
  error?: string;
  retryAfterSeconds?: number;
}

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === "string");

/** Light runtime check so a malformed row fails loudly instead of rendering blanks. */
export function isAsureGatedContent(v: unknown): v is AsureGatedContent {
  if (!v || typeof v !== "object") return false;
  const c = v as Record<string, unknown>;
  return (
    isStringArray(c.context) &&
    isStringArray(c.problem) &&
    Array.isArray(c.problemCards) &&
    Array.isArray(c.coreContributions) &&
    Array.isArray(c.impactItems) &&
    isStringArray(c.learnings)
  );
}
