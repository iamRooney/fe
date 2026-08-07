"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Shield } from "lucide-react";
import { adminNavItems } from "./admin-nav";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { clearAdminSession } from "@/lib/admin-auth";
import DocumentsReview from "./DocumentsReview";
import AdminPlaceholderSection from "./AdminPlaceholderSection";

export default function AdminShell() {
    const router = useRouter();
    const auth = useAdminAuth();
    const [activeSection, setActiveSection] = useState("documents");

    const needsRedirect = auth !== null && !auth.isAuthenticated;

    useEffect(() => {
        if (needsRedirect) {
            router.push("/admin/login");
        }
    }, [needsRedirect, router]);

    if (auth === null || needsRedirect) {
        return <div className="flex h-screen items-center justify-center bg-slate-50" />;
    }

    function handleLogout() {
        clearAdminSession();
        window.location.href = "/admin/login";
    }

    function renderSection() {
        if (activeSection === "documents") return <DocumentsReview />;
        const item = adminNavItems.find((n) => n.id === activeSection);
        return <AdminPlaceholderSection title={item?.label ?? ""} />;
    }

    return (
        <div className="flex h-screen bg-slate-50">
            <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-5 py-5">
                    <p className="text-lg font-semibold text-[#0057D9]">Exbhex</p>
                    <p className="mt-0.5 text-xs text-slate-400">Admin panel</p>
                </div>

                <nav className="flex-1 space-y-1 p-3">
                    {adminNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                    isActive
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
                            <Shield size={18} />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {auth.admin?.name ?? "Admin"}
                            </p>
                            <p className="truncate text-xs text-slate-400">{auth.admin?.email ?? ""}</p>
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
