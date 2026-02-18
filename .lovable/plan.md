
## Restructure Beles Case Study: Problem → Research → Solution

### The Issue

The current section order puts "The Solution" (with all 4 Core Features) **immediately after the Problem**, before any research, personas, wireframing, or usability testing. This breaks the standard UX case study narrative — a reader who hasn't seen the research doesn't yet understand *why* Shmagele, Just Friends, Event Discovery, and Notifications are the right answers.

The correct storytelling arc is:

```text
CURRENT (broken)                    TARGET (fixed)
─────────────────────               ──────────────────────────────
1. Problem                          1. Problem
2. Solution ← too early!            2. Research & Interviews
3. Design Process                   3. Personas
4. Personas                         4. Wireframing
5. Wireframing                      5. Usability Testing
6. Usability Testing                6. Navigation Redesign Deep Dive
7. Nav Redesign                     7. Solution (Core Features)
8. Visual Design                    8. Visual Design
9. Impact                           9. Impact & Outcomes
10. Learnings                       10. Learnings
11. Next Steps                      11. Next Steps
12. Conclusion                      12. Conclusion
```

The Solution section moves from position 2 all the way to position 7 — right after the usability/nav-redesign work that informed it, and right before the visual design that executed it. This makes the narrative read: "Here's the problem → here's what we learned → here's what we built → here's how it looks."

---

### Section-by-Section Rationale

**Problem** stays first — establishes the "why."

**Design Process (Empathize + Research)** moves to position 2 — the 6-phase research block and interview insights explain *how* insights were gathered.

**Personas** stays right after research — they are the direct output of the interviews.

**Wireframing** comes next — it's the first design artifact, produced from persona insights.

**Usability Testing** follows wireframing — tests the wireframes/lo-fi prototype.

**Navigation Redesign Deep Dive** stays right after usability testing — it's a specific deep dive *from* a usability finding.

**The Solution** now lands here — positioned as the culmination of all the research and iteration. The reader is now fully primed to understand *why* each feature exists.

**Visual Design → Impact → Learnings → Next Steps → Conclusion** remain in their current order.

---

### Technical Details

**File modified:** `src/components/case-study/BelesCaseStudy.tsx` only — one edit that reorders the JSX blocks.

The change is purely a **cut-and-paste reorder** of the `<CaseStudySection>` blocks inside the fragment. No component logic, props, or imports change. Each block is self-contained, so there are no dependencies to untangle.

**Specific move:**
- Cut the entire "The Solution" `<CaseStudySection>` block (currently lines 45–88)
- Paste it after the "Navigation Redesign Deep Dive" section (currently ends at line 275) and before "Visual Design" (currently line 277)

That single reorder fixes the narrative without touching any other code.
