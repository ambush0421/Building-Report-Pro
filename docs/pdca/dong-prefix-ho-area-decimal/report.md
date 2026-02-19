# Report: Dong Prefix Ho Parsing & Decimal Area Display

## Summary
- `hoNm` 접두사(`A-1003`)를 동 필터에 활용하도록 로직을 보강했다.
- 견적/선택 화면의 평수 표시에서 강제 버림/고정 소수점 포맷을 제거해 소수점 정보를 유지하도록 정리했다.
- 계약면적 계산에서 강제 반올림을 제거해 건축물대장 원본 합산값을 유지했다.

## What Changed
1. `src/components/dashboard/SelectionPage.tsx`
   - `parseHoName` 헬퍼 추가
   - 동 필터 소스를 `dongNm`/`hoNm 접두사`로 자동 분기
   - `514-1` 같은 숫자-숫자 패턴은 동 접두사로 보지 않도록 예외 처리
   - 층별 호실을 호수 자연 정렬(`1, 2, 10`)로 표시
   - 검색을 `raw hoNm` + `접두사 제거 호수` 기준으로 수행
   - 총 전용면적의 `Math.floor` 제거
   - `㎡` 표시는 건축물대장 원본 소수점 문자열을 그대로 사용하도록 반올림 제거
   - 평(전용/계약/합계) 표시는 소수점 2자리 고정으로 통일
   - 주소 검색 패널을 absolute 드롭다운에서 헤더 하단 상단 레이아웃 영역(in-flow)으로 이동해 본문 카드와 겹침 제거
2. `src/app/page.tsx`
   - 전유/공용/계약면적을 문자열 기반 정밀 합산으로 처리해 소수점 손실 방지
3. `src/components/dashboard/QuotationModal.tsx`
   - 평수 포맷터(`formatPyung`) 도입
   - 총 평수/유닛별 평수의 고정 `toFixed(1)` 제거
   - `514-1` 같은 숫자-숫자 패턴은 동 접두사로 보지 않도록 예외 처리
   - 선택 호실 상세표를 층/호수 자연 정렬로 표시
   - 평수 표기는 소수점 2자리 고정으로 통일
4. `src/components/dashboard/UnitGridTable.tsx`
   - 평수 표기를 소수점 2자리 고정으로 통일
3. `src/components/dashboard/UnitGridTable.tsx`
   - 평수 포맷터 도입 및 고정 `toFixed(1)` 제거
4. `src/app/page.tsx`
   - 계약면적 계산의 강제 반올림 제거

## Verification
- `npm.cmd run lint`: Node 런타임 assert(`ncrypto::CSPRNG(nullptr, 0)`)로 실패(code 134)
- 수정 후 재실행(`npm.cmd run lint`)에서도 동일 assert로 실패
- 환경 이슈로 lint 정적 검증은 미완료 상태

## Risks
- `hoNm` 접두사 규칙이 `prefix-ho` 형태가 아닌 특수 표기(`A동1003` 등)인 데이터셋에서는 접두사 파싱이 적용되지 않는다.
