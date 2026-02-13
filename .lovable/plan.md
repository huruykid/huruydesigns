

## Generate EBT Finder Thumbnail via AI

### Approach
Use the existing `generate-wireframe` edge function to generate a polished mockup image, then upload it to storage and update the project card's `image` field.

### Steps

**1. Call the edge function** with a detailed prompt describing a clean, professional mobile mockup of the EBT Finder app -- showing a map-based store search screen on a phone frame, with a modern UI, search bar, store pins, and a card list at the bottom.

**2. Upload the generated image** to the Supabase storage bucket so it persists as a permanent URL.

**3. Update `src/lib/projects.ts`** to point the `ebt-finder` project's `image` field to the new storage URL instead of the current placeholder or static file.

### Technical Details
- The `generate-wireframe` edge function already calls the Gemini 3 Pro image model via the AI Gateway
- The generated image comes back as a base64 data URL
- We will convert and upload it to a storage bucket (e.g., `case-study-images`) for a stable URL
- The prompt will request a device-framed mockup with a clean white/light background suitable for a card thumbnail at 16:10 aspect ratio

