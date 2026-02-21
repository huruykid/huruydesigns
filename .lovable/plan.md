

## Fix: Image Flash on Case Study Pages

### Problem
When navigating to a case study (e.g., Beles), the hero section briefly shows the old static image from `project.image` before switching to the uploaded image from the database. This happens because:
- The component renders immediately with an empty `uploadedImages` state
- The database fetch runs after mount via `useEffect`
- Once the fetch completes, the state updates and the new image replaces the old one

### Solution
Add a `loading` flag to `ProjectPage.tsx` that starts as `true` and flips to `false` after the database fetch completes. While loading, show a skeleton/placeholder instead of any image in the hero area, preventing the old static image from flashing.

### Changes

**`src/pages/ProjectPage.tsx`**
1. Add a `loading` state: `const [loading, setLoading] = useState(true)`
2. Set `setLoading(false)` after the fetch completes (in both success and error paths)
3. Update the hero image rendering logic (around line 132-151) to show a skeleton placeholder while `loading` is `true`, instead of falling through to the static `project.image`
4. Update `getSlotImage` to only fall back to `project.sectionImages` when not loading

This is a minimal change -- just a boolean flag and a conditional render -- that eliminates the visual flash entirely.
