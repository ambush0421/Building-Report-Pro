# Report: Public Data API Response Error

## What changed
- `src/app/api/building-report/route.ts`를 보강했다.
  - API 키 소스 확장: `BUILDING_API_KEY || DATA_API_KEY`
  - 서비스키 정규화 함수 추가(인코딩/디코딩 불일치 완화)
  - 수동 쿼리 조합 제거, `URLSearchParams` 사용
  - 응답 오류 분류 강화(업스트림 status/XML/비JSON/OpenAPI 에러/resultCode)
  - 인증 오류(401)와 서버 응답 오류(502) 분리
  - `details`에 compact snippet 제공
  - route 내부 `any` 제거를 위한 타입/파싱 유틸 보강

## How verified (commands + results)
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint src/app/api/building-report/route.ts`
- Result:
  - 성공 (exit code 0)

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- Result:
  - 실패 (exit code 1)
  - 기존 전역 lint debt(`.bkit-codex/**`, 다수 `no-explicit-any`)로 실패

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run build`
- Result:
  - `next build` 성공
  - 후속 `npx @cloudflare/next-on-pages` 단계에서 Windows 환경 `bash ENOENT`로 실패

## Risks / rollback notes
- 인증 오류 판별은 문자열 패턴 기반이라 포털 에러 포맷 변경 시 오탐 가능성이 있다.
- 롤백은 `src/app/api/building-report/route.ts`만 이전 커밋으로 복원하면 된다.

## Next actions
1. 동일 키 정규화/오류 분류 로직을 `real-trade`, `building-units`, `land`, `price`에도 확장한다.
2. `next-on-pages`는 WSL/리눅스 CI에서 실행하도록 분리해 Windows `bash` 의존 실패를 제거한다.
3. 프론트에서 `details`를 운영/개발 모드별로 노출 제어해 사용자 메시지를 단순화한다.
