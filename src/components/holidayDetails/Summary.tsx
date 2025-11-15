"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  MapPin,
  Plane,
  Car,
  Building2,
  Utensils,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SummaryProps {
  packageData: {
    packageName: string;
    packageDuration: {
      days: number;
      nights: number;
    };
    destinationCity: string[];
    startCity: string;
    packageType: string;
    selectType: string;
    highlights: string;
    include: string;
    exclude: string;
    roomLimit: number;
    partialPayment: boolean;
    partialPaymentPercentage: number;
    partialPaymentDueDays: number;
    cancellationPolicyType: string;
    refundablePercentage: number;
    refundableDays: number;
    vehiclePrices: Array<{
      vehicle_id: string;
      vehicleType: string;
      price: number;
    }>;
    itinerary: Array<{
      dayNo: number;
      title: string;
      city?: string;
      mealsIncluded: string[];
      stay: boolean;
      activities: Array<{
        title: string;
        type: string;
      }>;
    }>;
  };
}

const Summary = ({ packageData }: SummaryProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const inclusions = packageData.include
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const exclusions = packageData.exclude
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const hotelStays = packageData.itinerary.reduce((acc, day) => {
    if (day.city && day.stay) {
      if (!acc[day.city]) {
        acc[day.city] = [];
      }
      acc[day.city].push(day);
    }
    return acc;
  }, {} as Record<string, typeof packageData.itinerary>);

  const formatDayDate = (dayNo: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + dayNo - 1);

    return `${months[mockDate.getMonth()]} ${mockDate.getDate()}, ${
      days[mockDate.getDay()]
    }`;
  };

  return (
    <div className="w-full space-y-6 pb-4">
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-bold text-gray-900">Itinerary Details</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Day 1 - Arrival */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center shrink-0 mt-1">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  Arrival in{" "}
                  <span className="font-semibold">
                    {packageData.destinationCity[0]}
                  </span>{" "}
                  - {packageData.startCity} Airport
                  {packageData.itinerary[0]?.activities.length > 0 && (
                    <>
                      {" | "}
                      <span className="font-semibold">
                        Departing on {formatDayDate(1)}
                      </span>
                      {" | Includes Check In Baggage"}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center shrink-0 mt-1">
                <Car className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  Airport to hotel in {packageData.destinationCity[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Hotel Stays by City */}
          {Object.entries(hotelStays).map(([city, days]) => {
            const firstDay = days[0];
            const lastDay = days[days.length - 1];
            const nightsCount = days.length;

            return (
              <div key={city} className="space-y-4">
                {/* Hotel Header */}
                <div className="bg-linear-to-r from-orange-100 to-yellow-100 px-4 py-3 rounded-lg">
                  <h3 className="text-base font-bold text-gray-900">
                    {city} - {nightsCount} Night{nightsCount > 1 ? "s" : ""}{" "}
                    Stay
                  </h3>
                </div>

                {/* Daily Breakdown */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {days.map((day, index) => {
                    const isFirstDay = index === 0;
                    const isLastDay = index === days.length - 1;

                    return (
                      <div
                        key={day.dayNo}
                        className={`grid grid-cols-[140px_1fr] ${
                          index !== days.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        {/* Day Column */}
                        <div className="bg-gray-50 px-4 py-4 border-r border-gray-200">
                          <div className="text-sm font-bold text-gray-900">
                            Day {day.dayNo}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatDayDate(day.dayNo)}
                          </div>
                        </div>

                        {/* Details Column */}
                        <div className="px-4 py-4 space-y-3">
                          {/* Check-in info */}
                          {isFirstDay && (
                            <div className="flex items-start gap-3">
                              <Building2 className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-700">
                                Check in to{" "}
                                <span className="font-semibold">
                                  Hotel in {city}
                                </span>
                              </p>
                            </div>
                          )}

                          {/* Meals */}
                          {day.mealsIncluded &&
                            day.mealsIncluded.length > 0 && (
                              <div className="flex items-start gap-3">
                                <Utensils className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-700">
                                  Day Meals:{" "}
                                  <span className="font-semibold">
                                    {day.mealsIncluded.join(", ")}
                                  </span>{" "}
                                  : Included at Hotel in {city}
                                </p>
                              </div>
                            )}

                          {/* Activities */}
                          {day.activities && day.activities.length > 0 && (
                            <div className="ml-8 space-y-2">
                              {day.activities.map((activity, actIndex) => (
                                <div
                                  key={actIndex}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                  <p className="text-sm text-gray-700">
                                    {activity.title}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Check-out info */}
                          {isLastDay && (
                            <div className="flex items-start gap-3">
                              <Building2 className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-700">
                                Checkout from{" "}
                                <span className="font-semibold">
                                  Hotel in {city}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Departure */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center shrink-0 mt-1">
                <Car className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  Hotel in{" "}
                  {
                    packageData.destinationCity[
                      packageData.destinationCity.length - 1
                    ]
                  }{" "}
                  to Airport
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Overview */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-bold text-gray-900">Package Overview</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Package Name</p>
                <p className="text-sm font-semibold text-gray-900">
                  {packageData.packageName}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Duration</p>
                <p className="text-sm font-semibold text-gray-900">
                  {packageData.packageDuration.days} Days /{" "}
                  {packageData.packageDuration.nights} Nights
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Destinations</p>
                <p className="text-sm font-semibold text-gray-900">
                  {packageData.destinationCity.join(", ")}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Starting Point</p>
                <p className="text-sm font-semibold text-gray-900">
                  {packageData.startCity}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Package Type</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {packageData.packageType}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Travel Type</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {packageData.selectType}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Inclusions */}
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
          <div className="bg-green-50 px-4 py-3 border-b border-green-200">
            <h3 className="text-base font-semibold text-green-800 flex items-center gap-2">
              <Check className="w-5 h-5" />
              What's Included
            </h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {inclusions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Exclusions */}
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
          <div className="bg-red-50 px-4 py-3 border-b border-red-200">
            <h3 className="text-base font-semibold text-red-800 flex items-center gap-2">
              <X className="w-5 h-5" />
              What's Not Included
            </h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {exclusions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Vehicle Options */}
      {packageData.vehiclePrices.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
            <h2 className="text-lg font-bold text-gray-900">
              Transportation Options
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {packageData.vehiclePrices.map((vehicle, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {vehicle.vehicleType}
                  </span>
                  <span className="text-base font-bold text-blue-600">
                    ₹{vehicle.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment & Cancellation Policy */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-bold text-gray-900">
            Payment & Cancellation Policy
          </h2>
        </div>

        <div className="p-4 space-y-3">
          {packageData.partialPayment && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Partial Payment:</span> Pay{" "}
                {packageData.partialPaymentPercentage}% now and rest within{" "}
                {packageData.partialPaymentDueDays} days
              </p>
            </div>
          )}

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-900">
              <span className="font-semibold">Cancellation:</span>{" "}
              {packageData.cancellationPolicyType}
              {packageData.cancellationPolicyType === "refundble" && (
                <>
                  {" "}
                  - {packageData.refundablePercentage}% refund if cancelled{" "}
                  {packageData.refundableDays}+ days before
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
