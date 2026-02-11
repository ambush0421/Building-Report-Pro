/**
 * 건축물대장 총괄표제부에서 가져오는 데이터
 */
export interface BuildingSummary {
  bldNm: string; // 건물명
  platPlc: string; // 대지위치 (지번주소)
  newPlatPlc: string; // 새주소 (도로명주소)
  useAprDay: string; // 사용승인일 (YYYYMMDD)
  mainPurpsCdNm: string; // 주용도명
  etcPurps: string; // 기타용도
  strctCdNm: string; // 구조명
  grndFlrCnt: number; // 지상층수
  ugrndFlrCnt: number; // 지하층수
  totArea: number; // 연면적 (㎡)
  archArea: number; // 건축면적 (㎡)
  platArea: number; // 대지면적 (㎡)
  bcRat: number; // 건폐율 (%)
  vlRat: number; // 용적률 (%)
  totPkngCnt: number; // 총주차대수
  rideUseElvtCnt: number; // 승객용 승강기 수
  emgenUseElvtCnt: number; // 비상용 승강기 수
  hhldCnt: number; // 세대수
  fmlyCnt: number; // 가구수
  engyEffcGradCd: string; // 에너지효율등급
}

/**
 * 건물 나이 분석
 */
export interface BuildingAge {
  years: number; // 경과 년수
  condition: 'new' | 'good' | 'aging' | 'old'; // 상태 분류
  conditionLabel: string; // "신축", "양호" 등
}

/**
 * 통합 건물 정보
 */
export interface BuildingInfo extends BuildingSummary {
  buildingAge: BuildingAge;
  totalElevatorCnt: number; // rideUseElvtCnt + emgenUseElvtCnt
}
