export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NearbyPlace {
  name: string;
  distance: number; // 미터
  category: string;
  address: string;
}

export interface NearestStation extends NearbyPlace {
  lineName?: string; // 호선 (예: "2호선")
}

export interface LandInfo {
  jimok: string; // 지목
  landArea: number; // 토지면적
  officialPrice: number; // 공시지가 (원/㎡)
  useZone: string; // 용도지역 (예: "일반상업지역")
  useDistrict?: string; // 용도지구
  useArea?: string; // 용도구역
}

export interface LocationInfo {
  coordinates: Coordinates;
  nearestStation: NearestStation | null;
  nearestBusStop: NearbyPlace | null;
  nearbyFacilities: NearbyPlace[];
  landInfo: LandInfo | null;
}
