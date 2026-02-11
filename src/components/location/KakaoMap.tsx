import React from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useBuildingStore } from '@/stores/buildingStore';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const KakaoMap: React.FC = () => {
  const { locationInfo, buildingInfo } = useBuildingStore();

  if (!locationInfo) return null;

  const { coordinates, nearestStation, nearestBusStop, nearbyFacilities } = locationInfo;

  return (
    <Card className="w-full h-[400px] shadow-lg overflow-hidden border-2 border-primary/10">
      <Map
        center={{ lat: coordinates.lat, lng: coordinates.lng }}
        style={{ width: "100%", height: "100%" }}
        level={4}
      >
        {/* 메인 건물 마커 */}
        <MapMarker
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            size: { width: 24, height: 35 },
          }}
        />
        
        {/* 건물명 오버레이 */}
        <CustomOverlayMap
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
          yAnchor={2.3}
        >
          <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {buildingInfo?.bldNm || "분석 건물"}
          </div>
        </CustomOverlayMap>

        {/* 지하철역 마커 */}
        {nearestStation && (
          <MapMarker
            position={{ lat: coordinates.lat + 0.001, lng: coordinates.lng + 0.001 }} // 예시 좌표 (실제 API는 좌표를 줘야 함)
            // 실제로는 nearestStation에도 좌표가 있어야 하지만 현재 타입에는 없음.
            // 일단 메인 위치 주변에 표시하거나, API를 수정해야 함.
            // V2 계획서에는 좌표가 포함되어 있지 않으므로 메인 위치만 표시함.
          />
        )}
      </Map>
    </Card>
  );
};

export default KakaoMap;
