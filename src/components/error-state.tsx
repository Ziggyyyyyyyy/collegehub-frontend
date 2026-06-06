import * as React from 'react';
import { EmptyState } from './empty-state';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: {
    label?: string;
    onClick?: () => void;
  };
}

const ErrorState = ({
  title = 'Something went wrong',
  description = 'Please try again',
  action,
}: ErrorStateProps) => {
  return (
    <EmptyState
      icon="error"
      title={title}
      description={description}
      action={
        action && action.onClick
          ? { label: action.label || 'Try again', onClick: action.onClick }
          : undefined
      }
    />
  );
};

export { ErrorState };
