

## Replace Skill Lists with Chip Layout

### Change in `src/pages/Index.tsx`

In the Skills & Tools section, replace the `<ul>` / `<li>` list with a flex-wrap chip layout:

**Before (~lines 179-183):**
```tsx
<ul className="space-y-1.5">
  {cat.skills.map((s) => (
    <li key={s} className="text-sm text-muted-foreground">{s}</li>
  ))}
</ul>
```

**After:**
```tsx
<div className="flex flex-wrap gap-2">
  {cat.skills.map((s) => (
    <span key={s} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
      {s}
    </span>
  ))}
</div>
```

Also adjust heading margin from `mb-3` to `mb-4` for balanced spacing above chips.

Single file, single section change.

