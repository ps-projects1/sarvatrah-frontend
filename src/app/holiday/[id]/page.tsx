import React from "react";
import Header from "../../../components/Header";
import SearchSection from "@/components/holidayDetails/SearchSection";
import DetailsSection from "@/components/holidayDetails/DetailsSection";
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
      <SearchSection />
      <DetailsSection params={resolvedParams} />
      <RequestCallBackSection />
      <Footer />
    </>
  );
};

export default HolidayDetailsPage;
