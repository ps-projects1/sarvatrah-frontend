import { apiClient } from '../api-client';
import type {
  UserHolidayPackageListParams,
  UserHolidayPackageListResponse,
  AdvancedPackageSearchRequest,
  AdvancedPackageSearchResult,
  PackageDetailsRequest,
  PackageDetailsResponse,
  ItineraryResponse,
  VehicleUpdateOption,
  HotelOption,
} from '@/types/holiday';


export const holidayService = {

  async getAllPackages(page: number = 1, limit: number = 10) {
    try {
      const response = await apiClient.get<UserHolidayPackageListResponse>(
        `/holiday/get-holiday-package?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

 
  async getUserHolidayPackageList(params: UserHolidayPackageListParams) {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.packageType) queryParams.append('packageType', params.packageType);
      if (params.nights) queryParams.append('nights', params.nights);
      if (params.objectType) queryParams.append('objectType', params.objectType);
      if (params.selectType) queryParams.append('selectType', params.selectType);
      if (params.destinationCity) queryParams.append('destinationCity', params.destinationCity);
      if (params.recommendedPackage !== undefined)
        queryParams.append('recommendedPackage', params.recommendedPackage.toString());

      const response = await apiClient.get<UserHolidayPackageListResponse>(
        `/holiday/user-holiday-package-list?${queryParams.toString()}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

 
  async getLegacyPackages() {
    try {
      const response = await apiClient.get<any[]>('/holidays/packages');
      return response;
    } catch (error) {
      throw error;
    }
  },

 
  async advancedPackageSearch(searchParams: AdvancedPackageSearchRequest) {
    try {
      const response = await apiClient.post<AdvancedPackageSearchResult[]>(
        '/holidays/package-list',
        searchParams
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  
  async getPackageDetails(packageId: string, requestBody?: PackageDetailsRequest) {
    try {
      const response = await apiClient.post<PackageDetailsResponse>(
        `/holiday/get-holiday-package-details/${packageId}`,
        requestBody || {}
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  
  async getLegacyPackageDetails(
    packageId: string,
    requestBody?: {
      date?: string; // DD-MM-YYYY
      adult?: number;
      childWithBed?: number;
      childWithoutBed?: number;
      vehicleId?: string;
      ids?: Array<{ hotelId: string }>;
    }
  ) {
    try {
      const response = await apiClient.post<any>(
        `/holidays/package/details/${packageId}`,
        requestBody || {}
      );
      return response;
    } catch (error) {
      throw error;
    }
  },


  async getPackageItinerary(packageId: string, roomGuest?: any[]) {
    try {
      // Note: room_guest is passed via cookies in the backend
      // For now, we'll make the call and let the backend handle cookies
      const response = await apiClient.get<ItineraryResponse>(
        `/holidays/package/iti/${packageId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

 
  async getVehicleOptions(packageId: string) {
    try {
      const response = await apiClient.get<VehicleUpdateOption[]>(
        `/holidays/package/iti/vehicle/update/${packageId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

 
  async getHotelOptions(packageId: string) {
    try {
      const response = await apiClient.get<HotelOption[]>(
        `/holidays/package/iti/hotel/update/${packageId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

 
  async getPackageGallery(packageId: string) {
    try {
      const response = await apiClient.get<any>(
        `/holidays/package/gallery/${packageId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

 
  parseNightsFilter(nights: string): string {
    return nights;
  },

 
  buildAdvancedSearchQuery(filters: {
    minPrice?: number;
    maxPrice?: number;
    minNights?: number;
    maxNights?: number;
    theme?: string;
    sortBy?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
  }): AdvancedPackageSearchRequest {
    const query: AdvancedPackageSearchRequest = {};

    if (filters.page) query.page = filters.page;
    if (filters.pageSize) query.page_size = filters.pageSize;
    if (filters.sortBy) query.sort_by_price = filters.sortBy;

    if (filters.minPrice || filters.maxPrice) {
      query.budget_range = {};
      if (filters.minPrice) query.budget_range.gt = filters.minPrice;
      if (filters.maxPrice) query.budget_range.lt = filters.maxPrice;
    }

    if (filters.minNights || filters.maxNights) {
      query.tour_duration = {};
      if (filters.minNights) query.tour_duration.gt = filters.minNights;
      if (filters.maxNights) query.tour_duration.lt = filters.maxNights;
    }

    if (filters.theme) query.theme = filters.theme;

    return query;
  },
};
