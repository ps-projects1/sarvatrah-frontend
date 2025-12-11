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
  instantConfirmation?: boolean;
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
  instantConfirmation = true,
}: ActivityCardSectionProps) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/activities/${id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-[#E6E6E6] overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] p-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/logo.svg";
              }}
            />

            {/* Duration Badge */}
            {badge && (
              <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1.5 shadow-md">
                <span className="text-[#EE0405] text-sm font-semibold">
                  {badge}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Activity Name */}
          <h3 className="text-[#1F2937] text-lg font-semibold line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">
              {locationFrom} to {locationTo}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              Duration <span className="font-semibold text-[#1F2937]">{duration}</span>
            </span>
          </div>

          {/* Start Location */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>
              Start Location <span className="font-semibold text-[#1F2937]">{startLocation}</span>
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E6E6E6]">
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Starting from</p>
              <p className="text-[#EE0405] text-xl font-bold">
                {formatPrice(currentPrice)}
                <span className="text-sm font-normal text-[#6B7280]"> Per Person</span>
              </p>
            </div>
            <button className="bg-[#2789FF] hover:bg-[#1a73e8] text-white rounded-full p-3 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCardSection;
