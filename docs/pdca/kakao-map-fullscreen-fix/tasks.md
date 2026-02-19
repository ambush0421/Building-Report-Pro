# Tasks: Kakao Map Fullscreen Fix

1. [x] `plan.md` 작성
2. [x] `design.md` 작성
3. [x] `InvestmentMap.tsx`의 카카오 SDK 로더를 `useKakaoLoader` 기반으로 정리
4. [x] 카카오 로더 실패 시 OSM 폴백 메시지/동선 보강
5. [x] Kakao/OSM 전체화면 토글 UI 및 ESC 닫기 추가
6. [x] OSM 초기화 에러 표시 및 재사이즈 안정화 보강
7. [ ] `npm.cmd run lint` 실행

## Validation Attempt Log
- 2026-02-17: `npm.cmd run lint` 실행 시 Node 런타임 assertion (`ncrypto::CSPRNG(nullptr, 0)`)으로 종료(code 134). 환경 이슈로 검증 미완료.
