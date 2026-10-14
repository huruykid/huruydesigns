/**
 * "Beyond the project" on the About page: work that outlived the brief.
 * Only facts Huruy can defend in an interview. Add `confirmedBy` (name and title of
 * someone who would confirm it to a recruiter) once they've agreed; it then shows
 * beside the line. Add a number to `what` only when it's known, never estimated.
 */
export interface InfluenceItem {
  kind: string;
  what: string;
  /** "Name, Title" of someone who will confirm this, with their OK. */
  confirmedBy?: string;
}

export const influence: InfluenceItem[] = [
  {
    kind: "Adopted",
    what: "The four-state revision lifecycle I designed for Asure's compliance engine (draft, in review, locked, released) became the standard for the engine's other configuration modules.",
  },
  {
    kind: "Changed a decision",
    what: "My OneAsure interview findings moved the project from a visual refresh to a consolidation of four portals into one, and pushed the visual work to a second phase.",
  },
  {
    kind: "Still in use",
    what: "The entity map from the Dallas whiteboard sessions became the shared reference engineering, product and compliance used for how the engine's parts depend on each other.",
  },
];
