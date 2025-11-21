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
        </div>

        {/* Category Tabs & Search Bar - At Bottom */}
        <div className="relative flex flex-col items-center justify-center w-full px-4 gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="hidden sm:inline">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3 w-full max-w-2xl bg-white rounded-full pr-1 py-1 shadow-lg">
            {/* Search Input */}
            <input
              type="text"
              placeholder={`Search ${selectedCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 sm:px-6 py-2 sm:py-3 text-sm sm:text-base placeholder:text-gray-500 border-0 focus:outline-none focus:ring-0 bg-transparent text-black/70"
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
