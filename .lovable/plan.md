

## Plan

The homepage featured card and the case study hero for Asure Compliance have different `ResponsiveAppShell` dimensions:

| Prop | Homepage (ProjectCard) | Case Study (ProjectPage) |
|------|----------------------|--------------------------|
| desktopWidth | 480 | 580 |
| desktopHeight | 400 | 440 |

### Change

**`src/pages/ProjectPage.tsx` (line 198)**

Update the `ResponsiveAppShell` props to match the homepage:

```tsx
<ResponsiveAppShell label="Asure Compliance Engine" desktopWidth={480} desktopHeight={400} allowToggle>
```

This aligns both instances so the interactive preview looks identical on both the homepage and case study page.

