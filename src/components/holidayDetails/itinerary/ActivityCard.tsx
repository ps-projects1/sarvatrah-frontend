import React from "react";
import Image from "next/image";

interface ActivityCardProps {
  title: string;
  location: string;
  places: string[];
  duration: string;
  placesCount: number;
  image: string;
}

const ActivityCard = ({
  title,
  location,
  places,
  duration,
  placesCount,
  image,
}: ActivityCardProps) => {
  return (
    <div className="bg-white p-6 mb-3 border-b border-[#EBEBEB]">
      <div className="flex items-start gap-6">
        <div className="w-44 h-28 rounded-lg overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            width={176}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-clr font-roboto mb-1">
                {title}
              </h4>
              <p className="text-clr font-roboto text-sm mb-2">{location}</p>
            </div>
            <button className="text-[#2789FF] font-roboto text-sm font-semibold hover:underline">
              CHANGE
            </button>
          </div>

          <div className="mb-3">
            {places.map((place, index) => (
              <p key={index} className="text-sm font-roboto text-red-600 mb-1">
                • {place}
              </p>
            ))}
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="text-clr font-roboto mb-1">Duration</p>
              <p className="font-medium text-clr font-roboto">{duration}</p>
            </div>
            <div>
              <p className="text-clr font-roboto mb-1">Places Covers</p>
              <p className="font-medium text-clr font-roboto">{placesCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
