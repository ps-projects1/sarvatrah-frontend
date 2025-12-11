"use client";

import React, { useState } from "react";
import SearchSection from "./SearchSection";
import DetailsSection from "./DetailsSection";
import { format } from "date-fns";

interface HolidayDetailsClientProps {
  params: { id: string };
}

export interface SearchParams {
  startingFrom: string;
  travelDate: Date | undefined;
  numAdults: number;
  numChildren: number;
}

const HolidayDetailsClient = ({ params }: HolidayDetailsClientProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    startingFrom: "",
    travelDate: undefined,
    numAdults: 2,
    numChildren: 0,
  });
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  const handleSearchUpdate = (newParams: SearchParams) => {
    setSearchParams(newParams);
    setShowUpdateMessage(true);

    // Hide message after 3 seconds
    setTimeout(() => {
      setShowUpdateMessage(false);
    }, 3000);
  };

  return (
    <>
      <SearchSection onSearchUpdate={handleSearchUpdate} />

      {/* Update notification banner */}
      {showUpdateMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 px-4 py-3 mx-auto max-w-7xl mt-4">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm text-green-700 font-medium">
                ✅ Pricing updated for {searchParams.numAdults} {searchParams.numAdults === 1 ? 'adult' : 'adults'}
                {searchParams.numChildren > 0 && `, ${searchParams.numChildren} ${searchParams.numChildren === 1 ? 'child' : 'children'}`}
                {searchParams.travelDate && ` • Traveling on ${format(searchParams.travelDate, 'EEE, dd MMM yyyy')}`}
              </p>
            </div>
          </div>
        </div>
      )}

      <DetailsSection params={params} searchParams={searchParams} />
    </>
  );
};

export default HolidayDetailsClient;
