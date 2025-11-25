"use client";

import React, { useState } from "react";
import { Search, Palmtree, Activity, Church } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
  onCategoryClick?: (category: string) => void;
}

type CategoryType = "holiday" | "activities" | "pilgrimage";

interface Category {
  id: CategoryType;
  label: string;
  icon: React.ReactNode;
  route: string;
}

const categories: Category[] = [
  { id: "holiday", label: "Holiday", icon: <Palmtree size={20} />, route: "/holiday" },
  { id: "activities", label: "Activities", icon: <Activity size={20} />, route: "/activities" },
  { id: "pilgrimage", label: "Pilgrimage", icon: <Church size={20} />, route: "/pilgrimage" },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onCategoryClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("holiday");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Route to the appropriate page based on selected category
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        router.push(`${category.route}?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }

    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategorySelect = (categoryId: CategoryType) => {
    setSelectedCategory(categoryId);
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Background Image with Enhanced Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center scale-105 transition-transform duration-8000 ease-out hover:scale-100"
        style={{
          backgroundImage: "url('/images/home/heroImage.png')",
        }}
      >
        {/* Gradient Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      <div className="flex items-center justify-center flex-col flex-1 w-full px-4 sm:px-6 lg:px-8">
        {/* Content Container - Center */}
        <div className="relative flex flex-col items-center justify-center max-w-5xl mx-auto mb-12 sm:mb-16">
          {/* Main Heading with Animation */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white text-center mb-4 sm:mb-6 tracking-tight animate-fade-in">
            <span className="inline-block bg-linear-to-r from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-2xl">
              SARVATRAH
            </span>
          </h1>

          {/* Subheading with Subtle Animation */}
          <h2 className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-light text-white text-center mb-4 sm:mb-6 animate-fade-in-delay">
            <span className="inline-block text-white/95 drop-shadow-lg">
              Explore The Wanderer Within
            </span>
          </h2>

          {/* Description with Animation */}
          <p className="text-sm sm:text-base lg:text-xl text-white/90 text-center mb-8 sm:mb-12 max-w-3xl leading-relaxed animate-fade-in-delay-2">
            Discover amazing places at exclusive deals. Your journey to unforgettable experiences starts here.
          </p>
        </div>

        {/* Category Tabs & Search Bar - Enhanced Design */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto gap-5 sm:gap-6 mb-8 sm:mb-12 animate-slide-up">
          {/* Category Tabs with Enhanced Styling */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md rounded-full px-2 py-2 shadow-2xl border border-white/20">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-transparent text-gray-700 hover:bg-gray-100/80 hover:scale-105"
                }`}
              >
                <span className={`hidden sm:inline transition-transform ${selectedCategory === category.id ? 'scale-110' : ''}`}>
                  {category.icon}
                </span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Search Bar with Enhanced Styling */}
          <div className="flex items-center w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-3xl">
            {/* Search Icon */}
            <div className="pl-5 sm:pl-6">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder={`Search ${selectedCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base placeholder:text-gray-400 border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-900 font-medium"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="m-1 px-5 sm:px-8 py-2.5 sm:py-3.5 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 rounded-full whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Search</span>
              <span className="sm:hidden">Go</span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.9s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
