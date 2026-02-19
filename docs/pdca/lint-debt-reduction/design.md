# Design: Lint Debt Reduction

## Architecture Overview
- 목표는 "한 번에 전부 수정"이 아니라 2단계 운영이다.
  - 1단계(Baseline Green): lint 실행을 차단하는 에러를 제거해 워크플로우를 정상화한다.
  - 2단계(Debt Burn-down): 경고를 우선순위 배치로 줄이며 규칙 강도를 점진 복원한다.
- 전략:
  - 에러 빈도 상위 규칙(`no-explicit-any`)의 심각도를 일시 완화하여 에러 0 기준 확보
  - 규칙/파일군 단위로 배치를 나눠 경고를 감축

## Data Model / Schema
- `LintBaselineSummary`
  - `capturedAt`: 수집 시각
  - `totalMessages`: 총 lint 메시지 수
  - `ruleCounts`: 규칙별 건수 맵
  - `topFiles`: 파일별 상위 건수 리스트
- 현재 기준값(이번 측정):
  - 초기 baseline:
    - `totalMessages`: 230
  - Batch A 반영 후:
    - `totalMessages`: 159
    - `@typescript-eslint/no-explicit-any`: 109
    - `@typescript-eslint/no-unused-vars`: 48
  - 최신 snapshot(Batch B 반영 후):
    - `totalMessages`: 132
    - `@typescript-eslint/no-explicit-any`: 90
    - `@typescript-eslint/no-unused-vars`: 41
  - 최신 snapshot(Batch C 반영 후):
    - `totalMessages`: 97
    - `@typescript-eslint/no-explicit-any`: 68
    - `@typescript-eslint/no-unused-vars`: 28
  - 최신 snapshot(Batch D 반영 후):
    - `totalMessages`: 82
    - `@typescript-eslint/no-explicit-any`: 53
    - `@typescript-eslint/no-unused-vars`: 28
  - 최신 snapshot(Batch E 반영 후):
    - `totalMessages`: 59
    - `@typescript-eslint/no-explicit-any`: 38
    - `@typescript-eslint/no-unused-vars`: 20
- 초기 baseline 상세:
  - `ruleCounts`:
    - `@typescript-eslint/no-explicit-any`: 140
    - `@typescript-eslint/no-unused-vars`: 86
    - `react/no-unescaped-entities`: 2
    - `prefer-const`: 1
    - `@typescript-eslint/ban-ts-comment`: 1

## APIs / Interfaces
- 코드 인터페이스 변경은 없음.
- 운영 인터페이스(명령):
  - 베이스라인 추출: `npx eslint . -f json > docs/pdca/lint-debt-reduction/lint-report.json`
  - 요약 생성: `node docs/pdca/lint-debt-reduction/_lint_rule_summary.mjs`
  - 검증: `npm run lint` (현재 셸 정책에서는 환경 변수 주입 필요)

## UI Flow (if any)
- UI 변경 없음.
- 개발자 운영 흐름:
1. lint baseline 수집
2. 우선순위 배치 파일 선정
3. 배치 수정 후 scoped lint 확인
4. 전체 lint 재확인
5. 경고 감축량 기록

## Edge Cases
- 셸 정책상 `SystemRoot/windir/TEMP/TMP` 미주입 시 Node crypto 초기화 오류가 발생할 수 있음.
- 동시 작업으로 baseline 수치가 변동될 수 있으므로 측정 시각 기록이 필요함.
- 규칙 완화 상태가 장기 고착되지 않도록 복원 마일스톤을 명시해야 함.

## Test Plan
- 공통 실행:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- 성공 조건:
  - 에러 0 (exit code 0)
- 후속 감축 조건:
  - 배치 단위로 총 경고 수가 감소
  - 주요 규칙(`no-explicit-any`) 건수가 단계적으로 감소

## Priority Batches
- Batch A (우선): `src/components/dashboard/*` 상위 파일
  - `QuotationModal.tsx`, `ComparisonOverlay.tsx`, `ComparisonTable.tsx`, `PDFReport.tsx`
- Batch B: API 라우트
  - `src/app/api/real-trade/route.ts`, `src/app/api/market-price/route.ts`, `src/app/api/building*/route.ts`
- Batch C: 타입 선언/스토어
  - `src/types/kakao.d.ts`, `src/stores/*`, `src/services/*`
