"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Users, Clock, Tag, Phone } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Activity, ActivityPricing } from "@/types/activity";

interface BookingSummaryCardProps {
  activity: Activity;
  date: string | null;
  numAdults: number;
  numSeniors: number;
  numChildren: number;
}

export default function BookingSummaryCard({
  activity,
  date,
  numAdults,
  numSeniors,
  numChildren,
}: BookingSummaryCardProps) {
  // Countdown Timer (15 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTotalTravelers = () => {
    const parts = [];
    if (numSeniors > 0)
      parts.push(`${numSeniors} Senior${numSeniors > 1 ? "s" : ""}`);
    if (numAdults > 0)
      parts.push(`${numAdults} Adult${numAdults > 1 ? "s" : ""}`);
    if (numChildren > 0)
      parts.push(`${numChildren} Child${numChildren > 1 ? "ren" : ""}`);
    return parts.join(", ");
  };

  const calculateSubtotal = () => {
    const lowestPrice =
      activity?.pricing && activity.pricing.length > 0
        ? Math.min(...activity.pricing.map((p: ActivityPricing) => p.price))
        : 0;
    const totalTravelers = numAdults + numSeniors + numChildren;
    return lowestPrice * totalTravelers;
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotalPrice = () => {
    return calculateSubtotal() + calculateGST();
  };

  return (
    <div className="space-y-4">
      {/* Timer Banner */}
      <div className="bg-pink-100 border border-pink-200 rounded-lg p-3 flex items-center justify-center gap-2">
        <Clock className="w-5 h-5 text-pink-600" />
        <span className="text-sm font-medium text-gray-900">
          Holding your spot for{" "}
          <span className="font-bold">{formatTime(timeLeft)}</span> minutes
        </span>
      </div>

      {/* Main Summary Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Activity Image & Title */}
        <div className="flex gap-4">
          {activity?.images?.[0] && (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <Image
                src={activity.images[0]}
                alt={activity.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base">
              {activity?.title || "Activity Title"}
            </h3>
          </div>
        </div>

        {/* Travelers, Date, Price */}
        <div className="space-y-3 pb-6 border-b border-gray-200">
          {/* Travelers */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900 font-roboto">
              {getTotalTravelers()}
            </span>
          </div>

          {/* Date & Time */}
          {date && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-roboto">
                {format(new Date(date), "EEE, MMM dd, yyyy • h:mm a")}
              </span>
            </div>
          )}

          {/* Subtotal */}
          <div className="flex items-baseline justify-between pt-2">
            <span className="text-sm text-gray-600 font-roboto">Subtotal</span>
            <span className="text-lg font-semibold text-gray-900 font-roboto">
              ₹{Math.round(calculateSubtotal()).toLocaleString()}
            </span>
          </div>

          {/* GST (18%) */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-gray-600 font-roboto">GST (18%)</span>
            <span className="text-sm font-medium text-gray-900 font-roboto">
              ₹{Math.round(calculateGST()).toLocaleString()}
            </span>
          </div>

          {/* Total */}
          <div className="flex items-baseline justify-between pt-2 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-900 font-roboto">
              Total price
            </span>
            <span className="text-2xl font-bold text-gray-900 font-roboto">
              ₹{Math.round(calculateTotalPrice()).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Free Cancellation */}
        <div className="flex items-start gap-2 text-sm pb-6 border-b border-gray-200">
          <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-0.5">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <span className="font-semibold text-gray-900">
              Free cancellation
            </span>{" "}
            +{" "}
            <span className="font-semibold text-gray-900">
              Unlimited rescheduling
            </span>{" "}
            <span className="text-gray-600">
              before{" "}
              {date && format(new Date(date), "h:mm a 'on' MMM dd, yyyy")}
            </span>
          </div>
        </div>

        {/* Enter Promo Code */}
        <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
          <Tag className="w-4 h-4" />
          <span>Enter Promo Code</span>
        </button>

        {/* Total Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-gray-900 font-roboto">
              Total price (INR):
            </span>
            <span className="text-2xl font-bold text-gray-900 font-roboto">
              ₹{Math.round(calculateTotalPrice()).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Book with Confidence Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 text-base">
          Book with confidence
        </h3>

        {/* Trustpilot Rating */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-green-600 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              Excellent
            </span>
            <span className="text-sm text-gray-600">★ Trustpilot</span>
          </div>
        </div>
        <p className="text-xs text-gray-600">
          Based on 289,825 traveler reviews
        </p>

        {/* Benefits */}
        <div className="space-y-3">
          {/* Exceptional Flexibility */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Exceptional flexibility
            </h4>
            <p className="text-xs text-gray-600">
              Free cancellation and lowest price guarantee
            </p>
          </div>

          {/* 24/7 Global Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
              24/7 global support
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              Our award-winning customer service team is here to help
            </p>
            <a
              href="tel:+17024443858"
              className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-3 h-3" />
              <span>+1(702) 444-3858</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
