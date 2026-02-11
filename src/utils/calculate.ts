import { SQM_TO_PYEONG } from '@/constants';
import { BuildingAge } from '@/types/building';

/**
 * ㎡를 평으로 변환합니다.
 */
export const sqmToPyeong = (sqm: number): number => {
  return Number((sqm / SQM_TO_PYEONG).toFixed(2));
};

/**
 * 평당 가격을 계산합니다 (만원 단위).
 */
export const calcPricePerPyeong = (priceManwon: number, areaSqm: number): number => {
  if (!areaSqm) return 0;
  const pyeong = areaSqm / SQM_TO_PYEONG;
  return Math.round(priceManwon / pyeong);
};

/**
 * 총 수익률을 계산합니다 (%).
 */
export const calcGrossYield = (monthlyRent: number, salePrice: number): number => {
  if (!salePrice) return 0;
  return ((monthlyRent * 12) / salePrice) * 100;
};

/**
 * NOI(순영업소득)를 계산합니다.
 */
export const calcNOI = (
  monthlyRent: number, 
  vacancyRate: number, 
  opexRate: number
): number => {
  const annualGrossIncome = monthlyRent * 12;
  const effectiveGrossIncome = annualGrossIncome * (1 - vacancyRate);
  const noi = effectiveGrossIncome * (1 - opexRate);
  return noi;
};

/**
 * Cap Rate를 계산합니다 (%).
 */
export const calcCapRate = (noi: number, salePrice: number): number => {
  if (!salePrice) return 0;
  return (noi / salePrice) * 100;
};

/**
 * 레버리지 수익률을 계산합니다 (%).
 */
export const calcLeveragedYield = (
  noi: number, 
  annualInterest: number, 
  selfFunding: number
): number => {
  if (!selfFunding || selfFunding <= 0) return 0;
  return ((noi - annualInterest) / selfFunding) * 100;
};

/**
 * DSCR(부채상환커버리지비율)을 계산합니다.
 */
export const calcDSCR = (noi: number, annualDebtService: number): number => {
  if (!annualDebtService) return 0;
  return noi / annualDebtService;
};

/**
 * 월 원리금 균등 상환액을 계산합니다.
 */
export const calcMonthlyPayment = (
  loanAmount: number, 
  annualRate: number, 
  termYears: number
): number => {
  if (!loanAmount || !annualRate || !termYears) return 0;
  
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = termYears * 12;
  
  // 원리금 균등 상환 공식: P * [r(1+r)^n] / [(1+r)^n - 1]
  const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                  (Math.pow(1 + monthlyRate, totalMonths) - 1);
                  
  return Math.round(payment);
};

/**
 * 전체 금액을 각 호실의 면적 비율로 배분합니다.
 */
export const distributeByArea = (totalAmount: number, rooms: { area: number }[]): number[] => {
  if (rooms.length === 0) return [];
  const totalArea = rooms.reduce((acc, room) => acc + room.area, 0);
  if (totalArea === 0) return rooms.map(() => 0);

  const distributions = rooms.map(room => Math.round((totalAmount * room.area) / totalArea));
  
  // 반올림 오차 보정 (마지막 요소에서 처리)
  const sum = distributions.reduce((acc, val) => acc + val, 0);
  const diff = totalAmount - sum;
  if (diff !== 0) {
    distributions[distributions.length - 1] += diff;
  }
  
  return distributions;
};

/**
 * 사용승인일을 기준으로 건물 나이 및 상태를 판정합니다.
 */
export const calcBuildingAge = (useAprDay: string): BuildingAge => {
  if (!useAprDay || useAprDay.length !== 8) {
    return { years: 0, condition: 'unknown' as any, conditionLabel: "정보 없음" };
  }
  
  const year = parseInt(useAprDay.substring(0, 4));
  const currentYear = new Date().getFullYear();
  const years = currentYear - year;
  
  let condition: 'new' | 'good' | 'aging' | 'old' = 'old';
  let conditionLabel = "노후";
  
  if (years < 5) {
    condition = 'new';
    conditionLabel = "신축";
  } else if (years < 15) {
    condition = 'good';
    conditionLabel = "양호";
  } else if (years < 30) {
    condition = 'aging';
    conditionLabel = "노후화 진행";
  }
  
  return { years, condition, conditionLabel };
};
