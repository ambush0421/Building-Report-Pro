# Design: 모바일 UX 최적화 (Mobile UX Optimization)

> **요약**: 현장 실무자를 위한 한 손 조작 및 스와이프 기반의 모바일 특화 보고서 인터페이스 설계
>
> **프로젝트**: building-report-pro
> **버전**: 1.0.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [mobile-ux-optimization.plan.md](../../01-plan/features/mobile-ux-optimization.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- **Thumb-Friendly**: 모든 주요 액션을 스마트폰 하단 영역(엄지손가락 범위)에 배치.
- **Horizontal Comparison**: 모바일의 세로형 화면 한계를 극복하는 가로 스와이프 비교 카드 구현.
- **Visual Clarity**: 텍스트 크기를 키우고 아이콘 중심의 시각적 요약 정보 제공.

---

## 2. 모바일 전용 컴포넌트 설계

### 2.1 Comparison Swipe Cards
- **구조**: 화면 중앙에 1개의 물건 카드를 크게 배치하고, 좌우 스와이프로 다른 후보 물건으로 전환.
- **인디케이터**: 하단에 점(Dot) 또는 "1/3" 형태의 페이지 표시기 배치.
- **추천 강조**: AI 추천 물건 카드에는 화려한 테두리와 "BEST" 뱃지 고정.

### 2.2 Floating Action Bar (FAB)
- **위치**: 화면 하단에 고정된 반투명 바.
- **버튼**: 
  - [PDF 다운로드] (아이콘 + 텍스트)
  - [공유하기] (아이콘 + 텍스트)
  - [상담문의] (강조 컬러)

---

## 3. UI/UX 레이아웃 변화 (Breakpoints)

### 3.1 데스크톱 vs 모바일
| 요소 | 데스크톱 (LG) | 모바일 (SM) |
|:---:|:---|:---|
| **비교표** | 12컬럼 그리드 (병렬 노출) | 1개 카드 집중 노출 + 스와이프 |
| **가중치 설정** | 좌측 사이드바 | 하단 드로어(Bottom Sheet) |
| **차트** | 상세 데이터 포함 넓은 뷰 | 핵심 추이만 보여주는 요약 뷰 |

---

## 4. 인터랙션 가이드

### 4.1 스와이프 (Swipe)
- **Library**: `framer-motion` 또는 `embla-carousel-react`.
- **Feedback**: 카드 전환 시 부드러운 가속도 애니메이션 및 햅틱 효과 연출.

### 4.2 버튼 피드백
- 모든 버튼 클릭 시 즉각적인 스케일 다운 효과(`active:scale-95`).

---

## 5. 구현 단계 (Implementation Plan)

1. **Step 1**: 모바일 브레이크포인트에 따른 레이아웃 조건부 렌더링 로직 추가.
2. **Step 2**: `MobileComparisonCard` 컴포넌트 개발.
3. **Step 3**: `BottomActionSheet` 가중치 설정용 드로어 구현.
4. **Step 4**: Web Share API를 활용한 결과 보고서 카카오톡/문자 공유 기능 연동.
