"use client";

import { useSearchParams } from "next/navigation";
import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import ContactDetailsSection from "../../../components/activity-booking/ContactDetailsSection";
import ActivityDetailsSection from "@/components/activity-booking/ActivityDetailsSection";
import BookingSummaryCard from "@/components/activity-booking/BookingSummaryCard";
import PaymentSection from "@/components/activity-booking/PaymentSection";
import { Activity } from "@/types/activity";
import { experienceService } from "@/lib/services/experienceService";

function ActivityBookingContent({ id }: Readonly<{ id: string }>) {
  const searchParams = useSearchParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [currentStep, setCurrentStep] = useState(1);
  const [openSections, setOpenSections] = useState({
    contact: true,
    activity: false,
    payment: false,
  });

  const date = searchParams.get("date");
  const numAdults = Number(searchParams.get("adults") || "1");
  const numSeniors = Number(searchParams.get("seniors") || "0");
  const numChildren = Number(searchParams.get("children") || "0");

  const handleNextStep = (step: number) => {
    if (step === 1) {
      setOpenSections({ contact: false, activity: true, payment: false });
      setCurrentStep(2);
    } else if (step === 2) {
      setOpenSections({ contact: false, activity: false, payment: true });
      setCurrentStep(3);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await experienceService.getExperienceById(id);
        setActivity(data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileCTA(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activity) {
      const lowestPrice =
        activity?.pricing && activity.pricing.length > 0
          ? Math.min(...activity.pricing.map((p: any) => p.price))
          : activity.pricePerPerson || activity.price || 0;
      const totalTravelers = numAdults + numSeniors + numChildren;
      const subtotal = lowestPrice * totalTravelers;
      const gst = subtotal * 0.18;
      setTotalPrice(subtotal + gst);
    }
  }, [activity, numAdults, numSeniors, numChildren]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          <output className="mt-4 text-gray-600 text-lg" aria-live="polite">
            Loading activity details...
          </output>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl mb-4">Activity not found</p>
          <Link
            href="/activities"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Browse Activities
          </Link>
        </div>
      </div>
    );
  }

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
              <Link
                href="/activities"
                className="hover:text-blue-600 transition"
              >
                Activities
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
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 shadow-md relative z-10 border-4 border-white ${
                  currentStep > 1
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-600 ring-2 ring-blue-600"
                }`}
              >
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
                ) : (
                  "1"
                )}
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold text-center ${
                  currentStep >= 1 ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Contact Details
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 text-center hidden sm:block">
                {currentStep > 1 ? "Completed" : "In Progress"}
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2 relative -mt-6">
              <div
                className={`h-full bg-blue-600 transition-all duration-500 ${
                  currentStep >= 2 ? "w-full" : "w-0"
                }`}
              ></div>
            </div>

            <div className="flex flex-col items-center flex-1 relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm relative z-10 border-4 border-white ${
                  currentStep > 2
                    ? "bg-blue-600 text-white"
                    : currentStep === 2
                    ? "bg-blue-100 text-blue-600 ring-2 ring-blue-600"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
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
                ) : (
                  "2"
                )}
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold text-center ${
                  currentStep >= 2 ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Activity Details
              </span>
              <span className="text-[10px] sm:text-xs text-center hidden sm:block">
                {currentStep > 2
                  ? "Completed"
                  : currentStep === 2
                  ? "In Progress"
                  : "Pending"}
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2 relative -mt-6">
              <div
                className={`h-full bg-blue-600 transition-all duration-500 ${
                  currentStep >= 3 ? "w-full" : "w-0"
                }`}
              ></div>
            </div>

            <div className="flex flex-col items-center flex-1 relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm relative z-10 border-4 border-white ${
                  currentStep === 3
                    ? "bg-blue-100 text-blue-600 ring-2 ring-blue-600"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs sm:text-sm font-medium text-center ${
                  currentStep >= 3 ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Payment
              </span>
              <span
                className={`text-[10px] sm:text-xs text-center hidden sm:block ${
                  currentStep === 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {currentStep === 3 ? "In Progress" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ContactDetailsSection
              isOpen={openSections.contact}
              onToggle={() =>
                setOpenSections((prev) => ({ ...prev, contact: !prev.contact }))
              }
              onNext={() => handleNextStep(1)}
            />
            <ActivityDetailsSection
              activity={activity}
              date={date}
              numAdults={numAdults}
              numSeniors={numSeniors}
              numChildren={numChildren}
              isOpen={openSections.activity}
              onToggle={() =>
                setOpenSections((prev) => ({
                  ...prev,
                  activity: !prev.activity,
                }))
              }
              onNext={() => handleNextStep(2)}
            />
            <PaymentSection
              activity={activity}
              tourLanguage="English - Guide"
              isOpen={openSections.payment}
              onToggle={() =>
                setOpenSections((prev) => ({ ...prev, payment: !prev.payment }))
              }
            />
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <BookingSummaryCard
                activity={activity}
                date={date}
                numAdults={numAdults}
                numSeniors={numSeniors}
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
              const paymentSection = document.querySelector(
                '[aria-label="payment-section"]'
              );
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
}

export default function ActivityBookingPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = use(params);

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <ActivityBookingContent id={id} />
      </Suspense>
      <RequestCallBackSection />
      <Footer />
    </>
  );
}
