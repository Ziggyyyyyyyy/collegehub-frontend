'use client';

import { CollegeCard } from '@/components/colleges/college-card';
import { EmptyState } from '@/components/empty-state';
import { useCollegeStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

export default function SavedPage() {
  const router = useRouter();
  const { savedColleges } = useCollegeStore();

  return (
    <div className="min-h-screen">
      <Section size="lg">
        <Container>
          <div className="mb-10">
            <h1 className="text-h1 font-bold mb-2">Saved Colleges</h1>
            <p className="text-body-large text-text-secondary">
              Colleges you&apos;ve saved for later
            </p>
          </div>


{savedColleges.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="rounded-lg border p-5 bg-background">
      <p className="text-sm text-text-secondary mb-1">
        Saved Colleges
      </p>
      <p className="text-3xl font-bold">
        {savedColleges.length}
      </p>
    </div>

    <div className="rounded-lg border p-5 bg-background">
      <p className="text-sm text-text-secondary mb-1">
        Ready To Compare
      </p>
      <p className="text-3xl font-bold">
        {Math.min(savedColleges.length, 3)}
      </p>
    </div>

    <div className="rounded-lg border p-5 bg-background">
      <p className="text-sm text-text-secondary mb-1">
        Shortlist Status
      </p>
      <p className="text-lg font-semibold text-primary">
        Building List
      </p>
    </div>
  </div>
)}
          {savedColleges.length === 0 ? (
            <EmptyState
              title="No saved colleges yet"
              description="Start exploring and save colleges that interest you. They'll appear here!"
              icon="empty"
              action={{
                label: 'Explore Colleges',
                onClick: () => router.push('/')
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedColleges.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
