"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { recordProductView } from "@/lib/home";

interface Props {
    productId: number;
}

/**
 * Renders nothing — just pings the backend once per page view so the
 * product shows up in the buyer's "Recently Viewed" dashboard section.
 * Sellers/guests browsing a listing don't have a recently-viewed list,
 * so this is a no-op for them.
 */
export default function ProductViewTracker({ productId }: Props) {
    const auth = useAuth();
    const recorded = useRef(false);

    useEffect(() => {
        if (recorded.current) return;
        if (!auth || auth.role !== "buyer") return;

        recorded.current = true;
        recordProductView(productId).catch(() => {
            // Best-effort — a failed view-tracking call shouldn't affect the page.
        });
    }, [auth, productId]);

    return null;
}
