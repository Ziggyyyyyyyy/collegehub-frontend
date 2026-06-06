import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, size = 'lg', ...props }, ref) => {
    const sizeClasses = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24',
    };

    return (
      <section
        ref={ref}
        className={cn('w-full', sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

export { Section };
