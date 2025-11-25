"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Prachi Sharma",
    role: "UX UI Designer, Mumbai",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "My recent travel experience was simply extraordinary! From start to finish, everything exceeded my expectations. The accommodation was luxurious, the sights were breathtaking, and the activities were so much fun.",
  },
  {
    id: 2,
    name: "Jyotie Jain",
    role: "UX UI Designer, Mumbai",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "My recent travel experience was simply extraordinary! From start to finish, everything exceeded my expectations. The accommodation was luxurious, the sights were breathtaking, and the activities were so much fun.",
  },
  {
    id: 3,
    name: "Aviral Mittal",
    role: "UX UI Designer, Mumbai",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "My recent travel experience was simply extraordinary! From start to finish, everything exceeded my expectations. The accommodation was luxurious, the sights were breathtaking, and the activities were so much fun.",
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Product Manager, Delhi",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "My recent travel experience was simply extraordinary! From start to finish, everything exceeded my expectations. The accommodation was luxurious, the sights were breathtaking, and the activities were so much fun.",
  },
  {
    id: 5,
    name: "Sneha Patel",
    role: "Software Engineer, Bangalore",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    rating: 5,
    text: "My recent travel experience was simply extraordinary! From start to finish, everything exceeded my expectations. The accommodation was luxurious, the sights were breathtaking, and the activities were so much fun.",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 3 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + 3
  );

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">
            Real Stories, <span className="font-bold">Honest Reviews</span>
          </h2>
          <p className="text-4xl font-bold text-gray-900 mt-1">
            Your Trusted Guide!
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full w-12 h-12 border-2 border-gray-300 hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handleNext}
            className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-0 shadow-none">
            <CardContent className="p-6">
              <div className="mb-6">
                <svg
                  className="w-12 h-12 text-orange-400 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {testimonial.text}
                </p>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
}
