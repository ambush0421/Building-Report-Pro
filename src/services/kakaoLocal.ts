import axios from 'axios';
import { Coordinates, NearbyPlace, NearestStation } from '@/types/location';

const REST_API_KEY = process.env.NEXT_PUBLIC_VITE_KAKAO_REST_API_KEY;

const api = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: {
    Authorization: `KakaoAK ${REST_API_KEY}`,
  },
});

/**
 * 주소를 좌표로 변환합니다.
 */
export const addressToCoords = async (address: string): Promise<Coordinates | null> => {
  try {
    const response = await api.get('/search/address.json', {
      params: { query: address },
    });
    
    const doc = response.data?.documents?.[0];
    if (doc) {
      return { lat: Number(doc.y), lng: Number(doc.x) };
    }
    
    // 키워드로 재시도
    const keywordResponse = await api.get('/search/keyword.json', {
      params: { query: address },
    });
    const kwDoc = keywordResponse.data?.documents?.[0];
    if (kwDoc) {
      return { lat: Number(kwDoc.y), lng: Number(kwDoc.x) };
    }
    
    return null;
  } catch (error) {
    console.error('Error in addressToCoords:', error);
    return null;
  }
};

/**
 * 가장 가까운 지하철역을 검색합니다.
 */
export const searchNearestSubway = async (lat: number, lng: number): Promise<NearestStation | null> => {
  try {
    const response = await api.get('/search/category.json', {
      params: {
        category_group_code: 'SW8',
        x: lng,
        y: lat,
        radius: 3000,
        sort: 'distance',
        size: 1,
      },
    });
    
    const doc = response.data?.documents?.[0];
    if (!doc) return null;
    
    return {
      name: doc.place_name,
      distance: Number(doc.distance),
      category: '지하철',
      address: doc.address_name,
      lineName: doc.place_name.match(/\((.*?)\)/)?.[1] || "",
    };
  } catch (error) {
    return null;
  }
};

/**
 * 가장 가까운 버스정류장을 검색합니다.
 */
export const searchNearestBusStop = async (lat: number, lng: number): Promise<NearbyPlace | null> => {
  try {
    const response = await api.get('/search/keyword.json', {
      params: {
        query: '버스정류장',
        x: lng,
        y: lat,
        radius: 1000,
        sort: 'distance',
        size: 1,
      },
    });
    
    const doc = response.data?.documents?.[0];
    if (!doc) return null;
    
    return {
      name: doc.place_name,
      distance: Number(doc.distance),
      category: '버스정류장',
      address: doc.address_name,
    };
  } catch (error) {
    return null;
  }
};

/**
 * 주변 편의시설을 검색합니다.
 */
export const searchNearbyFacilities = async (lat: number, lng: number): Promise<NearbyPlace[]> => {
  const categories = [
    { code: 'HP8', name: '병원' },
    { code: 'SC4', name: '학교' },
    { code: 'BK9', name: '은행' },
    { code: 'MT1', name: '대형마트' },
    { code: 'CS2', name: '편의점' },
    { code: 'CE7', name: '카페' },
  ];
  
  try {
    const promises = categories.map(cat => 
      api.get('/search/category.json', {
        params: {
          category_group_code: cat.code,
          x: lng,
          y: lat,
          radius: 3000,
          sort: 'distance',
          size: 1,
        },
      })
    );
    
    const results = await Promise.allSettled(promises);
    
    return results
      .map((res, index) => {
        if (res.status === 'fulfilled') {
          const doc = res.value.data?.documents?.[0];
          if (doc) {
            return {
              name: doc.place_name,
              distance: Number(doc.distance),
              category: categories[index].name,
              address: doc.address_name,
            };
          }
        }
        return null;
      })
      .filter((item): item is NearbyPlace => item !== null);
  } catch (error) {
    return [];
  }
};
