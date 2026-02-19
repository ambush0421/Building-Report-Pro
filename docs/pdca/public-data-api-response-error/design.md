# Design: Public Data API Response Error

## Architecture overview
- 대상: `src/app/api/building-report/route.ts`
- 개선 포인트:
  - 서비스키 정규화(`decodeURIComponent` 안전 처리)
  - 쿼리 문자열 생성 방식 변경(수동 join -> `URLSearchParams`)
  - 응답 분기 강화:
    - `!response.ok`
    - XML 응답
    - JSON 파싱 실패
    - OpenAPI 에러 래퍼(`OpenAPI_ServiceResponse`)
    - `resultCode !== '00'`

## Error mapping policy
1. 인증/키 관련 패턴(`SERVICE_KEY`, `CM700001`, `AUTH_ERROR`) 감지 시 `401`.
2. 업스트림 상태 이상/비정상 형식 응답은 `502`.
3. 서버 키 미설정은 `500`.
4. 상세 원인 확인을 위해 `details`에 compact snippet 포함.

## Data typing strategy
- route 내부에 `PublicApiResponse` 타입을 선언해 `any` 사용을 제거한다.
- 숫자/문자 변환 유틸(`toText`, `toNumber`, `toInteger`)로 파싱 안정성 확보.

## Test plan
- Command:
  - `npx eslint src/app/api/building-report/route.ts`
- Expected:
  - 대상 파일 lint 통과

- Command:
  - `npm run lint`
- Expected:
  - 현 저장소의 기존 전역 lint blocker 여부 확인(실패 가능)

- Command:
  - `npm run build`
- Expected:
  - `next build` 구간 통과 여부 확인, 플랫폼 의존 실패는 별도 기록
