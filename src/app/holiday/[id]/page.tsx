import React from "react";
import Header from "../../../components/Header";
import HolidayDetailsClient from "@/components/holidayDetails/HolidayDetailsClient";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import Footer from "@/components/Footer";

const HolidayDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;

  return (
    <>
      <Header />
      <HolidayDetailsClient params={resolvedParams} />
      <RequestCallBackSection />
      <Footer />
    </>
  );
};

export default HolidayDetailsPage;
