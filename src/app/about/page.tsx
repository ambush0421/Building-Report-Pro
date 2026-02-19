import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: 'BuildingReportPro 서비스 소개 페이지',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: '서비스 소개 | BuildingReportPro',
    description: 'BuildingReportPro 서비스 소개 페이지',
    url: 'https://building-report.pro/about',
    type: 'article',
  },
};

export default function AboutPage() {
  const items = [
    '공공데이터 기반 건축물 분석',
    '매입/임차 비교 및 BEP 분석',
    '호실 단위 선택과 견적서 생성',
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900">
            <ArrowLeft className="w-4 h-4" /> 돌아가기
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-xl"><Building2 className="w-5 h-5 text-white" /></div>
            <h1 className="text-3xl font-black text-zinc-900">BuildingReportPro</h1>
          </div>
          <p className="text-zinc-600 mb-8">건축물대장 데이터를 기반으로 부동산 의사결정을 돕는 분석 서비스입니다.</p>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
