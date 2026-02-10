'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, TrendingDown, TrendingUp, AlertTriangle, MapPin, Calendar, Car, Maximize } from 'lucide-react';

interface MobileComparisonCardProps {
  building: any;
  index: number;
  isBest: boolean;
}

export function MobileComparisonCard({ building, index, isBest }: MobileComparisonCardProps) {
  const formatCost = (cost: number) => {
    if (cost >= 10000) return `${(cost / 10000).toFixed(1)}억`;
    return `${cost.toLocaleString()}만`;
  };

  const toPyung = (m2: number) => (m2 * 0.3025).toFixed(1);

  return (
    <Card className={`w-full border-none shadow-xl rounded-[2rem] overflow-hidden bg-white mb-4 ${
      isBest ? 'ring-4 ring-blue-500/20' : ''
    }`}>
      <CardContent className="p-0">
        {/* 상단 헤더 섹션 */}
        <div className={`p-6 ${isBest ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Candidate {index + 1}</span>
            {isBest && (
              <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                <Trophy className="w-3 h-3 text-yellow-300" />
                <span className="text-[10px] font-bold">AI BEST CHOICE</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{building.name}</h3>
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{building.address}</span>
          </div>
        </div>

        {/* 메인 지표 섹션 */}
        <div className="p-6 grid grid-cols-2 gap-4 border-b border-slate-50">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">월 고정비</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">{formatCost(building.metrics.cost)}</span>
              {building.analysis.monthlySaving > 0 && <TrendingDown className="w-3 h-3 text-blue-500" />}
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">전용 면적</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">{toPyung(building.metrics.area)}평</span>
              <span className="text-[10px] text-slate-400">({building.metrics.area.toFixed(0)}㎡)</span>
            </div>
          </div>
        </div>

        {/* 상세 스펙 섹션 */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">인근 시세 평균</p>
                <p className="text-sm font-bold text-slate-700">{building.metrics.marketAvgPyung?.toLocaleString() || '-'}만/평</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black ${
              building.tags.riskLevel === 'SAFE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {building.tags.riskLevel === 'SAFE' ? '정상건물' : '주의필요'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">준공연도</p>
                <p className="text-xs font-bold text-slate-700">{building.metrics.year}년</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Car className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">주차대수</p>
                <p className="text-xs font-bold text-slate-700">{building.metrics.parking}대</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 3년 누적 이익 섹션 */}
        <div className={`p-6 ${isBest ? 'bg-blue-50' : 'bg-slate-50'} flex items-center justify-between`}>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">3년 누적 실질 이익</p>
            <p className={`text-xl font-black ${isBest ? 'text-blue-600' : 'text-slate-700'}`}>
              +{Math.round(building.analysis.cumulativeEffect3Y / 10000)}억원
            </p>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isBest ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
