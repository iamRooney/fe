"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    Send,
    Bookmark,
    FileText,
    Clock3,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Inbox,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import QuickRFQModal from "./QuickRFQModal";
import ProductCard from "@/components/home/TrendingProducts/ProductCard";
import { Product as HomeProduct } from "@/components/home/TrendingProducts/types";
import CategoryCard from "@/components/cards/CategoryCard";
import TrustSealBanner from "../TrustSealBanner";
import StatCard from "../Statcard";
import {
    fetchCategories,
    fetchMyEnquiries,
    fetchProducts,
    fetchSavedCompanies,
    ApiCategory,
    ApiEnquiry,
    ApiProduct,
} from "@/lib/home";
import { ApiError } from "@/lib/api";

function toHomeProduct(p: ApiProduct): HomeProduct {
    return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        image: p.image_url,
        supplier: p.company?.name ?? "Unknown Supplier",
        price: p.price ? `$${Number(p.price).toLocaleString()}` : "Contact for price",
        moq: p.unit ? `Unit: ${p.unit}` : "Contact for MOQ",
        verified: p.company?.verified ?? false,
        badge: p.featured ? "TRENDING" : undefined,
    };
}

function timeAgo(iso: string) {
    const ms = Date.now() - new Date(iso).getTime();
    const days = Math.floor(ms / 86400000);
    if (days < 1) return "Today";
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
}

interface BuyerDiscoveryProps {
    /** Jump the dashboard shell to another section, e.g. "enquiries" or "saved". */
    onNavigate?: (section: string) => void;
}

export default function BuyerDiscovery({ onNavigate }: BuyerDiscoveryProps) {
    const [rfqOpen, setRfqOpen] = useState(false);

    const [savedCount, setSavedCount] = useState<number | null>(null);
    const [enquiries, setEnquiries] = useState<ApiEnquiry[]>([]);
    const [enquiriesLoading, setEnquiriesLoading] = useState(true);
    const [products, setProducts] = useState<HomeProduct[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [categoriesError, setCategoriesError] = useState("");
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetchSavedCompanies()
            .then((res) => {
                if (!cancelled) setSavedCount(res.data.length);
            })
            .catch(() => {
                if (!cancelled) setSavedCount(0);
            });

        fetchMyEnquiries({ limit: 50 })
            .then((res) => {
                if (!cancelled) setEnquiries(res.data);
            })
            .catch(() => {
                if (!cancelled) setEnquiries([]);
            })
            .finally(() => {
                if (!cancelled) setEnquiriesLoading(false);
            });

        fetchProducts({ limit: 4 })
            .then((data) => {
                if (!cancelled) setProducts(data.map(toHomeProduct));
            })
            .catch(() => {
                if (!cancelled) setProducts([]);
            })
            .finally(() => {
                if (!cancelled) setProductsLoading(false);
            });

        fetchCategories()
            .then((data) => {
                if (!cancelled) setCategories(data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setCategoriesError(
                        err instanceof ApiError ? err.message : "Couldn't load categories."
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setCategoriesLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const openCount = enquiries.filter((e) => e.status === "open").length;
    const closedCount = enquiries.filter((e) => e.status === "closed").length;
    const recentEnquiries = enquiries.slice(0, 4);

    return (
        <div className="space-y-10">
            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">Looking to source something new?</h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                        Post a requirement and get quotes from verified suppliers.
                    </p>
                </div>
                <button
                    onClick={() => setRfqOpen(true)}
                    className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-5 py-3 text-sm font-medium text-white hover:bg-orange-600 sm:w-auto"
                >
                    <Send className="h-4 w-4" />
                    Post Requirement
                </button>
            </div>

            <section>
                <div className="grid grid-cols-4 gap-4">
                    <StatCard
                        icon={Bookmark}
                        label="Saved suppliers"
                        value={savedCount === null ? "—" : String(savedCount)}
                    />
                    <StatCard
                        icon={FileText}
                        label="Enquiries sent"
                        value={enquiriesLoading ? "—" : String(enquiries.length)}
                    />
                    <StatCard
                        icon={Clock3}
                        label="Open enquiries"
                        value={enquiriesLoading ? "—" : String(openCount)}
                    />
                    <StatCard
                        icon={CheckCircle2}
                        label="Closed enquiries"
                        value={enquiriesLoading ? "—" : String(closedCount)}
                    />
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">Recent enquiries</h3>
                    {enquiries.length > 0 && (
                        <button
                            onClick={() => onNavigate?.("enquiries")}
                            className="flex items-center gap-1 text-xs font-medium text-[#0057D9] hover:underline"
                        >
                            View all
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <div className="mt-3 rounded-xl border border-slate-200 bg-white">
                    {enquiriesLoading ? (
                        <div className="px-5 py-10 text-center text-sm text-slate-400">
                            Loading...
                        </div>
                    ) : recentEnquiries.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                                <Inbox className="h-5 w-5 text-slate-400" />
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                You haven&apos;t sent any enquiries yet.
                            </p>
                            <button
                                onClick={() => onNavigate?.("post-rfq")}
                                className="mt-3 text-xs font-medium text-[#0057D9] hover:underline"
                            >
                                Post your first requirement
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {recentEnquiries.map((e) => (
                                <div key={e.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-slate-900">
                                            {e.product?.name ?? e.service?.name ?? "General enquiry"}
                                        </p>
                                        <p className="mt-0.5 truncate text-xs text-slate-400">
                                            {e.company?.name ?? "Supplier"} · {e.enquiry_number} · {timeAgo(e.created_at)}
                                        </p>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${e.status === "open"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        {e.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold text-slate-900">Products you may like</h3>
                <div className="mt-3 grid grid-cols-4 gap-4">
                    {productsLoading ? (
                        <p className="col-span-4 text-sm text-slate-400">Loading...</p>
                    ) : products.length === 0 ? (
                        <p className="col-span-4 text-sm text-slate-400">No products available yet.</p>
                    ) : (
                        products.map((p) => <ProductCard key={p.id} product={p} />)
                    )}
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-slate-900">Categories you may like</h3>

                    <div className="flex items-center gap-3">
                        <Link href="/categories" className="text-xs font-medium text-[#0057D9] hover:underline">
                            Browse all
                        </Link>

                        {categories.length > 0 && (
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label="Previous categories"
                                    disabled={isBeginning}
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[#0057D9] transition-colors hover:border-[#0057D9]/30 hover:bg-[#0057D9] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0057D9]"
                                >
                                    <ArrowLeft size={14} />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next categories"
                                    disabled={isEnd}
                                    onClick={() => swiperRef.current?.slideNext()}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[#0057D9] transition-colors hover:border-[#0057D9]/30 hover:bg-[#0057D9] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0057D9]"
                                >
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {categoriesError && (
                    <p className="mt-3 text-sm font-medium text-red-500">{categoriesError}</p>
                )}

                {!categoriesLoading && !categoriesError && categories.length === 0 && (
                    <p className="mt-3 text-sm text-slate-400">No categories yet.</p>
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
                        className="mt-4 !overflow-hidden"
                        breakpoints={{
                            320: { slidesPerView: 2.2, slidesPerGroup: 2 },
                            640: { slidesPerView: 3.2, slidesPerGroup: 3 },
                            1024: { slidesPerView: 4, slidesPerGroup: 4 },
                            1280: { slidesPerView: 5, slidesPerGroup: 5 },
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
            </section>

            <section>
                <TrustSealBanner role="buyer" />
            </section>

            <QuickRFQModal open={rfqOpen} onClose={() => setRfqOpen(false)} />
        </div>
    );
}
