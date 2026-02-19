# Design: Landing Web Value-up

## Architecture overview
- `src/app/page.tsx`의 랜딩 조합부에 신규 `LandingValueUp` 섹션을 삽입한다.
- 기존 컴포넌트 구조를 유지하고, 섹션 단위 확장으로 리스크를 최소화한다.

## Data model / schema
- 데이터 스키마 변경 없음.
- 정적 카피 기반 배열 상수로 섹션 내용을 렌더링한다.

## APIs / interfaces
- API 인터페이스 변경 없음.
- 기존 검색/분석 흐름의 함수 시그니처 변경 없음.

## UI flow
1. Hero: 서비스 요약 + 검색 입력 + 신뢰 배지
2. Features: 주요 기능
3. Value-up: 비즈니스 효익(속도/리스크/실행) 카드
4. Stats -> HowItWorks -> Testimonials -> FAQ -> CTA

## Edge cases
- 모바일에서 카드/배지 줄바꿈이 늘어날 수 있으므로 `text-xs`, `gap`을 보수적으로 적용한다.
- 신규 섹션 추가로 전체 페이지 길이가 증가하므로 스크롤 피로를 줄이기 위해 카드 수를 제한한다.

## Test plan
- Command:
  - `npx eslint src/components/landing/LandingHero.tsx src/components/landing/LandingValueUp.tsx src/app/page.tsx`
- Expected:
  - 변경 파일 lint 통과
- Command:
  - `npm run lint`
- Expected:
  - 전역 lint 통과
