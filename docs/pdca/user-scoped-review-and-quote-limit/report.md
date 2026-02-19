# Report: User-Scoped Review and Quote Limit

## Summary
- 검토 목록을 사용자 스코프별 히스토리로 분리해 표시하도록 변경했다.
- 견적서 탭에서 비교 카드 선택 수를 최대 5개로 제한했다.
- 선택 상태 표시/초기화 UI와 히스토리 카드 메타데이터 표시를 함께 보완했다.
- 구버전 히스토리 항목에서 `params`가 없을 때 발생하던 런타임 에러를 방어 로직으로 해소했다.

## Changed Files
1. `src/app/page.tsx`
2. `src/components/dashboard/SelectionPage.tsx`
3. `docs/pdca/user-scoped-review-and-quote-limit/plan.md`
4. `docs/pdca/user-scoped-review-and-quote-limit/design.md`
5. `docs/pdca/user-scoped-review-and-quote-limit/tasks.md`
6. `docs/pdca/user-scoped-review-and-quote-limit/report.md`

## Verification
- `npm.cmd run lint` 실행 실패 (Node assertion: `ncrypto::CSPRNG(nullptr, 0)`, exit code 134)
