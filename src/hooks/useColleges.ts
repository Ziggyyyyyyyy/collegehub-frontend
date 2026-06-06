import { useMemo, useState } from 'react';
import { College, FilterOptions } from '@/types';
import { COLLEGES } from '@/data/colleges';
import { useDebounce } from './useDebounce';
import { FEE_RANGE, ITEMS_PER_PAGE } from '@/constants';

export function useColleges(initialFilters: Partial<FilterOptions> = {}) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    location: [],
    minFees: FEE_RANGE.MIN,
    maxFees: FEE_RANGE.MAX,
    minRating: 0,
    courses: [],
    ...initialFilters
  });

  const [sortBy, setSortBy] = useState<string>('ranking');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { value: debouncedSearch, isLoading: isSearchLoading } = useDebounce(filters.search, 300);

  // Get active filters for FilterBar display
  const activeFilters = useMemo(() => {
    const result: Array<{ id: string; label: string; value: string; type: 'location' | 'course' | 'fees' | 'rating' }> = [];

    filters.location.forEach(loc => {
      result.push({ id: `loc-${loc}`, label: loc, value: loc, type: 'location' });
    });

    filters.courses.forEach(course => {
      result.push({ id: `course-${course}`, label: course, value: course, type: 'course' });
    });

    if (filters.minRating > 0) {
      result.push({ id: `rating-${filters.minRating}`, label: `Rating ≥ ${filters.minRating}`, value: String(filters.minRating), type: 'rating' });
    }

    if (filters.minFees > FEE_RANGE.MIN || filters.maxFees < FEE_RANGE.MAX) {
        result.push({ id: `fees-${filters.minFees}-${filters.maxFees}`, label: `Fees: ₹${filters.minFees.toLocaleString('en-IN')} - ₹${filters.maxFees.toLocaleString('en-IN')}`, value: `${filters.minFees}-${filters.maxFees}`, type: 'fees' });
      }

    return result;
  }, [filters]);

  // Filter and sort colleges
  const filteredColleges = useMemo(() => {
    let result: College[] = [...COLLEGES];

    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(college =>
        college.name.toLowerCase().includes(searchLower) ||
        college.city.toLowerCase().includes(searchLower) ||
        college.state.toLowerCase().includes(searchLower) ||
        college.courses.some(course => course.toLowerCase().includes(searchLower))
      );
    }

    // Location filter
    if (filters.location.length > 0) {
      result = result.filter(college => filters.location.includes(college.state));
    }

    // Fees filter
    result = result.filter(college =>
      college.fees >= filters.minFees && college.fees <= filters.maxFees
    );

    // Rating filter
    result = result.filter(college => college.rating >= filters.minRating);

    // Courses filter
    if (filters.courses.length > 0) {
      result = result.filter(college =>
        filters.courses.some(course => college.courses.includes(course))
      );
    }

    // Sort
    result = sortColleges(result, sortBy);

    return result;
  }, [debouncedSearch, filters, sortBy]);

  // Paginated results
  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE);
  const paginatedColleges = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredColleges.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredColleges, currentPage]);

  // Helper to remove a specific filter
  const removeFilter = (id: string) => {
    const [type, ...rest] = id.split('-');
    const value = rest.join('-');

    setFilters(prev => {
      const newFilters = { ...prev };
      if (type === 'loc') {
        newFilters.location = prev.location.filter(l => l !== value);
      } else if (type === 'course') {
        newFilters.courses = prev.courses.filter(c => c !== value);
      } else if (type === 'rating') {
        newFilters.minRating = 0;
      } else if (type === 'fees') {
        newFilters.minFees = FEE_RANGE.MIN;
        newFilters.maxFees = FEE_RANGE.MAX;
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      location: [],
      minFees: FEE_RANGE.MIN,
      maxFees: FEE_RANGE.MAX,
      minRating: 0,
      courses: []
    });
    setCurrentPage(1);
  };

  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return {
    colleges: filteredColleges,
    paginatedColleges,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    activeFilters,
    removeFilter,
    clearAllFilters,
    updateFilter,
    isSearchLoading
  };
}

function sortColleges(colleges: College[], sortBy: string): College[] {
  const sorted = [...colleges];
  switch (sortBy) {
    case 'ranking':
      return sorted.sort((a, b) => a.ranking - b.ranking);
    case 'ranking-asc':
      return sorted.sort((a, b) => b.ranking - a.ranking);
    case 'fees':
      return sorted.sort((a, b) => a.fees - b.fees);
    case 'fees-desc':
      return sorted.sort((a, b) => b.fees - a.fees);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'rating-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'avg-package':
      return sorted.sort((a, b) => b.placements.average - a.placements.average);
    default:
      return sorted.sort((a, b) => a.ranking - b.ranking);
  }
}
