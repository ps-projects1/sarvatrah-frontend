import React from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ActivityCardSectionProps {
  id: string;
  title: string;
  locationFrom: string;
  locationTo: string;
  duration: string;
  startLocation: string;
  originalPrice?: number;
  currentPrice: number;
  image: string;
  badge?: string;
}

const ActivityCardSection = ({
  id,
  title,
  locationFrom,
  locationTo,
  duration,
  startLocation,
  originalPrice,
  currentPrice,
  image,
  badge,
}: ActivityCardSectionProps) => {
  return (
    <Link href={`/activities/${id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-[600px] flex flex-col">
        {/* Fixed height image section */}
        <div className="relative h-64 w-full overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = "/logo.svg";
            }}
          />
          {/* Badge */}
          {badge && (
            <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full font-bold text-red-500">
              {badge}
            </div>
          )}
        </div>

        {/* Content Section - flex-1 to fill remaining space */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title - fixed height with line clamp */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 min-h-14">
            {title}
          </h3>

          {/* Location Route */}
          <div className="flex items-center gap-2 text-gray-700 mb-3">
            <MapPin size={18} className="shrink-0" />
            <span className="text-sm font-medium line-clamp-1">
              {locationFrom} to {locationTo}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <Clock size={18} className="shrink-0" />
            <span className="text-sm font-medium">Duration {duration}</span>
          </div>

          {/* Start Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-4 pb-4 border-b border-gray-200">
            <MapPin size={18} className="shrink-0" />
            <span className="text-sm line-clamp-1">
              Start Location {startLocation}
            </span>
          </div>

          {/* Spacer to push price to bottom */}
          <div className="flex-1"></div>

          {/* Price Section - always at bottom */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              {originalPrice && (
                <p className="text-gray-400 line-through text-sm">
                  INR {originalPrice.toLocaleString("en-IN")}
                </p>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-500">
                  INR {currentPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-gray-600 text-sm">Per Person</span>
              </div>
            </div>

            {/* Arrow Button */}
            <button className="w-10 h-10 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors shrink-0">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCardSection;
