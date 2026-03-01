

## Plan: Make Asure Compliance Engine the Featured Case Study with Interactive Hero

### 1. Reorder projects array (`src/lib/projects.ts`)
Move the `asure-compliance` entry from index 3 to index 0. This makes it the featured project on the homepage (since `Index.tsx` renders `projects[0]` as featured).

### 2. Add interactive preview to homepage card (`src/components/ProjectCard.tsx`)
- Import `TaxComplianceDashboardDemo`
- Add `"asure-compliance": TaxComplianceDashboardDemo` to `demoComponents`
- Add `"asure-compliance"` to `responsiveProjects` set so it gets the `ResponsiveAppShell` with mobile/desktop toggle on the homepage card

### 3. Replace static hero with interactive dashboard on case study page (`src/pages/ProjectPage.tsx`)
- Replace the `AsureHeroCard` static component with a `ResponsiveAppShell` wrapping `TaxComplianceDashboardDemo` (similar to how `HeroPhoneMockup` works for OneAsure)
- Remove or keep `AsureHeroCard` as unused (can clean up)

### Files Modified
- `src/lib/projects.ts` — reorder array
- `src/components/ProjectCard.tsx` — add Asure to interactive demos
- `src/pages/ProjectPage.tsx` — swap static hero for interactive dashboard

