"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/lib/types";

interface RequireAuthProps {
    children: React.ReactNode;
    /**
     * Roles that shouldn't see this page even when logged in — e.g. sellers
     * don't need the buyer-facing product/company browsing pages, they only
     * need their dashboard. Matching roles get sent to /dashboard instead.
     */
    blockRoles?: UserRole[];
    /**
     * Whether guests (not logged in) get bounced to /auth/login too.
     * Defaults to true for pages that are login-only. Pages open to guests
     * (e.g. the homepage) but still off-limits to sellers pass `false`.
     */
    requireAuth?: boolean;
}

/**
 * Wrap any page's content with this to require a logged-in user, keep
 * specific roles out, or both. Guests get bounced to /auth/login (unless
 * requireAuth is false) before any of the protected content renders —
 * mirrors the guard DashboardShell already uses.
 */
export default function RequireAuth({
    children,
    blockRoles = [],
    requireAuth = true,
}: RequireAuthProps) {
    const router = useRouter();
    const auth = useAuth();

    const needsLoginRedirect = requireAuth && auth !== null && !auth.isAuthenticated;
    const needsDashboardRedirect =
        auth !== null &&
        auth.isAuthenticated &&
        auth.role !== null &&
        blockRoles.includes(auth.role);

    useEffect(() => {
        if (needsLoginRedirect) {
            router.replace("/auth/login");
        } else if (needsDashboardRedirect) {
            router.replace("/dashboard");
        }
    }, [needsLoginRedirect, needsDashboardRedirect, router]);

    // Still checking localStorage, or about to redirect — render nothing
    // rather than flashing the protected page first.
    if (auth === null || needsLoginRedirect || needsDashboardRedirect) {
        return <div className="min-h-screen bg-gray-50" />;
    }

    return <>{children}</>;
}
