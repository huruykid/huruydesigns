

## Fix: Alt Resume Overflowing to 2 Pages

### Problem
The resume spills onto a second page when printing/saving as PDF due to too much content.

### Changes to `src/pages/ResumeAlt.tsx`

**1. Reorder experience** to match requested chronology:
1. Asure Software — `Apr 2023 – Present`
2. Datable — `2020 – 2023` (updated dates from `2016–2020`)
3. AI Product Designer & Builder — `2024 – Present`

**2. Trim Datable bullets** from 6 down to 3 (remove the A/B testing, client presentations, and user research bullets that were added to pad space).

**3. Reduce print zoom** from `0.8` to `0.75` as a safety net to ensure single-page fit.

One file, data array reorder + trim only.

