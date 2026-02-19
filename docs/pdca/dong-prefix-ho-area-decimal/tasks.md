# Tasks: Dong Prefix Ho Parsing & Decimal Area Display

1. [x] Plan 문서 작성
2. [x] Design 문서 작성
3. [x] `SelectionPage`에 `hoNm` 접두사 파싱 헬퍼 적용
4. [x] `SelectionPage` 동 필터/검색 로직을 접두사 파싱 기반으로 정리
5. [x] `SelectionPage` 총 전용면적 표시에서 소수점 버림 제거
6. [x] `QuotationModal` 평수 표기를 고정 1자리에서 소수점 유지 포맷으로 변경
7. [x] `UnitGridTable` 평수 표기를 소수점 유지 포맷으로 변경
8. [x] `app/page.tsx` 계약면적 계산 반올림 제거
9. [ ] lint 실행 및 결과 확인
10. [x] `SelectionPage` 층별 호실 목록을 호수 순서(자연 정렬)로 표시
11. [x] `QuotationModal` 선택 호실 상세표를 층/호수 순서로 정렬
12. [x] `514-1` 같은 숫자-숫자 패턴은 동 접두사로 해석하지 않도록 예외 처리
13. [x] `㎡` 표시는 원본 소수점(건축물대장 값) 그대로 출력되도록 반올림 제거
14. [x] 검색창 주소 패널을 헤더 아래 상단 레이아웃 영역으로 분리해 겹침 제거
15. [x] 평(전용/계약/합계) 표시는 소수점 2자리 고정으로 통일
16. [x] ㎡는 건축물대장 원본 소수점을 모두 표시, 평은 소수점 2자리 고정으로 최종 정렬

## Validation Attempt Log
- 2026-02-17: `npm.cmd run lint` 실행 시 Node 런타임 assert(`ncrypto::CSPRNG(nullptr, 0)`)로 프로세스 종료(code 134). 환경 이슈로 lint 검증 미완료.
- 2026-02-17: 수정 반영 후 `npm.cmd run lint` 재시도했으나 동일한 Node 런타임 assert(`ncrypto::CSPRNG(nullptr, 0)`)로 실패.
- 2026-02-17: 호수 정렬 보완 후 `npm.cmd run lint` 재실행했으나 동일한 Node 런타임 assert로 실패.
- 2026-02-17: 견적 상세 정렬 보완 후 `npm.cmd run lint` 재실행했으나 동일한 Node 런타임 assert로 실패.
- 2026-02-17: 숫자-숫자 하이픈 패턴 예외 처리 후 `npm.cmd run lint` 재실행했으나 동일한 Node 런타임 assert로 실패.
- 2026-02-17: ㎡ 원본 소수점 표시 반영 후 `npm.cmd run lint` 재실행했으나 동일한 Node 런타임 assert로 실패.
- 2026-02-17: 검색창/주소패널 레이아웃 보정 후 `npm.cmd run lint` 재실행했으나 동일한 Node 런타임 assert로 실패.
- 2026-02-17: 평 표기 2자리 고정 반영 후 `npm.cmd run lint` 재실행했으나 동일한 Node 런타임 assert로 실패.
- 2026-02-17: "㎡ 원본 소수점 전체 + 평 2자리" 최종 반영 후 `npm.cmd run lint` 재실행했으나 동일한 Node 런타임 assert로 실패.
