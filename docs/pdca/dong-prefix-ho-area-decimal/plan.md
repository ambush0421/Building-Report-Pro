# Plan: Dong Prefix Ho Parsing & Decimal Area Display

## Goal
- `hoNm` 값의 접두사(`A-1003`, `B-1014`)를 동 필터에 반영해 `dongNm`이 동일해도 동 구분이 가능하도록 개선한다.
- 견적서/선택 UI의 평수 표시에서 소수점이 버려지지 않도록 건축물대장 원본 기반 소수점 정보를 유지한다.

## Scope
- `src/components/dashboard/SelectionPage.tsx`
- `src/components/dashboard/QuotationModal.tsx`
- `src/components/dashboard/UnitGridTable.tsx`
- `src/app/page.tsx`
