'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface InitialCostChartProps {
  equity: number;
  loan: number;
  tax: number;
}

const InitialCostChart: React.FC<InitialCostChartProps> = ({ equity, loan, tax }) => {
  const data = [
    { name: '자기자본 (Equity)', value: equity, color: '#000000' }, // Black
    { name: '대출금 (Loan)', value: loan, color: '#9CA3AF' },    // Gray-400
    { name: '취득세 (Tax)', value: tax, color: '#E5E7EB' },      // Gray-200
  ];

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => `${(Number(value) / 10000).toLocaleString()}만원`}
            contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '0px', fontSize: '12px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="square"
            formatter={(value) => <span className="text-[10px] font-bold text-gray-600 uppercase">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InitialCostChart;
