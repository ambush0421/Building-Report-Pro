# Design: Map Address Geocode Sync

## Client Flow
- 주소 선택 후 단일 주소가 아닌 다중 후보 주소(통합/도로명/지번) 순으로 지오코딩을 시도한다.
- 첫 성공 좌표를 `coords` 상태에 반영해 지도 중심/마커가 즉시 갱신되도록 한다.

## API Flow
- `/api/geocode?address=`에서 좌표 변환 우선순위를 확장한다.
1. Kakao Local REST (키가 있을 때)
2. VWorld ROAD
3. VWorld PARCEL
4. OSM Nominatim

## Test Plan
- 도로명 주소 입력 후 지도 위치 이동 확인
- 지번 주소 입력 후 지도 위치 이동 확인
- 특정 공급자 실패 시 다음 공급자로 폴백되는지 확인
