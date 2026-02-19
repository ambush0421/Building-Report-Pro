# Tasks: Map Geocode Precision Fix

1. [x] `plan.md` 작성
2. [x] `design.md` 작성
3. [x] 카카오 주소검색 `exact -> similar` 정책 적용
4. [x] 카카오 다중 결과 번지 일치 점수 기반 선택 로직 추가
5. [x] 주소 후보 순서 지번 우선으로 조정
6. [x] 건축물대장 공식 주소 기반 2차 좌표 정밀화 추가
7. [x] 건물명(`bldNm`) 전달 기반 카카오 키워드 정밀화 추가
8. [ ] `npm.cmd run lint` 실행

## Validation Attempt Log
- 2026-02-17: `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134).
- 2026-02-17: `npm.cmd run lint` 재실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134).
