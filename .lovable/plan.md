

# Generate Annotated Wireframe Image for EBT Finder

## Approach

Use the Lovable AI image generation (Nano banana pro model for higher quality) via an edge function to generate an annotated wireframe-style image of the EBT Finder mobile screen, then save it to the project and wire it up.

## Steps

### 1. Create an edge function to generate the image

**File: `supabase/functions/generate-wireframe/index.ts`**

- Call the Lovable AI Gateway with `google/gemini-3-pro-image-preview` (higher quality model)
- Prompt: A clean, annotated mobile wireframe sketch showing an EBT store finder app with callout annotations connecting research insights to UI features:
  - Map view with store pins -> "Users need visual location context"
  - Search bar with filters -> "USDA site is cluttered and hard to navigate"
  - Hot food toggle filter -> "Users don't know where to buy hot food with EBT"
  - Store card with photo, rating, reviews -> "Users need trust signals before visiting"
  - EBT accepted badge -> "Uncertainty about which stores accept EBT"
- Return the base64 image data

### 2. Create a simple admin page/button to trigger generation

**File: `src/pages/GenerateWireframe.tsx`**

- A simple page with a "Generate" button
- Calls the edge function, receives the base64 image
- Displays the result for review
- Provides a download link so the image can be saved

### 3. Save the generated image and update mappings

- Save the downloaded image to `public/images/ebtfinder/wireframes.png`
- Add `"wireframes": "/images/ebtfinder/wireframes.png"` to `sectionImages` in `src/lib/projects.ts`

### 4. Clean up

- Remove the temporary generate page and edge function after the image is created (they're one-time-use)

## Technical Notes

- The `LOVABLE_API_KEY` secret is already configured
- Lovable Cloud needs to be enabled for the edge function (will verify during implementation)
- Using `google/gemini-3-pro-image-preview` for best image quality
- The generated image will be a stylized wireframe illustration, not a pixel-perfect Figma mockup

