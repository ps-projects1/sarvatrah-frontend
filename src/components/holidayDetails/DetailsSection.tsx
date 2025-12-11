"use client";

import { Youtube } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Itinerary from "./Itinerary";
import Policies from "./Policies";
import Summary from "./Summary";
import BookingSidebar from "./itinerary/BookingSidebar";
import { HolidayPackage } from "@/types/holiday";
import type { CalculateBookingResponse } from "@/types/booking";
import {
  generateItineraryPDF,
  type ItineraryData,
} from "@/lib/utils/pdfGenerator";
import Link from "next/link";
import { Button } from "../ui/button";

type PackageDetails = HolidayPackage;

interface ApiResponse {
  status: boolean;
  message: string;
  data: PackageDetails;
}

interface SearchParams {
  startingFrom: string;
  travelDate: Date | undefined;
  numAdults: number;
  numChildren: number;
}

const tabs = [
  { id: "1", label: "Itinerary" },
  { id: "2", label: "Policies" },
  { id: "3", label: "Summary" },
];

const DetailsSection = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: SearchParams;
}) => {
  const [packageData, setPackageData] = useState<PackageDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Helper function to get the correct image URL
  const getImageUrl = (path: string | undefined): string => {
    if (!path) return "/images/holiday/holiday_list.png";
    // If path already starts with http/https, use it as is
    if (path.startsWith("http")) return path;
    // Otherwise, prepend the base URL
    return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
  };

  // Booking calculation state
  const [bookingCalculation, setBookingCalculation] =
    useState<CalculateBookingResponse | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const [selectedRoomType, setSelectedRoomType] = useState<string>("standard");

  // Get values from searchParams or use defaults
  const travelStartDate = searchParams?.travelDate
    ? searchParams.travelDate.toISOString().split("T")[0]
    : (() => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split("T")[0];
      })();

  const numberOfAdults = searchParams?.numAdults || 2;
  const numberOfChildren = searchParams?.numChildren || 0;

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setLoading(true);

        // For now, send empty body as the backend might not be expecting these fields yet
        // TODO: Once backend supports it, uncomment the full request body below
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/holiday/get-holiday-package-details/${params.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   startDate: travelStartDate,
            //   rooms: [
            //     {
            //       roomType: selectedRoomType,
            //       adults: numberOfAdults,
            //       children: {
            //         withBed: childrenWithBed,
            //         withoutBed: childrenWithoutBed,
            //       },
            //     },
            //   ],
            // }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (result.status && result.data) {
          setPackageData(result.data);
          setError(null);

          // Initialize with first hotel and first vehicle from package
          const firstHotelDay = result.data.itinerary.find(
            (day) => day.stay && day.hotel_id
          );
          if (firstHotelDay?.hotel_id) {
            setSelectedHotelId(firstHotelDay.hotel_id);
          }

          if (result.data.vehiclePrices.length > 0) {
            setSelectedVehicleId(result.data.vehiclePrices[0].vehicle_id);
          }
        } else {
          setError("Unable to find this holiday package. It may have been removed or is no longer available.");
        }
      } catch (err: any) {
        if (err.message?.includes("fetch")) {
          setError("Unable to connect to the server. Please check your internet connection and try again.");
        } else if (err.status === 404) {
          setError("This holiday package was not found. Please check the URL or browse our other packages.");
        } else if (err.status === 500) {
          setError("Server error occurred. Our team has been notified. Please try again later.");
        } else {
          setError("Something went wrong while loading the package. Please refresh the page or try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPackageDetails();
    }
  }, [params.id]);

  // Handlers for changes
  const handleHotelChange = (hotelId: string) => {
    setSelectedHotelId(hotelId);
  };

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleRoomTypeChange = (roomType: string) => {
    setSelectedRoomType(roomType);
  };

  const handleBookingCalculated = (calculation: CalculateBookingResponse) => {
    setBookingCalculation(calculation);
  };

  const handleDownloadItinerary = () => {
    if (!packageData) return;

    const itineraryData: ItineraryData = {
      packageName: packageData.packageName,
      duration: packageData.packageDuration,
      startCity: packageData.startCity,
      destinationCity: packageData.destinationCity.map((city) =>
        typeof city === "string" ? city : city.name
      ),
      itinerary: packageData.itinerary,
    };

    const fileName = `${packageData.packageName.replace(
      /\s+/g,
      "_"
    )}_Itinerary.pdf`;
    generateItineraryPDF(itineraryData, fileName);
  };

  const handleShare = async () => {
    if (!packageData) return;

    const shareData = {
      title: packageData.packageName,
      text: `Check out this amazing ${
        packageData.packageDuration.days
      } days trip to ${packageData.destinationCity
        .map((city) => (typeof city === "string" ? city : city.name))
        .join(", ")}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled sharing or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          <p className="mt-4 text-gray-600 text-lg">
            Loading package details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Oops! Something went wrong</h2>
          <p className="text-red-600 text-base mb-6 leading-relaxed">
            {error || "Package not found"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-black font-roboto font-semibold mb-3 sm:mb-4">
            {packageData.packageName}
          </h2>
          <p className="text-xs sm:text-sm flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="text-red-600 font-semibold bg-gray-200 rounded-full px-4 py-2">
              {packageData.packageDuration.days}D -{" "}
              {packageData.packageDuration.nights}N
            </span>
            <span className="text-blue-600 font-semibold">
              📍{" "}
              {packageData.destinationCity
                .map((city) => (typeof city === "string" ? city : city.name))
                .join(", ")}
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-2 mb-4 sm:mb-6 overflow-hidden">
          {/* Main Image - Theme Image */}
          <div className="w-full lg:flex-1 relative">
            <Image
              src={getImageUrl(packageData.themeImg?.path)}
              height={308}
              width={600}
              alt={packageData.packageName}
              className="w-full h-[200px] sm:h-[250px] lg:h-[308px] rounded-xl object-cover"
            />
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6">
              <span className="border border-white rounded-full text-white font-roboto text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                View Gallery ({(packageData.images?.length || 0) + 1} photos)
              </span>
            </div>
          </div>

          {/* Secondary Images from package.images array */}
          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-[300px] shrink-0">
            {packageData.images && packageData.images.length > 0 && (
              <>
                <div className="w-full relative flex-1 lg:flex-none">
                  <Image
                    src={getImageUrl(packageData.images[0]?.path)}
                    height={150}
                    width={400}
                    alt={`${packageData.packageName} - Image 1`}
                    className="w-full h-[150px] sm:h-[180px] lg:h-[150px] rounded-xl object-cover"
                  />
                </div>
                {packageData.images.length > 1 && (
                  <div className="w-full relative flex-1 lg:flex-none">
                    <Image
                      src={getImageUrl(packageData.images[1]?.path)}
                      height={150}
                      width={400}
                      alt={`${packageData.packageName} - Image 2`}
                      className="w-full h-[150px] sm:h-[180px] lg:h-[150px] rounded-xl object-cover"
                    />
                  </div>
                )}
              </>
            )}
            {(!packageData.images || packageData.images.length === 0) && (
              <>
                <div className="w-full relative flex-1 lg:flex-none">
                  <Image
                    src="/images/holiday/holiday_list.png"
                    height={150}
                    width={400}
                    alt="image"
                    className="w-full h-[150px] sm:h-[180px] lg:h-[150px] rounded-xl object-cover"
                  />
                  <div className="absolute flex items-center justify-center inset-0 text-white">
                    <span>
                      <Youtube />
                    </span>
                  </div>
                </div>
                <div className="w-full relative flex-1 lg:flex-none">
                  <Image
                    src="/images/holiday/holiday_list.png"
                    height={150}
                    width={400}
                    alt="image"
                    className="w-full h-[150px] sm:h-[180px] lg:h-[150px] rounded-xl object-cover"
                  />
                </div>
              </>
            )}
          </div>

          {/* Third Column Image */}
          {packageData.images && packageData.images.length > 2 && (
            <div className="w-full lg:w-[300px] shrink-0 relative hidden lg:block">
              <Image
                src={getImageUrl(packageData.images[2]?.path)}
                height={308}
                width={400}
                alt={`${packageData.packageName} - Image 3`}
                className="w-full h-[308px] rounded-xl object-cover"
              />
              {packageData.images.length > 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                  <span className="text-white font-roboto text-2xl font-bold">
                    +{packageData.images.length - 3} more
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 sm:py-4 cursor-pointer font-roboto capitalize text-lg sm:text-xl whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? "border-b-4 border-blue-500"
                  : "text-[#B5BBC2]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <div className="bg-[#F1F4F8] w-full pt-4">
        <div className="max-w-7xl mx-auto sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1 min-w-0">
              {activeTab === "1" && (
                <Itinerary
                  itineraryData={packageData.itinerary}
                  packageData={packageData}
                  selectedHotelId={selectedHotelId}
                  selectedVehicleId={selectedVehicleId}
                  selectedRoomType={selectedRoomType}
                  onHotelChange={handleHotelChange}
                  onVehicleChange={handleVehicleChange}
                  onRoomTypeChange={handleRoomTypeChange}
                  onBookingCalculated={handleBookingCalculated}
                  onDownload={handleDownloadItinerary}
                  onShare={handleShare}
                  travelStartDate={travelStartDate}
                  numberOfAdults={numberOfAdults}
                  numberOfChildren={numberOfChildren}
                />
              )}
              {activeTab === "2" && (
                <Policies
                  cancellationPolicyType={packageData.cancellationPolicyType}
                  refundablePercentage={packageData.refundablePercentage}
                  refundableDays={packageData.refundableDays}
                />
              )}
              {activeTab === "3" && <Summary packageData={packageData} />}
            </div>

            <div className="hidden lg:block w-full lg:w-[300px] shrink-0">
              <div className=" top-0 ">
                <BookingSidebar
                  packageData={packageData}
                  bookingCalculation={bookingCalculation}
                  selectedVehicleId={selectedVehicleId}
                  selectedRoomType={selectedRoomType}
                  numberOfAdults={numberOfAdults}
                  numberOfChildren={numberOfChildren}
                  travelStartDate={travelStartDate}
                />
              </div>
            </div>
          </div>

          {/* Mobile Booking Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-red-600 font-roboto">
                    ₹
                    {(
                      bookingCalculation?.finalPackage ||
                      (packageData.vehiclePrices?.[0]?.price ||
                        packageData.availableVehicle?.[0]?.price ||
                        0) *
                        (numberOfAdults + numberOfChildren)
                    ).toLocaleString("en-IN")}
                  </span>
                  {packageData.inflatedPercentage > 0 && (
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-semibold">
                      {Math.round(packageData.inflatedPercentage)}% OFF
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 font-roboto">
                  {numberOfAdults + numberOfChildren === 1
                    ? "per person"
                    : `for ${numberOfAdults + numberOfChildren} travelers`}
                </p>
              </div>
              <Link
                href={`/booking/${packageData._id}?${new URLSearchParams({
                  name: packageData.packageName,
                  price: (
                    bookingCalculation?.finalPackage ||
                    (packageData.vehiclePrices?.[0]?.price ||
                      packageData.availableVehicle?.[0]?.price ||
                      0) *
                      (numberOfAdults + numberOfChildren)
                  ).toString(),
                  days: packageData.packageDuration.days.toString(),
                  nights: packageData.packageDuration.nights.toString(),
                  startCity: packageData.startCity,
                  destinations: packageData.destinationCity
                    .map((city) =>
                      typeof city === "string" ? city : city.name
                    )
                    .join(","),
                  packageType: packageData.packageType,
                  selectType: packageData.selectType,
                  highlights: packageData.highlights,
                  include: packageData.include,
                  exclude: packageData.exclude,
                  adults: numberOfAdults.toString(),
                  children: numberOfChildren.toString(),
                }).toString()}`}
                className="shrink-0"
              >
                <Button className="bg-[#2789FF] font-roboto rounded-full text-white px-6 py-5 text-sm font-semibold hover:bg-[#1a73e8] transition-colors whitespace-nowrap">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
