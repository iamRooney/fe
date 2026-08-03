"use client";

import Image from "next/image";
import {
    BadgeCheck,
    Building2,
    CalendarDays,
    MapPin,
    MessageCircle,
    Share2,
    Star,
} from "lucide-react";

interface SupplierHeroProps {
    supplier: {
        name: string;
        logo: string;
        banner: string;
        verified: boolean;
        rating: number;
        reviews: number;
        businessType: string;
        location: string;
        memberSince: number;
    };
}

export default function SupplierHero({
    supplier,
}: SupplierHeroProps) {
    return (
        <section className="mt-6">
            {/* Banner */}
            <div className="relative h-56 overflow-hidden rounded-3xl md:h-72 lg:h-80">
                <Image
                    src={supplier.banner}
                    alt={supplier.name}
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
            </div>

            {/* Company Card */}
            <div className="relative mx-4 -mt-16 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:mx-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left */}
                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* Logo */}
                        <div className="relative h-28 w-28 overflow-hidden rounded-2xl border bg-white shadow">
                            <Image
                                src={supplier.logo}
                                alt={supplier.name}
                                unoptimized
                                fill
                                className="object-contain p-3"
                            />
                        </div>

                        {/* Company Info */}
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                    {supplier.name}
                                </h1>

                                <div className="mt-3 flex flex-wrap items-center gap-3 text-[#0D3B7A]">
                                    {supplier.verified && (
                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                            <BadgeCheck size={16} />
                                            Verified Supplier
                                        </span>
                                    )}

                                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                        <Building2 size={16} />
                                        {supplier.businessType}
                                    </span>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Star
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                    <span className="font-semibold text-gray-900">
                                        {supplier.rating}
                                    </span>

                                    <span>({supplier.reviews} Reviews)</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin size={17} />
                                    {supplier.location}
                                </div>

                                <div className="flex items-center gap-2">
                                    <CalendarDays size={17} />
                                    Member Since {supplier.memberSince}
                                </div>
                            </div>

                            {/* Small Description */}
                            <p className="max-w-2xl text-sm leading-7 text-gray-600">
                                Explore quality products from trusted brands with reliable service,
                                competitive pricing, and fast delivery across India.
                            </p>
                        </div>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex w-full flex-col gap-3 lg:w-64">
                        <button className="rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90">
                            Contact Supplier
                        </button>

                        <button className="flex items-center justify-center gap-2 rounded-xl border border-green-500 px-5 py-3 font-semibold text-green-600 transition hover:bg-green-50">
                            <MessageCircle size={18} />
                            Message Supplier
                        </button>

                        <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
                            <Share2 size={18} />
                            Share Supplier
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}