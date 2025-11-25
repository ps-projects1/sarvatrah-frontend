"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PilgrimagePackage {
  id: number;
  title: string;
  duration: string;
  price: string;
}

const packages: PilgrimagePackage[] = [
  {
    id: 1,
    title: "12 JYOTIRLINGA DARSHAN",
    duration: "24 Days - 23 Nights",
    price: "INR 57,000/-",
  },
];

interface PilgrimageSectionProps {
  onViewPilgrimages?: () => void;
}

const PilgrimageSection: React.FC<PilgrimageSectionProps> = ({
  onViewPilgrimages,
}) => {
  return (
    <section className="w-full relative overflow-hidden bg-linear-to-r from-[#CED4DB] to-[#E9EDF2] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Left Content Section */}
          <div className="flex flex-col justify-start">
            {/* Heading */}
            <h2 className="text-5xl sm:text-6xl lg:text-6xl font-semibold font-roboto text-gray-900 mb-6 leading-tight">
              Pilgrimage
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 mb-8 leading-relaxed max-w-md font-light">
              Pilgrimage is a journey undertaken by individuals, often for
              religious or spiritual reasons, to visit a sacred place or site
              that holds special significance to their faith.
            </p>

            {/* View Pilgrimages Button */}
            <div className="mb-12">
              <Button
                onClick={onViewPilgrimages}
                variant="outline"
                className="px-10 py-2.5 text-sm font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-full"
              >
                View pilgrimages
              </Button>
            </div>

            {/* Package Card */}
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-lg">
              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                {packages[0].title}
              </h3>

              {/* Duration */}
              <p className="text-sm text-gray-600 mb-4 font-light">
                {packages[0].duration}
              </p>

              {/* Price and Arrow */}
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-red-500">
                  {packages[0].price}
                </span>
                <button className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors duration-300">
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image Section - Pilgrimage Images with Background */}
          <div className="relative h-96 sm:h-[450px] lg:h-[500px] flex items-center justify-center">
            {/* Background Image (behind cards) */}
            <div
              className="absolute inset-0 flex items-center justify-center z-0  "
              style={{
                backgroundImage: "url('/images/home/pilgrimageBG.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Cards Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Top Card - Center */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden">
                  <img
                    src="/images/home/Group1.png"
                    alt="Pilgrimage site 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom Left Card */}
              <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8 z-10">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden">
                  <img
                    src="/images/home/Group2.png"
                    alt="Pilgrimage site 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom Right Card */}
              <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-20">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden">
                  <img
                    src="/images/home/Group3.png"
                    alt="Pilgrimage site 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PilgrimageSection;
