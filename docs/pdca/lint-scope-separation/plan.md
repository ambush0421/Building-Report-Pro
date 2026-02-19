# Plan: Lint Scope Separation

## Goal
- `npm run lint`가 현재 `week4` 앱 코드 기준으로 일관되게 통과하도록 lint 스캔 범위를 분리한다.

## Scope
- `eslint.config.mjs`에서 전역 ignore 정책을 조정한다.
- 외부/내장 보조 워크스페이스(`.bkit-codex`, `.agents`, `.codex`)를 lint 대상에서 제외한다.
- 변경 후 lint 검증(`npm run lint`, `npx eslint src`)을 수행한다.
- 결과를 PDCA 문서(`plan/design/tasks/report`)에 기록한다.

## Non-goals
- `.bkit-codex` 내부 코드 스타일/규칙 위반 수정.
- 앱 기능 로직 변경.
- 테스트 프레임워크 추가 또는 CI 파이프라인 대개편.

## Assumptions
- `.bkit-codex`는 이 앱과 별개 운영되는 내장 도구 워크스페이스다.
- 현재 pre-commit/CI는 `npm run lint`를 사용한다.
- 앱 본체 품질 기준은 `src` 중심 lint 결과다.

## Acceptance Criteria
- `docs/pdca/lint-scope-separation/`에 `plan.md`, `design.md`, `tasks.md`, `report.md`가 존재한다.
- `eslint.config.mjs`에서 도구성 디렉터리(`.bkit-codex`, `.agents`, `.codex`)가 ignore 처리된다.
- `npm run lint`가 성공(exit code 0)한다.
- `npx eslint src`가 성공(exit code 0)한다.
- `report.md`에 검증 명령과 결과가 기록된다.

## Risks / Dependencies
- ignore 범위가 과도하면 실제 관리 대상 파일을 놓칠 수 있다.
- 추후 lint 대상에 포함해야 하는 루트 파일이 생기면 예외 규칙 조정이 필요하다.
