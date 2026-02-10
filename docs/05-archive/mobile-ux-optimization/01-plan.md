# Plan: 모바일 UX 최적화 (Mobile UX Optimization)

> **Summary**: 현장 실무자를 위한 모바일 환경에서의 보고서 열람 및 비교 경험 최적화
>
> **Project**: building-report-pro
> **Version**: 0.1.0
> **Author**: Gemini Agent
> **Date**: 2026-02-10
> **Status**: Draft

---

## 1. 개요 (Overview)

### 1.1 목적
- 부동산 실무자가 현장에서 스마트폰으로 보고서를 확인하고 대표님께 즉시 공유할 수 있도록 모바일 환경에 최적화된 UX를 제공함.

### 1.2 배경
- 현재 시스템은 데스크톱 중심의 레이아웃으로, 모바일에서 다중 물건 비교 시 가독성이 떨어짐. 현장에서의 기동성을 높이기 위한 모바일 전용 기능이 필요함.

---

## 2. 범위 (Scope)

### 2.1 주요 포함 사항 (In Scope)
- [ ] **가로 스와이프 비교 카드**: 모바일 좁은 화면에서 여러 물건을 넘겨가며 비교할 수 있는 카드 UI.
- [ ] **플로팅 액션 버튼 (FAB)**: PDF 다운로드, 카카오톡 공유 등 핵심 기능을 엄지손가락 범위 내 배치.
- [ ] **지도 중심 탐색**: 모바일 GPS를 활용한 내 주변 물건 자동 탐색 및 거리 표시.
- [ ] **반응형 테이블 최적화**: 복잡한 비교표를 모바일에서 가독성 있게 리디자인 (Accordion 또는 가로 스크롤).

### 2.2 제외 사항 (Out of Scope)
- 네이티브 앱 개발 (웹 브라우저 최적화에 집중).
- 오프라인 모드 지원.

---

## 3. 요구사항 (Requirements)

### 3.1 기능적 요구사항 (Functional Requirements)

| ID | 요구사항 | 우선순위 | 상태 |
|----|----------|----------|------|
| FR-01 | 모바일 전용 가로 스와이프 비교 컴포넌트 개발 | High | Pending |
| FR-02 | 핵심 액션(공유, PDF) 플로팅 UI 구현 | High | Pending |
| FR-03 | 모바일 화면에서의 실거래가 차트 레이아웃 조정 | Medium | Pending |
| FR-04 | 원터치 주소 복사 및 지도 연동 | Medium | Pending |

---

## 4. 아키텍처 고려사항 (Architecture)

### 4.1 기술 결정
- **UI Framework**: Tailwind CSS (Mobile-first breakpoints).
- **Interactions**: Framer Motion (Smooth swipe transitions).
- **Sharing**: Web Share API 연동.

---

## 5. 성공 기준 (Success Criteria)

- [ ] 모바일 페이지 로딩 후 첫 의미 있는 페인트(FCP) 1.2초 이내.
- [ ] iPhone 및 Android 주요 기기에서 레이아웃 깨짐 0건.
- [ ] 모바일에서의 보고서 공유 횟수 증가.

---

## 6. 향후 계획 (Next Steps)

1. [ ] 모바일 전용 와이어프레임 설계 (`mobile-ux-optimization.design.md`)
2. [ ] 스와이프 가능한 카드 컴포넌트 프로토타이핑
3. [ ] 반응형 브레이크포인트 전수 점검 및 튜닝
