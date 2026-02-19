# AI Investment Scoring System Design Document

> Version: 1.0.0 | Created: 2026-02-14 | Status: Draft

## 1. Scoring Engine Formula

투자 점수는 총 100점 만점으로 산출되며, 4가지 핵심 카테고리에 가중치를 부여합니다.

### 1.1 Profitability (수익성) - 40점
- **Cap Rate (25pt)**:
  - 4.5% 이상: 25pt
  - 3.5% ~ 4.5%: (Cap Rate - 3.5) * 25
  - 3.5% 미만: 0pt
- **Leveraged ROI (15pt)**:
  - 6% 이상: 15pt
  - 4% ~ 6%: (ROI - 4) * 7.5
  - 4% 미만: 0pt

### 1.2 Stability (안정성) - 30점
- **DSCR (15pt)**:
  - 1.5 이상: 15pt
  - 1.2 ~ 1.5: 10pt
  - 1.2 미만: 0pt
- **LTV Ratio (10pt)**:
  - 60% 이하: 10pt
  - 60% ~ 80%: (80 - LTV) / 2
  - 80% 이상: 0pt
- **Violation Check (5pt)**:
  - 위반사항 없음: 5pt
  - 위반사항 있음: -20pt (패널티 적용)

### 1.3 Location (입지) - 20점
- **Subway Proximity (15pt)**:
  - 300m 이내 (초역세권): 15pt
  - 500m 이내 (역세권): 10pt
  - 1km 이내: 5pt
- **Infra Density (5pt)**:
  - 편의시설 5개 이상: 5pt
  - 3개 이상: 3pt

### 1.4 Condition (건물상태) - 10점
- **Building Age (10pt)**:
  - 10년 이내: 10pt
  - 25년 이내: 5pt
  - 25년 이상: 2pt

## 2. Grade Mapping
| Score Range | Grade | Color | Label |
|-------------|-------|-------|-------|
| 90 - 100 | **S** | Golden | Prime Asset |
| 80 - 89 | **A** | Blue | Core Asset |
| 70 - 79 | **B** | Green | Value-add |
| Below 70 | **C** | Gray | Management Required |

## 3. UI Components

### 3.1 InvestmentGauge Chart
- **Library**: Recharts `PieChart` (Half-donut style) 또는 Custom SVG.
- **Features**:
  - 현재 점수 바늘(Needle) 표시.
  - 등급별 색상 영역 구분 (Gradient).
  - 중앙에 점수 및 등급 텍스트 배치.

### 3.2 ScoreBreakdown Component
- 각 카테고리별 획득 점수를 진행 바(Progress Bar) 형태로 시각화.
- 사용자가 "상세 분석" 클릭 시 툴팁 또는 아코디언으로 노출.

## 4. State Integration
- `useRoomStore` 내부에 `calculateAIScore` 유틸리티 함수 통합.
- 금융 데이터(`totalFinancials`, `loanSimulation`) 변경 시 자동으로 `store`의 `aiScore` 상태 업데이트.

## 5. Implementation Task List
- [ ] `utils/calculate.ts`에 `calculateAIScore` 로직 추가.
- [ ] `components/charts/InvestmentGauge.tsx` 개발.
- [ ] `ReportView` 및 `InvestmentDashboard`에 점수 컴포넌트 배치.
- [ ] 비교 오버레이에 점수 기반 정렬 및 뱃지 추가.
