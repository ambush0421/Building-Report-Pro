# Plan: Landing Korean Copy Refresh

## Goal
- 랜딩 페이지에서 사용자에게 노출되는 어색한 영문 문구를 한국어 중심 문구로 정리해 읽기 흐름과 전달력을 개선한다.

## Scope
- 아래 랜딩/진입 컴포넌트의 사용자 노출 텍스트를 점검 및 교체한다.
  - `src/components/landing/LandingFeatures.tsx`
  - `src/components/landing/LandingStats.tsx`
  - `src/components/landing/LandingHowItWorks.tsx`
  - `src/components/landing/LandingFAQ.tsx`
  - `src/components/landing/LandingCTA.tsx`
  - `src/components/landing/StepIndicator.tsx`
- 필요한 경우 홈 화면 진입부(`src/app/page.tsx`)의 랜딩 관련 영문 CTA/상태 문구도 함께 정리한다.

## Non-goals
- 대시보드 전반(랜딩 외 영역) 카피 리라이팅.
- API/상태관리/비즈니스 로직 변경.
- UI 레이아웃 대개편 및 스타일 토큰 변경.

## Assumptions
- 서비스 타겟 사용자는 한국어 사용자이며, 안내 문구는 한국어 우선이 적합하다.
- 제품/브랜드명(`BuildingReportPro`)은 영문 유지가 허용된다.
- 지표 값(숫자/퍼센트) 자체는 유지하고 라벨 문구만 조정한다.

## Acceptance Criteria
- 랜딩 섹션의 핵심 영문 카피(Features/Stats/How It Works/FAQ/CTA/StepIndicator)가 자연스러운 한국어로 교체된다.
- FAQ 질문/답변이 한국어로 통일된다.
- 단계 표시(`Search`, `Analyze`, `Quote`)가 한국어로 교체된다.
- 문구 변경 후 레이아웃이 깨지지 않고 모바일/데스크톱에서 가독성을 유지한다.
- 변경 파일 기준 lint 검증을 통과한다.

## Risks / Dependencies
- 번역 톤 선택(격식/간결) 합의가 없으면 재수정 가능성이 있다.
- 한국어 문구 길이 증가로 인해 일부 카드/버튼 폭이 조정될 수 있다.
- `StepIndicator`는 랜딩 외 화면에서도 재사용되어 용어 변경 영향이 전파될 수 있다.
