"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Policies = () => {
  const [openCancellation, setOpenCancellation] = useState(true);
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <div className="w-full space-y-4 pb-4">
      {/* Cancellation & Date Change Section */}
      <Collapsible
        open={openCancellation}
        onOpenChange={setOpenCancellation}
        className="bg-white rounded-lg border border-[#E6E6E6] overflow-hidden"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors">
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1E2125]">
            Cancellation & Date Change
          </h2>
          <ChevronDown
            className={`w-5 h-5 text-[#1E2125] transition-transform duration-200 ${
              openCancellation ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 sm:px-6 pb-6 space-y-6">
          {/* Package Cancellation Policy */}
          <div>
            <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1E2125] mb-3">
              Package Cancellation Policy
            </h3>
            <p className="text-[14px] sm:text-[16px] text-[#666666]">
              Cancellation not possible after booking
            </p>
          </div>

          {/* Package Date Change Policy */}
          <div>
            <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1E2125] mb-3">
              Package Date Change Policy
            </h3>
            <p className="text-[14px] sm:text-[16px] text-[#666666]">
              Date Change not possible after booking
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Terms and Conditions Section */}
      <Collapsible
        open={openTerms}
        onOpenChange={setOpenTerms}
        className="bg-white rounded-lg border border-[#E6E6E6] overflow-hidden"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors">
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1E2125]">
            Terms and Conditions
          </h2>
          <ChevronDown
            className={`w-5 h-5 text-[#1E2125] transition-transform duration-200 ${
              openTerms ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 sm:px-6 pb-6 space-y-6">
          {/* Exclusions */}
          <div>
            <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1E2125] mb-3">
              Exclusions
            </h3>
            <ul className="space-y-2 text-[14px] sm:text-[16px] text-[#666666]">
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>Expenses of personal nature</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>Mentioned cost is not valid between 6 pm and 8 am</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>Anything not mentioned under inclusions</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Package price does not include Gala dinner charges applicable
                  on Christmas and New Year's Eve
                </span>
              </li>
            </ul>
          </div>

          {/* Terms and Conditions */}
          <div>
            <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1E2125] mb-3">
              Terms and Conditions
            </h3>
            <ul className="space-y-3 text-[14px] sm:text-[16px] text-[#666666]">
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Standard check-in time at the hotel is normally 2:00 pm and
                  check-out is 11:00 am. An early check-in, or a late check-out
                  is solely based on the discretion of the hotel.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  A maximum of 3 adults are allowed in one room. The third
                  occupant shall be provided a mattress/rollaway bed.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  The itinerary is fixed and cannot be modified. Transportation
                  shall be provided as per the itinerary and will not be at
                  disposal. For any paid activity which is non-operational due
                  to any unforeseen reason, we will process refund & same should
                  reach the guest within 30 days of processing the refund.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Also, for any activity which is complimentary and not charged
                  to MMT & guest, no refund will be processed.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  AC will not be functional anywhere in cool or hilly areas.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Entrance fee, parking and guide charges are not included in
                  the packages.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  If your flights involve a combination of different airlines,
                  you may have to collect your luggage on arrival at the
                  connecting hub and register it again while checking in for the
                  onward journey to your destination.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Booking rates are subject to change without prior notice.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Airline seats and hotel rooms are subject to availability at
                  the time of booking.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Pricing of the booking is based on the age of the passengers.
                  Please make sure you enter the correct age of passengers at
                  the time of booking. Passengers furnishing incorrect age
                  details may incur penalty at the time of travelling.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  In case of unavailability in the listed hotels, arrangement
                  for an alternate accommodation will be made in a hotel of
                  similar standard.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  In case your package needs to be cancelled due to any natural
                  calamity, weather conditions etc. MakeMyTrip shall strive to
                  give you the maximum possible refund subject to the agreement
                  made with our trade partners/vendors.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  MMT reserves the right to modify the itinerary at any point,
                  due to reasons including but not limited to: Force Majeure
                  events, strikes, fairs, festivals, weather conditions, traffic
                  problems, overbooking of hotels / flights, cancellation /
                  re-routing of flights, closure of /entry restrictions at a
                  place of visit, etc. While we will do our best to make
                  suitable alternate arrangements, we would not be held liable
                  for any refunds/compensation claims arising out of this.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Certain hotels may ask for a security deposit during check-in,
                  which is refundable at check-out subject to the hotel policy.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  The booking price does not include: Expenses of personal
                  nature, such as laundry, telephone calls, room service,
                  alcoholic beverages, mini bar charges, tips, portage, camera
                  fees etc.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Any other items not mentioned under Inclusions are not
                  included in the cost of the booking.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  The package price does not include mandatory gala dinner
                  charges levied by the hotels especially during New Year and
                  Christmas or any special occasions. MakeMyTrip shall try to
                  communicate the same while booking the package. However
                  MakeMyTrip may not have this information readily available all
                  the time.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Cost of deviation and cost of extension of the validity on
                  your ticket is not included.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  For queries regarding cancellations and refunds, please refer
                  to our Cancellation Policy.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Disputes, if any, shall be subject to the exclusive
                  jurisdiction of the courts in New Delhi.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Dudhsagar Waterfalls is closed in the monsoon (June -
                  September).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  Activities related to water sports are subject to weather and
                  wind conditions on the ground.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                <span>
                  The cost of mentioned tours and transfer is not valid between
                  6 pm to 8 am.
                </span>
              </li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Policies;
<div className="px-4 sm:px-6 pb-6 space-y-6">
  {/* Exclusions */}
  <div>
    <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1E2125] mb-3">
      Exclusions
    </h3>
    <ul className="space-y-2 text-[14px] sm:text-[16px] text-[#666666]">
      <li className="flex gap-2">
        <span className="shrink-0">•</span>
        <span>Expenses of personal nature</span>
      </li>
      <li className="flex gap-2">
        <span className="shrink-0">•</span>
        <span>Mentioned cost is not valid between 6 pm and 8 am</span>
      </li>
      <li className="flex gap-2">
        <span className="shrink-0">•</span>
        <span>Anything not mentioned under inclusions</span>
      </li>
      <li className="flex gap-2">
        <span className="shrink-0">•</span>
        <span>
          Package price does not include Gala dinner charges applicable on
          Christmas and New Year's Eve
        </span>
      </li>
    </ul>
  </div>

  {/* Terms and Conditions */}
  <div>
    <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1E2125] mb-3">
      Terms and Conditions
    </h3>
    <ul className="space-y-3 text-[14px] sm:text-[16px] text-[#666666]">
      <li className="flex gap-2">
        <span className="shrink-0">•</span>
        <span>
          Standard check-in time at the hotel is normally 2:00 pm and check-out
          is 11:00 am. An early check-in, or a late check-out is solely based on
          the discretion of the hotel.
        </span>
      </li>
      <li className="flex gap-2">
        <span className="shrink-0">•</span>
        <span>
          A maximum of 3 adults are allowed in one room. The third occupant
          shall be provided a mattress/rollaway bed.
        </span>
      </li>
      <li className="flex gap-2">
        <span className="shrink-0">•</span>
        <span>
          The itinerary is fixed and cannot be modified. Transportation shall be
          provided as per the itinerary and will not be at disposal. For any
          paid activity which is non-operational due to any unforeseen reason,
          we will process refund & same should reach the guest within 30 days of
          processing the refund.
        </span>
      </li>
    </ul>
  </div>
</div>;
