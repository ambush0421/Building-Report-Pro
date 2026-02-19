# Plan: User-Scoped Review and Quote Limit

## Goal
- 검토 목록을 사용자 단위로 분리해 표시한다.
- 견적서 비교 선택을 최대 5개로 제한한다.

## Scope
- `src/app/page.tsx` 사용자 스코프별 히스토리 저장/조회
- `src/components/dashboard/SelectionPage.tsx` 검토 목록 렌더링 및 견적서 선택 제한 UI/동작
- 정적 검증(`npm.cmd run lint`) 시도

## Out of Scope
- 서버 DB 스키마 변경
- 비교 결과 화면/알고리즘 변경
