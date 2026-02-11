import React from 'react';
import { LayoutGrid, TrendingUp, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRoomStore } from '@/stores/roomStore';
import NumberInput from '@/components/common/NumberInput';
import { formatNumber, formatPrice, formatPercent } from '@/utils/format';
import { calcGrossYield, calcPricePerPyeong } from '@/utils/calculate';

const RoomFinancialEditor: React.FC = () => {
  const { selectedRooms, updateRoomFinancial, updateRoomMemo } = useRoomStore();

  if (selectedRooms.length === 0) return null;

  return (
    <Card id="room-financial-editor" className="w-full shadow-lg">
      <CardHeader className="border-b bg-muted/20 py-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-primary" />
          호실별 금액 상세 편집
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="multiple" className="w-full">
          {selectedRooms.map((room) => (
            <AccordionItem key={room.id} value={room.id} className="border-b last:border-0">
              <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/30">
                <div className="flex flex-1 items-center justify-between text-left pr-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{room.floor}층 {room.hoNm}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{room.mainPurpsCdNm}</span>
                    <span className="text-xs font-mono">{room.area}㎡</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {room.occupancyStatus === 'vacant' ? (
                      <Badge variant="destructive">🔴 공실</Badge>
                    ) : (
                      <Badge variant="secondary">🟢 임대중</Badge>
                    )}
                    <span className="font-bold text-primary">{formatNumber(room.salePrice)}만</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-6 bg-muted/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <NumberInput 
                    label="매매가" 
                    value={room.salePrice} 
                    onChange={(val) => updateRoomFinancial(room.id, 'salePrice', val)} 
                    helperText={formatPrice(room.salePrice)}
                  />
                  <NumberInput 
                    label="보증금" 
                    value={room.deposit} 
                    onChange={(val) => updateRoomFinancial(room.id, 'deposit', val)} 
                    helperText={formatPrice(room.deposit)}
                  />
                  <NumberInput 
                    label="월임대료" 
                    value={room.monthlyRent} 
                    onChange={(val) => updateRoomFinancial(room.id, 'monthlyRent', val)} 
                    helperText={formatPrice(room.monthlyRent)}
                    disabled={room.occupancyStatus === 'vacant'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-background rounded-lg border border-primary/10">
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> 분석 지표
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground">평당 매매가</p>
                        <p className="text-sm font-bold">{formatNumber(calcPricePerPyeong(room.salePrice, room.area))}만원</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">호실 수익률(연)</p>
                        <p className="text-sm font-bold text-primary">{formatPercent(calcGrossYield(room.monthlyRent, room.salePrice))}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <FileText className="w-3 h-3" /> 메모
                    </h4>
                    <Input 
                      placeholder="특이사항 입력 (예: 26년 3월 만기)" 
                      value={room.memo || ""} 
                      onChange={(e) => updateRoomMemo(room.id, e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="p-4 bg-muted/50 border-t flex flex-wrap justify-between items-center gap-4 text-sm font-medium">
          <div className="flex gap-4">
            <span>총 매매: <span className="text-primary">{formatPrice(selectedRooms.reduce((sum, r) => sum + r.salePrice, 0))}</span></span>
            <span>총 임대료: <span className="text-primary">{formatNumber(selectedRooms.reduce((sum, r) => sum + r.monthlyRent, 0))}만원/월</span></span>
          </div>
          <div>
            전체 수익률: <span className="text-primary font-bold">{formatPercent(calcGrossYield(selectedRooms.reduce((sum, r) => sum + r.monthlyRent, 0), selectedRooms.reduce((sum, r) => sum + r.salePrice, 0)))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomFinancialEditor;
