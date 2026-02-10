# Design: 기업 이전용 사옥 견적 및 빌딩 보고서 시스템 (Building API Report)

> **요약**: 기업 이전 결정권자를 위한 반응형 빌딩 리포트 및 자동 견적 시스템 설계
>
> **프로젝트**: building-report-pro
> **버전**: 0.1.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [building-api-report.plan.md](../../01-plan/features/building-api-report.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- 공공데이터(건축물대장)를 활용한 정확한 빌딩 정보 추출.
- 모바일/웹 환경에 최적화된 데이터 변환 및 요약 로직 구축.
- 결정권자가 즉시 의사결정할 수 있는 시각적 리포트 레이아웃 설계.

### 1.2 설계 원칙
- **Data Integrity**: 원본 데이터의 훼손 없이 필요한 정보만 정제하여 전달.
- **Responsive-First**: 모바일에서도 모든 정보를 한눈에 파악할 수 있는 카드형 UI.
- **Log-Driven Quality**: Zero Script QA를 위한 구조화된 로깅 유지.

---

## 2. 아키텍처 (Architecture)

### 2.1 구성도
```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Next.js UI  │ ──▶  │ API Route    │ ──▶  │ 공공데이터포털 │
│ (React/Map)  │ ◀──  │ (Edge/Node)  │ ◀──  │ (건축물대장)   │
└──────────────┘      └──────────────┘      └──────────────┘
```

### 2.2 데이터 흐름
1. 클라이언트: 시군구코드, 법정동코드, 번지 정보를 API에 전달.
2. 서버: `lib/logger`를 통한 요청 기록 후 공공데이터 API 호출.
3. 서버: XML/JSON 응답 수신 후 `reportItems` 형식으로 데이터 변환(Transformation).
4. 서버: 위반건축물 여부 및 요약 정보(`summary`) 산출.
5. 클라이언트: 받은 데이터를 기반으로 차트 및 대시보드 렌더링.

---

## 3. 데이터 모델 (Data Model)

### 3.1 보고서 데이터 구조 (Internal API Response)
```typescript
interface BuildingReportResponse {
  meta: {
    request: object;
    timestamp: string;
  };
  summary: {
    totalBuildings: number;
    violationCount: number;
    avgAge: number;
  };
  items: BuildingItem[];
}

interface BuildingItem {
  pk: number;             // 관리건축물대장 PK
  name: string;           // 건물명/동명
  address: string;        // 도로명/지번 주소
  violation: boolean;     // 위반건축물 여부
  platArea: number;       // 대지면적
  totArea: number;        // 연면적
  bcRat: number;          // 건폐율
  vlRat: number;          // 용적률
  mainPurps: string;      // 주용도
  structure: string;      // 구조
  parking: {
    indoor: number;
    outdoor: number;
  };
}
```

---

## 4. API 명세 (API Specification)

### 4.1 엔드포인트 리스트

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/building-report` | 빌딩 상세 정보 및 요약 조회 | Optional |

### 4.2 상세 명세

#### `GET /api/building-report`

**Query Parameters:**
- `sigunguCd` (String, Required): 시군구코드 (예: 11680)
- `bjdongCd` (String, Required): 법정동코드 (예: 10300)
- `bun` (String, Optional): 번 (4자리, 기본 0000)
- `ji` (String, Optional): 지 (4자리, 기본 0000)

**Response (200 OK):**
```json
{
  "meta": { "timestamp": "..." },
  "summary": { "totalBuildings": 1, "violationCount": 0, "avgAge": 0 },
  "items": [
    {
      "pk": 12345,
      "name": "OO빌딩",
      "violation": false,
      "totArea": 1500.5,
      "mainPurps": "업무시설"
    }
  ]
}
```

---

## 5. UI/UX 설계 (UI/UX Design)

### 5.1 모바일/웹 대응 전략
- **Mobile**: `summary` 섹션을 상단에 배치하고, 각 건물 정보는 세로 스크롤 가능한 카드 형태로 노출.
- **Web**: 좌측에 요약 및 지도, 우측에 상세 테이블 및 분석 차트 배치.
- **Action**: "PDF 보고서 생성" 버튼을 하단(Mobile) 또는 우측 상단(Web)에 고정(Sticky).

### 5.2 핵심 컴포넌트
- `BuildingSummaryCard`: 대지면적, 연면적 등 핵심 지표 요약.
- `ViolationAlert`: 위반건축물 발생 시 시각적 경고(Red Badge).
- `AreaAnalysisChart`: 용적률/건폐율의 법정 상한선 대비 현재 비율 시각화.
