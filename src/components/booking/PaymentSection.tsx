"use client";

import React, { useState } from "react";
import { ChevronDown, Lock, AlertCircle, CheckCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FormErrors {
  title?: string;
  billingFirstName?: string;
  billingLastName?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  billingContact?: string;
  billingEmail?: string;
  gstin?: string;
}

interface PaymentSectionProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function PaymentSection({
  isOpen: externalIsOpen,
  onToggle,
}: PaymentSectionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isVerifyingPrice, setIsVerifyingPrice] = useState(false);
  const [priceVerified, setPriceVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    billingFirstName: "",
    billingLastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    billingContact: "",
    billingEmail: "",
    gstin: "",
  });

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Title is required";
        return undefined;

      case "billingFirstName":
      case "billingLastName":
        if (!value.trim()) return "This field is required";
        if (value.length < 2) return "Must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters allowed";
        return undefined;

      case "address":
        if (!value.trim()) return "Address is required";
        if (value.length < 5) return "Address must be at least 5 characters";
        return undefined;

      case "city":
        if (!value.trim()) return "City is required";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters allowed";
        return undefined;

      case "state":
        if (!value.trim()) return "State is required";
        return undefined;

      case "pincode":
        if (!value.trim()) return "Pincode is required";
        if (!/^\d{6}$/.test(value)) return "Must be 6 digits";
        return undefined;

      case "billingContact":
        if (!value.trim()) return "Contact number is required";
        if (!/^\d{10}$/.test(value.replace(/\s/g, "")))
          return "Must be 10 digits";
        return undefined;

      case "billingEmail":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return undefined;

      case "gstin":
        if (value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value))
          return "Invalid GST format";
        return undefined;

      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "gstin") {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });
    setErrors(newErrors);
    setTouched({
      title: true,
      billingFirstName: true,
      billingLastName: true,
      address: true,
      city: true,
      state: true,
      pincode: true,
      billingContact: true,
      billingEmail: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleBookNow = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields correctly");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

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
          
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Billing Details
            </h3>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("title")}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors.title
                      ? "border-red-500 focus:ring-red-500"
                      : formData.title && !errors.title
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent bg-white`}
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="billingFirstName"
                    value={formData.billingFirstName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("billingFirstName")}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.billingFirstName
                        ? "border-red-500 focus:ring-red-500"
                        : formData.billingFirstName && !errors.billingFirstName
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="First name"
                  />
                  {formData.billingFirstName && !errors.billingFirstName && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.billingFirstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.billingFirstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="billingLastName"
                    value={formData.billingLastName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("billingLastName")}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.billingLastName
                        ? "border-red-500 focus:ring-red-500"
                        : formData.billingLastName && !errors.billingLastName
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="Last name"
                  />
                  {formData.billingLastName && !errors.billingLastName && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.billingLastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.billingLastName}
                  </p>
                )}
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("address")}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors.address
                      ? "border-red-500 focus:ring-red-500"
                      : formData.address && !errors.address
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent`}
                  placeholder="Street address"
                />
                {formData.address && !errors.address && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.address}
                </p>
              )}
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("city")}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.city
                        ? "border-red-500 focus:ring-red-500"
                        : formData.city && !errors.city
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="City"
                  />
                  {formData.city && !errors.city && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("state")}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors.state
                      ? "border-red-500 focus:ring-red-500"
                      : formData.state && !errors.state
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent bg-white`}
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.state}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("pincode")}
                    maxLength={6}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.pincode
                        ? "border-red-500 focus:ring-red-500"
                        : formData.pincode && !errors.pincode
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="123456"
                  />
                  {formData.pincode && !errors.pincode && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="billingContact"
                    value={formData.billingContact}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("billingContact")}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.billingContact
                        ? "border-red-500 focus:ring-red-500"
                        : formData.billingContact && !errors.billingContact
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="1234567890"
                  />
                  {formData.billingContact && !errors.billingContact && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.billingContact && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.billingContact}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="billingEmail"
                    value={formData.billingEmail}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("billingEmail")}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.billingEmail
                        ? "border-red-500 focus:ring-red-500"
                        : formData.billingEmail && !errors.billingEmail
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="email@example.com"
                  />
                  {formData.billingEmail && !errors.billingEmail && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.billingEmail && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.billingEmail}
                  </p>
                )}
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("gstin")}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors.gstin
                      ? "border-red-500 focus:ring-red-500"
                      : formData.gstin && !errors.gstin
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent`}
                  placeholder="22AAAAA0000A1Z5"
                />
                {formData.gstin && !errors.gstin && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.gstin && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.gstin}
                </p>
              )}
            </div>
          </div>

          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Pay with</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Secure Checkout</span>
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

          
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </a>
              </span>
            </label>
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
