

## Plan: Replace Request-Access Gate with Passcode Entry

### What changes
Replace the current name/email request form in `AccessGate.tsx` with a simple passcode input. The user enters a passcode, it's checked against a hardcoded value stored as an environment variable (edge function), and if correct, the case study is unlocked immediately — no database, no Slack notifications, no approval flow.

### Implementation

1. **Create a new edge function `verify-passcode/index.ts`**
   - Accepts `{ passcode, project_id }` in the request body
   - Compares against a secret `CASE_STUDY_PASSCODE` stored in backend secrets
   - Returns `{ valid: true }` or `{ valid: false }`

2. **Add the `CASE_STUDY_PASSCODE` secret** via the secrets tool (will prompt you to enter the value)

3. **Rewrite `AccessGate.tsx`**
   - Remove the name/email form, Supabase insert, and Slack notification call
   - Replace with a single passcode input field + submit button
   - On submit, call the `verify-passcode` edge function
   - On success, call a callback to unlock the case study (store in `sessionStorage` so it persists during the browsing session)
   - Keep all the existing teaser content (prototype, diagrams, stats, before/after) above the form

4. **Update `ProjectPage.tsx` access check**
   - Remove the token-based `useEffect` that queries `access_requests`
   - Instead, check `sessionStorage` for a flag like `access_granted_asure-compliance`
   - Pass an `onAccessGranted` callback to `AccessGate` that sets this flag and flips the state

### What stays the same
- All teaser/preview content in AccessGate (interactive prototype, entity diagram, state machine, before→after)
- The gated project list (`GATED_PROJECTS`)
- The `access_requests` table and edge functions remain in the database/deployed but are no longer called from the UI

### Technical detail
- The passcode is never exposed client-side — validation happens server-side in the edge function
- `sessionStorage` means the unlock lasts for the browser tab session only (closing the tab requires re-entry)

