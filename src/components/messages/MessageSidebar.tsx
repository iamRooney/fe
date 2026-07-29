"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Conversation } from "./types";

interface MessageSidebarProps {
    conversations: Conversation[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

type FilterTab = "all" | "unread" | "starred";

function timeAgo(iso: string) {
    const diffMs = Date.now() - new Date(iso).getTime();
    const hrs = Math.floor(diffMs / 3600000);
    if (hrs < 1) return "Just now";
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

export default function MessageSidebar({ conversations, selectedId, onSelect }: MessageSidebarProps) {
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState<FilterTab>("all");

    const filtered = conversations
        .filter((c) => c.supplierName.toLowerCase().includes(query.toLowerCase()))
        .filter((c) => {
            if (tab === "unread") return c.unreadCount > 0;
            if (tab === "starred") return c.isStarred;
            return true;
        });

    return (
        <aside className="flex w-[360px] flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-5">
                <h2 className="text-xl font-semibold text-slate-900">Messages</h2>

                <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search conversations..."
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9]"
                    />
                </div>

                <div className="mt-4 flex gap-2">
                    {(["all", "unread", "starred"] as FilterTab[]).map((t) => (
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
            </div>

            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
                        No conversations found
                    </div>
                ) : (
                    filtered.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => onSelect(c.id)}
                            className={`flex w-full items-start gap-3 border-b border-slate-100 px-5 py-4 text-left transition-colors ${selectedId === c.id ? "bg-blue-50" : "hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0057D9] text-sm font-medium text-white">
                                {c.supplierAvatar}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="truncate text-sm font-medium text-slate-900">
                                        {c.supplierName}
                                    </p>
                                    <span className="shrink-0 text-xs text-slate-400">
                                        {timeAgo(c.lastMessageAt)}
                                    </span>
                                </div>
                                <div className="mt-0.5 flex items-center justify-between gap-2">
                                    <p className="truncate text-sm text-slate-500">{c.lastMessage}</p>
                                    {c.unreadCount > 0 && (
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-xs font-medium text-white">
                                            {c.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
}