# Report: Roadview Feature

## Summary
- 카카오 지도 카드에 `지도/로드뷰` 전환 기능을 추가했다.
- 전체화면 모드와 함께 로드뷰도 동일 카드 안에서 사용할 수 있게 했다.
- 로드뷰 미제공 위치, 카카오 로드 실패, 키 미설정 케이스의 안내를 보강했다.

## Changed Files
1. `src/components/dashboard/InvestmentMap.tsx`
2. `src/types/kakao.d.ts`

## Verification
- `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134).
