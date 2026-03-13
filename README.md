# MDLinx AI Readiness Quiz

Fresh Next.js App Router scaffold for the MDLinx respondent quiz and admin dashboard.

## Run

```bash
npm install
npm run dev
```

## Current Status

- App structure matches the planned routes and component folders.
- Branding tokens, typed question model, stepped quiz shell, and dashboard placeholders are in place.
- API routes use an in-memory fallback so the flow is testable before database wiring.

## Still To Confirm

1. Final 10-question copy and exact answer options.
2. Database choice: Vercel Postgres vs Supabase.
3. Admin protection: simple password gate, Vercel Auth, or another private access method.
4. Whether respondents should be allowed to skip open-ended questions.
