"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Package, RefreshCw, Send } from "lucide-react";
import { fetchMyRequirements, ApiRequirement, RequirementStatus } from "@/lib/home";
import { ApiError } from "@/lib/api";

type FilterTab = "all" | RequirementStatus;

function timeAgo(iso: string) {
    const hrs = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
    if (hrs < 1) return "Just now";
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

const statusStyles: Record<RequirementStatus, string> = {
    open: "bg-blue-50 text-blue-700",
    accepted: "bg-green-50 text-green-700",
    closed: "bg-slate-100 text-slate-500",
};

export default function MyRFQ() {
    const [tab, setTab] = useState<FilterTab>("all");
    const [requirements, setRequirements] = useState<ApiRequirement[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback((opts: { silent?: boolean } = {}) => {
        if (opts.silent) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        return fetchMyRequirements()
            .then((res) => {
                setRequirements(res.data);
                setError("");
            })
            .catch((err) => {
                setError(err instanceof ApiError ? err.message : "Couldn't load your RFQs.");
            })
            .finally(() => {
                setLoading(false);
                setRefreshing(false);
            });
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const filtered = requirements.filter((r) => tab === "all" || r.status === tab);

    return (
        <div className="p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">My RFQs</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Requirements you&apos;ve posted and whether a supplier has accepted them yet.
                    </p>
                </div>

                <button
                    onClick={() => load({ silent: true })}
                    disabled={loading || refreshing}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    title="A requirement's status can change (e.g. accepted or closed) while this page is open — refresh to see the latest."
                >
                    <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            <div className="mt-5 flex gap-2">
                {(["all", "open", "accepted", "closed"] as FilterTab[]).map((t) => (
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
                                <Send className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                {requirements.length === 0
                                    ? "No RFQs yet — post a requirement to start receiving quotes."
                                    : `No ${tab} RFQs.`}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filtered.map((requirement) => (
                                <div
                                    key={requirement.id}
                                    className="flex items-start justify-between gap-4 px-5 py-4"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate text-sm font-medium text-slate-900">
                                                {requirement.title}
                                            </p>
                                            <span className="shrink-0 text-xs text-slate-300">
                                                {requirement.requirement_number}
                                            </span>
                                        </div>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            {requirement.category?.name ?? "Uncategorized"} ·{" "}
                                            {timeAgo(requirement.created_at)}
                                        </p>

                                        <p className="mt-1.5 text-sm font-medium text-slate-700">
                                            {Number(requirement.quantity).toLocaleString()}{" "}
                                            {requirement.unit}
                                        </p>

                                        {requirement.accepted_by_company && (
                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                                                    {requirement.accepted_by_company.logo_url ? (
                                                        <Image
                                                            src={requirement.accepted_by_company.logo_url}
                                                            alt={requirement.accepted_by_company.name}
                                                            fill
                                                            unoptimized
                                                            className="object-contain bg-white p-0.5"
                                                        />
                                                    ) : (
                                                        <Package className="h-3.5 w-3.5 text-slate-400" />
                                                    )}
                                                </div>
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 size={14} className="text-green-600" />
                                                    Accepted by{" "}
                                                    <span className="font-medium text-slate-900">
                                                        {requirement.accepted_by_company.name}
                                                    </span>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[requirement.status]}`}
                                    >
                                        {requirement.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
