# Design: 실거래가 데이터 연동 (Real Trade Integration)

> **요약**: 국토부 실거래가 API 연동을 통한 가격 신뢰도 확보 및 시세 분석 엔진 설계
>
> **프로젝트**: building-report-pro
> **버전**: 1.0.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [real-trade-integration.plan.md](../../01-plan/features/real-trade-integration.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- 공공데이터포털 실거래가 API를 병렬로 호출하여 보고서 생성 속도 유지.
- 복잡한 실거래가 응답 데이터를 평당 단가 및 연도별 추이로 정규화.
- 지도(Map) UI와의 유기적인 결합을 통한 위치 기반 시세 정보 제공.

---

## 2. 아키텍처 (Architecture)

### 2.1 데이터 흐름
1. 클라이언트: 보고서 생성 시 실거래가 조회 옵션 활성화.
2. 서버 (`/api/real-trade`):
   - 해당 지역(`sigunguCd`, `bjdongCd`)의 최근 12개월 데이터를 요청.
   - 받아온 XML/JSON 데이터를 상업용/업무용으로 분류.
   - 평당 단가($	ext{Amount} / 	ext{Area}$) 계산 및 상위 5건 추출.
3. 클라이언트: `RealTradeChart` 및 비교표 내 시세 항목 렌더링.

---

## 3. API 명세 (API Specification)

### 3.1 `GET /api/real-trade`
**Query Parameters:**
- `sigunguCd`: 시군구코드
- `bjdongCd`: 법정동코드
- `months`: 조회 범위 (기본 12개월)

**Response:**
```json
{
  "summary": {
    "avgPyungPrice": 4500, // 평당 평균가 (만원)
    "totalCount": 24,
    "trend": "UP"
  },
  "items": [
    {
      "amount": "125,000",
      "area": 124.5,
      "date": "2025-12-10",
      "pyungPrice": 4200
    }
  ]
}
```

---

## 4. UI/UX 상세 설계

### 4.1 비교 보고서 통합
- 비교표 하단에 **'인근 실거래 시세'** 행 추가.
- "A 물건은 인근 실거래 평균 대비 10% 저렴합니다"와 같은 인사이트 배너 노출.

### 4.2 시계열 차트
- Recharts를 사용하여 최근 1년간의 거래가 변동 추이를 선형 그래프로 표시.

---

## 5. 구현 계획 (Implementation Plan)

1. **Step 1**: 국토부 실거래가 API 핸들러(`api/real-trade/route.ts`) 구현.
2. **Step 2**: 데이터 정규화 및 평당가 산출 엔진 개발.
3. **Step 3**: `MarketChart` 컴포넌트 고도화 (Recharts 연동).
4. **Step 4**: 비교 보고서 V3 엔진에 실거래가 점수(Market Score) 반영.
