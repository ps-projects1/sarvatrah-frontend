"use client";
import React, { useEffect, useState } from "react";
import ActivityCardSection from "./ActivityCardSection";

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
}

const ActivitySecondSection = () => {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

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
    } catch (e) {}

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
    <div className="w-full min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Popular Activities</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
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
      </div>
    </div>
  );
};

export default ActivitySecondSection;
