import { apiClient } from '../api-client';
import type {
  CalculateBookingRequest,
  CalculateBookingResponse,
  BookingCalculationResult,
} from '@/types/booking';


export const bookingService = {

  async calculateBookingCost(
    request: CalculateBookingRequest
  ): Promise<CalculateBookingResponse> {
    try {
      const response = await apiClient.post<BookingCalculationResult>(
        '/booking/calculateBooking',
        request
      );

      return response as CalculateBookingResponse;
    } catch (error) {
      throw error;
    }
  },

 
  validateDateRange(startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end > start;
  },

 
  calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
};
