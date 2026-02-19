# Tasks: Map Address Geocode Sync

1. [x] `plan.md` 작성
2. [x] `design.md` 작성
3. [x] 주소 후보 다중 재시도 로직을 `page.tsx`에 반영
4. [x] `geocode` API 주소 변환 폴백 우선순위 확장 (VWorld ROAD/PARCEL + Nominatim)
5. [x] 뒤로가기 시 `coords` 초기화 반영
6. [ ] `npm.cmd run lint` 실행

## Validation Attempt Log
- 2026-02-17: `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134).
