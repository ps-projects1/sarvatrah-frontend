"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DestinationCity } from "@/types/holiday";
import type { CalculateBookingResponse } from "@/types/booking";

interface PackageData {
  _id: string;
  packageName: string;
  packageDuration: {
    days: number;
    nights: number;
  };
  startCity: string;
  destinationCity: (string | DestinationCity)[];
  packageType: string;
  selectType: string;
  highlights: string;
  include: string;
  exclude: string;
  partialPayment: boolean;
  partialPaymentDueDays: number;
  partialPaymentPercentage: number;
  roomLimit: number;
  inflatedPercentage: number;
  vehiclePrices?: Array<{
    vehicle_id: string;
    vehicleType: string;
    price: number;
  }>;
  availableVehicle?: Array<{
    vehicleType: string;
    price: number;
    seatLimit: number;
    vehicle_id: string;
    brandName: string;
    modelName: string;
  }>;
}

interface BookingSidebarProps {
  packageData: PackageData;
  bookingCalculation?: CalculateBookingResponse | null;
  selectedVehicleId?: string | null;
  selectedRoomType?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  travelStartDate?: string;
}

const BookingSidebar = ({
  packageData,
  bookingCalculation,
  selectedVehicleId,
  selectedRoomType,
  numberOfAdults = 2,
  numberOfChildren = 0,
  travelStartDate,
}: BookingSidebarProps) => {

  // Get package price from vehiclePrices or availableVehicle
  const getPackagePrice = (): number => {
    const vehiclePrice = packageData.vehiclePrices?.[0]?.price;
    const availablePrice = packageData.availableVehicle?.[0]?.price;
    return vehiclePrice || availablePrice || 0;
  };

  // Calculate estimated price based on number of people when API calculation is unavailable
  const getEstimatedPrice = (): number => {
    const basePrice = getPackagePrice();
    if (basePrice === 0) return 0;

    // Simple estimation: base price is per person, multiply by total travelers
    const totalTravelers = numberOfAdults + numberOfChildren;
    return basePrice * totalTravelers;
  };

  // Use calculated price if available, otherwise use estimated price
  const displayPrice = bookingCalculation?.finalPackage || getEstimatedPrice();
  const hasCalculatedPrice = bookingCalculation?.success && bookingCalculation.finalPackage;

  // Calculate total travelers for conditional display
  const totalTravelers = numberOfAdults + numberOfChildren;
  const isSingleTraveler = totalTravelers === 1;

  // Calculate travel dates
  const getFormattedDates = () => {
    if (!travelStartDate) return null;

    const startDate = new Date(travelStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + packageData.packageDuration.days - 1);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const formattedDateRange = getFormattedDates();

  // Calculate original price and discount
  const getOriginalPriceAndDiscount = () => {
    if (packageData.inflatedPercentage && packageData.inflatedPercentage > 0) {
      const originalPrice = displayPrice * (1 + packageData.inflatedPercentage / 100);
      const discountPercentage = packageData.inflatedPercentage;
      return { originalPrice: Math.round(originalPrice), discountPercentage };
    }
    return { originalPrice: null, discountPercentage: 0 };
  };

  const { originalPrice, discountPercentage } = getOriginalPriceAndDiscount();

  // Calculate partial payment amount
  const partialPaymentAmount = packageData.partialPayment
    ? (displayPrice * packageData.partialPaymentPercentage) / 100
    : 0;
  const remainingPaymentAmount = displayPrice - partialPaymentAmount;

  const bookingUrl =
    `/booking/${packageData._id}?` +
    new URLSearchParams({
      name: packageData.packageName,
      price: displayPrice.toString(),
      days: packageData.packageDuration.days.toString(),
      nights: packageData.packageDuration.nights.toString(),
      startCity: packageData.startCity,
      destinations: packageData.destinationCity.map(city => typeof city === 'string' ? city : city.name).join(","),
      packageType: packageData.packageType,
      selectType: packageData.selectType,
      highlights: packageData.highlights,
      include: packageData.include,
      exclude: packageData.exclude,
      adults: numberOfAdults.toString(),
      children: numberOfChildren.toString(),
    }).toString();

  return (
    <div className="space-y-4">
      
      <Card className="pt-0 pb-4 rounded-none">
        <CardHeader className="pb-4 bg-[#F1F7FF] py-2">
          <div className="flex items-start justify-between">
            
            <div>

              {originalPrice && (
                <p className="text-clr font-roboto line-through text-lg font-normal">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </p>
              )}


              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-red-600 font-roboto">
                  ₹{displayPrice.toLocaleString("en-IN")}
                </h2>
                <span className="text-sm text-clr font-roboto">
                  {isSingleTraveler
                    ? "per person*"
                    : `for ${totalTravelers} ${totalTravelers === 2 ? "travelers" : "travelers"}*`
                  }
                </span>
              </div>


              <p className="text-xs text-clr font-roboto mt-1">
                {hasCalculatedPrice ? (
                  <>
                    *Calculated price for {bookingCalculation?.days} days
                    {selectedRoomType && <> • Room: {selectedRoomType}</>}
                  </>
                ) : (
                  "*Excluding applicable taxes"
                )}
              </p>
            </div>


            {discountPercentage > 0 && (
              <span className="bg-red-600 text-white text-xs font-semibold font-roboto px-3 py-1 rounded whitespace-nowrap">
                {Math.round(discountPercentage)}% OFF
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-clr" />
                <div>
                  <p className="text-sm font-medium text-clr font-roboto">
                    {packageData.packageDuration.days} Days /{" "}
                    {packageData.packageDuration.nights} Nights
                  </p>
                  {formattedDateRange && (
                    <p className="text-xs text-gray-500">{formattedDateRange}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  // Scroll to top where SearchSection is located
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#2789FF] rounded-3xl font-roboto text-sm font-semibold hover:underline"
              >
                MODIFY
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          {hasCalculatedPrice && bookingCalculation?.breakdown && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Price Breakdown</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-700">
                  <span>Hotel Cost ({bookingCalculation.days} days)</span>
                  <span className="font-medium">₹{bookingCalculation.breakdown.hotelCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Per Day Rate</span>
                  <span className="font-medium">₹{bookingCalculation.breakdown.perDayAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Vehicle Cost (incl. markup)</span>
                  <span className="font-medium">₹{bookingCalculation.breakdown.vehicleFinal.toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-semibold text-sm text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">₹{bookingCalculation.finalPackage?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          )}

          {!hasCalculatedPrice && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs text-blue-800 font-roboto font-medium">Estimated Pricing</p>
                  <p className="text-xs text-blue-700 font-roboto mt-1">Price shown is an estimate. Final price will be calculated after selecting your preferences.</p>
                </div>
              </div>
            </div>
          )}

          {/* Partial Payment Option */}
          {packageData.partialPayment && displayPrice > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-blue-900">Partial Payment Available</h3>
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {packageData.partialPaymentPercentage}% Now
                </span>
              </div>
              <div className="space-y-1 text-xs text-blue-800">
                <div className="flex justify-between">
                  <span>Pay Now ({packageData.partialPaymentPercentage}%):</span>
                  <span className="font-semibold">₹{partialPaymentAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pay Later:</span>
                  <span className="font-semibold">₹{remainingPaymentAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 border-t border-blue-300 text-blue-700">
                  <p>Remaining amount due {packageData.partialPaymentDueDays} days before travel</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">

          <Link href={bookingUrl} className="block w-full">
            <Button className="w-full bg-[#2789FF] font-roboto rounded-3xl text-white py-6 text-base font-semibold hover:bg-[#1a73e8] transition-colors">
              Proceed to Book Online
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingSidebar;
