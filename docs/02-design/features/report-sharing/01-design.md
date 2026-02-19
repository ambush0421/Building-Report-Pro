# Report Link Sharing Design Document

> Version: 1.0.0 | Created: 2026-02-14 | Status: Draft

## 1. Routing Architecture

### 1.1 Dynamic Route
- **Path**: `src/app/share/[id]/page.tsx`
- **Purpose**: UUID 기반의 보고서 ID를 파라미터로 받아 해당 시점의 분석 스냅샷을 렌더링합니다.
- **Rendering Strategy**: 
  - **Server-side Metadata**: `generateMetadata` 함수를 통해 DB에서 기본 정보를 조회하여 OG Tag 생성.
  - **Client-side Content**: 보고서 본문은 클라이언트 사이드에서 fetch하여 `ReportView` 컴포넌트 재사용.

## 2. Dynamic SEO & OG Tag Design

### 2.1 Metadata Mapping
| Tag | Value Source | Example |
|-----|--------------|---------|
| `title` | `analysis_data.buildingInfo.bldNm` + " 투자 분석 보고서" | "강남빌딩 투자 분석 보고서" |
| `description` | "주소: " + `address` + " | AI 등급: " + `analysis_data.aiScore.grade` | "주소: 서울시 강남구... | AI 등급: S Class" |
| `og:image` | 서비스 대표 이미지 또는 분석 요약 썸네일 | `https://building-report.pro/og-summary.png` |

## 3. Sharing Workflow

### 3.1 Data Exposure Control
- 공유 페이지 전용 API 엔드포인트 (`/api/share/[id]`) 구현.
- `user_id`, `memo` 등 개인정보 성격의 필드는 제외하고 `analysis_data`와 `address`, `bld_nm`만 노출.

### 3.2 UI/UX Components
- **ReadOnly Viewer**: `ReportView` 컴포넌트에 `readOnly={true}` prop을 추가하여 수정 UI(Input 등) 배제.
- **Header Action**: 공유 페이지 상단에 "직접 분석해보기" 버튼을 배치하여 신규 유입 유도.

## 4. Supabase Policy
- `reports` 테이블에 대해 비로그인 사용자(Anon)도 `id`를 알고 있다면 `select`가 가능하도록 RLS 정책 추가 또는 공유 전용 API Route 활용.

## 5. Implementation Task List
- [ ] `src/app/share/[id]/page.tsx` 동적 라우트 생성.
- [ ] `generateMetadata`를 통한 동적 OG Tag 구현.
- [ ] `ReportView` 컴포넌트의 ReadOnly 모드 대응.
- [ ] 사이드바 및 보고서 페이지의 "링크 복사" 기능과 연동.
