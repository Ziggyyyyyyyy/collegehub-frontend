import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOption } from '@/types';
import { ArrowDownUp } from 'lucide-react';

export interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  placeholder?: string;
  label?: string;
}

const SortDropdown = ({
  value,
  onChange,
  options,
  placeholder = 'Sort by',
  label,
}: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-small text-text-secondary">{label}</span>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <div className="flex items-center gap-2">
            <ArrowDownUp className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent align="end" className="w-full sm:w-[200px]">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { SortDropdown };
