"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HolidayPackage } from "@/types/holiday";
import ContactDetailsSection from "./ContactDetailsSection";
import HolidayDetailsSection from "./HolidayDetailsSection";
import PaymentSection from "./PaymentSection";
import BookingSummaryCard from "./BookingSummaryCard";

interface BookingDetailsProps {
  params: {
    id: string;
  };
}

const BookingDetails = ({ params }: BookingDetailsProps) => {
  const searchParams = useSearchParams();
  const [packageData, setPackageData] = useState<HolidayPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileCTA, setShowMobileCTA] = useState(false);


  const [currentStep, setCurrentStep] = useState(1);
  const [openSections, setOpenSections] = useState({
    contact: true,
    holiday: false,
    payment: false,
  });

  const travelDate = searchParams.get("date");
  const numAdults = Number(searchParams.get("adults") || "1");
  const numChildren = Number(searchParams.get("children") || "0");

  const handleNextStep = (step: number) => {
    if (step === 1) {
      setOpenSections({ contact: false, holiday: true, payment: false });
      setCurrentStep(2);
    } else if (step === 2) {
      setOpenSections({ contact: false, holiday: false, payment: true });
      setCurrentStep(3);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      } catch (error) {
        console.error("Error fetching package data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [params.id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileCTA(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          <output className="mt-4 text-gray-600 text-lg" aria-live="polite">
            Loading package details...
          </output>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl mb-4">Package not found</p>
          <Link
            href="/holidays"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Browse Packages
          </Link>
        </div>
      </div>
    );
  }

  const bookingSummaryData = {
    id: params.id,
    name: packageData.packageName || searchParams.get("name"),
    price: packageData.packagePrice?.toString() || searchParams.get("price"),
    days: packageData.packageDuration?.days?.toString() || searchParams.get("days"),
    nights: packageData.packageDuration?.nights?.toString() || searchParams.get("nights"),
    destination: packageData.destinationCity?.map(city => typeof city === 'string' ? city : city.name).join(", ") || null,
  };

  const totalPrice = (packageData.packagePrice || 0) * (numAdults + numChildren);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span>/</span>
              <Link href="/holidays" className="hover:text-blue-600 transition">
                Holidays
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span>/</span>
              <span className="text-gray-900 font-medium">Booking</span>
            </li>
          </ol>
        </nav>

        
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            
            <div className="flex flex-col items-center flex-1 relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 shadow-md relative z-10 border-4 border-white ${
                currentStep > 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 ring-2 ring-blue-600'
              }`}>
                {currentStep > 1 ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : '1'}
              </div>
              <span className={`text-xs sm:text-sm font-semibold text-center ${
                currentStep >= 1 ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Contact Details
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 text-center hidden sm:block">
                {currentStep > 1 ? 'Completed' : 'In Progress'}
              </span>
            </div>

            
            <div className="flex-1 h-1 bg-gray-200 mx-2 relative -mt-6">
              <div className={`h-full bg-blue-600 transition-all duration-500 ${
                currentStep >= 2 ? 'w-full' : 'w-0'
              }`}></div>
            </div>

            
            <div className="flex flex-col items-center flex-1 relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm relative z-10 border-4 border-white ${
                currentStep > 2 ? 'bg-blue-600 text-white' :
                currentStep === 2 ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600' :
                'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > 2 ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : '2'}
              </div>
              <span className={`text-xs sm:text-sm font-semibold text-center ${
                currentStep >= 2 ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Holiday Details
              </span>
              <span className="text-[10px] sm:text-xs text-center hidden sm:block">
                {currentStep > 2 ? 'Completed' : currentStep === 2 ? 'In Progress' : 'Pending'}
              </span>
            </div>

            
            <div className="flex-1 h-1 bg-gray-200 mx-2 relative -mt-6">
              <div className={`h-full bg-blue-600 transition-all duration-500 ${
                currentStep >= 3 ? 'w-full' : 'w-0'
              }`}></div>
            </div>

            
            <div className="flex flex-col items-center flex-1 relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm relative z-10 border-4 border-white ${
                currentStep === 3 ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600' :
                'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className={`text-xs sm:text-sm font-medium text-center ${
                currentStep >= 3 ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Payment
              </span>
              <span className={`text-[10px] sm:text-xs text-center hidden sm:block ${
                currentStep === 3 ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {currentStep === 3 ? 'In Progress' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ContactDetailsSection
              isOpen={openSections.contact}
              onToggle={() => setOpenSections(prev => ({ ...prev, contact: !prev.contact }))}
              onNext={() => handleNextStep(1)}
            />
            <HolidayDetailsSection
              packageData={bookingSummaryData}
              isOpen={openSections.holiday}
              onToggle={() => setOpenSections(prev => ({ ...prev, holiday: !prev.holiday }))}
              onNext={() => handleNextStep(2)}
            />
            <PaymentSection
              isOpen={openSections.payment}
              onToggle={() => setOpenSections(prev => ({ ...prev, payment: !prev.payment }))}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <BookingSummaryCard
                packageData={bookingSummaryData}
                travelDate={travelDate}
                numAdults={numAdults}
                numChildren={numChildren}
              />
            </div>
          </div>
        </div>
      </div>

      
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 z-50 ${
          showMobileCTA ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">Total Price</span>
            <span className="text-xl font-bold text-gray-900">
              ₹{Math.round(totalPrice).toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => {
              const paymentSection = document.querySelector('[aria-label="payment-section"]');
              if (paymentSection) {
                paymentSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
