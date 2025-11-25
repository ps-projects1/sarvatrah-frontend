"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import TravellerDetails, { TravellerDetailsRef } from "./TravellerDetails";
import BookingSummary from "./BookingSummary";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { HolidayPackage } from "@/types/holiday";

interface BookingDetailsProps {
  params: {
    id: string;
  };
}

const BookingDetails = ({ params }: BookingDetailsProps) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"summary" | "traveller">(
    "summary"
  );
  const [packageData, setPackageData] = useState<HolidayPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const travellerDetailsRef = useRef<TravellerDetailsRef>(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/holiday/get-holiday-package-details/${params.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.status && result.data) {
          setPackageData(result.data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [params.id]);

  const bookingData = {
    id: params.id,
    name: searchParams.get("name"),
    price: searchParams.get("price"),
    days: searchParams.get("days"),
    nights: searchParams.get("nights"),
    startCity: searchParams.get("startCity"),
    destinations: searchParams.get("destinations"),
    packageType: searchParams.get("packageType"),
    selectType: searchParams.get("selectType"),
    highlights: searchParams.get("highlights"),
    include: searchParams.get("include"),
    exclude: searchParams.get("exclude"),
  };

  const handleSidebarBookNow = () => {
    if (activeTab !== "traveller") {
      setActiveTab("traveller");
      setTimeout(() => {
        window.scrollTo({ top: 300, behavior: "smooth" });
      }, 100);
    } else {
      travellerDetailsRef.current?.triggerBooking();
    }
  };

  return (
    <>
      <div className="w-full relative h-[250px] md:h-[300px] lg:h-[400px]">
        <Image
          src="/images/booking/adv_back.jpg"
          fill
          alt="background image"
          className="object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <p className="mb-2 text-2xl md:text-3xl lg:text-4xl font-normal font-roboto">
            Booking Confirmed
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-roboto">
            Your Adventure Awaits!
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <h2 className="text-3xl font-roboto text-clr font-bold mb-6">
          Confirm Booking Details
        </h2>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("summary")}
              className={`pb-4 px-1 font-roboto text-lg font-medium transition-colors relative ${
                activeTab === "summary"
                  ? "text-clr"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Booking Summary
              {activeTab === "summary" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clr"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("traveller")}
              className={`pb-4 px-1 font-roboto text-lg font-medium transition-colors relative ${
                activeTab === "traveller"
                  ? "text-clr"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Traveller Details
              {activeTab === "traveller" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clr"></span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content with Sidebar */}
        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                <p className="mt-4 text-gray-600">Loading package details...</p>
              </div>
            </div>
          ) : packageData ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1">
                {activeTab === "summary" && (
                  <BookingSummary packageData={packageData} />
                )}
                {activeTab === "traveller" && (
                  <TravellerDetails
                    ref={travellerDetailsRef}
                    bookingData={bookingData}
                    packageData={
                      packageData && packageData.packagePrice
                        ? {
                            packagePrice: packageData.packagePrice,
                            packageDuration: packageData.packageDuration,
                          }
                        : undefined
                    }
                  />
                )}
              </div>

              {/* Sidebar - Price Card */}
              <div className="lg:w-[350px] shrink-0">
                <Card className="sticky top-4 pt-0">
                  <CardHeader className="pb-4 bg-[#F1F7FF] py-4">
                    <h3 className="text-lg font-semibold text-gray-700 font-roboto">
                      Total Package Price
                    </h3>
                    <p className="text-sm text-gray-500 font-roboto">
                      per person
                    </p>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-6">
                    {/* Price Section */}
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-blue-600 font-roboto">
                          ₹
                          {packageData.packagePrice?.toLocaleString("en-IN") ||
                            "N/A"}
                        </span>
                        <span className="text-sm text-gray-600 font-roboto">
                          per person*
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-roboto">
                        *Excluding applicable taxes
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 font-roboto">
                            {packageData.packageDuration?.days} Days /{" "}
                            {packageData.packageDuration?.nights} Nights
                          </p>
                          <p className="text-xs text-gray-500 font-roboto">
                            {packageData.destinationCity?.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Package Details */}
                    <div className="border-t pt-4 space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 font-roboto mb-1">
                          Starting City
                        </p>
                        <p className="text-sm text-gray-600 font-roboto">
                          {packageData.startCity}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-700 font-roboto mb-1">
                          Package Type
                        </p>
                        <p className="text-sm text-gray-600 font-roboto capitalize">
                          {packageData.packageType}
                        </p>
                      </div>
                    </div>

                    {/* Proceed Button */}
                    <button
                      onClick={handleSidebarBookNow}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold font-roboto hover:bg-blue-700 transition-colors"
                    >
                      {activeTab === "traveller"
                        ? "Book Now"
                        : "Proceed to Book"}
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-red-600">
              Failed to load package details
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
