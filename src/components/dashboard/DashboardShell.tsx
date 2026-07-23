"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
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
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
        <div className="flex h-screen flex-col bg-slate-50 lg:flex-row">

            {/* Mobile top bar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
                <div>
                    <p className="text-lg font-semibold text-[#0057D9]">Exbhex</p>
                    <p className="text-xs capitalize text-slate-400">{role} dashboard</p>
                </div>

                <button
                    onClick={() => setMobileNavOpen(true)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600"
                    aria-label="Open menu"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Mobile drawer backdrop */}
            {mobileNavOpen && (
                <div
                    onClick={() => setMobileNavOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar: static on desktop, slide-in drawer on mobile */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 -translate-x-full flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : ""
                    }`}
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
                    <div>
                        <p className="text-lg font-semibold text-[#0057D9]">Exbhex</p>
                        <p className="mt-0.5 text-xs capitalize text-slate-400">{role} dashboard</p>
                    </div>

                    <button
                        onClick={() => setMobileNavOpen(false)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setMobileNavOpen(false);
                                }}
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
