'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Settings2, Coins, Maximize, Car, Sparkles } from "lucide-react";

interface WeightMap {
  cost: number;
  area: number;
  parking: number;
  modernity: number;
}

interface WeightSettingsProps {
  weights: WeightMap;
  onChange: (weights: WeightMap) => void;
}

export function WeightSettings({ weights, onChange }: WeightSettingsProps) {
  const handleChange = (field: keyof WeightMap, value: number) => {
    // 가중치의 합이 대략적으로 유지되도록 하거나, 단순 개별 조정 가능하게 함
    onChange({ ...weights, [field]: value });
  };

  const metrics = [
    { id: 'cost', label: '비용 절감', icon: Coins, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'area', label: '공간 확보', icon: Maximize, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'parking', label: '주차 편의', icon: Car, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'modernity', label: '신축 선호', icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="w-5 h-5 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">의사결정 우선순위 설정</h3>
        </div>
        
        <div className="space-y-6">
          {metrics.map((m) => (
            <div key={m.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${m.bg}`}>
                    <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{m.label}</span>
                </div>
                <span className="text-[10px] font-black text-blue-600">{Math.round(weights[m.id as keyof WeightMap] * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={weights[m.id as keyof WeightMap]}
                onChange={(e) => handleChange(m.id as keyof WeightMap, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            * 각 항목의 비중을 조절하여 대표님의 경영 철학에 가장 부합하는 최적의 물건을 찾아보세요. 설정값은 AI 추천 알고리즘에 즉시 반영됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
