# Plan: Public Data API Response Error

## Goal
- 공공데이터 건축물 API 호출 시 발생하는 `공공데이터 API 서버 응답 오류`를 줄이고, 인증 오류/업스트림 오류를 구분해 진단 가능하도록 개선한다.

## Scope
- `src/app/api/building-report/route.ts`의 서비스키 처리와 응답 파싱 로직을 강화한다.
- XML/비JSON/오류 코드 응답을 명확한 HTTP 상태와 메시지로 매핑한다.
- 최소한의 타입 보강으로 scoped lint 통과 상태를 확보한다.
- PDCA 산출물(`plan/design/tasks/report`)을 생성한다.

## Non-goals
- 전체 API 라우트(land/price/real-trade/building-units)의 공통화 리팩터링.
- 프론트 UI 메시지 체계 전면 개편.
- `.bkit-codex/**` 포함 전역 lint debt 해소.

## Assumptions
- 운영 환경에서 `BUILDING_API_KEY` 또는 `DATA_API_KEY`를 설정한다.
- 공공데이터포털 에러는 XML/JSON 혼재 형태로 내려올 수 있다.

## Acceptance Criteria
- `building-report` 라우트에서 인증키 누락 시 500 설정 오류를 반환한다.
- 업스트림 비정상 응답에서 인증 오류(401)와 서버 오류(502)가 구분된다.
- JSON 파싱 실패/에러 코드 응답이 500 일반 오류로 뭉개지지 않는다.
- `npx eslint src/app/api/building-report/route.ts` 통과.

## Risks / Dependencies
- 포털 에러 포맷이 변동되면 문자열 기반 분류 규칙의 정확도가 저하될 수 있다.
- 전역 lint/build는 기존 프로젝트 blocker 영향으로 실패할 수 있다.
