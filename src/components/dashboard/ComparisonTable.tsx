'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Trophy, AlertTriangle, Info, TrendingUp, TrendingDown, Clock, MapPin } from "lucide-react";

interface ComparisonTableProps {
  data: any;
  onViewDetail: (id: string) => void;
}

export function ComparisonTable({ data, onViewDetail }: ComparisonTableProps) {
  if (!data || !data.buildings) return null;

  const { buildings, recommendation, meta } = data;
  const bestIdx = recommendation.bestBuildingIndex;

  const formatCost = (cost: number) => {
    if (cost >= 10000) return `${(cost / 10000).toFixed(1)}억`;
    return `${cost.toLocaleString()}만`;
  };

  const toPyung = (m2: number) => (m2 * 0.3025).toFixed(1);

  return (
    <div className="space-y-6">
      {/* 추천 배너 */}
      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Trophy className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">AI 추천 최적 물건</p>
              <h2 className="text-2xl font-bold">{buildings[bestIdx].name}</h2>
            </div>
          </div>
          <div className="bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/10 max-w-md">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-200 mt-0.5" />
              <p className="text-sm leading-relaxed">{recommendation.reason}</p>
            </div>
          </div>
        </div>
        {/* 장식용 배경 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      {/* 비교 테이블 */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px] grid grid-cols-12 gap-0 border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden">
          {/* 항목 레이블 열 */}
          <div className="col-span-3 bg-slate-50/50 border-r border-slate-100">
            <div className="h-40 border-b border-slate-100 flex items-center px-6">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">비교 항목</span>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-slate-600">월 고정비 (임대료)</div>
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-blue-600 bg-blue-50/50">월 예상 절감액</div>
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-slate-600">전용 면적</div>
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-slate-600">가성비 (평당가)</div>
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-slate-600">준공 연도</div>
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-emerald-600 bg-emerald-50/50">인근 실거래 시세</div>
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-slate-600">주차 시설</div>
              <div className="h-16 flex items-center px-6 text-sm font-semibold text-slate-600">위험 요인</div>
              <div className="h-24 flex items-center px-6 text-sm font-bold text-slate-800 bg-slate-100/50">3년 누적 효과</div>
              <div className="h-20 flex items-center px-6 text-sm font-semibold text-slate-600">종합 평가</div>
            </div>
          </div>

          {/* 물건 데이터 열 */}
          {buildings.map((b: any, idx: number) => (
            <div 
              key={b.id} 
              className={`col-span-3 border-r border-slate-100 last:border-r-0 transition-all ${
                idx === bestIdx ? 'bg-blue-50/30 ring-2 ring-blue-500 ring-inset z-10' : ''
              }`}
            >
              {/* 건물 헤더 */}
              <div className="h-40 border-b border-slate-100 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {idx === bestIdx && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-sm">Best Choice</span>
                    )}
                    <span className="text-slate-400 text-xs font-medium">후보 {idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 line-clamp-2 leading-tight">{b.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3 h-3" />
                  <span className="text-[11px] truncate">{b.address.split(' ').slice(0, 2).join(' ')}</span>
                </div>
              </div>

              {/* 데이터 셀들 */}
              <div className="divide-y divide-slate-100">
                {/* 월 비용 */}
                <div className="h-16 flex items-center px-6">
                  <span className="text-lg font-bold text-slate-900">
                    {formatCost(b.metrics.cost)}
                  </span>
                </div>

                {/* 월 절감액 */}
                <div className={`h-16 flex items-center px-6 ${idx === bestIdx ? 'bg-blue-50/50' : 'bg-slate-50/30'}`}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-base font-bold ${b.analysis.monthlySaving >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                        {b.analysis.monthlySaving >= 0 ? '▼ ' : '▲ '}
                        {Math.abs(b.analysis.monthlySaving).toLocaleString()}만
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{b.analysis.monthlySaving >= 0 ? '월 고정비 절감' : '월 고정비 증가'}</span>
                  </div>
                </div>

                {/* 면적 */}
                <div className="h-16 flex items-center px-6">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-900">{toPyung(b.metrics.area)}평</span>
                    <span className="text-[10px] text-slate-400">({b.metrics.area.toFixed(1)}㎡)</span>
                  </div>
                  {b.tags.isLargest && <TrendingUp className="w-4 h-4 ml-2 text-emerald-500" />}
                </div>

                {/* 가성비 (평당가) */}
                <div className="h-16 flex items-center px-6">
                  <span className="text-sm font-medium text-slate-700">
                    {b.metrics.cost > 0 ? `${(b.metrics.cost / (b.metrics.area * 0.3025)).toFixed(1)}만/평` : '-'}
                  </span>
                </div>

                {/* 준공연도 */}
                <div className="h-16 flex items-center px-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">{b.metrics.year}년</span>
                    <span className="text-[10px] text-slate-400">{new Date().getFullYear() - b.metrics.year}년차</span>
                  </div>
                </div>

                {/* 인근 실거래 시세 */}
                <div className={`h-16 flex items-center px-6 ${idx === bestIdx ? 'bg-emerald-50/50' : 'bg-slate-50/10'}`}>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-emerald-700">
                      {b.metrics.marketAvgPyung > 0 ? `${b.metrics.marketAvgPyung.toLocaleString()}만/평` : '정보 없음'}
                    </span>
                    {b.metrics.marketAvgPyung > 0 && b.metrics.cost > 0 && (
                      <span className={`text-[10px] font-medium ${
                        (b.metrics.cost / (b.metrics.area * 0.3025)) < b.metrics.marketAvgPyung ? 'text-blue-500' : 'text-slate-400'
                      }`}>
                        {(b.metrics.cost / (b.metrics.area * 0.3025)) < b.metrics.marketAvgPyung ? '시장가 대비 저렴' : '시장가 수준'}
                      </span>
                    )}
                  </div>
                </div>

                {/* 주차 */}
                <div className="h-16 flex items-center px-6">
                  <span className="text-sm font-medium text-slate-700">{b.metrics.parking}대</span>
                </div>

                {/* 위험 요인 */}
                <div className="h-16 flex items-center px-6">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                    b.tags.riskLevel === 'SAFE' ? 'bg-emerald-100 text-emerald-700' :
                    b.tags.riskLevel === 'CAUTION' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {b.tags.riskLevel === 'DANGER' && <AlertTriangle className="w-3 h-3" />}
                    {b.tags.riskLevel === 'SAFE' ? '정상' : b.tags.riskLevel === 'CAUTION' ? '주의' : '위반'}
                  </div>
                </div>

                {/* 3년 누적 효과 */}
                <div className={`h-24 flex items-center px-6 ${idx === bestIdx ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>
                  <div className="flex flex-col">
                    <span className={`text-xl font-black ${idx === bestIdx ? 'text-white' : 'text-slate-800'}`}>
                      {b.analysis.cumulativeEffect3Y >= 0 ? '+' : ''}
                      {formatCost(b.analysis.cumulativeEffect3Y)}
                    </span>
                    <span className={`text-[10px] font-bold ${idx === bestIdx ? 'text-blue-100' : 'text-slate-400'}`}>
                      3년 누적 실질 손익
                    </span>
                    {idx === bestIdx && (
                      <span className="mt-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-md self-start">압도적 1위</span>
                    )}
                  </div>
                </div>

                {/* 종합 평가 및 액션 */}
                <div className="h-20 flex items-center px-6">
                  <button 
                    onClick={() => onViewDetail(b.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                      idx === bestIdx 
                      ? 'bg-blue-700 text-white shadow-lg hover:bg-blue-800' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    상세 보고서 보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
