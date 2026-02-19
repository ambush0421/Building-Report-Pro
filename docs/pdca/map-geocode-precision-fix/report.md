# Report: Map Geocode Precision Fix

## Summary
- 주소 기반 좌표 매칭 정확도를 높이기 위해 geocode 우선순위와 문서 선택 로직을 강화했다.
- 건축물대장 주소 수신 후 좌표를 한 번 더 정밀화해 지도 위치 보정을 수행하도록 개선했다.
- 건물명 기반 카카오 키워드 정밀화 단계를 추가해 동일 번지대 인근 오차를 줄였다.

## Changed Files
1. `src/app/api/geocode/route.ts`
2. `src/app/page.tsx`

## Verification
- `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134).
