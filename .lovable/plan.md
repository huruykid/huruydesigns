

## Remove Public Image Upload from Case Studies

### What Changes

Strip out all user-facing upload functionality from the `ImageSlot` component. Images will only be updatable by you through Lovable. Visitors will see images if they exist, or a clean placeholder if not -- but no upload buttons, file inputs, or hover-to-upload interactions.

### Implementation Details

**File: `src/components/case-study/ImageSlot.tsx`**

- Remove all upload-related code: `useState`, `useRef`, `supabase` import, `toast` import, `Upload`/`Loader2` icons, `handleUpload` function, hidden file input, and the upload button overlay
- Remove the `projectId` and `onUploaded` props from the interface
- Keep the component as a simple display-only image slot:
  - If `imageSrc` exists: render the image in a styled container (unchanged visually)
  - If no `imageSrc`: render a static placeholder with the label (no "Click to upload" text, no click handler)

**File: `src/pages/ProjectPage.tsx`**

- Remove the `handleUploaded` callback and `onUploaded` from `slotProps`
- Remove `projectId` from `slotProps` and all `ImageSlot` usages
- Stop passing `onUploaded` and `projectId` to case study components

**Files: `src/components/case-study/FentFinderCaseStudy.tsx` and `src/components/case-study/BelesCaseStudy.tsx`**

- Remove `onUploaded` and `projectId` from their Props interfaces
- Remove those props from all `ImageSlot` usages within each file

### What Stays

- The database table and storage bucket remain intact so existing uploaded images continue to display
- The `getSlotImage` logic in `ProjectPage.tsx` still fetches images from the database -- images you've already uploaded will keep showing
- To update images in the future, you'll upload them directly through Lovable chat or manage them in the backend storage
