import { useEffect, useState } from 'react';

interface UseDebouncedSearchOptions {
  delay?: number;
  minLength?: number;
}

/**
 * Debounces a search query, only emitting a new value once the trimmed
 * query is empty (to allow clearing the search) or has reached minLength.
 */
export const useDebouncedSearch = (
  query: string,
  { delay = 400, minLength = 3 }: UseDebouncedSearchOptions = {},
) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed.length === 0 || trimmed.length >= minLength) {
        setDebouncedQuery(trimmed);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [query, delay, minLength]);

  return debouncedQuery;
};

export default useDebouncedSearch;
