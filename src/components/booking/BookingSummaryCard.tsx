"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, Shield, Phone } from "lucide-react";

interface BookingSummaryCardProps {
  packageData: {
    id: string;
    name: string | null;
    price: string | null;
    days: string | null;
    nights: string | null;
    destination?: string | null;
  };
  travelDate?: string | null;
  numAdults?: number;
  numChildren?: number;
}

export default function BookingSummaryCard({
  packageData,
  travelDate,
  numAdults = 1,
  numChildren = 0,
}: BookingSummaryCardProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // The price from packageData is already the TOTAL price for all travelers
  const packageTotalPrice = parseFloat(packageData.price || "0");
  const totalTravelers = numAdults + numChildren;
  const subtotal = packageTotalPrice; // Already includes all travelers
  const gst = subtotal * 0.18;
  const totalPrice = subtotal + gst;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      
      <div className={`p-4 ${timeLeft <= 300 ? "bg-red-50" : "bg-blue-50"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock
              className={`w-5 h-5 ${
                timeLeft <= 300 ? "text-red-600" : "text-blue-600"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                timeLeft <= 300 ? "text-red-900" : "text-blue-900"
              }`}
            >
              {timeLeft <= 300 ? "Hurry! Time running out" : "Complete booking in"}
            </span>
          </div>
          <span
            className={`text-2xl font-bold tabular-nums ${
              timeLeft <= 300 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        <p
          className={`text-xs mt-1 ${
            timeLeft <= 300 ? "text-red-700" : "text-blue-700"
          }`}
        >
          Your selected package will be held for {formatTime(timeLeft)} minutes
        </p>
      </div>

      
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {packageData.name || "Holiday Package"}
        </h3>

        <div className="space-y-3">
          {packageData.destination && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="text-gray-700">{packageData.destination}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-gray-700">
              {packageData.days}D / {packageData.nights}N
            </span>
          </div>

          {travelDate && (
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="text-gray-700">
                Travel Date: {new Date(travelDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-gray-700">
              {numAdults} {numAdults === 1 ? "Adult" : "Adults"}
              {numChildren > 0 && `, ${numChildren} ${numChildren === 1 ? "Child" : "Children"}`}
            </span>
          </div>
        </div>
      </div>

      
      <div className="p-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Price Details
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Package Price ({totalTravelers}{" "}
              {totalTravelers === 1 ? "traveler" : "travelers"})
            </span>
            <span className="font-medium text-gray-900">
              ₹{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">GST (18%)</span>
            <span className="font-medium text-gray-900">
              ₹{Math.round(gst).toLocaleString()}
            </span>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-gray-900">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-blue-600">
                ₹{Math.round(totalPrice).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="p-6 border-b border-gray-200 bg-yellow-50">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Free Cancellation
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              Cancel up to 24 hours before the experience starts for a full
              refund. Terms and conditions apply.
            </p>
          </div>
        </div>
      </div>

      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Secure Payment
            </p>
            <p className="text-xs text-gray-600">
              Your payment information is secure
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">24/7 Support</p>
            <p className="text-xs text-gray-600">
              We&apos;re here to help anytime
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">
              4.8/5 on Trustpilot
            </span>
          </div>
          <p className="text-xs text-center text-gray-600">
            Based on 12,000+ reviews
          </p>
        </div>
      </div>
    </div>
  );
}
