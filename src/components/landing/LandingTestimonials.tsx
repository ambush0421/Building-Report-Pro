'use client';

import { Building2, TrendingUp, Handshake, ClipboardCheck } from 'lucide-react';

const useCases = [
  {
    icon: TrendingUp,
    role: '부동산 투자자',
    quote: '"매입 vs 임차 BEP 분석으로 의사결정 속도가 빨라졌습니다."',
    detail: '상업용 부동산 투자 검토에 필요한 핵심 지표를 빠르게 확인',
    bg: 'bg-blue-50',
    accent: 'text-blue-600',
    border: 'border-blue-200',
  },
  {
    icon: Building2,
    role: '임대사업자',
    quote: '"호실/면적 정보를 기반으로 임대 전략을 세우기 좋습니다."',
    detail: '보유 건물의 수익 구조를 데이터로 관리',
    bg: 'bg-green-50',
    accent: 'text-green-600',
    border: 'border-green-200',
  },
  {
    icon: Handshake,
    role: '부동산 중개업소',
    quote: '"고객에게 전문 리포트를 바로 보여줄 수 있어 설득력이 높아집니다."',
    detail: '제안서 작성 시간을 줄이고 응대 품질 향상',
    bg: 'bg-purple-50',
    accent: 'text-purple-600',
    border: 'border-purple-200',
  },
  {
    icon: ClipboardCheck,
    role: '자산관리사(PM)',
    quote: '"관리 건물 현황을 빠르게 파악하고 보고하기 편합니다."',
    detail: '건물 단위 데이터 점검 및 보고 업무 효율화',
    bg: 'bg-amber-50',
    accent: 'text-amber-600',
    border: 'border-amber-200',
  },
];

export function LandingTestimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold mb-3">
            사용자 후기
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">누가 사용하나요?</h3>
          <p className="text-gray-500 mt-2">부동산 전문가들이 BuildingReportPro를 활용합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {useCases.map((u) => {
            const Icon = u.icon;
            return (
              <div key={u.role} className={`${u.bg} border ${u.border} rounded-2xl p-6 hover:shadow-md transition-all duration-300`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className={`w-6 h-6 ${u.accent}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-lg ${u.accent} mb-2`}>{u.role}</h4>
                    <p className="text-gray-700 text-sm italic mb-2 leading-relaxed">{u.quote}</p>
                    <p className="text-xs text-gray-500">{u.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
