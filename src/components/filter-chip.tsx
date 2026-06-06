import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onRemove?: () => void;
  removable?: boolean;
  children: React.ReactNode;
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, selected, removable, onRemove, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={cn(
          'inline-flex items-center gap-1 rounded-pill px-3 py-1.5 text-small font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95',
          selected
            ? 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm'
            : 'bg-secondary text-secondary-foreground hover:bg-accent hover:shadow-sm',
          removable && selected && 'pr-2',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {removable && selected && (
          <button
            type="button"
            className="flex items-center justify-center rounded-full p-0.5 hover:bg-primary-foreground/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            aria-label="Remove filter"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </button>
    );
  }
);
FilterChip.displayName = 'FilterChip';

export { FilterChip };
