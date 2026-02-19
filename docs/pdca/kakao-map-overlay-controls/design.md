# Design: Kakao Map Overlay Controls

## UI
- 지도 상단 좌측에 오버레이 박스를 추가한다.
  - `주변` 버튼
  - 지역 브레드크럼(시/구/동)
  - 현재 기온/날씨 배지
- 지도 상단 우측에 카카오 `MapTypeControl`(지도/스카이뷰)을 추가한다.
- 지도 모드에서 우측 로드뷰 바로가기 버튼을 추가한다.

## Data
- 지역 브레드크럼은 `/api/geocode?lat&lng` 역지오코딩으로 가져온다.
- 날씨는 Open-Meteo current weather API로 좌표 기반 조회한다.

## Fallback
- 네트워크 실패 시 기존 지도/마커 렌더를 유지하고 텍스트만 업데이트하지 않는다.
