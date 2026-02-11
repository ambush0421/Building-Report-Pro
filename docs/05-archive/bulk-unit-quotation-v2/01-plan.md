# Plan: 대량 호실 견적 및 임대료 비교 시스템 고도화 (Bulk Unit Quotation v2)

> **요약**: 지번 검색 기반 건물 개요 조회, 100개 호실 다중 선택, 평당 임대료 일괄 입력 및 기존 임대료 비교 분석 기능 구현.
> **작성일**: 2026-02-10

## 1. 개요 (Overview)
- **목표:** 사용자가 지번 주소를 입력하면 건물의 핵심 제원(주차, 승강기 등)을 확인하고, 원하는 호실들을 자유롭게 조합(최대 100개)하여 예상 임대료를 산출한 뒤, 현재 사용 중인 사무실의 임대료와 즉시 비교할 수 있는 원스톱 솔루션 제공.
- **핵심 요구사항:**
  1.  **지번 검색 & 건물 개요:** 건물명, 지번, 사용승인일, 총 주차/승강기 대수 출력.
  2.  **호실 다중 선택:** 층/호/면적/용도 리스트에서 클릭 시 하단 견적서에 실시간 추가 (최대 100개).
  3.  **임대료 일괄 계산:** 평당 보증금/임대료 입력 시 전체 총액 자동 계산.
  4.  **비교 분석 (Simulation):** "현재 사무실"의 임대 조건을 입력하여 이사 시 증감액(Cost Delta) 분석.

## 2. 사용자 시나리오 (User Story)
1.  **검색:** 사용자가 지번 주소(예: "역삼동 123-4")를 입력한다.
2.  **확인:** 건물의 사용승인일, 주차대수, 승강기 등 기본 스펙을 확인한다.
3.  **선택:** 
    - 전유부 목록(호실 리스트)을 보며 원하는 호실을 클릭한다.
    - 클릭할 때마다 하단 '견적 담기' 영역이 늘어나며 합계 면적이 실시간 업데이트된다.
4.  **입력:** 
    - "평당 보증금 150만원 / 임대료 8만원"을 입력한다.
    - "현재 사무실: 보증금 1억 / 월세 500만원"을 입력한다.
5.  **결과:** 
    - "이사 시 월 50만원 절감 가능" 등의 비교 분석 리포트를 확인한다.

## 3. 핵심 기능 상세 (Functional Requirements)

### 3.1 건물 제원 대시보드 (Building Specs)
- **Data Source:** 건축물대장 표제부 API.
- **Display Fields:**
  - 건물명, 대지위치(지번).
  - 사용승인일 (노후도 계산).
  - **총 주차대수:** 자주식 + 기계식 합산.
  - **총 승강기:** 승용 + 비상용 합산.

### 3.2 호실 선택 매트릭스 (Unit Matrix)
- **UI:** 층별/호별 그리드 뷰.
- **Interaction:** 
  - 호실 클릭 시 `SelectedUnits` 배열에 추가.
  - 선택된 호실은 시각적으로 반전(Highlight).
  - 하단에 선택된 호실 리스트가 카드로 쌓이는(Stacking) 애니메이션 적용.

### 3.3 임대료 시뮬레이터 (Rent Calculator)
- **Input:**
  - `Target`: 평당 보증금, 평당 월세, 평당 관리비.
  - `Current`: 현재 보증금 합계, 현재 월세 합계, 현재 관리비 합계.
- **Logic:**
  - `Target Total` = (선택된 호실 전용면적 합계 * 평당가).
  - `Delta` = `Target Total` - `Current Total`.

## 4. 데이터 모델 (Schema)

### QuotationState
```typescript
interface QuotationState {
  buildingInfo: {
    name: string;
    address: string;
    approvalDate: string;
    totalParking: number;
    totalElevators: number;
  };
  selectedUnits: Array<{
    floor: string;
    ho: string;
    area: number; // 전용면적
    usage: string; // 주용도
  }>;
  financials: {
    perPyung: { deposit: number; rent: number; maint: number };
    current: { deposit: number; rent: number; maint: number };
  };
}
```

## 5. UI/UX 컨셉
- **"The Black Table"** 스타일 유지 (B&W, High Contrast).
- **Split View:** 좌측 호실 목록 / 우측 견적 및 비교 패널.
- **Real-time Feedback:** 입력값 변경 시 즉시 차액(Delta) 계산 및 색상(Red/Blue) 표시.
