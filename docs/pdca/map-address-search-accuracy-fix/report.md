# Report: Map Address Search Accuracy Fix

## Summary
- 주소 유형에 따라 geocode 후보 순서를 분기해 도로명 입력 시 좌표 오차 가능성을 줄였다.
- 서버 geocode에서 카카오 REST 키 인식 호환성을 늘리고, 건물명 키워드 보정의 신뢰도 조건을 강화했다.
- 지도 런타임에서도 카카오 SDK Geocoder로 주소를 재검증해 중심/대표 마커를 주소 기준으로 재정렬하도록 보완했다.
- 결과적으로 주소 검색 후 지도 중심/마커가 입력 주소와 어긋나는 케이스를 줄이는 방향으로 보완했다.

## Changed Files
1. `src/app/page.tsx`
2. `src/app/api/geocode/route.ts`
3. `src/components/dashboard/InvestmentMap.tsx`
4. `docs/pdca/map-address-search-accuracy-fix/plan.md`
5. `docs/pdca/map-address-search-accuracy-fix/design.md`
6. `docs/pdca/map-address-search-accuracy-fix/tasks.md`
7. `docs/pdca/map-address-search-accuracy-fix/report.md`

## Verification
- `npm.cmd run lint` 2회 실행 모두 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134)
