import React, { useEffect, useState } from "react";
import DateSection from "./DateSection";
import DayHeader from "./itinerary/DayHeader";
import HotelCard from "./itinerary/HotelCard";
import ActivityCard from "./itinerary/ActivityCard";
import EndOfDayCard from "./itinerary/EndOfDayCard";
import TransferCard from "./itinerary/TransferCard";
import { HolidayPackage } from "@/types/holiday";
import type { CalculateBookingResponse } from "@/types/booking";
import { bookingService } from "@/lib/services/bookingService";
import { addDays, format } from "date-fns";

interface ItineraryProps {
  itineraryData: Array<{
    dayNo: number;
    title: string;
    subtitle: string;
    description: string;
    stay: boolean;
    hotel_id?: string;
    state?: string;
    city?: string;
    mealsIncluded: string[];
    transport: {
      type: string;
      details: string;
    };
    placesToVisit: string[];
    activities: Array<{
      type: string;
      title: string;
      description: string;
      duration: string;
    }>;
    notes?: string;
  }>;
  packageData?: HolidayPackage;
  selectedHotelId?: string | null;
  selectedVehicleId?: string | null;
  selectedRoomType?: string;
  onHotelChange?: (hotelId: string) => void;
  onVehicleChange?: (vehicleId: string) => void;
  onRoomTypeChange?: (roomType: string) => void;
  onBookingCalculated?: (calculation: CalculateBookingResponse) => void;
  onDownload?: () => void;
  onShare?: () => void;
  travelStartDate?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
}

const Itinerary = ({
  itineraryData,
  packageData,
  selectedHotelId,
  selectedVehicleId,
  selectedRoomType = "standard",
  onHotelChange,
  onVehicleChange,
  onRoomTypeChange,
  onBookingCalculated,
  onDownload,
  onShare,
  travelStartDate,
  numberOfAdults = 2,
  numberOfChildren = 0,
}: ItineraryProps) => {
  // State to store fetched hotel details
  const [hotelDetails, setHotelDetails] = useState<Record<string, any>>({});

  const getCityName = (day: any): string => {
    // Try to get city from multiple possible locations
    if (day.city) {
      if (typeof day.city === "string") return day.city;
      if (typeof day.city === "object" && day.city.name) return day.city.name;
    }

    // Fallback: try to get from title or subtitle
    if (day.title && day.title !== "") return day.title;
    if (day.subtitle && day.subtitle !== "") return day.subtitle;

    // Last resort: try package destination cities
    if (
      packageData?.destinationCity &&
      packageData.destinationCity.length > 0
    ) {
      const firstCity = packageData.destinationCity[0];
      if (typeof firstCity === "string") return firstCity;
      if (typeof firstCity === "object" && firstCity.name)
        return firstCity.name;
    }

    return "Destination";
  };

  // Fetch hotel details for all hotels in the itinerary
  useEffect(() => {
    const fetchHotelDetails = async () => {
      const hotelIds = itineraryData
        .filter((day) => day.stay && day.hotel_id)
        .map((day) => day.hotel_id as string);

      if (hotelIds.length === 0) return;

      const details: Record<string, any> = {};

      for (const hotelId of hotelIds) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/get-hotel-details/${hotelId}`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.status && data.data) {
              details[hotelId] = data.data;
            }
          }
        } catch (error) {
          console.error(`Failed to fetch hotel details for ${hotelId}:`, error);
        }
      }

      setHotelDetails(details);
    };

    fetchHotelDetails();
  }, [itineraryData]);

  // Automatic booking calculation when selections change
  useEffect(() => {
    const calculateBooking = async () => {
      // Only calculate if we have all required data
      if (!packageData || !selectedVehicleId || !selectedHotelId) {
        return;
      }

      // Find the hotel in itinerary
      const hotelDay = itineraryData.find(
        (day) => day.stay && day.hotel_id === selectedHotelId
      );
      if (!hotelDay?.hotel_id) {
        return;
      }

      // Get selected vehicle from vehiclePrices or availableVehicle
      let selectedVehicle = packageData.vehiclePrices?.find(
        (v) => v.vehicle_id === selectedVehicleId
      );

      // If not found in vehiclePrices, try availableVehicle
      if (!selectedVehicle && packageData.availableVehicle) {
        const availableVehicle = packageData.availableVehicle.find(
          (v) => v.vehicle_id === selectedVehicleId
        );
        if (availableVehicle) {
          selectedVehicle = {
            vehicle_id: availableVehicle.vehicle_id,
            vehicleType: availableVehicle.vehicleType,
            price: availableVehicle.price,
          };
        }
      }

      if (!selectedVehicle) {
        console.warn("Vehicle not found in package");
        return;
      }

      // Calculate dates (using travel start date from search or default to today)
      const startDate = travelStartDate ? new Date(travelStartDate) : new Date();
      const endDate = addDays(startDate, packageData.packageDuration.days);

      // Determine children breakdown (simple logic: if more than 0 children, assume at least one with bed)
      const hasChildWithBed = numberOfChildren > 0;
      const hasChildWithoutBed = numberOfChildren > 1;

      try {
        const result = await bookingService.calculateBookingCost({
          hotel_id: hotelDay.hotel_id,
          roomType: selectedRoomType,
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
          occupancy: numberOfAdults,
          childWithBed: hasChildWithBed,
          childWithoutBed: hasChildWithoutBed,
          vehicleCost: selectedVehicle.price,
          priceMarkup: packageData.priceMarkup || 10,
        });

        if (result.success && onBookingCalculated) {
          onBookingCalculated(result);
        }
      } catch (error: any) {
        // Handle API errors gracefully - silently fail for 404
        // The sidebar will use estimated pricing as fallback
      }
    };

    calculateBooking();
  }, [
    selectedVehicleId,
    selectedRoomType,
    selectedHotelId,
    packageData,
    itineraryData,
    onBookingCalculated,
    travelStartDate,
    numberOfAdults,
    numberOfChildren,
  ]);

  return (
    <div className=" w-full">
      <div className="mx-auto ">
        <div className="flex flex-col ">
          <DateSection
            totalDays={itineraryData.length}
            onDownload={onDownload}
            onShare={onShare}
            travelStartDate={travelStartDate}
          />

          {itineraryData.map((day) => (
            <div key={day.dayNo} className="mb-6">
              <DayHeader
                day={day.dayNo}
                location={getCityName(day)}
                hotels={day.stay ? 1 : 0}
                activities={day.activities.length}
                transfers={day.transport && day.dayNo === 1 ? 1 : 0}
              />

              <div className="bg-white rounded-b-lg overflow-hidden">
                {day.transport && day.dayNo === 1 && (
                  <TransferCard
                    from="Start Point"
                    to={getCityName(day)}
                    vehicleType={day.transport.type}
                    facilities={day.transport.details}
                    image="/images/holiday/holiday_list.png"
                    packageData={packageData}
                    selectedVehicleId={selectedVehicleId}
                    onVehicleChange={onVehicleChange}
                  />
                )}

                {day.activities.map((activity, index) => (
                  <ActivityCard
                    key={`${day.dayNo}-activity-${index}-${activity.title}`}
                    title={activity.title}
                    location={`${getCityName(day)}, India`}
                    places={day.placesToVisit}
                    duration={activity.duration}
                    placesCount={day.placesToVisit.length}
                    image="/images/holiday/holiday_list.png"
                  />
                ))}

                {day.stay &&
                  (() => {
                    const hotel = day.hotel_id
                      ? hotelDetails[day.hotel_id]
                      : null;
                    return (
                      <HotelCard
                        location={getCityName(day)}
                        checkInTime="12 PM"
                        hotelName={
                          hotel?.hotelName ||
                          day.title ||
                          `Hotel in ${getCityName(day)}`
                        }
                        rating={hotel?.rating || 3}
                        city={hotel?.city?.name || getCityName(day)}
                        checkIn="TBD"
                        checkOut="TBD"
                        roomType={selectedRoomType}
                        mealPlan={`Meal Plan: ${day.mealsIncluded.join(", ")}`}
                        roomInclusion={
                          day.mealsIncluded.length > 0
                            ? `Includes: ${day.mealsIncluded.join(", ")}`
                            : "No meals included"
                        }
                        image={
                          hotel?.hotelImages?.[0]?.path ||
                          "/images/holiday/holiday_list.png"
                        }
                        hotelId={day.hotel_id}
                        packageId={packageData?._id}
                        onHotelChange={onHotelChange}
                        onRoomTypeChange={onRoomTypeChange}
                      />
                    );
                  })()}

                <div className="px-6">
                  <EndOfDayCard />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
