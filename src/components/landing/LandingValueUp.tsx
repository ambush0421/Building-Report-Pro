'use client';

import { Clock3, ShieldCheck, Sparkles } from 'lucide-react';

const VALUE_PILLARS = [
  {
    title: '검토 시간 단축',
    description: '주소 입력 후 건물·호실·시세 핵심 정보를 빠르게 모아 초안 검토 시간을 줄입니다.',
    metric: '평균 3분',
    icon: Clock3,
  },
  {
    title: '리스크 선제 점검',
    description: '비교 기준을 통일해 누락되기 쉬운 위험 신호를 체크포인트로 먼저 확인합니다.',
    metric: '체크포인트 기반',
    icon: ShieldCheck,
  },
  {
    title: '실행 가능한 산출물',
    description: '분석 결과를 의사결정·보고에 바로 쓸 수 있는 견적/리포트 흐름으로 연결합니다.',
    metric: '즉시 활용',
    icon: Sparkles,
  },
];

export function LandingValueUp() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold tracking-[0.16em] text-blue-600">VALUE-UP</p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">왜 빠르게 결론에 도달할 수 있나요?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            현장 실무에서 바로 필요한 속도, 점검, 실행성을 랜딩 단계부터 명확히 제공합니다.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {VALUE_PILLARS.map(({ title, description, metric, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-blue-600 p-2 text-white shadow-sm shadow-blue-500/20">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              <p className="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {metric}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
