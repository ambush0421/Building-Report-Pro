# Report: Standalone Routes Unification

## What Changed
- Refactored shared report page:
  - `src/app/share/[id]/page.tsx`
  - Consistent header, CTA button, loading/not-found tone.
  - Metadata copy normalized to readable Korean.
- Refactored report detail route:
  - `src/app/report/[id]/page.tsx`
  - Unified loading/error/success shells.
  - Legacy payload fallback: `analysis_data ?? building_data`.
  - Removed alert/redirect dependency for failure path in favor of stable error UI.

## How Verified
- Command:
  - `npx.cmd eslint "src/app/share/[id]/page.tsx" "src/app/report/[id]/page.tsx"`
- Result:
  - Passed (0 errors).

## Risks / Rollback Notes
- `ReportView` is unchanged and still the rendering dependency.
- If a row has both payload fields empty, route now shows a graceful error card.

## Next Actions
- Optional: align `src/app/report/page.tsx` visual style in a separate scoped pass.
