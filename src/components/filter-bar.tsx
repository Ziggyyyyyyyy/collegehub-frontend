'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Filter as FilterIcon } from 'lucide-react';
import { FilterChip } from './filter-chip';
import { SortDropdown } from './sort-dropdown';
import { SortOption } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { FilterPanel } from './filter-panel';
import { FilterOptions } from '@/types';

export interface FilterBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
  activeFilters: Array<{ id: string; label: string; value: string; type: 'location' | 'course' | 'fees' | 'rating' }>;
  onRemoveFilter: (id: string) => void;
  onClearAllFilters: () => void;
  filters: FilterOptions;
  updateFilter: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void;
}

const FilterBar = ({
  sortBy,
  onSortChange,
  sortOptions,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  filters,
  updateFilter
}: FilterBarProps) => {
  return (
    <div className="flex flex-col gap-lg pb-xl">
      <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <SortDropdown
          value={sortBy}
          onChange={onSortChange}
          options={sortOptions}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="default" className="absolute -right-2 -top-2 h-5 min-w-5 px-1 flex items-center justify-center">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-md overflow-y-auto flex flex-col">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-6 flex-1">
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
              />
            </div>
            <div className="flex gap-3 pt-6 border-t border-border sticky bottom-0 bg-background pb-4">
              <Button variant="outline" onClick={onClearAllFilters} className="flex-1">
                Clear All
              </Button>
              <SheetTrigger asChild>
                <Button className="flex-1">Done</Button>
              </SheetTrigger>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-sm items-center animate-in slide-in-from-top-2 fade-in duration-200">
          {activeFilters.map((filter) => (
            <FilterChip
              key={filter.id}
              selected
              removable
              onRemove={() => onRemoveFilter(filter.id)}
            >
              {filter.label}
            </FilterChip>
          ))}
          <Button variant="ghost" size="sm" onClick={onClearAllFilters} className="h-8">
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export { FilterBar };
