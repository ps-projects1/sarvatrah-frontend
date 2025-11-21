"use client";

import ActivityFirstSection from "@/components/activities/ActivityFirstSection";
import ActivitySecondSection from "@/components/activities/ActivitySecondSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

const ActivityPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <>
      <Header />
      <ActivityFirstSection initialSearch={searchQuery} />
      <ActivitySecondSection searchQuery={searchQuery} />
      <Footer />
    </>
  );
};

export default ActivityPage;
