# Report: Project Baseline Discovery

## What Changed
- 신규 PDCA feature 문서 세트를 생성했다.
  - `docs/pdca/project-baseline-discovery/plan.md`
  - `docs/pdca/project-baseline-discovery/design.md`
  - `docs/pdca/project-baseline-discovery/tasks.md`
  - `docs/pdca/project-baseline-discovery/report.md`
- 루트 `README.md`를 실제 코드베이스 상태에 맞게 갱신했다.
  - 기술 스택/주요 라우트/API 라우트/환경변수/스크립트/운영 노트를 반영

## How Verified (Commands + Results)
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint src`
- Result:
  - 성공 (exit code 0)
  - 앱 본체(`src`) 범위 lint 통과

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- Result:
  - 실패 (exit code 1)
  - `182 problems (174 errors, 8 warnings)`
  - 주요 원인: `.bkit-codex/packages/mcp-server/**/*.js` 영역에서 `@typescript-eslint/no-require-imports` 위반 다수
  - 즉, 현재 전역 lint 범위에는 앱 본체 외 내부 보조 패키지가 포함되어 있음

## Risks / Rollback Notes
- 본 변경은 문서 중심(`README.md`, `docs/pdca/...`)으로 런타임 기능 영향이 없다.
- 롤백 필요 시 아래 경로만 되돌리면 된다.
  - `README.md`
  - `docs/pdca/project-baseline-discovery/*`

## Next Actions
1. 전역 lint 정책에서 `.bkit-codex`를 제외하거나 별도 eslint 설정으로 분리한다.
2. 다음 개발 feature를 1개 선정해 동일 PDCA 경로로 연결한다. (plan -> design -> do -> check -> report)
3. `README.md`의 환경변수 섹션을 실제 배포 환경 기준으로 주기 점검한다.
