/**
 * 전체 금액 요약 (만원 단위)
 */
export interface TotalFinancials {
  salePrice: number; // 전체 매매금액
  deposit: number; // 전체 보증금
  monthlyRent: number; // 전체 월임대료
}

/**
 * 대출 시뮬레이션
 */
export interface LoanSimulation {
  loanAmount: number; // 대출금액 (만원)
  loanRatio: number; // LTV (%)
  interestRate: number; // 연이자율 (%)
  loanTermYears: number; // 대출기간 (년)
  monthlyPayment: number; // 월 상환금 (만원)
  annualInterest: number; // 연간 이자 (만원)
  selfFunding: number; // 자기자본 (만원)
}

/**
 * 투자 수익률 분석
 */
export interface InvestmentAnalysis {
  // 기본 수익률
  grossYield: number; // 총 수익률 (%) = 연임대료 / 매매가
  netYield: number; // 순 수익률 (%) = NOI / 매매가
  
  // NOI (순영업소득)
  annualGrossIncome: number; // 연간 총소득 (월임대료 × 12)
  vacancyLoss: number; // 공실손실
  effectiveGrossIncome: number;// 유효총소득
  operatingExpense: number; // 운영비용
  noi: number; // NOI = 유효총소득 - 운영비용
  
  // Cap Rate
  capRate: number; // NOI / 매매가
  
  // 레버리지 수익률
  leveragedYield: number; // (NOI - 연간이자) / 자기자본 × 100
  dscr: number; // DSCR = NOI / 연간 원리금 상환액
  
  // 평단가
  pricePerPyeong: number; // 평당 매매가 (만원)
  rentPerPyeong: number; // 평당 월임대료 (만원)
  depositToSaleRatio: number; // 보증금/매매가 비율 (%)
}
