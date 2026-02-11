# Building Report Pro

## 프로젝트 개요
주소 검색 한 번으로 완성되는 고품질 부동산 분석 보고서 서비스. 집합건물의 경우 호실별 상세 분석이 가능하며, 사용자가 매매가/보증금/임대료를 전체 또는 호실별로 편집할 수 있다. 대출 레버리지 시뮬레이션, 주변 실거래가 비교, 수익률 자동 계산 기능을 포함한다.

## 기술 스택
- Frontend: React 18 + TypeScript + Vite
- UI: Tailwind CSS v4 + shadcn/ui
- 상태관리: Zustand
- 지도: 카카오맵 JavaScript SDK
- PDF: react-to-print
- 배포: Cloudflare Pages
- API: 공공데이터포털(건축물대장, 실거래가), 카카오(로컬, 지도), Vworld(토지정보)

## 프로젝트 구조
src/
  components/
    common/ - 공통 UI (AddressSearch, NumberInput, SkeletonCard 등)
    building/ - 건물정보 관련 컴포넌트
    room/ - 호실 선택/편집 컴포넌트
    financial/ - 금액 편집, 수익률, 대출 시뮬레이션
    location/ - 지도, 주변정보
    report/ - 보고서 통합, PDF 출력
  pages/ - 페이지 컴포넌트
  hooks/ - 커스텀 훅
  services/ - API 호출 서비스
  stores/ - Zustand 스토어
  utils/ - 유틸리티 함수
  types/ - TypeScript 타입 정의
  constants/ - 상수 정의

## 코딩 컨벤션
- 한국어 주석 사용
- 컴포넌트는 함수형 + 화살표 함수
- API 키는 환경변수(.env)로 관리
- 모든 API 호출은 services/ 폴더에서 관리
- shadcn/ui 컴포넌트 적극 활용 (Card, Input, Button, Select, Badge, Tabs, Separator, Tooltip 등)
- 숫자 포맷팅은 utils/format.ts의 함수를 반드시 사용
- 모든 컴포넌트에 로딩/에러/빈 상태 처리 포함
