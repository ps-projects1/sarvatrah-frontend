"use client";

import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import ContatcDetailSection from "../../../components/activity-booking/ContactDetailsSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import ContactDetailsSection from "../../../components/activity-booking/ContactDetailsSection";
import ActivityDetailsSection from "@/components/activity-booking/ActivityDetailsSection";
import BookingSummaryCard from "@/components/activity-booking/BookingSummaryCard";
import PaymentSection from "@/components/activity-booking/PaymentSection";

export default function ActivityBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const searchParams = useSearchParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = use(params);

  const date = searchParams.get("date");
  const numAdults = parseInt(searchParams.get("adults") || "1");
  const numSeniors = parseInt(searchParams.get("seniors") || "0");
  const numChildren = parseInt(searchParams.get("children") || "0");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/experience/${id}`
        );
        const data = await response.json();
        setActivity(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-10">
          <div className="lg:col-span-2 space-y-6">
            <ContactDetailsSection />
            <ActivityDetailsSection
              activity={activity}
              date={date}
              numAdults={numAdults}
              numSeniors={numSeniors}
              numChildren={numChildren}
            />
            <PaymentSection
              activity={activity}
              tourLanguage="English - Guide"
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

      <RequestCallBackSection />
      <Footer />
    </>
  );
}
