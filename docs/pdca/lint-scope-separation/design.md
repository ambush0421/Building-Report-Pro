# Design: Lint Scope Separation

## Architecture Overview
- lint 실행 진입점은 `package.json`의 `npm run lint` (`eslint`)다.
- 실제 스캔 범위는 Flat Config(`eslint.config.mjs`)의 `globalIgnores`에 의해 결정된다.
- pre-commit(`.husky/pre-commit`)와 CI(`.github/workflows/lint.yml`)가 `npm run lint`를 사용하므로,
  설정 기반 범위 조정이 가장 파급이 작다.

## Data Model / Schema
- 본 작업은 데이터 스키마 변경이 없다.

## APIs / Interfaces
- 외부 API/내부 API 인터페이스 변경 없음.

## UI Flow
- UI 변경 없음.

## Design Decision
- 선택안: `eslint.config.mjs`의 `globalIgnores`에 도구 워크스페이스 제외 규칙 추가
  - `.bkit-codex/**`
  - `.agents/**`
  - `.codex/**`
- 이유:
  - 기존 `lint` 스크립트, husky, CI를 변경하지 않아 운영 일관성 유지
  - 앱 품질 게이트는 그대로 유지하면서 비대상 코드로 인한 오탐 실패 제거

## Edge Cases
- 루트의 신규 JS/TS 파일은 계속 lint 대상이므로, 실제 프로젝트 운영 파일 품질은 보장된다.
- 도구 워크스페이스를 수정/검증해야 하는 경우 해당 디렉터리에서 별도 lint를 실행해야 한다.

## Test Plan
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- Expected:
  - 성공 (exit code 0)

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint src`
- Expected:
  - 성공 (exit code 0)
