import React from 'react';
import { Landmark, Info, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoomStore } from '@/stores/roomStore';
import NumberInput from '@/components/common/NumberInput';
import { formatNumber, formatPrice, formatPercent } from '@/utils/format';

const LoanSimulator: React.FC = () => {
  const { totalFinancials, loanSimulation, updateLoanSimulation, setLoanRatio, getInvestmentAnalysis } = useRoomStore();
  const analysis = getInvestmentAnalysis();

  if (totalFinancials.salePrice === 0) return null;

  const handleRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ratio = parseInt(e.target.value);
    setLoanRatio(ratio);
  };

  const getDSCRBadge = (dscr: number) => {
    if (dscr >= 1.2) return <Badge className="bg-green-500">안정 (1.2 이상)</Badge>;
    if (dscr >= 1.0) return <Badge className="bg-yellow-500">주의 (1.0~1.2)</Badge>;
    return <Badge variant="destructive">위험 (1.0 미만)</Badge>;
  };

  return (
    <Card className="w-full shadow-lg border-blue-100 bg-blue-50/10">
      <CardHeader className="border-b border-blue-100 bg-blue-50/50 py-4">
        <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
          <Landmark className="w-5 h-5" />
          대출 레버리지 시뮬레이션
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">LTV (대출비율): <span className="text-blue-600 font-bold">{loanSimulation.loanRatio}%</span></label>
            <div className="text-xs text-muted-foreground">최대 90%</div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="90" 
            step="5" 
            value={loanSimulation.loanRatio} 
            onChange={handleRatioChange}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-white rounded border border-blue-50 shadow-sm">
              <p className="text-[10px] text-muted-foreground mb-1">대출금액</p>
              <p className="text-sm font-bold text-blue-600">{formatPrice(loanSimulation.loanAmount)}</p>
            </div>
            <div className="p-3 bg-white rounded border border-blue-50 shadow-sm">
              <p className="text-[10px] text-muted-foreground mb-1">자기자본</p>
              <p className="text-sm font-bold">{formatPrice(loanSimulation.selfFunding)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberInput 
            label="연 이자율 (%)" 
            value={loanSimulation.interestRate} 
            onChange={(val) => updateLoanSimulation('interestRate', val)} 
            suffix="%"
          />
          <NumberInput 
            label="대출 기간 (년)" 
            value={loanSimulation.loanTermYears} 
            onChange={(val) => updateLoanSimulation('loanTermYears', val)} 
            suffix="년"
          />
        </div>

        <div className="mt-4 p-5 bg-white rounded-xl border border-blue-100 shadow-sm space-y-4">
          <h4 className="text-sm font-bold flex items-center gap-1">
            <Info className="w-4 h-4 text-blue-500" /> 자동 계산 결과
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            <ResultItem label="월 원리금 상환액" value={`${formatNumber(loanSimulation.monthlyPayment)}만원`} />
            <ResultItem label="연간 이자 비용" value={formatPrice(loanSimulation.annualInterest)} />
            
            <div className="sm:col-span-2 py-3 border-y border-dashed flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">레버리지 수익률</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">{formatPercent(analysis.leveragedYield)}</span>
                  <span className="text-[10px] flex items-center text-blue-500">
                    <ArrowRight className="w-3 h-3 mx-1" /> 무레버리지 {formatPercent(analysis.grossYield)} 대비 상승
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">DSCR (부채상환능력)</p>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold">{analysis.dscr.toFixed(2)}</span>
                  {getDSCRBadge(analysis.dscr)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ResultItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-bold">{value}</span>
  </div>
);

export default LoanSimulator;
