"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "./ProductCard";
import { products } from "./products";

export default function ProductSlider() {
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