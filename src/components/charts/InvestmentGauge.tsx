'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface InvestmentGaugeProps {
  score: number;
  grade: string;
  color: string;
  label: string;
}

const InvestmentGauge: React.FC<InvestmentGaugeProps> = ({ score, grade, color, label }) => {
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  return (
    <div className="relative w-full h-48 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#f1f5f9" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text Overlay */}
      <div className="absolute bottom-4 flex flex-col items-center text-center">
        <span className="text-4xl font-black italic tracking-tighter leading-none" style={{ color }}>{grade}</span>
        <div className="mt-1 flex flex-col">
          <span className="text-2xl font-black tracking-tighter leading-none">{score}</span>
          <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentGauge;
