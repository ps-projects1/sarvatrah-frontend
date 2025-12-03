
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Calendar, ChevronDown, Search, X } from "lucide-react";

interface Hotel {
  _id?: string;
  name: string;
  city: string;
  state?: string;
  rating?: number;
  image?: string;
  address?: string;
}

interface HotelCardProps {
  location: string;
  checkInTime: string;
  hotelName: string;
  rating: number;
  city: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  mealPlan: string;
  roomInclusion: string;
  image: string;
  onHotelChange?: (hotel: Hotel) => void;
}

const HotelCard = ({
  location,
  checkInTime,
  hotelName,
  rating,
  city,
  checkIn,
  checkOut,
  roomType,
  mealPlan,
  roomInclusion,
  image,
  onHotelChange,
}: HotelCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel>({
    name: hotelName,
    city: city,
    rating: rating,
    image: image,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);


  const searchHotels = async (query: string) => {
    if (!query || query.length < 2) {
      setHotels([]);
      return;
    }

    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        query: query,
        type: "hotels",
        page: "1",
        limit: "10",
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?${searchParams.toString()}`
      );

      if (response.ok) {
        const data = await response.json();
        setHotels(data.results?.hotels || []);
      }
    } catch (error) {
      console.error("Error searching hotels:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      if (showDropdown && searchQuery) {
        searchHotels(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, showDropdown]);

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowDropdown(false);
    setSearchQuery("");
    if (onHotelChange) {
      onHotelChange(hotel);
    }
  };

  return (
    <div className="bg-white mb-3 border-b border-[#EBEBEB]">
      
      <div className="flex items-center justify-between px-6 py-3 ">
        <p className="text-sm text-clr font-roboto">
          Check-in to{" "}
          <strong className="text-clr font-roboto">Hotel in {location}</strong>{" "}
          @ <strong className="text-clr font-roboto">{checkInTime}</strong>
        </p>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-[#2789FF] font-roboto text-sm font-semibold hover:underline flex items-center gap-1"
          >
            CHANGE
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
          </button>

          
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search hotels in this city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              
              <div className="max-h-64 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    Searching hotels...
                  </div>
                ) : hotels.length > 0 ? (
                  <div className="p-2">
                    {hotels.map((hotel, index) => (
                      <button
                        key={hotel._id || index}
                        onClick={() => handleHotelSelect(hotel)}
                        className="w-full p-3 hover:bg-gray-50 rounded-lg text-left transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {hotel.image && (
                            <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-gray-200">
                              <Image
                                src={hotel.image}
                                alt={hotel.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {hotel.name}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {hotel.city}{hotel.state && `, ${hotel.state}`}
                            </p>
                            {hotel.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-xs ${
                                      i < (hotel.rating || 0)
                                        ? "text-orange-400"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No hotels found. Try a different search.
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    Start typing to search hotels...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="p-6">
        <div className="flex items-start gap-6">
          
          <div className="w-44 h-28 rounded-lg overflow-hidden shrink-0">
            <Image
              src={selectedHotel.image || image}
              alt={selectedHotel.name}
              width={176}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              <span className="bg-red-500 text-white font-roboto text-xs px-2 py-1 rounded font-medium">
                Hotel
              </span>
              <div className="flex-1">
                <h4 className="font-semibold font-roboto text-clr  mb-1">
                  {selectedHotel.name}
                </h4>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < (selectedHotel.rating || rating)
                          ? "text-orange-400 font-roboto"
                          : "text-gray-300 font-roboto"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-clr font-roboto text-sm">{selectedHotel.city}</p>
              </div>
            </div>

            
            <div className="flex items-center gap-2 text-sm text-clr font-roboto mb-4">
              <Calendar size={16} />
              <span>
                {checkIn} - {checkOut}
              </span>
            </div>
          </div>
        </div>

        
        <div className="bg-[#F1F4F8] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-semibold text-clr font-roboto">{roomType}</h5>
            <button className="text-[#2789FF] font-roboto text-sm font-semibold hover:underline">
              CHANGE ROOM
            </button>
          </div>
          <p className="text-sm text-clr mb-1 font-roboto">{mealPlan}</p>
          <p className="text-sm text-clr font-roboto">
            <span className="font-medium text-clr font-roboto">
              Room Inclusion:
            </span>{" "}
            {roomInclusion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
