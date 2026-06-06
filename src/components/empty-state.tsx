import * as React from 'react';
import { Search, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: 'search' | 'empty' | 'error';
  children?: React.ReactNode;
}

const iconComponents = {
  search: Search,
  empty: Heart,
  error: AlertCircle,
};

const EmptyState = ({
  title, description, action, icon = 'search', children }: EmptyStateProps) => {
  const Icon = iconComponents[icon];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12',
        icon === 'error' ? 'text-destructive' : ''
      )}
    >
      <div className="mb-lg flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-text-tertiary" aria-hidden="true" />
      </div>
      <h3 className="mb-sm text-h3 font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mb-lg max-w-md text-body text-text-secondary">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} aria-label={action.label}>
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
};

export { EmptyState };
