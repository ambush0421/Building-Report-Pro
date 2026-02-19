# Plan: Static Pages Unification

## Goal
- Unify visual style across static informational pages (`about`, `guide`, `privacy`, `terms`) to match the updated product tone.

## Scope
- Refactor:
  - `src/app/about/page.tsx`
  - `src/app/guide/page.tsx`
  - `src/app/privacy/page.tsx`
  - `src/app/terms/page.tsx`
- Introduce a shared layout wrapper for static pages.

## Non-goals
- No routing changes.
- No authentication/business logic changes.
- No backend/API changes.

## Assumptions
- Existing brand direction is blue/slate with soft card surfaces.
- Static pages can share one shell while keeping page-specific content.

## Acceptance Criteria
- All 4 pages use the same shell and spacing/elevation rules.
- Back navigation, heading area, and content container look consistent.
- Privacy/terms text renders as readable Korean (no mojibake in source).
- Lint passes for changed files.

## Risks / Dependencies
- Legal copy accuracy is not legal-reviewed in this engineering pass.
- Repo-wide lint debt exists, so verification must be scoped to touched files.
