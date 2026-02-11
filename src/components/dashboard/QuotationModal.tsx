'use client';

import { useState, useMemo, useEffect } from 'react';
import { X, Printer, CheckCircle2, AlertTriangle, FileText, TrendingUp, Home, Calendar, Activity, BarChart3, ArrowRight, Calculator, PieChart, Layers, Trash2, Building } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InitialCostChart from '@/components/charts/InitialCostChart';
import CashFlowChart from '@/components/charts/CashFlowChart';
import { UnitGridTable } from './UnitGridTable';

type ReportType = 'LEASE' | 'PURCHASE_USE' | 'PURCHASE_INVEST';

interface UnitData {
  _uid: string;
  area: any;
  hoNm: string;
  flrNo: any;
  flrGbCd?: string;
  mainPurpsCdNm?: string;
}

interface QuotationModalProps {
  selectedUnits: any[]; // 초기 선택된 유닛들 (없을 수도 있음)
  allUnits: any[];      // 건물 전체 유닛 리스트
  buildingData: any;
  address: string;
  onClose: () => void;
}

// Helper to parse floor display
function parseFloor(unit: any): string {
  const flrNo = Number(unit.flrNo) || 0;
  const flrGbCd = unit.flrGbCd;
  const isBasement = flrGbCd === "10";
  const isRooftop = flrGbCd === "30";
  const isPiloti = flrGbCd === "40";

  if (isBasement) {
    const basementLevel = flrNo > 0 ? flrNo : 1;
    return `B${basementLevel}`;
  } else if (isRooftop) {
    return `R${flrNo > 0 ? flrNo : ''}`;
  } else if (isPiloti) {
    return `P${flrNo > 0 ? flrNo : ''}`;
  } else {
    return flrNo > 0 ? `${flrNo}F` : '-';
  }
}

export function QuotationModal({ selectedUnits: initialSelected, allUnits, buildingData, address, onClose }: QuotationModalProps) {
  const [reportType, setReportType] = useState<ReportType>('LEASE');
  
  // 선택된 호실 관리 (Set for fast lookup, Array for order)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelected.map(u => u._uid)));
  
  // 평당가 설정
  const [depositPerPyung, setDepositPerPyung] = useState(150);
  const [rentPerPyung, setRentPerPyung] = useState(8);
  const [maintPerPyung, setMaintPerPyung] = useState(2.5);
  const [pricePerPyung, setPricePerPyung] = useState(2500); // 매매가

  // 현재 사무실 정보 (비교용)
  const [currentOffice, setCurrentOffice] = useState({
    deposit: 0,
    rent: 0,
    maint: 0
  });

  const toPyung = (m2: number) => m2 * 0.3025;

  // 선택된 호실 데이터 계산
  const selectionSummary = useMemo(() => {
    const selectedList = allUnits.filter(u => selectedIds.has(u._uid));
    const totalAreaM2 = selectedList.reduce((sum, u) => sum + (parseFloat(u.area) || 0), 0);
    const totalPyung = toPyung(totalAreaM2);

    const targetDeposit = Math.round(totalPyung * depositPerPyung);
    const targetRent = Math.round(totalPyung * rentPerPyung);
    const targetMaint = Math.round(totalPyung * maintPerPyung);
    const targetPrice = Math.round(totalPyung * pricePerPyung);

    return {
      count: selectedList.length,
      areaM2: totalAreaM2,
      pyung: totalPyung,
      deposit: targetDeposit,
      rent: targetRent,
      maint: targetMaint,
      price: targetPrice,
      monthlyTotal: targetRent + targetMaint,
      units: selectedList
    };
  }, [selectedIds, allUnits, depositPerPyung, rentPerPyung, maintPerPyung, pricePerPyung]);

  // 비교 분석 (Delta)
  const comparison = useMemo(() => {
    const currentMonthly = currentOffice.rent + currentOffice.maint;
    const monthlyDelta = selectionSummary.monthlyTotal - currentMonthly;
    const depositDelta = selectionSummary.deposit - currentOffice.deposit;

    return {
      monthlyDelta,
      depositDelta,
      isSaving: monthlyDelta < 0
    };
  }, [selectionSummary, currentOffice]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 print:p-0 print:bg-white overflow-hidden">
      <div className="flex w-full max-w-[1800px] h-[95vh] bg-white border-4 border-black shadow-2xl overflow-hidden print:block print:h-auto print:shadow-none print:border-none">
        
        {/* 왼쪽: 호실 선택 매트릭스 (Unit Grid) */}
        <div className="w-[50%] flex flex-col border-r-4 border-black bg-gray-50 print:hidden">
          <div className="p-6 bg-black text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Unit Inventory</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Select units to build quotation</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-blue-400">{selectionSummary.count} <span className="text-sm text-white font-bold">UNITS</span></p>
              <p className="text-xs text-gray-400 font-bold">{selectionSummary.pyung.toFixed(1)} PYUNG</p>
            </div>
          </div>
          <div className="flex-1 overflow-hidden p-6">
            <UnitGridTable 
              units={allUnits} 
              selectedIds={selectedIds} 
              onSelectionChange={setSelectedIds} 
            />
          </div>
        </div>

        {/* 오른쪽: 견적 시뮬레이터 (Simulator) */}
        <div className="w-[50%] flex flex-col bg-white overflow-y-auto print:w-full">
          <div className="p-12 print:p-0">
            {/* Header */}
            <div className="mb-10 flex justify-between items-start border-b-4 border-black pb-6">
              <div>
                <span className="bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest mb-2 inline-block">Quotation Draft</span>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">Integrated Estimate</h1>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-wide">{buildingData.bldNm || 'Building Name'} • {address}</p>
              </div>
              <div className="text-right">
                 <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full print:hidden"><X className="w-6 h-6" /></button>
              </div>
            </div>

            {/* 1. 입력 패널 (Input) */}
            <section className="mb-12 print:hidden">
              <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
                <Calculator className="w-5 h-5" />
                <h3 className="text-lg font-black uppercase tracking-tight">Financial Parameters</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Target Conditions */}
                <div className="border-2 border-black p-6 bg-gray-50">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Target Conditions (Per Pyung)</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold"><span>보증금</span><span>{depositPerPyung.toLocaleString()}만</span></div>
                      <input type="range" min="0" max="3000" step="10" value={depositPerPyung} onChange={(e) => setDepositPerPyung(Number(e.target.value))} className="w-full accent-black" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold"><span>월 임대료</span><span>{rentPerPyung.toLocaleString()}만</span></div>
                      <input type="range" min="0" max="50" step="0.5" value={rentPerPyung} onChange={(e) => setRentPerPyung(Number(e.target.value))} className="w-full accent-black" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold"><span>관리비</span><span>{maintPerPyung.toLocaleString()}만</span></div>
                      <input type="range" min="0" max="15" step="0.5" value={maintPerPyung} onChange={(e) => setMaintPerPyung(Number(e.target.value))} className="w-full accent-black" />
                    </div>
                  </div>
                </div>

                {/* Current Office (Comparison) */}
                <div className="border-2 border-gray-200 p-6">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Current Office (Comparison)</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">현재 보증금 합계 (만원)</label>
                      <input 
                        type="number" 
                        value={currentOffice.deposit || ''} 
                        onChange={(e) => setCurrentOffice({...currentOffice, deposit: Number(e.target.value)})}
                        className="w-full border-b-2 border-gray-300 py-1 text-sm font-bold focus:border-black outline-none" 
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">현재 월세 합계 (만원)</label>
                      <input 
                        type="number" 
                        value={currentOffice.rent || ''} 
                        onChange={(e) => setCurrentOffice({...currentOffice, rent: Number(e.target.value)})}
                        className="w-full border-b-2 border-gray-300 py-1 text-sm font-bold focus:border-black outline-none" 
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">현재 관리비 합계 (만원)</label>
                      <input 
                        type="number" 
                        value={currentOffice.maint || ''} 
                        onChange={(e) => setCurrentOffice({...currentOffice, maint: Number(e.target.value)})}
                        className="w-full border-b-2 border-gray-300 py-1 text-sm font-bold focus:border-black outline-none" 
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. 견적 결과 (Result) */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
                <FileText className="w-5 h-5" />
                <h3 className="text-lg font-black uppercase tracking-tight">Total Quotation</h3>
              </div>

              <div className="border-4 border-black divide-y-2 divide-black">
                {/* Total Summary */}
                <div className="grid grid-cols-3 divide-x-2 divide-black bg-gray-50">
                  <div className="p-6 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Area</p>
                    <p className="text-3xl font-black">{selectionSummary.pyung.toFixed(1)} <span className="text-sm font-bold text-gray-500">PY</span></p>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Deposit</p>
                    <p className="text-3xl font-black">{Math.round(selectionSummary.deposit / 10000).toLocaleString()} <span className="text-sm font-bold text-gray-500">억</span></p>
                  </div>
                  <div className="p-6 text-center bg-black text-white">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Monthly Total</p>
                    <p className="text-3xl font-black">{selectionSummary.monthlyTotal.toLocaleString()} <span className="text-sm font-bold text-gray-500">만</span></p>
                  </div>
                </div>

                {/* Comparison Analysis */}
                {currentOffice.rent > 0 && (
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Comparison Analysis</p>
                      <p className="text-sm font-bold">vs Current Office ({currentOffice.rent + currentOffice.maint}만)</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-3xl font-black flex items-center gap-2 ${comparison.isSaving ? 'text-blue-600' : 'text-red-600'}`}>
                        {comparison.isSaving ? '▼' : '▲'} {Math.abs(comparison.monthlyDelta).toLocaleString()} <span className="text-sm font-bold text-black">만원/월</span>
                      </p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {comparison.isSaving ? 'COST SAVING DETECTED' : 'COST INCREASE EXPECTED'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 3. 선택된 호실 리스트 (Detail List) */}
            <section>
              <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
                <Layers className="w-5 h-5" />
                <h3 className="text-lg font-black uppercase tracking-tight">Selected Unit Details</h3>
              </div>
              <div className="border-2 border-black">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 border-b-2 border-black text-[10px] uppercase font-black tracking-widest text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Floor</th>
                      <th className="px-4 py-3">Unit</th>
                      <th className="px-4 py-3">Area (Py)</th>
                      <th className="px-4 py-3 text-right">Est. Rent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectionSummary.units.map((u, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold">{parseFloor(u)}</td>
                        <td className="px-4 py-3 font-black">{u.hoNm}</td>
                        <td className="px-4 py-3 font-medium">{(Number(u.area) * 0.3025).toFixed(1)}</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-600">
                          {Math.round((Number(u.area) * 0.3025) * (rentPerPyung + maintPerPyung)).toLocaleString()}만
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t-2 border-black flex justify-between items-center print:hidden">
              <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors" onClick={onClose}>
                Close Simulator
              </button>
              <button onClick={() => window.print()} className="bg-black text-white px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2">
                <Printer className="w-4 h-4" /> Print PDF Report
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}