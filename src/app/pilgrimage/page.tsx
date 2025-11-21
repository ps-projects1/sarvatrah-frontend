"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

const PilgrimagePage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pilgrimage Packages</h1>
        {searchQuery && (
          <p className="text-gray-600 text-lg mb-8">
            Search results for: <strong>"{searchQuery}"</strong>
          </p>
        )}
        <p className="text-gray-500">Coming soon - Pilgrimage packages listing page</p>
      </div>
      <Footer />
    </>
  );
};

export default PilgrimagePage;
