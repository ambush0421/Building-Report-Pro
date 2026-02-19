# Report: Static Pages Unification

## What Changed
- Added shared static page wrapper:
  - `src/components/layout/StaticPageShell.tsx`
- Refactored informational pages to common shell:
  - `src/app/about/page.tsx`
  - `src/app/guide/page.tsx`
  - `src/app/privacy/page.tsx`
  - `src/app/terms/page.tsx`
- Normalized legal/info page typography and card/spacing rules to blue-slate design language.
- Replaced unreadable privacy/terms source text with readable Korean section-based content.

## How Verified
- Command:
  - `npx.cmd eslint src/components/layout/StaticPageShell.tsx src/app/about/page.tsx src/app/guide/page.tsx src/app/privacy/page.tsx src/app/terms/page.tsx`
- Result:
  - Passed (0 errors).

## Risks / Rollback Notes
- Privacy/terms copy was structurally rewritten for readability; legal review may still be required for policy accuracy.
- Changes are isolated to static pages and shared wrapper, with no business-logic impact.

## Next Actions
- Optional: apply same shell to other static routes if added later.
