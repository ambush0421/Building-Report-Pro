# Tasks: Lint Debt Reduction

1. [x] `plan.md`에 목표/범위/수용기준/리스크를 정의한다.
2. [x] `design.md`에 lint 이슈 분류표와 우선순위 배치를 설계한다.
3. [x] 배치별 타입/unused-vars/no-explicit-any 이슈를 정리한다. (Batch A~H 수행)
4. [x] 수정 범위 기준 scoped lint를 통과시킨다.
5. [x] 전역 `npm run lint`를 통과시킨다. (0 errors, 0 warnings)
6. [x] `docs/pdca/lint-debt-reduction/lint-report.json`을 최신 결과로 갱신한다.
7. [x] `report.md`에 최종 변경점/검증결과/잔여 리스크를 기록한다.
8. [x] `eslint.config.mjs`의 완화 규칙(`warn`)을 `error`로 복원하고 lint 재검증을 통과한다.
9. [x] pre-commit lint 훅(`husky`)을 추가한다.
10. [x] PR/기본 브랜치 lint 워크플로(`.github/workflows/lint.yml`)를 추가한다.
11. [x] 훅/워크플로 추가 후 `npm run lint` 재검증을 통과한다.
