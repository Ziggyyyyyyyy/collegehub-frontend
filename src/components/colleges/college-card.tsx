import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { College } from '@/types';
import { SaveButton } from '../saved/save-button';
import { useCollegeStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CollegeCardProps {
  college: College;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  const router = useRouter();
  const { addToCompare, removeFromCompare, compareColleges } = useCollegeStore();

  const isInCompare = compareColleges.some(c => c.id === college.id);

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation-3"
      onClick={() => router.push(`/colleges/${college.id}`)}
      role="article"
      aria-label={`View ${college.name} details`}
    >
      <CardHeader className="pb-md">
        <div className="flex items-start justify-between">
          <div className="space-y-sm">
            <div className="flex items-center gap-2">
              <Badge variant={college.ranking <= 10 ? 'default' : 'outline'}>
                #{college.ranking}
              </Badge>
              <Badge variant="secondary">{college.type}</Badge>
            </div>
            <CardTitle className="text-lg">{college.name}</CardTitle>
            <div className="flex items-center gap-1 text-small text-text-tertiary">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {college.location}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-md">
        <div className="flex flex-wrap gap-sm mb-md">
          {college.courses.slice(0, 3).map((course) => (
            <Badge key={course} variant="secondary" className="text-small">
              {course}
            </Badge>
          ))}
          {college.courses.length > 3 && (
            <Badge variant="outline" className="text-small">
              +{college.courses.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-small text-text-secondary">Fees</p>
            <p className="text-h4 font-semibold text-text-primary">
              ₹{college.fees.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="text-h4 font-semibold text-text-primary">
              {college.rating}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <SaveButton
          college={college}
          size="default"
          variant="outline"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            if (isInCompare) {
              removeFromCompare(college.id);
            } else {
              addToCompare(college);
            }
          }}
          aria-label={isInCompare ? 'Remove from compare' : 'Add to compare'}
          className={cn(isInCompare && 'bg-primary text-primary-foreground hover:bg-primary-hover')}
        >
          <Scale className={cn('h-4 w-4', isInCompare && 'fill-current')} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export { CollegeCard };
