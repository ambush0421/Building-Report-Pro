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
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="h-4" 
            style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }} 
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
