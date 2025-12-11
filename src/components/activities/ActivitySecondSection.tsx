"use client";
import React, { useEffect, useState, useMemo } from "react";
import ActivityCardSection from "./ActivityCardSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { experienceService } from "@/lib/services/experienceService";
import { Experience } from "@/types/activity";

interface ActivitySecondSectionProps {
  searchQuery?: string;
}

const ActivitySecondSection: React.FC<ActivitySecondSectionProps> = ({
  searchQuery = "",
}) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minMaxPrice, setMinMaxPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 10000,
  });
  const [priceSort, setPriceSort] = useState<"" | "low-high" | "high-low">("");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  // Calculate price range from experiences
  const calculatePriceRange = (experienceList: Experience[]) => {
    if (experienceList.length === 0) return { min: 0, max: 10000 };

    const prices = experienceList.flatMap((e) =>
      e.pricing?.map((p) => p.price) || []
    );

    if (prices.length === 0) return { min: 0, max: 10000 };

    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));

    return { min, max };
  };

  // Fetch experiences on mount
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getAllExperiences();
        setExperiences(data);
        setFilteredExperiences(data);

        const priceStats = calculatePriceRange(data);
        setMinMaxPrice(priceStats);
        setPriceRange([priceStats.min, priceStats.max]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Get all unique destinations
  const allDestinations = useMemo(() => {
    const destinations = new Map<string, number>();
    experiences.forEach((exp) => {
      if (exp.location?.city) {
        const city = exp.location.city;
        destinations.set(city, (destinations.get(city) || 0) + 1);
      }
      exp.meeting_point?.forEach((mp) => {
        if (mp.city) {
          destinations.set(mp.city, (destinations.get(mp.city) || 0) + 1);
        }
      });
    });
    return Array.from(destinations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [experiences]);

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    experiences.forEach((exp) => {
      exp.category_theme?.category?.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories).sort();
  }, [experiences]);

  // Get experience price
  const getExperiencePrice = (exp: Experience): number => {
    if (!exp.pricing || exp.pricing.length === 0) return 0;
    return Math.min(...exp.pricing.map((p) => p.price));
  };

  // Get duration in hours
  const getDurationInHours = (duration?: string): number => {
    if (!duration) return 0;
    const parts = duration.split(":");
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    return hours + minutes / 60;
  };

  // Apply filters
  useEffect(() => {
    let filtered = experiences;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((exp) => {
        return (
          exp.title?.toLowerCase().includes(query) ||
          exp.location?.city?.toLowerCase().includes(query) ||
          exp.location?.state?.toLowerCase().includes(query) ||
          exp.meeting_point?.some(
            (mp) =>
              mp.city?.toLowerCase().includes(query) ||
              mp.address?.toLowerCase().includes(query)
          )
        );
      });
    }

    // Price filter
    const hasUserChangedPriceRange =
      priceRange[0] !== minMaxPrice.min || priceRange[1] !== minMaxPrice.max;
    if (hasUserChangedPriceRange) {
      filtered = filtered.filter((exp) => {
        const price = getExperiencePrice(exp);
        if (price === 0) return true;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Duration filter
    if (selectedDurations.length > 0) {
      filtered = filtered.filter((exp) => {
        const hours = getDurationInHours(exp.duration);
        return selectedDurations.some((duration) => {
          if (duration === "0-2") return hours >= 0 && hours <= 2;
          if (duration === "half-day") return hours > 2 && hours <= 6;
          if (duration === "full-day") return hours > 6;
          return false;
        });
      });
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((exp) => {
        if (!exp.category_theme?.category) return false;
        return selectedCategories.some((cat) =>
          exp.category_theme?.category?.some(
            (expCat) => expCat.toLowerCase() === cat.toLowerCase()
          )
        );
      });
    }

    // Destination filter
    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((exp) => {
        return selectedDestinations.some(
          (dest) =>
            exp.location?.city?.toLowerCase() === dest.toLowerCase() ||
            exp.meeting_point?.some(
              (mp) => mp.city?.toLowerCase() === dest.toLowerCase()
            )
        );
      });
    }

    // Price sort
    if (priceSort === "low-high") {
      filtered = [...filtered].sort(
        (a, b) => getExperiencePrice(a) - getExperiencePrice(b)
      );
    } else if (priceSort === "high-low") {
      filtered = [...filtered].sort(
        (a, b) => getExperiencePrice(b) - getExperiencePrice(a)
      );
    }

    setFilteredExperiences(filtered);
    setCurrentPage(1);
  }, [
    experiences,
    searchQuery,
    priceRange,
    selectedDurations,
    selectedCategories,
    selectedDestinations,
    priceSort,
    minMaxPrice,
  ]);

  // Pagination helpers
  const getTotalPages = (): number => {
    return Math.ceil(filteredExperiences.length / itemsPerPage);
  };

  const getPaginatedExperiences = (): Experience[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredExperiences.slice(startIndex, endIndex);
  };

  const getResultsText = (): string => {
    const totalPages = getTotalPages();
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(
      currentPage * itemsPerPage,
      filteredExperiences.length
    );

    if (totalPages === 0) return "No experiences found";

    return `${startItem} – ${endItem} of ${filteredExperiences.length} experiences found`;
  };

  // Helper functions
  const getFirstImage = (exp: Experience) => {
    try {
      if (exp.img_link && Array.isArray(exp.img_link)) {
        const firstImg = exp.img_link[0];

        if (firstImg && firstImg.path) {
          const path = firstImg.path;

          if (path.startsWith("data:image")) {
            return path;
          }

          if (
            path.includes("public") ||
            path.includes("\\") ||
            path.includes("activities")
          ) {
            let cleanPath = path.replace(/\\/g, "/");
            cleanPath = cleanPath.replace(/^public\/?/, "");
            const finalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${cleanPath}`;
            return finalUrl;
          }

          return `data:image/jpeg;base64,${path}`;
        }
      }
    } catch (e) {
      console.error("Error processing image:", e);
    }

    return "/logo.svg";
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return "TBD";
    const parts = duration.split(":");
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return duration;
  };

  const calculateBadge = (duration?: string) => {
    if (!duration) return "";
    const hours = parseInt(duration.split(":")[0]) || 0;
    if (hours === 0) return "";
    const days = Math.ceil(hours / 24);
    const nights = days > 0 ? days - 1 : 0;
    return `${days}D - ${nights}N`;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Event handlers
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handlePriceSortChange = (sort: "low-high" | "high-low") => {
    setPriceSort(priceSort === sort ? "" : sort);
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    setSelectedDurations((prev) =>
      checked ? [...prev, duration] : prev.filter((d) => d !== duration)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const handleDestinationChange = (destination: string, checked: boolean) => {
    setSelectedDestinations((prev) =>
      checked ? [...prev, destination] : prev.filter((d) => d !== destination)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#E6E6E6] border-r-[#2789FF]" />
          <p className="mt-3 text-[#666666]">Loading experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[337px_1fr] gap-6 sm:gap-8 lg:gap-10">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1">
            {/* Budget Filter */}
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

            {/* Duration Filter */}
            <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                Duration
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="duration-0-2"
                    checked={selectedDurations.includes("0-2")}
                    onCheckedChange={(checked) =>
                      handleDurationChange("0-2", checked as boolean)
                    }
                    className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                  />
                  <Label
                    htmlFor="duration-0-2"
                    className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                  >
                    0-2 Hours
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="duration-half-day"
                    checked={selectedDurations.includes("half-day")}
                    onCheckedChange={(checked) =>
                      handleDurationChange("half-day", checked as boolean)
                    }
                    className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                  />
                  <Label
                    htmlFor="duration-half-day"
                    className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                  >
                    Half Day Tour
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="duration-full-day"
                    checked={selectedDurations.includes("full-day")}
                    onCheckedChange={(checked) =>
                      handleDurationChange("full-day", checked as boolean)
                    }
                    className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                  />
                  <Label
                    htmlFor="duration-full-day"
                    className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                  >
                    Full Day Tour
                  </Label>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            {allCategories.length > 0 && (
              <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                  Category
                </h3>
                <div className="space-y-3">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center gap-3">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category, checked as boolean)
                        }
                        className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Destinations Filter */}
            {allDestinations.length > 0 && (
              <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                  Destinations
                </h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {allDestinations.map(([destination, count]) => (
                    <div key={destination} className="flex items-center gap-3">
                      <Checkbox
                        id={`destination-${destination}`}
                        checked={selectedDestinations.includes(destination)}
                        onCheckedChange={(checked) =>
                          handleDestinationChange(destination, checked as boolean)
                        }
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

          {/* Main Content */}
          <div className="order-1 lg:order-2">
            {/* Results count */}
            <div className="mb-6 sm:mb-8">
              <p className="text-clr text-[18px] sm:text-[22px] lg:text-[24px] font-light">
                {filteredExperiences.length > 0 ? (
                  <>
                    <span className="font-semibold">
                      {filteredExperiences.length}
                    </span>{" "}
                    {searchQuery
                      ? `Experiences Found for "${searchQuery}"`
                      : "Experiences Found"}
                  </>
                ) : (
                  "No Experiences Found"
                )}
              </p>
            </div>

            {/* Experience Cards */}
            {!loading && filteredExperiences.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {getPaginatedExperiences().map((exp) => (
                    <ActivityCardSection
                      id={exp._id}
                      key={exp._id}
                      title={exp.title || "Untitled"}
                      locationFrom={exp.location?.city || "Unknown"}
                      locationTo={exp.location?.state || "Unknown"}
                      duration={formatDuration(exp.duration)}
                      startLocation={exp.meeting_point?.[0]?.city || "TBD"}
                      currentPrice={getExperiencePrice(exp)}
                      image={getFirstImage(exp)}
                      badge={calculateBadge(exp.duration)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {getTotalPages() > 1 && (
                  <div className="flex flex-col items-center gap-6 mt-12 mb-8">
                    <Pagination>
                      <PaginationContent>
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
                                  <PaginationItem key={`ellipsis-${pageNumber}`}>
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

                    <p className="text-[#999FA8] text-[13px] sm:text-[14px]">
                      {getResultsText()}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!loading && filteredExperiences.length === 0 && !error && (
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
                  No experiences found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySecondSection;
