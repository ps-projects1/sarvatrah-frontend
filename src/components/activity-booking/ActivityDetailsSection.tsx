"use client";

import React, { useState } from "react";
import { ChevronDown, MapPin, Calendar, Users, Clock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import TravelerForm from "./Travelerform";
import { format } from "date-fns";
import Image from "next/image";

interface ActivityDetailsSectionProps {
  activity: any;
  date: string | null;
  numAdults: number;
  numSeniors: number;
  numChildren: number;
}

interface TravelerData {
  firstName: string;
  lastName: string;
  weight: string;
  weightUnit: string;
  passportNumber: string;
  passportNationality: string;
  passportExpiry: string;
  dateOfBirth: string;
}

export default function ActivityDetailsSection({
  activity,
  date,
  numAdults,
  numSeniors,
  numChildren,
}: ActivityDetailsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [tourLanguage, setTourLanguage] = useState("English - Guide");
  const [specialRequirements, setSpecialRequirements] = useState("");

  // Initialize traveler data
  const [travelers, setTravelers] = useState<{
    adults: TravelerData[];
    seniors: TravelerData[];
    children: TravelerData[];
  }>({
    adults: Array.from({ length: numAdults }, () => ({
      firstName: "",
      lastName: "",
      weight: "",
      weightUnit: "kg",
      passportNumber: "",
      passportNationality: "",
      passportExpiry: "",
      dateOfBirth: "",
    })),
    seniors: Array.from({ length: numSeniors }, () => ({
      firstName: "",
      lastName: "",
      weight: "",
      weightUnit: "kg",
      passportNumber: "",
      passportNationality: "",
      passportExpiry: "",
      dateOfBirth: "",
    })),
    children: Array.from({ length: numChildren }, () => ({
      firstName: "",
      lastName: "",
      weight: "",
      weightUnit: "kg",
      passportNumber: "",
      passportNationality: "",
      passportExpiry: "",
      dateOfBirth: "",
    })),
  });

  const handleTravelerChange = (
    category: "adults" | "seniors" | "children",
    index: number,
    field: string,
    value: string
  ) => {
    setTravelers((prev) => ({
      ...prev,
      [category]: prev[category].map((traveler, i) =>
        i === index ? { ...traveler, [field]: value } : traveler
      ),
    }));
  };

  const getTotalTravelers = () => {
    const parts = [];
    if (numSeniors > 0)
      parts.push(`${numSeniors} Senior${numSeniors > 1 ? "s" : ""}`);
    if (numAdults > 0)
      parts.push(`${numAdults} Adult${numAdults > 1 ? "s" : ""}`);
    if (numChildren > 0)
      parts.push(`${numChildren} Child${numChildren > 1 ? "ren" : ""}`);
    return parts.join(", ");
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Activity details
              </h2>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
            {activity?.images?.[0] && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={activity.images[0]}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-3">
                {activity?.title}
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{getTotalTravelers()}</span>
                </div>

                {date && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(date), "EEE, MMM dd, yyyy • h:mm a")}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-gray-900">
                      Free cancellation
                    </span>{" "}
                    +{" "}
                    <span className="font-semibold text-gray-900">
                      Unlimited rescheduling
                    </span>{" "}
                    <span className="text-gray-600">
                      before{" "}
                      {date &&
                        format(new Date(date), "h:mm a 'on' MMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-600">
                  Details about the{" "}
                  <button className="text-blue-600 underline hover:text-blue-700">
                    experience operator
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {travelers.adults.map((traveler, index) => (
              <TravelerForm
                key={`adult-${index}`}
                type="Adult"
                index={index + 1}
                formData={traveler}
                onChange={(field, value) =>
                  handleTravelerChange("adults", index, field, value)
                }
              />
            ))}

            {travelers.seniors.map((traveler, index) => (
              <TravelerForm
                key={`senior-${index}`}
                type="Senior"
                index={travelers.adults.length + index + 1}
                formData={traveler}
                onChange={(field, value) =>
                  handleTravelerChange("seniors", index, field, value)
                }
              />
            ))}

            {travelers.children.map((traveler, index) => (
              <TravelerForm
                key={`child-${index}`}
                type="Child"
                index={
                  travelers.adults.length + travelers.seniors.length + index + 1
                }
                formData={traveler}
                onChange={(field, value) =>
                  handleTravelerChange("children", index, field, value)
                }
              />
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Meeting point
            </h3>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <MapPin className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
              <p>{activity?.meetingPoint || ""}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tour language
                </label>
                <select
                  value={tourLanguage}
                  onChange={(e) => setTourLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="English - Guide">English - Guide</option>
                  <option value="Hindi - Guide">Hindi - Guide</option>
                  <option value="Spanish - Guide">Spanish - Guide</option>
                  <option value="French - Guide">French - Guide</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special requirements
                </label>
                <textarea
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Any special requests or requirements..."
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {specialRequirements.length}/1000 characters maximum
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
