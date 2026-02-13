'use client';

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function YieldCalculator() {
  const [inputs, setInputs] = useState({
    price: 0,       // 매매가 (억원)
    loanRatio: 60,  // 대출비율 (%)
    interestRate: 4.5, // 대출금리 (%)
    deposit: 0,     // 보증금 (억원)
    monthlyRent: 0, // 월 임대료 (만원)
    managementFee: 0, // 월 관리비 (만원)
  });

  // 렌더링 시점에 결과 계산 (Derived State)
  const results = useMemo(() => {
    const price = inputs.price * 100000000; // 억원 -> 원
    const loan = price * (inputs.loanRatio / 100);
    const deposit = inputs.deposit * 100000000;
    const rent = inputs.monthlyRent * 10000; // 만원 -> 원
    const interest = loan * (inputs.interestRate / 100 / 12);
    
    const realInvest = price - loan - deposit;
    const netIncome = rent - interest;
    const yieldRate = realInvest > 0 ? (netIncome * 12 / realInvest) * 100 : 0;

    return {
      realInvestment: realInvest,
      monthlyInterest: interest,
      monthlyNetIncome: netIncome,
      yieldRate: yieldRate
    };
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <Card className="h-full border-2 border-black shadow-none rounded-none overflow-hidden font-sans">
      <CardHeader className="bg-white border-b-2 border-black p-4">
        <CardTitle className="text-lg font-black uppercase tracking-tighter italic flex items-center gap-2">
          💰 Yield Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">매매가 (억원)</label>
            <input type="number" name="price" value={inputs.price || ''} onChange={handleChange} className="w-full p-2 border-2 border-black font-black text-sm text-right focus:bg-black focus:text-white outline-none transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">대출비율 (%)</label>
            <input type="number" name="loanRatio" value={inputs.loanRatio || ''} onChange={handleChange} className="w-full p-2 border-2 border-black font-black text-sm text-right focus:bg-black focus:text-white outline-none transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">대출금리 (%)</label>
            <input type="number" name="interestRate" value={inputs.interestRate || ''} onChange={handleChange} className="w-full p-2 border-2 border-black font-black text-sm text-right focus:bg-black focus:text-white outline-none transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">보증금 (억원)</label>
            <input type="number" name="deposit" value={inputs.deposit || ''} onChange={handleChange} className="w-full p-2 border-2 border-black font-black text-sm text-right focus:bg-black focus:text-white outline-none transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">월세 (만원)</label>
            <input type="number" name="monthlyRent" value={inputs.monthlyRent || ''} onChange={handleChange} className="w-full p-2 border-2 border-black font-black text-sm text-right focus:bg-black focus:text-white outline-none transition-all" />
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-4 border-black space-y-4">
          <div className="flex justify-between items-center border-b-2 border-black/5 pb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real Investment</span>
            <span className="text-xl font-black italic">{(results.realInvestment / 100000000).toFixed(2)} <span className="text-sm font-bold">억</span></span>
          </div>
          <div className="flex justify-between items-center border-b-2 border-black/5 pb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Net</span>
            <span className={`text-xl font-black italic ${results.monthlyNetIncome >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {(results.monthlyNetIncome / 10000).toLocaleString()} <span className="text-sm font-bold">만</span>
            </span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Annual Yield</span>
            <span className={`text-3xl font-black italic ${results.yieldRate >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {results.yieldRate.toFixed(2)} <span className="text-sm font-bold">%</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
