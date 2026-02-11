'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Loader2, Calculator, Search, Plus, MapPin, Building, Trash2 } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { HistorySidebar } from '@/components/dashboard/HistorySidebar';
import { ExpertCalculator } from '@/components/dashboard/ExpertCalculator';
import ReportView from '@/components/ReportView';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    });
  }, []);

  const handleSelectReport = (item: any) => {
    fetchFullReport(item.id);
  };

  const fetchFullReport = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setSelectedReport(data.building_data);
      setShowCalculator(false);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-zinc-50">
        <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Access Denied</h1>
          <p className="text-zinc-500 mb-6 font-bold uppercase text-xs">Authentication is required to view the Vault</p>
          <Link href="/" className="px-6 py-3 bg-black text-white font-black text-sm uppercase tracking-widest hover:translate-x-1 hover:-translate-y-1 transition-transform inline-block">
            Connect Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell
      title={selectedReport ? selectedReport.bldNm || 'Analysis View' : 'Property Vault'}
      subTitle={selectedReport ? selectedReport.platAddr : '저장된 분석 리포트를 관리하고 시뮬레이션 하세요.'}
      sidebar={<HistorySidebar onSelectItem={handleSelectReport} currentId={selectedReport?.id} />}
      headerAction={
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowCalculator(!showCalculator)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all border-2 
              ${showCalculator ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'}`}
          >
            <Calculator className="w-4 h-4" />
            {showCalculator ? '리포트 보기' : '시뮬레이터'}
          </button>
          <Link 
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            새 분석
          </Link>
        </div>
      }
    >
      <div className="max-w-6xl mx-auto">
        {showCalculator ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-900 p-2 rounded-xl">
                <Calculator className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Expert Financial Simulator</h2>
            </div>
            <ExpertCalculator />
          </div>
        ) : selectedReport ? (
          <div className="animate-in fade-in duration-700 pb-20">
             <ReportView data={selectedReport} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-50">
            <div className="bg-zinc-100 p-6 rounded-full mb-6">
              <Building className="w-12 h-12 text-zinc-300" />
            </div>
            <h2 className="text-xl font-bold text-zinc-400 uppercase tracking-tighter">No Report Selected</h2>
            <p className="text-sm text-zinc-400 mt-2 font-medium">왼쪽 목록에서 분석 리포트를 선택하거나 새로운 분석을 시작하세요.</p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
