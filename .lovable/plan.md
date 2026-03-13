

## Make Passcode Case-Insensitive

### Change in `supabase/functions/verify-passcode/index.ts`

Line 34: Change the comparison to use `.toLowerCase()` on both sides:

```typescript
const valid = passcode.trim().toLowerCase() === expectedPasscode.trim().toLowerCase();
```

Single-line change, no other files affected.

