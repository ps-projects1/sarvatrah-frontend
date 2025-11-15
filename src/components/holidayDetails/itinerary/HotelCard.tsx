// HotelCard.tsx
import React from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

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
}: HotelCardProps) => {
  return (
    <div className="bg-white mb-3 border-b border-[#EBEBEB]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 ">
        <p className="text-sm text-clr font-roboto">
          Check-in to{" "}
          <strong className="text-clr font-roboto">Hotel in {location}</strong>{" "}
          @ <strong className="text-clr font-roboto">{checkInTime}</strong>
        </p>
        <button className="text-[#2789FF] font-roboto text-sm font-semibold hover:underline">
          CHANGE
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Image */}
          <div className="w-44 h-28 rounded-lg overflow-hidden shrink-0">
            <Image
              src={image}
              alt={hotelName}
              width={176}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              <span className="bg-red-500 text-white font-roboto text-xs px-2 py-1 rounded font-medium">
                Hotel
              </span>
              <div className="flex-1">
                <h4 className="font-semibold font-roboto text-clr  mb-1">
                  {hotelName}
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
                <p className="text-clr font-roboto text-sm">{city}</p>
              </div>
            </div>

            {/* Check-in dates */}
            <div className="flex items-center gap-2 text-sm text-clr font-roboto mb-4">
              <Calendar size={16} />
              <span>
                {checkIn} - {checkOut}
              </span>
            </div>
          </div>
        </div>

        {/* Room details */}
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
