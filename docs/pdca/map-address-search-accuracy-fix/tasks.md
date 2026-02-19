# Tasks: Map Address Search Accuracy Fix

1. [x] `plan.md` 작성
2. [x] `design.md` 작성
3. [x] `page.tsx` 주소 후보 우선순위를 도로명/지번 분기로 개선
4. [x] `geocode/route.ts` 카카오 REST 키 fallback 환경변수 지원
5. [x] `geocode/route.ts` 건물명 키워드 정밀화 오탐 억제 기준 강화
6. [x] `InvestmentMap.tsx`에 카카오 SDK `Geocoder` 기반 주소 재정렬 안전장치 추가
7. [ ] `npm.cmd run lint` 실행

## Validation Attempt Log
- 2026-02-19: `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134).
- 2026-02-19: 코드 수정 후 `npm.cmd run lint` 재실행 실패 (동일 Node assertion, exit code 134).
