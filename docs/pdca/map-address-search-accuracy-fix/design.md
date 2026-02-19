# Design: Map Address Search Accuracy Fix

## Address Candidate Policy
- 도로명 주소가 입력된 경우: `fullAddress -> roadAddress -> jibunAddress -> autoJibunAddress`
- 지번 주소가 입력된 경우: `jibunAddress -> autoJibunAddress -> fullAddress -> roadAddress`
- 공식 주소 재정밀화도 동일한 도로명/지번 분기 정책을 적용한다.

## Geocode Refinement Policy
- `KAKAO_REST_API_KEY`가 없더라도 `NEXT_PUBLIC_VITE_KAKAO_REST_API_KEY`, `NEXT_PUBLIC_KAKAO_REST_API_KEY`를 순차 fallback으로 허용한다.
- 건물명 키워드 기반 좌표 보정은 `이름 일치 + (번지 일치 또는 주소 문자열 일치)`일 때만 반영한다.
- 점수 임계값을 둬 낮은 신뢰도 결과가 기본 주소 좌표를 덮어쓰지 않도록 한다.

## Map Runtime Safeguard
- 카카오맵 SDK(`services`) 로드 후 `Geocoder.addressSearch`로 주소를 한 번 더 확인한다.
- 서버 geocode 결과가 부정확하거나 카카오 REST 키가 없는 환경에서도 지도 중심/대표 마커를 주소 기준으로 재정렬한다.

## Expected Result
- 동일 번지/유사 건물명 오탐으로 인한 지도 오프셋 빈도가 감소한다.
