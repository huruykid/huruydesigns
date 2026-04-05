

## Declutter Project Cards

### Changes in `src/components/ProjectCard.tsx`

1. **Reduce tags to 3 max**: Change `project.tags.slice(0, featured ? 6 : 4)` to `project.tags.slice(0, 3)` for all cards (line 125)

2. **Increase spacing in text content area**:
   - Impact label: `mb-1` → `mb-2` (line 118)
   - Title: `mb-1` → `mb-2` (line 119)
   - Description: `mb-3` → `mb-4` for non-featured cards (line 120)
   - Tags container: add `mt-2` for featured cards (line 124)

3. **Add more padding to preview area**: Change `py-4` → `py-6` on the interactive preview container (line 44) to give demos more breathing room

4. **Increase text content padding**: Change `p-5` → `p-6` for non-featured cards and `md:p-8` → `md:p-10` for featured cards (line 117)

Single file change. No structural or behavioral modifications.

