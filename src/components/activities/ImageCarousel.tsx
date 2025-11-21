"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Carousel */}
        <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
          {/* Current Image */}
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </>
          )}

          {/* View Gallery Button */}
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg transition-all"
          >
            View Gallery
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Gallery (Optional - shows below main image) */}
        {showGallery && images.length > 1 && (
          <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
            {images.map((image, index) => (
              <button
                key={`thumbnail-${image.src}-${index}`}
                onClick={() => goToSlide(index)}
                className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Dot Indicators (Alternative to thumbnails) */}
        {!showGallery && images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
