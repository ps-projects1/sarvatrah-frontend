"use client";

import { use, Suspense } from "react";
import Header from "@/components/Header";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import Footer from "@/components/Footer";
import BookingDetails from "@/components/booking/BookingDetails";

const BookingPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);

  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      }>
        <BookingDetails params={resolvedParams} />
      </Suspense>
      <RequestCallBackSection />
      <Footer />
    </>
  );
};

export default BookingPage;
