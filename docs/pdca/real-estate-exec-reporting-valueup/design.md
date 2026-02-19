# Design: Real Estate Executive Reporting Value-up

## Architecture Overview
- 목적: 실무 데이터(매물/상담/계약/민원)를 대표 보고용 요약으로 변환하고, 근거 데이터를 추적 가능하게 제공한다.
- 구성 레이어:
  - Data Source Layer: 기존 운영 원천(매물, 상담일지, 계약, VOC/민원)에서 기간 기준 데이터 수집
  - KPI Normalization Layer: 용어 사전과 계산식으로 지표를 표준화(지점/담당자 단위 비교 가능)
  - Report Composition Layer: 대표용 1페이지 요약 + 실무 상세 + 부록 근거를 동일 식별자로 묶어 생성
  - Review & Approval Layer: 작성자/검토자/결재자 상태를 관리하고 최종본 확정

## Data Model / Schema
- `ReportHeader`
  - `reportId`, `periodStart`, `periodEnd`, `asOfDate`, `branchId`, `author`, `reviewer`, `approver`, `status`
- `KpiMetric`
  - `metricCode`, `metricName`, `currentValue`, `previousValue`, `changeRate`, `unit`, `sourceSystem`, `owner`
- `RiskItem`
  - `riskId`, `category`, `severity(High|Medium|Low)`, `description`, `impact`, `mitigation`, `dueDate`, `owner`, `open`
- `DecisionRequest`
  - `decisionId`, `topic`, `context`, `options[]`, `recommendedOption`, `decisionDueDate`, `requestedBy`
- `ActionItem`
  - `actionId`, `title`, `owner`, `startDate`, `dueDate`, `progress`, `blocker`, `nextStep`
- `AppendixEvidence`
  - `evidenceId`, `type`, `reference`, `capturedAt`, `privacyMaskingApplied`

## APIs / Interfaces
- 내부 인터페이스(예시, 구현은 `pdca do` 단계):
  - `collectOperationalData(period, branchId): RawOpsDataset`
  - `normalizeKpi(rawData, glossary): KpiMetric[]`
  - `buildExecutiveSummary(kpis, risks, decisions): ExecSummary`
  - `buildReportDocument(header, summary, details, appendix): ExecutiveReport`
- 외부 연동 API(예시):
  - `GET /api/reporting/kpis?from=&to=&branchId=`
  - `GET /api/reporting/risks?from=&to=&branchId=`
  - `POST /api/reporting/executive-report/preview`
  - `POST /api/reporting/executive-report/publish`

## UI Flow (if any)
1. 실무자가 보고 기간과 지점을 선택하고 데이터 스냅샷을 고정한다.
2. 시스템이 KPI/리스크/결정요청 초안을 생성한다.
3. 실무자가 실행 항목 및 장애요인을 보강해 초안 저장한다.
4. 검토자가 수치 출처/마스킹/문장 규칙을 확인 후 수정 요청 또는 승인한다.
5. 대표가 1페이지 요약을 확인하고 결재/지시사항을 확정한다.
6. 최종본은 부록 근거와 함께 보관된다.

## Edge Cases
- 특정 KPI 분모가 0인 경우(`changeRate`)는 `N/A` 처리하고 원인 코멘트를 강제한다.
- 데이터가 지점별로 누락된 경우 보고서 생성은 허용하되 `Data Quality Warning`을 상단 노출한다.
- 민감정보가 마스킹되지 않으면 퍼블리시를 차단한다.
- KPI 정의 버전이 다른 데이터가 혼입되면 비교 지표 생성을 중단하고 재집계를 요구한다.
- 결재 마감일 초과 시 보고 상태를 `Delayed`로 전환해 에스컬레이션한다.

## Test Plan
- 문서/템플릿 검증
  - 대표 요약 섹션에 `현상→원인→영향→요청 의사결정` 문장 규칙이 누락되지 않는지 확인
  - 필수 KPI 5종 및 출처/기준일/작성자/검토자 표기가 존재하는지 확인
- 로직 검증(구현 단계 기준)
  - KPI 계산식 단위 테스트(전환율, 리드타임, 전주 대비 증감)
  - 분모 0/누락 데이터/이상치 입력에 대한 예외 처리 테스트
- 운영 검증
  - 실무자 작성 1건, 대표 검토 1건의 UAT 시나리오로 읽기 시간(5분 내) 충족 여부 확인
  - 보고서 공유 시 개인정보 마스킹 점검 체크리스트 통과 여부 확인
