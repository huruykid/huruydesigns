## Investigation: Word Document Download for Resume

### Can we generate a .docx that matches the PDF exactly?

**Short answer: Not exactly, but close enough to be professional.**

### Options Analyzed

**Option A: Static .docx file in `/public**` (like the current PDF approach)

- You'd create the Word file manually and upload it
- Guaranteed formatting control
- But requires manual updates whenever resume content changes

**Option B: Dynamic .docx generation using the `docx` npm library**

- The `docx` package can create Word documents client-side in the browser
- We can replicate the resume structure: headings, bullet points, two-column layout, skills pills, contact info
- **Limitation**: Word's rendering engine differs from HTML/CSS — it won't be pixel-identical to the PDF, but it can match the content, hierarchy, and general layout closely
- Two-column layouts in Word use tables or sections with columns, which work but aren't as flexible as CSS flexbox

### Recommendation

**Option B (dynamic generation)** is the better fit because:

- Resume data is already structured in code — we just map it to `docx` paragraphs/tables
- No manual file maintenance
- Content stays in sync automatically

### Plan

1. **Install `docx` and `file-saver` packages** for Word document generation and download
2. **Create a `generateResumeDocx` utility** (`src/lib/generateResumeDocx.ts`) that:
  - Builds a two-column layout using a Word table (sidebar | main content)
  - Includes: name, title, contact links, summary, experience with bullets, leadership, skills groups, education, side projects
  - Applies consistent fonts (Calibri/Arial) and styling to approximate the PDF look
3. **Add a "Download Word" button** next to the existing PDF/print buttons on the Resume page

### What will match the PDF

- All content, section order, and hierarchy
- Two-column structure (sidebar + main)
- Bold headings, bullet points, skill groupings

### What will differ slightly

- Exact spacing, font rendering, and pixel precision (inherent Word vs PDF difference)
- Skill "pills" will render as comma-separated or bracketed text rather than styled badges.   
  
make sure you allow users to download both versions. in a way that is user friendly for all equipment types. 