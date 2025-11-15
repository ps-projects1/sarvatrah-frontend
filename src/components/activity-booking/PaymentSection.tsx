"use client";

import React, { useState } from "react";
import { ChevronDown, MapPin, Lock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PaymentSectionProps {
  activity: any;
  tourLanguage: string;
}

export default function PaymentSection({
  activity,
  tourLanguage,
}: PaymentSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Header - Clickable Trigger */}
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Payment details
              </h2>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>

        {/* Collapsible Content */}
        <CollapsibleContent>
          {/* Meeting Point Summary */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Meeting point
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-medium mb-2">
                {activity?.meetingPointName || "White World Expeditions"}
              </p>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <p>
                  {activity?.meetingPoint ||
                    "1st Floor, Badrinath Rd, opposite Sai Ganga Cottage, Tapovan, Rishikesh, Uttarakhand 249192, India"}
                </p>
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Other details
            </h3>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Tour language:</span>{" "}
              {tourLanguage}
            </div>
          </div>

          {/* Pay with Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Pay with
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Checkout</span>
              </div>
            </div>

            {/* Payment Method - Debit/Credit Card */}
            <div className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors cursor-pointer">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-3 flex-1">
                  {/* Card Logos */}
                  <div className="flex items-center gap-2">
                    {/* Visa */}
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-600">
                      VISA
                    </div>
                    {/* Amex */}
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-500">
                      AMEX
                    </div>
                    {/* Mastercard */}
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Debit/Credit Card
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 leading-relaxed">
              By clicking 'Book Now', you agree to Viator's{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Customer Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Privacy Statement
              </a>
              , and you also agree to enter into a direct contract with the
              supplier of the experience as described on the{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                listing page
              </a>
              . You also consent to receive updates from Viator, including
              inspirations, tips, and other information, from which you can
              unsubscribe at any time.
            </p>
          </div>

          {/* Book Now Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg">
            <Lock className="w-5 h-5" />
            <span>Book Now</span>
          </button>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
