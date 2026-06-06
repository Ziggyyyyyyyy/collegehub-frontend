'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useCollegeStore } from '@/store/useStore';
import { X, Scale, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Container } from '../layout/container';
import { Badge } from '@/components/ui/badge';

const CompareDrawer = () => {
  const router = useRouter();
  const { compareColleges, removeFromCompare, clearCompare } = useCollegeStore();

  if (compareColleges.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-elevation-4 animate-in slide-in-from-bottom duration-300">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="font-semibold text-text-primary flex items-center gap-2">
                Compare
                <Badge variant="default" className="h-6 px-2">
                  {compareColleges.length}/3
                </Badge>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {compareColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-small border border-border"
                >
                  <span className="max-w-[120px] truncate">{college.name}</span>
                  <button
                    onClick={() => removeFromCompare(college.id)}
                    className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                    aria-label={`Remove ${college.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clearCompare} className="text-text-tertiary hover:text-text-primary">
              Clear
            </Button>
            <Button
              onClick={() => router.push('/compare')}
              disabled={compareColleges.length < 2}
              aria-disabled={compareColleges.length < 2}
              className="group"
            >
              {compareColleges.length < 2 ? `Add ${2 - compareColleges.length} more` : 'Compare Now'}
              {compareColleges.length >= 2 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { CompareDrawer };
