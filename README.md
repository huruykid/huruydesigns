# huruy.tech

Portfolio of Huruy Kidanemariam, Senior UX Designer and Builder. Live at [huruy.tech](https://huruy.tech).

React 18, TypeScript, Vite, Tailwind, framer-motion. Supabase (via Lovable Cloud) backs the chat assistant, the passcode-gated case study, and optional image overrides. Edited in [Lovable](https://lovable.dev/projects/7649d6eb-2ae5-4f89-a761-2fc1385366af); pushes to `main` sync back into Lovable and redeploy.

## Develop

```sh
npm ci
npm run dev          # http://localhost:8080
npm run check        # typecheck + lint + prompt freshness + unit tests
npm run build        # production build, then prerenders every public route into dist/
npm run test:e2e     # Playwright against `vite preview` (run `npm run build` first)
```

## Where things live

| What | Where |
| --- | --- |
| Resume facts (dates, titles, bullets, skills) | `src/lib/resume.ts`: the only place to edit them. Feeds the Resume, About and home pages, the Word export, and the chatbot prompt. |
| Case study data | `src/lib/projects.ts` (`gated` and `hidden` flags control listing, prerendering and the sitemap) |
| Case study layouts | `src/components/case-study/*` |
| Chatbot prompt | Generated: `npm run build:prompt` writes `supabase/functions/portfolio-chat/prompt.ts` from the two files above. CI-style check: `npm run check:prompt`. |
| Gated Asure narrative | `gated_content` table in Supabase, returned by the `verify-passcode` edge function after a correct passcode. It is not in this repo. |
| Per-route SEO | `src/components/SEO.tsx` at runtime; `scripts/prerender.mjs` bakes the same tags into static HTML at build time and writes `sitemap.xml`. Route list: `src/lib/routes.ts`. |
| Images | `public/images/**` as WebP. `scripts/optimize-images.mjs` converts new PNGs and regenerates `src/lib/imageDimensions.ts`. |

## Backend

Edge functions (`supabase/functions/`):

- `portfolio-chat`: streams answers from the Lovable AI gateway. Origin allow-list, per-IP and site-wide rate limits in `public.rate_limits`.
- `verify-passcode`: checks `CASE_STUDY_PASSCODE` and returns the gated narrative. 5 attempts per 15 minutes per IP.

Secrets live in Supabase (`CASE_STUDY_PASSCODE`, `LOVABLE_API_KEY`), never in the repo. The committed `.env` holds only the public Supabase URL, publishable key and the GA4 measurement id.

Migrations are in `supabase/migrations/`; the latest one is idempotent and documents the hardened state (owner-only image writes, rate limiting, no `access_requests`).
