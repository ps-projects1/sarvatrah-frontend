"use client";

import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X, CheckCircle2 } from "lucide-react";

interface TravellerDetailsProps {
  bookingData: {
    id: string;
    name: string | null;
    price: string | null;
    days: string | null;
    nights: string | null;
  };
  packageData?: {
    packagePrice: number;
    packageDuration: {
      days: number;
      nights: number;
    };
  };
}

interface FormData {
  leadFirstName: string;
  leadLastName: string;
  pickupAddressType: string;
  pickupAddress: string;
  dropAddressType: string;
  dropAddress: string;
  billingTitle: string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingPincode: string;
  billingContact: string;
  billingEmail: string;
  billingGST: string;
}

export interface TravellerDetailsRef {
  triggerBooking: () => void;
}

const TravellerDetails = forwardRef<TravellerDetailsRef, TravellerDetailsProps>(
  ({ bookingData, packageData }, ref) => {
    const [dataOption, setDataOption] = useState<"lead" | "all">("all");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState<FormData>({
      leadFirstName: "",
      leadLastName: "",
      pickupAddressType: "",
      pickupAddress: "",
      dropAddressType: "",
      dropAddress: "",
      billingTitle: "",
      billingFirstName: "",
      billingLastName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingPincode: "",
      billingContact: "",
      billingEmail: "",
      billingGST: "",
    });

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const validateForm = () => {
      // Check if all required fields are filled
      if (!formData.leadFirstName || !formData.leadLastName) {
        alert("Please fill in lead traveller's first and last name");
        return false;
      }
      if (!formData.pickupAddressType || !formData.pickupAddress) {
        alert("Please fill in pickup details");
        return false;
      }
      if (!formData.dropAddressType || !formData.dropAddress) {
        alert("Please fill in drop details");
        return false;
      }
      if (
        !formData.billingTitle ||
        !formData.billingFirstName ||
        !formData.billingLastName
      ) {
        alert("Please fill in billing name details");
        return false;
      }
      if (
        !formData.billingAddress ||
        !formData.billingCity ||
        !formData.billingState
      ) {
        alert("Please fill in billing address details");
        return false;
      }
      if (
        !formData.billingPincode ||
        !formData.billingContact ||
        !formData.billingEmail
      ) {
        alert("Please fill in billing contact details");
        return false;
      }
      if (!agreeTerms) {
        alert("Please agree to the terms and conditions");
        return false;
      }
      return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        setShowConfirmation(true);
      }
    };

    useImperativeHandle(ref, () => ({
      triggerBooking: () => {
        if (validateForm()) {
          setShowConfirmation(true);
        }
      },
    }));

    const handleConfirmBooking = () => {
      setShowConfirmation(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    };

    const basePrice = parseFloat(bookingData.price || "0");
    const gstAmount = basePrice * 0.18;
    const totalPrice = basePrice + gstAmount;

    return (
      <div className="w-full space-y-6 pb-8">
        {/* Top Info Bar */}
        <div className="bg-white rounded-lg border border-[#E6E6E6] p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center md:text-left">
            <div>
              <p className="text-sm text-gray-500 mb-1">Package Name</p>
              <p className="font-semibold text-clr">{bookingData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Travel</p>
              <p className="font-semibold text-clr">-</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Travellers</p>
              <p className="font-semibold text-clr">Adults 0 Childs</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Amount</p>
              <p className="font-semibold text-clr">₹ {bookingData.price}</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg border border-[#E6E6E6] p-6">
          <h2 className="text-2xl font-bold text-clr mb-6">
            Travellers Details
          </h2>

          {/* Radio Options */}
          <div className="flex gap-8 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="dataOption"
                value="lead"
                checked={dataOption === "lead"}
                onChange={() => setDataOption("lead")}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700">Lead traveller data only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="dataOption"
                value="all"
                checked={dataOption === "all"}
                onChange={() => setDataOption("all")}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700">Data for all travellers</span>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lead Travellers Details */}
            <div>
              <h3 className="text-lg font-semibold text-clr mb-4">
                Lead travellers details:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="leadFirstName"
                  placeholder="First Name*"
                  required
                  value={formData.leadFirstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="leadLastName"
                  placeholder="Last Name*"
                  required
                  value={formData.leadLastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <select
                  name="pickupAddressType"
                  value={formData.pickupAddressType}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="">Pickup Address Type*</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Airport">Airport</option>
                  <option value="Railway Station">Railway Station</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="text"
                  name="pickupAddress"
                  placeholder="Pickup Address*"
                  required
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <select
                  name="dropAddressType"
                  value={formData.dropAddressType}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="">Drop Address Type*</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Airport">Airport</option>
                  <option value="Railway Station">Railway Station</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="text"
                  name="dropAddress"
                  placeholder="Drop Address*"
                  required
                  value={formData.dropAddress}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <p className="text-sm text-gray-600 mt-3">
                Note: Pickup & Drop address should be in the same city where
                your activity/adventure belongs to
              </p>
            </div>

            {/* Billing Details */}
            <div>
              <h3 className="text-lg font-semibold text-clr mb-4">
                Billing Details:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <select
                  name="billingTitle"
                  value={formData.billingTitle}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="">Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>

                <input
                  type="text"
                  name="billingFirstName"
                  placeholder="First Name"
                  required
                  value={formData.billingFirstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="text"
                  name="billingLastName"
                  placeholder="Last Name"
                  required
                  value={formData.billingLastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="text"
                  name="billingAddress"
                  placeholder="Address"
                  required
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <select
                  name="billingCity"
                  value={formData.billingCity}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="">City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                </select>

                <select
                  name="billingState"
                  value={formData.billingState}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="">State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                </select>

                <input
                  type="text"
                  name="billingPincode"
                  placeholder="Pincode"
                  required
                  value={formData.billingPincode}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="tel"
                  name="billingContact"
                  placeholder="Contact"
                  required
                  value={formData.billingContact}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="billingEmail"
                  placeholder="Email"
                  required
                  value={formData.billingEmail}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="text"
                  name="billingGST"
                  placeholder="GST NO."
                  value={formData.billingGST}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <label htmlFor="terms" className="text-gray-700">
                I agree to Lorem Ipsum is simply dummy text of the printing and
                typesett
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={!agreeTerms}
                className="px-8 py-3 bg-[#2789FF] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PROCEED TO BOOK
              </button>
              <button
                type="button"
                className="px-8 py-3 text-[#2789FF] font-semibold hover:underline"
              >
                Back
              </button>
            </div>
          </form>
        </div>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-clr">
                Confirm Booking Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Package Details */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg text-clr mb-3">
                  Package Information
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Package Name</p>
                    <p className="font-medium">{bookingData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">
                      {bookingData.days}D / {bookingData.nights}N
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg text-clr mb-3">
                  Price Breakdown
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Base Price</p>
                    <p className="font-medium">
                      ₹{basePrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">GST (18%)</p>
                    <p className="font-medium">
                      ₹
                      {gstAmount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <p className="font-semibold text-base">Total Amount</p>
                    <p className="font-bold text-blue-600 text-xl">
                      ₹
                      {totalPrice.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lead Traveller Details */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg text-clr mb-3">
                  Lead Traveller
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">
                      {formData.leadFirstName} {formData.leadLastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pickup Type</p>
                    <p className="font-medium">{formData.pickupAddressType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pickup Address</p>
                    <p className="font-medium">{formData.pickupAddress}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Drop Type</p>
                    <p className="font-medium">{formData.dropAddressType}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Drop Address</p>
                    <p className="font-medium">{formData.dropAddress}</p>
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div>
                <h3 className="font-semibold text-lg text-clr mb-3">
                  Billing Information
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">
                      {formData.billingTitle} {formData.billingFirstName}{" "}
                      {formData.billingLastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Contact</p>
                    <p className="font-medium">{formData.billingContact}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{formData.billingEmail}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium">
                      {formData.billingAddress}, {formData.billingCity},{" "}
                      {formData.billingState} - {formData.billingPincode}
                    </p>
                  </div>
                  {formData.billingGST && (
                    <div>
                      <p className="text-gray-500">GST Number</p>
                      <p className="font-medium">{formData.billingGST}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Details
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2 bg-[#2789FF] text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Confirm & Book
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Modal */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-md">
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-clr mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-4">
                Your booking has been successfully confirmed.
              </p>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {formData.billingEmail}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);

TravellerDetails.displayName = "TravellerDetails";

export default TravellerDetails;
