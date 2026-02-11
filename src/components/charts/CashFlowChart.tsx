'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

interface CashFlowChartProps {
  grossIncome: number;
  interest: number;
  netIncome: number;
}

const CashFlowChart: React.FC<CashFlowChartProps> = ({ grossIncome, interest, netIncome }) => {
  const data = [
    { name: '임대수입', value: grossIncome, color: '#000000' },
    { name: '이자비용', value: -interest, color: '#9CA3AF' },
    { name: '순현금흐름', value: netIncome, color: '#2563EB' }, // Blue-600
  ];

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10, fontWeight: 'bold' }} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis hide />
          <Tooltip 
            formatter={(value: any) => `${Math.abs(Number(value)).toLocaleString()}원`}
            contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '0px', fontSize: '12px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'transparent' }}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="value" barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
