import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '이용 가이드',
  description: 'BuildingReportPro 이용 방법 안내',
  alternates: {
    canonical: '/guide',
  },
  openGraph: {
    title: '이용 가이드 | BuildingReportPro',
    description: 'BuildingReportPro 이용 방법 안내',
    url: 'https://building-report.pro/guide',
    type: 'article',
  },
};

export default function GuidePage() {
  const steps = [
    '주소 검색',
    '호실 선택',
    '견적 결과 확인',
    '인쇄/PDF 저장',
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900">
            <ArrowLeft className="w-4 h-4" /> 돌아가기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-black text-zinc-900 mb-6">BuildingReportPro 이용 가이드</h1>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="bg-white border border-zinc-200 rounded-xl p-4 text-zinc-700">
              {i + 1}. {s}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
