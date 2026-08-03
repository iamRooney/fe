"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./types";
import { BadgeCheck, ImageOff } from "lucide-react";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    // Falls back to the placeholder if the image URL 404s (e.g. backend
    // storage symlink missing) instead of showing a broken image icon.
    const [imgError, setImgError] = useState(false);

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group block overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative h-44 overflow-hidden bg-gray-50">
                {product.image && !imgError ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        onError={() => setImgError(true)}
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">
                        <ImageOff size={32} />
                    </div>
                )}

                {product.badge && (
                    <span className="absolute left-3 top-3 rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="space-y-3 p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-500">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500">{product.supplier}</p>

                <div>
                    <div className="font-bold text-orange-500">{product.price}</div>
                    <div className="text-xs text-gray-500">{product.moq}</div>
                </div>

                {product.verified && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                        <BadgeCheck size={16} />
                        Verified Supplier
                    </div>
                )}

                <button
                    type="button"
                    onClick={(e) => {
                        // "Get Quotes" doesn't have its own flow yet — stop it
                        // from also triggering the card's navigation link.
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="w-full rounded-lg border border-green-500 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-500 hover:text-white"
                >
                    Get Quotes
                </button>
            </div>
        </Link>
    );
}