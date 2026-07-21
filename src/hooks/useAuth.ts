"use client";

import { useEffect, useState } from "react";
import { getAuthState, AuthState } from "@/lib/auth";

export function useAuth() {
    const [auth, setAuth] = useState<AuthState | null>(null);

    useEffect(() => {
        setAuth(getAuthState());
    }, []);

    // auth === null means "still checking" (avoids a flash of wrong content
    // since localStorage isn't available during server render)
    return auth;
}