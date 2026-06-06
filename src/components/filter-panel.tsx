'use client';

import * as React from 'react';
import { UNIQUE_STATES, UNIQUE_COURSES, FEE_RANGE } from '@/constants';
import { FilterOptions } from '@/types';
import { FilterChip } from './filter-chip';
import { Label } from '@/components/ui/label';

interface FilterPanelProps {
  filters: FilterOptions;
  updateFilter: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void;
}

export const FilterPanel = ({ filters, updateFilter }: FilterPanelProps) => {
  const handleLocationToggle = (state: string) => {
    const newLocations = filters.location.includes(state)
      ? filters.location.filter(s => s !== state)
      : [...filters.location, state];
    updateFilter('location', newLocations);
  };

  const handleCourseToggle = (course: string) => {
    const newCourses = filters.courses.includes(course)
      ? filters.courses.filter(c => c !== course)
      : [...filters.courses, course];
    updateFilter('courses', newCourses);
  };

  return (
    <div className="space-y-8">
      {/* Location Filter */}
      <div>
        <Label htmlFor="location-filters" className="text-h4 mb-4 font-semibold block">Location</Label>
        <div id="location-filters" className="flex flex-wrap gap-2" role="group" aria-label="Location filters">
          {UNIQUE_STATES.map(state => (
            <FilterChip
              key={state}
              selected={filters.location.includes(state)}
              onClick={() => handleLocationToggle(state)}
              aria-label={`Toggle ${state} filter`}
            >
              {state}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Courses Filter */}
      <div>
        <Label htmlFor="course-filters" className="text-h4 mb-4 font-semibold block">Courses</Label>
        <div id="course-filters" className="flex flex-wrap gap-2" role="group" aria-label="Course filters">
          {UNIQUE_COURSES.map(course => (
            <FilterChip
              key={course}
              selected={filters.courses.includes(course)}
              onClick={() => handleCourseToggle(course)}
              aria-label={`Toggle ${course} filter`}
            >
              {course}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <Label htmlFor="rating-filters" className="text-h4 mb-4 font-semibold block">Minimum Rating</Label>
        <div id="rating-filters" className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Rating filters">
          {[4, 4.2, 4.4, 4.6, 4.8].map(rating => (
            <FilterChip
              key={rating}
              selected={filters.minRating === rating}
              onClick={() => updateFilter('minRating', rating)}
              role="radio"
              aria-checked={filters.minRating === rating}
              aria-label={`Minimum rating ${rating}+`}
            >
              {rating}+
            </FilterChip>
          ))}
          {filters.minRating > 0 && (
            <FilterChip
              selected={false}
              onClick={() => updateFilter('minRating', 0)}
              aria-label="Clear rating filter"
            >
              Clear
            </FilterChip>
          )}
        </div>
      </div>

      {/* Fees Range Filter */}
      <div>
        <Label htmlFor="fees-min" className="text-h4 mb-4 font-semibold block">Fees Range (₹)</Label>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Label htmlFor="fees-min" className="text-small text-text-tertiary mb-1 block">Min</Label>
            <select
              id="fees-min"
              value={filters.minFees}
              onChange={(e) => updateFilter('minFees', Number(e.target.value))}
              className="w-full border border-border rounded-sm p-2 bg-background text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value={FEE_RANGE.MIN}>{FEE_RANGE.MIN.toLocaleString('en-IN')}</option>
              {[100000, 200000, 300000, 500000, 1000000, 1500000, 2000000].filter(
                fee => fee >= FEE_RANGE.MIN && fee <= FEE_RANGE.MAX
              ).map(fee => (
                <option key={fee} value={fee}>{fee.toLocaleString('en-IN')}</option>
              ))}
            </select>
          </div>
          <span className="text-text-tertiary text-body">-</span>
          <div className="flex-1">
            <Label htmlFor="fees-max" className="text-small text-text-tertiary mb-1 block">Max</Label>
            <select
              id="fees-max"
              value={filters.maxFees}
              onChange={(e) => updateFilter('maxFees', Number(e.target.value))}
              className="w-full border border-border rounded-sm p-2 bg-background text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {[100000, 200000, 300000, 500000, 1000000, 1500000, 2000000, FEE_RANGE.MAX].filter(
                fee => fee >= FEE_RANGE.MIN && fee <= FEE_RANGE.MAX
              ).map(fee => (
                <option key={fee} value={fee}>{fee.toLocaleString()}</option>
              ))}
              <option value={FEE_RANGE.MAX}>{FEE_RANGE.MAX.toLocaleString('en-IN')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
