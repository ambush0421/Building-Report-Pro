# Plan: Design Unification

## Goal
- Improve perceived design quality by applying one consistent visual language across key customer-facing screens.

## Scope
- Update visual consistency for:
  - `src/app/page.tsx` landing composition
  - landing section components under `src/components/landing/*`
  - shared shell in `src/components/dashboard/DashboardShell.tsx`
  - dashboard entry screen `src/app/dashboard/page.tsx`
- Align spacing, borders, radius, elevation, and accent usage.

## Non-goals
- No data-flow/API/business-logic changes.
- No redesign of deep analytic widgets/charts behavior.
- No copy/content rewrite beyond minor UI labels when required by layout.

## Assumptions
- Existing Tailwind v4 setup remains the styling foundation.
- We can standardize around the current blue/slate brand direction.
- Accessibility should not regress (contrast/focus visibility maintained).

## Acceptance Criteria
- All updated sections share a consistent palette and surface style (background, border, radius, shadow).
- No mixed competing visual languages (e.g., neobrutal blocks alongside soft cards) in the updated scope.
- Landing and dashboard top-level shells feel visually related.
- Existing flows still work: search, dashboard entry, report selection, calculator toggle.
- `npm run lint` passes.

## Risks / Dependencies
- Some legacy components may still retain older styling outside scoped files.
- Korean text encoding issues in existing files are out of scope for this change.
- Visual consistency is subjective; this pass targets major mismatches first.
