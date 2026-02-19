# Tasks: Map Load Fix 

1. [x] Create plan.md 
2. [x] Create design.md 
3. [x] Inspect InvestmentMap.tsx for second-map container/render race. 
4. [x] Fix map init guard in OpenStreetMap.tsx. 
5. [x] Fix KakaoMap script-loading and container lifecycle. 
6. [x] Adjust page-level geocode/address flow to reduce render delay. 
7. [x] Add fallback UI for map init failure. 
8. [ ] Verify both maps render without blank state. 
9. [ ] Run scoped lint/build checks for touched files.

## Validation Attempt Log
- 2026-02-17T00:00:00Z: `npm` 런타임 크래시(CSPRNG assertion)로 `scoped lint/build` 실행 불가. 
- 2026-02-17T00:00:00Z: 브라우저 기반 지도 렌더 검증은 로컬 개발 서버/브라우저 실행 환경 제약으로 미실행.
- 2026-02-18T12:21:00Z: `npm.cmd run lint`, `npm.cmd run build` 재시도했으나 모두 Node 런타임 crash(`ncrypto::CSPRNG(nullptr, 0)`)로 종료되어 검증 미완료.
- 2026-02-18T12:21:00Z: Iterate 실행 포인트에서 확인된 병목: (1) 브라우저 기반 map 렌더 QA 미실행, (2) Node 런타임 크래시로 scoped lint/build 미완료. 9,8번 미완료 상태 유지.
- 2026-02-18T12:25:00Z: `npm.cmd run lint`, `npm.cmd run build` 재시도(2차) 결과 동일한 `ncrypto::CSPRNG(nullptr, 0)` 크래시로 미실행. 브라우저 기반 지도 QA는 여전히 미실행.
