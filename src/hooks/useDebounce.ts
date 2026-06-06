import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number): {
  value: T;
  isLoading: boolean;
} {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsLoading(false);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [value, delay]);

  return { value: debouncedValue, isLoading };
}
