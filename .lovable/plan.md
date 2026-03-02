

## Plan: Show the interactive prototype unblurred + add richer preview content

Currently the dashboard is blurred behind an overlay. The user wants to show more, including the actual interactive prototype and additional information, to entice visitors.

### Changes to `src/components/AccessGate.tsx`

1. **Unblur the dashboard prototype** - Remove the `blur-[6px]` filter and the overlay. Show the full interactive `TaxComplianceDashboardDemo` inside `ResponsiveAppShell` with `allowToggle` so visitors can actually click around and explore it. Add a label like "Interactive Prototype" and a prompt to interact.

2. **Add the Entity Relationship Diagram** - Import and render the `EntityDiagram` component (currently only in the full case study) below the prototype. This visually communicates the system complexity without revealing proprietary details.

3. **Add the State Machine Diagram** - Import and render the `StateMachineDiagram` component to show the revision lifecycle (Draft → In Review → Locked → Released). Another visual hook that demonstrates design thinking.

4. **Add a "Before → After" transformation snippet** - Show 3-4 rows from the `transformations` array (e.g., "Raw database relationships → Structured entity hierarchy") as a compact visual.

5. **Keep the "What's Inside" section and request form** below all of this.

### Layout (top to bottom)
- Lock icon + title + description + tags + role (unchanged)
- Stats bar (unchanged)
- **Interactive prototype** (unblurred, fully interactive, with label)
- **Entity Relationship Diagram** (from case study)
- **State Machine Diagram** (from case study)
- **Before → After transformations** (3-4 rows)
- "What's Inside" teaser (unchanged)
- Request form card (unchanged)

### Technical detail
- Export `EntityDiagram` and `StateMachineDiagram` from `AsureComplianceCaseStudy.tsx` (or extract to shared file) so `AccessGate` can import them
- Widen the `max-w-2xl` container to `max-w-4xl` to accommodate the wider diagrams and prototype

### Files to edit
- `src/components/case-study/AsureComplianceCaseStudy.tsx` - Export `EntityDiagram`, `StateMachineDiagram`, and `transformations`
- `src/components/AccessGate.tsx` - Import and render them; unblur the prototype; widen container

