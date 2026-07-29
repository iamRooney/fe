import { UserRole } from "./types";

const TOKEN_KEY = "token";
const ROLE_KEY = "userRole";

export interface AuthState {
    isAuthenticated: boolean;
    role: UserRole | null;
}

export function getAuthState(): AuthState {
    if (typeof window === "undefined") {
        return { isAuthenticated: false, role: null };
    }

    const token = localStorage.getItem(TOKEN_KEY);
    const role = localStorage.getItem(ROLE_KEY) as UserRole | null;

    return {
        isAuthenticated: Boolean(token),
        role: role === "buyer" || role === "seller" ? role : null,
    };
}

/** Persist the Sanctum token (and role, once known) after a successful OTP verify. */
export function setAuth(token: string, role?: UserRole | null) {
    localStorage.setItem(TOKEN_KEY, token);
    if (role) localStorage.setItem(ROLE_KEY, role);
}

/** Clear stored auth on logout. */
export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
}