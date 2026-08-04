"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { History, Package } from "lucide-react";
import { fetchRecentlyViewed, ApiRecentlyViewedItem } from "@/lib/home";
import { ApiError } from "@/lib/api";

function timeAgo(iso: string) {
    const hrs = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
    if (hrs < 1) return "Just now";
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function RecentlyViewed() {
    const [items, setItems] = useState<ApiRecentlyViewedItem[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetchRecentlyViewed()
            .then((res) => {
                if (!cancelled) setItems(res.data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Couldn't load your recently viewed products."
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
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">Recently Viewed</h1>
            <p className="mt-1 text-sm text-slate-500">Products you&apos;ve looked at recently.</p>

            {loading && <p className="mt-5 text-sm text-slate-400">Loading...</p>}

            {error && <p className="mt-5 text-sm font-medium text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-white">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                <History className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                Nothing viewed yet — browse products to see them here.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {items
                                .filter((v) => v.product)
                                .map((v) => {
                                    const product = v.product!;
                                    return (
                                        <Link
                                            key={v.id}
                                            href={`/products/${product.slug}`}
                                            className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                                        >
                                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-500">
                                                {product.image_url ? (
                                                    <Image
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <Package className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-slate-900">
                                                    {product.name}
                                                </p>
                                                <p className="truncate text-xs text-slate-400">
                                                    {product.company?.name ?? "Unknown supplier"}
                                                </p>
                                            </div>
                                            <span className="shrink-0 text-xs text-slate-400">
                                                {timeAgo(v.viewed_at)}
                                            </span>
                                        </Link>
                                    );
                                })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
