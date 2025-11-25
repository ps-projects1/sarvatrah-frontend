"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Destination {
  id: number;
  name: string;
  price: string;
  image: string;
}

const destinationList: Destination[] = [
  {
    id: 1,
    name: "Shimla",
    price: "INR 5999/-",
    image: "/images/home/image1.png",
  },
  {
    id: 2,
    name: "Manali",
    price: "INR 5999/-",
    image: "/images/home/image2.png",
  },
  {
    id: 3,
    name: "Leh",
    price: "INR 5999/-",
    image: "/images/home/image3.png",
  },
  {
    id: 4,
    name: "Shimla",
    price: "INR 5999/-",
    image: "/images/home/image1.png",
  },
  {
    id: 5,
    name: "Manali",
    price: "INR 5999/-",
    image: "/images/home/image2.png",
  },
];

interface DestinationGallerySectionProps {
  onViewDestinations?: () => void;
}

const InvertedDestinationSection: React.FC<DestinationGallerySectionProps> = ({
  onViewDestinations,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-start lg:items-center">
          <div className="w-full lg:w-1/3 flex flex-col justify-start">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
              Discover{" "}
              <span className="font-bold">
                the World's Best Unforgettable Holiday Escapes!
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mb-10 leading-relaxed font-light">
              Of course! There are countless holiday destinations around the
              world, catering to various interests and preferences. Here are
              some popular holiday destinations across different continents.
            </p>

            <div>
              <Button
                onClick={onViewDestinations}
                variant="outline"
                className="px-10 py-2.5 text-sm font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-full"
              >
                View Destinations
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 relative overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {destinationList.map((destination) => (
                <div
                  key={destination.id}
                  className="relative shrink-0 w-80 h-96 group"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70 rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-3xl font-bold mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-sm font-light">
                      Starting from {destination.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-sm z-30"
              aria-label="Previous destination"
            >
              <ChevronLeft
                size={18}
                className="text-gray-700"
                strokeWidth={2}
              />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-sm z-30"
              aria-label="Next destination"
            >
              <ChevronRight
                size={18}
                className="text-gray-700"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default InvertedDestinationSection;
