'use client';

import { useParams, useRouter } from 'next/navigation';
import { getCollegeById, COLLEGES } from '@/data/colleges';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollegeStatsCard } from '@/components/colleges/college-stats-card';
import { SaveButton } from '@/components/saved/save-button';
import { CollegeCard } from '@/components/colleges/college-card';
import { useCollegeStore } from '@/store/useStore';
import {
  ArrowLeft,
  MapPin,
  Star,
  Scale,
  CheckCircle2,
  Award,
  TrendingUp,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { useEffect, useState } from 'react';

export default function CollegeDetail() {
  const params = useParams();
  const router = useRouter();
  const college = getCollegeById(params.id as string);
  const { addToCompare, removeFromCompare, compareColleges } = useCollegeStore();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
  const sections = ['overview', 'courses', 'placements', 'reviews'];

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 180;

    for (const section of sections) {
      const element = document.getElementById(section);

      if (
        element &&
        scrollPosition >= element.offsetTop &&
        scrollPosition < element.offsetTop + element.offsetHeight
      ) {
        setActiveSection(section);
        break;
      }
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="h-8 bg-muted rounded w-64 mb-3 mx-auto" />
            <div className="h-4 bg-muted rounded w-32 mx-auto" />
          </div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">College Not Found</h2>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const isInCompare = compareColleges.some(c => c.id === college.id);

  const heroStats = [
    { title: 'Fees', value: `₹${college.fees.toLocaleString('en-IN')}`, icon: <Award className="h-5 w-5" /> },
    { title: 'Avg Package', value: `₹${(college.placements.average / 100000).toFixed(1)} LPA`, icon: <TrendingUp className="h-5 w-5" /> },
    { title: 'Highest Package', value: `₹${(college.placements.highest / 100000).toFixed(0)} LPA`, icon: <Building2 className="h-5 w-5" /> },
    { title: 'Placement Rate', value: `${college.placements.percentage}%`, icon: <GraduationCap className="h-5 w-5" /> }
  ];

  const similarColleges = college.similarCollegeIds
    .map(id => COLLEGES.find(c => c.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      <Section size="lg">
        <Container>
          <Button variant="ghost" onClick={() => router.back()} className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* College Hero */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="default" className="text-small">#{college.ranking}</Badge>
                  <Badge variant="outline">{college.type}</Badge>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400" />
                    <span className="font-semibold">{college.rating}</span>
                  </div>
                </div>
                <h1 className="text-h1 font-bold mb-3">{college.name}</h1>
                <p className="text-body-large text-text-secondary flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {college.location}
                </p>
              </div>
              <div className="flex gap-3">
                <SaveButton college={college} />
                <Button
                  variant={isInCompare ? 'default' : 'outline'}
                  onClick={() => isInCompare ? removeFromCompare(college.id) : addToCompare(college)}
                  disabled={!isInCompare && compareColleges.length >= 3}
                >
                  <Scale className={cn('h-4 w-4 mr-2', isInCompare && 'fill-current')} />
                  {isInCompare ? 'Remove from Compare' : 'Add to Compare'}
                </Button>
              </div>
            </div>
          </div>

          {/* Sticky Section Navigation */}
          <div className="sticky top-20 z-30 mb-8">
            <div className="rounded-lg border bg-background/95 backdrop-blur-sm shadow-sm p-2">
              <div className="flex flex-wrap justify-center gap-2">
                {['overview', 'courses', 'placements', 'reviews'].map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md transition-all',
                    activeSection === section
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-muted'
                  )}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {heroStats.map((stat, idx) => (
              <CollegeStatsCard key={idx} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card id="overview">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-text-secondary leading-relaxed mb-6">{college.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {college.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-md bg-muted">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-small">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Established:</span>
                      <span className="text-text-secondary">{college.established}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Accreditation:</span>
                      <span className="text-text-secondary">{college.accreditation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Campus Size:</span>
                      <span className="text-text-secondary">{college.campusSize} acres</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Students:</span>
                      <span className="text-text-secondary">{college.studentCount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Faculty:</span>
                      <span className="text-text-secondary">{college.facultyCount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Courses Offered */}
              <Card id="courses">
                <CardHeader>
                  <CardTitle>Courses Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {college.detailedCourses.map(course => (
                      <Card key={course.id} className="border border-border">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{course.name}</h4>
                          <div className="flex items-center justify-between text-small text-text-secondary">
                            <span>{course.duration}</span>
                            <span className="font-semibold text-text-primary">
                              ₹{course.fees.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Placements */}
              <Card id="placements">
                <CardHeader>
                  <CardTitle>Placements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 rounded-md bg-primary-light border border-primary/20 text-center">
                      <p className="text-small text-text-secondary mb-2">Average Package</p>
                      <p className="text-h3 font-bold text-primary">
                        ₹{(college.placements.average / 100000).toFixed(1)} LPA
                      </p>
                    </div>
                    <div className="p-6 rounded-md bg-muted border text-center">
                      <p className="text-small text-text-secondary mb-2">Highest Package</p>
                      <p className="text-h3 font-bold">
                        ₹{(college.placements.highest / 100000).toFixed(0)} LPA
                      </p>
                    </div>
                    <div className="p-6 rounded-md bg-muted border text-center">
                      <p className="text-small text-text-secondary mb-2">Placement Rate</p>
                      <p className="text-h3 font-bold">{college.placements.percentage}%</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Top Recruiters</h4>
                    <div className="flex flex-wrap gap-3">
                      {college.placements.topRecruiters.map((recruiter, idx) => (
                        <Badge key={idx} variant="secondary" className="text-small px-4 py-2">
                          {recruiter}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Placement Trends</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {college.placements.stats.map((stat, idx) => (
                        <div key={idx} className="p-4 rounded-md bg-muted">
                          <p className="text-small text-text-secondary mb-1">{stat.year}</p>
                          <p className="font-semibold">
                            ₹{(stat.average / 100000).toFixed(1)} LPA
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card id="reviews">
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-md">
                    <div>
                      <p className="text-small text-text-secondary mb-1">Average Rating</p>
                      <div className="flex items-center gap-2">
                        <p className="text-4xl font-bold">{college.reviews.average}</p>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-5 w-5',
                                i < Math.floor(college.reviews.average)
                                  ? 'fill-amber-400'
                                  : 'text-muted'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-small text-text-secondary">Based on</p>
                      <p className="text-h4 font-semibold">
                        {college.reviews.count.toLocaleString('en-IN')} reviews
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {college.reviews.list.map((review) => (
                      <div key={review.id} className="p-4 border border-border rounded-md">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-small text-text-secondary">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-4 w-4',
                                  i < review.rating ? 'fill-amber-400' : 'text-muted'
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-text-secondary">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Compare CTA */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-small text-text-secondary mb-4">
                    Compare this college with others to make an informed decision.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => router.push('/compare')}
                    disabled={compareColleges.length < 2 && !isInCompare}
                  >
                    Compare Colleges
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Colleges Section */}
          {similarColleges.length > 0 && (
            <div className="mt-12">
              <h2 className="text-h2 font-bold mb-6">Similar Colleges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarColleges.map((college) => (
                  college && <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
