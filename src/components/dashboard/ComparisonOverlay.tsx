'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { X, Trophy, AlertCircle, Building2, TrendingUp, Wallet, Ruler, Clock, Landmark, Loader2 } from 'lucide-react';
import { hasSupabaseEnv, getSupabaseConfigError, supabase } from '@/lib/supabase';
import { formatPrice, formatNumber, formatPercent } from '@/utils/format';

interface ComparisonOverlayProps {
  ids: string[];
  onClose: () => void;
}

interface ReportAnalysis {
  capRate?: number;
  leveragedYield?: number;
  pricePerPyeong?: number;
  dscr?: number;
  [key: string]: unknown;
}

interface BuildingInfo {
  useAprDay?: string;
  [key: string]: unknown;
}

interface AnalysisData {
  analysis?: ReportAnalysis;
  buildingInfo?: BuildingInfo;
  [key: string]: unknown;
}

interface SavedReport {
  id: string;
  bld_nm?: string | null;
  address?: string | null;
  total_sale_price?: number | null;
  analysis_data?: AnalysisData | null;
}

type MetricField = 'capRate' | 'leveragedYield' | 'pricePerPyeong' | 'dscr' | 'buildingAge';

function getUseApprovalYear(report: SavedReport): number {
  const yearText = report.analysis_data?.buildingInfo?.useAprDay?.substring(0, 4);
  const year = Number.parseInt(yearText ?? '', 10);
  return Number.isNaN(year) ? 0 : year;
}

function getMetricValue(report: SavedReport, field: Exclude<MetricField, 'buildingAge'>): number {
  const fromAnalysis = report.analysis_data?.analysis?.[field];
  const fromRoot = report.analysis_data?.[field];
  const value = typeof fromAnalysis === 'number' ? fromAnalysis : fromRoot;
  return typeof value === 'number' ? value : 0;
}

export function ComparisonOverlay({ ids, onClose }: ComparisonOverlayProps) {
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      if (!hasSupabaseEnv) {
        setConfigError(getSupabaseConfigError());
        setReports([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .in('id', ids);

        if (error) throw error;
        // 선택한 순서대로 정렬 (ids 배열 순서 유지)
        const fetchedReports = (data ?? []) as SavedReport[];
        const sortedData = ids
          .map((id) => fetchedReports.find((report) => report.id === id))
          .filter((report): report is SavedReport => Boolean(report));
        setReports(sortedData);
      } catch (error) {
        console.error('Fetch error:', error);
        setConfigError('비교 리포트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (ids.length > 0) fetchReports();
  }, [ids]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="font-black uppercase italic tracking-tighter text-zinc-400">Comparing Assets...</p>
        </div>
      </div>
    );
  }

  if (configError) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 px-5 py-4 bg-white border border-red-200 rounded-lg shadow">
          <p className="font-black text-sm text-zinc-900">비교 데이터 조회 실패</p>
          <p className="text-xs text-zinc-500">{configError}</p>
        </div>
      </div>
    );
  }

  // 지표별 Best 값 추출 로직
  const getBest = (field: MetricField, type: 'max' | 'min') => {
    if (field === 'buildingAge') {
      const years = reports.map((report) => getUseApprovalYear(report));
      return years.length > 0 ? Math.max(...years) : 0;
    }

    const values = reports.map((report) => getMetricValue(report, field));
    if (values.length === 0) return 0;
    return type === 'max' ? Math.max(...values) : Math.min(...values);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/20 backdrop-blur-md z-[100] p-4 md:p-10 flex items-center justify-center">
      <div className="bg-white w-full max-w-7xl max-h-full overflow-hidden shadow-2xl border-4 border-black flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b-4 border-black flex justify-between items-center bg-zinc-50">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Investment Comparison</h2>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Real-time Multi-Asset Strategic Analysis</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 transition-colors border-2 border-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white z-10 p-4 border-b-2 border-zinc-200 text-left w-48">
                  <span className="text-[10px] font-black uppercase text-zinc-400 italic">Metrics</span>
                </th>
                {reports.map((report) => (
                  <th key={report.id} className="p-4 border-b-2 border-zinc-200 min-w-[200px]">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="p-3 bg-black text-white rounded-full">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black line-clamp-1">{report.bld_nm || '익명 자산'}</span>
                      <span className="text-[9px] font-medium text-zinc-400 truncate w-full">{report.address}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {/* Row: Sale Price */}
              <MetricRow 
                label="총 매매가" 
                icon={<Wallet className="w-3 h-3" />}
                reports={reports}
                renderValue={(report) => formatPrice(report.total_sale_price ?? 0)}
              />
              {/* Row: Cap Rate */}
              <MetricRow 
                label="Cap Rate" 
                icon={<TrendingUp className="w-3 h-3" />}
                reports={reports}
                bestValue={getBest('capRate', 'max')}
                getNumericValue={(report) => report.analysis_data?.analysis?.capRate ?? 0}
                renderValue={(report) => formatPercent(report.analysis_data?.analysis?.capRate ?? 0)}
                highlight
              />
              {/* Row: Leveraged Yield */}
              <MetricRow 
                label="레버리지 수익률" 
                icon={<TrendingUp className="w-3 h-3" />}
                reports={reports}
                bestValue={getBest('leveragedYield', 'max')}
                getNumericValue={(report) => report.analysis_data?.analysis?.leveragedYield ?? 0}
                renderValue={(report) => formatPercent(report.analysis_data?.analysis?.leveragedYield ?? 0)}
                highlight
              />
              {/* Row: Price Per Pyeong */}
              <MetricRow 
                label="평당 매매가" 
                icon={<Ruler className="w-3 h-3" />}
                reports={reports}
                bestValue={getBest('pricePerPyeong', 'min')}
                getNumericValue={(report) => report.analysis_data?.analysis?.pricePerPyeong ?? 0}
                renderValue={(report) => `${formatNumber(report.analysis_data?.analysis?.pricePerPyeong ?? 0)}만`}
                highlight
              />
              {/* Row: DSCR */}
              <MetricRow 
                label="부채감당률 (DSCR)" 
                icon={<Landmark className="w-3 h-3" />}
                reports={reports}
                bestValue={getBest('dscr', 'max')}
                getNumericValue={(report) => report.analysis_data?.analysis?.dscr ?? 0}
                renderValue={(report) => (report.analysis_data?.analysis?.dscr ?? 0).toFixed(2)}
                highlight
              />
              {/* Row: Building Age */}
              <MetricRow 
                label="건물 연식" 
                icon={<Clock className="w-3 h-3" />}
                reports={reports}
                bestValue={getBest('buildingAge', 'max')} 
                getNumericValue={(report) => getUseApprovalYear(report)}
                renderValue={(report) => {
                  const year = getUseApprovalYear(report);
                  if (year === 0) return 'N/A';
                  const currentYear = new Date().getFullYear();
                  return `${currentYear - year}년`;
                }}
                highlight
              />
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-zinc-50 border-t-2 border-zinc-100 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-zinc-400" />
          <p className="text-[10px] font-bold text-zinc-400 uppercase">Comparison is based on the snapshot data at the time of saving.</p>
        </div>
      </div>
    </div>
  );
}

interface MetricRowProps {
  label: string;
  icon: ReactNode;
  reports: SavedReport[];
  bestValue?: number;
  getNumericValue?: (report: SavedReport) => number;
  renderValue: (report: SavedReport) => string;
  highlight?: boolean;
}

function MetricRow({ label, icon, reports, bestValue = 0, getNumericValue, renderValue, highlight = false }: MetricRowProps) {
  return (
    <tr className="group hover:bg-zinc-50 transition-colors">
      <td className="sticky left-0 bg-white group-hover:bg-zinc-50 z-10 p-4 font-bold text-xs flex items-center gap-2">
        <span className="text-zinc-400">{icon}</span>
        {label}
      </td>
      {reports.map((report) => {
        const valStr = renderValue(report);
        const numericVal = getNumericValue ? getNumericValue(report) : 0;
        const isBestVal = highlight && numericVal === bestValue && bestValue !== 0;

        return (
          <td key={report.id} className="p-4 text-center">
            <div className={`inline-flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isBestVal ? 'bg-zinc-900 text-white shadow-lg scale-110' : ''}`}>
              <span className={`text-sm font-black ${isBestVal ? 'text-white' : 'text-zinc-900'}`}>{valStr}</span>
              {isBestVal && (
                <div className="flex items-center gap-0.5 text-[8px] font-black uppercase italic tracking-tighter">
                  <Trophy className="w-2 h-2 text-yellow-400" /> Best Asset
                </div>
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
