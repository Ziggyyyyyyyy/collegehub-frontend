'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Heart, Scale, Sparkles } from 'lucide-react';
import { useCollegeStore } from '@/store/useStore';
import { Badge } from '@/components/ui/badge';
import { Container } from './container';

const Header = () => {
  const { savedColleges, compareColleges } = useCollegeStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <GraduationCap className="h-7 w-7 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold text-text-primary">CollegeHub</span>
          </Link>

          <nav className="flex items-center gap-3" aria-label="Main">
  <Button variant="ghost" asChild>
    <Link href="/">Find Colleges</Link>
  </Button>

  <Button variant="ghost" asChild>
    <Link href="/saved" className="relative">
      <Heart className="h-4 w-4 mr-2" aria-hidden="true" />
      Saved
      {savedColleges.length > 0 && (
        <Badge
          variant="default"
          className="ml-1 h-5 min-w-5 px-1"
          aria-label={`${savedColleges.length} saved colleges`}
        >
          {savedColleges.length}
        </Badge>
      )}
    </Link>
  </Button>

  <Button variant="ghost" asChild>
    <Link href="/compare" className="relative">
      <Scale className="h-4 w-4 mr-2" aria-hidden="true" />
      Compare
      {compareColleges.length > 0 && (
        <Badge
          variant="default"
          className="ml-1 h-5 min-w-5 px-1"
          aria-label={`${compareColleges.length} colleges to compare`}
        >
          {compareColleges.length}
        </Badge>
      )}
    </Link>
  </Button>

  <Button variant="ghost" asChild>
    <Link href="/predictor">
      <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
      Predictor
    </Link>
  </Button>
</nav>
        </div>
      </Container>
    </header>
  );
};

export { Header };
