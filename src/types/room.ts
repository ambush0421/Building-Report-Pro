/**
 * 공실/임대 상태
 */
export type OccupancyStatus = 'occupied' | 'vacant' | 'unknown';

export interface Room {
  id: string; // 고유 ID (층+호 조합)
  floor: number; // 층
  hoNm: string; // 호 명칭
  area: number; // 전용면적 (㎡)
  commonArea: number; // 공용면적 (㎡)
  totalArea: number; // 전용+공용 합계
  mainPurpsCdNm: string; // 용도
  
  // 사용자 입력 금융 정보 (만원 단위)
  salePrice: number; // 매매가
  deposit: number; // 보증금
  monthlyRent: number; // 월임대료
  
  // 추가 정보
  occupancyStatus: OccupancyStatus;
  tenantName?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  memo?: string;
}
