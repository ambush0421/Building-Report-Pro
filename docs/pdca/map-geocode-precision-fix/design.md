# Design: Map Geocode Precision Fix

## Geocoding Policy
- 카카오 주소검색은 `analyze_type=exact`를 먼저 시도하고, 실패 시 `similar`로 폴백한다.
- 응답 문서가 여러 개인 경우 번지(본번/부번) 일치도를 점수화하여 최적 문서를 선택한다.
- 건물명이 전달되면 카카오 키워드 검색(`건물명 + 주소`)으로 추가 정밀화를 수행한다.
- 카카오 실패 시 VWorld ROAD → VWorld PARCEL → Nominatim 순으로 폴백한다.

## Client Refinement
- 주소 선택 직후 좌표 조회 후보 순서를 지번 주소 우선으로 바꿔 정밀도를 높인다.
- 건축물대장 응답 수신 후 `newPlatPlc/platPlc` 공식 주소로 2차 좌표 정밀화(re-geocode)를 수행한다.
- 2차 정밀화 요청 시 `bldNm`을 함께 전달해 동일 도로 내 오프셋을 줄인다.

## Expected Outcome
- `서울 강서구 마곡동 798-14` 같은 지번 입력 시 다른 블록/역사 주변으로 찍히는 빈도를 줄인다.
