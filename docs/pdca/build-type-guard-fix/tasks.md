# Tasks: Build Type Guard Fix

1. [x] `plan.md`에 목표/범위/수용기준/리스크를 정의한다.
2. [x] `design.md`에 타입 좁히기 구조와 검증 계획을 설계한다.
3. [x] `src/app/api/building-report-v2/route.ts`에 결과 union 타입을 도입한다.
4. [x] 성공/실패 판별 type guard를 추가해 `validBuildings`를 안전하게 좁힌다.
5. [ ] 변경 파일 lint를 통과한다. (현재 실행 환경 Node `ncrypto::CSPRNG` 오류로 검증 보류)
6. [ ] 전역 `npm run lint`를 통과한다. (현재 실행 환경 Node `ncrypto::CSPRNG` 오류로 검증 보류)
7. [ ] `npm run build`를 실행해 기존 타입 오류 해소를 확인한다. (현재 실행 환경 Node `ncrypto::CSPRNG` 오류로 검증 보류)
8. [x] `report.md`에 변경점/검증결과/리스크/다음 액션을 기록한다.
