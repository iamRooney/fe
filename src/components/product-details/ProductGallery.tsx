"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/products/product-1.jfif",
  "/images/products/product-2.jfif",
  "/images/products/product-3.jfif",
];

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
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
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative flex-1 rounded-xl border bg-gray-50 p-6">
          <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            In Stock
          </span>

          <div className="flex h-105 items-center justify-center">
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