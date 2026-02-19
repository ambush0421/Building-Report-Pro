# Design: Standalone Routes Unification

## Architecture Overview
- Keep route-level data fetch logic intact.
- Replace ad-hoc UI wrappers with consistent:
  - soft gradient page background
  - compact branded header
  - rounded card-like action controls

## Data Model / Schema
- No data schema changes.
- Route-level type helper for report row shape:
  - `analysis_data?: unknown`
  - `building_data?: unknown` (legacy fallback)

## APIs / Interfaces
- No API contract changes.
- `SharePage` metadata and render remain server components.
- `ReportDetailPage` remains client-side with Supabase fetch.

## UI Flow
- Loading state: centered spinner card.
- Missing data: centered message card with clear CTA back to home/dashboard.
- Report state: sticky top action/header row + constrained report content width.

## Edge Cases
- Legacy record without `analysis_data` should still render via `building_data`.
- Missing report ID should not crash; show fallback state.

## Test Plan
- Run scoped lint:
  - `npx.cmd eslint src/app/share/[id]/page.tsx src/app/report/[id]/page.tsx`
- Manual smoke by opening a valid and invalid report/share URL.
