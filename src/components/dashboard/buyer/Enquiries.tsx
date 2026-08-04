"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FileText, MessageSquare, Package } from "lucide-react";
import { fetchMyEnquiries, ApiEnquiry } from "@/lib/home";
import { ApiError } from "@/lib/api";

type FilterTab = "all" | "open" | "closed";

function timeAgo(iso: string) {
    const hrs = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
    if (hrs < 1) return "Just now";
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

function listingName(enquiry: ApiEnquiry) {
    return enquiry.product?.name ?? enquiry.service?.name ?? "General enquiry";
}

export default function MyEnquiries() {
    const [tab, setTab] = useState<FilterTab>("all");
    const [enquiries, setEnquiries] = useState<ApiEnquiry[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetchMyEnquiries()
            .then((res) => {
                if (!cancelled) setEnquiries(res.data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError ? err.message : "Couldn't load your enquiries."
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

    const filtered = enquiries.filter((e) => tab === "all" || e.status === tab);

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">My Enquiries</h1>
            <p className="mt-1 text-sm text-slate-500">
                Enquiries you&apos;ve sent to suppliers and their status.
            </p>

            <div className="mt-5 flex gap-2">
                {(["all", "open", "closed"] as FilterTab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`rounded-full px-4 py-1.5 text-sm capitalize transition-colors ${tab === t
                            ? "bg-[#0057D9] text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {loading && <p className="mt-5 text-sm text-slate-400">Loading...</p>}

            {error && <p className="mt-5 text-sm font-medium text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-white">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                <FileText className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                {enquiries.length === 0
                                    ? "No enquiries yet — send one from a product page to see it here."
                                    : `No ${tab} enquiries.`}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filtered.map((enquiry) => (
                                <div key={enquiry.id} className="flex items-start gap-4 px-5 py-4">
                                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-500">
                                        {enquiry.company?.logo_url ? (
                                            <Image
                                                src={enquiry.company.logo_url}
                                                alt={enquiry.company.name}
                                                fill
                                                unoptimized
                                                className="object-contain bg-white p-1"
                                            />
                                        ) : (
                                            <Package className="h-5 w-5" />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate text-sm font-medium text-slate-900">
                                                {listingName(enquiry)}
                                            </p>
                                            <span className="shrink-0 text-xs text-slate-300">
                                                {enquiry.enquiry_number}
                                            </span>
                                        </div>
                                        <p className="mt-0.5 truncate text-xs text-slate-400">
                                            {enquiry.company?.name ?? "Unknown supplier"}
                                        </p>
                                        <p className="mt-1.5 line-clamp-2 flex items-start gap-1.5 text-xs text-slate-500">
                                            <MessageSquare className="mt-0.5 h-3 w-3 shrink-0 text-slate-300" />
                                            {enquiry.message}
                                        </p>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${enquiry.status === "open"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {enquiry.status}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {timeAgo(enquiry.created_at)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
