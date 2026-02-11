import React from 'react';
import { TrendingUp, ArrowRightLeft, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBuildingStore } from '@/stores/buildingStore';
import { formatNumber } from '@/utils/format';

const NearbyTransactions: React.FC = () => {
  const { nearbyTransactions } = useBuildingStore();

  if (nearbyTransactions.length === 0) return null;

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b bg-muted/20 py-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          📈 주변 실거래가 (최근 3개월)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-[100px]"><Calendar className="w-3 h-3 inline mr-1" />거래일</TableHead>
                <TableHead>건물명</TableHead>
                <TableHead className="text-right">면적</TableHead>
                <TableHead className="text-right">거래금액</TableHead>
                <TableHead className="text-center">타입</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nearbyTransactions.map((tx, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs font-mono">{tx.dealDate}</TableCell>
                  <TableCell className="text-sm font-medium truncate max-w-[150px]">{tx.buildingName}</TableCell>
                  <TableCell className="text-right text-xs">{tx.areaForExclUse}㎡</TableCell>
                  <TableCell className="text-right font-bold text-sm">
                    {tx.dealType === 'sale' ? (
                      formatNumber(tx.dealAmount) + "만"
                    ) : (
                      `${formatNumber(tx.deposit || 0)}/${formatNumber(tx.monthlyRent || 0)}`
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={tx.dealType === 'sale' ? 'default' : 'secondary'} className="text-[10px] px-1.5 h-5">
                      {tx.dealType === 'sale' ? '매매' : '임대'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="p-3 bg-muted/30 text-[10px] text-muted-foreground flex items-center gap-1">
          <ArrowRightLeft className="w-3 h-3" /> 실거래가 데이터는 국토교통부 제공 데이터를 기반으로 하며, 실제와 다를 수 있습니다.
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyTransactions;
