import { useState, useEffect } from 'react';
import { holidayService } from '@/lib/services/holidayService';
import type { UserHolidayPackageListParams, HolidayPackage, PaginationInfo } from '@/types/holiday';

interface UseUserHolidayPackagesResult {
  packages: HolidayPackage[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUserHolidayPackages(
  params: UserHolidayPackageListParams
): UseUserHolidayPackagesResult {
  const [packages, setPackages] = useState<HolidayPackage[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await holidayService.getUserHolidayPackageList(params);

      if (response.success && response.data) {
        setPackages(response.data.holidayPackages);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to load packages');
      }
    } catch (err) {
      console.error('Error fetching user holiday packages:', err);
      setError('Failed to load packages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [
    params.page,
    params.limit,
    params.packageType,
    params.nights,
    params.objectType,
    params.selectType,
    params.destinationCity,
    params.recommendedPackage,
  ]);

  return {
    packages,
    pagination,
    loading,
    error,
    refetch: fetchPackages,
  };
}
