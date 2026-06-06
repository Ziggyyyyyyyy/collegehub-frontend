import * as React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { College } from '@/types';
import { useCollegeStore } from '@/store/useStore';
import { useToast } from '@/components/ui/toast';
import type { ButtonProps } from '@/components/ui/button';

export interface SaveButtonProps extends Omit<ButtonProps, 'onClick'> {
  college: College;
  onClick?: (e: React.MouseEvent) => void;
}

const SaveButton = ({ college, onClick, className, variant = 'outline', size = 'default', ...props }: SaveButtonProps) => {
  const { savedColleges, saveCollege, removeCollege } = useCollegeStore();
  const { addToast } = useToast();
  const isSaved = savedColleges.some(c => c.id === college.id);

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    if (isSaved) {
      removeCollege(college.id);
      addToast({
        type: 'info',
        title: 'Removed from saved',
        description: `${college.name} has been removed from your saved colleges.`
      });
    } else {
      saveCollege(college);
      addToast({
        type: 'success',
        title: 'Saved!',
        description: `${college.name} has been added to your saved colleges.`
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
      isSaved && variant === 'outline' && 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700',
      isSaved && variant === 'default' && 'bg-red-600 hover:bg-red-700',
      className
    )}
      aria-label={isSaved ? 'Remove from saved' : 'Save college'}
      aria-pressed={isSaved}
      {...props}
    >
      <Heart className={cn('h-4 w-4 mr-2', isSaved && 'fill-current', isSaved && 'animate-bounce-once')} aria-hidden="true" />
      {props.children || (isSaved ? 'Saved' : 'Save')}
    </Button>
  );
};

export { SaveButton };
