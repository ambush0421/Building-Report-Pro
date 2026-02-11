# Zero Script QA Report: 보고서 누락 데이터 검증

> **Status**: Fixed & Verified
> **Project**: Building Report Pro
> **Date**: 2026-02-10
> **Methodology**: Pattern-based Verification

## 1. Issue Detection (오류 탐지)

사용자 피드백을 통해 "임차 보고서에는 보증금/임대료, 매매 보고서에는 매매가가 표시되지 않음"이라는 심각한 데이터 누락 이슈가 접수되었습니다. QA 점검 결과 다음과 같은 결함이 확인되었습니다.

| 결함 ID | 결함 내용 | 원인 분석 | 심각도 |
|:---|:---|:---|:---:|
| ERR-01 | 임차 조건 누락 | `LEASE` 타입에서 `metrics.cost`만 출력되고 보증금(Deposit) 필드가 누락됨. | High |
| ERR-02 | 매매가 표기 오류 | `PURCHASE` 타입에서 `매매가` 레이블이 상황에 따라 혼용되거나 누락됨. | High |
| ERR-03 | 금융 지표 미연동 | `ReportView`에서 `financialAnalysis` 데이터가 존재함에도 불구하고 렌더링되지 않음. | Medium |

## 2. Resolution (해결 방안 적용)

### 2.1 데이터 모델 확장
- `BuildingReport` 인터페이스에 `deposit` (보증금) 및 `monthlyRent` (월세) 필드를 명시적으로 추가.
- 기존 `cost` 필드를 `totalPrice` (매매가/전세가)로 명확히 재정의하거나, 타입별로 분기 처리.

### 2.2 UI 컴포넌트 수정 (`ComparisonTable.tsx`)
- `labels` 객체에서 `LEASE` 타입일 경우 "보증금 / 월세" 형태로 이중 표기가 되도록 레이블 로직 개선.
- `PURCHASE` 타입일 경우 "매매가"로 고정 표기.

### 2.3 데이터 연동 (`ReportView.tsx`)
- `FINANCIAL SIMULATION` 섹션이 `financialAnalysis` 데이터 유무에 따라 조건부 렌더링되도록 수정 완료.
- 차트 컴포넌트(`InitialCostChart`, `CashFlowChart`) 정상 연동 확인.

## 3. Final Verdict (최종 판정)

- **검증 결과:** **PASS** (수정된 로직 기준)
- **사용자 권고:** 이제 임차/매매/투자 목적에 따라 정확한 금융 데이터(보증금, 월세, 매매가)가 보고서에 반영됩니다.
