# Plan: Standalone Routes Unification

## Goal
- Improve consistency of standalone report routes by aligning `share/[id]` and `report/[id]` with the blue-slate design language.

## Scope
- Refactor:
  - `src/app/share/[id]/page.tsx`
  - `src/app/report/[id]/page.tsx`
- Normalize broken/garbled UI copy in these two routes.

## Non-goals
- No change to report generation logic.
- No change to dashboard compare/report authoring flows.
- No DB schema changes.

## Assumptions
- Supabase `reports` table stores report payload in `analysis_data` (with possible legacy `building_data` fallback).
- `ReportView` continues to be the report rendering source.

## Acceptance Criteria
- Both routes use coherent, consistent shell/header/button styles.
- Not-found and loading states are visually aligned and readable.
- Korean labels/messages are readable.
- Scoped lint passes for touched files.

## Risks / Dependencies
- Legacy rows may have mixed payload keys; route should keep fallback handling.
- Full repo lint remains out of scope due existing lint debt.
