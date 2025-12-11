import React from "react";
import ImageCarousel from "./ImageCarousel";
import TourInfoSection from "./TourInfoSection";
import { Activity, ActivityImage } from "@/types/activity";
import { experienceService } from "@/lib/services/experienceService";

interface ActivityDetailsSectionProps {
  id: string;
}

interface ImageDisplay {
  src: string;
  alt: string;
}

const ActivityDetailsSection = async ({ id }: ActivityDetailsSectionProps) => {
  let activity: Activity;

  try {
    // Try fetching from experience endpoint
    activity = await experienceService.getExperienceById(id);
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }

  let images: ImageDisplay[] = [];

  if (activity?.img && typeof activity.img === "object") {
    const path = activity.img.path;

    if (path?.startsWith("data:image")) {
      images = [{ src: path, alt: activity?.title || "Activity image" }];
    } else if (
      path?.includes("public") ||
      path?.includes("\\") ||
      path?.includes("/uploads")
    ) {
      let cleanPath = path.replaceAll("\\", "/");
      cleanPath = cleanPath.replace(/^public\/?/, "");
      const finalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${cleanPath}`;
      images = [{ src: finalUrl, alt: activity?.title || "Activity image" }];
    } else {
      images = [{ src: "/logo.svg", alt: activity?.title || "Activity image" }];
    }
  } else if (activity?.img_link && Array.isArray(activity.img_link)) {
    images = activity.img_link.map((img: ActivityImage) => {
      const path = img?.path;

      if (path?.startsWith("data:image")) {
        return { src: path, alt: activity?.title || "Activity image" };
      }

      if (
        path?.includes("public") ||
        path?.includes("\\") ||
        path?.includes("activities")
      ) {
        let cleanPath = path.replaceAll("\\", "/");
        cleanPath = cleanPath.replace(/^public\/?/, "");
        const finalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${cleanPath}`;
        return { src: finalUrl, alt: activity?.title || "Activity image" };
      }

      return { src: "/logo.svg", alt: activity?.title || "Activity image" };
    });
  } else {
    images = [{ src: "/logo.svg", alt: activity?.title || "Activity image" }];
  }

  return (
    <div className="pt-6">
      <ImageCarousel images={images} />
      <TourInfoSection activity={activity} />
    </div>
  );
};

export default ActivityDetailsSection;
