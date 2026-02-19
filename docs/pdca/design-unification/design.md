# Design: Design Unification

## Architecture Overview
- Use a shared visual system in existing Tailwind classes:
  - neutral base: `slate` surfaces with subtle borders
  - single accent family: `blue` for primary actions/highlights
  - consistent radii/elevation: rounded-xl/2xl and soft shadows
- Keep changes localized to composition/shell components rather than rewriting all child widgets.

## Data Model / Schema
- No data model changes.

## APIs / Interfaces
- No API or prop contract changes expected.
- Existing component interfaces remain intact.

## UI Flow
- Landing:
  - Hero, features, stats, how-it-works, testimonials, FAQ, CTA share one tone.
- Dashboard shell:
  - Top nav, sidebar, subheader, and content container share same surface treatment.
- Dashboard page:
  - Loading, unauthenticated state, and main action buttons follow same style language.

## Edge Cases
- Mobile layouts keep current responsive breakpoints.
- Auth/no-data states should remain legible and visually aligned with the shell.
- Ensure sticky header/step indicator still layer correctly.

## Test Plan
- Static checks:
  - `npm run lint`
- Manual smoke:
  - landing renders without broken layout
  - open dashboard (auth and unauth paths)
  - step indicator and shell header spacing remain correct
  - primary buttons remain visually distinct and readable
