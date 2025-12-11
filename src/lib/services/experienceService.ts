import { apiClient } from '../api-client';
import type { Experience } from '@/types/activity';

export interface ExperienceListParams {
  page?: number;
  limit?: number;
  category?: string;
  theme?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: string;
}

export interface ExperienceListResponse {
  status: boolean;
  message: string;
  data: {
    experiences: Experience[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export const experienceService = {
  /**
   * Get all experiences with optional pagination
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 10)
   */
  async getAllExperiences(page: number = 1, limit: number = 10) {
    try {
      const response = await apiClient.get<Experience[]>(
        `/experience?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get experiences with filters
   * @param params - Filter parameters
   */
  async getExperienceList(params: ExperienceListParams) {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.category) queryParams.append('category', params.category);
      if (params.theme) queryParams.append('theme', params.theme);
      if (params.city) queryParams.append('city', params.city);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
      if (params.duration) queryParams.append('duration', params.duration);

      const response = await apiClient.get<Experience[]>(
        `/experience?${queryParams.toString()}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single experience by ID
   * @param id - Experience ID
   */
  async getExperienceById(id: string) {
    try {
      const response = await apiClient.get<Experience>(`/experience/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search experiences
   * @param searchQuery - Search query string
   */
  async searchExperiences(searchQuery: string, page: number = 1, limit: number = 10) {
    try {
      const response = await apiClient.get<Experience[]>(
        `/experience?search=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
