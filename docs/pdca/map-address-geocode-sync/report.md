# Report: Map Address Geocode Sync

## Summary
- 주소 검색 후 지도 좌표 반영 누락을 보완하기 위해 클라이언트/서버 지오코딩 성공률을 함께 개선했다.
- 결과적으로 주소 선택 시 지도 중심/마커가 검색 주소로 반영될 확률을 높였다.

## Changes
1. `src/app/page.tsx`
   - 주소 후보 다중 지오코딩 함수(`resolveCoordsByAddressCandidates`) 추가
   - 우편번호 선택 완료 시 도로명/지번/통합 주소 후보 순차 재시도
   - 뒤로가기에서 `coords` 초기화 추가
2. `src/app/api/geocode/route.ts`
   - VWorld `ROAD` 실패 시 `PARCEL` 재시도
   - 최종 폴백으로 OSM Nominatim 추가

## Verification
- `npm.cmd run lint` 실행 시 런타임 assertion(`ncrypto::CSPRNG(nullptr, 0)`)으로 중단되어 정적 검증 미완료.
