// DayHeader.tsx
import React from "react";
import { Hotel, Navigation, Bus } from "lucide-react";

interface DayHeaderProps {
  day: number;
  location: string;
  hotels: number;
  activities: number;
  transfers: number;
}

const DayHeader = ({
  day,
  location,
  hotels,
  activities,
  transfers,
}: DayHeaderProps) => {
  return (
    <div className="">
      <div className="bg-[#FAFAFA]  sm:pr-6 sm:pl-0 py-3 sm:py-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-b">
        <div className="relative inline-block w-full sm:w-auto">
          <div className="bg-[#1E2125] text-white px-4 sm:px-6 py-2 sm:py-3">
            <h3 className="font-roboto font-semibold text-sm sm:text-base">
              Day {day} - {location}
            </h3>
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 
                  border-l-8 border-l-transparent 
                  border-r-8 border-r-transparent 
                  border-t-8 border-t-[#1E2125]"
          ></div>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-5 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Hotel size={18} className="text-gray-600" />
            <span className="text-xs sm:text-sm text-gray-700">
              {hotels} Hotel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation size={18} className="text-gray-600" />
            <span className="text-xs sm:text-sm text-gray-700">
              {activities} Activities
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bus size={18} className="text-gray-600" />
            <span className="text-xs sm:text-sm text-gray-700">
              {transfers} Transfers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayHeader;
