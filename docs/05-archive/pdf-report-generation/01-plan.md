# Plan: 전문 PDF 리포트 생성 (PDF Report Generation)

> **Summary**: 의사결정권자에게 제출 가능한 고품질 A4 PDF 보고서 자동 생성 기능 구현
>
> **Project**: building-report-pro
> **Version**: 0.1.0
> **Author**: Gemini Agent
> **Date**: 2026-02-10
> **Status**: Draft

---

## 1. 개요 (Overview)

### 1.1 목적
- 웹에서 확인한 비교 보고서 및 상세 데이터를 A4 규격의 정돈된 문서 형태로 출력하여 실무자가 즉시 보고용으로 사용할 수 있게 함.

### 1.2 배경
- 부동산 실무 현장에서는 디지털 화면 공유 외에도 종이 문서나 공식적인 PDF 파일 형태의 제안서가 필수적임.

---

## 2. 범위 (Scope)

### 2.1 주요 포함 사항 (In Scope)
- [ ] **표지(Cover Page)**: 프로젝트명, 생성일, 담당자 정보 포함.
- [ ] **비교 요약 페이지**: AI 추천 결과 및 핵심 비교표(V3 엔진 결과 반영).
- [ ] **상세 물건 페이지**: 개별 건물의 건축물대장 및 실거래가 상세 분석.
- [ ] **자동 페이지네이션**: 데이터 양에 따른 유연한 페이지 분할.
- [ ] **브랜딩**: 회사의 신뢰도를 높이는 세련된 레이아웃 및 폰트 적용.

### 2.2 제외 사항 (Out of Scope)
- 사용자 정의 워터마크 (추후 고도화).
- PDF 내의 인터랙티브 요소 (차트 애니메이션 등).

---

## 3. 요구사항 (Requirements)

### 3.1 기능적 요구사항 (Functional Requirements)

| ID | 요구사항 | 우선순위 | 상태 |
|----|----------|----------|------|
| FR-01 | 비교 보고서 데이터 PDF 변환 엔진 구축 | High | Pending |
| FR-02 | A4 최적화 레이아웃 템플릿 설계 | High | Pending |
| FR-03 | 브라우저 내 즉시 다운로드 기능 | Medium | Pending |
| FR-04 | 실거래가 및 추천 사유 텍스트 포함 | Medium | Pending |

---

## 4. 아키텍처 고려사항 (Architecture)

### 4.1 기술 결정
- **Library**: `@react-pdf/renderer` (Client-side PDF generation).
- **Style**: PDF 전용 스타일 엔진을 사용하여 A4 규격(595.28pt x 841.89pt) 대응.

---

## 5. 성공 기준 (Success Criteria)

- [ ] PDF 생성 버튼 클릭 후 3초 이내 파일 생성.
- [ ] 출력 시 텍스트 및 테이블 레이아웃 깨짐 없음.
- [ ] 고해상도 텍스트 및 벡터 아이콘 유지.

---

## 6. 향후 계획 (Next Steps)

1. [ ] PDF 전용 UI 컴포넌트 설계 (`pdf-report-generation.design.md`)
2. [ ] 폰트 및 이미지 에셋 준비
3. [ ] 핵심 데이터 바인딩 및 렌더링 구현
