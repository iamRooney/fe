"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

const PLACEHOLDER = "/images/products/product-1.jfif";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  // Main photo first, then any gallery shots. Falls back to a placeholder
  // when the seller hasn't uploaded anything yet.
  const gallery = images.length > 0 ? images : [PLACEHOLDER];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="flex gap-4">
        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className="flex flex-col gap-3">
            {gallery.map((image) => (
              <button
                key={image}
                onClick={() => {
                  setSelectedImage(image);
                  setImgError(false);
                }}
                className={`overflow-hidden rounded-lg border-2 transition ${selectedImage === image
                  ? "border-sky-500"
                  : "border-gray-200"
                  }`}
              >
                <Image
                  src={image}
                  alt={`${name} thumbnail`}
                  width={80}
                  height={80}
                  unoptimized
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="relative flex-1 rounded-xl border bg-gray-50 p-6">
          <div className="flex h-105 items-center justify-center">
            {!imgError ? (
              <Image
                src={selectedImage}
                alt={name}
                width={500}
                height={500}
                unoptimized
                onError={() => setImgError(true)}
                className="max-h-full w-auto object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <ImageOff size={48} />
                <span className="text-sm">Image unavailable</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}