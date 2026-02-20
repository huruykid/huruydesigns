

# Update About Page with Resume Data and Profile Photo

## Overview
Add Huruy's professional headshot and resume PDF to the project, update the About page content with the more detailed resume bullet points, and wire up the "Download Resume" button.

## Changes

### 1. Add Assets to Project
- Copy the headshot photo (`IMG_6446_2.jpg`) to `src/assets/huruy-headshot.jpg`
- Copy the resume PDF (`careerSummary.pdf`) to `public/resume/huruy-kidanemariam-resume.pdf` (public folder so it can be downloaded directly via URL)

### 2. Update About Page Content

**Profile photo**: Replace the `placeholder.svg` image with an import of the real headshot from `src/assets/huruy-headshot.jpg`.

**Download Resume button**: Wire it up as an anchor link pointing to `/resume/huruy-kidanemariam-resume.pdf` with `download` attribute.

**Experience bullets** -- update to match the more detailed resume wording:

- **Asure Software** (Apr 2023 - Present):
  - "Led content strategy for enterprise HR and compliance workflows across web and mobile. Mapped out edge cases and rewrote error messaging to reduce friction, improving task completion rates."
  - "Designed the persona and conversational scripts for 'Luna,' an AI chatbot. Partnered with PMs and QA to refine prompt engineering and AI-driven insights."
  - "Authored usage guidelines and accessibility standards (WCAG) for a new design system, ensuring consistent terminology and responsive layouts across 3 product lines."
  - "Facilitated workshops with stakeholders to align on product naming and messaging strategies, advocating for inclusive language and clear functional specs."

- **IMMERSE** (Jan 2020 - Feb 2023):
  - "Wrote and designed end-to-end onboarding narratives for VR learning experiences, transforming complex 3D interactions into intuitive, bite-sized instructional text."
  - "Developed Immerse's first content and design framework, establishing guidelines for tone, voice, and accessible instruction that were adopted company-wide."
  - "Conducted usability testing to identify linguistic friction points. Rewrote prompt copy to reduce cognitive load, improving learner retention and reducing motion discomfort."
  - "Partnered with instructional designers and engineers to ensure UI copy aligned with pedagogical goals and technical constraints."

- **Datable** (Jan 2016 - Jan 2020):
  - "Managed UX writing and design for multiple concurrent client projects across SaaS and fintech, adapting voice and tone to match distinct brand identities."
  - "Established a modular design system in Figma with standardized copy patterns for empty states and notifications, reducing design-to-dev turnaround by 30%."
  - "Collaborated with stakeholders to refine CTA copy based on business KPIs and conversion data, resulting in measurable engagement improvements."

**No changes needed** for the bio summary, education, leadership, or expertise sections -- they already match the resume and project memory.

---

## Technical Details

### Files Modified
- **`src/pages/About.tsx`**:
  - Import headshot: `import huruyHeadshot from "@/assets/huruy-headshot.jpg"`
  - Replace `src="/placeholder.svg"` with `src={huruyHeadshot}`
  - Wrap the Download Resume button in an `<a>` tag: `href="/resume/huruy-kidanemariam-resume.pdf" download`
  - Update the `experience` array bullet strings with the detailed resume wording
  - Add the 4th bullet to each experience entry where the resume has one

### Files Created (asset copies)
- `src/assets/huruy-headshot.jpg` (from uploaded photo)
- `public/resume/huruy-kidanemariam-resume.pdf` (from uploaded PDF)
