import { useEffect, useRef, useCallback } from "react";

/**
 * Debounce hook for expensive operations
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 * @param dependencies Dependencies array
 */
export function useDebounce(
  callback: () => void,
  delay: number = 300,
  dependencies: unknown[] = []
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
