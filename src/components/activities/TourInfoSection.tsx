"use client";

import React, { act } from "react";
import { MapPin, Clock, Users, Bus, CheckCircle } from "lucide-react";
import Link from "next/link";
import PricingCard from "./PricingCard";

interface TourInfoSectionProps {
  activity: any;
}

const TourInfoSection = ({ activity }: TourInfoSectionProps) => {
  // Add this function inside your component
  const getFirstImage = (activity: any) => {
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
  return (
    <>
      <div className="min-h-screen bg-[#F1F4F8] pt-5">
        <div className="max-w-7xl mx-auto pt-4 px-4">
          {/* Title and Map Link */}
          <div className="flex flex-col pb-6">
            <h2 className="font-roboto text-clr text-bold text-4xl">
              {activity.title}
            </h2>
            <div className="flex gap-2 pt-3">
              <MapPin />
              <h3 className="font-roboto text-clr">
                {activity.location.city},&nbsp; {activity.location.state}.
              </h3>
              <Link
                href={activity.location.location}
                className="text-blue-500 font-roboto"
              >
                View on map.
              </Link>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="filter-[drop-shadow(0_4px_30px_rgba(0,0,0,0.08))] pt-4">
                  {/* first section */}
                  <div className="bg-[#F1F7FF] w-full pt-6 pb-6 px-6">
                    <div className="mb-6">
                      <h2 className="text-clr font-roboto text-2xl font-semibold">
                        Tour snapshot
                      </h2>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                      {/* Duration */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-5 h-5" />
                          <span className="text-sm">Duration</span>
                        </div>
                        <div className="text-lg font-semibold text-clr">
                          {activity.duration}
                        </div>
                      </div>

                      {/* Group size */}
                      <div className="flex flex-col gap-2 pl-6">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users className="w-5 h-5" />
                          <span className="text-sm">Group size</span>
                        </div>
                        <div className="text-lg font-semibold text-clr">
                          {activity.groupSize}
                        </div>
                      </div>

                      {/* Travel Facility */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Bus className="w-5 h-5" />
                          <span className="text-sm">Travel Facility</span>
                        </div>
                        <div className="text-lg font-semibold text-clr">
                          {activity.traveller_facilty === "meet_on_location"
                            ? "Meet on Location"
                            : "Pickup Available"}
                        </div>
                      </div>

                      {/* Cancellation */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm">Cancellation</span>
                        </div>
                        <Link
                          href="#"
                          className="text-lg font-semibold text-blue-500 hover:underline capitalize"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="pb-2">
                    {/* second section */}
                    <div className="bg-white p-6">
                      {/* Overview */}
                      <div className="mb-6">
                        <h3 className="text-clr font-roboto text-xl font-semibold mb-3">
                          Overview
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {activity.description.short_des}
                        </p>
                        <div
                          className="text-gray-700 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: activity.description.detail_dec,
                          }}
                        />
                        <Link
                          href="#"
                          className="text-blue-500 text-sm font-semibold hover:underline"
                        >
                          More
                        </Link>
                      </div>

                      {/* Two columns section */}
                      <div className="grid grid-cols-2 gap-8 mb-6">
                        {/* Available languages - HARDCODED */}
                        <div>
                          <h3 className="text-clr font-roboto text-base font-semibold mb-3">
                            Available languages
                          </h3>
                          <p className="text-gray-700 text-sm">
                            German, Chinese, Portuguese, Japanese, English,
                            Italian, Chinese, French, Spanish
                          </p>
                        </div>

                        {/* Cancellation policy */}
                        <div>
                          <h3 className="text-clr font-roboto text-base font-semibold mb-3">
                            Cancellation policy
                          </h3>
                          <p className="text-gray-700 text-sm">
                            For a full refund, cancel at least 24 hours in
                            advance of the start date of the experience.
                          </p>
                        </div>
                      </div>

                      {/* Highlights - HARDCODED */}
                      <div className="mb-6 border-b border-[#EBEBEB] pb-8">
                        <h3 className="text-clr font-roboto text-xl font-semibold mb-3">
                          Highlights
                        </h3>
                        <ul className="space-y-2">
                          <li className="text-gray-700 text-sm flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              Travel between the UNESCO World Heritage sites
                              aboard a comfortable coach
                            </span>
                          </li>
                          <li className="text-gray-700 text-sm flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              Explore with a guide to delve deeper into the
                              history
                            </span>
                          </li>
                          <li className="text-gray-700 text-sm flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              Great for history buffs and travelers with limited
                              time
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* What's included */}
                      <div className="border-b border-[#EBEBEB] pb-8">
                        <h3 className="text-clr font-roboto text-xl font-semibold mb-3">
                          What's included
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Inclusions */}
                          <div className="space-y-2">
                            <div className="flex items-start text-sm">
                              <span className="text-green-600 mr-2 mt-0.5">
                                ✓
                              </span>
                              <span className="text-gray-700">
                                {activity.inclusions.short_des}
                              </span>
                            </div>
                            {activity.inclusions.detail_dec &&
                              activity.inclusions.detail_dec !==
                                "<p><br></p>" && (
                                <div className="flex items-start text-sm">
                                  <span className="text-green-600 mr-2 mt-0.5">
                                    ✓
                                  </span>
                                  <div
                                    className="text-gray-700"
                                    dangerouslySetInnerHTML={{
                                      __html: activity.inclusions.detail_dec,
                                    }}
                                  />
                                </div>
                              )}
                          </div>

                          {/* Exclusions */}
                          <div className="space-y-2">
                            <div className="flex items-start text-sm">
                              <span className="text-red-600 mr-2 mt-0.5">
                                ✕
                              </span>
                              <span className="text-gray-700">
                                {activity.exclusions.short_des}
                              </span>
                            </div>
                            {activity.exclusions.detail_dec &&
                              activity.exclusions.detail_dec !==
                                "<p><br></p>" && (
                                <div className="flex items-start text-sm">
                                  <span className="text-red-600 mr-2 mt-0.5">
                                    ✕
                                  </span>
                                  <div
                                    className="text-gray-700"
                                    dangerouslySetInnerHTML={{
                                      __html: activity.exclusions.detail_dec,
                                    }}
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* map */}

                      {activity.location?.location &&
                        activity.location.location.includes("iframe") &&
                        activity.location.location.match(
                          /src="([^"]+)"/
                        )?.[1] && (
                          <div className=" pt-6">
                            <h3 className="text-clr font-roboto text-xl font-semibold mb-4">
                              Activity's Location
                            </h3>

                            <div className="w-full h-[300px] rounded-lg overflow-hidden">
                              <iframe
                                src={
                                  activity.location.location.match(
                                    /src="([^"]+)"/
                                  )?.[1] || ""
                                }
                                width="100%"
                                height="100%"
                                style={{
                                  border: 0,
                                  width: "100%",
                                  height: "100%",
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full rounded-lg"
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing Box (Takes 1/3 width) */}
              <div className="lg:col-span-1">
                <div className=" top-4 pt-4">
                  <PricingCard activity={activity} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourInfoSection;
