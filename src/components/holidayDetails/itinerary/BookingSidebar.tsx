"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface PackageData {
  _id: string;
  packageName: string;
  packagePrice: number;
  packageDuration: {
    days: number;
    nights: number;
  };
  startCity: string;
  destinationCity: string[];
  packageType: string;
  selectType: string;
  highlights: string;
  include: string;
  exclude: string;
}

interface BookingSidebarProps {
  packageData: PackageData;
}

const BookingSidebar = ({ packageData }: BookingSidebarProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);
  const [showAllOffers, setShowAllOffers] = useState(false);

  const bookingUrl =
    `/booking/${packageData._id}?` +
    new URLSearchParams({
      name: packageData.packageName,
      price: packageData.packagePrice.toString(),
      days: packageData.packageDuration.days.toString(),
      nights: packageData.packageDuration.nights.toString(),
      startCity: packageData.startCity,
      destinations: packageData.destinationCity.join(","),
      packageType: packageData.packageType,
      selectType: packageData.selectType,
      highlights: packageData.highlights,
      include: packageData.include,
      exclude: packageData.exclude,
    }).toString();

  const handleApplyCoupon = () => {
    if (
      couponCode.trim() &&
      !appliedCoupons.includes(couponCode.toUpperCase())
    ) {
      setAppliedCoupons([...appliedCoupons, couponCode.toUpperCase()]);
      setCouponCode("");
    }
  };

  const handleRemoveCoupon = (coupon: string) => {
    setAppliedCoupons(appliedCoupons.filter((c) => c !== coupon));
  };

  return (
    <div className="space-y-4">
      {/* Price Card */}
      <Card className="pt-0 pb-4 rounded-none">
        <CardHeader className="pb-4 bg-[#F1F7FF] py-2">
          <div className="flex items-start justify-between">
            {/* Price Section */}
            <div>
              {/* Original Price (strikethrough) */}
              <p className="text-clr font-roboto line-through text-lg font-normal">
                ₹25,397
              </p>

              {/* Discounted Price */}
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-red-600 font-roboto">
                  ₹{packageData.packagePrice.toLocaleString("en-IN")}
                </h2>
                <span className="text-sm text-clr font-roboto">
                  per person*
                </span>
              </div>

              {/* Tax Disclaimer */}
              <p className="text-xs text-clr font-roboto mt-1">
                *Excluding applicable taxes
              </p>
            </div>

            {/* Discount Badge */}
            <span className="bg-red-600 text-white text-xs font-semibold font-roboto px-3 py-1 rounded whitespace-nowrap">
              40% OFF
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Date Selection */}
          <div className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-clr" />
                <div>
                  <p className="text-sm font-medium text-clr font-roboto">
                    {packageData.packageDuration.days} Days /{" "}
                    {packageData.packageDuration.nights} Nights
                  </p>
                  <p className="text-xs text-gray-500">18 Aug - 21 Aug</p>
                </div>
              </div>
              <button className="text-[#2789FF] rounded-3xl font-roboto text-sm font-semibold hover:underline">
                MODIFY
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {/* Book Button */}
          <Link href={bookingUrl} className="block w-full">
            <Button className="w-full bg-[#2789FF] font-roboto rounded-3xl text-white py-6 text-base font-semibold hover:bg-[#1a73e8] transition-colors">
              Proceed to Book Online
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Coupons & Offers Card */}
      <Card className="rounded-none py-0">
        <CardHeader className="pb-4 pt-4 bg-[#F1F7FF]">
          <h2 className="font-semibold text-2xl font-roboto text-clr">
            Coupons & Offers
          </h2>
        </CardHeader>

        <CardContent className="">
          {/* EMI Option */}
          <div className="pb-4">
            <div className="flex flex-col items-start gap-3">
              <span className="bg-linear-to-r from-[#2789FF] to-[#EE0405] rounded-full text-white text-xs font-bold px-2 py-1 font-roboto">
                EMI
              </span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-clr font-roboto">
                  No cost EMI @ ₹5,152
                </p>
                <p className="text-xs text-gray-600 mt-1 font-roboto">
                  Book your holidays with Easy EMI options
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coupon Input Card */}
      <Card className="rounded-none bg-[#F0F0F0]">
        <div className="px-2">
          <div className="bg-[#FFFFFF] rounded-lg">
            <CardContent className="px-0">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Have a coupon?"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-3 font-roboto uppercase border-none shadow-none focus:outline-none focus:ring-0"
                />
                <Button
                  onClick={handleApplyCoupon}
                  className="px-6 bg-transparent text-[#2789FF] font-semibold text-sm font-roboto hover:bg-transparent cursor-pointer flex-1"
                >
                  APPLY
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Offers Section */}
      <div className="bg-white">
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500 font-roboto">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Offers List */}
        <div className="space-y-3">
          {/* Offer 1 - SAVEONFLIGHTS */}
          <div className="flex items-start justify-between gap-2 pb-3 border-b px-4">
            <div className="bg-[#D1F8E6] py-4 px-2 rounded-xl w-full">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 pb-1">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded font-roboto">
                      ✓
                    </span>
                    <p className="font-semibold text-sm text-clr font-roboto">
                      SAVEONFLIGHTS
                    </p>
                  </div>
                  <p className="text-xs text-clr font-roboto">
                    Book now and use your booking id as coupon to get Flat 1000
                    OFF on Flight bookings with MMT
                  </p>
                  <p className="text-xs text-green-600 font-semibold mt-1 font-roboto">
                    -₹9,041
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveCoupon("SAVEONFLIGHTS")}
                  className="text-[#2789FF] text-xs font-semibold hover:underline shrink-0 font-roboto ml-2"
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>

          {/* Offer 2 - NOKIDDING */}
          <div className="flex items-start justify-between gap-2 pb-3 border-b px-4 w-full">
            <div className="bg-[#DBDBDB] w-full py-2 px-4 rounded-xl">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-clr font-roboto mb-1">
                    NOKIDDING
                  </p>
                  <p className="text-xs text-gray-600 font-roboto">
                    Get Flat 45% discount!!!
                  </p>
                  <p className="text-xs text-green-600 font-semibold mt-1 font-roboto">
                    -₹10,686
                  </p>
                </div>
                <button className="text-[#2789FF] text-xs font-semibold hover:underline shrink-0 font-roboto ml-2">
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View More Button */}
        <button
          onClick={() => setShowAllOffers(!showAllOffers)}
          className="w-full text-center text-[#2789FF] text-sm font-semibold mt-4 hover:underline font-roboto pb-4"
        >
          {showAllOffers ? "VIEW LESS" : "VIEW 4 MORE"}
        </button>
      </div>
    </div>
  );
};

export default BookingSidebar;
