# Design: Roadview Feature

## Interaction
- 카카오 지도 헤더에 `지도 / 로드뷰` 토글을 추가한다.
- 전체화면 상태에서도 동일 토글을 유지한다.

## Rendering
- `map` 모드: 기존 지도 + 실거래 오버레이 마커를 표시한다.
- `roadview` 모드: `Roadview` + `RoadviewMarker`를 표시한다.
- 로드뷰 파노라마 탐색 실패 시 안내 배너를 띄운다.

## Fallback
- 카카오 키가 없거나 로딩 실패 시 OSM으로 전환한다.
- 이때 상태 메시지에 로드뷰는 카카오 지도 전용임을 명시한다.
