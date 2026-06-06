import * as React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void;
  isLoading?: boolean;
};

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, isLoading = false, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <Search 
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" 
          aria-hidden="true" 
        />
        <Input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          className={cn('pl-11 pr-11 transition-shadow focus-visible:shadow-sm focus-visible:shadow-primary/10', className)}
          aria-label="Search colleges"
          {...props}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isLoading && (
            <Loader2 
              className="h-4 w-4 text-primary animate-spin" 
              aria-hidden="true" 
            />
          )}
          {value && onClear && !isLoading && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-text-tertiary hover:text-text-primary hover:bg-muted"
              onClick={onClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
