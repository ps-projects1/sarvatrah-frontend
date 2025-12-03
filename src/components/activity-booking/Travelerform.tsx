"use client";

import React, { useState, useEffect } from "react";
import { User, ChevronDown } from "lucide-react";

interface TravelerFormProps {
  type: "Adult" | "Senior" | "Child";
  index: number;
  formData: {
    firstName: string;
    lastName: string;
    weight: string;
    weightUnit: string;
    passportNumber: string;
    passportNationality: string;
    passportExpiry: string;
    dateOfBirth: string;
  };
  onChange: (field: string, value: string) => void;
}

interface SavedTraveler {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  weight: string;
  weightUnit: string;
  passportNumber: string;
  passportNationality: string;
  passportExpiry: string;
  dateOfBirth: string;
}

export default function TravelerForm({
  type,
  index,
  formData,
  onChange,
}: TravelerFormProps) {
  const [savedTravelers, setSavedTravelers] = useState<SavedTraveler[]>([]);
  const [showSavedProfiles, setShowSavedProfiles] = useState(false);
  const [showSaveOption, setShowSaveOption] = useState(false);

  useEffect(() => {

    const saved = localStorage.getItem("savedTravelers");
    if (saved) {
      setSavedTravelers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {

    const hasData = formData.firstName && formData.lastName;
    setShowSaveOption(!!hasData);
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const loadSavedTraveler = (traveler: SavedTraveler) => {
    Object.keys(traveler).forEach((key) => {
      if (key !== "id" && key !== "name") {
        onChange(key, traveler[key as keyof SavedTraveler] as string);
      }
    });
    setShowSavedProfiles(false);
  };

  const saveTraveler = () => {
    const newTraveler: SavedTraveler = {
      id: Date.now().toString(),
      name: `${formData.firstName} ${formData.lastName}`,
      ...formData,
    };

    const updated = [...savedTravelers, newTraveler];
    setSavedTravelers(updated);
    localStorage.setItem("savedTravelers", JSON.stringify(updated));
    alert("Traveler profile saved successfully!");
  };

  const deleteTraveler = (id: string) => {
    const updated = savedTravelers.filter((t) => t.id !== id);
    setSavedTravelers(updated);
    localStorage.setItem("savedTravelers", JSON.stringify(updated));
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Traveler {index} ({type})
        </h3>
        {savedTravelers.length > 0 && (
          <button
            type="button"
            onClick={() => setShowSavedProfiles(!showSavedProfiles)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <User className="w-4 h-4" />
            Use Saved Profile
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showSavedProfiles ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      
      {showSavedProfiles && savedTravelers.length > 0 && (
        <div className="mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3 font-medium">
            Select a saved traveler profile:
          </p>
          <div className="space-y-2">
            {savedTravelers.map((traveler) => (
              <div
                key={traveler.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-500 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => loadSavedTraveler(traveler)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {traveler.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Passport: {traveler.passportNumber || "Not provided"}
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => deleteTraveler(traveler.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight
          </label>
          <div className="grid grid-cols-[1fr_120px] gap-2">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter weight"
            />
            <select
              name="weightUnit"
              value={formData.weightUnit}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passport number
          </label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Passport number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passport nationality
          </label>
          <input
            type="text"
            name="passportNationality"
            value={formData.passportNationality}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Indian, American"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passport expiry date
          </label>
          <input
            type="date"
            name="passportExpiry"
            value={formData.passportExpiry}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        
        {showSaveOption && (
          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={saveTraveler}
              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              <User className="w-4 h-4" />
              Save this traveler profile for future bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
