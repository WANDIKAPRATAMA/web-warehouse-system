import { useRef } from "react";

export function useDebounce() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  return { debounce };
}
