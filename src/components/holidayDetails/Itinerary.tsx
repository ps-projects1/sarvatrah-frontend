import React, { useState } from "react";
import DateSection from "./DateSection";
import DayHeader from "./itinerary/DayHeader";
import HotelCard from "./itinerary/HotelCard";
import ActivityCard from "./itinerary/ActivityCard";
import EndOfDayCard from "./itinerary/EndOfDayCard";
import TransferCard from "./itinerary/TransferCard";

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
}

const Itinerary = ({ itineraryData }: ItineraryProps) => {
  return (
    <div className=" w-full">
      <div className="mx-auto ">
        <div className="flex flex-col ">
          <DateSection totalDays={itineraryData.length} />

          {itineraryData.map((day) => (
            <div key={day.dayNo} className="mb-6">
              <DayHeader
                day={day.dayNo}
                location={day.city || "Unknown"}
                hotels={day.stay ? 1 : 0}
                activities={day.activities.length}
                transfers={day.transport && day.dayNo === 1 ? 1 : 0}
              />

              <div className="bg-white rounded-b-lg overflow-hidden">
                {day.transport && day.dayNo === 1 && (
                  <TransferCard
                    from="Start Point"
                    to={day.city || "Destination"}
                    vehicleType={day.transport.type}
                    facilities={day.transport.details}
                    image="/images/holiday/holiday_list.png"
                  />
                )}

                {day.activities.map((activity, index) => (
                  <ActivityCard
                    key={index}
                    title={activity.title}
                    location={`${day.city}, India`}
                    places={day.placesToVisit}
                    duration={activity.duration}
                    placesCount={day.placesToVisit.length}
                    image="/images/holiday/holiday_list.png"
                  />
                ))}

                {day.stay && (
                  <HotelCard
                    location={day.city || "Unknown"}
                    checkInTime="12 PM"
                    hotelName={`Hotel in ${day.city}`}
                    rating={3}
                    city={day.city || "Unknown"}
                    checkIn="TBD"
                    checkOut="TBD"
                    roomType="Standard"
                    mealPlan={`Meal Plan: ${day.mealsIncluded.join(", ")}`}
                    roomInclusion={
                      day.mealsIncluded.length > 0
                        ? `Includes: ${day.mealsIncluded.join(", ")}`
                        : "No meals included"
                    }
                    image="/images/holiday/holiday_list.png"
                  />
                )}

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
