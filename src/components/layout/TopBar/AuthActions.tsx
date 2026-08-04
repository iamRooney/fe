"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { clearAuthSession } from "@/lib/auth";

export default function AuthActions() {
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        clearAuthSession();
        // Full navigation (not router.push) so every bit of auth-derived UI
        // — this menu included — re-reads the now-empty localStorage on load.
        window.location.href = "/";
    }

    // Still checking localStorage — render nothing rather than flashing the
    // logged-out links first (same pattern used by useAuth's other callers).
    if (auth === null) {
        return <div className="h-5 w-32" />;
    }

    if (!auth.isAuthenticated || !auth.user) {
        return (
            <>
                <Link
                    href="/auth/login"
                    className="font-medium hover:text-orange-400 transition"
                >
                    Login
                </Link>

                <Link
                    href="/auth/register"
                    className="font-medium hover:text-orange-400 transition"
                >
                    Register
                </Link>
            </>
        );
    }

    const { user, role } = auth;

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 font-medium hover:text-orange-400 transition"
            >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <User size={14} />
                </span>

                <span className="max-w-[120px] truncate">{user.name}</span>

                {role && (
                    <span className="hidden rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold capitalize sm:inline">
                        {role}
                    </span>
                )}

                <ChevronDown
                    size={14}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 text-slate-700 shadow-lg">
                    <div className="border-b border-slate-100 px-4 py-3">
                        <p className="truncate text-sm font-semibold text-slate-900">
                            {user.name}
                        </p>
                        {role && (
                            <p className="mt-0.5 text-xs capitalize text-slate-500">
                                {role} account
                            </p>
                        )}
                    </div>

                    <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
                    >
                        <LayoutDashboard size={16} />
                        Go to Dashboard
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
