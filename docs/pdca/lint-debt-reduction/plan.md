# Plan: Lint Debt Reduction

## Goal
- 전역 lint 실패 상태를 단계적으로 감축해, 신규 변경이 품질 저하를 만들지 않도록 안정적인 기준선(baseline)을 만든다.

## Scope
- 현재 lint 에러/경고를 유형별로 분류하고 우선순위를 확정한다.
- 1차로 빈도와 영향이 큰 규칙을 집중 정리한다:
  - `@typescript-eslint/no-explicit-any`
  - `@typescript-eslint/no-unused-vars`
- API 라우트와 핵심 대시보드 경로부터 단계적으로 수정한다.
- 각 배치마다 scoped lint로 회귀를 확인한다.

## Non-goals
- 기능 리팩터링/아키텍처 대개편.
- 디자인/UI 정책 변경.
- 모든 경고를 한 번에 0으로 만드는 빅뱅 접근.

## Assumptions
- 현재 전체 lint는 누적 기술부채로 인해 단번에 통과하기 어렵다.
- 기존 동작 보존이 우선이며, 타입 강화는 점진적 적용이 적합하다.
- lint 정리는 기능 작업과 분리된 feature로 운영하는 것이 충돌을 줄인다.

## Acceptance Criteria
- lint debt 전용 PDCA 문서 세트(`plan/design/tasks/report`)가 생성된다.
- lint 이슈 분류표(규칙/파일군/개수/우선순위)가 `design.md`에 정의된다.
- 1차 정리 배치의 대상 파일과 종료 기준이 명시된다.
- `check` 단계에서 실행 가능한 검증 명령(환경 변수 포함)이 문서화된다.
- 작업 완료 시점에 "수정 범위 기준 scoped lint 통과" 증빙이 `report.md`에 기록된다.

## Risks / Dependencies
- 타입 변경 과정에서 런타임 동작이 미세하게 변할 수 있다.
- 파일 충돌(동시 개발)로 lint 수치가 변동될 수 있다.
- 현재 셸 정책에서 Node 실행에 환경 변수 주입이 필요하다.
- 광범위 수정 시 리뷰 부담이 커질 수 있어 배치 단위 분할이 필수다.
