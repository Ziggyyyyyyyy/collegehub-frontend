import * as React from 'react';
import { SearchInput } from './search-input';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search colleges, courses, or locations...',
  className,
  isLoading = false
}: SearchBarProps) => {
  return (
    <SearchInput
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClear={() => onChange('')}
      className={className}
      isLoading={isLoading}
    />
  );
};

export { SearchBar };
