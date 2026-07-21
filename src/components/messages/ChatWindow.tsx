"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import EmptyState from "./EmptyState";
import { mockConversations, mockMessages } from "./mock-data";

interface ChatWindowProps {
    conversationId: string | null;
}

function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWindow({ conversationId }: ChatWindowProps) {
    const [draft, setDraft] = useState("");

    if (!conversationId) {
        return (
            <section className="flex-1 bg-slate-50">
                <EmptyState />
            </section>
        );
    }

    const conversation = mockConversations.find((c) => c.id === conversationId);
    const messages = mockMessages[conversationId] ?? [];

    return (
        <section className="flex flex-1 flex-col bg-slate-50">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-6 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0057D9] text-xs font-medium text-white">
                    {conversation?.supplierAvatar}
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-900">{conversation?.supplierName}</p>
                    <p className="text-xs text-slate-400">Usually responds within a few hours</p>
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${m.senderType === "buyer" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${m.senderType === "buyer"
                                ? "bg-[#0057D9] text-white"
                                : "border border-slate-200 bg-white text-slate-800"
                                }`}
                        >
                            <p>{m.text}</p>
                            <p
                                className={`mt-1 text-[11px] ${m.senderType === "buyer" ? "text-blue-100" : "text-slate-400"
                                    }`}
                            >
                                {formatTime(m.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
                <div className="flex items-end gap-2">
                    {/* <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Paperclip className="h-5 w-5" />
                    </button> */}
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Type your message..."
                        rows={1}
                        className="max-h-32 flex-1 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9]"
                    />
                    <button
                        disabled={!draft.trim()}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0057D9] text-white transition-opacity disabled:opacity-40"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}