import React, { useMemo } from 'react';
import { ListChecks, Plus, Trash2, Info, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRoomStore } from '@/stores/roomStore';
import { useBuildingStore } from '@/stores/buildingStore';
import { formatArea, formatAreaPyeong } from '@/utils/format';
import { OccupancyStatus } from '@/types/room';

const RoomSelector: React.FC = () => {
  const { buildingInfo } = useBuildingStore();
  const { 
    allRooms, 
    selectedRooms, 
    addRoom, 
    removeRoom, 
    addAllRooms, 
    clearSelectedRooms, 
    updateRoomOccupancy 
  } = useRoomStore();

  const occupancyStats = useMemo(() => {
    const total = selectedRooms.length;
    if (total === 0) return { occupied: 0, vacant: 0, unknown: 0, rate: 0 };
    
    const occupied = selectedRooms.filter(r => r.occupancyStatus === 'occupied').length;
    const vacant = selectedRooms.filter(r => r.occupancyStatus === 'vacant').length;
    const unknown = selectedRooms.filter(r => r.occupancyStatus === 'unknown').length;
    
    return {
      occupied,
      vacant,
      unknown,
      rate: (vacant / total) * 100
    };
  }, [selectedRooms]);

  const totalArea = useMemo(() => {
    return selectedRooms.reduce((sum, r) => sum + r.area, 0);
  }, [selectedRooms]);

  if (!buildingInfo) return null;

  const handleAddAll = () => {
    if (allRooms.length === 0) {
      // 일반건물인 경우 가상 호실 생성
      const virtualRoom = {
        id: "all",
        floor: 1,
        hoNm: "건물 전체",
        area: buildingInfo.totArea,
        commonArea: 0,
        totalArea: buildingInfo.totArea,
        mainPurpsCdNm: buildingInfo.mainPurpsCdNm,
        salePrice: 0,
        deposit: 0,
        monthlyRent: 0,
        occupancyStatus: 'occupied' as const,
      };
      // Note: roomStore에 virtual room 추가 로직이 필요할 수 있음
      // 여기서는 간단히 allRooms가 비어있을 때 처리
    }
    addAllRooms();
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b bg-muted/20 flex flex-row items-center justify-between space-y-0 py-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" />
          구분호실 선택
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleAddAll}>전체 추가</Button>
          <Button variant="ghost" size="sm" onClick={clearSelectedRooms}>초기화</Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex gap-2">
          <Select onValueChange={(value) => addRoom(value)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="분석할 호실을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {allRooms.map((room) => (
                <SelectItem 
                  key={room.id} 
                  value={room.id}
                  disabled={selectedRooms.some(r => r.id === room.id)}
                >
                  {room.floor}층 {room.hoNm} | {room.mainPurpsCdNm} | {room.area}㎡
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-1" /> 추가
          </Button>
        </div>

        {selectedRooms.length > 0 ? (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">호실</TableHead>
                  <TableHead>용도</TableHead>
                  <TableHead className="text-right">전용면적</TableHead>
                  <TableHead className="text-center">상태</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.floor}층 {room.hoNm}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{room.mainPurpsCdNm}</TableCell>
                    <TableCell className="text-right font-mono">{room.area}㎡</TableCell>
                    <TableCell>
                      <Select 
                        value={room.occupancyStatus} 
                        onValueChange={(val: OccupancyStatus) => updateRoomOccupancy(room.id, val)}
                      >
                        <SelectTrigger className="h-8 w-24 mx-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="occupied">🟢 임대</SelectItem>
                          <SelectItem value="vacant">🔴 공실</SelectItem>
                          <SelectItem value="unknown">⚪ 미정</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeRoom(room.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 bg-muted/20 rounded-lg border-2 border-dashed">
            <Building className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-20" />
            <p className="text-muted-foreground text-sm">분석할 호실이 선택되지 않았습니다.</p>
            {allRooms.length === 0 && (
              <p className="text-xs text-orange-500 mt-2 flex items-center justify-center gap-1">
                <Info className="w-3 h-3" /> 일반건물인 경우 건물 전체로 분석합니다.
              </p>
            )}
          </div>
        )}

        {selectedRooms.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-muted rounded-lg gap-4">
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-muted-foreground mr-2">선택 호실:</span>
                <span className="font-bold">{selectedRooms.length}개</span>
              </div>
              <div>
                <span className="text-muted-foreground mr-2">면적 합계:</span>
                <span className="font-bold">{formatArea(totalArea)}</span>
              </div>
            </div>
            <div className="flex gap-3 text-xs">
              <Badge variant="outline" className="bg-background">임대 {occupancyStats.occupied}</Badge>
              <Badge variant="outline" className="bg-background">공실 {occupancyStats.vacant}</Badge>
              {occupancyStats.vacant > 0 && (
                <Badge variant="destructive">공실률 {occupancyStats.rate.toFixed(1)}%</Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomSelector;
