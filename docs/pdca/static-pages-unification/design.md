# Design: Static Pages Unification

## Architecture Overview
- Add a reusable `StaticPageShell` component under `src/components/layout/`.
- Pass page-specific icon/title/description through props.
- Keep page body content as children for flexibility.

## Data Model / Schema
- No data model updates.

## APIs / Interfaces
- New interface:
  - `StaticPageShellProps`
    - `icon: ReactNode`
    - `title: string`
    - `description?: string`
    - `children: ReactNode`
    - `contentClassName?: string`

## UI Flow
- Shared structure:
  - top back-link header
  - centered card container
  - icon + title + subtitle hero row
  - body content section
- About/Guide: concise list-style content.
- Privacy/Terms: readable sectioned prose with list blocks.

## Edge Cases
- Mobile spacing should collapse cleanly (`px-4`, responsive paddings).
- Long legal content should remain readable with bounded width.

## Test Plan
- Run scoped lint:
  - `npx.cmd eslint` on touched static pages + shell component.
- Manual visual check (expected by user after merge).
