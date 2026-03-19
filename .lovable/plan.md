

## Front-End SEO & UX Improvements

### 1. Hero H1 Update (`src/pages/Index.tsx`, lines 122-126)
Change the heading to:
```
Hi, I'm Huruy Kidanemariam.
I'm a UX Designer & Software Developer building experiences that matter.
```
Use `text-gradient` on "Huruy Kidanemariam", keep "matter" italic. Reduce font size slightly on smaller text to maintain visual balance (e.g., `text-4xl sm:text-5xl lg:text-6xl` for the second line).

### 2. Footer Copyright (`src/components/Footer.tsx`)
Change `© {year} Huruy. All rights reserved.` to `© {year} Huruy Kidanemariam | UX Designer. All rights reserved.`

### 3. Navigation Contact CTA (`src/components/Navbar.tsx`)
Style the "Contact" link in both desktop and mobile nav as a solid orange button (matching the Resume button style: `bg-accent text-accent-foreground hover:bg-accent/90`). Move it next to the Resume button in the desktop nav. Use `variant="outline"` or similar differentiation so both buttons don't look identical (Contact = solid accent, Resume = outline or vice versa).

### 4. Image Alt Text Improvements
| File | Current Alt | New Alt |
|------|------------|---------|
| `HeroPongGame.tsx` (line 228) | "Huruy" | "Huruy Kidanemariam, UX Designer and Software Developer" |
| `OGImage.tsx` (line 82) | "Huruy Kidanemariam" | "Huruy Kidanemariam, UX Designer and Product Designer headshot" |
| `ProjectCard.tsx` (line 95) | `project.title` | `"UX case study: {project.title} by Huruy Kidanemariam"` |
About.tsx and Resume.tsx already have good alt text.

### 5. Project Card Impact Visibility (`src/components/ProjectCard.tsx`, line 115)
Make the impact line more prominent on featured cards:
- Increase size to `text-sm` (from `text-xs`) on featured cards
- Add a subtle accent background pill/badge style: `inline-block bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold`
- This makes "Re-Architecting Enterprise Payroll Compliance" and "Redesigned for 12M+ SNAP users" scannable at a glance

### Files Changed
- `src/pages/Index.tsx` (hero H1)
- `src/components/Footer.tsx` (copyright)
- `src/components/Navbar.tsx` (Contact CTA button)
- `src/components/HeroPongGame.tsx` (alt text)
- `src/pages/OGImage.tsx` (alt text)
- `src/components/ProjectCard.tsx` (alt text + impact badge)

