

## Hero Image Beside Title on Desktop

### Layout Change
On desktop, the hero section will become a two-column layout: title/description on the left, hero image on the right. On mobile, the image stays below the title as it does now.

### Changes

**`src/pages/ProjectPage.tsx` (lines 64-101)**
- Merge the hero text section and hero image into a single `section`
- Use a responsive grid: `grid grid-cols-1 lg:grid-cols-2 gap-8` inside the hero `section`
- Left column: existing title, description, role/timeline, tools, and challenge card
- Right column: the hero `ImageSlot` (or fallback image)
- Remove the separate `{/* Hero Image */}` div below the section since it moves inline
- On mobile (`grid-cols-1`), the image naturally stacks below the text

### Visual Result

```text
Desktop:
+---------------------------+-------------------+
| Back to Projects          |                   |
| UX CASE STUDY             |   [Hero Image]    |
| EBT Finder                |                   |
| Description text...       |                   |
| Role | Timeline           |                   |
| [tags]                    |                   |
| Challenge card            |                   |
+---------------------------+-------------------+

Mobile:
+---------------------------+
| Back to Projects          |
| UX CASE STUDY             |
| EBT Finder                |
| Description...            |
| Role | Timeline           |
| [tags]                    |
| Challenge card            |
+---------------------------+
| [Hero Image]              |
+---------------------------+
```

### Technical Details
- The hero image column will use `flex items-center` to vertically center the image beside the text
- The `max-h-[600px]` constraint on the image remains via `ImageSlot`
- The `-mt-2 mb-16` container for the old hero image section is removed since it merges into the hero section
- The `max-w-2xl` on the description and challenge card stays so text doesn't stretch too wide in its column

