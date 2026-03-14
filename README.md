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
- Admin pages are designed around a shared-password screen.
- API routes can use Supabase when env vars are present and fall back to in-memory mock data otherwise.

## Environment

Create `.env.local` with:

```bash
ADMIN_PASSWORD=replace-me
SUPABASE_URL=https://project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=replace-me
```

## Supabase Setup

Run the schema in [supabase/schema.sql](/Users/alekseybaksheyev/Documents/Playground/mdlinx-quiz/supabase/schema.sql).

## Notes

- Q7 is implemented as a required top-3 selection, with click order captured as the rough ranking.
- All fields are required before submission.
- Until Supabase credentials are present, the dashboard continues to show mock data so styling and chart logic remain testable.
