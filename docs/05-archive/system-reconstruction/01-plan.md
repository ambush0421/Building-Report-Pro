# Terminology & Schema Definition (Phase 1)

## 1. 주요 용어 (Terms)

| 용어 | 정의 | 예시 |
|:---|:---|:---|
| **Property** | 분석 대상이 되는 부동산 건축물 | OO빌딩, XX타워 |
| **LEASE** | 임차 목적의 분석 유형 | 보증금/월세 중심 |
| **PURCHASE** | 사옥 매입 목적의 분석 유형 | 매매가/자산가치 중심 |
| **INVEST** | 근생/투자 목적의 분석 유형 | 수익률(Cap Rate) 중심 |
| **Cap Rate** | 자본환원율 (연간 순수익 / 매매가) | 4.5% |
| **CoC Return** | 자기자본 수익률 (세전 현금흐름 / 실투자금) | 12.0% |
| **LTV** | 담보인정비율 (대출금 / 매매가) | 60% |

## 2. 엔티티 정의 (Entities)

### BuildingReport (통합 보고서 객체)
```typescript
interface BuildingReport {
  // 기본 정보
  bldNm: string;                // 건물명
  platAddr: string;             // 대지위치
  reportType: 'LEASE' | 'PURCHASE' | 'INVEST';
  
  // 건축 지표
  vlrtBldRgstYn: 'Y' | 'N';
  platArea: number;             // 대지면적 (m2)
  totArea: number;              // 연면적 (m2)
  bcRat: number;                // 건폐율 (%)
  vlrat: number;                // 용적률 (%)
  mainPurpsCdNm: string;        // 주용도
  strctCdNm: string;            // 구조
  indrMechUtcnt: number;        // 주차대수
  useAprvDay: string;           // 사용승인일 (YYYYMMDD)
  
  // 금융 지표 (입력 및 계산값)
  financials?: {
    deposit: number;            // 보증금 (만원)
    monthlyRent: number;        // 월세 (만원)
    purchasePrice: number;      // 매매가 (만원)
  };

  // 분석 엔진 결과 (v4)
  analysis?: {
    score: number;
    reasoning: string;
    breakdown: {
      costScore: number;
      areaScore: number;
      parkingScore: number;
      modernityScore: number;
    };
    financialSimulation?: FinancialSimulation;
  };

  // 외부 데이터
  landInfo?: LandInfo;
  priceHistory?: PriceHistory[];
}
```

### FinancialSimulation (재무 시뮬레이션 결과)
```typescript
interface FinancialSimulation {
  initial: {
    acquisitionTax: number;     // 취득세
    loanAmount: number;         // 대출금
    equity: number;             // 자기자본
  };
  monthly: {
    grossIncome: number;        // 총수입
    interest: number;           // 이자비용
    cashFlow: number;           // 순현금흐름
  };
  ratios: {
    capRate: number;
    cocReturn: number;
  };
}
```
