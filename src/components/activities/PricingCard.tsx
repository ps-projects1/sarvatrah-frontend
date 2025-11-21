"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Link from "next/link";

interface PricingCardProps {
  activity: any;
}

const ImprovedPricingCard = ({ activity }: PricingCardProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);

  // Traveler counts
  const [numAdults, setNumAdults] = useState(1);
  const [numSeniors, setNumSeniors] = useState(0);
  const [numChildren, setNumChildren] = useState(0);

  // Use pricePerPerson from new API structure
  const lowestPrice = activity.pricePerPerson || activity.price || 0;

  const originalPrice = lowestPrice * 1.67;
  const discount = 40;

  const getTotalTravelers = () => {
    return numAdults + numSeniors + numChildren;
  };

  const calculateTotalPrice = () => {
    return lowestPrice * getTotalTravelers();
  };

  const bookingUrl = `/activity-booking/${
    activity._id
  }?date=${selectedDate?.toISOString()}&adults=${numAdults}&seniors=${numSeniors}&children=${numChildren}`;

  console.log("sending activity booking id as ", activity._id);

  const isBookingDisabled = !selectedDate;
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Price Display */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">From</span>
              <span className="text-3xl font-bold text-gray-900">
                ₹{lowestPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">per person</p>
          </div>
          <div className="bg-red-600 text-white px-3 py-1 rounded font-roboto text-sm font-semibold">
            {discount}% OFF
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
            <PopoverTrigger asChild>
              <div className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Date</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedDate
                          ? format(selectedDate, "EEE, MMM dd")
                          : "Select date"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarUI
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setIsDateOpen(false);
                }}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travelers Selection */}
        <div className="mb-4">
          <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
            <PopoverTrigger asChild>
              <div className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Travelers</span>
                      <span className="text-sm font-medium text-gray-900">
                        {getTotalTravelers()}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Select up to 15 travelers in total.
                </div>

                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Adult (Age 18-35)
                    </div>
                    <div className="text-xs text-gray-500">
                      Minimum: 1, Maximum: 15
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNumAdults(Math.max(1, numAdults - 1))}
                      disabled={numAdults <= 1}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {numAdults}
                    </span>
                    <button
                      onClick={() =>
                        setNumAdults(
                          Math.min(15 - numSeniors - numChildren, numAdults + 1)
                        )
                      }
                      disabled={getTotalTravelers() >= 15}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Seniors */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Senior (Age 45-55)
                    </div>
                    <div className="text-xs text-gray-500">
                      Minimum: 0, Maximum: 15
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNumSeniors(Math.max(0, numSeniors - 1))}
                      disabled={numSeniors <= 0}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {numSeniors}
                    </span>
                    <button
                      onClick={() =>
                        setNumSeniors(
                          Math.min(15 - numAdults - numChildren, numSeniors + 1)
                        )
                      }
                      disabled={getTotalTravelers() >= 15}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Child (Age 12-15)
                    </div>
                    <div className="text-xs text-gray-500">
                      Minimum: 0, Maximum: 15
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setNumChildren(Math.max(0, numChildren - 1))
                      }
                      disabled={numChildren <= 0}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {numChildren}
                    </span>
                    <button
                      onClick={() =>
                        setNumChildren(
                          Math.min(15 - numAdults - numSeniors, numChildren + 1)
                        )
                      }
                      disabled={getTotalTravelers() >= 15}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <button
                    onClick={() => setIsTravelersOpen(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  *Maximum discount rates shown may vary by date.
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Start Time Selection */}
        {/* <div className="mb-6">
          <div className="border border-gray-300 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500 mb-1">Start time</span>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="text-sm font-medium text-gray-900 bg-transparent outline-none cursor-pointer"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div> */}

        {/* Check Availability Button */}
        <Link
          href={isBookingDisabled ? "#" : bookingUrl}
          className={`w-full py-3 font-roboto rounded-lg transition-colors mb-4 flex items-center justify-center text-white font-semibold ${
            isBookingDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
          onClick={(e) => {
            if (isBookingDisabled) {
              e.preventDefault();
              alert("Please select a date before booking");
            }
          }}
        >
          Book Now
        </Link>

        {/* Cancellation Info */}
        {activity?.cancellationPolicy && (
          <div className={`border rounded-lg p-3 flex items-start gap-2 ${
            activity.cancellationPolicy.isRefundable
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              activity.cancellationPolicy.isRefundable
                ? 'bg-green-600'
                : 'bg-red-600'
            }`}>
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {activity.cancellationPolicy.isRefundable ? (
                  <path d="M5 13l4 4L19 7"></path>
                ) : (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                )}
              </svg>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-900">
                {activity.cancellationPolicy.isRefundable
                  ? `${activity.cancellationPolicy.refundPercentage}% Refundable`
                  : 'Non-refundable'}
              </span>
              <span className="text-gray-700">
                {" "}
                {activity.cancellationPolicy.policyDescription ||
                  (activity.cancellationPolicy.cancellationWindowHours
                    ? `if canceled ${activity.cancellationPolicy.cancellationWindowHours} hours before the start`
                    : '')}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImprovedPricingCard;
