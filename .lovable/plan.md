

# Direct Image Upload for Case Study Slots

## Overview
Replace the current chat-based image workflow with a direct upload button on each image slot. You'll be able to click an upload button on any empty (or filled) image slot, pick a file, and it uploads to cloud storage instantly -- no more going through the chat.

## How It Works

1. **Storage bucket** -- Create a `case-study-images` public storage bucket to hold uploaded images.

2. **ImageSlot gets an upload button** -- Each image slot will show an "Upload" button (camera/upload icon). Clicking it opens a file picker. The selected image uploads to storage under `{projectId}/{slotName}.png` and the URL is saved to a `case_study_images` database table.

3. **Database table** -- A simple `case_study_images` table stores the mapping:
   - `project_id` (text) -- e.g. "ebtfinder"
   - `slot` (text) -- e.g. "feature-search"  
   - `image_url` (text) -- the public storage URL
   - Primary key on (project_id, slot)

4. **No auth required** -- Since this is your portfolio site (not a multi-user app), RLS will allow public read and unrestricted insert/update so you can upload without needing login.

5. **Image priority** -- The system will check the database first for an uploaded image, then fall back to the static file in `public/images/`, then show the empty placeholder.

## Technical Details

### New/Modified Files

| File | Change |
|------|--------|
| **DB migration** | Create `case_study_images` table + `case-study-images` storage bucket with public access |
| `src/components/case-study/ImageSlot.tsx` | Add file input + upload logic using storage client. Show upload button overlay on hover. |
| `src/pages/ProjectPage.tsx` | Fetch uploaded image URLs from the database table; merge with static `sectionImages` and pass to `ImageSlot`. |
| `src/lib/projects.ts` | No changes needed -- static mappings remain as fallback. |

### Upload Flow
1. User clicks upload icon on any image slot
2. File picker opens (accepts image types)
3. File uploads to storage bucket at path `{projectId}/{slot}.png`
4. Public URL is upserted into `case_study_images` table
5. Image displays immediately

### Cleanup
- The `/generate-wireframe` page and edge function can be removed afterward since you'll upload images directly.

