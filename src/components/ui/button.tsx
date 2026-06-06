import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-8 px-3 text-small',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    let childrenToRender: React.ReactNode = props.children;
    
    // If using asChild, we need to ensure we have exactly one child that can accept props like className
    if (asChild) {
      const allChildren: React.ReactNode[] = [];
      if (loading) {
        allChildren.push(
          <div 
            key="spinner"
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" 
          />
        );
      }
      if (childrenToRender) {
        allChildren.push(childrenToRender);
      }
      
      if (allChildren.length > 1 || loading) {
        // Multiple children - wrap in a span to pass as a single child
        childrenToRender = <span className="flex items-center">{allChildren}</span>;
      }
    } else {
      if (loading) {
        childrenToRender = (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {childrenToRender}
          </>
        );
      }
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        aria-busy={loading}
        {...props}
      >
        {childrenToRender}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
