'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBar } from '@/components/search-bar';
import { CollegeCard } from '@/components/colleges/college-card';
import { FilterBar } from '@/components/filter-bar';
import { EmptyState } from '@/components/empty-state';
import { useColleges } from '@/hooks/useColleges';
import { COLLEGES } from '@/data/colleges';
import { CollegeStatsCard } from '@/components/colleges/college-stats-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SORT_OPTIONS } from '@/constants';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, MapPin, BookOpen, Award } from 'lucide-react';

export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  const router = useRouter();
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
    totalPages
  } = useColleges();

  const stats = [
    { title: 'Colleges', value: COLLEGES.length, icon: <GraduationCap className="h-5 w-5" aria-hidden="true" /> },
    { title: 'Locations', value: '28 States', icon: <MapPin className="h-5 w-5" aria-hidden="true" /> },
    { title: 'Courses', value: '30+', icon: <BookOpen className="h-5 w-5" aria-hidden="true" /> },
    { title: 'Top Ranked', value: '100+', icon: <Award className="h-5 w-5" aria-hidden="true" /> }
  ];

  const featuredColleges = COLLEGES.slice(0, 6);

  // If user starts interacting (search, filter), switch to listing view
  useEffect(() => {
    if (filters.search || activeFilters.length > 0) {
      setIsLanding(false);
    }
  }, [filters.search, activeFilters.length]);

  const handleExplore = () => {
    setIsLanding(false);
    router.push('/colleges');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Only on landing */}
      {isLanding && (
        <Section size="xl" className="bg-gradient-to-b from-background to-muted/30">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-display font-serif font-bold mb-6 leading-tight">
                Find Your Perfect
                <span className="text-primary block mt-2">College Match</span>
              </h1>
              <p className="text-body-large text-text-secondary mb-10 max-w-2xl mx-auto">
                Discover top colleges, compare programs, and find the best fit for your future.
                Real-time search, smart filters, and detailed insights all in one place.
              </p>
              <div className="mb-12">
                <SearchBar
                  value={filters.search}
                  onChange={(value) => {
                    updateFilter('search', value);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {stats.map((stat, idx) => (
                  <CollegeStatsCard key={idx} {...stat} />
                ))}
              </div>
              <Button onClick={handleExplore} className="text-lg px-8 py-6">
                Explore All Colleges
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* College Listing Section - Always visible (but styled differently) */}
      <Section size={isLanding ? 'lg' : 'md'}>
        <Container>
          <div className="mb-10">
            <h2 className="text-h2 font-bold mb-2">
              {isLanding ? 'Featured Colleges' : (colleges.length === COLLEGES.length ? 'All Colleges' : `Found ${colleges.length} Colleges`)}
            </h2>
            {!isLanding && (
              <p className="text-body text-text-secondary">
                Browse and filter through {COLLEGES.length} top institutions
              </p>
            )}
          </div>

          {!isLanding && (
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
          )}

          {colleges.length === 0 ? (
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
                {(isLanding ? featuredColleges : paginatedColleges).map(college => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {!isLanding && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {isLanding && (
            <div className="text-center mt-12">
              <Button onClick={handleExplore} variant="ghost">
                View All Colleges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
