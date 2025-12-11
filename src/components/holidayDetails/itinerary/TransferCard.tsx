
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { HolidayPackage } from "@/types/holiday";

interface TransferCardProps {
  from: string;
  to: string;
  vehicleType: string;
  facilities: string;
  image: string;
  packageData?: HolidayPackage;
  selectedVehicleId?: string | null;
  onVehicleChange?: (vehicleId: string) => void;
}

const TransferCard = ({
  from,
  to,
  vehicleType,
  facilities,
  image,
  packageData,
  selectedVehicleId,
  onVehicleChange,
}: TransferCardProps) => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [currentVehicleId, setCurrentVehicleId] = useState<string | null>(selectedVehicleId || null);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentVehicleId(selectedVehicleId || null);
  }, [selectedVehicleId]);

  // Get all available vehicles from both arrays
  const getAllVehicles = () => {
    if (!packageData) return [];

    const vehicles = [];

    // Add from vehiclePrices if it exists
    if (packageData.vehiclePrices && packageData.vehiclePrices.length > 0) {
      vehicles.push(...packageData.vehiclePrices);
    }

    // Add from availableVehicle if vehiclePrices is empty
    if ((!packageData.vehiclePrices || packageData.vehiclePrices.length === 0) && packageData.availableVehicle) {
      vehicles.push(...packageData.availableVehicle.map(v => ({
        vehicle_id: v.vehicle_id,
        vehicleType: v.vehicleType,
        price: v.price,
      })));
    }

    return vehicles;
  };

  const allVehicles = getAllVehicles();

  // Find the currently selected vehicle from package data
  const currentVehicle = allVehicles.find(v => v.vehicle_id === currentVehicleId);

  const handleVehicleSelect = (vehicleId: string) => {
    setCurrentVehicleId(vehicleId);
    setShowUpgrade(false);
    if (onVehicleChange) {
      onVehicleChange(vehicleId);
    }
  };

  return (
    <div className="bg-white border-b border-[#EBEBEB]">
      <div className="p-6 mb-3">
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-clr font-roboto">
            Transfer from{" "}
            <strong className="text-clr font-roboto">{from}</strong> to{" "}
            <strong className="text-clr font-roboto">{to}</strong>
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowUpgrade(!showUpgrade)}
              className="text-[#2789FF] font-roboto text-sm font-semibold hover:underline"
            >
              CHANGE
            </button>
          </div>
        </div>

        
        <div className="flex items-start gap-6">
          
          <div className="w-44 h-28 rounded-lg overflow-hidden shrink-0">
            <Image
              src={image}
              alt=""
              width={176}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          
          <div className="flex-1">
            <h4 className="font-semibold font-roboto text-base mb-1">
              Private Transfer
            </h4>
            <p className="text-clr font-roboto text-sm mb-3">
              {currentVehicle?.vehicleType || vehicleType}
            </p>

            <div className="text-sm">
              <p className="font-medium text-clr font-roboto mb-1">
                Facilities
              </p>
              <p className="text-clr font-roboto">{facilities}</p>
              {currentVehicle && (
                <p className="text-blue-600 font-semibold mt-2">
                  ₹{currentVehicle.price.toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>


      {showUpgrade && packageData && (
        <div className="px-6 pb-6 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-base sm:text-lg font-roboto font-semibold">
              Select Vehicle
            </h4>
            <button
              onClick={() => setShowUpgrade(false)}
              className="text-[#3591FF] hover:text-blue-600"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allVehicles.map((vehicle) => {
              const isSelected = vehicle.vehicle_id === currentVehicleId;
              const currentPrice = currentVehicle?.price || 0;
              const priceDiff = vehicle.price - currentPrice;

              return (
                <div
                  key={vehicle.vehicle_id}
                  className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleVehicleSelect(vehicle.vehicle_id)}
                >
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-100">
                    <Image
                      src="/images/holidayDetails/car1.png"
                      alt={vehicle.vehicleType}
                      width={300}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="font-semibold font-roboto text-center mb-2 text-sm sm:text-base">
                    {vehicle.vehicleType}
                  </h5>
                  <p className="text-center font-bold text-blue-600 mb-2">
                    ₹{vehicle.price.toLocaleString("en-IN")}
                  </p>
                  <div className="flex justify-center">
                    {isSelected ? (
                      <span className="w-full text-center bg-blue-500 text-white rounded-full py-2 font-medium text-sm">
                        Selected
                      </span>
                    ) : priceDiff < 0 ? (
                      <button className="w-full bg-white text-green-600 border border-green-600 rounded-full py-2 hover:bg-green-50 transition-colors font-medium text-sm">
                        Save ₹{Math.abs(priceDiff).toLocaleString("en-IN")}
                      </button>
                    ) : priceDiff > 0 ? (
                      <button className="w-full bg-white text-blue-500 border border-blue-500 rounded-full py-2 hover:bg-blue-50 transition-colors font-medium text-sm">
                        +₹{priceDiff.toLocaleString("en-IN")}
                      </button>
                    ) : (
                      <button className="w-full bg-white text-gray-600 border border-gray-600 rounded-full py-2 hover:bg-gray-50 transition-colors font-medium text-sm">
                        Select
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferCard;
