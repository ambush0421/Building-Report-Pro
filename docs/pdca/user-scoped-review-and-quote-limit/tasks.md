# Tasks: User-Scoped Review and Quote Limit

1. [x] `plan.md` 작성
2. [x] `design.md` 작성
3. [x] 사용자 스코프별 히스토리 키/로딩 로직 구현 (`page.tsx`)
4. [x] 검토 목록 탭을 사용자 히스토리 기반 리스트로 교체 (`SelectionPage.tsx`)
5. [x] 견적서 탭 카드 선택 최대 5개 제한 및 선택 카운터 구현 (`SelectionPage.tsx`)
6. [x] 히스토리 항목 메타데이터(`scale`, `totalUnits`, `usage`, `age`) 저장 반영
7. [x] 구버전 히스토리(`params` 누락) 데이터 호환 방어 로직 추가 (`page.tsx`, `SelectionPage.tsx`)
8. [ ] `npm.cmd run lint` 실행

## Validation Attempt Log
- 2026-02-19: `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134)
- 2026-02-19: 런타임 에러 수정 후 `npm.cmd run lint` 재실행 실패 (동일 assertion, exit code 134)
