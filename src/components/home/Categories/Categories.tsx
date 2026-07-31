"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import Container from "@/components/ui/Container";
import CategoryCard from "@/components/cards/CategoryCard";
import { fetchCategories, ApiCategory } from "@/lib/home";
import { ApiError } from "@/lib/api";

export default function Categories() {
    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetchCategories()
            .then((data) => {
                if (!cancelled) setCategories(data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Couldn't load categories."
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

    return (
        <section className="bg-white py-16">

            <Container>

                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

                    <div>

                        <p className="text-sm text-gray-500">
                            Sourcing made easy across diverse industrial sectors.
                        </p>

                        <h2 className="mt-1 text-3xl font-bold text-[#1F2937]">
                            Explore Popular Categories
                        </h2>

                    </div>

                    {categories.length > 0 && (
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Previous categories"
                                disabled={isBeginning}
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#E7EAF0]
                                    text-[#0D3B7A]
                                    transition-all
                                    duration-300
                                    hover:border-[#0D3B7A]/30
                                    hover:bg-[#0D3B7A]
                                    hover:text-white
                                    disabled:cursor-not-allowed
                                    disabled:opacity-30
                                    disabled:hover:bg-transparent
                                    disabled:hover:text-[#0D3B7A]
                                "
                            >
                                <ArrowLeft size={18} />
                            </button>

                            <button
                                type="button"
                                aria-label="Next categories"
                                disabled={isEnd}
                                onClick={() => swiperRef.current?.slideNext()}
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#E7EAF0]
                                    text-[#0D3B7A]
                                    transition-all
                                    duration-300
                                    hover:border-[#0D3B7A]/30
                                    hover:bg-[#0D3B7A]
                                    hover:text-white
                                    disabled:cursor-not-allowed
                                    disabled:opacity-30
                                    disabled:hover:bg-transparent
                                    disabled:hover:text-[#0D3B7A]
                                "
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                </div>

                {error && (
                    <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
                )}

                {!loading && !error && categories.length === 0 && (
                    <p className="mt-4 text-sm text-gray-400">No categories yet.</p>
                )}

                {categories.length > 0 && (
                    <Swiper
                        modules={[Navigation]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        spaceBetween={16}
                        slidesPerGroup={1}
                        className="mt-10 !overflow-hidden"
                        breakpoints={{
                            320: {
                                slidesPerView: 2.2,
                                slidesPerGroup: 2,
                            },
                            640: {
                                slidesPerView: 3.2,
                                slidesPerGroup: 3,
                            },
                            768: {
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                            },
                            1024: {
                                slidesPerView: 6,
                                slidesPerGroup: 6,
                            },
                            1280: {
                                slidesPerView: 8,
                                slidesPerGroup: 8,
                            },
                        }}
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={category.id}>
                                <CategoryCard
                                    title={category.name}
                                    iconUrl={category.icon_url}
                                    accent={index % 2 === 0 ? "navy" : "orange"}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

            </Container>

        </section>
    );
}