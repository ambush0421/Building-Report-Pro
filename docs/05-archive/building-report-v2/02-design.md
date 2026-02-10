# Design: 기업 이전용 사옥 비교/상세 보고서 시스템 (Building Report V2)

> **요약**: 의사결정권자를 위한 다중 물건 비교 분석 및 자동 추천 시스템 상세 설계
>
> **프로젝트**: building-report-pro
> **버전**: 2.0.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [building-report-v2.plan.md](../../01-plan/features/building-report-v2.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- **Comparison Engine**: 2~5개 물건의 데이터를 정규화하여 동일 선상에서 비교 가능한 구조 설계.
- **Auto-Recommendation**: 설정된 가중치 알고리즘(Scoring)을 통해 최적 대안을 자동 산출.
- **Dual View UI**: 비교 뷰(요약)와 상세 뷰(전체 데이터)를 매끄럽게 연결하는 UX 구현.

### 1.2 핵심 원칙
- **Visual Hierarchy**: '추천 물건'과 '우위 항목'이 시각적으로 가장 먼저 인지되어야 함.
- **Normalized Data**: 서로 다른 건물의 데이터를 비교하기 위해 단위(평/㎡)와 기준(임대료/관리비)을 통일.
- **Performance**: 다중 API 호출 병렬 처리를 통해 단일 보고서 생성과 유사한 속도 유지.

---

## 2. 아키텍처 (Architecture)

### 2.1 컴포넌트 구조
```
┌────────────────────────────────────────────────────────┐
│  Client (Next.js)                                      │
│                                                        │
│  ┌──────────────────┐    ┌──────────────────────────┐  │
│  │ ComparisonView   │───▶│ DetailedReportView       │  │
│  │ (Table/Cards)    │    │ (Full Dashboard)         │  │
│  └────────┬─────────┘    └──────────────────────────┘  │
└───────────┼────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│  Server (API Routes / Edge)                            │
│                                                        │
│  ┌──────────────────┐    ┌──────────────────────────┐  │
│  │ ComparisonEngine │───▶│ RecommendationAlgorithm  │  │
│  │ (Data Normalize) │    │ (Scoring Logic)          │  │
│  └────────┬─────────┘    └─────────────┬────────────┘  │
│           │                            │               │
│           ▼                            ▼               │
│  ┌──────────────────┐    ┌──────────────────────────┐  │
│  │ External APIs    │    │ Financial Calculator     │  │
│  │ (Building/Price) │    │ (Loan, Tax, ROI)         │  │
│  └──────────────────┘    └──────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 2.2 데이터 흐름
1. **Input**: 사용자(실무자)가 2개 이상의 주소 및 조건 입력.
2. **Fetch**: 서버에서 각 주소별 건축물대장 및 시세 정보 병렬 호출 (`Promise.all`).
3. **Normalize**: 수집된 데이터를 비교 가능한 표준 포맷으로 변환.
4. **Calculate**: 금융 비용, 수익률, 3년 누적 효과 등 파생 지표 계산.
5. **Score**: 유형별(임차/매매/투자) 알고리즘을 통해 각 물건 점수 산출 및 순위 결정.
6. **Response**: 추천 물건, 비교표 데이터, 각 물건 상세 데이터를 클라이언트에 반환.

---

## 3. 데이터 모델 (Data Model)

### 3.1 비교 리포트 응답 구조
```typescript
interface ComparisonReportResponse {
  meta: {
    type: 'LEASE' | 'PURCHASE' | 'INVEST';
    timestamp: string;
  };
  recommendation: {
    bestBuildingIndex: number; // 0-based index
    reason: string; // "가장 적은 비용으로 가장 빠르게 회수됩니다"
    totalScore: number;
  };
  buildings: ComparisonBuilding[]; // 정규화된 물건 데이터 (순서 유지)
  analysis: {
    cumulativeEffect: number[]; // 각 물건별 3년/5년 누적 효과 금액
    scores: number[]; // 각 물건별 산출 점수
  };
}

interface ComparisonBuilding {
  // 기본 정보
  id: string;
  name: string;
  address: string;
  
  // 핵심 지표 (비교용)
  metrics: {
    cost: number;        // 월 비용 or 매매가
    area: number;        // 전용면적
    efficiency: number;  // 전용률 or 수익률
    distance: number;    // 역세권 거리
    year: number;        // 준공연도
    parking: number;     // 주차대수
  };
  
  // 평가 태그
  tags: {
    isBestCost: boolean;
    isBestArea: boolean;
    isNewest: boolean;
    riskLevel: 'SAFE' | 'CAUTION' | 'DANGER';
  };
}
```

---

## 4. 알고리즘 명세 (Algorithm Spec)

### 4.1 임차 추천 점수 (Lease Scoring)
```javascript
const score = 
  (annualSaving * 0.30) +      // 연간 절감액 (높을수록 좋음)
  ((1 / paybackPeriod) * 0.25) + // 회수 기간 역수 (짧을수록 좋음)
  (efficiencyRate * 0.15) +    // 전용률
  (accessibilityScore * 0.15) + // 접근성 (역 거리 등)
  (safetyScore * 0.15);        // 안전도 (위반건축물, 노후도 등)
```

### 4.2 태그 부여 로직
- 비교군 내에서 `Max` 또는 `Min` 값을 가진 항목에 `Best` 플래그 자동 할당.
- 리스크: 위반건축물 Y 또는 준공 25년 이상 시 `CAUTION` 부여.

---

## 5. UI/UX 상세 설계

### 5.1 비교 뷰 (Comparison View)
- **Header**: "🏆 추천: B 물건" 문구와 핵심 한 줄 평을 가장 크게 표시.
- **Comparison Table**:
  - 행(Row): 비교 항목 (위치, 월 비용, 전용면적 등).
  - 열(Column): 물건 A, 물건 B(강조), 물건 C.
  - Cell: 데이터 값 + 우위 항목에 뱃지(⭐ 최저가) 표시.
  - Footer: "3년 누적 효과" 그래프 또는 강조 텍스트.

### 5.2 상세 뷰 (Detailed View)
- 기존 단일 보고서 UI 재사용.
- 상단에 "목록으로(비교표로) 돌아가기" 플로팅 버튼 추가.
- 비교군 내에서의 해당 물건의 포지션(예: "가격 경쟁력 1위") 배너 노출.

---

## 6. 구현 계획 (Implementation Plan)

1. **Step 1**: `ComparisonEngine` 구현 (API 병렬 호출 및 정규화).
2. **Step 2**: `RecommendationAlgorithm` 구현 (유형별 점수 산정).
3. **Step 3**: `ComparisonView` UI 컴포넌트 개발 (반응형 테이블/카드).
4. **Step 4**: 상세 보고서 연결 및 전체 플로우 통합.