# Report: Kakao Map Fullscreen Fix

## Summary
- 카카오 지도 렌더 경로를 appkey 기반 로더로 교체해 빈 화면 가능성을 줄였습니다.
- 카카오 로딩 실패 시 OpenStreetMap 폴백 안내를 명확히 했습니다.
- 지도 카드에 전체화면 토글(열기/해제)과 ESC 닫기를 추가했습니다.

## Changed Files
1. `src/components/dashboard/InvestmentMap.tsx`
2. `src/components/dashboard/OpenStreetMap.tsx`
3. `src/types/kakao.d.ts`

## Verification
- `npm.cmd run lint` 실행 결과: Node 런타임 assertion (`ncrypto::CSPRNG(nullptr, 0)`)으로 종료(code 134).
- 런타임 환경 이슈로 lint 기반 정적 검증은 완료하지 못함.
