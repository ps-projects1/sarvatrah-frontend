// ActivityDetailsSection.tsx
import React from "react";
import ImageCarousel from "./ImageCarousel";
import TourInfoSection from "./TourInfoSection";

interface ActivityDetailsSectionProps {
  id: string;
}

const ActivityDetailsSection = async ({ id }: ActivityDetailsSectionProps) => {
  const activity = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/experience/${id}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  let images = [];

  if (activity.img_link && Array.isArray(activity.img_link)) {
    images = activity.img_link.map((img: any) => {
      const path = img.path;

      // If it's base64, use it directly
      if (path?.startsWith("data:image")) {
        return {
          src: path,
          alt: activity.title,
        };
      }

      // Handle server file paths
      if (
        path?.includes("public") ||
        path?.includes("\\") ||
        path?.includes("activities")
      ) {
        let cleanPath = path.replace(/\\/g, "/"); // Convert backslashes
        cleanPath = cleanPath.replace(/^public\/?/, ""); // Remove "public/" prefix

        const finalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${cleanPath}`;

        return {
          src: finalUrl,
          alt: activity.title,
        };
      }

      // Fallback
      return {
        src: "/logo.svg",
        alt: activity.title,
      };
    });
  } else if (activity.img_link && typeof activity.img_link === "object") {
    images = [
      {
        src: "/logo.svg",
        alt: activity.title,
      },
    ];
  }

  return (
    <div className="pt-6">
      <ImageCarousel images={images} />
      <TourInfoSection activity={activity} />
    </div>
  );
};

export default ActivityDetailsSection;
