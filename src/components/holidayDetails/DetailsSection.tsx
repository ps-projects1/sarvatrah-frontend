"use client";

import { Youtube } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Itinery from "./Itinerary";
import Policies from "./Policies";
import Summary from "./Summary";
import Itinerary from "./Itinerary";
import BookingSidebar from "./itinerary/BookingSidebar";

interface PackageDuration {
  days: number;
  nights: number;
}

interface ThemeImg {
  filename: string;
  path: string;
  mimetype: string;
}

interface PackageDetails {
  _id: string;
  packageDuration: PackageDuration;
  packageName: string;
  themeImg: ThemeImg;
  selectType: string;
  packageType: string;
  destinationCity: string[];
  highlights: string;
  include: string;
  exclude: string;
  startCity: string;
  images: Array<{
    filename: string;
    path: string;
    mimetype: string;
  }>;
  itinerary: any[];
  vehiclePrices: Array<{
    vehicle_id: string;
    vehicleType: string;
    price: number;
  }>;
  packagePrice: number;
  partialPayment: boolean;
  partialPaymentPercentage: number;
  partialPaymentDueDays: number;
  inflatedPercentage: number;
  priceMarkup: number;
  roomLimit: number;
  active: boolean;
  cancellationPolicyType: string;
  refundablePercentage: number;
  refundableDays: number;
  displayHomepage: boolean;
  recommendedPackage: boolean;
  createPilgrimage: boolean;
  uniqueId: string;
  objectType: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: PackageDetails;
}

const tabs = [
  { id: "1", label: "Itinerary" },
  { id: "2", label: "Policies" },
  { id: "3", label: "Summary" },
];

const DetailsSection = ({ params }: { params: { id: string } }) => {
  const [packageData, setPackageData] = useState<PackageDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    const fetchPackageDetails = async () => {
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

        const result: ApiResponse = await response.json();

        if (result.status && result.data) {
          setPackageData(result.data);
          setError(null);
        } else {
          setError("Failed to load package details");
        }
      } catch (err) {
        setError("Error loading package. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPackageDetails();
    }
  }, [params.id]);

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">
            {error || "Package not found"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
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
              📍 {packageData.destinationCity.join(", ")}
            </span>
          </p>
        </div>
        {/* image sections */}
        <div className="flex flex-col lg:flex-row w-full gap-2 mb-4 sm:mb-6">
          <div className="w-full lg:w-full relative">
            <Image
              src="/images/holiday/holiday_list.png"
              height={100}
              width={100}
              alt="image"
              className="w-full h-[200px] sm:h-[250px] lg:h-[308px] rounded-xl object-cover"
            />
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6">
              <span className="border border-white rounded-full text-white font-roboto text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                View Gallery
              </span>
            </div>
          </div>
          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-[70%]">
            <div className="w-full relative flex-1 lg:flex-none">
              <Image
                src="/images/holiday/holiday_list.png"
                height={100}
                width={100}
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
                height={100}
                width={100}
                alt="image"
                className="w-full h-[150px] sm:h-[180px] lg:h-[150px] rounded-xl object-cover"
              />
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6">
                <span className="text-white font-roboto text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">
                  Activities & Sightseeing
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-full relative hidden lg:block">
            <Image
              src="/images/holiday/holiday_list.png"
              height={100}
              width={100}
              alt="image"
              className="w-full h-[308px] rounded-xl object-cover"
            />
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6">
              <span className="text-white font-roboto text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">
                Property photos
              </span>
            </div>
          </div>
        </div>

        {/* tabs section */}
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
      {/* Content Section with Sidebar */}
      <div className="bg-[#F1F4F8] w-full pt-4">
        <div className="max-w-7xl mx-auto sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Left side - Main Content */}
            <div className="flex-1 min-w-0">
              {activeTab === "1" && (
                <Itinerary itineraryData={packageData.itinerary} />
              )}
              {activeTab === "2" && <Policies />}
              {activeTab === "3" && <Summary packageData={packageData} />}
            </div>

            <div className="hidden lg:block w-full lg:w-[300px] shrink-0">
              <div className=" top-0 ">
                <BookingSidebar packageData={packageData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
