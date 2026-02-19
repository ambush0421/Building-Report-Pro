# Design: Project Baseline Discovery

## Architecture Overview
- Frontend/Backend 통합형 Next.js App Router 구조(`src/app`)를 사용한다.
- 사용자 진입점은 `src/app/page.tsx`이며 주소 검색 후 내부 API를 병렬 호출해 분석 데이터를 구성한다.
- API는 `src/app/api/*/route.ts`에 위치하며 다수 라우트가 `runtime = 'edge'`를 사용한다.
- 저장 리포트 조회/공유는 Supabase(`src/lib/supabase.ts`)와 `reports` 테이블을 통해 처리한다.
- 핵심 UI는 `src/components/dashboard/*`, `src/components/landing/*`, `src/components/ReportView.tsx`에 구성된다.

## Data Model / Schema
- 주요 저장 단위(코드 추론):
  - `reports.id`: 리포트 식별자
  - `reports.analysis_data`: 최신 리포트 페이로드
  - `reports.building_data`: 레거시/대체 페이로드
- 클라이언트 상태:
  - `src/stores/buildingStore.ts`: 건물/위치/실거래 보조 상태
  - `src/stores/roomStore.ts`: 호실 선택/재무 관련 상태
- 도메인 타입:
  - `src/types/*.ts`에서 건물/재무/위치/거래 타입 분리 관리

## APIs / Interfaces
- Internal API:
  - `/api/building`, `/api/building-report`, `/api/building-report-v2`
  - `/api/building-units`, `/api/real-trade`, `/api/market-price`
  - `/api/geocode`, `/api/land`, `/api/price`, `/api/health`
  - `/api/admin/optimize-weights`
- External integrations:
  - 공공데이터(국토부/건축물대장)
  - Kakao/VWorld 지오코딩 및 위치 데이터
  - Supabase Auth/DB

## UI Flow
1. 사용자 주소 검색 (`/`)
2. 내부 API 호출로 건물/호실/실거래/지도 데이터 조합
3. 대시보드에서 분석 확인 및 견적/리포트 생성
4. 저장 리포트는 `/dashboard`, `/report/[id]`, `/share/[id]`에서 조회/공유

## Edge Cases
- 리포트 조회 시 `analysis_data`가 없으면 `building_data`로 폴백한다.
- 주소/좌표 조회 실패 시 기본 좌표를 사용하거나 오류 배너를 노출한다.
- 외부 API 응답이 XML/비정상 포맷이면 명시적 오류를 반환한다.

## Test Plan
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint src`
- Expected:
  - 앱 본체(`src`) lint 통과.
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- Expected:
  - 현재 저장소 기준 전역 lint 실패 여부 및 원인(스캔 범위)을 확인하고 `report.md`에 기록.
