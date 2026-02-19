# Design: Landing Korean Copy Refresh

## Architecture overview
- 본 작업은 UI 텍스트 교체 중심이며 컴포넌트 구조/데이터 흐름 변경은 없다.
- 모든 변경은 프론트엔드 정적 카피 상수/헤더 문자열에 한정한다.

## Data model / schema
- 해당 없음 (데이터 스키마 변경 없음).

## APIs / interfaces
- 해당 없음 (API 인터페이스 변경 없음).

## UI flow (if any)
- 랜딩 진입 -> 기능 소개 -> 통계 -> 사용 방법 -> FAQ -> CTA 흐름에서 문구만 한국어 중심으로 정리한다.

## Copy tone and mapping
- 톤 기준:
  - 직관적이고 짧은 업무형 문장
  - 의미가 모호한 직역 대신 실제 사용 맥락 중심 표현
  - 브랜드명 `BuildingReportPro`는 유지
- 파일별 적용:
  - `LandingFeatures.tsx`
    - 카드 타이틀/설명, 섹션 헤더를 한국어로 교체
  - `LandingStats.tsx`
    - 통계 라벨 영문 -> 한국어 교체
  - `LandingHowItWorks.tsx`
    - 섹션 제목/3단계 설명 한국어 교체
  - `LandingFAQ.tsx`
    - 질문/답변 전부 한국어 교체, 타이틀 `자주 묻는 질문`으로 변경
  - `LandingCTA.tsx`
    - 배지/제목/설명/버튼 텍스트 한국어 교체
  - `StepIndicator.tsx`
    - 단계 라벨 `검색/분석/견적`으로 교체

## Edge cases
- 텍스트 길이 증가로 줄바꿈/높이 변화가 발생할 수 있다.
- `StepIndicator` 재사용 화면에서 용어 일관성이 필요하다.

## Test plan
- Command:
  - `npx eslint src/components/landing/LandingFeatures.tsx src/components/landing/LandingStats.tsx src/components/landing/LandingHowItWorks.tsx src/components/landing/LandingFAQ.tsx src/components/landing/LandingCTA.tsx src/components/landing/StepIndicator.tsx`
- Expected:
  - 변경 파일 lint 통과
- Command:
  - `npm run lint`
- Expected:
  - 전역 lint 기준 통과
