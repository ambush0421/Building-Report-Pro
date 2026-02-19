# Report Comparison System Design Document

> Version: 1.0.0 | Created: 2026-02-14 | Status: Draft

## 1. Overview
사용자가 선택한 여러 보고서의 핵심 데이터를 병렬로 배치하여 투자 가치를 비교 분석하는 UI 및 로직을 설계합니다.

## 2. Comparison Metrics (비교 항목)
| Category | Metric | Selection Logic (Best) |
|----------|--------|------------------------|
| **Financials** | Cap Rate (%) | Max |
| | Leveraged Yield (ROI, %) | Max |
| | Annual NOI | Max |
| | DSCR | Max (Safe if > 1.2) |
| **Asset Spec** | Price per Pyeong (평당가) | Min |
| | Building Age (연식) | Min |
| | Total Area (연면적) | Max |
| | LTV Ratio (%) | Min (for safety) |

## 3. UI/UX Flow & Component Spec

### 3.1 Multi-Select Mode (HistorySidebar)
- **State**: `isComparisonMode: boolean`, `selectedReportIds: string[]`
- **Interaction**:
  - '비교 모드' 활성화 시 각 리스트 아이템 좌측에 `Checkbox` 노출.
  - 아이템 클릭 시 `selectedReportIds`에 ID 추가/제거 (최대 4개 제한).
  - 하단에 `Floating Comparison Bar` 노출: "N개의 보고서 선택됨" 메시지와 "비교하기" 버튼.

### 3.2 Comparison Dashboard (Modal/Overlay)
- **Component**: `ComparisonOverlay.tsx`
- **Logic**:
  - `selectedReportIds`를 prop으로 받아 Supabase에서 `analysis_data`를 병렬로 fetch.
  - 데이터 로딩 중 `Skeleton` 테이블 노출.
- **Table Structure**:
  - Row 1: 건물명 및 주소 (Header)
  - Row 2: 총 매매가 (Financial)
  - Row 3: Cap Rate (Yield) - Max Highlighting
  - Row 4: 레버리지 수익률 (Yield) - Max Highlighting
  - Row 5: 평당 매매가 (Asset) - Min Highlighting
  - Row 6: 건물 연식 (Asset) - Min Highlighting

## 4. Analytical Logic (Best Picker)
지표별로 우수한 데이터를 판별하여 `isBest` 플래그를 부여하는 유틸리티 함수 설계:
```typescript
const getBestValue = (reports: any[], field: string, type: 'max' | 'min') => {
  const values = reports.map(r => r.analysis_data[field] || 0);
  return type === 'max' ? Math.max(...values) : Math.min(...values);
};
```

## 5. Data Recovery for Comparison
- 각 보고서 스냅샷(`analysis_data`)에 포함된 `totalFinancials`, `loanSimulation` 등을 구조 분해 할당하여 테이블 셀에 매핑.
- 누락된 지표(구버전 데이터 등)는 'N/A'로 표시하여 시스템 안정성 확보.

## 6. Implementation Task List
- [ ] `HistorySidebar` 체크박스 및 멀티 셀렉트 기능 추가.
- [ ] `ComparisonModal` 컴포넌트 스캐폴딩.
- [ ] 지표별 우위 판별 유틸리티 함수 작성.
- [ ] 비교표 출력 최적화 (가로 너비 대응).
