"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "./ProductCard";
import { Product } from "./types";
import { fetchProducts, ApiProduct } from "@/lib/home";
import { ApiError } from "@/lib/api";

function toHomeProduct(p: ApiProduct): Product {
    return {
        id: p.id,
        name: p.name,
        image: p.image_url,
        supplier: p.company?.name ?? "Unknown Supplier",
        price: p.price ? `$${Number(p.price).toLocaleString()}` : "Contact for price",
        moq: p.unit ? `Unit: ${p.unit}` : "Contact for MOQ",
        verified: p.company?.verified ?? false,
        badge: p.featured ? "TRENDING" : undefined,
    };
}

export default function ProductSlider() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetchProducts({ featured: true, limit: 10 })
            .then((data) => {
                if (!cancelled) setProducts(data.map(toHomeProduct));
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Couldn't load products."
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (error) {
        return <p className="text-sm font-medium text-red-500">{error}</p>;
    }

    if (!loading && products.length === 0) {
        return (
            <p className="text-sm text-gray-400">
                No featured products yet — check back soon.
            </p>
        );
    }

    return (
        <Swiper
            navigation
            spaceBetween={20}
            modules={[Navigation]}
            breakpoints={{
                320: {
                    slidesPerView: 1.2,
                },
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                1400: {
                    slidesPerView: 5,
                },
            }}
        >
            {products.map((product) => (
                <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}