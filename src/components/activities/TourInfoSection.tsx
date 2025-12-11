"use client";

import { MapPin, Clock, Users, Bus, CheckCircle } from "lucide-react";
import Link from "next/link";
import PricingCard from "./PricingCard";
import { Activity, Experience } from "@/types/activity";

interface TourInfoSectionProps {
  activity: Activity | Experience;
}

const TourInfoSection = ({ activity }: TourInfoSectionProps) => {

  const formatDuration = (duration?: number | string) => {
    if (!duration) return "TBD";


    if (typeof duration === 'string') return duration;


    if (typeof duration === 'number') {
      if (duration < 24) {
        return `${duration} hour${duration !== 1 ? 's' : ''}`;
      }
      const days = Math.floor(duration / 24);
      const remainingHours = duration % 24;
      if (remainingHours === 0) {
        return `${days} day${days !== 1 ? 's' : ''}`;
      }
      return `${days} day${days !== 1 ? 's' : ''} ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`;
    }

    return "TBD";
  };
  return (
    <div className="min-h-screen bg-[#F1F4F8] pt-5">
      <div className="max-w-7xl mx-auto pt-4 px-4">
        
        <div className="flex flex-col pb-6">
          <h2 className="font-roboto text-clr text-bold text-4xl">
            {activity.title}
          </h2>
          <div className="flex gap-2 pt-3">
            <MapPin />
            <h3 className="font-roboto text-clr">
              {activity.location?.address ||
               (activity.location?.city && activity.location?.state
                 ? `${activity.location.city}, ${activity.location.state}`
                 : "Location not available")}
            </h3>
            {(activity.location?.latitude && activity.location?.longitude) ? (
              <Link
                href={`https://www.google.com/maps?q=${activity.location.latitude},${activity.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-roboto"
              >
                View on map.
              </Link>
            ) : (activity.location?.location && (
              <Link
                href={activity.location.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-roboto"
              >
                View on map.
              </Link>
            ))}
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="filter-[drop-shadow(0_4px_30px_rgba(0,0,0,0.08))] pt-4">
                
                <div className="bg-[#F1F7FF] w-full pt-6 pb-6 px-6">
                  <div className="mb-6">
                    <h2 className="text-clr font-roboto text-2xl font-semibold">
                      Tour snapshot
                    </h2>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <div className="text-lg font-semibold text-clr">
                        {formatDuration(activity.duration)}
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-2 pl-6">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-5 h-5" />
                        <span className="text-sm">Group size</span>
                      </div>
                      <div className="text-lg font-semibold text-clr">
                        {activity.groupSize}
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Bus className="w-5 h-5" />
                        <span className="text-sm">Travel Facility</span>
                      </div>
                      <div className="text-lg font-semibold text-clr">
                        {(activity as Activity).publicTransportUsed && (activity as Activity).publicTransportUsed!.length > 0
                          ? (activity as Activity).publicTransportUsed!.join(", ")
                          : activity.traveller_facilty === "meet_on_location"
                          ? "Meet on Location"
                          : activity.traveller_facilty === "pickup_available"
                          ? "Pickup Available"
                          : "Not Available"}
                      </div>
                    </div>

                    
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
                  
                  <div className="bg-white p-6">
                    
                    <div className="mb-6">
                      <h3 className="text-clr font-roboto text-xl font-semibold mb-3">
                        Overview
                      </h3>

                      {(activity as Activity)?.overview && typeof (activity as Activity).overview === 'string' && (
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {(activity as Activity).overview}
                        </p>
                      )}
                      {activity?.description && typeof activity.description === 'string' && (
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {activity.description}
                        </p>
                      )}
                      
                      {activity?.description && typeof activity.description === 'object' && (
                        <>
                          {activity.description.short_des && (
                            <p className="text-gray-700 text-sm leading-relaxed mb-2">
                              {activity.description.short_des}
                            </p>
                          )}
                          {activity.description.detail_dec && activity.description.detail_dec !== "<p><br></p>" && (
                            <div className="text-gray-700 text-sm leading-relaxed">
                              {activity.description.detail_dec}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    
                    <div className="grid grid-cols-2 gap-8 mb-6">
                      
                      <div>
                        <h3 className="text-clr font-roboto text-base font-semibold mb-3">
                          Available languages
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {(activity as Activity)?.availableLanguages && (activity as Activity).availableLanguages!.length > 0
                            ? (activity as Activity).availableLanguages!.join(", ")
                            : "English"}
                        </p>
                      </div>


                      <div>
                        <h3 className="text-clr font-roboto text-base font-semibold mb-3">
                          Cancellation policy
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {(activity as Activity)?.cancellationPolicy?.policyDescription ? (
                            (activity as Activity).cancellationPolicy!.policyDescription
                          ) : (activity as Activity)?.cancellationPolicy ? (
                            `${(activity as Activity).cancellationPolicy!.isRefundable ? 'Refundable' : 'Non-refundable'}${
                              (activity as Activity).cancellationPolicy!.refundPercentage
                                ? ` - ${(activity as Activity).cancellationPolicy!.refundPercentage}% refund`
                                : ''
                            }${
                              (activity as Activity).cancellationPolicy!.cancellationWindowHours
                                ? ` if canceled ${(activity as Activity).cancellationPolicy!.cancellationWindowHours} hours before`
                                : ''
                            }`
                          ) : (
                            'For a full refund, cancel at least 24 hours in advance of the start date of the experience.'
                          )}
                        </p>
                      </div>
                    </div>


                    {(activity as Activity)?.targetPlaces && (activity as Activity).targetPlaces!.length > 0 && (
                      <div className="mb-6 border-b border-[#EBEBEB] pb-8">
                        <h3 className="text-clr font-roboto text-xl font-semibold mb-3">
                          Target Places
                        </h3>
                        <ul className="space-y-2">
                          {(activity as Activity).targetPlaces!.map((place: string, index: number) => (
                            <li key={index} className="text-gray-700 text-sm flex items-start">
                              <span className="mr-2">•</span>
                              <span>{place}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    
                    <div className="border-b border-[#EBEBEB] pb-8">
                      <h3 className="text-clr font-roboto text-xl font-semibold mb-3">
                        What&apos;s included
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        
                        <div className="space-y-2">

                          {(activity as Activity)?.included && Array.isArray((activity as Activity).included) && (activity as Activity).included!.length > 0 ? (
                            (activity as Activity).included!.map((item: string, index: number) => (
                              <div key={`inc-${index}`} className="flex items-start text-sm">
                                <span className="text-green-600 mr-2 mt-0.5">✓</span>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))
                          ) : activity?.inclusions ? (
                            
                            <>
                              <div className="flex items-start text-sm">
                                <span className="text-green-600 mr-2 mt-0.5">✓</span>
                                <span className="text-gray-700">{activity.inclusions.short_des}</span>
                              </div>
                              {activity.inclusions.detail_dec && activity.inclusions.detail_dec !== "<p><br></p>" && (
                                <div className="flex items-start text-sm">
                                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                                  <div className="text-gray-700">
                                    {activity.inclusions.detail_dec}
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex items-start text-sm">
                              <span className="text-gray-700">No inclusions specified</span>
                            </div>
                          )}
                        </div>



                        <div className="space-y-2">

                          {(activity as Activity)?.excluded && Array.isArray((activity as Activity).excluded) && (activity as Activity).excluded!.length > 0 ? (
                            (activity as Activity).excluded!.map((item: string, index: number) => (
                              <div key={`exc-${index}`} className="flex items-start text-sm">
                                <span className="text-red-600 mr-2 mt-0.5">✕</span>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))
                          ) : activity?.exclusions ? (
                            
                            <>
                              <div className="flex items-start text-sm">
                                <span className="text-red-600 mr-2 mt-0.5">✕</span>
                                <span className="text-gray-700">{activity.exclusions.short_des}</span>
                              </div>
                              {activity.exclusions.detail_dec && activity.exclusions.detail_dec !== "<p><br></p>" && (
                                <div className="flex items-start text-sm">
                                  <span className="text-red-600 mr-2 mt-0.5">✕</span>
                                  <div className="text-gray-700">
                                    {activity.exclusions.detail_dec}
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex items-start text-sm">
                              <span className="text-gray-700">No exclusions specified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    
                    {(activity.location?.latitude && activity.location?.longitude) ||
                     (activity.location?.location && activity.location.location.includes("iframe")) ? (
                      <div className="pt-6">
                        <h3 className="text-clr font-roboto text-xl font-semibold mb-4">
                          Activity&apos;s Location
                        </h3>

                        <div className="w-full h-[300px] rounded-lg overflow-hidden">
                          {activity.location?.latitude && activity.location?.longitude ? (
                            
                            <iframe
                              src={`https://www.google.com/maps?q=${activity.location.latitude},${activity.location.longitude}&output=embed`}
                              width="100%"
                              height="100%"
                              title="Activity Location Map"
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
                          ) : activity.location?.location ? (
                            
                            <iframe
                              src={activity.location.location.match(/src="([^"]+)"/)?.[1] || ""}
                              width="100%"
                              height="100%"
                              title="Activity Location Map"
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
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-1">
              <div className=" top-4 pt-4">
                <PricingCard activity={activity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourInfoSection;
