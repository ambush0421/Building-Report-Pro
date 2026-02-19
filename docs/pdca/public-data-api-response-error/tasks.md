# Tasks: Public Data API Response Error

1. [x] 에러 발생 지점(`building-report`)과 인접 API 라우트를 조사한다.
2. [x] 서비스키 처리(인코딩/디코딩)와 응답 파싱 취약 지점을 식별한다.
3. [x] `building-report` 라우트에 키 정규화/응답 분류 로직을 구현한다.
4. [x] `any` 최소화 및 타입 보강으로 파일 안정성을 개선한다.
5. [x] `npx eslint src/app/api/building-report/route.ts` 실행/통과.
6. [ ] `npm run lint` 전역 통과. (기존 전역 lint debt로 실패)
7. [ ] `npm run build` 전체 통과. (`@cloudflare/next-on-pages`가 Windows `bash` 의존으로 실패)
8. [x] `report.md`에 변경/검증/한계/다음 액션을 기록한다.
