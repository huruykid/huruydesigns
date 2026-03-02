

## Plan: Add AI skill group to resume sidebar

Add a new "AI" group to the `skillGroups` array in `src/pages/Resume.tsx` (line 42, before the closing bracket). Suggested skills for a UX designer leveraging AI:

- **Prompt Engineering** — crafting effective prompts for design/dev tools
- **AI Prototyping** — using AI-assisted tools (Lovable, Cursor, v0) to rapidly build
- **LLM Integration** — incorporating AI models into product workflows
- **AI-Assisted Research** — using AI for synthesis, affinity mapping, survey analysis

### Change

**`src/pages/Resume.tsx`** (~line 42): Add a new entry to `skillGroups`:

```ts
{ label: "AI", skills: ["Prompt Engineering", "AI Prototyping", "LLM Integration", "AI-Assisted Research"] }
```

This slots in naturally with the existing pill layout and requires no structural changes. Feel free to adjust the specific skill names if you'd prefer different wording.

