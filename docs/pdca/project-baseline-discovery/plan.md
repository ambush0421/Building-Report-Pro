# Plan: Project Baseline Discovery

## Goal
- `week4` 프로젝트의 현재 구조/운영 상태를 빠르게 온보딩 가능한 문서로 정리한다.
- 다음 PDCA feature 선정을 위한 기준선(현재 상태, 검증 상태, 리스크)을 만든다.

## Scope
- 코드베이스 핵심 흐름(라우팅, API, 데이터 흐름, 외부 의존성)을 파악한다.
- `docs/pdca/project-baseline-discovery/`에 PDCA 산출물 4종을 생성한다.
- 루트 `README.md`를 실제 프로젝트 상태에 맞게 업데이트한다.
- lint 검증 결과를 `check`/`report`에 기록한다.

## Non-goals
- 신규 기능 구현 또는 비즈니스 로직 변경.
- API 계약 변경 및 데이터 스키마 마이그레이션.
- 저장소 전역 lint debt(특히 `.bkit-codex` 포함 영역) 일괄 해소.

## Assumptions
- 저장소에는 이미 다수의 변경분이 존재하며, 본 작업은 문서 중심으로 최소 변경한다.
- 앱 본체 상태는 `src` 기준 lint로 검증 가능하다.
- 전역 lint는 현재 설정상 `.bkit-codex` 하위 코드까지 포함해 실패할 수 있다.

## Acceptance Criteria
- `docs/pdca/project-baseline-discovery/plan.md`가 생성된다.
- `docs/pdca/project-baseline-discovery/design.md`가 생성된다.
- `docs/pdca/project-baseline-discovery/tasks.md`가 생성되고 순서형 체크리스트가 반영된다.
- `docs/pdca/project-baseline-discovery/report.md`가 생성되고 검증 결과/리스크가 기록된다.
- `README.md`가 실제 프로젝트 구조/실행/환경변수 기준으로 업데이트된다.
- lint 검증 명령과 결과가 `report.md`에 명시된다.

## Risks / Dependencies
- 문서가 코드 변경 속도를 따라가지 못하면 빠르게 구식이 될 수 있다.
- 전역 lint 실패 원인이 앱 코드 외 영역(`.bkit-codex`)에 있어 CI 기준 혼선이 생길 수 있다.
- 외부 API 키/환경변수 설정 누락 시 런타임 동작 검증이 제한된다.
