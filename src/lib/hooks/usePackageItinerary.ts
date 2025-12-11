import { useState, useEffect } from 'react';
import { holidayService } from '@/lib/services/holidayService';
import type {
  ItineraryResponse,
  VehicleUpdateOption,
  HotelOption,
} from '@/types/holiday';

export function usePackageItinerary(packageId: string) {
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!packageId) return;

    const fetchItinerary = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await holidayService.getPackageItinerary(packageId);
        setItinerary(response);
      } catch (err) {
        console.error('Error fetching itinerary:', err);
        setError('Failed to load itinerary');
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [packageId]);

  return { itinerary, loading, error };
}

export function useVehicleOptions(packageId: string) {
  const [vehicles, setVehicles] = useState<VehicleUpdateOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    if (!packageId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await holidayService.getVehicleOptions(packageId);
      setVehicles(response);
    } catch (err) {
      console.error('Error fetching vehicle options:', err);
      setError('Failed to load vehicle options');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [packageId]);

  return { vehicles, loading, error, refetch: fetchVehicles };
}

export function useHotelOptions(packageId: string) {
  const [hotels, setHotels] = useState<HotelOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHotels = async () => {
    if (!packageId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await holidayService.getHotelOptions(packageId);
      setHotels(response);
    } catch (err) {
      console.error('Error fetching hotel options:', err);
      setError('Failed to load hotel options');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [packageId]);

  return { hotels, loading, error, refetch: fetchHotels };
}
