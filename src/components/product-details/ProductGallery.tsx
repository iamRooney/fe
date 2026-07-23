"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/images/products/product-1.jfif",
  "/images/products/product-2.jfif",
  "/images/products/product-3.jfif",
];

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="overflow-hidden rounded-xl border bg-white sm:p-6">

      {/* Mobile: swipeable carousel with dot pagination */}
      <div className="relative sm:hidden">
        <span className="absolute right-4 top-4 z-10 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          In Stock
        </span>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="product-gallery-swiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <div className="flex h-72 items-center justify-center bg-gray-50">
                <Image
                  src={image}
                  alt="Product"
                  width={500}
                  height={500}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .product-gallery-swiper {
            padding-bottom: 32px !important;
          }
          .product-gallery-swiper .swiper-pagination-bullet {
            background: #cbd5e1;
            opacity: 1;
          }
          .product-gallery-swiper .swiper-pagination-bullet-active {
            background: #f89a1c;
          }
        `}</style>
      </div>

      {/* Desktop: thumbnails + main image */}
      <div className="hidden sm:flex sm:flex-row sm:gap-4">
        {/* Thumbnails */}
        <div className="flex gap-3 sm:flex-col">
          {images.map((image) => (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-lg border-2 transition ${selectedImage === image
                ? "border-sky-500"
                : "border-gray-200"
                }`}
            >
              <Image
                src={image}
                alt="Thumbnail"
                width={80}
                height={80}
                className="h-16 w-16 object-cover sm:h-20 sm:w-20"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative flex-1 rounded-xl border bg-gray-50 p-6">
          <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            In Stock
          </span>

          <div className="flex h-64 items-center justify-center sm:h-105">
            <Image
              src={selectedImage}
              alt="Product"
              width={500}
              height={500}
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}