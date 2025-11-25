"use client";

import React, { useState } from "react";
import { User, ChevronDown, AlertCircle, CheckCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  confirmEmail?: string;
  phoneNumber?: string;
}

export default function ContactDetailsSection() {
  const [isOpen, setIsOpen] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    countryCode: "+91",
    phoneNumber: "",
  });

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "This field is required";
        if (value.length < 2) return "Must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters allowed";
        return undefined;

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
        return undefined;

      case "confirmEmail":
        if (!value.trim()) return "Please confirm your email";
        if (value !== formData.email) return "Emails do not match";
        return undefined;

      case "phoneNumber":
        if (!value.trim()) return "Phone number is required";
        if (!/^\d{10}$/.test(value.replace(/\s/g, ""))) return "Must be 10 digits";
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

    // Validate on change if field was touched
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
      if (key !== "countryCode") {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      confirmEmail: true,
      phoneNumber: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed to next section
      console.log("Form valid:", formData);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Contact details
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
          <p className="text-sm text-gray-600 mb-6">
            We&apos;ll use this information to send you confirmation and updates
            about your booking
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">
              Log in or Sign-up for a faster checkout and to redeem available
              Rewards
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("firstName")}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-500"
                        : formData.firstName && !errors.firstName
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="First name"
                  />
                  {formData.firstName && !errors.firstName && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("lastName")}
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-500"
                        : formData.lastName && !errors.lastName
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="Last name"
                  />
                  {formData.lastName && !errors.lastName && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-4 h-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : formData.email && !errors.email
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent`}
                  placeholder="email@example.com"
                />
                {formData.email && !errors.email && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.email ? (
                <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  We&apos;ll send booking confirmation emails here
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("confirmEmail")}
                  aria-invalid={errors.confirmEmail ? "true" : "false"}
                  aria-describedby={errors.confirmEmail ? "confirmEmail-error" : undefined}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    errors.confirmEmail
                      ? "border-red-500 focus:ring-red-500"
                      : formData.confirmEmail && !errors.confirmEmail
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:border-transparent`}
                  placeholder="email@example.com"
                />
                {formData.confirmEmail && !errors.confirmEmail && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.confirmEmail ? (
                <p id="confirmEmail-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmEmail}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Just to ensure we got the right email
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="+91">(+91) India</option>
                  <option value="+1">(+1) USA</option>
                  <option value="+44">(+44) UK</option>
                  <option value="+61">(+61) Australia</option>
                  <option value="+971">(+971) UAE</option>
                </select>

                <div className="relative">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phoneNumber")}
                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                    aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                      errors.phoneNumber
                        ? "border-red-500 focus:ring-red-500"
                        : formData.phoneNumber && !errors.phoneNumber
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:border-transparent`}
                    placeholder="1234567890"
                  />
                  {formData.phoneNumber && !errors.phoneNumber && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
              {errors.phoneNumber && (
                <p id="phoneNumber-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
