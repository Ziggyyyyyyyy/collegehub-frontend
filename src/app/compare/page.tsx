'use client';

import { useCollegeStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Star, CheckCircle2, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { cn } from '@/lib/utils';
import { College } from '@/types';
import { useMemo } from 'react';
import { EmptyState } from '@/components/empty-state';

interface ComparisonMetric {
  label: string;
  key: keyof College | ((college: College) => string | number);
  highlightType?: 'max' | 'min';
  format?: (value: string | number) => string;
}

const comparisonMetrics: ComparisonMetric[] = [
  { label: 'Ranking', key: 'ranking', highlightType: 'min' },
  { label: 'Rating', key: 'rating', highlightType: 'max' },
  { 
    label: 'Fees', 
    key: 'fees', 
    highlightType: 'min', 
    format: (value) => {
      const numValue = typeof value === 'number' ? value : Number(value);
      return `₹${numValue.toLocaleString('en-IN')}`;
    } 
  },
  {
    label: 'Average Package',
    key: (college) => college.placements.average,
    highlightType: 'max',
    format: (value) => {
      const numValue = typeof value === 'number' ? value : Number(value);
      return `₹${(numValue / 100000).toFixed(1)} LPA`;
    },
  },
  {
    label: 'Highest Package',
    key: (college) => college.placements.highest,
    highlightType: 'max',
    format: (value) => {
      const numValue = typeof value === 'number' ? value : Number(value);
      return `₹${(numValue / 100000).toFixed(0)} LPA`;
    },
  },
  {
    label: 'Placement Rate',
    key: (college) => college.placements.percentage,
    highlightType: 'max',
    format: (value) => {
      const numValue = typeof value === 'number' ? value : Number(value);
      return `${numValue}%`;
    },
  },
  {
    label: 'Courses',
    key: (college) => college.courses.length,
  },
];

export default function ComparePage() {
  const { compareColleges, removeFromCompare, clearCompare } = useCollegeStore();
  const router = useRouter();

  // Memoize calculations for better performance
  const { getMetricValue, getBestValue } = useMemo(() => {
    const getMetricValue = (college: College, metric: ComparisonMetric): string | number => {
      if (typeof metric.key === 'function') {
        return metric.key(college) as string | number;
      }
      return college[metric.key] as string | number;
    };

    const getBestValue = (metric: ComparisonMetric) => {
      const values = compareColleges.map(college => getMetricValue(college, metric));
      if (metric.highlightType === 'max') {
        return Math.max(...values.filter(v => typeof v === 'number') as number[]);
      }
      if (metric.highlightType === 'min') {
        return Math.min(...values.filter(v => typeof v === 'number') as number[]);
      }
      return null;
    };

    return { getMetricValue, getBestValue };
  }, [compareColleges]);

  if (compareColleges.length === 0) {
    return (
      <div className="min-h-screen">
        <Section size="md">
          <Container>
            <EmptyState
              title="No Colleges to Compare"
              description="Add at least 2 colleges to start comparing side-by-side"
              icon="search"
              action={{
                label: 'Browse Colleges',
                onClick: () => router.push('/colleges')
              }}
            />
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28">
      <Section size="md">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-h2 font-bold mb-2">Compare Colleges</h1>
              <p className="text-text-secondary">
                Compare {compareColleges.length} colleges side-by-side
              </p>
            </div>
            {compareColleges.length >= 2 && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
    <div className="rounded-lg border p-4 bg-primary/5">
      <p className="text-sm text-text-secondary mb-1">
        🏆 Highest Rated
      </p>
      <p className="font-semibold">
        {
          [...compareColleges].sort(
            (a, b) => b.rating - a.rating
          )[0]?.name
        }
      </p>
    </div>

    <div className="rounded-lg border p-4 bg-green-500/5">
      <p className="text-sm text-text-secondary mb-1">
        💰 Lowest Fees
      </p>
      <p className="font-semibold">
        {
          [...compareColleges].sort(
            (a, b) => a.fees - b.fees
          )[0]?.name
        }
      </p>
    </div>

    <div className="rounded-lg border p-4 bg-blue-500/5">
      <p className="text-sm text-text-secondary mb-1">
        📈 Best Placement
      </p>
      <p className="font-semibold">
        {
          [...compareColleges].sort(
            (a, b) =>
              b.placements.average -
              a.placements.average
          )[0]?.name
        }
      </p>
    </div>
  </div>
)}

{compareColleges.length >= 2 && (
  <Card className="mt-4 border-primary/30 bg-primary/5">
    <CardContent className="p-5">
      <h3 className="font-semibold text-lg mb-2">
        🏆 Recommended Choice
      </h3>

      <p className="text-sm text-text-secondary">
        Based on ranking, ratings and placements,
        <span className="font-semibold text-text-primary">
          {" "}
          {compareColleges[0]?.name}
        </span>
        {" "}is currently the strongest option.
      </p>
    </CardContent>
  </Card>
)}

            <Button variant="ghost" onClick={clearCompare}>
              Clear All
            </Button>
          </div>

          {/* Desktop Comparison Table */}
          <div className="hidden md:block overflow-x-auto border border-border rounded-lg">
            <div className="grid" style={{ gridTemplateColumns: `200px repeat(${compareColleges.length}, 1fr)`, gap: '1px', backgroundColor: 'hsl(var(--border))' }}>
              {/* Sticky Header Row */}
              <div className="bg-background p-4 font-semibold text-sm sticky left-0 z-10 border-r border-border" />
              {compareColleges.map(college => (
                <div key={college.id} className="bg-background p-4">
                  <div className="flex items-start justify-between">
                    <div className="mb-2">
                      <Badge variant="default" className="mb-2">#{college.ranking}</Badge>
                      <h3 className="font-semibold text-base">{college.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-text-secondary mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {college.location}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCompare(college.id)}
                      className="text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                      aria-label={`Remove ${college.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Rating Row */}
              <div className="bg-background p-4 text-sm font-medium sticky left-0 z-10 border-r border-border">Rating</div>
              {compareColleges.map(college => {
                const isBest = college.rating === getBestValue(comparisonMetrics[1]);
                return (
                  <div
                    key={college.id}
                    className={cn(
                      'bg-background p-4 transition-colors',
                      isBest && 'bg-primary/10 border-l-2 border-l-primary'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-amber-400" />
                        <span className="font-semibold text-lg">{college.rating}</span>
                      </div>
                      {isBest && <Trophy className="h-4 w-4 text-amber-500" aria-hidden="true" />}
                    </div>
                  </div>
                );
              })}

              {/* Metric Rows */}
              {comparisonMetrics.map(metric => (
                <>
                  <div key={metric.label} className="bg-background p-4 text-sm font-medium sticky left-0 z-10 border-r border-border">
                    {metric.label}
                  </div>
                  {compareColleges.map(college => {
                    const value = getMetricValue(college, metric);
                    const bestValue = getBestValue(metric);
                    const isBest = value === bestValue;
                    return (
                      <div
                        key={`${college.id}-${metric.label}`}
                        className={cn(
                          'bg-background p-4 transition-colors',
                          isBest && metric.highlightType && 'bg-primary/10 border-l-2 border-l-primary'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-base">
                            {metric.format ? metric.format(value) : value}
                          </span>
                          {isBest && metric.highlightType && (
                            <Badge variant="default" className="text-xs">
                              {metric.highlightType === 'max' ? 'Best' : 'Lowest'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ))}

              {/* Location Row */}
              <div className="bg-background p-4 text-sm font-medium sticky left-0 z-10 border-r border-border">Location</div>
              {compareColleges.map(college => (
                <div key={college.id} className="bg-background p-4">
                  <div className="flex items-center gap-1 text-sm text-text-secondary">
                    <MapPin className="h-3.5 w-3.5" />
                    {college.location}
                  </div>
                </div>
              ))}

              {/* Top Courses Row */}
              <div className="bg-background p-4 text-sm font-medium sticky left-0 z-10 border-r border-border">Top Courses</div>
              {compareColleges.map(college => (
                <div key={college.id} className="bg-background p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {college.courses.slice(0, 3).map((course, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

              {/* Highlight Row */}
              <div className="bg-background p-4 text-sm font-medium sticky left-0 z-10 border-r border-border">Highlights</div>
              {compareColleges.map(college => (
                <div key={college.id} className="bg-background p-4">
                  <div className="space-y-1.5">
                    {(college.highlights || []).slice(0, 3).map((highlight, idx) => (
  <div key={idx} className="flex items-start gap-1.5 text-sm">
    <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
    <span className="text-text-secondary">{highlight}</span>
  </div>
))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Comparison Cards */}
          <div className="md:hidden space-y-6">
            {compareColleges.map(college => (
              <Card key={college.id} className="relative overflow-hidden">
                <button
                  onClick={() => removeFromCompare(college.id)}
                  className="absolute top-4 right-4 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 z-10"
                  aria-label={`Remove ${college.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">#{college.ranking}</Badge>
                    <Badge variant="secondary">{college.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{college.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-text-secondary mt-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {college.location}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {comparisonMetrics.map(metric => {
                    const value = getMetricValue(college, metric);
                    const bestValue = getBestValue(metric);
                    const isBest = value === bestValue;
                    return (
                      <div key={metric.label} className={cn('flex items-center justify-between p-3 rounded-md border border-border', isBest && metric.highlightType && 'bg-primary/10 border-primary/30')}>
                        <span className="text-sm text-text-secondary font-medium">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {metric.format ? metric.format(value) : value}
                          </span>
                          {isBest && metric.highlightType && (
                            <Badge variant="default" className="text-xs">
                              {metric.highlightType === 'max' ? 'Best' : 'Lowest'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
