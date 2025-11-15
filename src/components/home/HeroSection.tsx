"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
  onCategoryClick?: (category: string) => void;
}

const categories = [
  "Hotel",
  "Tour",
  "Activity",
  "Holiday Rentals",
  "Car",
  "Cruise",
  "Flights",
];

const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onCategoryClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryClick = (category: string) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home/heroImage.png')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="flex items-center justify-center flex-col flex-1 w-full">
        {/* Content Container - Center */}
        <div className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white text-center mb-4 sm:mb-6 tracking-tight">
            SARVATRAH
          </h1>

          {/* Subheading */}
          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-light text-white text-center mb-3 sm:mb-4">
            Explore The Wanderer Within
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/90 text-center mb-6 sm:mb-8 max-w-2xl">
            Discover amazing places at exclusive deals
          </p>

          {/* Category Tabs - With Borders */}
          <div className="flex flex-wrap justify-center mb-6 sm:mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-5 sm:px-6 py-2 sm:py-2.5 border-b-2 border-transparent text-white text-sm sm:text-base  hover:border-white font-medium transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar - At Bottom */}
        <div className="relative flex items-center justify-center w-full px-4">
          <div className="flex items-center gap-3 w-full max-w-2xl bg-white rounded-full px-4 py-1">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Explore SARVATRAH"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base placeholder:text-gray-500 border-0 focus:outline-none focus:ring-0 bg-transparent text-black/70"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors duration-300 rounded-full whitespace-nowrap"
            >
              <Search size={20} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
