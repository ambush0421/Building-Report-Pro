import React, { useMemo } from 'react';
import { Coins, Calculator, LayoutGrid, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRoomStore } from '@/stores/roomStore';
import NumberInput from '@/components/common/NumberInput';
import { formatPrice, formatAreaPyeong, formatNumber } from '@/utils/format';

const TotalFinancialEditor: React.FC = () => {
  const { 
    selectedRooms, 
    totalFinancials, 
    setTotalFinancial, 
    distributeByArea 
  } = useRoomStore();

  const totalArea = useMemo(() => {
    return selectedRooms.reduce((sum, r) => sum + r.area, 0);
  }, [selectedRooms]);

  const roomsTotal = useMemo(() => {
    return {
      salePrice: selectedRooms.reduce((sum, r) => sum + r.salePrice, 0),
      deposit: selectedRooms.reduce((sum, r) => sum + r.deposit, 0),
      monthlyRent: selectedRooms.reduce((sum, r) => sum + r.monthlyRent, 0),
    };
  }, [selectedRooms]);

  const isMismatch = useMemo(() => {
    return (
      totalFinancials.salePrice !== roomsTotal.salePrice ||
      totalFinancials.deposit !== roomsTotal.deposit ||
      totalFinancials.monthlyRent !== roomsTotal.monthlyRent
    );
  }, [totalFinancials, roomsTotal]);

  const pyeongPrice = useMemo(() => {
    if (totalArea === 0) return 0;
    const pyeong = totalArea / 3.3058;
    return Math.round(totalFinancials.salePrice / pyeong);
  }, [totalFinancials.salePrice, totalArea]);

  if (selectedRooms.length === 0) return null;

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader className="border-b bg-primary/5 py-4">
        <CardTitle className="text-xl flex items-center gap-2 text-primary">
          <Coins className="w-5 h-5" />
          전체 금액 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span className="text-muted-foreground">전체 면적: <span className="font-bold text-foreground">{formatAreaPyeong(totalArea)}</span></span>
            <span className="text-muted-foreground">선택 호실: <span className="font-bold text-foreground">{selectedRooms.length}개</span></span>
          </div>
          <div className="text-primary font-bold">
            평당 매매가: {formatNumber(pyeongPrice)}만원
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NumberInput 
            label="전체 매매금액" 
            value={totalFinancials.salePrice} 
            onChange={(val) => setTotalFinancial('salePrice', val)} 
            helperText={formatPrice(totalFinancials.salePrice)}
          />
          <NumberInput 
            label="전체 보증금" 
            value={totalFinancials.deposit} 
            onChange={(val) => setTotalFinancial('deposit', val)} 
            helperText={formatPrice(totalFinancials.deposit)}
          />
          <NumberInput 
            label="전체 월임대료" 
            value={totalFinancials.monthlyRent} 
            onChange={(val) => setTotalFinancial('monthlyRent', val)} 
            helperText={formatPrice(totalFinancials.monthlyRent)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button className="flex-1" onClick={distributeByArea}>
            <Calculator className="w-4 h-4 mr-2" /> 📐 면적비례 자동배분
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => document.getElementById('room-financial-editor')?.scrollIntoView({ behavior: 'smooth' })}>
            <LayoutGrid className="w-4 h-4 mr-2" /> ✏️ 호실별 직접입력
          </Button>
        </div>

        {isMismatch && (
          <Alert variant="warning" className="bg-orange-50 border-orange-200 text-orange-800">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertTitle>금액 불일치 알림</AlertTitle>
            <AlertDescription className="text-xs">
              전체 설정 금액과 호실별 합계가 다릅니다. [면적비례 자동배분]을 클릭하거나 호실별 금액을 수정해주세요.
              <div className="mt-1 font-mono">
                전체: {formatNumber(totalFinancials.salePrice)}만 vs 합계: {formatNumber(roomsTotal.salePrice)}만
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalFinancialEditor;
