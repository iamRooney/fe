"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import ProductCard from "./ProductCard";
import CategoryGrid from "./CategoryGird";
import ProductSearchBar from "./ProductSearchbar";
import QuickRFQModal from "./QuickRFQModal";
import { mockRecentlyViewed, mockRecommendedProducts, mockCategorySuggestions } from "@/lib/mock";
import TrustSealBanner from "../TrustSealBanner";

export default function BuyerDiscovery() {
    const [rfqOpen, setRfqOpen] = useState(false);

    return (
        <div className="space-y-10">
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                    <ProductSearchBar />
                </div>
                <button
                    onClick={() => setRfqOpen(true)}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-5 py-3.5 text-sm font-medium text-white hover:bg-orange-600"
                >
                    <Send className="h-4 w-4" />
                    Post Requirement
                </button>
            </div>

            <section>
                <h3 className="text-sm font-semibold text-slate-900">Last viewed products</h3>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {mockRecentlyViewed.map((v) => (
                        <div key={v.id} className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-medium text-slate-500">
                                {v.supplierName.slice(0, 2).toUpperCase()}
                            </div>
                            <p className="mt-3 text-sm font-medium text-slate-900">{v.name}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{v.supplierName}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold text-slate-900">Products you may like</h3>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {mockRecommendedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold text-slate-900">Categories you may like</h3>
                <div className="mt-3">
                    <CategoryGrid categories={mockCategorySuggestions} />
                </div>
            </section>

            <section>
                <TrustSealBanner role="buyer" />
            </section>

            <QuickRFQModal open={rfqOpen} onClose={() => setRfqOpen(false)} />
        </div>
    );
}