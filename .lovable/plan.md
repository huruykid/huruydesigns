

## Plan: Add headshot to hero section (desktop only)

### Change in `src/pages/Index.tsx`

1. **Import** the headshot: `import headshot from "@/assets/huruy-headshot.jpg"`

2. **Convert** the hero inner container (line 101-106) from a single `max-w-3xl` div to a **flex row layout**:
   - `flex flex-col md:flex-row md:items-center md:justify-between gap-10`
   - Text content stays in a `max-w-3xl` div (left side)
   - Headshot goes in a new div on the right, **hidden on mobile** (`hidden md:block`)

3. **Headshot element** (right side):
   - Large circular image (~250px) with `rounded-full object-cover object-top`
   - Subtle accent border (`border-4 border-accent/20`) and shadow (`shadow-2xl`)
   - Gentle float-in animation via `motion.div` (fade + slight scale)

This keeps mobile unchanged and fills the empty right side on desktop with a personal photo.

