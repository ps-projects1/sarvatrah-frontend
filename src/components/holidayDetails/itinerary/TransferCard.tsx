// TransferCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface TransferCardProps {
  from: string;
  to: string;
  vehicleType: string;
  facilities: string;
  image: string;
}

const TransferCard = ({
  from,
  to,
  vehicleType,
  facilities,
  image,
}: TransferCardProps) => {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div className="bg-white border-b border-[#EBEBEB]">
      <div className="p-6 mb-3">
        {/* Header */}
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

        {/* Content */}
        <div className="flex items-start gap-6">
          {/* Car Icon */}
          <div className="w-44 h-28 rounded-lg overflow-hidden shrink-0">
            <Image
              src={image}
              alt=""
              width={176}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h4 className="font-semibold font-roboto text-base mb-1">
              Private Transfer
            </h4>
            <p className="text-clr font-roboto text-sm mb-3">{vehicleType}</p>

            <div className="text-sm">
              <p className="font-medium text-clr font-roboto mb-1">
                Facilities
              </p>
              <p className="text-clr font-roboto">{facilities}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Vehicle Section - Expands Below */}
      {showUpgrade && (
        <div className="px-6 pb-6 border-t border-gray-200 pt-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {/* Current Vehicle - Sedan */}
              <div className="mb-6">
                <h4 className="text-base sm:text-lg font-roboto font-semibold mb-4">
                  Sedan
                </h4>
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src="/images/holidayDetails/car.png"
                      alt="Sedan"
                      width={192}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold font-roboto mb-2 text-sm sm:text-base">
                      Honda city, or similar
                    </h5>
                    <div className="text-xs sm:text-sm text-clr font-roboto space-y-1">
                      <p>Passenger Capacity : 3</p>
                      <p>
                        Baggage Capacity : Per person one hand bag and one
                        baggage (L + B + H = 158 cm)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              {/* Upgrade Options */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-base sm:text-lg font-roboto font-semibold">
                  Upgrade Vehicle
                </h4>
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="text-[#3591FF] hover:text-blue-600"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hatchback */}
                <div className="cursor-pointer ">
                  <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden mb-3">
                    <Image
                      src="/images/holidayDetails/car1.png"
                      alt="Hatchback"
                      width={300}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="font-semibold font-roboto text-center mb-2 text-sm sm:text-base">
                    Hatchback
                  </h5>
                  <div className="flex justify-center">
                    <button className="w-full sm:w-[60%] bg-white text-blue-500 border font-roboto border-blue-500 rounded-full py-2 hover:bg-blue-50 transition-colors font-medium text-sm">
                      Pay Rs.1000 Less
                    </button>
                  </div>
                </div>

                {/* MUV */}
                <div className=" cursor-pointer  ">
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-3">
                    <Image
                      src="/images/holidayDetails/car1.png"
                      alt="MUV"
                      width={300}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="font-semibold text-center mb-2 text-sm sm:text-base">
                    MUV
                  </h5>
                  <div className="flex justify-center">
                    <button className="w-full sm:w-[60%] bg-white text-blue-500 border font-roboto border-blue-500 rounded-full py-2 hover:bg-blue-50 transition-colors font-medium text-sm">
                      Pay Rs.2000 More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferCard;
