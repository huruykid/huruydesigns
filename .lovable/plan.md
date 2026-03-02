## Plan: Request-Access Gate for Asure Compliance Case Study

### How it works

1. **Visitor arrives at `/project/asure-compliance**` → sees a teaser (title, role, tags, a brief blurb) and a "Request Access" form (name + email)
2. **Visitor submits request** → row saved to a new `access_requests` table in the database
3. **You get notified** → an edge function sends you an email (or you check the database) with the requester's info
4. **You approve** → you update the row's `status` to `approved`, which generates a unique token
5. **Approved visitor uses their token link** (e.g. `/project/asure-compliance?token=abc123`) → full case study is revealed  
6. users can see blurred out parts of the case study that hides propiertary infomraiton. imags etc. send me an email to view full case study. 

### Database

Create an `access_requests` table:

- `id` (uuid, PK)
- `name` (text)
- `email` (text)
- `project_id` (text, default `'asure-compliance'`)
- `status` (text: `pending` | `approved` | `denied`, default `pending`)
- `token` (uuid, auto-generated, unique)
- `created_at` (timestamptz)
- RLS: public INSERT (name + email only), SELECT only if token matches

### Edge function: `notify-access-request`

- Triggered by the frontend after a request is submitted
- Sends you a notification (email via Resend or a simple webhook/Slack ping — we'll decide based on what you prefer)
- Alternatively, you just check the database periodically

### Frontend changes

`**src/pages/ProjectPage.tsx**`:

- Before rendering the Asure Compliance case study, check for a valid `?token=` in the URL
- If no token or invalid token → show the **teaser + request form**
- If valid token → render the full case study as-is

**New component: `AccessGate.tsx**`:

- Teaser card showing project title, role, tags, "This case study contains proprietary work and is available by request"
- Simple form: name, email, submit button
- Success state: "Request submitted — you'll receive an email with access once approved"

### Approving requests

Since this is your portfolio and you're the only admin, you can approve requests directly from the database backend. When you set `status = 'approved'`, the visitor's token link becomes active. Optionally, we can build a small admin view later.

### What your Asure coworkers see

- The case study is **removed from the homepage project grid** (filtered out of the public list)
- If they find the direct URL, they see only the teaser + request form
- They'd have to request access and you'd have to approve it

### Files to create/modify


| File                                                | Change                                             |
| --------------------------------------------------- | -------------------------------------------------- |
| DB migration                                        | Create `access_requests` table with RLS            |
| `src/components/AccessGate.tsx`                     | New — teaser + request form                        |
| `src/pages/ProjectPage.tsx`                         | Add token validation + gate for `asure-compliance` |
| `src/pages/Index.tsx` or `src/lib/projects.ts`      | Hide `asure-compliance` from public project list   |
| `supabase/functions/notify-access-request/index.ts` | New — sends you a notification on new request      |
