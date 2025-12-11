import { useState, useEffect } from 'react';
import { holidayService } from '@/lib/services/holidayService';
import type { AdvancedPackageSearchResult, HolidayPackage } from '@/types/holiday';

interface UseAdvancedPackageSearchOptions {
  enabled?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minNights?: number;
  maxNights?: number;
  theme?: string;
  sortBy?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export function useAdvancedPackageSearch(options: UseAdvancedPackageSearchOptions) {
  const [packages, setPackages] = useState<AdvancedPackageSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!options.enabled) return;

    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);

        const searchQuery = holidayService.buildAdvancedSearchQuery(options);
        const results = await holidayService.advancedPackageSearch(searchQuery);

        setPackages(results);
      } catch (err) {
        console.error('Advanced package search error:', err);
        setError('Failed to load packages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [
    options.enabled,
    options.minPrice,
    options.maxPrice,
    options.minNights,
    options.maxNights,
    options.theme,
    options.sortBy,
    options.page,
    options.pageSize,
  ]);

  return { packages, loading, error };
}
