"use client";

import ActivityFirstSection from "@/components/activities/ActivityFirstSection";
import ActivitySecondSection from "@/components/activities/ActivitySecondSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ActivityContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <>
      <ActivityFirstSection initialSearch={searchQuery} />
      <ActivitySecondSection searchQuery={searchQuery} />
    </>
  );
}

const ActivityPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      }>
        <ActivityContent />
      </Suspense>
      <Footer />
    </>
  );
};

export default ActivityPage;
