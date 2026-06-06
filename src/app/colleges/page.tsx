'use client';

import { SearchBar } from '@/components/search-bar';
import { CollegeCard } from '@/components/colleges/college-card';
import { FilterBar } from '@/components/filter-bar';
import { EmptyState } from '@/components/empty-state';
import { useColleges } from '@/hooks/useColleges';
import { COLLEGES } from '@/data/colleges';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SORT_OPTIONS } from '@/constants';
import { Pagination } from '@/components/pagination';

export default function CollegesPage() {
  const {
    colleges,
    paginatedColleges,
    filters,
    sortBy,
    setSortBy,
    activeFilters,
    removeFilter,
    clearAllFilters,
    updateFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    isSearchLoading
  } = useColleges();

  return (
    <div className="min-h-screen">
      <Section size="md">
        <Container>
          <div className="mb-10">
            <h1 className="text-h1 font-bold mb-2">All Colleges</h1>
            <p className="text-body text-text-secondary">
              Browse and filter through {COLLEGES.length} top institutions
            </p>
          </div>

          <div className="mb-8">
            <SearchBar
              value={filters.search}
              onChange={(value) => updateFilter('search', value)}
              isLoading={isSearchLoading}
            />
          </div>

          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOptions={SORT_OPTIONS}
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
            onClearAllFilters={clearAllFilters}
            filters={filters}
            updateFilter={updateFilter}
          />

          {/* Search Results Count */}
          <div className="mb-6">
            {isSearchLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
            ) : (
              <p className="text-body text-text-secondary">
                Showing {paginatedColleges.length} of {colleges.length} result{colleges.length !== 1 ? 's' : ''}
                {filters.search && ` for "${filters.search}"`}
                {activeFilters.length > 0 && ' with applied filters'}
              </p>
            )}
          </div>

          {isSearchLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-border rounded-md p-6 animate-pulse">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-16 bg-muted rounded" />
                    <div className="h-6 w-20 bg-muted rounded" />
                  </div>
                  <div className="h-7 w-3/4 bg-muted rounded mb-3" />
                  <div className="flex items-center gap-1 mb-4">
                    <div className="h-4 w-4 bg-muted rounded-full" />
                    <div className="h-4 w-32 bg-muted rounded" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="h-5 w-24 bg-muted rounded-full" />
                    <div className="h-5 w-28 bg-muted rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-4 w-10 bg-muted rounded mb-1" />
                      <div className="h-6 w-20 bg-muted rounded" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-4 w-4 bg-muted rounded-full" />
                      <div className="h-6 w-10 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : colleges.length === 0 ? (
            <EmptyState
              title="No colleges found"
              description="Try adjusting your filters or search terms to find colleges that match your criteria."
              icon="search"
              action={{
                label: 'Reset Filters',
                onClick: clearAllFilters
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedColleges.map(college => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </Container>
      </Section>
    </div>
  );
}
