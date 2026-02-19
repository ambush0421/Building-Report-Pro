# Design: Dong Prefix Ho Parsing & Decimal Area Display

## Parsing Strategy
- `hoNm`을 `prefix-ho` 패턴으로 파싱한다.
- 패턴 일치 시:
  - `prefix`를 동 식별자로 사용
  - 뒤 문자열을 호수 본문으로 간주
- 패턴 불일치 시:
  - 기존 `dongNm`/`hoNm` 동작을 유지한다.

## Filter Decision
- `dongNm`이 2개 이상이면 `dongNm` 기반 필터를 우선 적용한다.
- `dongNm`이 실질적으로 1개일 때, `hoNm` 접두사 종류가 2개 이상이면 접두사 기반 동 필터로 전환한다.

## Decimal Display Rules
- 평수/면적 표시에서 `Math.floor`, 고정 `toFixed(1)`를 제거한다.
- `toLocaleString` + `maximumFractionDigits` 포맷으로 소수점 정보를 유지한다.
- 계약면적 계산 시 강제 반올림을 제거해 원본 합산값을 유지한다.

## Test Plan
- `A-1003`, `B-1014` 샘플에서 동 필터가 `A동/B동`으로 분리되는지 확인
- 선택 요약/견적서 총 평수/유닛별 평수가 소수점 포함으로 노출되는지 확인
- `npm.cmd run lint` 실행
