"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function TravelAdventuresPage() {
  return (
    <div className="  overflow-hidden">
      <section className="px-6  lg:px-20 lg:pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Section with Images and CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-20">
            {/* Left: Gallery Images */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                {/* Bottom Row - One Image with Badge */}
                <div className="relative">
                  <div className="relative h-[500px] w-full rounded-2xl overflow-hidden ">
                    <Image
                      src="/images/home/image4.png"
                      alt="Aerial View"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA Section */}
            <div className="lg:col-span-1 flex flex-col justify-start gap-6 pt-8">
              <div>
                <h1 className="text-4xl lg:text-3xl font-black leading-tight mb-4">
                  Unleash Your <span className="text-black">Wanderlust</span>
                </h1>
                <p className="text-2xl lg:text-xl font-bold text-black mb-2">
                  Discover Thrilling Travel Adventures!
                </p>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                Fuel your wanderlust with Travel Adventures' thrilling journeys,
                where every stop leads to extraordinary landscapes and cultural
                encounters that will leave you inspired and awestruck.
              </p>

              <Button className="w-fit px-8 py-2 border-2 border-gray-800 bg-white text-gray-800 hover:bg-gray-50 font-semibold rounded-full">
                View Adventures
              </Button>
            </div>
          </div>

          {/* Bottom Section */}
        </div>
      </section>

      <section className="px-6  lg:px-20 lg:pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-20">
            <div className="lg:col-span-1 flex flex-col justify-start gap-6 pt-8">
              <div>
                <h1 className="text-4xl lg:text-3xl font-black leading-tight mb-4">
                  Unleash Your <span className="text-black">Wanderlust</span>
                </h1>
                <p className="text-2xl lg:text-xl font-bold text-black mb-2">
                  Discover Thrilling Travel Adventures!
                </p>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                Fuel your wanderlust with Travel Adventures' thrilling journeys,
                where every stop leads to extraordinary landscapes and cultural
                encounters that will leave you inspired and awestruck.
              </p>

              <Button className="w-fit px-8 py-2 border-2 border-gray-800 bg-white text-gray-800 hover:bg-gray-50 font-semibold rounded-full">
                View Adventures
              </Button>
            </div>

            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <div className="relative h-[500px] w-full rounded-2xl overflow-hidden ">
                    <Image
                      src="/images/home/image4.png"
                      alt="Aerial View"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
