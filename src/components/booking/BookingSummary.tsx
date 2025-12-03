import React from "react";
import {
  Car,
  Building2,
  Utensils,
  MapPin,
  AlertCircle,
  Activity,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DestinationCity } from "@/types/holiday";

interface Activity {
  type: string;
  title: string;
  description: string;
  duration: string;
}

interface Transport {
  type: string;
  details: string;
}

interface Itinerary {
  dayNo: number;
  title: string;
  subtitle: string;
  description: string;
  stay: boolean;
  hotel_id?: string;
  state?: string;
  city?: string;
  mealsIncluded: string[];
  transport?: Transport;
  placesToVisit?: string[];
  activities: Activity[];
  notes?: string;
}

interface PackageData {
  packageName: string;
  packageDuration: {
    days: number;
    nights: number;
  };
  destinationCity: (string | DestinationCity)[];
  startCity: string;
  packageType: string;
  selectType: string;
  highlights: string;
  include: string;
  exclude: string;
  itinerary: Itinerary[];
  packagePrice?: number;
}

interface BookingSummaryProps {
  packageData: PackageData;
}

const BookingSummary = ({ packageData }: BookingSummaryProps) => {
  return (
    <>
      <div>
        <Accordion type="single" collapsible className="w-full">
          {packageData.itinerary.map((day) => (
            <AccordionItem key={day.dayNo} value={`day-${day.dayNo}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left w-full">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {day.dayNo}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{day.title}</p>
                    <p className="text-sm text-gray-500">{day.subtitle}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="ml-14 space-y-4 pt-2">
                  
                  {day.transport && (
                    <div className="flex gap-3">
                      <Car className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Transportation
                        </p>
                        <p className="text-sm text-gray-600">
                          {day.transport.type} - {day.transport.details}
                        </p>
                      </div>
                    </div>
                  )}

                  
                  {day.stay && (
                    <div className="flex gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Accommodation
                        </p>
                        <p className="text-sm text-gray-600">
                          Check-in at hotel in {typeof day.city === 'string' ? day.city : day.city?.name}
                        </p>
                      </div>
                    </div>
                  )}

                  
                  {day.placesToVisit && day.placesToVisit.length > 0 && (
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Places to Visit
                        </p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {day.placesToVisit.map((place, idx) => (
                            <li key={idx}>{place}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  
                  {day.activities && day.activities.length > 0 && (
                    <div className="flex gap-3">
                      <Activity className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Activities
                        </p>
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="text-sm text-gray-600 mb-2">
                            <p className="font-medium">{activity.title}</p>
                            <p>{activity.description}</p>
                            <p className="text-xs text-gray-500">
                              Duration: {activity.duration}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  
                  {day.mealsIncluded && day.mealsIncluded.length > 0 && (
                    <div className="flex gap-3">
                      <Utensils className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Meals Included
                        </p>
                        <p className="text-sm text-gray-600">
                          {day.mealsIncluded.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  
                  {day.notes && (
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Note
                        </p>
                        <p className="text-sm text-gray-600">{day.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default BookingSummary;
