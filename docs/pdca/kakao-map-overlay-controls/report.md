# Report: Kakao Map Overlay Controls

## Summary
- 지도 영역에 서비스형 컨트롤 오버레이(지역 브레드크럼, 날씨, 지도/스카이뷰, 로드뷰 버튼)를 추가했다.
- 역지오코드 응답에 지역명 필드를 보강해 브레드크럼 품질을 개선했다.

## Changed Files
1. `src/components/dashboard/InvestmentMap.tsx`
2. `src/app/api/geocode/route.ts`

## Verification
- `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134).
