import React from 'react';
import { Building2, MapPin, Calendar, Layers, Activity, Car, ArrowUpCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBuildingStore } from '@/stores/buildingStore';
import SkeletonCard from '@/components/common/SkeletonCard';
import EmptyState from '@/components/common/EmptyState';
import { formatDate, formatArea, formatPercent, formatDistance, formatNumber } from '@/utils/format';

const BuildingInfoCard: React.FC = () => {
  const { buildingInfo, locationInfo, isLoading } = useBuildingStore();

  if (isLoading) return <SkeletonCard lines={8} />;
  if (!buildingInfo) {
    return (
      <EmptyState 
        icon={Building2} 
        title="건물 정보" 
        description="주소를 검색하면 건축물대장 및 입지 정보가 표시됩니다." 
      />
    );
  }

  const { buildingAge } = buildingInfo;
  
  const getAgeBadgeVariant = (condition: string) => {
    switch (condition) {
      case 'new': return 'default'; // 초록색 느낌
      case 'good': return 'secondary'; // 파란색 느낌
      case 'aging': return 'outline'; // 노란색 느낌
      case 'old': return 'destructive'; // 빨간색
      default: return 'outline';
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b bg-muted/20">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            {buildingInfo.bldNm || "건물 정보"}
          </CardTitle>
          <Badge variant={getAgeBadgeVariant(buildingAge.condition)}>
            {buildingAge.conditionLabel} ({buildingAge.years}년차)
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-12">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">건물 개요</TabsTrigger>
            <TabsTrigger value="location" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">입지 및 토지</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <InfoItem icon={MapPin} label="대지위치" value={buildingInfo.newPlatPlc || buildingInfo.platPlc} subValue={buildingInfo.platPlc} />
              <InfoItem icon={Calendar} label="사용승인일" value={formatDate(buildingInfo.useAprDay)} />
              <InfoItem icon={Layers} label="주용도 / 구조" value={`${buildingInfo.mainPurpsCdNm} / ${buildingInfo.strctCdNm}`} />
              <InfoItem icon={ArrowUpCircle} label="규모" value={`지상 ${buildingInfo.grndFlrCnt}층 / 지하 ${buildingInfo.ugrndFlrCnt}층`} />
              <InfoItem icon={Activity} label="연면적 / 대지면적" value={formatArea(buildingInfo.totArea)} subValue={`대지: ${formatArea(buildingInfo.platArea)}`} />
              <InfoItem icon={Info} label="건폐율 / 용적률" value={`${formatPercent(buildingInfo.bcRat)} / ${formatPercent(buildingInfo.vlRat)}`} />
              <InfoItem icon={Car} label="주차 / 엘리베이터" value={`${buildingInfo.totPkngCnt}대 / ${buildingInfo.totalElevatorCnt}대`} />
              <InfoItem icon={Layers} label="세대(가구)수" value={`${buildingInfo.hhldCnt || buildingInfo.fmlyCnt}세대`} />
            </div>
          </TabsContent>
          
          <TabsContent value="location" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {locationInfo?.nearestStation && (
                <InfoItem 
                  icon={Activity} 
                  label="가장 가까운 역" 
                  value={`${locationInfo.nearestStation.name} (${formatDistance(locationInfo.nearestStation.distance)})`} 
                  badge={locationInfo.nearestStation.distance < 500 ? "역세권" : locationInfo.nearestStation.distance < 1000 ? "준역세권" : undefined}
                />
              )}
              {locationInfo?.landInfo && (
                <>
                  <InfoItem icon={MapPin} label="용도지역" value={locationInfo.landInfo.useZone} />
                  <InfoItem icon={Info} label="공시지가" value={`${formatNumber(locationInfo.landInfo.officialPrice)}원/㎡`} subValue={`평당: ${formatNumber(Math.round(locationInfo.landInfo.officialPrice * 3.3058))}원`} />
                </>
              )}
              <div className="md:col-span-2">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> 주변 편의시설
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {locationInfo?.nearbyFacilities.map((f, i) => (
                    <div key={i} className="flex flex-col p-3 bg-muted/30 rounded-md border">
                      <span className="text-xs text-muted-foreground">{f.category}</span>
                      <span className="text-sm font-medium truncate">{f.name}</span>
                      <span className="text-xs text-primary">{formatDistance(f.distance)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ 
  icon: any, 
  label: string, 
  value: string, 
  subValue?: string,
  badge?: string 
}> = ({ icon: Icon, label, value, subValue, badge }) => (
  <div className="flex items-start gap-3">
    <div className="bg-muted p-2 rounded-md">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>
    <div className="flex-1 space-y-1">
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        {badge && <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-4">{badge}</Badge>}
      </div>
      <p className="text-sm font-bold">{value}</p>
      {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
    </div>
  </div>
);

export default BuildingInfoCard;
