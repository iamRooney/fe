"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { fetchProducts, ApiProduct } from "@/lib/home";

interface SimilarProductsProps {
  categorySlug: string | null;
  excludeProductId: number;
}

export default function SimilarProducts({
  categorySlug,
  excludeProductId,
}: SimilarProductsProps) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(Boolean(categorySlug));

  useEffect(() => {
    if (!categorySlug) {
      return;
    }

    let cancelled = false;

    fetchProducts({ category: categorySlug, limit: 5 })
      .then((data) => {
        if (!cancelled) {
          setProducts(data.filter((p) => p.id !== excludeProductId).slice(0, 4));
        }
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug, excludeProductId]);

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between text-gray-500">
        <h2 className="text-3xl font-bold">Similar Products</h2>

        <Link
          href="/search"
          className="text-gray-500 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group rounded-lg border p-4 transition hover:shadow-lg text-gray-500"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-gray-100">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain p-3 transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300">
                  <ImageOff size={28} />
                </div>
              )}
            </div>

            <h3 className="line-clamp-2 text-sm font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 text-lg font-bold text-orange-600">
              {product.price
                ? `₹${Number(product.price).toLocaleString()}`
                : "Contact for price"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}