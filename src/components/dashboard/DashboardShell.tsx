"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Home } from "lucide-react";
import { getNavItems } from "./dashboard-nav";
import { useAuth } from "@/hooks/useAuth";
import { clearAuthSession } from "@/lib/auth";
import DashboardOverview from "./DashboardOverview";
import MessagesPage from "../messages/MessagePage";
import PlaceholderSection from "./PlaceholderSection";
import MyEnquiries from "./buyer/Enquiries";
import SavedSuppliers from "./buyer/Saved";
import RecentlyViewed from "./buyer/Recently";
import BuyerProfileEdit from "./buyer/ProfileEdit";
import AddProduct from "./seller/AddProduct";
import MyProducts from "./seller/MyProducts";
import RequirementLeads from "./seller/RequirementLeads";

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
    const user = auth.user;
    const navItems = getNavItems(role);

    // Buyer nav no longer has an "overview" tab, so fall back to the first
    // available section (My Enquiries) instead of a blank/placeholder page.
    const currentSection =
        activeSection === "overview" && !navItems.some((n) => n.id === "overview")
            ? navItems[0]?.id ?? activeSection
            : activeSection;

    function handleLogout() {
        clearAuthSession();
        // Full navigation so every bit of auth-derived UI (this shell
        // included) re-reads the now-empty localStorage on load.
        window.location.href = "/";
    }

    function renderSection() {
        if (currentSection === "overview") return <DashboardOverview role={role} />;
        if (currentSection === "messages") return <MessagesPage />;
        if (currentSection === "enquiries") return <MyEnquiries />;
        if (currentSection === "saved") return <SavedSuppliers />;
        if (currentSection === "recent") return <RecentlyViewed />;
        if (currentSection === "profile" && role === "buyer") return <BuyerProfileEdit />;
        if (currentSection === "add-product") return <AddProduct />;
        if (currentSection === "products") return <MyProducts />;
        if (currentSection === "requirements" && role === "seller") return <RequirementLeads />;
        const item = navItems.find((n) => n.id === currentSection);
        return <PlaceholderSection title={item?.label ?? ""} />;
    }

    return (
        <div className="flex h-screen bg-slate-50">
            <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-5 py-5">
                    <p className="text-lg font-semibold text-[#0057D9]">Exbhex</p>
                    <p className="mt-0.5 text-xs capitalize text-slate-400">{role} dashboard</p>

                    {role === "buyer" && (
                        <Link
                            href="/"
                            className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                            <Home size={16} />
                            Back to Home
                        </Link>
                    )}
                </div>

                <nav className="flex-1 space-y-1 p-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentSection === item.id;
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

                <div className="border-t border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0057D9]/10 text-[#0057D9]">
                            <User size={18} />
                        </span>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {user?.name ?? "Account"}
                            </p>
                            <p className="text-xs capitalize text-slate-400">{role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto">{renderSection()}</main>
        </div>
    );
}