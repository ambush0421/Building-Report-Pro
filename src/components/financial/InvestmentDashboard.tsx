import React from 'react';
import { BarChart3, TrendingUp, Wallet, ArrowDownCircle, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRoomStore } from '@/stores/roomStore';
import NumberInput from '@/components/common/NumberInput';
import { formatNumber, formatPrice, formatPercent } from '@/utils/format';

const InvestmentDashboard: React.FC = () => {
  const { totalFinancials, vacancyRate, managementFeeRate, setVacancyRate, setManagementFeeRate, getInvestmentAnalysis } = useRoomStore();
  const analysis = getInvestmentAnalysis();

  if (totalFinancials.salePrice === 0) return null;

  return (
    <Card className="w-full shadow-lg border-green-100 bg-green-50/5">
      <CardHeader className="border-b border-green-100 bg-green-50/30 py-4">
        <CardTitle className="text-xl flex items-center gap-2 text-green-700">
          <BarChart3 className="w-5 h-5" />
          투자 수익률 분석 대시보드
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* 상단 주요 지표 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="총 매매가" value={formatPrice(totalFinancials.salePrice)} icon={Wallet} />
          <MetricCard label="총 보증금" value={formatPrice(totalFinancials.deposit)} icon={ArrowDownCircle} />
          <MetricCard label="월 임대료" value={formatNumber(totalFinancials.monthlyRent) + "만"} icon={TrendingUp} />
          <MetricCard label="평당 매매가" value={formatNumber(analysis.pricePerPyeong) + "만"} icon={BarChart3} />
        </div>

        {/* 수익률 지표 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <YieldCard label="총 수익률" value={formatPercent(analysis.grossYield)} status={analysis.grossYield >= 5 ? 'good' : 'normal'} />
          <YieldCard label="순 수익률" value={formatPercent(analysis.netYield)} status={analysis.netYield >= 4 ? 'good' : 'normal'} />
          <YieldCard label="Cap Rate" value={formatPercent(analysis.capRate)} status={analysis.capRate >= 4 ? 'good' : 'normal'} />
          <YieldCard label="레버리지 수익률" value={formatPercent(analysis.leveragedYield)} status={analysis.leveragedYield > analysis.grossYield ? 'good' : 'normal'} />
        </div>

        {/* NOI 분석 및 설정 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <Percent className="w-4 h-4 text-green-600" /> NOI (순영업소득) 분석
            </h4>
            <div className="space-y-3 p-4 bg-white rounded-lg border border-green-100 shadow-sm">
              <AnalysisRow label="연간 총소득 (GPI)" value={formatPrice(analysis.annualGrossIncome)} isMain />
              <AnalysisRow label="공실 손실" value={`-${formatPrice(analysis.vacancyLoss)}`} subValue={`(${vacancyRate * 100}%)`} />
              <Separator />
              <AnalysisRow label="유효 총소득 (EGI)" value={formatPrice(analysis.effectiveGrossIncome)} isMain />
              <AnalysisRow label="운영 비용 (OpEx)" value={`-${formatPrice(analysis.operatingExpense)}`} subValue={`(${managementFeeRate * 100}%)`} />
              <Separator className="bg-green-200" />
              <AnalysisRow label="순영업소득 (NOI)" value={formatPrice(analysis.noi)} isBold />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-green-600" /> 분석 설정
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <NumberInput 
                label="목표 공실률 (%)" 
                value={vacancyRate * 100} 
                onChange={(val) => setVacancyRate(val / 100)} 
                suffix="%" 
              />
              <NumberInput 
                label="관리비 비율 (%)" 
                value={managementFeeRate * 100} 
                onChange={(val) => setManagementFeeRate(val / 100)} 
                suffix="%" 
              />
            </div>
            <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
              * NOI(Net Operating Income)는 유효총소득에서 운영비용을 제외한 순수익으로, 부동산의 가치 평가 및 대출 상환 능력 판단의 핵심 지표입니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MetricCard: React.FC<{ label: string, value: string, icon: any }> = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-xl border border-green-50 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-3.5 h-3.5 text-green-600" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

const YieldCard: React.FC<{ label: string, value: string, status: 'good' | 'normal' }> = ({ label, value, status }) => (
  <div className={`p-4 rounded-xl border-2 shadow-sm text-center transition-colors ${status === 'good' ? 'border-green-200 bg-green-50' : 'border-muted bg-white'}`}>
    <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{label}</p>
    <p className={`text-xl font-black ${status === 'good' ? 'text-green-700' : 'text-foreground'}`}>{value}</p>
  </div>
);

const AnalysisRow: React.FC<{ label: string, value: string, subValue?: string, isMain?: boolean, isBold?: boolean }> = ({ 
  label, value, subValue, isMain, isBold 
}) => (
  <div className="flex justify-between items-center py-0.5">
    <div className="flex items-center gap-2">
      <span className={`text-sm ${isMain ? 'text-muted-foreground' : isBold ? 'font-bold' : 'text-muted-foreground'}`}>{label}</span>
      {subValue && <span className="text-[10px] text-muted-foreground">{subValue}</span>}
    </div>
    <span className={`text-sm font-mono ${isBold ? 'text-green-700 font-black text-base' : ''}`}>{value}</span>
  </div>
);

export default InvestmentDashboard;
