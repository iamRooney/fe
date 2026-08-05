"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, FileText, Loader2, Phone, RefreshCw } from "lucide-react";
import { fetchMyRequirements, acceptRequirement, ApiRequirement } from "@/lib/home";
import { ApiError } from "@/lib/api";

function timeAgo(iso: string) {
    const hrs = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
    if (hrs < 1) return "Just now";
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

// Local view of an accepted item — keeps the buyer's phone number the
// /accept response reveals. The list endpoint (GET /requirements) also
// includes it for anything this seller has already won, so a page
// refresh doesn't lose it — see RequirementController@indexForSeller.
type WonState = { phone: string };

export default function RequirementLeads() {
    const [requirements, setRequirements] = useState<ApiRequirement[]>([]);
    const [won, setWon] = useState<Record<number, WonState>>({});
    const [taken, setTaken] = useState<Record<number, true>>({});
    const [acceptingId, setAcceptingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const load = useCallback((opts: { silent?: boolean } = {}) => {
        if (opts.silent) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        return fetchMyRequirements()
            .then((res) => {
                setRequirements(res.data);
                // Leads can flip between open/closed/accepted on the admin
                // or seller side while this page sits open in a tab — a
                // fresh fetch is the source of truth, so drop any stale
                // local overrides from a previous render.
                setWon({});
                setTaken({});
                setError("");
            })
            .catch((err) => {
                setError(err instanceof ApiError ? err.message : "Couldn't load requirement leads.");
            })
            .finally(() => {
                setLoading(false);
                setRefreshing(false);
            });
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    async function handleAccept(requirement: ApiRequirement) {
        setAcceptingId(requirement.id);

        try {
            const res = await acceptRequirement(requirement.id);
            setWon((prev) => ({ ...prev, [requirement.id]: { phone: res.data.buyer?.phone ?? "" } }));
        } catch (err) {
            if (err instanceof ApiError && err.status === 409) {
                // Someone else got there first — drop it from the open list.
                setTaken((prev) => ({ ...prev, [requirement.id]: true }));
            } else {
                alert(
                    err instanceof ApiError ? err.message : "Couldn't accept this requirement."
                );
            }
        } finally {
            setAcceptingId(null);
        }
    }

    const visible = requirements.filter((r) => !taken[r.id]);

    return (
        <div className="p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">RFQ Leads</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Buyer requirements matching the categories you sell in, plus anything you've
                        already accepted. First supplier to accept gets the order.
                    </p>
                </div>

                <button
                    onClick={() => load({ silent: true })}
                    disabled={loading || refreshing}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    title="A lead's status can change (e.g. closed by admin) while this page is open — refresh to see the latest."
                >
                    <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {loading && <p className="mt-5 text-sm text-slate-400">Loading...</p>}

            {!loading && error && (
                <p className="mt-5 text-sm font-medium text-red-500">{error}</p>
            )}

            {!loading && !error && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-white">
                    {visible.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                <FileText className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                No open requirements in your categories right now.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {visible.map((requirement) => {
                                // Anything with status "accepted" that made it into this
                                // seller's list was accepted by them (see backend) — so
                                // treat it as won even after a page refresh, not just
                                // right after the accept click.
                                const isWon =
                                    won[requirement.id] ??
                                    (requirement.status === "accepted"
                                        ? { phone: requirement.buyer?.phone ?? "" }
                                        : undefined);
                                const isAccepting = acceptingId === requirement.id;

                                return (
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
                                                {requirement.buyer?.name ?? "Buyer"} ·{" "}
                                                {timeAgo(requirement.created_at)}
                                            </p>

                                            <p className="mt-1.5 text-sm font-medium text-slate-700">
                                                {Number(requirement.quantity).toLocaleString()}{" "}
                                                {requirement.unit}
                                            </p>

                                            {isWon && (
                                                <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-green-600">
                                                    <CheckCircle2 size={16} />
                                                    You accepted this
                                                    {isWon.phone && (
                                                        <a
                                                            href={`tel:${isWon.phone}`}
                                                            className="ml-2 flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700 hover:bg-green-100"
                                                        >
                                                            <Phone size={12} />
                                                            {isWon.phone}
                                                        </a>
                                                    )}
                                                    {requirement.alternate_phone && (
                                                        <a
                                                            href={`tel:${requirement.alternate_phone}`}
                                                            className="ml-1 flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-100"
                                                            title="Alternate number"
                                                        >
                                                            <Phone size={12} />
                                                            {requirement.alternate_phone}
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {!isWon && (
                                            <button
                                                onClick={() => handleAccept(requirement)}
                                                disabled={isAccepting}
                                                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0057D9] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isAccepting ? (
                                                    <>
                                                        <Loader2 size={14} className="animate-spin" />
                                                        Accepting...
                                                    </>
                                                ) : (
                                                    "Accept"
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
