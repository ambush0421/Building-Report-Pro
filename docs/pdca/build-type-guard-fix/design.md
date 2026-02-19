# Design: Build Type Guard Fix

## Architecture overview
- 기존 `buildingPromises`는 성공 객체와 오류 객체를 같은 배열에 담아 filter만 수행했다.
- 새 구조는 `BuildingFetchResult` union(`ok: true/false`)로 결과를 명시하고,
  type guard(`isSuccessResult`)로 성공 결과만 추출한다.

## Data model / schema
- DB 스키마 변경 없음.
- 라우트 내부 임시 타입만 추가:
  - `AnalysisCandidate`
  - `BuildingFetchResult`

## APIs / interfaces
- 외부 노출 API 스펙 변경 없음.
- 내부 인터페이스는 `BuildingAnalysisService.analyze` 입력 계약에 맞춘다.

## UI flow
- 해당 없음.

## Edge cases
- 공공데이터 응답이 비정상(XML/빈 item)이면 `ok: false`로 떨어지며 제외된다.
- 유효 후보 0개면 기존처럼 500 에러를 반환한다.

## Test plan
- Command:
  - `npx eslint src/app/api/building-report-v2/route.ts`
- Expected:
  - 변경 파일 lint 통과
- Command:
  - `npm run lint`
- Expected:
  - 전역 lint 통과
- Command:
  - `npm run build`
- Expected:
  - 기존 line 89 타입 오류 해소
