---
template: plan
version: 1.2
description: PDCA Plan phase document for core TypeScript type definitions
variables:
  - feature: type-definitions
  - date: 2026-02-11
  - author: Gemini Agent
  - project: building-report-pro
  - version: 0.1.0
---

# type-definitions Planning Document

> **Summary**: Define core TypeScript interfaces for Building, Room, Location, and Report data structures.
>
> **Project**: building-report-pro
> **Version**: 0.1.0
> **Author**: Gemini Agent
> **Date**: 2026-02-11
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose

Standardize data structures across the application to ensure type safety when handling API responses, state management, and report generation.

### 1.2 Background

The Building Report Pro service handles complex real estate data. Explicit type definitions are required for scalable and error-free development in TypeScript.

---

## 2. Scope

### 2.1 In Scope

- [ ] Create `src/types/building.ts`: Building basic information.
- [ ] Create `src/types/room.ts`: Individual room/unit details and financials.
- [ ] Create `src/types/location.ts`: Geographic and surrounding infrastructure data.
- [ ] Create `src/types/report.ts`: Aggregated report data and calculated metrics.

### 2.2 Out of Scope

- Implementing API service calls (planned for Phase 4).
- Creating actual report UI components.

---

## 3. Requirements

### 3.1 Functional Requirements

#### 3.1.1 Building Info (`building.ts`)
| Field | Type | Description |
|-------|------|-------------|
| `bldNm` | string | 건물명 |
| `platAddr` | string | 주소 |
| `useAprDay` | string | 사용승인일 |
| `mainPurpsCdNm` | string | 주용도 |
| `strctCdNm` | string | 구조 |
| `grndFlrCnt` | number | 지상층수 |
| `ugndFlrCnt` | number | 지하층수 |
| `totArea` | number | 연면적 |
| `archArea` | number | 건축면적 |
| `platArea` | number | 대지면적 |
| `bcRat` | number | 건폐율 |
| `vlRat` | number | 용적률 |
| `totPkngCnt` | number | 총주차대수 |
| `elvtCnt` | number | 승강기수 (합계) |

#### 3.1.2 Room Info (`room.ts`)
- `Room`: hoNm, floor, area, commonArea, mainPurpsCdNm, salePrice, deposit, monthlyRent.
- `RoomFinancials`: Partial financial data (salePrice, deposit, monthlyRent as `number | null`).

#### 3.1.3 Location Info (`location.ts`)
- `NearestStation`: name, line, distance(m).
- `NearestBusStop`: name, distance(m).
- `LocationInfo`: lat, lng, usageZone, publicPrice, nearestStation, nearestBusStop.

#### 3.1.4 Report Info (`report.ts`)
- `ReportData`: BuildingInfo + LocationInfo + Room[] + Totals + Calculated Yields.
- `FinancialSummary`: totalSalePrice, totalDeposit, totalRent, pricePerPyung, rentPerPyung, annualYield, capRate.

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] All 4 files created in `src/types/`.
- [ ] Interfaces exported correctly.
- [ ] Optional fields handled with `?`.
- [ ] Project compiles without type errors.

---

## 5. Next Steps

1. [ ] Execute `/pdca design type-definitions`
2. [ ] Execute implementation (creating the `.ts` files)

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-02-11 | Initial plan for core type definitions | Gemini Agent |
