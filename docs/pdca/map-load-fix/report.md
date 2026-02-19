# Report: Map Load Fix

## Summary
- 지도 렌더링 파이프라인의 두 번째 맵 지연/공백 문제 대응을 위해 `InvestmentMap`, `OpenStreetMap`, 페이지 좌표 처리 흐름을 정비해 폴백 동작을 안정화했습니다.
- Kakao 키/로딩 상태에 따라 카카오맵 실패 시 OSM으로 자동 전환되는 동선을 유지했으며, OSM에서도 메인 마커와 주변 실거래 마커가 함께 렌더되도록 보완했습니다.
- `Supabase` 환경변수 누락 가시화 및 히스토리 조회 에러 출력 강화도 동시 반영되어, 관련 런타임 진단력을 높였습니다.

## What Changed
1. `src/components/dashboard/InvestmentMap.tsx`
   - 카카오맵 로드 실패 처리 로직 강화
   - OSM fallback 경로에서 `mapError` 메시지와 상태를 일관되게 노출
2. `src/components/dashboard/OpenStreetMap.tsx`
   - `transactions` 기반 주변 실거래 마커 렌더링 추가
   - 기존 메인 마커와 함께 실제 가격 라벨 팝업까지 표시
3. `src/app/page.tsx`
   - 주소 선택 시 좌표 조회를 `fetchAllData`와 분리해 지도 렌더 대기 시간을 최소화
4. `src/lib/supabase.ts`, `src/components/dashboard/HistorySidebar.tsx`
   - Supabase env 누락 체크 및 에러 로그 상세화를 통한 디버깅 품질 향상

## Analysis Snapshot
- GAP 분석 점수: **82 / 100** (변동 없음)
- 구현 정합성은 양호했으나, 다음 항목이 미완료되어 최종 점수는 보수적으로 산정
  - 카카오맵/OSM 전환 동작 수동 확인
  - 공백 렌더/재렌더 안정성 검증
  - 범위 제한 lint/build 실행 증적 보강

## How Verified
- 현재 기준: Manual verification 및 scoped lint/build는 환경 제한으로 미완료 상태이며, 실행 로그는 아래와 같음.
- 2026-02-17T00:00:00Z: `npm` 실행 시 Node CSPRNG 초기화(assertion failure) 크래시가 발생해 lint/build 실행이 불가.
- 2026-02-18T12:21:00Z: 동일 환경에서 `npm.cmd run lint`/`npm.cmd run build` 재시도했으나 `ncrypto::CSPRNG(nullptr, 0)` 크래시로 둘 다 실패.
- 2026-02-18T12:25:00Z: `/pdca analyze` 사전 확인용 재시도에서 `npm.cmd run lint`/`npm.cmd run build` 모두 동일한 `ncrypto::CSPRNG(nullptr, 0)` 크래시 발생.
- `npm` 크래시 이슈 해결 시 아래 검증 시나리오를 즉시 수행 필요:
  - 카카오맵 키 미설정 시 OSM fallback
  - 카카오맵 key 정상 설정 시 카카오맵 렌더
  - OSM 메인 마커 + 실거래 마커 동시 표시
  - 주소 변경/재진입 시 두 번째 지도 공백 여부
- 브라우저 상 실측 확인은 사용자 또는 QA 환경에서 다음 시나리오로 실행 필요:
  - 카카오맵 키 미설정 시 OSM fallback
  - 카카오맵 key 정상 설정 시 카카오맵 렌더
  - OSM 메인 마커 + 실거래 마커 동시 표시
  - 주소 변경/재진입 시 두 번째 지도 공백 여부

## Decisions
- 기능 완료 기준 자체는 충족되어 Report 단계 종료 처리.
- 그러나 `Manual verification` 및 scoped 체크 미완료 항목이 남아 있어, 운영 반영 전 한 차례 QA 검증을 권장.

## Risks
- 지도 SDK 로드 타이밍/네트워크 지연으로 초기 렌더 지연 가능성
- OSM 마커는 좌표 오차 및 타일 로딩 상태에 따라 표시 밀도/정렬 체감이 달라질 수 있음
- Supabase env 미설정 환경에서 지도 로직과는 별개로 인증/조회 기능이 일부 제한될 수 있음
- Node 런타임 크래시(`ncrypto::CSPRNG`)가 지속되면 lint/build 및 배포 전 정적 점검 자동화가 지연될 수 있음.

## Next Step
- `/pdca next`에서 다음 작업은 `map-load-fix`를 아카이브 상태 기준으로 **Node 런타임 안정화** + 운영 전용 점검 배치(검증 자동화 스니펫 또는 QA 체크리스트)로 전환.
- `/pdca analyze` 조건 하에서 점수 재평가를 진행하려면 다음 항목이 모두 충족되어야 함:
  - 항목 8(지도 렌더 QA) 완료 및 스크린샷/체크리스트 보강
  - 항목 9(lint/build) 성공 및 로그 보강
