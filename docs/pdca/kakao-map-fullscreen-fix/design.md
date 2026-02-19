# Design: Kakao Map Fullscreen Fix

## Architecture
- 카카오 SDK는 `useKakaoLoader`로 appkey 기반 로딩/에러를 관리한다.
- 카카오 로딩 실패 시 OpenStreetMap으로 즉시 폴백한다.
- 지도 컴포넌트는 공통으로 전체화면 토글 상태를 받아 fixed overlay 형태로 확장한다.

## UX
- 우측 상단 버튼으로 전체화면 열기/해제를 지원한다.
- `ESC` 키로 전체화면을 닫을 수 있다.
- 일반 모드에서는 `클릭해 전체화면` CTA 버튼을 제공한다.

## Test Plan
- 카카오 키 유효 시 지도 타일 정상 렌더 확인.
- 카카오 로드 실패 시 OSM 폴백 및 안내 메시지 확인.
- 전체화면 열기/닫기 버튼, ESC 닫기 동작 확인.
