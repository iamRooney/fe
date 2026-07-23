"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// import Header from "./Header";
import MessageSidebar from "./MessageSidebar";
import ChatWindow from "./ChatWindow";
import SupplierInfo from "./SupplierInfo";
import { mockConversations } from "./mock-data";

export default function MessagesPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="flex h-full flex-col bg-white">
            {/* <Header /> */}

            <div className="border-b border-slate-200 bg-white px-6 py-3">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-[#003B95] hover:to-[#1E6FFF] hover:text-white hover:shadow-md"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    Back to Home
                </Link>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <MessageSidebar
                    conversations={mockConversations}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    hiddenOnMobile={!!selectedId}
                />
                <ChatWindow
                    conversationId={selectedId}
                    onBack={() => setSelectedId(null)}
                    hiddenOnMobile={!selectedId}
                />
                <SupplierInfo conversationId={selectedId} />
            </div>
        </div>
    );
}