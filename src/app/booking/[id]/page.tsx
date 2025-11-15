"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import Footer from "@/components/Footer";
import BookingDetails from "@/components/booking/BookingDetails";

const BookingPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);

  return (
    <>
      <Header />
      <BookingDetails params={resolvedParams} />
      <RequestCallBackSection />
      <Footer />
    </>
  );
};

export default BookingPage;
