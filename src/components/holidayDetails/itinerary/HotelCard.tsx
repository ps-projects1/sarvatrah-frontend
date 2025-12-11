
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, X } from "lucide-react";
import type { HotelOption } from "@/types/holiday";
import { holidayService } from "@/lib/services/holidayService";

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
  hotelId?: string;
  packageId?: string;
  onHotelChange?: (hotelId: string) => void;
  onRoomTypeChange?: (roomType: string) => void;
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
  hotelId,
  packageId,
  onHotelChange,
  onRoomTypeChange,
}: HotelCardProps) => {
  const [showHotelOptions, setShowHotelOptions] = useState(false);
  const [hotelOptions, setHotelOptions] = useState<HotelOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState<string | null>(hotelId || null);
  const [showRoomTypeDropdown, setShowRoomTypeDropdown] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<string>(roomType);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentHotelId(hotelId || null);
  }, [hotelId]);

  // Find the currently selected hotel
  const currentHotel = hotelOptions.find(h => h._id === currentHotelId);

  const handleRoomTypeSelect = (roomType: string) => {
    setSelectedRoomType(roomType);
    setShowRoomTypeDropdown(false);
    if (onRoomTypeChange) {
      onRoomTypeChange(roomType);
    }
  };

  const [fetchError, setFetchError] = React.useState<string | null>(null);

  // Fetch hotel options from backend
  const fetchHotelOptions = async () => {
    if (!packageId) {
      setFetchError("Unable to load hotel options");
      return;
    }

    setLoading(true);
    setFetchError(null);
    try {
      const data = await holidayService.getHotelOptions(packageId);
      setHotelOptions(data || []);
      setFetchError(null);
    } catch (error: any) {
      if (error?.status === 500) {
        setFetchError("Server error occurred. Please try again later.");
      } else if (error?.status === 404) {
        setFetchError("Hotel options not available for this package yet.");
      } else {
        setFetchError("Unable to load hotel options. Please try again.");
      }
      setHotelOptions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hotel options when dropdown is opened
  useEffect(() => {
    if (showHotelOptions && hotelOptions.length === 0) {
      fetchHotelOptions();
    }
  }, [showHotelOptions]);

  const handleHotelSelect = (hotelId: string) => {
    setCurrentHotelId(hotelId);
    setShowHotelOptions(false);
    if (onHotelChange) {
      onHotelChange(hotelId);
    }
  };

  // Get available room types from current hotel
  const availableRoomTypes = currentHotel?.rooms?.map(room => room.roomType) || ['standard', 'deluxe', 'super deluxe'];

  return (
    <div className="bg-white mb-3 border-b border-[#EBEBEB]">

      <div className="flex items-center justify-between px-6 py-3">
        <p className="text-sm text-clr font-roboto">
          Check-in to{" "}
          <strong className="text-clr font-roboto">Hotel in {location}</strong>{" "}
          @ <strong className="text-clr font-roboto">{checkInTime}</strong>
        </p>
        <button
          onClick={() => setShowHotelOptions(!showHotelOptions)}
          className="text-[#2789FF] font-roboto text-sm font-semibold hover:underline"
        >
          CHANGE
        </button>
      </div>


      <div className="p-6">
        <div className="flex items-start gap-6">

          <div className="w-44 h-28 rounded-lg overflow-hidden shrink-0">
            <Image
              src={currentHotel?.imgs?.[0]?.path ? `${process.env.NEXT_PUBLIC_BASE_URL}${currentHotel.imgs[0].path}` : image}
              alt={currentHotel?.hotelName || hotelName}
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
                <h4 className="font-semibold font-roboto text-clr mb-1">
                  {currentHotel?.hotelName || hotelName}
                </h4>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < rating
                          ? "text-orange-400 font-roboto"
                          : "text-gray-300 font-roboto"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-clr font-roboto text-sm">{currentHotel?.city || city}</p>
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
            <h5 className="font-semibold text-clr font-roboto capitalize">{selectedRoomType}</h5>
            <button
              onClick={() => setShowRoomTypeDropdown(!showRoomTypeDropdown)}
              className="text-[#2789FF] font-roboto text-sm font-semibold hover:underline"
            >
              CHANGE ROOM
            </button>
          </div>

          {/* Room Type Dropdown */}
          {showRoomTypeDropdown && (
            <div className="mt-3 p-2 bg-white rounded-lg border border-gray-200">
              {availableRoomTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleRoomTypeSelect(type)}
                  className={`w-full p-3 hover:bg-gray-50 rounded-lg text-left transition-colors mb-2 last:mb-0 ${
                    selectedRoomType === type ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900 capitalize">{type}</p>
                  {selectedRoomType === type && (
                    <p className="text-xs text-blue-600 mt-1">Currently Selected</p>
                  )}
                </button>
              ))}
            </div>
          )}

          <p className="text-sm text-clr mb-1 font-roboto mt-2">{mealPlan}</p>
          <p className="text-sm text-clr font-roboto">
            <span className="font-medium text-clr font-roboto">
              Room Inclusion:
            </span>{" "}
            {roomInclusion}
          </p>
        </div>
      </div>

      {/* Hotel Options Modal - Similar to Vehicle Change */}
      {showHotelOptions && (
        <div className="px-6 pb-6 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-base sm:text-lg font-roboto font-semibold">
              Select Hotel
            </h4>
            <button
              onClick={() => setShowHotelOptions(false)}
              className="text-[#3591FF] hover:text-blue-600"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mb-2" />
              <p className="text-gray-500">Loading hotel options...</p>
            </div>
          ) : hotelOptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotelOptions.map((hotel) => {
                const isSelected = hotel._id === currentHotelId;
                const lowestRoomPrice = hotel.rooms.length > 0 ? Math.min(...hotel.rooms.map(r => r.totalPrice)) : 0;

                return (
                  <div
                    key={hotel._id}
                    className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleHotelSelect(hotel._id)}
                  >
                    {hotel.imgs && hotel.imgs.length > 0 && (
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-100">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${hotel.imgs[0].path}`}
                          alt={hotel.hotelName}
                          width={300}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h5 className="font-semibold font-roboto mb-1 text-sm sm:text-base">
                      {hotel.hotelName}
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">{hotel.city}, {hotel.state}</p>
                    {hotel.rooms.length > 0 && (
                      <p className="text-center font-bold text-blue-600 mb-2">
                        From ₹{lowestRoomPrice.toLocaleString("en-IN")}
                      </p>
                    )}
                    <div className="flex justify-center">
                      {isSelected ? (
                        <span className="w-full text-center bg-blue-500 text-white rounded-full py-2 font-medium text-sm">
                          Selected
                        </span>
                      ) : (
                        <button className="w-full bg-white text-blue-500 border border-blue-500 rounded-full py-2 hover:bg-blue-50 transition-colors font-medium text-sm">
                          Select Hotel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : fetchError ? (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <svg className="w-16 h-16 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-600 font-roboto font-medium mb-1">Failed to load hotel options</p>
                <p className="text-red-500 font-roboto text-sm mb-4">{fetchError}</p>
                <button
                  onClick={fetchHotelOptions}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-600 font-roboto font-medium mb-1">No hotels available for this location</p>
                <p className="text-gray-500 font-roboto text-sm">There are currently no alternative hotels available in this area.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelCard;
