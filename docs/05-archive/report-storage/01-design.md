# Report Storage System Design Document

> Version: 1.0.0 | Created: 2026-02-14 | Status: Draft

## 1. Overview
사용자가 편집한 부동산 분석 보고서의 스냅샷을 Supabase 데이터베이스에 저장하고, 마이페이지에서 이를 관리할 수 있는 시스템을 설계합니다.

## 2. Database Schema (PostgreSQL / Supabase)

### `reports` Table
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key, Default: uuid_generate_v4() | 보고서 고유 ID |
| `user_id` | UUID | Foreign Key (auth.users.id) | 소유자 ID |
| `address` | TEXT | Not Null | 검색된 기본 주소 |
| `bld_nm` | TEXT | | 건물명 |
| `total_sale_price` | BIGINT | | 총 매매가 (정렬용) |
| `analysis_data` | JSONB | Not Null | 스토어 전체 상태 스냅샷 |
| `created_at` | TIMESTAMPTZ | Default: now() | 생성 일시 |
| `updated_at` | TIMESTAMPTZ | Default: now() | 수정 일시 |

## 3. Architecture & Data Flow

### 3.1 Data Saving (Write)
1. 사용자가 '저장' 버튼 클릭.
2. `useBuildingStore`와 `useRoomStore`의 현재 상태(State)를 직렬화하여 하나의 JSON 객체로 구성.
3. Supabase Client를 통해 `reports` 테이블에 `upsert` 수행.

### 3.2 Data Recovery (Read)
1. 마이페이지 또는 상세 URL(`report/[id]`) 접근.
2. DB에서 `analysis_data` 추출.
3. 각 스토어의 `reset` 및 `setState` 함수를 호출하여 UI 상태를 과거 저장 시점으로 복구.

## 4. API & Integration
- **Auth**: Supabase Auth (Magic Link 또는 Social Login) 활용.
- **RLS (Row Level Security)**: 사용자는 자신의 `user_id`와 일치하는 데이터만 CRUD 가능하도록 설정.

## 5. UI/UX Design
- **Save Trigger**: 보고서 하단 플로팅 바 또는 헤더 영역에 '내 저장소에 보관' 버튼 배치.
- **Dashboard**: `src/app/dashboard/page.tsx`를 고도화하여 카드 형태의 리스트 UI 구현.
- **Feedback**: 저장 완료 시 Toast 메시지로 사용자에게 알림.

## 6. Implementation Task List
- [ ] Supabase 프로젝트 설정 및 `reports` 테이블 생성.
- [ ] `src/lib/supabase.ts` 클라이언트 설정.
- [ ] `ReportView` 하단에 저장 버튼 컴포넌트 추가.
- [ ] 저장 및 불러오기 핸들러 로직 구현.
- [ ] 마이페이지 리스트 및 삭제 기능 구현.
