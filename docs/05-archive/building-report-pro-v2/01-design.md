# Building Report Pro V2 Design Document

> Version: 1.0.0 | Created: 2026-02-11 | Status: Draft

## 1. Overview
Building Report Pro V2는 공공데이터 및 카카오 API를 활용하여 부동산 분석 보고서를 생성하는 풀스택 웹 애플리케이션입니다. React 18과 TypeScript를 기반으로 하며, Zustand를 통해 복잡한 금융 계산 및 호실 관리 상태를 효율적으로 처리합니다.

## 2. Architecture
### Components
- **Common**: `AddressSearch`, `NumberInput`, `SkeletonCard`, `EmptyState`
- **Building**: `BuildingInfoCard`
- **Room**: `RoomSelector`
- **Financial**: `TotalFinancialEditor`, `RoomFinancialEditor`, `LoanSimulator`, `InvestmentDashboard`
- **Location**: `KakaoMap`, `NearbyTransactions`
- **Report**: `ReportPage` (통합 페이지 및 PDF 출력)

### State Management (Zustand)
- `buildingStore`: 건물 기본 정보, 위치 정보, 실거래가 데이터 관리 및 API 비즈니스 로직 처리.
- `roomStore`: 선택된 호실 목록, 금액 정보, 대출 시뮬레이션 및 수익률 자동 계산 로직 관리.

## 3. Data Model
### Entities (Summary)
```typescript
interface BuildingInfo {
  bldNm: string;
  platPlc: string;
  useAprDay: string;
  buildingAge: BuildingAge;
  // ... (Summary fields)
}

interface Room {
  id: string;
  floor: number;
  hoNm: string;
  area: number;
  salePrice: number;
  deposit: number;
  monthlyRent: number;
  occupancyStatus: 'occupied' | 'vacant' | 'unknown';
}

interface InvestmentAnalysis {
  grossYield: number;
  netYield: number;
  capRate: number;
  leveragedYield: number;
  dscr: number;
  noi: number;
}
```

## 4. API Specification
| Provider | Service | Description |
|----------|---------|-------------|
| 공공데이터포털 | 건축물대장 API | 건물 기본 제원, 층별/호실별 면적 정보 조회 |
| 공공데이터포털 | 실거래가 API | 상업업무용 매매/임대 최근 실거래 데이터 조회 |
| 카카오 로컬 | 주소/키워드 검색 | 좌표 변환 및 주변 편의시설/교통 정보 조회 |
| 카카오 지도 | JavaScript SDK | 건물 위치 및 주변 인프라 시각화 |
| Vworld | 토지정보 API | 개별공시지가 및 토지이용계획 조회 |

## 5. UI Design
- **Theme**: Neutral (White/Gray) 기반의 전문적인 인쇄 스타일.
- **Library**: shadcn/ui (Card, Button, Tabs, Accordion, etc.)
- **Layout**: 단일 페이지 리포트 형태, PDF 출력 시 A4 최적화.

## 6. Test Plan
| Test Case | Expected Result |
|-----------|-----------------|
| 주소 검색 연동 | 카카오 팝업에서 주소 선택 시 관련 API 순차 호출 및 데이터 로드 성공 |
| 면적 비례 배분 | 전체 금액 입력 후 배분 시 각 호실별 금액 합계가 전체 금액과 일치 |
| 수익률 계산 | 매매가/임대료 변경 시 Cap Rate 및 Leverage Yield 실시간 정확한 계산 |
| PDF 인쇄 | 인쇄 화면에서 불필요한 UI(버튼 등) 제외 및 배경색 유실 없이 출력 |
