import React from "react";
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

  const getCityName = (city: any): string => {
    if (!city) return 'Unknown';
    if (typeof city === 'string') return city;
    if (typeof city === 'object' && city.name) return city.name;
    return 'Unknown';
  };

  return (
    <div className=" w-full">
      <div className="mx-auto ">
        <div className="flex flex-col ">
          <DateSection totalDays={itineraryData.length} />

          {itineraryData.map((day) => (
            <div key={day.dayNo} className="mb-6">
              <DayHeader
                day={day.dayNo}
                location={getCityName(day.city)}
                hotels={day.stay ? 1 : 0}
                activities={day.activities.length}
                transfers={day.transport && day.dayNo === 1 ? 1 : 0}
              />

              <div className="bg-white rounded-b-lg overflow-hidden">
                {day.transport && day.dayNo === 1 && (
                  <TransferCard
                    from="Start Point"
                    to={getCityName(day.city) || "Destination"}
                    vehicleType={day.transport.type}
                    facilities={day.transport.details}
                    image="/images/holiday/holiday_list.png"
                  />
                )}

                {day.activities.map((activity, index) => (
                  <ActivityCard
                    key={`${day.dayNo}-activity-${index}-${activity.title}`}
                    title={activity.title}
                    location={`${getCityName(day.city)}, India`}
                    places={day.placesToVisit}
                    duration={activity.duration}
                    placesCount={day.placesToVisit.length}
                    image="/images/holiday/holiday_list.png"
                  />
                ))}

                {day.stay && (
                  <HotelCard
                    location={getCityName(day.city)}
                    checkInTime="12 PM"
                    hotelName={`Hotel in ${getCityName(day.city)}`}
                    rating={3}
                    city={getCityName(day.city)}
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
