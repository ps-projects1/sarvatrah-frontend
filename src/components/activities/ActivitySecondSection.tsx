"use client";
import React, { useEffect, useState, useMemo } from "react";
import ActivityCardSection from "./ActivityCardSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ActivityData {
  _id: string;
  title: string;
  location?: {
    location: string;
    city: string;
    state: string;
  };
  duration?: string;
  meeting_point: Array<{
    city: string;
    address: string;
  }>;
  pricing: Array<{
    price: number;
    ticket_category: string;
  }>;
  img_link: Array<{
    filename?: string | null;
    path: string;
    mimetype?: string | null;
  }>;
  category?: string;
}

interface ActivitySecondSectionProps {
  searchQuery?: string;
}

const ActivitySecondSection: React.FC<ActivitySecondSectionProps> = ({
  searchQuery = "",
}) => {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minMaxPrice, setMinMaxPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 10000,
  });
  const [priceSort, setPriceSort] = useState<"" | "low-high" | "high-low">("");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );


  const calculatePriceRange = (activityList: ActivityData[]) => {
    if (activityList.length === 0) return { min: 0, max: 10000 };

    const prices = activityList.flatMap((a) => a.pricing.map((p) => p.price));

    if (prices.length === 0) return { min: 0, max: 10000 };

    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));

    return { min, max };
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/experience`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data);

        const priceStats = calculatePriceRange(data);
        setMinMaxPrice(priceStats);
        setPriceRange([priceStats.min, priceStats.max]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);


  const allDestinations = useMemo(() => {
    const destinations = new Set<string>();
    activities.forEach((activity) => {
      if (activity.location?.city) destinations.add(activity.location.city);
      if (activity.location?.state) destinations.add(activity.location.state);
      activity.meeting_point?.forEach((mp) => {
        if (mp.city) destinations.add(mp.city);
      });
    });
    return Array.from(destinations).sort();
  }, [activities]);


  const getActivityPrice = (activity: ActivityData): number => {
    return activity.pricing?.[0]?.price || 0;
  };


  const getDurationInHours = (duration?: string): number => {
    if (!duration) return 0;
    const parts = duration.split(":");
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    return hours + minutes / 60;
  };


  const filteredActivities = useMemo(() => {
    let filtered = activities;


    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((activity) => {
        return (
          activity.title?.toLowerCase().includes(query) ||
          activity.location?.city?.toLowerCase().includes(query) ||
          activity.location?.state?.toLowerCase().includes(query) ||
          activity.meeting_point?.some(
            (mp) =>
              mp.city?.toLowerCase().includes(query) ||
              mp.address?.toLowerCase().includes(query)
          )
        );
      });
    }


    filtered = filtered.filter((activity) => {
      const price = getActivityPrice(activity);
      return price >= priceRange[0] && price <= priceRange[1];
    });


    if (selectedDurations.length > 0) {
      filtered = filtered.filter((activity) => {
        const hours = getDurationInHours(activity.duration);
        return selectedDurations.some((duration) => {
          if (duration === "0-2") return hours >= 0 && hours <= 2;
          if (duration === "half-day") return hours > 2 && hours <= 6;
          if (duration === "full-day") return hours > 6;
          return false;
        });
      });
    }


    if (selectedCategories.length > 0) {
      filtered = filtered.filter((activity) => {
        if (!activity.category) return false;
        return selectedCategories.some((cat) =>
          activity.category?.toLowerCase().includes(cat.toLowerCase())
        );
      });
    }


    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((activity) => {
        return selectedDestinations.some(
          (dest) =>
            activity.location?.city?.toLowerCase() === dest.toLowerCase() ||
            activity.location?.state?.toLowerCase() === dest.toLowerCase() ||
            activity.meeting_point?.some(
              (mp) => mp.city?.toLowerCase() === dest.toLowerCase()
            )
        );
      });
    }


    if (priceSort === "low-high") {
      filtered = [...filtered].sort(
        (a, b) => getActivityPrice(a) - getActivityPrice(b)
      );
    } else if (priceSort === "high-low") {
      filtered = [...filtered].sort(
        (a, b) => getActivityPrice(b) - getActivityPrice(a)
      );
    }

    return filtered;
  }, [
    activities,
    searchQuery,
    priceRange,
    selectedDurations,
    selectedCategories,
    selectedDestinations,
    priceSort,
  ]);

  const getFirstImage = (activity: ActivityData) => {
    try {
      if (activity.img_link && Array.isArray(activity.img_link)) {
        const firstImg = activity.img_link[0];

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[337px_1fr] gap-6 sm:gap-8 lg:gap-10">
          
          <aside className="order-2 lg:order-1">
            
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

            
            <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                Price Range
              </h3>
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

            
            <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                Category
              </h3>
              <div className="space-y-3">
                {[
                  "Ticket & Attraction",
                  "City Tour",
                  "Water Sports",
                  "Adventure",
                  "Hot Deals",
                  "Top destinations",
                  "Activities near you",
                ].map((category) => (
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

            
            {allDestinations.length > 0 && (
              <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border border-[#E6E6E6]">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-clr mb-4">
                  Destinations
                </h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {allDestinations.slice(0, 10).map((destination) => (
                    <div key={destination} className="flex items-center gap-3">
                      <Checkbox
                        id={`destination-${destination}`}
                        checked={selectedDestinations.includes(destination)}
                        onCheckedChange={(checked) =>
                          handleDestinationChange(
                            destination,
                            checked as boolean
                          )
                        }
                        className="w-4 sm:w-[18px] h-4 sm:h-[18px] border-2 border-[#CDD4DD]"
                      />
                      <Label
                        htmlFor={`destination-${destination}`}
                        className="flex-1 text-[14px] sm:text-[16px] text-clr cursor-pointer font-normal"
                      >
                        {destination}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          
          <div className="order-1 lg:order-2">
            
            <div className="mb-6 sm:mb-8">
              <h2 className="text-clr text-[18px] sm:text-[22px] lg:text-[24px] font-light">
                {filteredActivities.length > 0 ? (
                  <>
                    <span className="font-semibold">
                      {filteredActivities.length}
                    </span>{" "}
                    {searchQuery
                      ? `Activities Found for "${searchQuery}"`
                      : "Activities Found"}
                  </>
                ) : (
                  "No Activities Found"
                )}
              </h2>
            </div>

            
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-[#CDD4DD] mb-4 mx-auto"
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
                <p className="text-gray-500 text-lg">
                  No activities found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredActivities.map((activity) => (
                  <ActivityCardSection
                    id={activity._id}
                    key={activity._id}
                    title={activity.title || "Untitled"}
                    locationFrom={activity.location?.city || "Unknown"}
                    locationTo={activity.location?.state || "Unknown"}
                    duration={formatDuration(activity.duration)}
                    startLocation={activity.meeting_point[0]?.city || "TBD"}
                    currentPrice={activity.pricing[0]?.price || 0}
                    image={getFirstImage(activity)}
                    badge={calculateBadge(activity.duration)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySecondSection;
