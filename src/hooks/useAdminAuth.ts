"use client";

import { useEffect, useState } from "react";
import { getAdminAuthState, AdminAuthState } from "@/lib/admin-auth";

export function useAdminAuth() {
    const [auth, setAuth] = useState<AdminAuthState | null>(null);

    useEffect(() => {
        setAuth(getAdminAuthState());
    }, []);

    // null means "still checking localStorage" — avoids a flash of the
    // wrong screen during the initial client render.
    return auth;
}
