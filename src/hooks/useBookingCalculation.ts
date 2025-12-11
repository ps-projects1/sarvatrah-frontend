import { useState, useEffect } from 'react';
import { bookingService } from '@/lib/services/bookingService';
import type { CalculateBookingRequest, CalculateBookingResponse } from '@/types/booking';

interface UseBookingCalculationProps {
  hotelId?: string;
  roomType?: string;
  startDate?: string;
  endDate?: string;
  occupancy?: number;
  childWithBed?: boolean;
  childWithoutBed?: boolean;
  vehicleCost?: number;
  priceMarkup?: number;
  enabled?: boolean;
}

export function useBookingCalculation({
  hotelId,
  roomType,
  startDate,
  endDate,
  occupancy = 1,
  childWithBed = false,
  childWithoutBed = false,
  vehicleCost = 0,
  priceMarkup = 10,
  enabled = true,
}: UseBookingCalculationProps) {
  const [data, setData] = useState<CalculateBookingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !hotelId || !roomType || !startDate || !endDate) {
      return;
    }

    const calculate = async () => {
      setLoading(true);
      setError(null);

      try {
        const request: CalculateBookingRequest = {
          hotel_id: hotelId,
          roomType,
          startDate,
          endDate,
          occupancy,
          childWithBed,
          childWithoutBed,
          vehicleCost,
          priceMarkup,
        };

        const result = await bookingService.calculateBookingCost(request);

        if (result.success) {
          setData(result);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Calculation failed');
      } finally {
        setLoading(false);
      }
    };

    calculate();
  }, [hotelId, roomType, startDate, endDate, occupancy, childWithBed, childWithoutBed, vehicleCost, priceMarkup, enabled]);

  return { data, loading, error };
}
