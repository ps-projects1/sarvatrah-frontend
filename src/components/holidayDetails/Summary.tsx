"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  MapPin,
  Car,
  Building2,
  Utensils,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { HolidayPackage } from "@/types/holiday";

interface SummaryProps {
  packageData: HolidayPackage;
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

  return (
    <div className="w-full space-y-6 pb-4">
      {/* Day-wise Itinerary Breakdown */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Day Wise Itinerary</h2>
          <p className="text-sm text-blue-100 mt-1">Complete breakdown of your {packageData.packageDuration.days} days journey</p>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {packageData.itinerary.map((day) => {
            const isExpanded = expandedSections.has(`day-${day.dayNo}`);

            return (
              <div key={day.dayNo} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                {/* Day Header - Always Visible */}
                <div
                  className="bg-linear-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-4 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-colors"
                  onClick={() => toggleSection(`day-${day.dayNo}`)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">
                          {day.dayNo}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">
                            {day.title}
                          </h3>
                          {day.subtitle && (
                            <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">{day.subtitle}</p>
                          )}
                        </div>
                      </div>

                      {/* Quick Info Tags */}
                      <div className="flex flex-wrap gap-2 ml-11">
                        {day.city && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                            <MapPin className="w-3 h-3" />
                            {day.city}
                          </span>
                        )}
                        {day.mealsIncluded && day.mealsIncluded.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
                            <Utensils className="w-3 h-3" />
                            {day.mealsIncluded.join(", ")}
                          </span>
                        )}
                        {day.stay && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
                            <Building2 className="w-3 h-3" />
                            Hotel Stay
                          </span>
                        )}
                        {day.activities && day.activities.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-medium text-orange-700">
                            <Check className="w-3 h-3" />
                            {day.activities.length} {day.activities.length === 1 ? "Activity" : "Activities"}
                          </span>
                        )}
                      </div>
                    </div>

                    <button className="shrink-0 p-2 hover:bg-gray-200 rounded-full transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Day Details - Expandable */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 py-5 bg-white border-t border-gray-200">
                    <div className="space-y-5">
                      {/* Day Description */}
                      {day.description && (
                        <div className="prose prose-sm max-w-none">
                          <p className="text-sm text-gray-700 leading-relaxed">{day.description}</p>
                        </div>
                      )}

                      {/* Transport Details */}
                      {day.transport && (day.transport.type || day.transport.details) && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                              <Car className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-blue-900 mb-1">Transportation</h4>
                              <p className="text-sm text-blue-800">
                                {day.transport.type && <span className="font-medium">{day.transport.type}</span>}
                                {day.transport.type && day.transport.details && " - "}
                                {day.transport.details}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Places to Visit */}
                      {day.placesToVisit && day.placesToVisit.length > 0 && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                              <MapPin className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-purple-900 mb-2">Places to Visit</h4>
                              <div className="flex flex-wrap gap-2">
                                {day.placesToVisit.map((place, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-3 py-1.5 bg-white border border-purple-300 rounded-full text-xs font-medium text-purple-800"
                                  >
                                    {place}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Activities */}
                      {day.activities && day.activities.length > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                              <Check className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-orange-900 mb-3">Activities & Experiences</h4>
                              <div className="space-y-3">
                                {day.activities.map((activity, idx) => (
                                  <div key={idx} className="bg-white rounded-lg p-3 border border-orange-200">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                      <h5 className="text-sm font-semibold text-gray-900 flex-1">{activity.title}</h5>
                                      {activity.duration && (
                                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full shrink-0">
                                          {activity.duration}
                                        </span>
                                      )}
                                    </div>
                                    {activity.description && (
                                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{activity.description}</p>
                                    )}
                                    {activity.type && (
                                      <span className="inline-block mt-2 text-xs text-orange-600 font-medium capitalize">
                                        {activity.type}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hotel Stay Info */}
                      {day.stay && day.city && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-lg shrink-0">
                              <Building2 className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-green-900 mb-1">Accommodation</h4>
                              <p className="text-sm text-green-800">
                                Overnight stay at hotel in <span className="font-semibold">{day.city}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Additional Notes */}
                      {day.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-yellow-600 shrink-0">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-yellow-900 mb-1">Important Notes</h4>
                              <p className="text-sm text-yellow-800">{day.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
              What&apos;s Included
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
              What&apos;s Not Included
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
