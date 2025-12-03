"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Search,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const SearchSection = () => {
  const [startingFrom, setStartingFrom] = useState("New Delhi");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const getTotalGuests = () => {
    const parts = [];
    if (numAdults > 0)
      parts.push(`${numAdults} ${numAdults === 1 ? "Adult" : "Adults"}`);
    if (numChildren > 0)
      parts.push(`${numChildren} ${numChildren === 1 ? "Child" : "Children"}`);
    return parts.join(", ") || "Select guests";
  };

  return (
    <div className="w-full relative">
      <div className="relative">
        <Image
          src="/images/holidayDetails/searchsectionbg.png"
          width={1000}
          height={50}
          className="w-full h-[300px] sm:h-[350px] lg:h-auto object-cover"
          alt="bg"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl lg:rounded-full shadow-lg px-4 sm:px-6 py-4 lg:py-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 max-w-4xl w-full">
            <div className="flex items-center gap-3 flex-1 lg:border-r border-gray-200 lg:pr-4 pb-3 lg:pb-0 border-b lg:border-b-0">
              <MapPin className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-xs text-gray-500">
                  Starting From
                </label>
                <input
                  type="text"
                  placeholder={startingFrom}
                  onChange={(e) => setStartingFrom(e.target.value)}
                  className="text-xs sm:text-sm font-medium text-gray-900 bg-transparent outline-none w-full"
                />
              </div>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-3 flex-1 lg:border-r border-gray-200 lg:pr-4 pb-3 lg:pb-0 border-b lg:border-b-0 cursor-pointer">
                  <CalendarIcon className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <div className="flex flex-col flex-1">
                    <label className="text-[10px] sm:text-xs text-gray-500">
                      Travelling On
                    </label>
                    <div className="text-xs sm:text-sm font-medium text-gray-900 flex items-center justify-between">
                      <span className="truncate">
                        {date
                          ? format(date, "EEE, dd MMM yyyy")
                          : "Select date"}
                      </span>
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 ml-2 shrink-0" />
                    </div>
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>

            <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-3 flex-1 lg:pr-4 pb-3 lg:pb-0 border-b lg:border-b-0 cursor-pointer">
                  <Users className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <div className="flex flex-col flex-1">
                    <label className="text-[10px] sm:text-xs text-gray-500">
                      Room & Guests
                    </label>
                    <div className="text-xs sm:text-sm font-medium text-gray-900 flex items-center justify-between">
                      <span className="truncate">{getTotalGuests()}</span>
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 ml-2 shrink-0" />
                    </div>
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4" align="start">
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Adults
                      </div>
                      <div className="text-xs text-gray-500">Age 13+</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setNumAdults(Math.max(1, numAdults - 1))}
                        disabled={numAdults <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {numAdults}
                      </span>
                      <button
                        onClick={() => setNumAdults(Math.min(9, numAdults + 1))}
                        disabled={numAdults >= 9}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Children
                      </div>
                      <div className="text-xs text-gray-500">Age 2-12</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setNumChildren(Math.max(0, numChildren - 1))
                        }
                        disabled={numChildren <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {numChildren}
                      </span>
                      <button
                        onClick={() =>
                          setNumChildren(Math.min(9, numChildren + 1))
                        }
                        disabled={numChildren >= 9}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <button
                      onClick={() => setIsGuestsOpen(false)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm font-medium transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-2 transition-colors w-full lg:w-auto">
              <Search className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
