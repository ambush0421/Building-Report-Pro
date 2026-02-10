'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFReport } from './PDFReport';
import { FileDown, Share2, MessageCircle, MoreVertical } from 'lucide-react';

interface MobileFloatingBarProps {
  data: any;
}

export function MobileFloatingBar({ data }: MobileFloatingBarProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '부동산 기업 이전 보고서',
          text: `[${data.buildings[data.recommendation.bestBuildingIndex].name}] 외 물건 비교 분석 결과입니다.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Sharing failed', err);
      }
    } else {
      alert('공유 기능을 지원하지 않는 브라우저입니다.');
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl p-2 flex items-center justify-between">
        {/* PDF 다운로드 */}
        <PDFDownloadLink 
          document={<PDFReport data={data} />} 
          fileName="building_report.pdf"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white/80 hover:text-white"
        >
          {({ loading }) => (
            <>
              <FileDown className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase">{loading ? '...' : 'PDF'}</span>
            </>
          )}
        </PDFDownloadLink>

        <div className="w-px h-8 bg-white/10"></div>

        {/* 공유하기 */}
        <button 
          onClick={handleShare}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white/80 hover:text-white transition-all"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase">Share</span>
        </button>

        <div className="w-px h-8 bg-white/10"></div>

        {/* 상담문의 (메인 버튼) */}
        <button className="flex-[1.5] bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] py-3 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="text-xs font-black uppercase">Contact</span>
        </button>
      </div>
    </div>
  );
}
