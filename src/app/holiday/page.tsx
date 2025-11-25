"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useEffect, Suspense } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { Search } from "lucide-react";
import RequestCallBackSection from "@/components/home/RequestCallBackSection";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface PackageDuration {
  days: number;
  nights: number;
}

interface ThemeImg {
  filename: string;
  path: string;
  mimetype: string;
}

interface Transport {
  type: string;
  details: string;
}

interface Activity {
  type: string;
  title: string;
  description: string;
  duration: string;
}

interface ItineraryDay {
  dayNo: number;
  title: string;
  subtitle: string;
  description: string;
  stay: boolean;
  hotel_id?: string;
  state?: string;
  city?: string;
  mealsIncluded: string[];
  transport: Transport;
  placesToVisit: string[];
  activities: Activity[];
  notes?: string;
}

interface VehiclePrice {
  vehicle_id: string;
  vehicleType: string;
  price: number;
}

interface HolidayPackage {
  _id: string;
  packageDuration: PackageDuration;
  objectType: string;
  packageName: string;
  themeImg: ThemeImg;
  selectType: string;
  uniqueId: string;
  packageType: string;
  destinationCity: string[];
  highlights: string;
  createPilgrimage: boolean;
  displayHomepage: boolean;
  recommendedPackage: boolean;
  roomLimit: number;
  partialPayment: boolean;
  partialPaymentDueDays: number;
  partialPaymentPercentage: number;
  cancellationPolicyType: string;
  refundablePercentage: number;
  refundableDays: number;
  include: string;
  exclude: string;
  priceMarkup: number;
  inflatedPercentage: number;
  active: boolean;
  startCity: string;
  images: Array<{
    filename: string;
    path: string;
    mimetype: string;
  }>;
  itinerary: ItineraryDay[];
  vehiclePrices: VehiclePrice[];
  availableVehicle: unknown[];
}

interface HolidayPackagesResponse {
  status: boolean;
  message: string;
  data: {
    holidayPackages: HolidayPackage[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

function HolidayContent() {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const router = useRouter();

  const [packages, setPackages] = useState<HolidayPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [searchInput, setSearchInput] = useState(urlSearchQuery);
  const [filteredPackages, setFilteredPackages] = useState<HolidayPackage[]>(
    []
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([500, 50000]);
  const [selectedPackageTypes] = useState<string[]>([]);
  const [selectedSelectTypes] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<"" | "low-high" | "high-low">("");
  const [minMaxPrice, setMinMaxPrice] = useState<{ min: number; max: number }>({
    min: 500,
    max: 50000,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate min/max price from packages
  const calculatePriceRange = (packageList: HolidayPackage[]) => {
    if (packageList.length === 0) return { min: 500, max: 50000 };

    const prices = packageList.flatMap((p) =>
      p.vehiclePrices.map((v) => v.price)
    );

    if (prices.length === 0) return { min: 500, max: 50000 };

    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));

    return { min, max };
  };

  // Sync search query from URL params
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
    setSearchInput(urlSearchQuery);
  }, [urlSearchQuery]);

  // Handle search button click
  const handleSearch = () => {
    if (searchInput.trim()) {
      router.push(`/holiday?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push("/holiday");
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/holiday/get-holiday-package/`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: HolidayPackagesResponse = await response.json();

        if (result.status && result.data) {
          const dataArray = result.data.holidayPackages || [];

          // Filter only active packages
          const activePackages = dataArray.filter((p) => p.active !== false);
          setPackages(activePackages);
          setFilteredPackages(activePackages);

          const priceStats = calculatePriceRange(activePackages);
          setMinMaxPrice(priceStats);
          setPriceRange([priceStats.min, priceStats.max]);

          setError(null);
        } else {
          setError("Failed to load holiday packages");
        }
      } catch (err) {
        console.error("Error fetching holiday packages:", err);
        setError("Error loading packages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Get unique destinations with counts
  const getDestinationCounts = () => {
    const destinationMap = new Map<string, number>();
    packages.forEach(pkg => {
      pkg.destinationCity.forEach(city => {
        destinationMap.set(city, (destinationMap.get(city) || 0) + 1);
      });
    });
    return Array.from(destinationMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };

  // Get duration category counts
  const getDurationCounts = () => {
    const counts = {
      "less-than-6": 0,
      "7-9": 0,
      "more-than-10": 0,
    };

    packages.forEach(pkg => {
      const nights = pkg.packageDuration.nights;
      if (nights < 6) counts["less-than-6"]++;
      else if (nights >= 7 && nights <= 9) counts["7-9"]++;
      else if (nights > 10) counts["more-than-10"]++;
    });

    return counts;
  };

  const durationCounts = getDurationCounts();
  const destinationCounts = getDestinationCounts();

  // Filter packages based on all criteria
  useEffect(() => {
    let filtered = packages;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.destinationCity.some((city) =>
            city.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          pkg.startCity.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by package type
    if (selectedPackageTypes.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedPackageTypes.some(
          (type) => pkg.packageType.toLowerCase() === type.toLowerCase()
        )
      );
    }

    // Filter by price range - only if user has changed the range from initial values
    const hasUserChangedPriceRange = priceRange[0] !== minMaxPrice.min || priceRange[1] !== minMaxPrice.max;
    if (hasUserChangedPriceRange) {
      filtered = filtered.filter((pkg) => {
        const pkgPrice = getPackagePrice(pkg);
        // Include packages with no price (0) or packages within the selected range
        if (pkgPrice === 0) return true;
        return pkgPrice >= priceRange[0] && pkgPrice <= priceRange[1];
      });
    }

    // Filter by select type (domestic/international)
    if (selectedSelectTypes.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedSelectTypes.includes(pkg.selectType)
      );
    }

    // Filter by duration
    if (selectedDurations.length > 0) {
      filtered = filtered.filter((pkg) => {
        const nights = pkg.packageDuration.nights;
        return selectedDurations.some(duration => {
          if (duration === "less-than-6") return nights < 6;
          if (duration === "7-9") return nights >= 7 && nights <= 9;
          if (duration === "more-than-10") return nights > 10;
          return false;
        });
      });
    }

    // Filter by theme
    if (selectedThemes.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedThemes.some(theme =>
          pkg.packageType.toLowerCase().includes(theme.toLowerCase())
        )
      );
    }

    // Filter by destinations
    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedDestinations.some(dest =>
          pkg.destinationCity.some(city =>
            city.toLowerCase() === dest.toLowerCase()
          )
        )
      );
    }

    // Sort by price if selected
    if (priceSort === "low-high") {
      filtered = [...filtered].sort((a, b) => getPackagePrice(a) - getPackagePrice(b));
    } else if (priceSort === "high-low") {
      filtered = [...filtered].sort((a, b) => getPackagePrice(b) - getPackagePrice(a));
    }

    setFilteredPackages(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedPackageTypes,
    priceRange,
    selectedSelectTypes,
    selectedDurations,
    selectedThemes,
    selectedDestinations,
    priceSort,
    packages,
    minMaxPrice,
  ]);

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handlePriceSortChange = (sort: "low-high" | "high-low") => {
    setPriceSort(priceSort === sort ? "" : sort);
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    setSelectedDurations(prev =>
      checked ? [...prev, duration] : prev.filter(d => d !== duration)
    );
  };

  const handleThemeChange = (theme: string, checked: boolean) => {
    setSelectedThemes(prev =>
      checked ? [...prev, theme] : prev.filter(t => t !== theme)
    );
  };

  const handleDestinationChange = (destination: string, checked: boolean) => {
    setSelectedDestinations(prev =>
      checked ? [...prev, destination] : prev.filter(d => d !== destination)
    );
  };

  const getPackagePrice = (pkg: HolidayPackage): number => {
    return pkg.vehiclePrices?.[0]?.price || 0;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Pagination functions
  const getTotalPages = (): number => {
    return Math.ceil(filteredPackages.length / itemsPerPage);
  };

  const getPaginatedPackages = (): HolidayPackage[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPackages.slice(startIndex, endIndex);
  };

  const getResultsText = (): string => {
    const totalPages = getTotalPages();
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(
      currentPage * itemsPerPage,
      filteredPackages.length
    );

    if (totalPages === 0) return "No packages found";

    return `${startItem} – ${endItem} of ${filteredPackages.length} packages found`;
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div
              className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] w-full bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/holiday/holiday_list.png')",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/40" />
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10">
            {/* Hero Title */}
            <h1 className="text-center font-roboto text-[24px] sm:text-[32px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight md:leading-tight font-light text-white mb-6 sm:mb-8 md:mb-10">
              <span className="text-[38px] font-roboto">
                Unwrap Your Dream Getaway
              </span>
              <br className="hidden sm:block" />
              Holiday Packages Await!
            </h1>

            {/* Search Bar */}
            <div className="mx-auto px-4 sm:px-0 max-w-[858px]">
              <div className="h-14 sm:h-16 backdrop-blur-xl bg-white/90 border border-[#E6E6E6] rounded-full shadow-sm flex items-center gap-2 sm:gap-3 px-4 sm:px-5">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 18 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#A6A0A1] shrink-0"
                  >
                    <path
                      d="M9 21s7-5.2 7-12A7 7 0 0 0 2 9c0 6.8 7 12 7 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle
                      cx="9"
                      cy="9"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter Destination or Package name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full bg-transparent outline-none text-[14px] sm:text-[16px] placeholder:text-[#61666B] min-w-0"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="h-10 sm:h-12 rounded-full bg-[#2789FF] text-white px-4 sm:px-8 text-[13px] sm:text-[16px] font-medium hover:bg-[#1a73e8] transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Search</span>
                  <span className="sm:hidden">Go</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[337px_1fr] gap-6 sm:gap-8 lg:gap-10">
            {/* Filters Sidebar */}
            {/* Filters Sidebar */}
            <aside className="order-2 lg:order-1">
              {/* Budget Slider */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                  Budget
                </h3>
                <div className="mb-4">
                  <p className="text-[14px] sm:text-[16px] font-semibold text-[#2789FF]">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </p>
                </div>
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  min={minMaxPrice.min}
                  max={minMaxPrice.max}
                  step={100}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="w-full **:[[role=slider]]:bg-[#2789FF] **:[[role=slider]]:border-[#2789FF] [&>span>span]:bg-[#2789FF]"
                />
                <div className="flex justify-between mt-4 text-[12px] text-[#999FA8]">
                  <span>{formatPrice(minMaxPrice.min)}</span>
                  <span>{formatPrice(minMaxPrice.max)}</span>
                </div>
              </div>

              {/* Price Range Sort */}
              <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                  Price Range
                </h3>
                <p className="text-[12px] text-[#999FA8] mb-3">Price Per Person</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="low-high"
                      checked={priceSort === "low-high"}
                      onCheckedChange={() => handlePriceSortChange("low-high")}
                      className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                    />
                    <Label
                      htmlFor="low-high"
                      className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                    >
                      Low - High
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="high-low"
                      checked={priceSort === "high-low"}
                      onCheckedChange={() => handlePriceSortChange("high-low")}
                      className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                    />
                    <Label
                      htmlFor="high-low"
                      className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                    >
                      High - Low
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="0-1000"
                      checked={priceRange[0] === 0 && priceRange[1] === 1000}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPriceRange([0, 1000]);
                        } else {
                          setPriceRange([minMaxPrice.min, minMaxPrice.max]);
                        }
                      }}
                      className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                    />
                    <Label
                      htmlFor="0-1000"
                      className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                    >
                      0-1000 (INR)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Tour Duration Filter */}
              <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                  Tour Duration
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Less than 06 Nights", value: "less-than-6", count: durationCounts["less-than-6"] },
                    { label: "07 - 09 Nights", value: "7-9", count: durationCounts["7-9"] },
                    { label: "More than 10 Nights", value: "more-than-10", count: durationCounts["more-than-10"] },
                  ].map((duration) => (
                    <div
                      key={duration.value}
                      className="flex items-center gap-3"
                    >
                      <Checkbox
                        id={duration.value}
                        checked={selectedDurations.includes(duration.value)}
                        onCheckedChange={(checked) => handleDurationChange(duration.value, checked as boolean)}
                        className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                      />
                      <Label
                        htmlFor={duration.value}
                        className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                      >
                        {duration.label}
                      </Label>
                      <span className="text-[12px] sm:text-[14px] text-[#A3ABB6] font-semibold">
                        ({duration.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme Filter */}
              <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                  Theme
                </h3>
                <div className="space-y-3">
                  {[
                    "Couple",
                    "Honeymoon",
                    "Family",
                    "Adventure",
                    "Hot Deals",
                  ].map((theme) => (
                    <div key={theme} className="flex items-center gap-3">
                      <Checkbox
                        id={theme}
                        checked={selectedThemes.includes(theme)}
                        onCheckedChange={(checked) => handleThemeChange(theme, checked as boolean)}
                        className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                      />
                      <Label
                        htmlFor={theme}
                        className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                      >
                        {theme}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destinations Filter */}
              {destinationCounts.length > 0 && (
                <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                  <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                    Destinations
                  </h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {destinationCounts.map(([destination, count]) => (
                      <div key={destination} className="flex items-center gap-3">
                        <Checkbox
                          id={`destination-${destination}`}
                          checked={selectedDestinations.includes(destination)}
                          onCheckedChange={(checked) => handleDestinationChange(destination, checked as boolean)}
                          className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                        />
                        <Label
                          htmlFor={`destination-${destination}`}
                          className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                        >
                          {destination}
                        </Label>
                        <span className="text-[12px] sm:text-[14px] text-[#A3ABB6] font-semibold">
                          ({count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Results Grid */}
            <div className="order-1 lg:order-2">
              {/* Results Header */}
              <div className="mb-6 sm:mb-8">
                <p className="text-clr text-[18px] sm:text-[22px] lg:text-[24px] font-light">
                  {filteredPackages.length > 0 ? (
                    <>
                      <span className="font-semibold">
                        {filteredPackages.length}
                      </span>{" "}
                      Holiday Packages Found
                    </>
                  ) : (
                    "No Holiday Packages Found"
                  )}
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="col-span-full flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#E6E6E6] border-r-[#2789FF]" />
                    <p className="mt-3 text-[#666666]">Loading packages...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="col-span-full bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Packages Grid with Pagination */}
              {!loading && filteredPackages.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {getPaginatedPackages().map((pkg) => (
                      <Link
                        key={pkg._id}
                        href={`/holiday/${pkg._id}`}
                        className="block"
                      >
                        <div className="bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 cursor-pointer group">
                          {/* Image Section */}
                          <div className="relative h-[200px] sm:h-60 lg:h-[280px] bg-[#F1F7FF] overflow-hidden">
                            {pkg.themeImg ? (
                              <Image
                                src={pkg.themeImg.path}
                                alt={pkg.packageName}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#F1F7FF] to-[#E6F0FF]">
                                <svg
                                  className="w-12 h-12 text-[#2789FF]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}

                            {/* Badge */}
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-clr text-white text-[12px] sm:text-[14px] font-semibold capitalize">
                              {pkg.packageType}
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-4 sm:p-5">
                            {/* Package Name */}
                            <h4 className="text-[15px] sm:text-[16px] lg:text-[18px] font-semibold text-clr line-clamp-2 mb-2">
                              {pkg.packageName}
                            </h4>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-[12px] sm:text-[14px] text-clr mb-3">
                              <svg
                                width="12"
                                height="16"
                                viewBox="0 0 14 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-clr shrink-0"
                              >
                                <path
                                  d="M7 17s6-4.46 6-10A6 6 0 1 0 1 7c0 5.54 6 10 6 10Z"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  fill="none"
                                />
                                <circle
                                  cx="7"
                                  cy="7"
                                  r="2"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                              </svg>
                              <span className="line-clamp-1">
                                {pkg.destinationCity.join(", ")}
                              </span>
                            </div>

                            {/* Duration */}
                            <div className="text-[12px] sm:text-[14px] text-[#666] mb-3">
                              {pkg.packageDuration.days} Days /{" "}
                              {pkg.packageDuration.nights} Nights
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                              <div className="text-[#EE0405] text-[18px] sm:text-[20px] lg:text-[22px] font-bold leading-none">
                                {formatPrice(getPackagePrice(pkg))}
                              </div>
                              <div className="text-[#999FA8] text-[11px] sm:text-[12px] lg:text-[13px] mt-1">
                                Starting Price
                              </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-[12px] lg:text-[13px] text-clr border-t border-[#E6E6E6] pt-3">
                              <div className="text-center">
                                <div className="font-semibold text-clr capitalize">
                                  {pkg.selectType}
                                </div>
                                <span className="text-[#999FA8]">Type</span>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-clr">
                                  {pkg.itinerary?.length || 0}
                                </div>
                                <span className="text-[#999FA8]">Days</span>
                              </div>
                              <div className="text-center col-span-2">
                                <div className="font-semibold text-clr truncate">
                                  From {pkg.startCity}
                                </div>
                                <span className="text-[#999FA8]">
                                  Starting Point
                                </span>
                              </div>
                            </div>

                            {/* CTA Button */}
                            <button className="w-full mt-4 py-2 sm:py-2.5 bg-[#2789FF] text-white rounded-lg font-medium text-[12px] sm:text-[14px] hover:bg-[#1a73e8] transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {getTotalPages() > 1 && (
                    <div className="flex flex-col items-center gap-6 mt-12 mb-8">
                      <Pagination>
                        <PaginationContent>
                          {/* Previous Button */}
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                              }
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>

                          {/* Page Numbers */}
                          {Array.from({ length: getTotalPages() }).map(
                            (_, index) => {
                              const pageNumber = index + 1;
                              const totalPages = getTotalPages();

                              const showPage =
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                Math.abs(pageNumber - currentPage) <= 1;

                              if (
                                !showPage &&
                                index !== 0 &&
                                index !== totalPages - 1
                              ) {
                                if (
                                  pageNumber === currentPage + 2 ||
                                  pageNumber === currentPage - 2
                                ) {
                                  return (
                                    <PaginationItem
                                      key={`ellipsis-${pageNumber}`}
                                    >
                                      <PaginationEllipsis />
                                    </PaginationItem>
                                  );
                                }
                                return null;
                              }

                              return (
                                <PaginationItem key={pageNumber}>
                                  <PaginationLink
                                    onClick={() => setCurrentPage(pageNumber)}
                                    isActive={currentPage === pageNumber}
                                    className="cursor-pointer"
                                  >
                                    {pageNumber}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            }
                          )}

                          {/* Next Button */}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setCurrentPage(
                                  Math.min(getTotalPages(), currentPage + 1)
                                )
                              }
                              className={
                                currentPage === getTotalPages()
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>

                      {/* Results Info Text */}
                      <p className="text-[#999FA8] text-[13px] sm:text-[14px]">
                        {getResultsText()}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!loading && filteredPackages.length === 0 && !error && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <svg
                    className="w-16 h-16 text-[#CDD4DD] mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-[#666666] text-[14px] sm:text-[16px]">
                    No packages found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Call Back Section */}
        <RequestCallBackSection />
      </main>
    </div>
  );
}

const HolidayPage = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <HolidayContent />
      </Suspense>
      <Footer />
    </>
  );
};

export default HolidayPage;
