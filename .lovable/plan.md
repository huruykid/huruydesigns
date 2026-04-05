

## Add Anchor Link from Bio to UX Trivia

### Changes in `src/pages/About.tsx`

1. **Add `id` to trivia section** (~line 161): Add `id="ux-trivia"` to the trivia `<section>` element

2. **Append sentence to bio paragraph** (~line 104): Add to the end of the bio `<p>`:
   ```tsx
   {" "}When I'm not simplifying complex workflows, I'm probably building silly things like{" "}
   <a href="#ux-trivia" className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">
     this UX trivia game
   </a>.
   ```

3. **Add smooth scroll CSS** in `src/index.css` (if not already present):
   ```css
   html { scroll-behavior: smooth; }
   ```

Single file change (plus a one-line CSS addition if needed). No structural modifications.

