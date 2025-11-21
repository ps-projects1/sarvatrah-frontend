"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActivityFirstSectionProps {
  initialSearch?: string;
}

const ActivityFirstSection: React.FC<ActivityFirstSectionProps> = ({ initialSearch = "" }) => {
  const [location, setLocation] = useState(initialSearch);
  const router = useRouter();

  useEffect(() => {
    if (initialSearch) {
      setLocation(initialSearch);
    }
  }, [initialSearch]);

  const handleSearch = () => {
    if (location.trim()) {
      router.push(`/activities?search=${encodeURIComponent(location.trim())}`);
    } else {
      router.push('/activities');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
      <Image
        src="/images/activities/activity.jpg"
        fill
        alt="background image"
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="max-w-7xl z-10 relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full">
        <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-roboto font-light">
            Unwrap Your Dream Getaway
          </h2>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-roboto font-bold text-white leading-tight">
            Activity Packages Await!
          </h1>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center overflow-hidden">
            <div className="flex-1 flex items-center px-4 sm:px-5 md:px-6 py-4 sm:py-3 md:py-4 gap-2 sm:gap-3 border-b sm:border-b-0 sm:border-r border-gray-200">
              <MapPin className="text-gray-400 shrink-0 w-5 h-5 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Location"
                className="w-full text-gray-700 text-sm sm:text-base md:text-lg focus:outline-none placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base"
              />
              <ChevronDown className="text-gray-600 shrink-0 cursor-pointer hover:text-gray-800 transition-colors w-5 h-5 sm:w-5 sm:h-5" />
            </div>

            <div className="p-2 sm:p-0">
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 font-medium sm:font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto rounded-xl sm:rounded-full sm:rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:focus:ring-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFirstSection;
