# Design: 대량 호실 견적 및 임대료 비교 시스템 (Bulk Unit Quotation v2)

> **요약**: 지번 기반 건물 제원 조회, 100개 호실 동적 선택 및 기존 임대료 비교 시뮬레이션 UI 설계
> **버전**: 2.0.0
> **작성일**: 2026-02-10

---

## 1. UI 구조 (Layout Strategy)

"The Black Table" 시스템을 적용하여 **3단 분할 레이아웃**으로 구성합니다.

1.  **Top (Building Hero):** 
    - 건물의 '결정적 스펙' 노출.
    - 건물명, 지번, 준공연차, 총 주차대수, 총 승강기 대수.
2.  **Left (Unit Inventory):**
    - 층별/호별 선택 그리드. 
    - 최대 100개까지 선택 가능하며, 선택 시 즉시 우측 견적서에 반영.
3.  **Right (Financial Simulator):**
    - **[입력]** 평당 보증금, 평당 월세 일괄 입력.
    - **[비교]** 현재 사무실 비용 입력.
    - **[결과]** 실시간 차액(Saving/Increase) 시각화.

---

## 2. 핵심 컴포넌트 상세 설계

### 2.1 Building Spec Header
- **Layout:** 4분할 그리드 + 블랙 보더.
- **Metrics:**
  - `Age`: 사용승인일 기반 자동 계산 (예: 신축급 3년차).
  - `Parking`: 자주식+기계식 합계.
  - `Elevator`: 승용+비상용 합계.

### 2.2 Dynamic Unit List (Expanding Grid)
- **Behavior:** 호실 선택 시 하단 `Quote Stack` 영역에 카드가 추가됨.
- **Dynamic Height:** 리스트 추가에 따라 하단 영역이 부드럽게 확장 (Framer Motion 적용).
- **Limit:** 100개 초과 시 알림 및 추가 차단.

### 2.3 Rent Comparison Matrix
- **Data Formula:**
  - `Total Rent` = (Selected Area Sum * Input Rent Per Pyung)
  - `Comparison Delta` = `Total Rent` - `Current Office Rent`
- **Visuals:**
  - 절감액 발생 시: `TEXT-BLUE-600` + `DOWN ARROW`.
  - 비용 상승 시: `TEXT-RED-600` + `UP ARROW`.

---

## 3. 데이터 흐름 (Data Flow)

1.  `AddressSearch` -> `API: /api/building` (표제부 데이터 획득)
2.  `BuildingSelection` -> `API: /api/building-units` (전유부 호실 리스트 획득)
3.  `User Selection` -> `UI State (selectedUnits)` (최대 100개)
4.  `Selected Area Sum` -> `Finance Logic` (평당가 연산)
5.  `Current Input` -> `Comparison Logic` (차액 산출)

---

## 4. 디자인 미리보기 (Mockup Concepts)

```
[ BUILDING NAME: XX TOWER ] [ JIBUN: 123-4 ] [ AGE: 5Y ] [ PARKING: 120 ] [ ELEV: 8 ]
---------------------------------------------------------------------------------
|  [UNIT INVENTORY]             |  [QUOTATION & COMPARISON]                     |
|  B1 [101] [102] [103]         |  - Selected: 101, 102, 201... (Total 120평)   |
|  1F [201] [202] [203]         |  - Rent (Per Pyung): [ 8 ] 만원               |
|  2F [301] [302] [303]         |  - Deposit (Per Pyung): [ 150 ] 만원          |
|                               |  -------------------------------------------  |
|  (Click to add units)         |  - Current Office Rent: [ 1,200 ] 만원        |
|                               |  - EXPECTED DELTA: ▼ 150만원 (SAVING)         |
---------------------------------------------------------------------------------
```
