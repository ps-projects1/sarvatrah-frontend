import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";

interface PackageDuration {
  days: number;
  nights: number;
}

interface ThemeImg {
  filename: string;
  path: string;
  mimetype: string;
}

interface DestinationCity {
  _id: string;
  name: string;
}

interface HolidayPackage {
  _id: string;
  packageDuration: PackageDuration;
  packageName: string;
  themeImg: ThemeImg;
  packageType: string;
  destinationCity: (string | DestinationCity)[];
  startCity: string;
  vehiclePrices: Array<{
    vehicle_id: string;
    vehicleType: string;
    price: number;
  }>;
  availableVehicle: Array<{
    vehicleType: string;
    price: number;
    seatLimit: number;
    vehicle_id: string;
    brandName: string;
    modelName: string;
  }>;
}

interface HolidayCardProps {
  package: HolidayPackage;
}

const HolidayCard: React.FC<HolidayCardProps> = ({ package: pkg }) => {
  const getPackagePrice = (): number => {
    // First try vehiclePrices, then fallback to availableVehicle
    const vehiclePrice = pkg.vehiclePrices?.[0]?.price;
    const availablePrice = pkg.availableVehicle?.[0]?.price;
    return vehiclePrice || availablePrice || 0;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDestinationName = (): string => {
    const firstCity = pkg.destinationCity[0];
    return typeof firstCity === "string" ? firstCity : firstCity?.name || "";
  };

  return (
    <Link href={`/holiday/${pkg._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-[#E6E6E6] overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] p-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {pkg.themeImg ? (
              <Image
                src={pkg.themeImg.path}
                alt={pkg.packageName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F1F7FF] to-[#E6F0FF]">
                <svg
                  className="w-12 h-12 text-[#2789FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1.5 shadow-md">
              <span className="text-[#EE0405] text-sm font-semibold">
                {pkg.packageDuration.days}D - {pkg.packageDuration.nights}N
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Activity Name */}
          <h3 className="text-[#1F2937] text-lg font-semibold line-clamp-2 min-h-[3.5rem]">
            {pkg.packageName}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{getDestinationName()}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              Duration <span className="font-semibold text-[#1F2937]">05:00 Hours</span>
            </span>
          </div>

          {/* Start Location */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>
              Start Location <span className="font-semibold text-[#1F2937]">{pkg.startCity}</span>
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E6E6E6]">
            <div>
              <p className="text-xs text-[#6B7280] mb-1">Starting from</p>
              <p className="text-[#EE0405] text-xl font-bold">
                {formatPrice(getPackagePrice())}
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

export default HolidayCard;
