import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface CollegeStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

const CollegeStatsCard = ({
  title,
  value,
  subtitle,
  icon,
  highlight,
  className,
}: CollegeStatsCardProps) => {
  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-elevation-3',
        highlight && 'border-primary bg-primary/5',
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-sm">
        <p className="text-small font-medium text-text-secondary">{title}</p>
        {icon && <div className="text-text-tertiary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <p className="text-h3 font-bold text-text-primary">{value}</p>
        {subtitle && (
          <p className="mt-xs text-small text-text-tertiary">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};

export { CollegeStatsCard };
