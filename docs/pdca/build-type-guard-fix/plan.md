# Plan: Build Type Guard Fix

## Goal
- `npm run build`를 막는 `src/app/api/building-report-v2/route.ts`의 타입 불일치 오류를 제거한다.

## Scope
- `building-report-v2` 라우트의 API fetch 결과 타입을 명시한다.
- 성공/실패 결과를 구분하는 type guard를 도입한다.
- `BuildingAnalysisService.analyze`에 전달되는 배열을 안전한 타입으로 좁힌다.
- 변경 후 lint/build 검증을 수행하고 보고서에 기록한다.

## Non-goals
- 점수 계산 로직 및 비즈니스 가중치 변경.
- 라우트 스펙(요청/응답 필드) 변경.
- 다른 API 라우트의 타입 리팩터링.

## Assumptions
- 현재 빌드 실패 원인의 직접 지점은 `validBuildings` 타입 narrowing 실패다.
- 빌드 단계에서 추가 blocker가 발견될 수 있다.

## Acceptance Criteria
- `building-report-v2` 라우트에서 `validBuildings`가 명시적으로 좁혀진다.
- `npm run lint` 통과.
- `npm run build`에서 기존 line 89 타입 오류가 재발하지 않는다.
- PDCA 문서(`plan/design/tasks/report`)가 생성/갱신된다.

## Risks / Dependencies
- 외부 API 응답 형태가 변하면 런타임 null/shape 검증을 추가로 보완해야 한다.
- 동일 경로의 다른 타입 결함이 숨어 있으면 추가 빌드 오류가 노출될 수 있다.
