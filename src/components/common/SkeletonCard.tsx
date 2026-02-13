import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  lines?: number;
  showTitle?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ lines = 4, showTitle = true }) => {
  return (
    <Card className="w-full">
      {showTitle && (
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {Array.from({ length: lines }).map((_, i) => {
          // 인덱스 기반의 고정된 너비 패턴 사용 (순수성 유지)
          const widths = ['85%', '92%', '78%', '88%', '95%'];
          const width = widths[i % widths.length];
          
          return (
            <Skeleton 
              key={i} 
              className="h-4" 
              style={{ width }} 
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
