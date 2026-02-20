

## Fix Resume Download Button

The Resume buttons in the navigation bar (both desktop and mobile) are not wrapped in a link — they're plain buttons with no action. That's why clicking them does nothing.

The About page already has a working download button for reference.

### What will change

- **Desktop navbar Resume button**: Wrap it in a link pointing to your resume PDF so clicking it triggers a download
- **Mobile navbar Resume button**: Same fix for the mobile menu version

Both will link to `/resume/huruy-kidanemariam-resume.pdf` with a download attribute, matching what already works on your About page.

### Technical details

**File: `src/components/Navbar.tsx`**
- Wrap the desktop Resume `<Button>` (around line 41) in an `<a href="/resume/huruy-kidanemariam-resume.pdf" download>` tag
- Wrap the mobile Resume `<Button>` (around line 74) in the same `<a>` tag
