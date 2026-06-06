import { COLLEGES } from '@/data/colleges';

export const UNIQUE_STATES = Array.from(new Set(COLLEGES.map(college => college.state))).sort();

export const UNIQUE_COURSES = Array.from(new Set(COLLEGES.flatMap(college => college.courses))).sort();

export const FEE_RANGE = {
  MIN: Math.min(...COLLEGES.map(c => c.fees)),
  MAX: Math.max(...COLLEGES.map(c => c.fees)),
};

export const SORT_OPTIONS = [
  { value: 'ranking', label: 'Ranking (High → Low)' },
  { value: 'ranking-asc', label: 'Ranking (Low → High)' },
  { value: 'rating', label: 'Rating (High → Low)' },
  { value: 'fees', label: 'Fees (Low → High)' },
  { value: 'fees-desc', label: 'Fees (High → Low)' },
  { value: 'avg-package', label: 'Average Package (High → Low)' },
];

export const ITEMS_PER_PAGE = 9;
