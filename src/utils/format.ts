import { SQM_TO_PYEONG } from '@/constants';

/**
 * 숫자에 천단위 콤마를 추가합니다.
 * @param n 숫자
 * @returns 콤마가 포함된 문자열
 */
export const formatNumber = (n: number): string => {
  if (isNaN(n)) return "0";
  return n.toLocaleString();
};

/**
 * 면적을 ㎡와 평 단위로 병기합니다.
 * @param sqm 면적(㎡)
 * @returns "85.32㎡ (25.81평)" 형식의 문자열
 */
export const formatArea = (sqm: number): string => {
  if (!sqm) return "-";
  const pyeong = (sqm / SQM_TO_PYEONG).toFixed(2);
  return `${sqm.toLocaleString()}㎡ (${pyeong}평)`;
};

/**
 * 면적을 평 단위로만 표시합니다.
 * @param sqm 면적(㎡)
 * @returns "25.81평" 형식의 문자열
 */
export const formatAreaPyeong = (sqm: number): string => {
  if (!sqm) return "-";
  const pyeong = (sqm / SQM_TO_PYEONG).toFixed(2);
  return `${pyeong}평`;
};

/**
 * 만원 단위 숫자를 한국식 금액 표기로 변환합니다.
 * @param manwon 금액(만원)
 * @returns "15억 2,300만원" 형식의 문자열
 */
export const formatPrice = (manwon: number): string => {
  if (!manwon || manwon === 0) return "-";
  
  const eok = Math.floor(manwon / 10000);
  const remainingManwon = manwon % 10000;
  
  let result = "";
  if (eok > 0) {
    result += `${formatNumber(eok)}억`;
  }
  
  if (remainingManwon > 0) {
    if (eok > 0) result += " ";
    result += `${formatNumber(remainingManwon)}만원`;
  } else if (eok > 0) {
    result += ""; // "15억" 처럼 깔끔하게
  }
  
  return result || "-";
};

/**
 * 금액을 짧게 표기합니다 (예: 15.2억).
 * @param manwon 금액(만원)
 */
export const formatPriceShort = (manwon: number): string => {
  if (!manwon) return "-";
  if (manwon < 10000) return `${formatNumber(manwon)}만`;
  return `${(manwon / 10000).toFixed(1)}억`;
};

/**
 * YYYYMMDD 형식의 문자열을 YYYY.MM.DD로 변환합니다.
 */
export const formatDate = (yyyymmdd: string): string => {
  if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd || "-";
  return `${yyyymmdd.substring(0, 4)}.${yyyymmdd.substring(4, 6)}.${yyyymmdd.substring(6, 8)}`;
};

/**
 * 숫자를 퍼센트 형식으로 변환합니다.
 */
export const formatPercent = (value: number, decimals: number = 2): string => {
  if (value === undefined || value === null) return "-";
  return `${value.toFixed(decimals)}%`;
};

/**
 * 거리를 미터 또는 킬로미터로 변환합니다.
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
};

/**
 * 콤마가 포함된 문자열에서 숫자를 추출합니다.
 */
export const parseNumberInput = (value: string): number => {
  const cleanValue = value.replace(/[^0-9]/g, "");
  return cleanValue ? parseInt(cleanValue, 10) : 0;
};
