import axios from 'axios';
import { LandInfo } from '@/types/location';

const VWORLD_KEY = process.env.NEXT_PUBLIC_VITE_VWORLD_API_KEY;

/**
 * 토지정보(지목, 공시지가, 용도지역)를 조회합니다.
 */
export const fetchLandInfo = async (pnu: string): Promise<LandInfo | null> => {
  try {
    const [priceRes, useRes] = await Promise.all([
      axios.get('https://api.vworld.kr/ned/data/getIndvdLandPriceAttr', {
        params: { key: VWORLD_KEY, pnu, format: 'json', numOfRows: 1 },
      }),
      axios.get('https://api.vworld.kr/ned/data/getLandUseAttr', {
        params: { key: VWORLD_KEY, pnu, format: 'json', numOfRows: 10 },
      }),
    ]);
    
    const priceItem = priceRes.data?.indvdLandPriceAttrs?.field?.[0];
    const useItems = useRes.data?.landUseAttrs?.field;
    
    if (!priceItem && (!useItems || useItems.length === 0)) return null;
    
    const useZoneItem = useItems?.find((item: any) => item.cnflcAt === '0'); // 저촉여부 0: 해당없음
    
    return {
      jimok: priceItem?.lndclmNm || "",
      landArea: Number(priceItem?.lndpclAr || 0),
      officialPrice: Number(priceItem?.pblntfPclnd || 0),
      useZone: useZoneItem?.prposAreaDstrcNm || "",
      useDistrict: "", // 필요 시 추가 파싱
      useArea: "",
    };
  } catch (error) {
    return null;
  }
};
