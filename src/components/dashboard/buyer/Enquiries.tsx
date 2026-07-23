"use client";

import { useState } from "react";
import { mockRFQs } from "@/lib/mock";

type FilterTab = "all" | "open" | "closed";

function timeAgo(iso: string) {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days < 1) return "Today";
    return `${days}d ago`;
}

export default function MyEnquiries() {
    const [tab, setTab] = useState<FilterTab>("all");

    const filtered = mockRFQs.filter((r) => tab === "all" || r.status === tab);

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl font-semibold text-slate-900">My Enquiries</h1>
            <p className="mt-1 text-sm text-slate-500">Track RFQs you've sent and the quotes you've received.</p>

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

            <div className="mt-5 rounded-xl border border-slate-200 bg-white">
                {filtered.length === 0 ? (
                    <div className="px-5 py-10 text-center text-sm text-slate-400">No enquiries found.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filtered.map((r) => (
                            <div key={r.id} className="flex items-center justify-between px-5 py-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{r.title}</p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        {r.category} · {r.quantity} · {r.quotesReceived} quotes received · {timeAgo(r.postedAt)}
                                    </p>
                                </div>
                                <span
                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${r.status === "open" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {r.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}