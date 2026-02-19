# Plan: Map Address Search Accuracy Fix

## Goal
- 주소 검색 후 카카오맵 중심/마커가 입력 주소와 더 정확하게 일치하도록 좌표 결정 로직을 보완한다.

## Scope
- `src/app/page.tsx`의 주소 후보 우선순위를 주소 유형(도로명/지번) 기준으로 조정
- `src/app/api/geocode/route.ts`의 카카오 키 인식 호환성 및 키워드 정밀화 오탐 억제
- 린트 실행으로 정적 검증 시도

## Out of Scope
- Daum Postcode UI 변경
- 지도 컴포넌트 스타일 변경
