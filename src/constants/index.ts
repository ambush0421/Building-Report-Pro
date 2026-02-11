/**
 * 프로젝트 전역 상수
 */

export const SQM_TO_PYEONG = 3.3058; // ㎡ → 평 변환 계수

export const DEFAULT_VACANCY_RATE = 0.1; // 기본 공실률 10%

export const DEFAULT_MANAGEMENT_FEE_RATE = 0.05; // 기본 관리비 비율 5%

/**
 * 카카오 카테고리 코드
 */
export const KAKAO_CATEGORY_CODES = {
  SUBWAY: "SW8",
  BUS_STOP: "BS2", // 키워드 검색 사용 권장
  BANK: "BK9",
  HOSPITAL: "HP8",
  SCHOOL: "SC4",
  MART: "MT1",
  CONVENIENCE: "CS2",
  CAFE: "CE7",
} as const;

export const SEARCH_RADIUS = 3000; // 주변 검색 반경 3km
