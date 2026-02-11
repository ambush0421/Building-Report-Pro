---
template: design
version: 1.2
description: PDCA Design phase document for core TypeScript type definitions
variables:
  - feature: type-definitions
  - date: 2026-02-11
  - author: Gemini Agent
  - project: building-report-pro
  - version: 0.1.0
---

# type-definitions Design Document

> **Summary**: Detailed technical design for Building, Room, Location, and Report data structures.
>
> **Project**: building-report-pro
> **Version**: 0.1.0
> **Author**: Gemini Agent
> **Date**: 2026-02-11
> **Status**: Completed
> **Planning Doc**: [type-definitions.plan.md](../../01-plan/features/type-definitions/01-plan.md)

---

## 1. Overview

### 1.1 Design Goals

- Provide a single source of truth for data structures used in the application.
- Ensure type safety across API calls, state stores, and UI components.
- Enable easy maintenance and extension of the data model.

### 1.2 Design Principles

- **Modularity**: Separate concerns into distinct files (building, room, location, report).
- **Extensibility**: Use interfaces to allow for future field additions.
- **Null Safety**: Explicitly handle optional fields and null values.

---

## 2. Data Model

### 2.1 Entity Definition

#### `src/types/building.ts`
```typescript
export interface BuildingInfo {
  bldNm: string;                // 건물명
  platAddr: string;             // 대지위치 (주소)
  useAprDay?: string;           // 사용승인일 (YYYYMMDD)
  mainPurpsCdNm?: string;       // 주용도
  strctCdNm?: string;           // 구조
  grndFlrCnt?: number;          // 지상층수
  ugndFlrCnt?: number;          // 지하층수
  totArea?: number;             // 연면적 (m2)
  archArea?: number;            // 건축면적 (m2)
  platArea?: number;            // 대지면적 (m2)
  bcRat?: number;               // 건폐율 (%)
  vlRat?: number;               // 용적률 (%)
  totPkngCnt?: number;          // 총주차대수
  elvtCnt?: number;             // 승강기수 (합계: rideUseElvtCnt + emgenUseElvtCnt)
}
```

#### `src/types/room.ts`
```typescript
export interface RoomFinancials {
  salePrice: number | null;     // 매매가
  deposit: number | null;       // 보증금
  monthlyRent: number | null;   // 월임대료
}

export interface Room extends RoomFinancials {
  hoNm: string;                 // 호실번호 (호)
  floor: string;                // 층
  area: number;                 // 전용면적 (m2)
  commonArea?: number;          // 공용면적 (m2)
  mainPurpsCdNm?: string;       // 용도
}
```

#### `src/types/location.ts`
```typescript
export interface NearestStation {
  name: string;                 // 역명
  line: string;                 // 호선
  distance: number;             // 거리 (m)
}

export interface NearestBusStop {
  name: string;                 // 정류장명
  distance: number;             // 거리 (m)
}

export interface LocationInfo {
  lat: number;                  // 위도
  lng: number;                  // 경도
  usageZone?: string;           // 용도지역
  publicPrice?: number;         // 공시지가 (원/m2)
  nearestStation?: NearestStation;
  nearestBusStop?: NearestBusStop;
}
```

#### `src/types/report.ts`
```typescript
import { BuildingInfo } from './building';
import { LocationInfo } from './location';
import { Room } from './room';

export interface FinancialSummary {
  totalSalePrice: number;       // 전체매매가 (합계)
  totalDeposit: number;         // 전체보증금 (합계)
  totalRent: number;            // 전체임대료 (합계)
  pricePerPyung: number;        // 평당매매가
  rentPerPyung: number;         // 평당임대료
  annualYield: number;          // 임대수익률 (연, %)
  capRate: number;              // Cap Rate (%)
}

export interface ReportData {
  building: BuildingInfo;
  location: LocationInfo;
  rooms: Room[];
  summary: FinancialSummary;
}
```

---

## 3. Implementation Guide

### 3.1 File Structure

```
src/
└── types/
    ├── building.ts
    ├── room.ts
    ├── location.ts
    └── report.ts
```

### 3.2 Implementation Order

1. [ ] Create `building.ts`
2. [ ] Create `room.ts`
3. [ ] Create `location.ts`
4. [ ] Create `report.ts` (requires imports from others)

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-02-11 | Initial design for core type definitions | Gemini Agent |
