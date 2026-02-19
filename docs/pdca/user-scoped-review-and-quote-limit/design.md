# Design: User-Scoped Review and Quote Limit

## User-Scoped Review List
- 로컬 히스토리 키를 `building_report_history:<scopeId>` 형태로 분리한다.
- `scopeId`는 다음 우선순위로 결정한다.
  1. Supabase 인증 사용자의 `user.id` (`user:<id>`)
  2. 비로그인 사용자의 로컬 게스트 키(`guest:<uuid>`)
- 기존 단일 키(`building_report_history`) 데이터는 게스트 스코프로 1회 마이그레이션한다.

## Review/Quote Sidebar Behavior
- 검토 목록 탭: 현재 사용자 스코프에 해당하는 히스토리만 표시한다.
- 견적서 탭: 히스토리 카드에서 체크로 비교 대상을 선택한다.
- 선택 수는 최대 5개로 제한하며, 초과 시 즉시 안내(alert)하고 상태를 유지한다.
- 상단에 `선택 개수/최대치`를 표시하고 휴지통 아이콘으로 선택 초기화한다.

## Data Model
- 히스토리 항목에 기존 필드(`id`, `title`, `date`, `address`, `params`) 외 요약 필드(`scale`, `totalUnits`, `usage`, `age`)를 저장해 사이드바 카드에 즉시 표시한다.
