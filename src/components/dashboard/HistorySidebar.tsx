'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FolderOpen, History, Trash2, Building2, Loader2 } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  address?: string;
}

interface HistorySidebarProps {
  onSelectItem?: (item: HistoryItem) => void;
  currentId?: string;
}

export function HistorySidebar({ onSelectItem, currentId }: HistorySidebarProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchHistory();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setHistory([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('reports')
        .select('id, address, created_at, building_data')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted: HistoryItem[] = (data || []).map(item => ({
        id: item.id,
        title: item.building_data?.bldNm || '건물명 없음',
        address: item.address,
        date: new Date(item.created_at).toLocaleDateString(),
      }));

      setHistory(formatted);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('reports').delete().eq('id', id);
      if (error) throw error;
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black flex items-center gap-2 text-zinc-900">
            <History className="w-5 h-5 text-blue-600" />
            검토 목록
          </h2>
        </div>
        <p className="text-xs text-zinc-400">
          저장된 물건을 클릭하여 상세 분석 리포트를 확인하세요.
        </p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-2">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-300" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-10">
            <FolderOpen className="w-8 h-8 text-zinc-200 mx-auto mb-2" />
            <p className="text-xs text-zinc-400 font-medium">저장된 물건이 없습니다</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem && onSelectItem(item)}
              className={`w-full text-left p-4 rounded-2xl transition-all group border 
                ${currentId === item.id
                  ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/20'
                  : 'hover:bg-blue-50 border-transparent hover:border-blue-100'}
                cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg transition-colors ${currentId === item.id ? 'bg-blue-100' : 'bg-zinc-100 group-hover:bg-white'}`}>
                  <Building2 className={`w-4 h-4 ${currentId === item.id ? 'text-blue-600' : 'text-zinc-400 group-hover:text-blue-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold line-clamp-1 ${currentId === item.id ? 'text-blue-700' : 'text-zinc-700 group-hover:text-zinc-900'}`}>
                    {item.title}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono mt-1">{item.date}</p>
                  {item.address && (
                    <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">{item.address}</p>
                  )}
                </div>
                <button
                  onClick={(e) => deleteItem(e, item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                >
                  <Trash2 className="w-3 h-3 text-zinc-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 border-t border-gray-100 bg-zinc-50/50">
        <div className="flex items-center justify-between opacity-50">
          <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400">Building Report Pro</span>
          <span className="text-[10px] font-mono text-zinc-400">Cloud Sync</span>
        </div>
      </div>
    </div>
  );
}
