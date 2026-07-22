"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNavItems } from "./dashboard-nav";
import { useAuth } from "@/hooks/useAuth";
import DashboardOverview from "./DashboardOverview";
import MessagesPage from "../messages/MessagePage";
import PlaceholderSection from "./PlaceholderSection";
import MyEnquiries from "./buyer/Enquiries";
import PostRFQ from "./buyer/PostRFQ";
import SavedSuppliers from "./buyer/Saved";
import RecentlyViewed from "./buyer/Recently";

export default function DashboardShell() {
    const router = useRouter();
    const auth = useAuth();
    const [activeSection, setActiveSection] = useState("overview");

    const needsRedirect = auth !== null && (!auth.isAuthenticated || !auth.role);

    useEffect(() => {
        if (needsRedirect) {
            router.push("/auth/login");
        }
    }, [needsRedirect, router]);

    // Still checking localStorage, or about to redirect — render nothing
    if (auth === null || needsRedirect) {
        return <div className="flex h-screen items-center justify-center bg-slate-50" />;
    }

    const role = auth.role!;
    const navItems = getNavItems(role);

    function renderSection() {
        if (activeSection === "overview") return <DashboardOverview role={role} />;
        if (activeSection === "messages") return <MessagesPage />;
        if (activeSection === "enquiries") return <MyEnquiries />;
        if (activeSection === "post-rfq") return <PostRFQ />;
        if (activeSection === "saved") return <SavedSuppliers />;
        if (activeSection === "recent") return <RecentlyViewed />;
        const item = navItems.find((n) => n.id === activeSection);
        return <PlaceholderSection title={item?.label ?? ""} />;
    }

    return (
        <div className="flex h-screen bg-slate-50">
            <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-5 py-5">
                    <p className="text-lg font-semibold text-[#0057D9]">Exbhex</p>
                    <p className="mt-0.5 text-xs capitalize text-slate-400">{role} dashboard</p>
                </div>

                <nav className="flex-1 space-y-1 p-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-[#0057D9] text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <Icon className="h-4.5 w-4.5" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto">{renderSection()}</main>
        </div>
    );
}