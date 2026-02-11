# Design: System Reconstruction & UI/UX Restoration

> **Summary**: "The Black Table" 디자인 시스템을 기반으로 한 전문가용 부동산 분석 리포트 및 대시보드 UI/UX 복원 설계
>
> **Project**: building-report-pro
> **Phase**: 3 (Mockup & Design)
> **Author**: Gemini Agent
> **Date**: 2026-02-10

---

## 1. Visual Identity: "The Black Table"

**Concept:** 최고급 비즈니스 실무 문서를 지향하는 고대비 B&W 테마.

- **Color Palette:**
  - **Primary:** `#000000` (Black) - Borders, Headings, Primary Actions
  - **Secondary:** `#FFFFFF` (White) - Backgrounds, Text on Black
  - **Accent:** `#2563EB` (Blue-600) - Financial Highlights (Positive), Links
  - **Alert:** `#DC2626` (Red-600) - Risk, Negative Values
  - **Neutral:** `#F3F4F6` (Gray-50) - Table Headers, Secondary Backgrounds

- **Typography:**
  - **Headings:** Inter (Bold/Black), Uppercase, Tight Tracking
  - **Body:** Pretendard (Variable), High Readability
  - **Numbers:** Monospace numerals for financial data

- **Component Style:**
  - **Borders:** `border-2` or `border-4` solid black. No rounded corners (sharp edges) or minimal radius.
  - **Shadows:** Hard shadows (`box-shadow: 4px 4px 0px 0px #000`) for buttons/cards.
  - **Grid:** Strict grid layouts for data density.

---

## 2. Component Design

### 2.1 Main Dashboard (Search & Input)
- **Goal:** 사용자가 분석 "목적"과 "대상"을 명확히 선택하도록 유도.
- **Layout:**
  - **Header:** Big, Bold Title ("BUILDING REPORT PRO").
  - **Selector:**
    - Property Type: `[OFFICE] [KIC] [HQ] [BUILDING] ...` (Toggle Buttons)
    - Report Purpose: `[LEASE] [PURCHASE] [INVEST]` (Large Cards)
  - **Financial Input (Conditional):**
    - If `LEASE`: Deposit, Monthly Rent inputs.
    - If `PURCHASE/INVEST`: Price input.
  - **Search Bar:** Centered, prominent `Search Address` button.

### 2.2 Expert Report View (`ReportView`)
- **Header:**
  - Title: Dynamic based on type (e.g., "ASSET PURCHASE ANALYSIS").
  - Badges: `[HQ] [PURCHASE]`
  - Approval Grid: 3-column signature box (Writer/Reviewer/Approver).
- **Metrics Grid:**
  - 4-Column layout.
  - Financials: "Total Cost", "Equity Required", "Monthly Flow" (Highlighted).
- **Financial Simulation (New):**
  - **Layout:** 2-Column Grid.
  - **Left:** `InitialCostChart` (Donut) + Table (Tax, Loan, Equity).
  - **Right:** `CashFlowChart` (Waterfall/Bar) + Table (Rent, Interest, Net).
- **Reasoning Box:**
  - Heavy black border.
  - Large "Grade" Badge (A/B/C).
  - AI Analysis Text.

### 2.3 Unit Analysis (`UnitGridTable`)
- **Style:** Black borders, uppercase headers.
- **Interaction:**
  - Selected Row: Inverted colors (Black BG, White Text).
  - Checkbox: Custom square checkbox.

### 2.4 Quotation Modal
- **Purpose:** Detail unit selection and quote generation.
- **Layout:** Split View (Settings Left / Preview Right).
- **Preview:** Matches `ReportView` style exactly for consistent PDF export.

---

## 3. Data Visualization Specs

### 3.1 Initial Cost Chart (Donut)
- **Data:** Equity, Loan, Acquisition Tax.
- **Colors:** Black (Equity), Gray-400 (Loan), Gray-200 (Tax).
- **Tooltip:** Detailed amount in KRW.

### 3.2 Cash Flow Chart (Bar/Waterfall)
- **Data:** Gross Income (Positive), Interest Expense (Negative), Net Cash Flow (Result).
- **Colors:** Black (Income), Gray-400 (Expense), Blue-600 (Net Result).
- **Reference Line:** Zero line.

### 3.3 Score Breakdown Chart (Horizontal Bar)
- **Data:** Cost, Area, Parking, Modernity scores.
- **Style:** Minimalist bars, score values visible.

---

## 4. Interaction Flow

1.  **Landing:** User selects `Purpose` (e.g., Purchase) & `Property` (e.g., HQ).
2.  **Input:** User enters target `Price` (e.g., 30억).
3.  **Search:** User searches address via Daum Postcode.
4.  **Processing:**
    - API fetches Building Data & Market Price.
    - `BuildingAnalysisService` calculates Scores & Financials.
5.  **Result:** `ReportView` renders with:
    - "ASSET PURCHASE ANALYSIS" Title.
    - Financial Simulation Section (Equity: 12억, Loan: 18억...).
    - AI Reasoning ("Expected CoC 12%...").
6.  **Action:** User clicks "Print/PDF" or "Save to Vault".

---

## 5. Next Steps (Implementation)

- [x] Schema Definition (Phase 1) - Done.
- [ ] **Component Implementation (Phase 6)**:
    - Apply "Black Table" styles to `Dashboard` & `QuotationModal`.
    - Ensure charts render correctly in `ReportView`.
- [ ] **API Integration (Phase 4)**: Verify data flow from `page.tsx` -> `api/building` -> `Service`.
