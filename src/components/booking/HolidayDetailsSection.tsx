"use client";

import React, { useState } from "react";
import { ChevronDown, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface HolidayDetailsSectionProps {
  packageData: {
    id: string;
    name: string | null;
    price: string | null;
    days: string | null;
    nights: string | null;
  };
  isOpen?: boolean;
  onToggle?: () => void;
  onNext?: () => void;
}

export default function HolidayDetailsSection({
  packageData,
  isOpen: externalIsOpen,
  onToggle,
  onNext,
}: HolidayDetailsSectionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [formData, setFormData] = useState({

    leadFirstName: "",
    leadLastName: "",

    pickupAddressType: "",
    pickupAddress: "",

    dropAddressType: "",
    dropAddress: "",

    specialRequirements: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleNext = () => {

    if (!travelDate) {
      alert("Please select travel date");
      return;
    }
    if (!formData.leadFirstName || !formData.leadLastName) {
      alert("Please enter lead traveller name");
      return;
    }
    if (!formData.pickupAddressType || !formData.pickupAddress) {
      alert("Please enter pickup details");
      return;
    }
    if (!formData.dropAddressType || !formData.dropAddress) {
      alert("Please enter drop details");
      return;
    }

    if (onNext) {
      onNext();
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={handleToggle}>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Holiday details
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
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">{packageData.name}</h3>
            </div>
            <p className="text-sm text-gray-600 ml-8">
              Duration: {packageData.days}D / {packageData.nights}N
            </p>
          </div>

          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Travel <span className="text-red-500">*</span>
              </label>
              <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                <PopoverTrigger asChild>
                  <div className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <CalendarIcon className="w-5 h-5 text-gray-500" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Travel Date</span>
                          <span className="text-sm font-medium text-gray-900">
                            {travelDate
                              ? format(travelDate, "EEE, MMM dd, yyyy")
                              : "Select date"}
                          </span>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarUI
                    mode="single"
                    selected={travelDate}
                    onSelect={(date) => {
                      setTravelDate(date);
                      setIsDateOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Lead Traveller Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="leadFirstName"
                    value={formData.leadFirstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="leadLastName"
                    value={formData.leadLastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Pickup & Drop Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup Address Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="pickupAddressType"
                    value={formData.pickupAddressType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Airport">Airport</option>
                    <option value="Railway Station">Railway Station</option>
                    <option value="Other">Other</option>
                  </select>

                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Pickup address"
                  />
                </div>

                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Drop Address Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="dropAddressType"
                    value={formData.dropAddressType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Airport">Airport</option>
                    <option value="Railway Station">Railway Station</option>
                    <option value="Other">Other</option>
                  </select>

                  <input
                    type="text"
                    name="dropAddress"
                    value={formData.dropAddress}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Drop address"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Note: Pickup & Drop address should be in the same city where your holiday package belongs
              </p>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements (Optional)
              </label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any dietary restrictions, accessibility needs, or special requests..."
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {formData.specialRequirements.length}/500
              </p>
            </div>

            
            <div className="pt-6">
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
