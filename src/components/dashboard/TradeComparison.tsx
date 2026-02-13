'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TradeComparisonProps {
  comparison?: {
    avgPricePerSqm?: number;
    recentTradeCount?: number;
    trendLabel?: string;
    [key: string]: unknown;
  } | null;
  totalCount?: number;
}

export function TradeComparison({ comparison, totalCount }: TradeComparisonProps) {
  const avgPricePerSqm = comparison?.avgPricePerSqm;
  const recentTradeCount = comparison?.recentTradeCount;
  const trendLabel = comparison?.trendLabel;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Trade Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-slate-600">
        <p>
          Total transactions: <span className="font-semibold text-slate-900">{totalCount ?? 0}</span>
        </p>
        <p>
          Recent trades: <span className="font-semibold text-slate-900">{recentTradeCount ?? 0}</span>
        </p>
        <p>
          Avg price / m²:{' '}
          <span className="font-semibold text-slate-900">
            {typeof avgPricePerSqm === 'number' ? avgPricePerSqm.toLocaleString() : '-'}
          </span>
        </p>
        <p>
          Trend: <span className="font-semibold text-slate-900">{trendLabel ?? '-'}</span>
        </p>
      </CardContent>
    </Card>
  );
}

