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

function ActivityBookingContent({ id }: Readonly<{ id: string }>) {
  const searchParams = useSearchParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const date = searchParams.get("date");
  const numAdults = Number(searchParams.get("adults") || "1");
  const numSeniors = Number(searchParams.get("seniors") || "0");
  const numChildren = Number(searchParams.get("children") || "0");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/experience/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span>/</span>
              <Link href="/activities" className="hover:text-blue-600 transition">
                Activities
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span>/</span>
              <span className="text-gray-900 font-medium">Booking</span>
            </li>
          </ol>
        </nav>

        {/* Progress Indicator */}
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mb-2">
                1
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900">
                Contact Details
              </span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className="h-full bg-blue-600 w-0 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold mb-2">
                2
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Activity Details
              </span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className="h-full bg-blue-600 w-0 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold mb-2">
                3
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
          <ContactDetailsSection />
          <ActivityDetailsSection
            activity={activity}
            date={date}
            numAdults={numAdults}
            numSeniors={numSeniors}
            numChildren={numChildren}
          />
          <PaymentSection activity={activity} tourLanguage="English - Guide" />
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
