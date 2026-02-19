# Report: Lint Debt Reduction

## What Changed
- ESLint 경고를 배치 단위로 감축해 최종 0건 달성.
- `eslint.config.mjs`의 완화 규칙 4개를 `warn -> error`로 복원:
  - `@typescript-eslint/no-explicit-any`
  - `@typescript-eslint/ban-ts-comment`
  - `react/no-unescaped-entities`
  - `prefer-const`
- 재발 방지 자동화 추가:
  - `husky` 도입 (`package.json`의 `prepare` 스크립트 포함)
  - `.husky/pre-commit`에서 `npm run lint` 실행
  - `.github/workflows/lint.yml` 추가 (PR/main push/workflow_dispatch)
- PDCA 산출물 갱신:
  - `plan.md`, `design.md`, `tasks.md`, `report.md`
  - `lint-report.json` 재생성
- 주요 코드 정리 범위:
  - Dashboard/UI 컴포넌트 다수: `any` 제거, 미사용 import/변수 제거, 타입 인터페이스 보강
  - API 라우트 다수: `catch (error: unknown)` 정규화, 안전 파싱 헬퍼 추가, 응답 타입 보강
  - 서비스/스토어 계층: `any` 제거, 반환 타입 명시, 미사용 코드 제거
  - `src/lib/services/building-analysis.ts`: `@ts-nocheck` 제거, 핵심 도메인 타입(`ReportType`, `ScoreBreakdown`, `FinancialSimulation` 등) 추가

## How Verified (Commands + Results)
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- Result:
  - 성공 (exit code 0)
  - 경고/에러 모두 없음

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run prepare`
- Result:
  - 성공 (exit code 0)
  - husky hook 설치/동기화 확인

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint . -f json > docs/pdca/lint-debt-reduction/lint-report.json`
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& node docs/pdca/lint-debt-reduction/_lint_rule_summary.mjs`
- Result:
  - `TOTAL_MESSAGES 0`
  - rule/file 통계 모두 0으로 갱신
  - strict 규칙(`error`) 복원 상태에서도 동일하게 통과

## Summary Metrics
- 메시지 변화: `230 -> 0` (총 230건 감축)
- 최종 상태: `0 errors, 0 warnings`

## Risks / Rollback Notes
- 현재 기준에서 핵심 완화 규칙은 모두 `error`로 복원됨.
- 추가 품질 상향 시 나머지 규칙도 동일한 방식으로 단계적 상향 가능.
- 롤백 시:
  - 최근 배치 수정 파일 및 `docs/pdca/lint-debt-reduction/*` 산출물 기준으로 역추적 가능
  - 규칙 강도 변경은 CI에서 단계별 적용 권장

## Next Actions
1. `@typescript-eslint/no-unused-vars` 등 남은 규칙 강도 상향 후보를 선별
2. pre-commit lint hook 도입으로 재발 방지
3. CI 파이프라인에 `npm run lint` 고정 및 PR 차단 규칙 적용
