# Design: 전문 PDF 리포트 생성 (PDF Report Generation)

> **요약**: 의사결정권자에게 제출 가능한 A4 규격의 전문적인 부동산 분석 보고서 레이아웃 설계
>
> **프로젝트**: building-report-pro
> **버전**: 1.0.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [pdf-report-generation.plan.md](../../01-plan/features/pdf-report-generation.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- **Professionalism**: 웹 화면보다 더 격조 높은 비즈니스 제안서 스타일 구현.
- **Data Integrity**: V3 추천 엔진에서 산출된 모든 분석 근거(상대적 우위 등) 포함.
- **Print Optimization**: A4 인쇄 시 잘림 없는 완벽한 레이아웃 보장.

---

## 2. 컴포넌트 아키텍처 (Architecture)

### 2.1 PDF 구조 (Document Tree)
```
<Document>
  <CoverPage />           // 1페이지: 제목, 날짜, 담당자
  <SummaryPage />         // 2페이지: AI 추천 결과 및 핵심 비교표
  <DetailedPages />       // 3페이지~: 각 물건별 상세 데이터 (1건당 1페이지)
  <Footer />              // 공통: 페이지 번호, 로고
</Document>
```

---

## 3. 페이지 상세 설계 (Layout Templates)

### 3.1 표지 (CoverPage)
- **배경**: 신뢰감을 주는 다크 네이비 또는 정갈한 화이트 톤.
- **요소**: 
  - 큰 텍스트: "부동산 기업 이전 의사결정 보고서"
  - 서브 텍스트: 프로젝트명 및 지역명.
  - 하단: 생성 일시 및 생성자.

### 3.2 요약 (SummaryPage)
- **Top Section**: "🏆 최적 대안: [건물명]" 강조 박스.
- **Comparison Table**: 
  - 폰트 크기 및 선 굵기를 조절하여 가독성 확보.
  - 베스트 항목에 색상 하이라이트 (Blue/Emerald).
- **Reasoning**: V3 엔진의 문장형 근거 텍스트 노출.

### 3.3 상세 (DetailedPage)
- **Header**: 건물명 및 주소.
- **Body**: 
  - 좌측: 기본 개요(연면적, 준공연도 등).
  - 우측: 금융 분석 및 시세 데이터.
- **Checklist**: 법적 리스크 및 위반 여부 배너.

---

## 4. 스타일 및 폰트 (Styling & Fonts)

### 4.1 폰트 설정
- **한글 지원**: `Pretendard` 또는 `Namsan` 등 가독성 좋은 웹 폰트 임베딩.
- **Bold/Regular**: 강조 데이터와 일반 데이터의 명확한 구분.

### 4.2 컬러 시스템
- **Primary**: `#2563EB` (Blue 600) - 포인트 컬러
- **Secondary**: `#1E293B` (Slate 800) - 텍스트 및 선
- **Background**: `#F8FAFC` (Slate 50) - 배경 및 테이블 행 구분

---

## 5. 구현 단계 (Implementation Plan)

1. **Step 1**: 라이브러리 설치 (`npm install @react-pdf/renderer`).
2. **Step 2**: PDF 공통 스타일 및 테마 정의.
3. **Step 3**: `PDFReport` 메인 컴포넌트 및 하위 페이지 컴포넌트 구현.
4. **Step 4**: 기존 `ComparePage`와 연동하여 데이터 전달 및 다운로드 기능 추가.
