# Report: Lint Scope Separation

## What Changed
- `eslint.config.mjs`의 `globalIgnores`에 도구성 워크스페이스 제외 규칙을 추가했다.
  - `.bkit-codex/**`
  - `.agents/**`
  - `.codex/**`
- 신규 PDCA 문서 세트를 생성했다.
  - `plan.md`, `design.md`, `tasks.md`, `report.md`

## How Verified (Commands + Results)
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- Result:
  - 성공 (exit code 0)
  - `eslint` 실행 완료, 에러/경고 출력 없음

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint src`
- Result:
  - 성공 (exit code 0)
  - 앱 본체(`src`) 범위 lint 통과

## Risks / Rollback Notes
- `.bkit-codex` 등 제외 디렉터리의 lint 상태는 기본 파이프라인에서 더 이상 검증되지 않는다.
- 해당 디렉터리를 유지보수할 필요가 있을 경우 별도 lint 명령/워크플로를 운영해야 한다.
- 롤백은 `eslint.config.mjs`의 3개 ignore 항목 제거로 즉시 가능하다.

## Next Actions
1. CI 기준은 현재처럼 앱 저장소 중심(`npm run lint`)으로 유지한다.
2. `.bkit-codex` 품질 관리가 필요하면 해당 경로 전용 lint 스크립트를 별도로 추가한다.
3. 다음 기능 PDCA를 `do` 단계로 이어갈 때 동일한 lint 기준(`npm run lint`)을 재사용한다.
