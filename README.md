# MDLinx AI and Media Strategy Assessment

Next.js App Router app for the MDLinx assessment experience and admin dashboard.

## Run

```bash
npm install
npm run dev
```

## Current Status

- App structure matches the planned routes and component folders.
- Branding tokens, expanded question model, stepped quiz shell, and MDLinx-specific dashboard views are in place.
- Admin pages are designed around a shared-password screen.
- API routes can use Supabase when env vars are present and fall back to in-memory mock data otherwise.
- The admin dashboard can layer in AI-generated analysis when OpenAI credentials are configured.

## Environment

Create `.env.local` with:

```bash
ADMIN_PASSWORD=replace-me
SUPABASE_URL=https://project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=replace-me
OPENAI_API_KEY=replace-me
OPENAI_MODEL=gpt-4o-mini
```

## Supabase Setup

Run the schema in [supabase/schema.sql](/Users/alekseybaksheyev/Documents/Playground/mdlinx-quiz/supabase/schema.sql).

## Notes

- Q10 is implemented as a required top-3 selection, with click order captured as the rough ranking.
- All fields are required before submission.
- Scale questions include explicit instructions plus low/high labels in the UI.
- Until Supabase credentials are present, the dashboard continues to show mock data so styling and chart logic remain testable.
- Until `OPENAI_API_KEY` is present, the dashboard falls back to deterministic strategy signals instead of AI-generated analysis.
