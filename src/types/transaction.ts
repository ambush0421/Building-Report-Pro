/**
 * 실거래가 정보
 */
export interface NearbyTransaction {
  dealDate: string; // 거래일
  dealAmount: number; // 거래금액 (만원)
  areaForExclUse: number; // 전용면적 (㎡)
  floor: string; // 층
  buildingName: string; // 건물명
  dealType: 'sale' | 'rent'; // 매매/임대
  deposit?: number; // 보증금 (전월세인 경우)
  monthlyRent?: number; // 월세 (전월세인 경우)
  pricePerSqm?: number; // ㎡당 단가 (자동계산)
}
