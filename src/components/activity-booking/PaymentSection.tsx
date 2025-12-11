"use client";

import React, { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Activity, Experience } from "@/types/activity";

interface PaymentSectionProps {
  activity: Activity | Experience;
  tourLanguage: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function PaymentSection({
  activity,
  tourLanguage,
  isOpen: externalIsOpen,
  onToggle,
}: PaymentSectionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isVerifyingPrice, setIsVerifyingPrice] = useState(false);
  const [priceVerified, setPriceVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBookNow = async () => {
    setIsProcessing(true);
    setIsVerifyingPrice(true);


    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsVerifyingPrice(false);
    setPriceVerified(true);


    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsProcessing(false);
    alert("Booking confirmed! (This is a demo - no actual payment processed)");
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={handleToggle}>
      <div className="bg-white rounded-lg border border-gray-200 p-6" aria-label="payment-section">
        
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

        
        <CollapsibleContent>
          
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Meeting point
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-medium mb-2">
                {(activity as Activity)?.meetingPointName || "White World Expeditions"}
              </p>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <p>
                  {(activity as Activity)?.meetingPoint ||
                    "1st Floor, Badrinath Rd, opposite Sai Ganga Cottage, Tapovan, Rishikesh, Uttarakhand 249192, India"}
                </p>
              </div>
            </div>
          </div>

          
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Other details
            </h3>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Tour language:</span>{" "}
              {tourLanguage}
            </div>
          </div>

          
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
                  
                  <div className="flex items-center gap-2">
                    
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-600">
                      VISA
                    </div>
                    
                    <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-blue-500">
                      AMEX
                    </div>
                    
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

          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 leading-relaxed">
              By clicking &apos;Book Now&apos;, you agree to Viator&apos;s{" "}
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

          
          {isVerifyingPrice && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Verifying price and availability...
                </p>
                <p className="text-xs text-blue-700">
                  Please wait while we confirm the latest pricing
                </p>
              </div>
            </div>
          )}

          {priceVerified && !isVerifyingPrice && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Price confirmed!
                </p>
                <p className="text-xs text-green-700">
                  Your booking price is locked and guaranteed
                </p>
              </div>
            </div>
          )}

          
          <button
            onClick={handleBookNow}
            disabled={isProcessing}
            className={`w-full font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Book Now</span>
              </>
            )}
          </button>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
